import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string) {
    await this.page.fill('#Email', email);
    await this.page.fill('#Password', password);
    await this.page.click('input[value="Log in"]');
  }
}
