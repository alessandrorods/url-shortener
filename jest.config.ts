// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.ts"],
  coverageReporters: ["cobertura", "lcov", "text"],
  reporters: [
    "default",
    ["jest-junit", { suiteName: "jest tests" }],
    ["jest-stare", { resultDir: ".reports", reportTitle: pkg.name }],
  ],
};
