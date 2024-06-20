// Node Deps
import { pathsToModuleNameMapper } from 'ts-jest'
// Config
import { compilerOptions } from './tsconfig.json'
// Types
import type { Config } from '@jest/types'

const paths = compilerOptions.paths

const jestConfig: Config.InitialOptions = {
  // Base
  rootDir: './',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  passWithNoTests: true,
  // Aliases
  moduleNameMapper: pathsToModuleNameMapper(
    paths,
    {
      prefix: '<rootDir>'
    }
  ),
  // Coverage
  collectCoverageFrom: [
    '**/*.(t|j)s'
  ],
  coverageDirectory: 'coverage'
}

export default jestConfig
