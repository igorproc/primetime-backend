export const AuthErrors = {
  NO_CLIENT_ID: { code: 'A406', message: 'client-id not found' },
  BAD_CLIENT_ID: { code: 'A403', message: 'client-id is uncorrected' },
  INTERNAL_ERROR: { code: 'A500', message: '[Auth] something went wrong, contact me https://t.me/pr0s1k' },
  BAD_JWT: { code: 'A403-1', message: 'token is uncorrected' },
  LOGOUT: { code: 'A401', message: 'token was withdrawn' },
}
