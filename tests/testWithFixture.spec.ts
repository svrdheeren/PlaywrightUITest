import { test } from "../test-options";
import {faker} from "@faker-js/faker"

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});
test("parameterized methods @smoke @regression", async ({ pageManager }) => {
    //navigationPage.formLayoutsPage()
    await pageManager.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutPage().formLayoutUsingTheGrid("test@example.com", "password123", "Option 1");
});