/**
 * 购物车界面
 */
import { type Locator, type Page, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly shoppingCartBadge: Locator;
    readonly cartItems: Locator;
    readonly continueShoppingBtn: Locator;
    readonly checkoutBtn: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item');
        this.continueShoppingBtn = page.locator('#continue-shopping');
        this.checkoutBtn = page.locator('#checkout');
    }

    async clickContinueShoppingBtn() {
        await this.continueShoppingBtn.click();
    }

    async clickCheckoutBtn() {
        await this.checkoutBtn.click();
    }

    async addItemRemove(itemName: string) {
        const item = this.cartItems.filter({ hasText: itemName });
        await item.locator('button').click();
    }

    async clickItemName(itemName: string) {
        const item = this.cartItems.filter({ hasText: itemName });
        await item.locator('.inventory_item_name').click();
    }

    async getCartItemCount() {
        return await this.shoppingCartBadge.textContent();
    }
}