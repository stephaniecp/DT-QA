import {expect, jest, test} from '@jest/globals'
import { SearchSource } from 'jest'
import { Actions } from 'selenium-webdriver'
import { DtMainPageObject } from './mainPageObject'
const dtMainPageObject = new DtMainPageObject()
// Test single test by using describe/only / or skip with describe.skip

beforeAll(async () => {
    console.log("BEFORE NAV")
    await dtMainPageObject.navigate()
    console.log("AFTER NAV")
    await dtMainPageObject.driver.manage().window().maximize()
})

describe("1- Basic reality check", () => {
    test("1.0 - Can load the home page", async() => {
        console.log("BEFORE verify")
        await dtMainPageObject.verifyOnTheHomePage()
        console.log ("(1.0) Loaded home page")
    }) 

    // //Test below won't work ultil able to confirm user is on the home page
    // test("1.1 - Can navigate to nav page and return to home with top left logo", async() => {
    //     await dtMainPageObject.VerifyNavItemAndHomeLogoLink()
    //     await dtMainPageObject.verifyOnTheHomePage()
    //    console.log ("(1.1) Clicked nav item + returned home")
    // })  
})

afterAll(async () => {
    await dtMainPageObject.driver.quit()
    console.log("AFTER ALL - Browser quit")
});