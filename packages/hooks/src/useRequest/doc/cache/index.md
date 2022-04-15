---
map:
  # 映射到docs的路径
  path: /useRequest/cache/
---

# 缓存 & SWR

如果设置了 `options.cacheKey`，`useRequest` 会将当前请求成功的数据缓存起来。下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求，也就是 SWR 的能力。

你可以通过 `options.staleTime` 设置数据保持新鲜时间，在该时间内，我们认为数据是新鲜的，不会重新发起请求。

你也可以通过 `options.cacheTime` 设置数据缓存时间，超过该时间，我们会清空该条缓存数据。

## SWR

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="设置了 cacheKey，在第二次渲染加载时，会优先返回缓存的内容，然后在背后重新发起请求">
</demo>

## 数据保持新鲜

<demo src="./demo/demo1.vue"
  language="vue"
  title=""
  desc="设置 staleTime，我们可以指定数据新鲜时间，在这个时间内，不会重新发起请求">
</demo>

## 数据共享

同一个 `cacheKey` 的内容，在全局是共享的，这会带来以下几个特性

- 请求 `Promise` 共享，相同的 `cacheKey` 同时只会有一个在发起请求，后发起的会共用同一个请求 `Promise`
- 数据同步，任何时候，当我们改变其中某个 `cacheKey` 的内容时，其它相同 `cacheKey` 的内容均会同步

<demo src="./demo/demo2.vue"
  language="vue"
  title=""
  desc="初始化时，两个组件只会发起一个请求。并且两个请求的内容永远是同步的">
</demo>

## 参数缓存

缓存的数据包括 `data` 和 `params`，通过 `params` 缓存机制，我们可以记忆上一次请求的条件，并在下次初始化。

<demo src="./demo/demo3.vue"
  language="vue"
  title=""
  desc="从缓存的params中初始化keyword">
</demo>

## 删除缓存

提供了一个 `clearCache` 方法，可以清除指定 `cacheKey` 的缓存数据。 这里就不做展示

## 自定义缓存

通过配置 `setCache` 和 `getCache`，可以自定义数据缓存，比如可以将数据存储到 `localStorage`、`IndexDB` 等。

请注意：

1. `setCache` 和 `getCache` 需要配套使用。
2. 在自定义缓存模式下，`cacheTime` 和 `clearCache` 不会生效，请根据实际情况自行实现。
   <demo src="./demo/demo4.vue"
     language="vue"
     title=""
     desc="">
   </demo>