export class DashboardPage {
  constructor(page) {
    this.fullUsersName = page.locator("h6.css-1k96qjc");
    this.userRole = page.locator("p.css-10n697b");
    this.userMenu = page.locator("button.css-w5qhhs");
    this.userMenuLogout = page.locator("li.css-p9n58v");
  }
}
