import { test, expect } from '@playwright/test';

test('completes a donation flow (simulated)', async ({ page }) => {
  await page.goto('/');

  // Wait for campaigns to load and click the first one in the list
  await page.waitForSelector('text=Terkumpul');
  const firstCampaign = page.locator('section#campaigns a[href^="/campaign/"]').first();
  await Promise.all([
    page.waitForNavigation(),
    firstCampaign.click()
  ]);

  // Wait for the campaign details page
  await expect(page.locator('text=Detail Program')).toBeVisible();
  
  // Click Donasi Sekarang
  await page.click('text=Donasi Sekarang');

  // We should be on the donasi page
  await expect(page.locator('text=Masukkan Nominal')).toBeVisible();

  // Fill out the form
  await page.fill('input[type="number"]', '50000');
  await page.fill('input[placeholder="Nama Lengkap"]', 'Hamba Allah Test');
  
  // Check anonymous box
  await page.check('input[type="checkbox"]');

  // Submit
  await page.click('text=Lanjutkan Pembayaran');

  // Wait for the toast and redirection to simulasi page
  await expect(page.locator('text=Menuju halaman pembayaran')).toBeVisible();
  await expect(page).toHaveURL(/\/donasi\/simulasi-pembayaran\?id=.+/);

  // Click simulate success
  await page.click('text=Simulasi Berhasil (PAID)');

  // Verify success page
  await expect(page.locator('text=Alhamdulillah')).toBeVisible();
  await expect(page.locator('text=Kembali ke Beranda')).toBeVisible();
});
