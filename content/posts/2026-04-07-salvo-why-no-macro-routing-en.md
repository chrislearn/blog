---
title: "Why Salvo Doesn't Embrace Macro-Style Routing"
date: 2026-04-07
categories:
  - Rust
  - Programming
tags:
  - Rust
  - Salvo
  - Web framework
  - Routing design
---

Frameworks like Actix-web, Rocket, and Poem support writing routes like this:

```rust
#[get("/users/{id}")]
async fn show(id: web::Path<i32>) -> impl Responder { /* ... */ }
```

Many people think this is "elegant" — an attribute macro sits right above the function, and the path, method, and parameters are all visible at a glance, much like Spring MVC's `@GetMapping` or FastAPI's `@app.get`. Every so often someone files a Salvo issue asking: can we have a `#[get]` too?

Salvo deliberately doesn't. This article tries to seriously explain the reasoning behind that decision.

<!--more-->

## 1. Routing Information Gets Scattered Across the Source

Macro-based routing glues path, method, and parameter definitions onto each function declaration. It looks like a DSL, but the price is this: **you can no longer see the routing structure of your entire application in one place.**

To answer "which function handles `/users/{id}/posts`?" you can only grep. To answer "which routes have the `auth` middleware on them?" — even harder, because middleware scope is described by another attribute macro (e.g., `#[middleware]`, `scope`) and is scattered across many files.

Salvo's tree-shaped `Router` lets you read the entire routing map of your application at a glance. You can print it, unit-test it, or assemble it dynamically from a config file:

```rust
fn routes() -> Router {
    Router::new()
        .hoop(tracing_mw)
        .push(Router::with_path("public").get(public_index))
        .push(
            Router::with_path("api")
                .hoop(auth)
                .push(Router::with_path("users").get(list).post(create))
                .push(Router::with_path("users/{id:num}").get(show).put(update)),
        )
}
```

This `routes()` function is itself the entire routing map of the application — structure, hierarchy, and middleware ownership are all crystal clear.

## 2. Routes Are No Longer Values; They're Macro Side Effects

`#[get("/path")]` essentially registers a function into a global, macro-generated registry. This means:

1. **You can't conditionally register routes.** The most common pattern, `if cfg.enable_admin { router.push(admin_routes()); }`, is either impossible under the macro-routing model or has to be expressed via stiffer mechanisms like `cfg!` or feature flags.
2. **You can't dynamically assemble routes.** Routes coming from a config file, a database, or a plugin system are simply unreachable for macro routing — the macros expand at compile time.
3. **You can't loop or apply functional composition over routes.** In Salvo, `for lang in langs { router = router.push(lang_router(lang)); }` is perfectly legal; macro routing doesn't allow it.
4. **You can't pass routes around as return values.** `fn user_routes() -> Router` is naturally supported by Salvo (and Axum); macro-routing has to invent yet another `scope` / `service` DSL to do "modularization."

In a sentence: macro routing demotes "a route" from a **value** to a **compile-time side effect**. Values can be passed around, composed, computed; side effects can't.

## 3. Weak Expressiveness for Middleware Scoping

Macro-routing typically expresses middleware scope through `#[middleware(Auth)]` or `App::scope("/api").wrap(auth)`. This approach has two hard limitations:

- **You can only group by path prefix.** To make a middleware apply to "two non-adjacent routes," you have to move them into the same scope, which breaks your existing directory structure.
- **The order is implicitly determined by macro expansion order.** It's hard to reason about whether `auth`, `rate_limit`, and `log` run in the order you wrote them.

Salvo's `hoop` is attached directly to a node of the routing tree. The scope is "this subtree," the order is "the order you read the code," and there are no implicit rules:

```rust
Router::new()
    .hoop(tracing_mw)   // 1. outermost: every request
    .hoop(rate_limit)   // 2. rate limiting
    .hoop(auth)         // 3. auth
    .get(handler);      // 4. business logic
```

The execution order is exactly top-to-bottom. There's no hidden flip, no `ServiceBuilder` reversal.

## 4. Path Parameter Types and Constraints Are Locked

In `#[get("/users/{id}")]`, the type of `id` is decided by the handler signature `id: Path<i32>`. If you want to express "`id` must be a 6-digit number," you have to hand-write the validation inside the handler — the matching phase can't reject it.

Salvo's `{id:num(6)}`, `{name:regex(...)}`, and custom `PathFilter`s all reject ill-formed requests **at the matching phase**, giving "the next route" a chance to take over the same URL. Macro-based routing fundamentally can't do this, because it has no concept of "match failed → try the next one."

```rust
Router::with_path("orders/{id:num(8)}").get(by_order_no)
    .push(Router::with_path("orders/{slug:regex(\"[a-z-]+\")}").get(by_slug));
```

Under the same `/orders/...` prefix, requests are naturally split by the shape of the parameter — an expressiveness that macro routing has to either re-implement with hand-written if/else or simply give up on.

## 5. Hard to Express "One URL, Multiple Match Rules"

Consider: `/files/{name}` should match both `report.pdf` (route to a static file handler) and `report` (route to a database lookup). Salvo can express this with two parallel sub-routes plus different filters; macro routing has to stuff both branches of logic into the same function and dispatch inside it — once again leaking "routing responsibility" into "business code."

A routing concern should be solved at the routing layer; a business concern should be solved at the business layer. Pushing routing dispatch down into business functions feels simple in the short term and is, in the long term, contamination.

## 6. The Cost of Tests and Refactors

- **Tests:** Salvo's `Router` is a value, so you can build a tiny tree right in a test and inject mock middleware. A macro-routing registry is global; tests usually have to bring up the entire app.
- **Refactors:** Migrating a group of routes from `/v1/users` to `/v2/accounts` is a one-line change to a parent node's `path` in Salvo; in macro routing it means changing N `#[get(...)]` strings.

Test ergonomics are a litmus test of whether a framework's abstraction is healthy. A framework where you "have to start the whole app to test one route" inevitably trains people not to write tests.

## 7. The Truth Behind the "Elegance" of Macro Routing

There's no denying that `#[get("/path")]` looks beautifully clean in small examples. Its "elegance" comes from:

- **Declarativeness:** it tells the reader "this is a GET, the path is X" directly;
- **Locality:** you don't have to write the same thing again in a separate `routes.rs`;
- **Shared visual context:** the handler and its path are on the same screen.

These benefits are pretty in small projects and bite you back in large ones — because they cram a responsibility that should belong to the "routing layer" into the "function declaration layer." Once a project grows, what you lose isn't a few lines of convenience; it's **all the powers a route has when it's a first-class citizen**: composability, transferability, looping, conditioning, testability, printability.

## 8. Closing

The "elegance" of macro routing is superficial. It writes the declaration to look like an annotation, but at the cost of **demoting routes from first-class citizens to macro side effects**. Salvo chooses to keep `Router` as just an ordinary Rust value — constructible, transferable, composable, printable, testable — and that's what makes the routing model truly extensible.

As for the `#[handler]` attribute macro: it does exactly one thing — adapt a regular async function into an implementation of the `Handler` trait. It bears **no** responsibility for route registration. Route registration always happens in code you can see, not in the dark corner of some global registry.

This is a conscious tradeoff in Salvo: a little less surface elegance, a little more structural honesty.
