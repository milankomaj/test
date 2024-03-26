
const { test, expect } = require('@playwright/test');
const theme = await page.evaluate(() => sessionStorage.getItem("theme"));





test('has title', async ({ page }) => {
  console.log("👉 1: ")
  await page.goto('https://milankomaj-934e3.firebaseapp.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/milankomaj/);
});


test('Page Screenshot', async ({ page }) => {
  console.log("👉 2: ")
  await page.goto('https://milankomaj-934e3.firebaseapp.com//');
  await page.screenshot({ path: `test-results/screenshot.png` });
});

test('get other link', async ({ page }) => {
  console.log("👉 3: ")
  await page.goto('https://milankomaj-934e3.firebaseapp.com/');

  // Click the get other link.
  await page.getByRole('link', { name: 'other' }).click();

  // Expects page to have a heading with the name of about:.
  await expect(page.getByRole('heading', { name: 'about:' })).toBeVisible();


  // Screenshot before click.
  await page.screenshot({ path: `test-results/click.png` });


  // togle theme
  await page.locator('xpath=//*[@id="toDark"]').click({ timeout: 20000 });
  console.log("👉 theme: ", theme)
  await page.goto('https://milankomaj-934e3.firebaseapp.com/');
  await page.screenshot({ path: `test-results/click2.png` });


});


test('Page Screenshot', async ({ page }) => {
  console.log("👉 4: ")
  await page.goto('https://milankomaj-934e3.firebaseapp.com//');
    // togle theme
  await page.locator('xpath=//*[@id="toDark"]').click({ timeout: 20000 });
  console.log("👉 theme: ", theme)
  await page.screenshot({ path: `test-results/click3.png` });
});
