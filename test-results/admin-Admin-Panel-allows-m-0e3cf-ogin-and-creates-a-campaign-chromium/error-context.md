# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> Admin Panel >> allows mock admin login and creates a campaign
- Location: tests/admin.spec.ts:11:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Admin Dashboard')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Admin Dashboard')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - banner [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e8]:
          - generic [ref=e9]: A
          - generic [ref=e10]: Amil Zakat
        - link [ref=e12] [cursor=pointer]:
          - /url: /akun
          - img [ref=e13]
    - main [ref=e16]:
      - generic [ref=e18]:
        - heading "Kebaikan Berawal dari Sini" [level=1] [ref=e21]:
          - text: Kebaikan Berawal
          - text: dari Sini
        - paragraph [ref=e22]: Tunaikan zakat dan sedekah dengan mudah dan aman.
        - button "Mulai Donasi" [ref=e23] [cursor=pointer]
      - generic [ref=e24]:
        - heading "Mau berbuat baik apa hari ini?" [level=2] [ref=e25]
        - generic [ref=e26]:
          - link "Donasi" [ref=e27] [cursor=pointer]:
            - /url: "#campaigns"
            - img [ref=e29]
            - generic [ref=e31]: Donasi
          - link "Zakat" [ref=e32] [cursor=pointer]:
            - /url: "#campaigns"
            - img [ref=e34]
            - generic [ref=e37]: Zakat
          - link "Galang Dana" [ref=e38] [cursor=pointer]:
            - /url: /admin/campaigns/create
            - img [ref=e40]
            - generic [ref=e43]: Galang Dana
          - link "Admin Panel" [ref=e44] [cursor=pointer]:
            - /url: /admin
            - img [ref=e46]
            - generic [ref=e49]: Admin Panel
      - generic [ref=e50]:
        - generic [ref=e51]:
          - heading "Program Mendesak" [level=2] [ref=e52]
          - generic [ref=e53] [cursor=pointer]: Lihat Semua
        - generic [ref=e54]:
          - link "Campaign Image Beasiswa Pendidikan Anak Yatim Berprestasi Terkumpul Rp 4.800.000 dari Rp 5.000.000" [ref=e55] [cursor=pointer]:
            - /url: /campaign/0bb6a406-6687-4704-ba9d-086a44cbb9c9
            - generic [ref=e56]:
              - img "Campaign Image" [ref=e59]
              - generic [ref=e61]:
                - heading "Beasiswa Pendidikan Anak Yatim Berprestasi" [level=3] [ref=e62]
                - generic [ref=e64]:
                  - generic [ref=e65]:
                    - generic [ref=e66]: Terkumpul
                    - generic [ref=e67]: Rp 4.800.000
                  - generic [ref=e69]: dari Rp 5.000.000
          - link "Campaign Image Bantu Renovasi Panti Asuhan Harapan Baru yang Hampir Rubuh Terkumpul Rp 15.500.000 dari Rp 50.000.000" [ref=e72] [cursor=pointer]:
            - /url: /campaign/39086a99-045f-4347-a1cd-6d8ebc61fe9d
            - generic [ref=e73]:
              - img "Campaign Image" [ref=e76]
              - generic [ref=e78]:
                - heading "Bantu Renovasi Panti Asuhan Harapan Baru yang Hampir Rubuh" [level=3] [ref=e79]
                - generic [ref=e81]:
                  - generic [ref=e82]:
                    - generic [ref=e83]: Terkumpul
                    - generic [ref=e84]: Rp 15.500.000
                  - generic [ref=e86]: dari Rp 50.000.000
          - link "Campaign Image Beasiswa Pendidikan Anak Yatim Berprestasi Terkumpul Rp 4.800.000 dari Rp 5.000.000" [ref=e89] [cursor=pointer]:
            - /url: /campaign/76179545-44ab-4e38-8c70-592246c99638
            - generic [ref=e90]:
              - img "Campaign Image" [ref=e93]
              - generic [ref=e95]:
                - heading "Beasiswa Pendidikan Anak Yatim Berprestasi" [level=3] [ref=e96]
                - generic [ref=e98]:
                  - generic [ref=e99]:
                    - generic [ref=e100]: Terkumpul
                    - generic [ref=e101]: Rp 4.800.000
                  - generic [ref=e103]: dari Rp 5.000.000
          - link "Campaign Image Sedekah Air Bersih untuk Warga Desa Kekeringan Terkumpul Rp 3.200.000 dari Rp 10.000.000" [ref=e106] [cursor=pointer]:
            - /url: /campaign/8f3b7f6f-276b-4a4f-a20e-9cab799ec24f
            - generic [ref=e107]:
              - img "Campaign Image" [ref=e110]
              - generic [ref=e112]:
                - heading "Sedekah Air Bersih untuk Warga Desa Kekeringan" [level=3] [ref=e113]
                - generic [ref=e115]:
                  - generic [ref=e116]:
                    - generic [ref=e117]: Terkumpul
                    - generic [ref=e118]: Rp 3.200.000
                  - generic [ref=e120]: dari Rp 10.000.000
          - link "Campaign Image Sedekah Air Bersih untuk Warga Desa Kekeringan Terkumpul Rp 3.200.000 dari Rp 10.000.000" [ref=e123] [cursor=pointer]:
            - /url: /campaign/e5c79901-bfd8-40c2-bf54-ed39a2dd02bf
            - generic [ref=e124]:
              - img "Campaign Image" [ref=e127]
              - generic [ref=e129]:
                - heading "Sedekah Air Bersih untuk Warga Desa Kekeringan" [level=3] [ref=e130]
                - generic [ref=e132]:
                  - generic [ref=e133]:
                    - generic [ref=e134]: Terkumpul
                    - generic [ref=e135]: Rp 3.200.000
                  - generic [ref=e137]: dari Rp 10.000.000
          - link "Campaign Image Bantu Renovasi Panti Asuhan Harapan Baru yang Hampir Rubuh Terkumpul Rp 15.500.000 dari Rp 50.000.000" [ref=e140] [cursor=pointer]:
            - /url: /campaign/edc391e9-3c56-4bd7-8a6e-165faab361ad
            - generic [ref=e141]:
              - img "Campaign Image" [ref=e144]
              - generic [ref=e146]:
                - heading "Bantu Renovasi Panti Asuhan Harapan Baru yang Hampir Rubuh" [level=3] [ref=e147]
                - generic [ref=e149]:
                  - generic [ref=e150]:
                    - generic [ref=e151]: Terkumpul
                    - generic [ref=e152]: Rp 15.500.000
                  - generic [ref=e154]: dari Rp 50.000.000
  - generic [ref=e158]:
    - link "Home" [ref=e159] [cursor=pointer]:
      - /url: /
      - img [ref=e160]
      - generic [ref=e163]: Home
    - link "Donasi" [ref=e164] [cursor=pointer]:
      - /url: /donasi
      - img [ref=e165]
      - generic [ref=e170]: Donasi
    - link "Riwayat" [ref=e171] [cursor=pointer]:
      - /url: /riwayat
      - img [ref=e172]
      - generic [ref=e175]: Riwayat
    - link "Akun" [ref=e176] [cursor=pointer]:
      - /url: /akun
      - img [ref=e177]
      - generic [ref=e180]: Akun
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Admin Panel', () => {
  4  |   test('redirects to home if not admin', async ({ page }) => {
  5  |     await page.goto('/admin');
  6  |     // If pending is not properly awaited, it might redirect to / or it might stay if not implemented well
  7  |     // But anyway, it should end up at /
  8  |     await expect(page).toHaveURL('/');
  9  |   });
  10 | 
  11 |   test('allows mock admin login and creates a campaign', async ({ page }) => {
  12 |     // Go to account page
  13 |     await page.goto('/akun');
  14 |     
  15 |     // Click the mock login button
  16 |     await page.click('text=Mock Login (Admin)');
  17 | 
  18 |     // The endpoint redirects to / after setting the cookie
  19 |     await expect(page).toHaveURL('/');
  20 | 
  21 |     // Now go to admin dashboard
  22 |     await page.goto('/admin');
> 23 |     await expect(page.locator('text=Admin Dashboard')).toBeVisible();
     |                                                        ^ Error: expect(locator).toBeVisible() failed
  24 | 
  25 |     // Go to create campaign
  26 |     await page.click('text=Buat Campaign Baru');
  27 |     await expect(page).toHaveURL('/admin/campaigns/create');
  28 | 
  29 |     // Fill form
  30 |     const uniqueTitle = `Test Campaign ${Date.now()}`;
  31 |     await page.fill('input[placeholder="Masukkan judul"]', uniqueTitle);
  32 |     await page.fill('textarea[placeholder="Ceritakan detail program"]', 'This is a test description generated by automated tests.');
  33 |     await page.fill('input[placeholder="0"]', '1000000');
  34 |     
  35 |     // Submit
  36 |     await page.click('text=Simpan Campaign');
  37 | 
  38 |     // Should redirect to campaigns list and show toast
  39 |     await expect(page).toHaveURL('/admin/campaigns');
  40 |     await expect(page.locator('text=Campaign berhasil dibuat')).toBeVisible();
  41 | 
  42 |     // The new campaign should be in the list
  43 |     await expect(page.locator(`text=${uniqueTitle}`)).toBeVisible();
  44 |   });
  45 | });
  46 | 
```