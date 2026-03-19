import {expect } from '@playwright/test';
import {test} from '../test-options';

test("iFrame and Drag&Drop", async({page,globalsQaURL})=> {
    await page.goto(globalsQaURL);
    const iFrame = page.frameLocator('[rel-title="Photo Manager"] iframe');
    await iFrame.locator("li", {hasText: "High Tatras 2"}).dragTo(iFrame.locator("#trash"));
    await expect(iFrame.locator("#trash li h5")).toHaveText(["High Tatras 2"]);

    //more precise drag and drop
    await iFrame.locator("li", {hasText: "High Tatras 4"}).hover();
    page.mouse.down();
    await iFrame.locator("#trash").hover();
    page.mouse.up();
    await expect(iFrame.locator("#trash li h5")).toHaveText(["High Tatras 2", "High Tatras 4"]);
})