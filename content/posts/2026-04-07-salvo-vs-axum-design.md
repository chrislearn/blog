---
title: "Salvo 与 Axum 的设计思想对比"
date: 2026-04-07
categories:
  - Rust
  - 程序开发
tags:
  - Rust
  - Salvo
  - Axum
  - Web framework
---

在 Rust 的 Web 框架江湖里，[Axum](https://github.com/tokio-rs/axum) 与 [Salvo](https://github.com/salvo-rs/salvo) 常常被放在一起比较。两者都用 Rust 写成，都跑在 [hyper](https://github.com/hyperium/hyper) 之上，都支持异步，但只要写过几个真实业务，你就会发现：它们其实是两种完全不同的"世界观"。本文不是要贬低任何一方——Axum 是一个优秀的框架——而是想说明：当抽象层次不同时，开发体验和表达能力会显著不同。

本文对比的 Axum 版本为 *0.8.x*。需要先澄清一点：Axum 0.8 跟随 [`matchit`](https://github.com/ibraheemdev/matchit) 0.8 把路径参数语法从 `:name` / `*name` 改成了 `{name}` / `{*name}`，看起来与 Salvo 的占位符语法几乎一致。但真正的差异从来不在"花括号还是冒号"这种表层，而在抽象模型本身。

<!--more-->

## 一、两种世界观

### Axum / Tower 的世界观

Axum 是 [Tower](https://github.com/tower-rs/tower) 生态的一员，它的核心抽象是 `tower::Service`：

```rust
trait Service<Request> {
    type Response;
    type Error;
    type Future: Future<Output = Result<Self::Response, Self::Error>>;

    fn poll_ready(&mut self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>>;
    fn call(&mut self, req: Request) -> Self::Future;
}
```

中间件是 `Layer`：一个把 `Service<S>` 包装成另一个 `Service<S'>` 的工厂。整个请求处理链通过类型层层嵌套出来——`Layer<Layer<Layer<Handler>>>`。这是一种"洋葱模型 + 类型代数"的组合：每一层都改变服务的类型，类型系统替你证明组合是合法的。

优点是：抽象极其干净，可以和整个 Tower 生态（[`tower-http`](https://github.com/tower-rs/tower-http)、[`tonic`](https://github.com/hyperium/tonic)、[`hyper-util`](https://github.com/hyperium/hyper-util) 等）无缝复用；缺点是：写一个中间件需要理解 `Service`、`Layer`、`Future`、`Pin`、`poll_ready`、`Box::pin`、关联类型、`tower::ServiceBuilder` 的顺序语义……门槛非常高。

### Salvo 的世界观

Salvo 的核心抽象是 `Handler`：

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

请记住这一点：在 Salvo 里，**中间件和最终的处理函数是同一个 trait**。没有 `Layer`，没有 `Service`，没有 `poll_ready`，没有需要返回的 `Future` 类型。一个中间件就是"在调用 `ctrl.call_next(...)` 前后做点事的 Handler"。

请求流转的状态——已解析的用户、数据库连接、tracing span——通过 `Depot`（一个类型安全的请求级 KV 容器）传递，而不是通过"修改请求扩展类型"或"把状态塞进 Service 的泛型参数"完成。

这两种世界观决定了后面所有的差异。

## 二、中间件：写一个鉴权中间件

下面是 Axum 中一个最小可用的鉴权中间件（用 `axum::middleware::from_fn` 这种"简化"写法已经算是很友好的版本）：

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

如果不用 `from_fn`，而是写一个"正经"的 Tower `Layer`，代码会膨胀到 60～100 行：要定义 `AuthLayer`、`AuthService<S>`、手写 `impl<S> Service<Request> for AuthService<S>`、处理 `poll_ready`、把 future `Box::pin` 起来、处理 `S::Future` 的关联类型、保证 `Clone` ……这正是 `tower-http` 里几乎每个中间件的样子。

而在 Salvo 里：

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
            // 继续向下走，无需显式调用 next
        }
        Err(_) => {
            res.status_code(StatusCode::UNAUTHORIZED);
            ctrl.skip_rest();
        }
    }
}
```

差异在哪里？

1. **没有 `Service`/`Layer`/`Next` 三件套**。中间件就是一个普通的异步函数，签名和最终的业务 handler 一模一样。
2. **没有泛型噪音**。Axum 版本里 `S`、`S::Future`、`S::Response` 之类的关联类型在 Salvo 中完全不存在。
3. **提前返回是显式的、可读的**。`ctrl.skip_rest()` 一行就表达了"短路、不再继续"的意图，不需要返回 `Err(StatusCode::...)` 这种把控制流编码进类型的做法。
4. **向后传值用 `Depot`，而不是 `req.extensions_mut().insert(...)`**。`Depot` 是请求级的、类型安全的，并且不会和 `http::Extensions` 混在一起（后者本质上是 `TypeMap`，被框架、`tower-http`、`tracing` 等共享）。

## 三、中间件位置的灵活性

在 Axum 里，中间件是通过 `Router::layer` / `Router::route_layer` 添加的。要让某个中间件只作用于"某几条路由的子集"，你必须：

- 把那几条路由拆成一个子 `Router`，
- 给子 `Router` 加 `layer`，
- 再 `merge` 或 `nest` 回主 `Router`。

而中间件的"执行顺序"取决于 `ServiceBuilder` 的从外到内顺序，与人直觉的从上到下顺序相反，文档里专门有一节提醒读者别搞反。

在 Salvo 里，中间件就是 `Router::hoop(handler)`。它可以挂在树上的**任何节点**——根节点、中间节点、叶子节点都行——子树自动继承。要让一个中间件只作用于"两条路由"，只需要：

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

而且执行顺序就是阅读顺序：从外层 `hoop` 到内层 `hoop`，再到最终 handler，没有反直觉的反向规则。

## 四、为什么 Salvo 能这么简单？

根本原因是 **Salvo 把"状态"从类型层移到了运行时层**。

- Axum 的中间件需要修改 `Service` 的类型，因为它要在编译期保证"这一层加了之后，下一层能拿到正确的数据"。代价是泛型爆炸。
- Salvo 的中间件不修改任何类型，所有跨层数据都通过 `Depot` 传递。代价是失去了"编译期保证 key 一定存在"——但实际上 Axum 的 `Extension<T>` 提取器一样是运行时检查的（拿不到就 500），并没有真正利用类型系统的保证。

换句话说，Axum 在这个点上付出了巨大的复杂度，却没有换来与之对等的安全收益。Salvo 选择在这里"解开类型枷锁"，把复杂度从用户的代码里挪走了。

## 五、路由：扁平字符串 vs 树形结构

Axum 0.8 的路由是扁平的：

```rust
let app = Router::new()
    .route("/users", get(list).post(create))
    .route("/users/{id}", get(show).put(update).delete(remove))
    .route("/users/{id}/posts", get(list_posts));
```

每条路由是一个独立的 `(path, MethodRouter)` 条目。要做"嵌套"必须靠 `nest`，要做"分组中间件"必须先拆 `Router`。路径里的参数语法是固定的 `{name}` 与 `{*name}`——**没有任何类型或正则约束的概念**。Axum 文档明确写着 "It is not possible to create segments that only match some types like numbers or regular expression. You must handle that manually in your handlers."

Salvo 的路由是树形的：

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

每个节点既可以挂 handler，也可以挂中间件，还可以挂子节点。整棵树就是一棵真正的"路由树"，结构清晰、可视。

## 六、路径过滤器：远不止 `:id`

Salvo 路径段不是字符串模板，而是**过滤器**。除了普通占位符，还内置了大量类型 / 正则 / 通配过滤器：

- `{id:num}`：必须是数字，并按数字解析；
- `{id:num(10)}` / `{id:num(1..=4)}`：限制位数；
- `{name:regex("[a-z]{3,16}")}`：用正则约束；
- `{*rest}` / `{**rest}`：单段 / 多段通配；
- 自定义 `PathFilter`：可以注册任意业务规则（例如"只匹配偶数 id"）。

更关键的是：**Salvo 的过滤器是可组合、可自定义的 trait**。除了路径过滤器，还有 `host`、`port`、`scheme`、`header`、`query` 等过滤器，可以这样写：

```rust
Router::new()
    .filter_fn(|req, _| req.headers().contains_key("x-internal"))
    .path("admin")
    .get(admin_index);
```

在 Axum 里要做"只在某个 header 存在时才匹配此路由"，你必须：要么把它写进 handler 里手动判断，要么写一个 `Layer` 把请求 `into_response` 一个 404。前者破坏了路由的语义，后者会让该路径对其他可能匹配的路由"失效"。

## 七、一个具体场景：版本化 + 灰度

考虑这样一个需求：

- `/api/users` 默认走 v1；
- 如果请求带 `x-api-version: 2` header，则走 v2；
- v2 的所有接口共享一个 `auth_v2` 中间件；
- v1 和 v2 都共享一个 `tracing` 中间件；
- 灰度阶段，v2 只对 id 为偶数的用户开放。

在 Salvo 里这是几行树形代码就能写完的事：

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

在 Axum 里要做同样的事，你大概会：写一个自定义 `Service` 来做 header 分流，再嵌套两个 `Router`，再写一个"奇数 id 返回 404"的中间件——而且这个中间件还会让请求**真的**以 404 结束，而不是"未匹配此路由，去尝试下一条"。这就是扁平路由模型的根本缺陷：**它没有"未匹配，回退"的概念**。

## 八、总结

| 维度 | Axum / Tower | Salvo |
| --- | --- | --- |
| 中间件抽象 | `tower::Service` + `Layer`，泛型嵌套 | `Handler` trait，与业务函数同构 |
| 中间件门槛 | 需理解 `Service` / `poll_ready` / `Pin<Box<Future>>` | 写普通 async 函数即可 |
| 跨层传值 | `Request::extensions`（运行时 TypeMap） | `Depot`（运行时 TypeMap，但无与生态混用的污染） |
| 中间件作用域 | 按 `Router` 拆分 + `layer`/`route_layer` | 挂在路由树任意节点的 `hoop` |
| 中间件顺序 | `ServiceBuilder` 反向，需要文档提醒 | 阅读顺序 = 执行顺序 |
| 路由结构 | 扁平 `(path, MethodRouter)` 列表 | 真正的树形 `Router` |
| 路径过滤 | `{name}` / `{*name}`，无类型/正则约束 | `{id:num}`、`{name:regex(...)}`、自定义 `PathFilter`、`host`/`header`/`query` 过滤器 |
| 非路径条件匹配 | 需自定义 `Service` 或 handler 内判断 | `filter_fn` 一行解决 |
| 匹配失败回退 | 无概念，扁平路由直接 404 | 树形匹配天然支持"换一条试试" |

简而言之：Axum 把抽象建立在 `tower::Service` 上，赢得了与整个 Tower 生态的互通，代价是把复杂度暴露给了用户；Salvo 把抽象建立在 `Handler` + `Depot` + 树形 `Router` 上，赢得了开发体验和路由表达力，代价是不能直接复用 Tower 中间件——而这一点 Salvo 通过 `tower-compat` 模块补回来了。

两种世界观没有对错之分，只有取舍。如果你拥抱整个 Tower 生态、享受类型代数的优雅，Axum 是非常合适的选择；如果你更在意开发体验、路由表达力以及"少一点泛型噪音、多一点直觉"，Salvo 值得你认真试一试。
