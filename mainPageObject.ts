import {By, WebElement, until, Origin, Button} from 'selenium-webdriver'
import {BasePage} from './basePage'
const fs= require('fs') // File System 

export class DtMainPageObject extends BasePage {
// Selectors below

    //Home page
    byHomePageH3TextField: By =By.xpath("//h3[normalize-space()='We are shaping the future of transportation']") // Verified > $x("//h3[normalize-space()='We are shaping the future of transportation']")
    byHomeLogo: By =By.xpath("//body/header/section/div/a[@class='logo']/img[1]")
    // Events page
    byEventsNavListItem: By =By.xpath("//body//header//section//nav//section//ul//li//a[normalize-space()='Events']")
    byEventPageTitleField: By =By.xpath("//p[contains(text(),'DTNA x SXSW')]")
    // Company page
    byCompanyNavListItem: By =By.xpath("//body//header//section//nav//section//ul//li//a[normalize-space()='Company']")
    byCompanyPageTitleField: By =By.xpath("//h3[normalize-space()='Innovation + Impact = DTNA DNA']")
    // Footer
    byFooterContactLink: By =By.xpath("//a[normalize-space()='Contact']")
    // Contact page
    byContactPageFirstName: By =By.xpath("//input[@name='FirstName']")
    byContactPageLastName: By =By.xpath("//input[@name='LastName']")
    byContactPagePhone: By =By.xpath("//input[@name='Phone']")
    byContactPageEmail: By =By.xpath("//input[@name='Email']")
    byContactPageTopicPreClick: By =By.xpath("//select[@name='Topic']")
    byContactPageTopic1Corporate: By =By.xpath("//select[@name='Topic']/option[text() = 'Corporate Giving']")
    byContactPageSubject: By =By.xpath("//input[@name='Subject']")
    byContactPageMessage: By =By.xpath("//textarea[@name='Message']")

    constructor(){
        super({url:"https://northamerica.daimlertruck.com/"}) // Comment out when trying alt test above
    }

// Custom methods below
    async returnHomeWithLogoLink() {
        await this.click(this.byHomeLogo) // Clicks to return to home page
    }
    //1.0
    async helloWorldTest() {
        await this.click(this.byCompanyNavListItem)  // Clicks to access Company page
        await this.verifyElementExists(this.byCompanyPageTitleField) // Confirms Company page is loaded by verify element exists
        await this.returnHomeWithLogoLink() // Clicks to return to home page
    }
    //1.1
    async verifyOnTheHomePage() {
        await this.verifyElementExists(this.byHomePageH3TextField) // Confirms Home page is loaded by verify element exists
    }
    //1.2.2
    async verifyNavItemAndHomeLogoLinkWithVar(byLinkElement: By, byElementToVerify: By) {
        await this.click(byLinkElement) // Complete
        await this.verifyElementExists(byElementToVerify) // Complete
        await this.returnHomeWithLogoLink() // Clicks to return to home page
    }
    // 2.0
    searchIconCollapsed: By = By.xpath("//i[@class='icon-search'][1]")
    searchFieldExpanded: By = By.xpath("//input[@placeholder='Search Daimler Truck North America']")
    byResultsField: By = By.xpath("//div[@class='search-results']/ul")
    async search(searchTerm: string) {
        console.log ("2.0 - Search function started")
        // await this.click(this.searchIconCollapsed)
        const searchIcon = await this.getCollapsedSearchIcon()
        if (searchIcon) {
            await searchIcon.click()
        } else {
            throw new Error('Search icon not found')
        }
        console.log ("2.0 - Search icon clicked")
        return this.setInput(this.searchFieldExpanded, `${searchTerm}\n`)
        console.log ("2.0 - Seach field expanded + entered text")
    }
    async getResults() {
        return this.getText(this.byResultsField)
    }
    async getCollapsedSearchIcon() { // This method is because there is more than one seach icon but only one visible at a time, so I want to return the one that is visible
        const allSearchIcons = await this.driver.findElements(this.searchIconCollapsed)
        for (let i = 0; i < allSearchIcons.length; i++) {
            const searchIcon = allSearchIcons[i]
            const isDisplayed = await searchIcon.isDisplayed()
            if (isDisplayed) {
                return searchIcon
            }
        }
        return null
    }
    // 3.0
    async fillContactForm() {
        await this.click(this.byFooterContactLink) // Clicks to access Contact page
        console.log ("3.0 - 1")
        await this.setInput(this.byContactPageFirstName, "John")
        console.log ("3.0 - 2")
        await this.setInput(this.byContactPageLastName, "Doe")
        console.log ("3.0 - 3")
        await this.setInput(this.byContactPagePhone, "1234567890")
        console.log ("3.0 - 4")
        await this.setInput(this.byContactPageEmail, "johndoe@test.com")
        console.log ("3.0 - 5")
        await this.click(this.byContactPageTopicPreClick)
        console.log ("3.0 - 6")
        await this.click(this.byContactPageTopic1Corporate)
        console.log ("3.0 - 7")
        await this.setInput(this.byContactPageSubject, "QA Test")
        console.log ("3.0 - 8")
        await this.setInput(this.byContactPageMessage, "QA Test, please ignore")
        console.log ("3.0 - 9")
    }


}