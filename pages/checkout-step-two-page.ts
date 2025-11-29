/**
 * 结账第二步页面
 */
import { type Locator, type Page } from "@playwright/test";

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly shoppingCart: Locator;
  readonly cancelBtn: Locator;
  readonly finishBtn: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCart = page.locator(".shopping_cart_link");
    this.cancelBtn = page.locator("#cancel");
    this.finishBtn = page.locator("#finish");
    this.cartItems = page.locator(".cart_item");
  }

  async clickItemName(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    await item.locator(".inventory_item_name").click();
  }

  async clickCart() {
    await this.shoppingCart.click();
  }

  async clickCancel() {
    this.cancelBtn.click();
  }

  async clickFinish() {
    this.finishBtn.click();
  }
}
