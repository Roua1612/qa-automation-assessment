import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getTotalPrice(): Promise<number> {
    const totalText = await this.page.locator('.product-subtotal').first().innerText();
    return Number(totalText.replace('$', '').trim());
  }

  async acceptTerms() {
    await this.page.check('#termsofservice');
  }

  async checkout() {
    await this.page.click('#checkout');
  }
}
