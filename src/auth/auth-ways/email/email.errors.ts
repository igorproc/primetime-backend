export const EmailErrors = {
  BAD_PAYLOAD: { code: 'AE406', message: 'Невалидные данные' },
  BAD_PASSWORD: { code: 'AE403-CHECK-ERROR', message: 'вы ввели неверный email или пароль' },
  UNIQUE_FIELDS: { code: 'AE403-UNIQUE-FIELDS', message: 'Пользователь с таким логином или email уже существует' },
  FAKE_EMAIL: { code: 'AE403-EMAIL-TRUST', message: 'Почтовый ящик не является подтвержденным' },
  INTERNAL_SERVER: { code: 'AE500', message: '[Auth\\Email] something went wrong, contact me https://t.me/pr0s1k' },
}
