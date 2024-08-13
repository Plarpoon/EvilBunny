module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.mjs$': 'babel-jest', // Transform ESM files with babel-jest
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files with ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
