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

describe("1 - Basic reality check", () => {
    test("1.0 - Can navigate to the Company page + verify it is the correct page by validating an element on that page", async() => {
        console.log("1.0 Start")
        await dtMainPageObject.helloWorldTest()
        console.log("1.0 End")
    }) 
    test("1.1 - Can navigate to the home page + verify it is the correct page by validating an element on that page", async() => {
        console.log("1.1 Start")
        await dtMainPageObject.verifyOnTheHomePage()
        console.log ("1.1 End")
    })  
    test("1.2.2 - Can navigate to nav page and return to home with top left logo (with variable) + verify it is the correct pages by validating an element on each page", async() => {
        console.log("1.2.2 Start")
        await dtMainPageObject.verifyNavItemAndHomeLogoLinkWithVar(dtMainPageObject.byEventsNavListItem,dtMainPageObject.byEventPageTitleField)
        await dtMainPageObject.verifyOnTheHomePage()
       console.log ("1.2.2 End")
    })
})
describe("2 - Search function", () => {
    test("2.0 - Can initiate a search and find relevant content", async() => {
        await dtMainPageObject.search('Truck') // Searches for "Truck"
        let textResults = await dtMainPageObject.getResults()
        expect(textResults).toContain('Truck') // Verifies that the keywords "Truck" does indeed appear in the results
        await dtMainPageObject.returnHomeWithLogoLink() // Returns to home page
    })
})
describe("3 - Contact Us form", () => {
    test("3.0 - Can fill the contact form (but not testing the submission of the form)", async() => {
        await dtMainPageObject.fillContactForm()  
    })
})

afterAll(async () => {
    await dtMainPageObject.driver.quit()
    console.log("AFTER ALL - Browser quit")
});