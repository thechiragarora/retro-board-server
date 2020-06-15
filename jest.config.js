module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['.*\\.d\\.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: { '^.+\\.js$': 'babel-jest' },
  testResultsProcessor: 'jest-sonar-reporter',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  testPathIgnorePatterns: [
    '/node-modules/',
    './build',
  ],
  collectCoverageFrom: [
    'src/**/**/*.js',
    '!src/index.js',
    '!src/**/index.js',
  ],
  testMatch: ['**/test/**/*.(test|spec).(ts|js)'],
  verbose: true,
};
