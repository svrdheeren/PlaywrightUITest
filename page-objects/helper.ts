import { Page } from '@playwright/test';

export class HelperClass{
    readonly page: Page;
    constructor (page: Page){
        this.page = page
    }
    async waitForNumberOfSec(timeInSec: number){
        await this.page.waitForTimeout(timeInSec * 1000)
    }
}