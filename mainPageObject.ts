import {By, WebElement, until, Origin, Button} from 'selenium-webdriver'
import {BasePage} from './basePage'
const fs= require('fs') // File System 

export class DtMainPageObject extends BasePage {
    // Selectors below
    byHomePageVideo: By =By.xpath("//video[@id='html5_video_hv1vsgn8ti']") // Verified > $x("//video[@id='html5_video_hv1vsgn8ti']")
    byEventsNavListItem: By =By.xpath("//body//header//section//nav//section//ul//li//a[normalize-space()='Events']")
    byCompanyNavListItem: By =By.xpath("//body//header//section//nav//section//ul//li//a[normalize-space()='Company']")
    byHomeLogo: By =By.xpath("//body/header/section/div/a[@class='logo']/img[1]")

    constructor(){
        // super({url:"https://northamerica.daimlertruck.com/company/"}) // Delete - Alt test (works)
        super({url:"https://northamerica.daimlertruck.com/"}) // Comment out when trying alt test above
    }

    // Custom methods below

    testToBeDeletedHome: By =By.className("rbc-toolbar-label") // Delete
    testToBeDeletedCompany: By =By.xpath("//h3[normalize-space()='Innovation + Impact = DTNA DNA']") // Delete - Alt test (works)
    async helloWorldTest() {
        await this.click(this.byCompanyNavListItem)  // Clicks to access Company page
        await this.verifyElementExists(this.testToBeDeletedCompany)
        await this.click(this.byHomeLogo) // Clicks to return to home page
    }

    // homePageVideo: By = By.xpath("/video[@id='html5_video_hv1vsgn8ti']") // Delete?
    async verifyOnTheHomePage() {
        // await this.verifyElementExists(this.byHomePageVideo) // Delete - Alt test (works)
        // await this.verifyElementExists(this.testToBeDeletedHome) // Temp selector
    }

    eventsNavListItem: By = By.xpath("//body//header//section//nav//section//ul//li//a[normalize-space()='Events']")
    homeLogo: By = By.xpath("//body/header/section/div/a[@class='logo']/img[1]")

    // async VerifyNavItemAndHomeLogoLink() {
    //     await this.click(this.eventsNavListItem) // to take in a variable later
    //     await this.click(this.homeLogo) 
    // }

}