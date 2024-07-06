import { execSync } from 'child_process'

function generateSwaggerTypes(typeName: string) {
  const outputPath = `dist/${typeName}`

  const command = `
    npx swagger-typescript-api \
      -p https://kinopoiskapiunofficial.tech/documentation/api/openapi.json \
      -o ${outputPath} -n ${typeName}.d.ts
  `
  execSync(command, { stdio: 'inherit' })
}

module.exports = {
  generateKPTypes: () => generateSwaggerTypes('kp'),
  generateKPPayTypes: () => generateSwaggerTypes( 'kp-pay')
}
