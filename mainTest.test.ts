import {expect, jest, test} from '@jest/globals'
import { SearchSource } from 'jest'
import { Actions } from 'selenium-webdriver'
import { DtMainPageObject } from './mainPageObject'
const dtMainPageObject = new DtMainPageObject()
// Test single test by using describe/only / or skip with describe.skip

jest.setTimeout(100000) // Move above P.O. const creation if any methods are timing out

beforeAll(async () => {
    console.log("BEFORE NAV")
    await dtMainPageObject.navigate()
    console.log("AFTER NAV")
    await dtMainPageObject.driver.manage().window().maximize()
})

describe("1- Basic reality check", () => {
    test("1.0 - Can verify an element on the Company page", async() => {
        console.log("1.0 Start")
        await dtMainPageObject.helloWorldTest()
        console.log("1.0 End")
    }) 
    test("1.1 - Can load the home page", async() => {
        console.log("1.1 Start")
        await dtMainPageObject.verifyOnTheHomePage()
        console.log ("1.1 End")
    }) 
    test("1.2 - Can navigate to nav page and return to home with top left logo", async() => {
        await dtMainPageObject.verifyNavItemAndHomeLogoLink()
        await dtMainPageObject.verifyOnTheHomePage()
       console.log ("1.2 End")
    })  
})

afterAll(async () => {
    await dtMainPageObject.driver.quit()
    console.log("AFTER ALL - Browser quit")
});