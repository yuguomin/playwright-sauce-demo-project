import { test, expect } from '@playwright/test';
import { Users, Products, Address } from '../page-data/test-data';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { InventoryItemPage } from '../pages/inventory-item-page';
import { CheckoutStepOnePage } from '../pages/checkout-step-one-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutStepTwoPage } from '../pages/checkout-step-two-page';
import { CheckoutCompletePage } from '../pages/checkout-complete-page';
import { CheckoutResult } from '../page-data/constant';
import { MenuComponent } from '../pages/menu';

/**
 * 完美购物流程
 * 1. 用户登录
 * 2. 成功进入商品列表页，点击商品图片进入商品详情
 * 3. 点击商品加入购物车
 * 4. 点击购物车
 * 5. 点击去付款
 * 6. 正常输入姓名和地址
 * 7. 点击继续支付
 * 8. 点击结束支付
 * 9. 点击左上角菜单进行用户登出
 */

test.describe('完美购物流程', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let inventoryItemPage: InventoryItemPage;
    let cartPage: CartPage;
    let checkoutStepOnePage: CheckoutStepOnePage;
    let checkoutStepTwoPage: CheckoutStepTwoPage;
    let checkoutCompletePage: CheckoutCompletePage;
    let menuComponent: MenuComponent;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        inventoryItemPage = new InventoryItemPage(page);
        cartPage = new CartPage(page);
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        checkoutCompletePage = new CheckoutCompletePage(page);
        menuComponent = new MenuComponent(page);
        // 可通过waitUntil来优化整体时间，以及在一些用户视角进行test
        await loginPage.goto();
    });

    test('成功登录并完成购买', async ({ page }) => {
        await test.step('Step1: 登录', async () => {
            await loginPage.login(Users.standard.username, Users.standard.password);
            await expect(page).toHaveURL(/.*inventory.html/);
            await page.screenshot({ path: 'screenshots/after-login.png', fullPage: true });
        })

       await test.step('Step2: 点击商品名称进入详情页', async () => {
            await inventoryPage.clickItemName(Products.backpack);
            await expect(page).toHaveURL(/.*inventory-item.html\?id=\d+/);
        })

       await test.step('Step3: 点击添加到购物车验证购物车数量更新', async () => {
            await inventoryItemPage.addItemToCart();
            await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
        })

       await test.step('Step4: 点击购物车', async () => {
            await inventoryItemPage.clickCart();
            await expect(page).toHaveURL(/.*cart.html/);
        })

       await test.step('Step5: 点击去付款', async () => {
            await cartPage.clickCheckoutBtn();
            await expect(page).toHaveURL(/.*checkout-step-one.html/);
        })

       await test.step('Step6: 正常输入姓名和地址', async () => {
            const { firstName, lastName, postalCode } = Address.allRight;
            await checkoutStepOnePage.inputInformation(firstName, lastName, postalCode);
        })

       await test.step('Step7: 点击继续支付', async () => {
            await checkoutStepOnePage.clickContinue();
            await expect(page).toHaveURL(/.*checkout-step-two.html/);
        })

       await test.step('Step8: 点击结束支付', async () => {
            await checkoutStepTwoPage.clickFinish();
            await expect(page).toHaveURL(/.*checkout-complete.html/);
            await expect(checkoutCompletePage.checkoutResult).toHaveText(CheckoutResult.success);
        })

       await test.step('Step9: 点击菜单栏后登出', async () => {
            await menuComponent.openMenu();
            await menuComponent.clickLogout();
            await expect(page).toHaveURL(/^https\:\/\/www\.saucedemo\.com\/$/);
        });
    });
});