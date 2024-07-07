const {execSync} = require('child_process')

const types = [
    {
        group: 'content-balancer',
        name: 'kp',
        link: 'https://kinopoiskapiunofficial.tech/documentation/api/openapi.json',
    },
    {
        group: 'content-balancer',
        name: 'kp-pay',
        link: 'https://api.kinopoisk.dev/documentation-json'
    }
]

function generateSwaggerTypes(data) {
  try {
    const outputPath = `.types/${data.group}`
    const fileName = `${data.name}.d.ts`
    const command = `swagger-typescript-api -p ${data.link} -o ${outputPath} -n ${fileName}`

    execSync(command)
    console.log(`generate group: ${data.group}, name: ${fileName}`)
  } catch (error) {
    throw error
  }
}

(async () => {
  console.log('[types:generate], start  generate types')
  types.forEach(type => generateSwaggerTypes(type))
  console.log('[types:generate], types generate successfully')
})()
