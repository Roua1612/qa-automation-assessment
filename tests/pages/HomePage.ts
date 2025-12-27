import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goToLogin() {
    await this.page.click('a[href="/login"]');
  }

  async openProduct(productName: string) {
    if (productName === 'Build your own cheap computer') {
      await this.page.goto('/build-your-cheap-own-computer');
    } else if (productName === 'Simple Computer') {
      await this.page.goto('/simple-computer');
    } else {
      throw new Error(`Product not supported: ${productName}`);
    }
  }
}
