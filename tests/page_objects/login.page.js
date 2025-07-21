export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.loginButton = page.locator("button.css-wmpqfy");
  }

  async loginAsAdmin(email, password) {
    if (!email) email = "admin@gmail.com";
    if (!password) password = "DontTestMe";

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
