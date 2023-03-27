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
    //1.2
    async verifyNavItemAndHomeLogoLink() {
        await this.click(this.byEventsNavListItem) // Clicks to access Event page
        await this.verifyElementExists(this.byEventPageTitleField) // Confirms Events page is loaded by verify element exists
        await this.returnHomeWithLogoLink() // Clicks to return to home page
    }
    //1.3
    async verifyNavItemAndHomeLogoLinkWithVar(byLinkElement: By, byElementToVerify: By) {
        await this.click(byLinkElement) // Complete
        await this.verifyElementExists(byElementToVerify) // Complete
        await this.returnHomeWithLogoLink() // Clicks to return to home page
    }

}