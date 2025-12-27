import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getProductPrice(): Promise<number> {
    const priceText = await this.page.locator('.product-price').innerText();
    return Number(priceText.replace('$', '').trim());
  }

  async addToCart() {
    await this.page.click('input[value="Add to cart"]');
  }
}
