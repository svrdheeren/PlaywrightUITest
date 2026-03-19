import {test as base} from '@playwright/test'
import { PageManager } from './page-objects/pageManager'
import { NavigationPage } from './page-objects/navigationPage'

export type TestOptions = {
    globalsQaURL: string
    pageManager: PageManager
    navigationPage: NavigationPage
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ["", {option: true}],

    navigationPage: async({page}, use ) => {
        const np = new NavigationPage(page)
        await use(np)
    },


    pageManager: async({page}, use ) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})