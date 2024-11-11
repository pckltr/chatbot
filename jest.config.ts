import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // Set the test environment to jsdom for browser-like testing
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Extend expect with jest-dom matchers
};

export default config;
