---
map:
  # 映射到docs的路径
  path: /useRequest/basic/
---

# useRequest 基础用法

介绍 `useRequest` 最核心，最基础的能力。

## 代码演示

### 默认请求

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="默认发送获取请求"> </demo>

### 格式化请求数据

由于 `useRequest` 需要保证良好的插件系统，format 对于系统来说侵入性太大，这里格式化使用的的是 `useFormatResult`,在请求数据完成后将 data 传入 `useFormatResult` 进行格式化， `useFormatResult` 可以很好的支持 `typescript` 类型提示。 <br />

<a href="/docs/hooks/useFormatResult/" >跳转至 useFormatResult</a>

## API

```ts
const {
  loading: Ref<boolean>,
  data?: Ref<TData>,
  error?: Ref<Error>,
  params: Ref<TParams || []>,
  run: (...params: TParams) => void,
  runAsync: (...params: TParams) => Promise<TData>,
  refresh: () => void,
  refreshAsync: () => Promise<TData>,
  mutate: (data?: TData | ((oldData?: TData) => (TData | undefined))) => void,
  cancel: () => void,
} = useRequest<TData, TParams>(
  service: (...args: TParams) => Promise<TData>,
  {
    manual?: boolean,
    defaultParams?: TParams,
    formatResult?:(response:TData)=>any,
    onBefore?: (params: TParams) => void,
    onSuccess?: (data: TData, params: TParams) => void,
    onError?: (e: Error, params: TParams) => void,
    onFinally?: (params: TParams, data?: TData, e?: Error) => void,
  }
);
```

### Result

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| data | service 返回的数据 | `Ref<TData>` \| `undefined` |
| error | service 抛出的异常 | `Ref<Error>` \| `undefined` |
| loading | service 是否正在执行 | `Ref<boolean>` |
| params | 当次执行的 service 的参数数组。比如你触发了 `run(1, 2, 3)`，则 params 等于 `[1, 2, 3]` | `Ref<TParams>` \| `[]` |
| formatResult | 格式化请求结果，建议使用 `useFormatResult` | `(response: TData) => any` |  |
| run | <ul><li> 手动触发 service 执行，参数会传递给 service</li><li>异常自动处理，通过 `onError` 反馈</li></ul> | `(...params: TParams) => void` |
| runAsync | 与 `run` 用法一致，但返回的是 Promise，需要自行处理异常。 | `(...params: TParams) => Promise<TData>` |
| refresh | 使用上一次的 params，重新调用 `run` | `() => void` |
| refreshAsync | 使用上一次的 params，重新调用 `runAsync` | `() => Promise<TData>` |
| mutate | 直接修改 `data` | `(data?: TData / ((oldData?: TData) => (TData / undefined))) => void` |
| cancel | 取消当前正在进行的请求 | `() => void` |

### Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| manual | <ul><li> 默认 `false`。 即在初始化时自动执行 service。</li><li>如果设置为 `true`，则需要手动调用 `run` 或 `runAsync` 触发执行。 </li></ul> | `boolean` | `false` |
| defaultParams | 首次默认执行时，传递给 service 的参数 | `TParams` | - |
| onBefore | service 执行前触发 | `(params: TParams) => void` | - |
| onSuccess | service resolve 时触发 | `(data: TData, params: TParams) => void` | - |
| onError | service reject 时触发 | `(e: Error, params: TParams) => void` | - |
| onFinally | service 执行完成时触发 | `(params: TParams, data?: TData, e?: Error) => void` | - |

这是 useRequest 最基础的功能，接下来介绍一些更高级的能力。
