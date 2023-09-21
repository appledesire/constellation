module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "testEnvironment": "jsdom",
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "moduleNameMapper": {
      '@/(.+)': "<rootDir>/src/$1",
      '@assets/(.+)': "<rootDir>/src/assets/$1",
      '@components/(.+)': "<rootDir>/src/components/$1",
      '@config/(.+)': "<rootDir>/src/config/$1",
      '@pages/(.+)': "<rootDir>/src/pages/$1",
      '@store/(.+)': "<rootDir>/src/store/$1",
      '@tests/(.+)': "<rootDir>/src/__tests__/$1",
      '@theme/(.+)': "<rootDir>/src/theme/$1",
      '@utils/(.+)': "<rootDir>/src/utils/$1",
    }
}