import useAutoRunPlugin from './plugins/useAutoRunPlugin'
import useCachePlugin from './plugins/useCachePlugin'
import useDebouncePlugin from './plugins/useDebouncePlugin'
import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin'
import usePollingPlugin from './plugins/usePollingPlugin'
import useRefreshOnWindowFocusPlugin from './plugins/useRefreshOnWindowFocusPlugin'
import useRetryPlugin from './plugins/useRetryPlugin'
import useThrottlePlugin from './plugins/useThrottlePlugin'

import useRequestImplement from './useRequestImplement'

import { Options, Plugin, Service } from './types'

function useRequest<
  TData,
  TParams extends unknown[] = unknown[],
  PluginsOptions extends Plugin<TData, TParams>[] = Plugin<TData, TParams>[]
>(
  service: Service<TData, TParams>,
  options?: Options<
    TData,
    TParams,
    PluginsOptions extends (infer P)[] ? (P extends Plugin<TData, TParams, infer R> ? R : any) : any
  >,
  plugins?: PluginsOptions,
) {
  return useRequestImplement<TData, TParams>(service, options, [
    ...(plugins || []),
    useDebouncePlugin,
    useLoadingDelayPlugin,
    usePollingPlugin,
    useRefreshOnWindowFocusPlugin,
    useThrottlePlugin,
    useAutoRunPlugin,
    useCachePlugin,
    useRetryPlugin,
  ] as Plugin<TData, TParams>[])
}

export default useRequest
