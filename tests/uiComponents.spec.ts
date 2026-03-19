import { test, expect } from "@playwright/test";
import { only } from "node:test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("UI Components", () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click();
    })
    test.only("Visual Comparision", async ({ page }) => {
        const usingtheGridForm = page.locator("nb-card", { hasText: "Using the Grid" });
        await usingtheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})
        const option1 = usingtheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        await expect(usingtheGridForm).toHaveScreenshot({maxDiffPixels: 210})
        
    });
    test("Input Fields", async ({ page }) => {
        const usingtheGridEmailInput = page.locator("nb-card", { hasText: "Using the Grid" }).getByPlaceholder("Email");
        await usingtheGridEmailInput.fill("test@example.com");
        await usingtheGridEmailInput.clear();
        await usingtheGridEmailInput.pressSequentially("test@example.com", {delay: 500});

        //assertions
        //generic assertion
        const inputValue = await usingtheGridEmailInput.inputValue();
        expect(inputValue).toEqual("test@example.com");

        //locator assertion
        await expect(usingtheGridEmailInput).toHaveValue("test@example.com");
    })
    test("Radio Buttons", async ({ page }) => {
        const usingtheGridForm = page.locator("nb-card", { hasText: "Using the Grid" });
        const option1 = usingtheGridForm.getByRole('radio', {name: "Option 1"})
        await option1.check({force: true});

        //assertions
        //generic assertion
        const isOption1Checked = await option1.isChecked();
        expect(isOption1Checked).toBeTruthy();

        //locator assertion
        await expect(option1).toBeChecked();
        expect(isOption1Checked).toBeTruthy();
    });
});


test("CheckBox", async({page})=> {
    await page.getByTitle("Modal & Overlays").click();
    await page.getByText("Toastr").click()
    await page.getByRole("checkbox", {name: "Hide on click"}).uncheck({force: true});
    await page.getByRole("checkbox", {name: "Prevent arising of duplicate toast"}).check({force: true});

    //check/unckeck all checkboxes
    const checkboxes = page.getByRole("checkbox");
    for (const checkbox of await checkboxes.all()) {
        await checkbox.check({force: true});
        expect(await checkbox.isChecked()).toBeTruthy();
    }
    for (const checkbox of await checkboxes.all()) {
        await checkbox.uncheck({force: true});
        expect(await checkbox.isChecked()).toBeFalsy();
    }
})

test("Listbox", async({page})=> {
    const dropdownMenu =  page.locator("ngx-header nb-select");
    await dropdownMenu.click();
    const listOptions = page.locator("nb-option-list nb-option");
    await expect(listOptions).toHaveCount(4);
    await expect(listOptions).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
    await listOptions.filter({hasText: "Dark"}).click();
    const header = page.locator("nb-layout-header");

    const colors = {
        Light: "rgb(255, 255, 255)",
        Dark: "rgb(34, 43, 69)",
        Cosmic: "rgb(50, 50, 89)",
        Corporate: "rgb(255, 255, 255)",
        } as const;

    await dropdownMenu.click();

    for (const color of Object.keys(colors) as Array<keyof typeof colors>) {
        await listOptions.filter({ hasText: color }).click();
        await expect(header).toHaveCSS("background-color", colors[color]);
        if (color !== "Corporate") {
            await dropdownMenu.click();
        }
    }
})

test("Tooltip", async({page})=> {
    await page.getByTitle("Modal & Overlays").click();
    await page.getByText("Tooltip").click()
    await page.getByRole("button", {name: "Top"}).hover();
    const tooltiptext = await page.locator("nb-tooltip").textContent();
    expect(tooltiptext).toEqual("This is a tooltip");
})

test("Dailog", async({page})=> {
    await page.getByTitle("Tables & Data").click();
    await page.getByText("Smart Table").click()
    page.on("dialog", async dialog => {
        expect(dialog.message()).toEqual("Are you sure you want to delete?");
        await dialog.accept();
    })
    await page.locator("table tr", {hasText: 'mdo@gmail.com'}).locator(".nb-trash").click();
    await expect(page.locator("table tr").first()).not.toHaveText("mdo@gmail.com");
})

test("web table1", async({page})=> {
    await page.getByTitle("Tables & Data").click();
    await page.getByText("Smart Table").click()
    const targetRow = page.getByRole("row", {name: "twitter@outlook.com"})
    await targetRow.locator(".nb-edit").click();
    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.locator("input-editor").getByPlaceholder("Age").fill("30");
    await page.locator(".nb-checkmark").click();
    await expect(targetRow).toHaveText(/30/);
})

test("web table2", async({page})=> {
    await page.getByTitle("Tables & Data").click();
    await page.getByText("Smart Table").click()
    await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
    const targetRow = page.getByRole("row", {name: "11"}).filter({has: page.locator("td").nth(1).getByText("11")});
    await targetRow.locator(".nb-edit").click();
    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.locator("input-editor").getByPlaceholder("Age").fill("29");
    await page.locator(".nb-checkmark").click();
    await expect(targetRow).toHaveText(/29/);

    const ages = ["20","30","40","50"]
    for (let age of ages) {
        await page.locator("input-filter").getByPlaceholder("Age").clear();
        await page.locator("input-filter").getByPlaceholder("Age").fill(age);
        await page.waitForTimeout(500);
        const ageRows =page.locator("tbody tr")
        for (const row of await ageRows.all()) {
            if(age=="50"){
                expect(await page.locator("table").textContent()).toContain(" No data found ");
            } else {
                expect(await row.locator("td").last().textContent()).toEqual(age);
            }
        }
    }
})

test("Datepicker", async({page})=> {
    await page.getByTitle("Forms").click();
    await page.getByText("Datepicker").click()
    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click();
    await page.locator('[class="day-cell ng-star-inserted"]').getByText("15", { exact: true }).click();
    await expect(calendarInputField).toHaveValue("Mar 15, 2026");

    let date = new Date();
    date.setDate(date.getDate() + 500);
    const expectedDate = date.getDate().toString();
    const expectedMonth = date.toLocaleString("En-US", { month: "short" });
    const expectedYear = date.getFullYear().toString();
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    await calendarInputField.click();
    let calMonthYear = await page.locator("nb-calendar-view-mode").textContent();
    const expectedMonthYear = ` ${expectedMonthLong} ${expectedYear} `;
    while (calMonthYear?.trim() !== expectedMonthYear.trim()) {
        await page.locator('[data-name="chevron-right"]').click();
        calMonthYear = await page.locator("nb-calendar-view-mode").textContent();
    }
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click();
    const expectedDateString = `${expectedMonth} ${expectedDate}, ${expectedYear}`;
    await expect(calendarInputField).toHaveValue(expectedDateString);

})

test("Slider", async({page})=> {
    //update Attribute cx and cy
    // const tempGauge = page.locator('[tabtitle="Temperature"] circle');
    // await tempGauge.evaluate((element) => {
    //     element.setAttribute("cx", "232.630");
    //     element.setAttribute("cy", "232.630");
    // });
    // await tempGauge.click();
    // expect(await page.locator ('[tabtitle="Temperature"] ngx-temperature-dragger')).toContainText("30");
    // })
    
    //By Mouse movement
    const tempBox = page.locator ('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();
    const box = await tempBox.boundingBox();
    if (!box) throw new Error("Element not visible or not in DOM");
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x + 100, y+100);
    await page.mouse.up();
    await expect(tempBox).toContainText("30");
})

