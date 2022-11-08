import { unref, ref, watchEffect } from "vue";
import type { Plugin, Interval } from "../types";
import isDocumentVisible from "../utils/isDocumentVisible";
import subscribeReVisible from "../utils/subscribeReVisible";

const usePollingPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = true }
) => {
  const timerRef = ref<Interval>();
  const unsubscribeRef = ref<() => void>();
  

  const stopPolling = () => {
    if (timerRef.value) {
      clearInterval(timerRef.value);
    }
    unsubscribeRef.value?.();
  };

  watchEffect(() => {
    if (!unref(pollingInterval)) {
      stopPolling();
    }
  });

  if (!unref(pollingInterval)) {
    return {};
  }

  return {
    onBefore: () => {
      stopPolling();
    },
    onFinally: () => {
      if (!pollingWhenHidden && !isDocumentVisible()) {
        unsubscribeRef.value = subscribeReVisible(() => {
          fetchInstance.refresh();
        });
        return;
      }

      timerRef.value = setInterval(() => {
        fetchInstance.refresh();
      },unref(pollingInterval));
    },
    onCancel: () => {
      stopPolling();
    },
  };
};

export default usePollingPlugin;
