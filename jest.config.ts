module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'jest-css-modules-transform',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/utils/test-file-stub.ts',
    '^@ui$': '<rootDir>/src/components/ui',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages',
    '^@utils-types$': '<rootDir>/src/utils/types'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};
