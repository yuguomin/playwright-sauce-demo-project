import { test, expect } from "../fixtures/hooks";

test.skip("结合fixture测试hooks执行时机", () => {
  let x: number;
  x = 1;

  test.beforeAll(() => {
    console.log("beforeAll");
  });

  test.afterAll(() => {
    console.log("afterAll");
  });

  test.afterEach(() => {
    console.log("afterEach");
  });

  test.beforeEach(() => {
    console.log("beforeEach");
  });

  test("test 1", async ({ page }) => {
    expect(x).toBe(1);
  });

  test("test 2", async ({ page }) => {
    expect(x).toBe(1);
  });

  test("test 3", async ({ page }) => {
    expect(x).toBe(1);
  });
});