import {Locator, Page} from '@playwright/test';
import { HelperClass } from './helper';

export class NavigationPage extends HelperClass{
    readonly formLayoutMenuItem: Locator;
    readonly datepickerMenuItem: Locator;
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator;
    readonly tooltipMenuItem: Locator;
    
    constructor(page: Page) {
        super(page);
        this.formLayoutMenuItem = page.getByText("Form Layouts");
        this.datepickerMenuItem = page.getByText("Datepicker");
        this.smartTableMenuItem = page.getByText("Smart Table");
        this.toastrMenuItem = page.getByText("Toastr");
        this.tooltipMenuItem = page.getByText("Tooltip");
    }   

    async formLayoutsPage() {
        await this.expandselection("Forms");
        await this.waitForNumberOfSec(1);
        await this.formLayoutMenuItem.click();
    }

    async datepickerPage() {
        await this.expandselection("Forms");
        this.waitForNumberOfSec(1);
        await this.datepickerMenuItem.click();
    }

    async smartTablePage() {
        await this.expandselection("Tables & Data");
        await this.smartTableMenuItem.click();
    }   

    async toastrPage() {
        await this.expandselection("Modal & Overlays");
        await this.toastrMenuItem.click();
    }

    async tooltipPage() {
        await this.expandselection("Modal & Overlays");
        await this.tooltipMenuItem.click();
    }

    private async expandselection(gettheSelection: string) {
        const getItem = this.page.getByTitle(gettheSelection);
        const isExpanded = await getItem.getAttribute("aria-expanded");
        if (isExpanded === "false") {
            await getItem.click();
        }
    }
}