import { test, expect } from '@playwright/test';
import productsData from '../data/products.json';

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Place order with multiple products and validate price', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cart = new CartPage(page);

  // Navigate to home
  await home.navigate('https://demowebshop.tricentis.com');

  // Login
  await home.goToLogin();
  await login.login(
    process.env.USER_EMAIL!,
    process.env.USER_PASSWORD!
  );

  // Add multiple products to cart
  for (const product of productsData.products) {
    await home.openProduct(product);
    await productPage.addToCart();
    await home.navigate('https://demowebshop.tricentis.com');
  }

  // Go to cart
  await page.goto('https://demowebshop.tricentis.com/cart');

  // Validate cart total
  const cartTotal = await cart.getTotalPrice();
  expect(cartTotal).toBeGreaterThan(0);

  // Checkout
  await cart.acceptTerms();
  await cart.checkout();

  // Validate navigation to checkout page
  await expect(page).toHaveURL(/checkout/);
});
