import { test, expect, request } from "@playwright/test";

const API_URL = process.env.API_URL ?? "https://api.mitranesia.id";

test.describe("smoke @prod", () => {
  test("home renders + has merchants section", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Mitranesia/i);
    await expect(page.locator("body")).toContainText(/Merchant|Mitranesia/i);
  });

  test("merchants list page returns 200 + shows at least one card", async ({ page }) => {
    const response = await page.goto("/merchants");
    expect(response?.ok()).toBeTruthy();
    await page.waitForLoadState("networkidle");
    const merchantText = page.locator("body").first();
    await expect(merchantText).toBeVisible();
  });

  test("insight list renders", async ({ page }) => {
    const response = await page.goto("/insight");
    expect(response?.ok()).toBeTruthy();
  });

  test("API health returns ok with db", async ({ request }) => {
    const res = await request.get(`${API_URL}/health`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.status).toBe("ok");
    expect(body.db).toBe("ok");
  });

  test("API /api/client/merchants returns paginated data with images key", async ({ request }) => {
    const res = await request.get(`${API_URL}/api/client/merchants?page=1&page_size=3`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(Array.isArray(body.data)).toBeTruthy();
    if (body.data.length > 0) {
      expect(body.data[0]).toHaveProperty("slug");
      expect(body.data[0]).toHaveProperty("images");
      expect(body.data[0]).toHaveProperty("isOfficialPartner");
    }
  });

  test("sitemap.xml returns sitemapindex", async ({ request }) => {
    const res = await request.get("https://mitranesia.id/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const text = await res.text();
    expect(text).toContain("<sitemapindex");
    expect(text).toContain("sitemap-merchants.xml");
    expect(text).toContain("sitemap-insights.xml");
  });

  test("WebP negotiation works for /uploads", async ({ request }) => {
    const png = await request.get(`${API_URL}/uploads/merchants/soc-clean.png`, {
      headers: { Accept: "image/png" },
    });
    expect(png.ok()).toBeTruthy();
    const webp = await request.get(`${API_URL}/uploads/merchants/soc-clean.png`, {
      headers: { Accept: "image/webp" },
    });
    expect(webp.ok()).toBeTruthy();
    expect(webp.headers()["content-type"]).toContain("webp");
  });

  test("newsletter subscribe returns 201", async ({ request }) => {
    const email = `e2e-${Date.now()}@example.test`;
    const res = await request.post(`${API_URL}/api/client/newsletter/subscribe`, {
      data: { email, source: "e2e" },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.data.email).toBe(email);
  });
});
