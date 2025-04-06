export async function waitFor (delay: number) {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(true)
    }, delay)
  })
}
