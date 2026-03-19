import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import {faker} from "@faker-js/faker"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
});

test("Navigate to form layout page", async ({ page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().tooltipPage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().smartTablePage(); 
});

test("parameeterized methods", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    //const randomEmail = faker.color
    //console.log(randomEmail)
    await pm.onFormLayoutPage().formLayoutUsingTheGrid("test@example.com", "password123", "Option 1");
});