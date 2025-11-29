/**
 * 左上角菜单栏组件功能
 */
import { type Locator, type Page } from '@playwright/test';

export class MenuComponent {
    readonly page: Page;
    readonly logOutBtn: Locator;
    readonly openBtn: Locator;
    readonly closeBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logOutBtn = page.locator('#logout_sidebar_link');
        this.openBtn = page.getByRole('button', { name: 'Open Menu' });
        this.closeBtn = page.getByRole('button', { name: 'Close Menu' });
    }

    async openMenu() {
        this.openBtn.click();
    }

    async closeMenu() {
        this.closeBtn.click();
    }

    async clickLogout() {
        await this.logOutBtn.click();
    }
}