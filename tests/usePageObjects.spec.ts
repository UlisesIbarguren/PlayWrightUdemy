import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'


test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('navigate to form page', async({page}) =>{
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(30)
})