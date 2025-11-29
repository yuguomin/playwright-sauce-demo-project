/**
 * 商品列表页面
 */
import { type Locator, type Page, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly productSortContainer: Locator;
    readonly inventoryItems: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productSortContainer = page.locator('[data-test="product-sort-container"]');
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    async addItemToCart(itemName: string) {
        const item = this.inventoryItems.filter({ hasText: itemName });
        await item.locator('button').click();
    }

    async clickItemName(itemName: string) {
        const item = this.inventoryItems.filter({ hasText: itemName });
        await item.locator('.inventory_item_name').click();
    }

    async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.productSortContainer.selectOption(option);
    }

    async getCartItemCount() {
        return await this.shoppingCartBadge.textContent();
    }
}