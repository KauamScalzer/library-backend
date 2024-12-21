import type { Config } from 'jest'

const config: Config = {
	roots: ['<rootDir>/src/'],
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest'
	}
}

export default config
