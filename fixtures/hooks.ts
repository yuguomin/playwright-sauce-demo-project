import { test as base } from "@playwright/test";

export const test = base.extend<{ testHook: void }>({
  testHook: [
    async ({}, use) => {
      console.log("testHook before");
      // 这里的任何代码都将作为 before each 钩子运行

      await use();

      console.log("testHook after");
      // 在这里放置你想在每个测试后自动运行的代码
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test"; 