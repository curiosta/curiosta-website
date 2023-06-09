let timer: NodeJS.Timeout | undefined = undefined;


const debounce = (callback: () => void, duration = 300) => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    callback()
  }, duration)
}

export default debounce