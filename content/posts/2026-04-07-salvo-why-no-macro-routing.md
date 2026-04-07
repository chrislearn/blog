---
title: "Salvo 为什么不采用宏式路由"
date: 2026-04-07
categories:
  - Rust
  - 程序开发
tags:
  - Rust
  - Salvo
  - Web framework
  - 路由设计
---

Actix-web、Rocket、Poem 等框架支持这样的写法：

```rust
#[get("/users/{id}")]
async fn show(id: web::Path<i32>) -> impl Responder { /* ... */ }
```

很多人觉得这"很优雅"——一个属性宏挂在函数上方，路径、方法、参数一目了然，像 Spring MVC 的 `@GetMapping`，像 FastAPI 的 `@app.get`。每隔一段时间，就有人在 Salvo 的 issue 区问：能不能也加一个 `#[get]`？

Salvo 故意没有采用。本文想认真解释这个决定背后的原因。

<!--more-->

## 一、路由信息散落在源码各处

宏路由把路径、方法、参数定义粘在函数声明上，看起来很 DSL，但代价是：**你再也无法在一个地方看到整个应用的路由结构**。

要回答"`/users/{id}/posts` 是哪个函数处理的？"，你只能 grep。要回答"哪些路由挂了 `auth` 中间件？"——更难，因为中间件作用范围被另一个属性宏（如 `#[middleware]`、`scope`）描述，散落在多个文件里。

Salvo 的树形 `Router` 一眼就能看完整个应用的路由地图，可以 print 出来、可以单元测试、可以根据配置文件动态拼接：

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

这一段 `routes()` 函数本身就是整个应用的路由地图，结构、层级、中间件归属一清二楚。

## 二、路由不再是"值"，而是"宏副作用"

`#[get("/path")]` 本质上是把一个函数注册到一个全局的、由宏生成的注册表里。这意味着：

1. **无法条件性地注册路由**。`if cfg.enable_admin { router.push(admin_routes()); }` 这种最常见的需求，在宏路由模型下要么做不到，要么要靠 `cfg!`、`feature flag` 等更僵硬的手段。
2. **无法动态拼装路由**。从配置文件、数据库、插件系统读出的路由，宏路由通通无能为力——宏在编译期就展开了。
3. **无法对路由做循环和函数式组合**。Salvo 里 `for lang in langs { router = router.push(lang_router(lang)); }` 是合法的；宏路由不行。
4. **无法把路由作为返回值传来传去**。`fn user_routes() -> Router` 是 Salvo（以及 Axum）天然支持的；宏路由要做"模块化"必须再发明一套 `scope` / `service` DSL。

一句话：宏路由把"路由"从一个**值**降级成了**编译期副作用**。值是可以被传递、组合、计算的；副作用不是。

## 三、中间件作用域表达力差

宏路由通常通过 `#[middleware(Auth)]` 或 `App::scope("/api").wrap(auth)` 表达中间件作用域。这种方式有两个硬伤：

- **只能按"路径前缀"分组**：要让中间件作用于"两条不相邻的路由"，你必须把它们移到同一个 scope，破坏了原有的目录结构。
- **作用顺序由宏展开顺序隐式决定**：很难推理"鉴权、限流、日志"三个中间件到底谁先执行。

Salvo 的 `hoop` 直接挂在路由树节点上，作用范围 = 子树，顺序 = 阅读顺序，没有任何隐式规则。

```rust
Router::new()
    .hoop(tracing_mw)   // 1. 最外层：所有请求都经过
    .hoop(rate_limit)   // 2. 限流
    .hoop(auth)         // 3. 鉴权
    .get(handler);      // 4. 业务
```

执行顺序就是从上到下，中间件之间没有暗中翻转、没有 `ServiceBuilder` 的反向规则。

## 四、路径参数的类型与约束被锁死

`#[get("/users/{id}")]` 里 `id` 的类型是由 handler 签名 `id: Path<i32>` 决定的。如果你想表达"`id` 必须是 6 位数字"，你只能在 handler 里手写校验，匹配阶段无法拒绝。

Salvo 的 `{id:num(6)}`、`{name:regex(...)}`、自定义 `PathFilter` 在**匹配阶段**就把不合法的请求挡在外面，让"另一条路由"有机会接管同一个 URL。这是宏路由模型从根本上做不到的，因为它没有"匹配失败 → 尝试下一条"的概念。

```rust
Router::with_path("orders/{id:num(8)}").get(by_order_no)
    .push(Router::with_path("orders/{slug:regex(\"[a-z-]+\")}").get(by_slug));
```

同一个 `/orders/...` 前缀下，根据参数特征自然分流——这种表达力在宏路由模型里要么靠手写 if/else，要么干脆放弃。

## 五、难以做"一个 URL，多种匹配规则"

考虑：`/files/{name}` 既要匹配 `report.pdf`（走静态文件 handler），也要匹配 `report`（走数据库查询 handler）。Salvo 可以用两个并列的子路由 + 不同的过滤器表达；宏路由必须把两种逻辑塞进同一个函数，再在函数里分支——这又一次把"路由职责"漏到了"业务代码"里。

路由的职责，应该是路由层面解决；业务代码的职责，应该是业务代码解决。把路由分发的工作推给业务函数，看似简单，长远看是污染。

## 六、测试与重构成本

- **测试**：Salvo 的 `Router` 是值，可以在测试里直接构造一棵小树，注入 mock 中间件。宏路由的注册表是全局的，测试时往往要启动整个 app。
- **重构**：把一组路由从 `/v1/users` 整体迁移到 `/v2/accounts`，Salvo 改一个父节点的 `path` 就行；宏路由要改 N 个 `#[get(...)]` 字符串。

写测试是检验框架抽象是否健康的试金石。一个"必须启动整个 app 才能测一条路由"的框架，注定会让人懒得写测试。

## 七、宏路由"优雅"的真相

不可否认，`#[get("/path")]` 在小例子里看起来非常清爽。它的"优雅"来自：

- **声明式**：直接告诉读者"这是一个 GET，路径是 X"；
- **就地性**：不用在另一个 `routes.rs` 文件里再写一遍；
- **与函数共享视野**：handler 和它的路径在同一屏内。

但这些好处在小项目里很美，在大项目里会反过来咬人——因为它把一个本应由"路由层"承担的职责，强行塞进了"函数声明层"。当项目规模上去之后，你失去的不是几行代码的便利，而是**路由作为一等公民的全部能力**：可组合、可传递、可循环、可条件、可测试、可打印。

## 八、小结

宏路由的"优雅"是表面的：它把声明写得像注解，但代价是把**路由从一等公民降级成了宏副作用**。Salvo 选择让 `Router` 始终是一个普通的 Rust 值——可以构造、可以传递、可以组合、可以打印、可以测试——这才是真正可扩展的路由模型。

至于 `#[handler]` 这个属性宏，它只做一件事：把一个普通 async 函数适配成 `Handler` trait 的实现，**不**承担任何路由注册的职责。路由的注册始终发生在你能看见的代码里，而不是发生在某个全局注册表的暗处。

这是 Salvo 的一个有意识的取舍：少一点表面的优雅，多一点结构上的诚实。
