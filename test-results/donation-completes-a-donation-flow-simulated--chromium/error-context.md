# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: donation.spec.ts >> completes a donation flow (simulated)
- Location: tests/donation.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Detail Program')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Detail Program')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - banner [ref=e6]:
      - button [ref=e9] [cursor=pointer]:
        - img [ref=e10]
    - generic [ref=e12]:
      - img [ref=e14]
      - generic [ref=e15]:
        - heading "Beasiswa Pendidikan Anak Yatim Berprestasi" [level=1] [ref=e16]
        - generic [ref=e18]:
          - generic [ref=e19]:
            - generic [ref=e20]: Terkumpul
            - generic [ref=e21]: Rp 4.800.000
          - generic [ref=e23]: dari Rp 5.000.000
        - generic [ref=e26]:
          - generic [ref=e27]: AZ
          - generic [ref=e28]:
            - generic [ref=e29]: Yayasan Amil Zakat
            - generic [ref=e30]:
              - img [ref=e31]
              - text: Terverifikasi
      - generic [ref=e34]:
        - heading "Cerita Penggalangan Dana" [level=2] [ref=e35]
        - generic [ref=e36]:
          - paragraph [ref=e37]: Panti Asuhan Harapan Baru saat ini menampung 45 anak yatim dan piatu. Namun, kondisi bangunan panti sangat memprihatinkan. Atap bocor di mana-mana saat hujan, dan tembok mulai retak membahayakan anak-anak.
          - paragraph [ref=e38]: Mari bersama-sama bantu renovasi Panti Asuhan ini agar anak-anak bisa tidur dan belajar dengan aman dan nyaman. Setiap Rupiah yang Anda donasikan akan sangat berarti bagi mereka.
    - button "Donasi Sekarang" [ref=e40] [cursor=pointer]
  - generic [ref=e42]:
    - link "Home" [ref=e43] [cursor=pointer]:
      - /url: /
      - img [ref=e44]
      - generic [ref=e47]: Home
    - link "Donasi" [ref=e48] [cursor=pointer]:
      - /url: /donasi
      - img [ref=e49]
      - generic [ref=e54]: Donasi
    - link "Riwayat" [ref=e55] [cursor=pointer]:
      - /url: /riwayat
      - img [ref=e56]
      - generic [ref=e59]: Riwayat
    - link "Akun" [ref=e60] [cursor=pointer]:
      - /url: /akun
      - img [ref=e61]
      - generic [ref=e64]: Akun
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('completes a donation flow (simulated)', async ({ page }) => {
  4  |   await page.goto('/');
  5  | 
  6  |   // Wait for campaigns to load and click the first one in the list
  7  |   await page.waitForSelector('text=Terkumpul');
  8  |   const firstCampaign = page.locator('section#campaigns a[href^="/campaign/"]').first();
  9  |   await firstCampaign.click();
  10 | 
  11 |   // Wait for the campaign details page
> 12 |   await expect(page.locator('text=Detail Program')).toBeVisible();
     |                                                     ^ Error: expect(locator).toBeVisible() failed
  13 |   
  14 |   // Click Donasi Sekarang
  15 |   await page.click('text=Donasi Sekarang');
  16 | 
  17 |   // We should be on the donasi page
  18 |   await expect(page.locator('text=Masukkan Nominal')).toBeVisible();
  19 | 
  20 |   // Fill out the form
  21 |   await page.fill('input[type="number"]', '50000');
  22 |   await page.fill('input[placeholder="Nama Lengkap"]', 'Hamba Allah Test');
  23 |   
  24 |   // Check anonymous box
  25 |   await page.check('input[type="checkbox"]');
  26 | 
  27 |   // Submit
  28 |   await page.click('text=Lanjutkan Pembayaran');
  29 | 
  30 |   // Wait for the toast and redirection to simulasi page
  31 |   await expect(page.locator('text=Menuju halaman pembayaran')).toBeVisible();
  32 |   await expect(page).toHaveURL(/\/donasi\/simulasi-pembayaran\?id=.+/);
  33 | 
  34 |   // Click simulate success
  35 |   await page.click('text=Simulasi Berhasil (PAID)');
  36 | 
  37 |   // Verify success page
  38 |   await expect(page.locator('text=Alhamdulillah')).toBeVisible();
  39 |   await expect(page.locator('text=Kembali ke Beranda')).toBeVisible();
  40 | });
  41 | 
```