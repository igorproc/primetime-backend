export async function asyncWhile(conditionFn: () => boolean, action: () => Promise<void>, delay?: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const loop = () => {
      try {
        if (!conditionFn()) {
          resolve()
          return
        }

        action()
          .then(() => {
            if (!delay) {
              loop()
            }

            const timer = setTimeout(() => {
              clearTimeout(timer)
              loop()
            }, delay)
          })
      } catch (error) {
        reject(error)
      }
    }

    loop()
  })
}
