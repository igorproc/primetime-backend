export async function asyncWhile(condition: boolean, action: () => Promise<void>, delay?: number): Promise<void> {
  if (!condition) {
    return
  }

  await action()
  if (!delay) {
    return asyncWhile(condition, action)
  }

  const timeout = setTimeout(() => {
    clearTimeout(timeout)
    return asyncWhile(condition, action)
  }, delay)
}