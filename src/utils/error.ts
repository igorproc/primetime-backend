export const checkErrorIsResponseError = (message: object): boolean => {
  const requiredFields = ['code', 'message']

  for (const field of requiredFields) {
    if (!message.hasOwnProperty(field)) {
      return false
    }
  }
  return true
}
