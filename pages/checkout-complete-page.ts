/**
 * 结算完成页面
 */
import { type Locator, type Page } from "@playwright/test";

export class CheckoutCompletePage {
  readonly page: Page;
  readonly shoppingCart: Locator;
  readonly backHomeBtn: Locator;
  readonly checkoutResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCart = page.locator(".shopping_cart_link");
    this.backHomeBtn = page.locator("#back-to-products");
    this.checkoutResult = page.locator(".title");
  }

  async clickCart() {
    await this.shoppingCart.click();
  }

  async clickBackHome() {
    this.backHomeBtn.click();
  }

  async getCheckoutResult() {
    return await this.checkoutResult.textContent();
  }
}
