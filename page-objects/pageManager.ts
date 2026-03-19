import { Page } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { FormLayoutPage } from "./formLayoutPage"; 

export class PageManager {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formLayoutPage: FormLayoutPage;
    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formLayoutPage = new FormLayoutPage(this.page);
    }   

    navigateTo(){
        return this.navigationPage; 
    }

    onFormLayoutPage() {
        return this.formLayoutPage;
    }

    onDatepickerPage() {
        return this.navigationPage.datepickerPage();
    }
}