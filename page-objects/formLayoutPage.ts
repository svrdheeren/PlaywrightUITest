import { Page } from "@playwright/test";

export class FormLayoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    } 

    async formLayoutUsingTheGrid(email: string, password: string, options: string) {
        const usingtheGridForm = this.page.locator("nb-card", { hasText: "Using the Grid" });
        await usingtheGridForm.getByPlaceholder("Email").fill(email);
        await usingtheGridForm.getByPlaceholder("Password").fill(password);
        await usingtheGridForm.getByRole("radio", {name: options}).check({force: true});
        await usingtheGridForm.getByRole("button").click();
    };
}