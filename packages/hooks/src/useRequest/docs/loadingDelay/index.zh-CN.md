---
map:
  # 映射到docs的路径
  path: /useRequest/loadingDelay/
---

# Loading Delay

通过设置 `options.loadingDelay` ，可以延迟 `loading` 变成 `true` 的时间，有效防止闪烁。

## 代码演示

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="防止闪烁"> </demo>

## API

| 参数         | 说明                                  | 类型                      | 默认值 |
| ------------ | ------------------------------------- | ------------------------- | ------ |
| loadingDelay | 设置 `loading` 变成 `true` 的延迟时间 | `number` \| `Ref<number>` | `0`    |

## 备注

`options.loadingDelay` 支持动态变化。
