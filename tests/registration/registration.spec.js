// @ts-check
import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../page_objects/register.page";
import { HomePage } from "../../page_objects/home.page";
import { DashboardPage } from "../../page_objects/dashboard.page";
import { faker, Faker } from "@faker-js/faker";

test.describe("Registration scenarios", () => {
  let registerPage;
  let homePage;
  let dashboardPage;

    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      registerPage = new RegisterPage(page);
      homePage = new HomePage(page);
      dashboardPage = new DashboardPage(page);
    });

  test("Should register a new User", async ({ page }) => {
    const firstName = faker.person.firstName();
    const lastName = "Test";
    const fullName = `${firstName} ${lastName}`;

    await homePage.registerButton.click();

    await registerPage.registerAsUser(
      firstName,
      lastName,
      undefined,
      undefined
    );

    await expect(page).toHaveURL("dashboard/user/profile");

    await expect(dashboardPage.fullUsersName).toHaveText(fullName);
    await expect(dashboardPage.userRole).toHaveText("role: user");
  });

  test("Should not register with an already registered email", async ({
    page,
  }) => {
    const registeredEmail = "admin@gmail.com";

    await page.goto("/");

    await homePage.registerButton.click();

    await registerPage.registerAsUser(
      undefined,
      undefined,
      registeredEmail,
      undefined
    );

    await registerPage.registerButton.click();

    const response = await page.waitForResponse(
      (res) =>
        res.url().includes("/api/users/registration") &&
        res.request().method() === "POST"
    );
    expect(response.status()).not.toBe(201);

    const body = await response.json();
    expect(body.errors.username).toBe("Email must be unique.");
  });

  test("Should not register without filling in the required fields.", async ({
    page,
  }) => {
    await homePage.registerButton.click();

    await registerPage.registerButton.click();

    await expect(page.getByText("First name required")).toBeVisible();
    await expect(page.getByText("Last name required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });
});
