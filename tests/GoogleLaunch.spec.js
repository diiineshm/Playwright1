const { test, expect } = require("@playwright/test");

test("Launch Google.com and verify page loads", async ({ page }) => {
    // Navigate to Google
    await page.goto("https://www.google.com");

    // Verify the page title
    await expect(page).toHaveTitle("Google");

    // Verify the URL
    await expect(page).toHaveURL(/google.com/);

    // Verify the Google logo is visible
    const logo = page.locator('img[alt="Google"]');
    await expect(logo).toBeVisible();

    // Verify the search box is visible and functional
    const searchBox = page.locator('textarea[name="q"]');
    await expect(searchBox).toBeVisible();

    // Optional: Type in search box to verify it's interactive
    await searchBox.fill("Playwright testing");
    await expect(searchBox).toHaveValue("Playwright testing");
});
