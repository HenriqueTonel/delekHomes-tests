import { faker } from "@faker-js/faker";

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[name="firstName"]');
    this.lastNameInput = page.locator('[name="lastName"]');
    this.emailInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.registerButton = page.locator('button:has-text("Register")');
  }

  async registerAsUser(firstName, lastName, email, password) {
    if (!firstName) firstName = faker.person.firstName();
    if (!lastName) lastName = "Test";
    if (!email)
      email = faker.internet.email({
        firstName: firstName,
        lastName: lastName,
        provider: "test.com",
        allowSpecialCharacters: true,
      });
    if (!password) password = faker.internet.password();

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await this.registerButton.click();
  }
}
