import { test, expect } from '@playwright/test';

test('has title and displays campaigns', async ({ page }) => {
  await page.goto('/');

  // Expect the hero section to be visible
  await expect(page.locator('text=Kebaikan Berawal')).toBeVisible();

  // Expect the menu grid to be visible
  await expect(page.locator('text=Mau berbuat baik apa hari ini?')).toBeVisible();
  await expect(page.getByText('Donasi', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Zakat', { exact: true })).toBeVisible();

  // Expect campaigns section
  await expect(page.locator('text=Program Mendesak')).toBeVisible();
  
  // Wait for campaigns to load (it fetches from API)
  // There should be at least one campaign card
  await page.waitForSelector('text=Terkumpul', { timeout: 5000 });
  const campaignCards = page.locator('text=Terkumpul');
  expect(await campaignCards.count()).toBeGreaterThan(0);
});
