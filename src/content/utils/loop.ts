export async function asyncWhile(condition: boolean, action: () => Promise<void>): Promise<void> {
  if (!condition) {
    return
  }

  await action()
  return asyncWhile(condition, action)
}