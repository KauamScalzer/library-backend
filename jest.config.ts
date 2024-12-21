import type { Config } from 'jest'

const config: Config = {
	roots: ['<rootDir>/src/'],
	collectCoverageFrom: ['<rootDir>/src/'],
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8'
}

export default config
