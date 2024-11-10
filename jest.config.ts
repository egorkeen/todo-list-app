export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      { tsconfig: "tsconfig.app.json" }
    ]
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$":
      "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
};
