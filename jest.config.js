/** @type {import('ts-jest').JestConfigWithTsJest} **/
export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const rootDir = './tests';
export const testMatch = ['**/*.test.ts'];
export const moduleFileExtensions = ['ts', 'js', 'json', 'node'];
export const globals = {
  'ts-jest': {
    tsconfig: 'tsconfig.json',
  },
};
