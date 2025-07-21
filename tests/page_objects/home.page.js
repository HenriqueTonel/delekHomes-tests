export class HomePage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.locator('[href="/auth/login"]');
    this.registerButton = page.locator('[href="/auth/register"]');
  }
}
