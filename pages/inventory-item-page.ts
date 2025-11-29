/**
 * 商品详情页面
 */
import { type Locator, type Page, expect } from '@playwright/test';

export class InventoryItemPage {
    readonly page: Page;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCart: Locator;
    readonly backToList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.backToList = page.locator('#back-to-products');
    }

    async addItemToCart() {
        const item = this.page.locator('#add-to-cart');
        await item.click();
    }

    async clickRemove() {
        const item = this.page.locator('#remove');
        await item.click();
    }

    async clickCart() {
        await this.shoppingCart.click();
    }

    async clickBack() {
        this.backToList.click();
    }

    async getCartItemCount() {
        return await this.shoppingCartBadge.textContent();
    }
}