describe("custom dropdown e2e", () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://localhost:3000");
    page.waitForNavigation()
  });
  afterEach(async () => {
    await page.evaluate(() => {
      location.reload(true);
    });
  });
  it("should open", async () => {
    await page.waitForSelector('button div img[src="delivery.svg"]')
    await expect(page).toClick('button div img[src="delivery.svg"]');
    await page.waitFor(600);
    await expect(page).toMatchElement(".custom-dropdown");
  });
  it("should open and close on page body click", async () => {
    await page.waitForSelector('button div img[src="delivery.svg"]')
    await expect(page).toClick('button div img[src="delivery.svg"]');
    await page.waitFor(600);
    await expect(page).toMatchElement(".custom-dropdown");
    await page.click('body')
    await expect(page).not.toMatchElement('.custom-dropdown');
  });
  it("should open and close on page scroll", async () => {
    await page.waitForSelector('button div img[src="delivery.svg"]')
    await expect(page).toClick('button div img[src="delivery.svg"]');
    await page.waitFor(600);
    await expect(page).toMatchElement(".custom-dropdown");
    await page.evaluate(() => window.scroll(0, 200))
    await expect(page).not.toMatchElement('.custom-dropdown');
  });
  it("should open and not close on dropdown click", async () => {
    await page.waitForSelector('button div img[src="delivery.svg"]')
    await expect(page).toClick('button div img[src="delivery.svg"]');
    await page.waitFor(600);
    await expect(page).toClick('.custom-dropdown');
    await expect(page).toMatchElement(".custom-dropdown");
  });
});