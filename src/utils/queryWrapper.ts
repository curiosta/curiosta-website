import { signal } from "@preact/signals"


const queryWrapper = async <T>(callback: () => Promise<T>) => {
  const data = signal<T | null>(null);
  const loading = signal<boolean>(false);
  const error = signal<Error | null>(null);
  try {
    loading.value = true;
    data.value = await callback();
  } catch (err) {
    error.value = err as Error;
  } finally {
    loading.value = false
  }

  return {
    data: data.value,
    error: error.value,
    loading: loading.value,
  }
}

export default queryWrapper