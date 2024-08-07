import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page}) => {
    //by Tag name
    page.locator('input')

    //by ID
    await page.locator('#inputEmail1').click()

    //by Class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Full Class value 
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //by Combination of different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by XPath (not recommended. Use as last resource)
    page.locator('//*[@id="nbinput"]')

    //by Partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('Test locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
})

test('Locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()
})

test('Reusing locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async({page}) => {
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeHolderValue = await emailField.getAttribute('placeholder')
    expect(placeHolderValue).toEqual('Email')
})

test('assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

    //General assertions
    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})