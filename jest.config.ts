/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-fixed-jsdom",
  moduleNameMapper: pathsToModuleNameMapper(
    {
      "@/*": ["*"],
      "@services/*": ["services/*"],
      "@pages/*": ["pages/*"],
    },
    {
      prefix: "<rootDir>/src/",
    },
  ),
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.app.json",
        diagnostics: { ignoreCodes: ["TS151001"] },
      },
    ],
  },
};

export default config;
