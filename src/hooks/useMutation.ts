import type { Signal } from '@preact/signals';
import { useSignal } from "@preact/signals"

type QueryFetchSignal<P, T> = { loading: Signal<boolean>, data: Signal<null | T>, error: Signal<Error | undefined>, payload: P };
type QueryFetchFunction<P, T> = (payload: P) => Promise<T>;

export type QueryReturn<PayloadData, ReturnData = any> = {
  loading: boolean;
  data: null | ReturnData,
  error: Error | undefined,
  mutate: (payload: PayloadData) => Promise<ReturnData | undefined>
}

const mutateQuery = async <PayloadData, ReturnData>({ loading, data, error, payload }: QueryFetchSignal<PayloadData, ReturnData>, fn: QueryFetchFunction<PayloadData, ReturnData>) => {
  try {
    loading.value = true;
    const result = await fn(payload);
    data.value = result;
    return result
  } catch (exception: any) {
    error.value = exception
  } finally {
    loading.value = false
  }
}

const useMutation = async <PayloadData, ReturnData>(fn: (payload: PayloadData) => Promise<ReturnData>) => {
  const loading = useSignal<boolean>(false);
  const data = useSignal<null | ReturnData>(null);
  const error = useSignal<Error | undefined>(undefined);

  const mutate = async (payload: PayloadData) => {
    return await mutateQuery<PayloadData, ReturnData>({ data, error, loading, payload }, fn);
  }

  return { data: data.value, error: error.value, loading: loading.value, mutate } as QueryReturn<PayloadData, ReturnData>
}

export default useMutation