import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    automock: false,
    setupFilesAfterEnv: ["./jest.setup.ts"],
};
export default config;
