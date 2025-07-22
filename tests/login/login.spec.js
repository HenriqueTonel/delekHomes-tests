// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page_objects/login.page";
import { HomePage } from "../../page_objects/home.page";
import { DashboardPage } from "../../page_objects/dashboard.page";

test.describe("Login", () => {
  let loginPage;
  let homePage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    dashboardPage = new DashboardPage(page);
  });

  test("Should login with an existing Admin account", async ({ page }) => {

    await homePage.loginButton.click();

    await loginPage.loginAsAdmin();

    await expect(dashboardPage.fullUsersName).toHaveText("Admin Adminuk");
    await expect(dashboardPage.userRole).toHaveText("role: admin");
  });

  test("Should log out", async ({ page }) => {
    await page.goto("/");

    await homePage.loginButton.click();

    await loginPage.loginAsAdmin();

    await expect(page).toHaveURL("/dashboard/user/profile");

    await dashboardPage.userMenu.click();
    await dashboardPage.userMenuLogout.click();

    await expect(page).toHaveURL("/auth/login");
  });
});
