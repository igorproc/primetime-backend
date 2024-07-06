npx npx swagger-typescript-api \
  -p https://kinopoiskapiunofficial.tech/documentation/api/openapi.json \
  -o ./src/content/balancers/kp/swagger -n kp.types.ts && \
npx swagger-typescript-api \
  -p https://api.kinopoisk.dev/documentation-json \
  -o ./src/content/balancers/kp-pay/ -n kp-pay.types.ts && \
npm run test && \
npm run test:e2e && \
npx prisma migrate deploy && \
npm run build
