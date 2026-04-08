---
title: "Salvo vs. Axum: A Tale of Two Design Philosophies"
date: 2026-04-07
categories:
  - Rust
  - Programming
tags:
  - Rust
  - Salvo
  - Axum
  - Web framework
---

In the Rust web framework world, [Axum](https://github.com/tokio-rs/axum) and [Salvo](https://github.com/salvo-rs/salvo) are often put side by side. Both are written in Rust, both run on top of [`hyper`](https://github.com/hyperium/hyper), and both are async. But once you've built a few real services with each, you'll realize they aren't really competing on the same axis at all — they represent two genuinely different worldviews. This article isn't about putting one above the other (Axum is an excellent framework); it's about showing how a different abstraction layer leads to a noticeably different developer experience and expressive power.

The Axum version referenced here is **0.8.x**. One quick clarification: Axum 0.8 followed [`matchit`](https://github.com/ibraheemdev/matchit) 0.8 in switching its path-parameter syntax from `:name` / `*name` to `{name}` / `{*name}`, which on the surface looks almost identical to Salvo's. But the real difference has never been "braces vs. colons" — it's the abstraction model itself.

<!--more-->

## 1. Two Worldviews

### The Axum / Tower worldview

Axum is a citizen of the [Tower](https://github.com/tower-rs/tower) ecosystem, and its core abstraction is `tower::Service`:

```rust
trait Service<Request> {
    type Response;
    type Error;
    type Future: Future<Output = Result<Self::Response, Self::Error>>;

    fn poll_ready(&mut self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>>;
    fn call(&mut self, req: Request) -> Self::Future;
}
```

Middleware is a `Layer`: a factory that wraps `Service<S>` into another `Service<S'>`. The whole request pipeline is built up by nesting types — `Layer<Layer<Layer<Handler>>>`. It's an "onion model meets type algebra": each layer changes the service's type, and the type system proves that the composition is legal.

The upside is a remarkably clean abstraction that interoperates seamlessly with the entire Tower ecosystem ([`tower-http`](https://github.com/tower-rs/tower-http), [`tonic`](https://github.com/hyperium/tonic), [`hyper-util`](https://github.com/hyperium/hyper-util), …). The downside is that to write a middleware you have to understand `Service`, `Layer`, `Future`, `Pin`, `poll_ready`, `Box::pin`, associated types, the order semantics of `tower::ServiceBuilder`… The barrier to entry is high.

### The Salvo worldview

Salvo's core abstraction is `Handler`:

```rust
#[async_trait]
pub trait Handler: Send + Sync + 'static {
    async fn handle(
        &self,
        req: &mut Request,
        depot: &mut Depot,
        res: &mut Response,
        ctrl: &mut FlowCtrl,
    );
}
```

Hold on to this fact: in Salvo, **a middleware and a final handler are the same trait**. There's no `Layer`, no `Service`, no `poll_ready`, no `Future` type to return. A middleware is just "a `Handler` that does something before and/or after calling `ctrl.call_next(...)`."

State that flows through a request — the resolved user, the database connection, the tracing span — is passed via `Depot`, a request-scoped, type-safe key-value container, not by mutating an extension type on the request or smuggling state through generic parameters on `Service`.

These two worldviews drive every other difference that follows.

## 2. Middleware: Writing an Auth Middleware

Here's a minimal auth middleware in Axum, using the friendliest possible form (`axum::middleware::from_fn`):

```rust
use axum::{
    extract::Request,
    http::StatusCode,
    middleware::Next,
    response::Response,
};

async fn auth(mut req: Request, next: Next) -> Result<Response, StatusCode> {
    let token = req.headers()
        .get("authorization")
        .and_then(|v| v.to_str().ok())
        .ok_or(StatusCode::UNAUTHORIZED)?;

    let user = verify(token).await.map_err(|_| StatusCode::UNAUTHORIZED)?;
    req.extensions_mut().insert(user);
    Ok(next.run(req).await)
}
```

If you skip `from_fn` and write a "proper" Tower `Layer`, the code balloons to 60–100 lines: you need to define `AuthLayer`, `AuthService<S>`, hand-roll `impl<S> Service<Request> for AuthService<S>`, deal with `poll_ready`, `Box::pin` the future, juggle the associated types of `S::Future`, ensure `Clone` … which is exactly what almost every `tower-http` middleware looks like.

In Salvo:

```rust
#[handler]
async fn auth(req: &mut Request, depot: &mut Depot, res: &mut Response, ctrl: &mut FlowCtrl) {
    let Some(token) = req.header::<String>("authorization") else {
        res.status_code(StatusCode::UNAUTHORIZED);
        ctrl.skip_rest();
        return;
    };
    match verify(&token).await {
        Ok(user) => {
            depot.insert("user", user);
            // Just fall through — no explicit `next` call required.
        }
        Err(_) => {
            res.status_code(StatusCode::UNAUTHORIZED);
            ctrl.skip_rest();
        }
    }
}
```

What's different here?

1. **No `Service`/`Layer`/`Next` triad.** A middleware is just an async function whose signature is identical to a regular handler.
2. **No generic noise.** The `S`, `S::Future`, `S::Response` associated types you see in the Axum version simply don't exist in Salvo.
3. **Early return is explicit and readable.** `ctrl.skip_rest()` cleanly expresses "short-circuit, don't continue" — no need to encode control flow through `Err(StatusCode::...)`.
4. **Forward state via `Depot`, not `req.extensions_mut().insert(...)`.** `Depot` is request-scoped, type-safe, and doesn't get tangled up with `http::Extensions` (which is essentially a `TypeMap` shared with the framework, `tower-http`, `tracing`, and friends).

## 3. Flexibility of Middleware Placement

In Axum, middleware is added via `Router::layer` / `Router::route_layer`. To make a middleware apply to "only this subset of routes" you have to:

- pull those routes out into a sub-`Router`,
- attach a `layer` to that sub-`Router`,
- and then `merge` or `nest` it back into the main `Router`.

The execution order of middleware is determined by `ServiceBuilder`'s outer-to-inner order, which is the opposite of how a human reads top-to-bottom — the docs explicitly call this out so you don't get it wrong.

In Salvo, a middleware is just `Router::hoop(handler)`. It can be attached to **any node** of the routing tree — root, intermediate, or leaf — and the subtree inherits it automatically. To make a middleware apply to two specific routes, all you need is:

```rust
Router::new()
    .push(Router::with_path("public").get(public))
    .push(
        Router::new()
            .hoop(auth)
            .push(Router::with_path("me").get(me))
            .push(Router::with_path("settings").get(settings)),
    );
```

And the order of execution is just the reading order: outer `hoop`, inner `hoop`, final handler. No counter-intuitive reversal.

## 4. Why Can Salvo Be This Simple?

The fundamental reason is that **Salvo moves "state" out of the type layer and into the runtime layer**.

- Axum's middleware has to mutate the type of `Service` because it wants to prove at compile time that "after this layer is added, the next layer can see the right data." The price is generic explosion.
- Salvo's middleware doesn't change any types; everything that crosses layers travels through `Depot`. The price is losing the "compile-time guarantee that the key exists" — but Axum's `Extension<T>` extractor is also a runtime check (you get a 500 if it isn't there), so the type system isn't really earning its keep here either.

Put differently: Axum pays an enormous complexity cost at this point and doesn't get a proportional safety benefit in return. Salvo chose to "uncuff the type system" here and move the complexity out of user code.

## 5. Routing: Flat Strings vs. Tree Structure

Axum 0.8's routing is flat:

```rust
let app = Router::new()
    .route("/users", get(list).post(create))
    .route("/users/{id}", get(show).put(update).delete(remove))
    .route("/users/{id}/posts", get(list_posts));
```

Each route is an independent `(path, MethodRouter)` entry. To "nest" you must use `nest`; to attach middleware to "a group" you must split the `Router` first. The path-parameter syntax is fixed `{name}` and `{*name}` — **with no concept of type or regex constraints**. The Axum docs spell it out: "It is not possible to create segments that only match some types like numbers or regular expression. You must handle that manually in your handlers."

Salvo's routing is a tree:

```rust
Router::with_path("users")
    .get(list)
    .post(create)
    .push(
        Router::with_path("{id:num}")
            .get(show).put(update).delete(remove)
            .push(Router::with_path("posts").get(list_posts)),
    );
```

Every node can host a handler, host middleware, and host children. The whole thing is a real routing tree — clear, structured, visualizable.

## 6. Path Filters: Far Beyond `:id`

Salvo's path segments aren't string templates; they're **filters**. On top of plain placeholders, there are built-in type / regex / wildcard filters:

- `{id:num}`: must be numeric, parsed as a number;
- `{id:num(10)}` / `{id:num(1..=4)}`: constrain digit count;
- `{name:regex("[a-z]{3,16}")}`: constrain by regex;
- `{*rest}` / `{**rest}`: single-segment / multi-segment wildcard;
- Custom `PathFilter`: register any business rule (e.g., "match only even ids").

More importantly: **Salvo's filters are a composable, customizable trait family.** Beyond path filters there are `host`, `port`, `scheme`, `header`, and `query` filters, so you can write:

```rust
Router::new()
    .filter_fn(|req, _| req.headers().contains_key("x-internal"))
    .path("admin")
    .get(admin_index);
```

To express "match this route only when a particular header is present" in Axum, your options are: handle it inside the handler manually, or write a `Layer` that turns the request into a 404 response. The former breaks the routing semantics; the latter makes that path "dead" for any other route that might also match.

## 7. A Concrete Scenario: Versioning + Canary

Suppose the requirements are:

- `/api/users` defaults to v1;
- if the request has an `x-api-version: 2` header, it goes to v2;
- all v2 endpoints share an `auth_v2` middleware;
- both v1 and v2 share a `tracing` middleware;
- during canary, v2 only opens to users whose id is even.

In Salvo this is a few lines of tree-shaped code:

```rust
Router::new()
    .hoop(tracing_mw)
    .path("api/users")
    .push(
        Router::new()
            .filter_fn(|req, _| req.header::<String>("x-api-version").as_deref() == Some("2"))
            .hoop(auth_v2)
            .filter_fn(|req, _| even_user(req))
            .get(v2::list),
    )
    .push(Router::new().get(v1::list));
```

To do the same thing in Axum, you'd probably write a custom `Service` to do the header-based fork, nest two `Router`s, then write a "404 if id is odd" middleware — and that middleware will make the request **really** end with a 404, not "fall through to the next candidate route." This is the fundamental flaw of the flat routing model: **it has no concept of "didn't match — fall back."**

## 8. Summary

| Dimension | Axum / Tower | Salvo |
| --- | --- | --- |
| Middleware abstraction | `tower::Service` + `Layer`, generic nesting | `Handler` trait, isomorphic to business functions |
| Middleware barrier | Need to grok `Service` / `poll_ready` / `Pin<Box<Future>>` | Just write a regular async function |
| Cross-layer state | `Request::extensions` (runtime TypeMap) | `Depot` (runtime TypeMap, but free of ecosystem cross-contamination) |
| Middleware scoping | Split the `Router` + `layer`/`route_layer` | `hoop` on any node of the routing tree |
| Middleware order | `ServiceBuilder` reverses it; the docs warn you | Reading order = execution order |
| Routing structure | Flat list of `(path, MethodRouter)` | A real tree of `Router`s |
| Path filtering | `{name}` / `{*name}`, no type/regex constraints | `{id:num}`, `{name:regex(...)}`, custom `PathFilter`, `host`/`header`/`query` filters |
| Non-path conditional matching | Custom `Service` or in-handler check | One-line `filter_fn` |
| Match-failure fallback | No such concept; flat routes 404 directly | Tree matching naturally supports "try the next branch" |

Briefly: Axum builds its abstraction on `tower::Service`, gaining seamless interop with the entire Tower ecosystem at the cost of exposing that complexity to the user. Salvo builds its abstraction on `Handler` + `Depot` + a tree-shaped `Router`, gaining developer experience and routing expressiveness at the cost of not directly reusing Tower middleware — and Salvo fills that gap with its `tower-compat` module.

Neither worldview is right or wrong; each is a tradeoff. If you embrace the entire Tower ecosystem and enjoy the elegance of type algebra, Axum is an excellent choice. If you care more about developer experience and routing expressiveness — and would rather have less generic noise and more intuition — Salvo is well worth a serious try.
