module.exports = {
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1"
  },
  testEnvironment: "node",
  verbose: true,
}
