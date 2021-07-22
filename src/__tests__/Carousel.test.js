describe("carousel e2e", () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://localhost:3000");
  });
  afterEach(async () => {
    await page.evaluate(() => {
      location.reload(true);
    });
  });
  it("left button should appear on right button click", async () => {
    await expect(page).toClick(".my-slider-wrapper .btn-r");
    await expect(page).toMatchElement(".my-slider-wrapper .btn-l");
  });
});
