import { test, expect } from '@playwright/test';
import { Users } from '../page-data/test-data';
import { LoginPage } from '../pages/login-page';

/**
 * 登陆异常场景
 * 1. 账号密码错误
 * 2. 锁定账号登陆
 */

test.describe('登陆异常', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('登陆账号密码错误显示错误信息', async () => {
        // 使用错误的密码登陆
        await loginPage.login(Users.locked.username, `${Users.locked.password}888`);
        // 验证错误信息
        const errorText = await loginPage.getErrorMessage();
        expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
    });

    test('登陆被锁定账号显示错误信息', async () => {
        // 使用被锁定的用户尝试登录
        await loginPage.login(Users.locked.username, Users.locked.password);
        // 验证错误信息
        const errorText = await loginPage.getErrorMessage();
        expect(errorText).toContain('Sorry, this user has been locked out.');
    });
});