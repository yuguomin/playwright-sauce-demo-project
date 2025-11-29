/**
 * 结账第一步页面
 */
import { type Locator, type Page } from "@playwright/test";

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly shoppingCart: Locator;
  readonly cancelBtn: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.shoppingCart = page.locator(".shopping_cart_link");
    this.cancelBtn = page.locator("#cancel");
    this.continueBtn = page.locator("#continue");
  }

  async inputInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickCart() {
    await this.shoppingCart.click();
  }

  async clickCancel() {
    this.cancelBtn.click();
  }

  async clickContinue() {
    this.continueBtn.click();
  }
}
