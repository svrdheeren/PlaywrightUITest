import { test, expect } from "@playwright/test";

    test("mobileTest", async ({ page }) => {
        await page.goto("/");
        await page.locator(".sidebar-toggle").click()
        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click();
        await page.locator(".sidebar-toggle").click()
        const usingtheGridEmailInput = page.locator("nb-card", { hasText: "Using the Grid" }).getByPlaceholder("Email");
        await usingtheGridEmailInput.fill("test@example.com");
    })