import type { Signal } from '@preact/signals';
import { useSignal } from "@preact/signals"

type QueryFetchSignal<T> = { loading: Signal<boolean>, data: Signal<null | T>, error: Signal<Error | undefined> };
type QueryFetchFunction<T> = () => Promise<T>;

export type QueryReturn<ReturnData = any> = {
  loading: boolean;
  data: null | ReturnData,
  refetch: () => void;
  error: Error | undefined
}


const fetchQuery = async <ReturnData>({ loading, data, error }: QueryFetchSignal<ReturnData>, fn: QueryFetchFunction<ReturnData>) => {
  try {
    loading.value = true;
    const result = await fn();
    data.value = result;
  } catch (exception: any) {
    error.value = exception
  } finally {
    loading.value = false
  }
}

/**
 * @function useQuery - A hook that receives a function returning a Promise, runs it, updating the load, data, and error signals accordingly, and provides a refetch function.
 * @returns {QueryReturn<ReturnData>}
 * @param {Function} fn - A function that returns an async data
 */
const useQuery = async <ReturnData>(fn: () => Promise<ReturnData>) => {
  const loading = useSignal<boolean>(false);
  const data = useSignal<null | ReturnData>(null);
  const error = useSignal<Error | undefined>(undefined);

  await fetchQuery<ReturnData>({ data, error, loading }, fn);

  const refetch = async () => {
    await fetchQuery<ReturnData>({ data, error, loading }, fn);
  }

  return { data: data.value, loading: loading.value, error: error.value, refetch } as QueryReturn<ReturnData>
}

export default useQuery