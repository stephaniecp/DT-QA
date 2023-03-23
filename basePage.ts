import {Builder, By, Capabilities, until, WebDriver, WebElement, Actions, Button} from "selenium-webdriver";
import { GamerDaysPageObject } from "./Gamer Days/gamerDaysPageObject";
import { FtfMainPageObject } from "./FTF/FtfMainPageObject";
const fs= require('fs')
//const chromedriver = require("chromedriver")
import { CustomConsole, LogType, LogMessage } from '@jest/console';

function simpleFormatter(type: LogType, message: LogMessage): string {
    const TITLE_INDENT = '    ';
    const CONSOLE_INDENT = TITLE_INDENT + '  ';

    return message
        .split(/\n/)
        .map(line => CONSOLE_INDENT + line)
        .join('\n');
}
global.console = new CustomConsole(process.stdout, process.stderr, simpleFormatter);

interface Options {
    driver?: WebDriver;
    url?: string; 
}

export class BasePage {
    driver: WebDriver;
    url: string;

    constructor(options?: Options) {
        if (options && options.driver) this.driver = options.driver;
        else
        this.driver = new Builder().withCapabilities(Capabilities.chrome()).build()
        //this.driver = new Builder().withCapabilities(Capabilities.firefox()).build()
        if(options && options.url) this.url = options.url
    }
    async navigate(url?: string): Promise<void> {
        if (url) return await this.driver.get(url);
        else if (this.url) return await this.driver.get(this.url)
        else
        return Promise.reject(
            "BasePage.navigate() needs a url defined on the page objects, or one passed in."
        )
    }

    async getElement(elementBy: By, debug:Boolean=false): Promise<WebElement> {
        if (debug) console.log(`getElement phase=start by=${elementBy.toString()}`)
        await this.driver.wait(until.elementLocated(elementBy))
        if (debug) console.log(`getElement phase=elementLocated`)
        let element = await this.driver.findElement(elementBy)
        if (debug) console.log(`getElement phase=elementFound`)

        //elementIsVisible appears to not work with some input fields, maybe checkboxes or labels
        //await this.driver.wait(until.elementIsVisible(element))
        //if (debug) console.log(`getElement phase=elementVisible`)
        return element;
    }

    async click(elementBy: By): Promise<void> {
        return(await this.getElement(elementBy)).click();
    }

    async clickSpecial(elementBy: By): Promise<void> {
        try {
            console.log(`clickSpecial phase=start by=${elementBy.toString()}`)
            let targetElement = await this.getElement(elementBy, true) ;
            try {
                await targetElement.click()
                console.log(`clickSpecial phase=normalClickWorked`)
                return;
            } catch (err) {
                //we tried!!
                console.log(`clickSpecial phase=fallingthroughtoJS by=${elementBy.toString()}`, err)
            }

            console.log(`clickSpecial element found by:${elementBy.toString()} isDisplayed:${await targetElement.isDisplayed()}`)
            await this.describeElement(targetElement, elementBy)
            await this.scrollIntoViewJs(targetElement)
            console.log(`clickSpecial did a js scroll`)
            await this.moveToElementAndWiggle(targetElement, 50)
            console.log(`clickSpecial did a little dance`)

            await this.describeElement(targetElement, elementBy)

            try {
                await this.clickJs(targetElement);
                console.log("clickSpecial phase=clickJs")
            } catch (err) {
                await targetElement.click()
                console.log("clickSpecial phase=clickNormal")
            }
        } catch (err) {
            console.log(`clickSpecial error thrown by:${elementBy.toString()}`)
            console.error(err);
            throw err;
        }
    }

    async setInput(elementBy:By, keys: any): Promise<void> {
        let input = await this.getElement(elementBy);
        await input.clear();
        return input.sendKeys(keys)
    }
    async getText(elementBy: By): Promise<string> {
        return (await this.getElement(elementBy)).getText()
    }
    async getAttribute(elementBy: By, attribute: string): Promise<string> {
        return (await this.getElement(elementBy)).getAttribute(attribute)
    }

    async verifyElementExists(elementBy: By): Promise<void> {
        console.log(`verifyElementExists by:${elementBy}`)
        try {
            await this.getElement(elementBy)
        } catch (err) {
            console.error(`verifyElementExists unable to verify by:${elementBy}`)
            throw err
        }
    }

    async verifyElementsExist(elementBys: By[]): Promise<void> {
        for (const forLocator of elementBys) {
            await this.verifyElementExists(forLocator)
        } 
    }

    async takeScreenShot(filePath: string): Promise<void> {
        await fs.writeFile(
            filePath, 
            await this.driver.takeScreenshot(), 
            "base64",
            (e) => {
                if (e) console.error(e)
                else console.log('Save Successful')
            }
        )
    }

    actionWiggle(actions:Actions, originElement:WebElement, moveDurationMs:number=100):Actions {
        return actions.move({origin: originElement, duration: moveDurationMs}) 
        .move({origin: originElement, x: 10, y: 0, duration: moveDurationMs}) 
        .move({origin: originElement, x: 0, y: -10, duration: moveDurationMs}) 
        .move({origin: originElement, x: -10, y: 0, duration: moveDurationMs}) 
        .move({origin: originElement, x: 0, y: 10, duration: moveDurationMs}) 
        .pause(moveDurationMs)
    }

    actionPressWiggle(actions:Actions, originElement:WebElement, moveDurationMs:number=100):Actions {
        actions = this.actionWiggle(actions, originElement, moveDurationMs);
        actions.press(Button.LEFT)
        return this.actionWiggle(actions, originElement, moveDurationMs)
    }

    actionReleaseWiggle(actions:Actions, originElement:WebElement, moveDurationMs:number=100):Actions {
        actions = this.actionWiggle(actions, originElement, moveDurationMs);
        actions.release(Button.LEFT)
        return this.actionWiggle(actions, originElement, moveDurationMs)        
    }

    async doPressHoldMoveRelease(fromElement: WebElement, toElement: WebElement): Promise<void> {
        //required importing "Actions" 
        // return this.driver.actions().dragAndDrop(fromElement, toElement).perform()
        console.log(`doPressHoldMoveRelease phase=Start`)
        const moveDuration = 50
        await this.driver.actions().clear()
        let actions = this.driver.actions()

        actions = this.actionPressWiggle(actions, fromElement, moveDuration)
        actions = this.actionReleaseWiggle(actions, toElement, moveDuration)

        const actionPromise:Promise<void> = actions.perform();
        console.log(`doPressHoldMoveRelease phase=Done`)
        return await actionPromise
    }

    async moveToElementAndWiggle(toElement: WebElement, moveDuration = 50): Promise<void> {
        console.log(`moveToElementAndWiggle phase=Start`)
        await this.driver.actions().clear()
        let actions = this.driver.actions()
        actions = this.actionWiggle(actions, toElement, moveDuration)
        const actionPromise:Promise<void> = actions.perform();
        console.log(`moveToElementAndWiggle phase=Done`)
        return await actionPromise
    }

    async describeElement(toElement: WebElement, elementBy?: By) {
        console.log("describeElement>>>>>>>>>>>>>>>>>")
        console.log(await toElement.getAttribute("outerHTML"))
        if (typeof elementBy !== 'undefined') {
            console.log(`by:${elementBy.toString()}`)
        }
        console.log(`isElementInViewPort=${await this.isElementInViewportJs(toElement)}`)
        console.log("describeElement<<<<<<<<<<<<<<<<<")
    }

    // Should be exported to personal basePage - add mouse icon to view what it's doing while running tests
    /**
    * Some debug code inspired by:
    * https://stackoverflow.com/a/52669454
    */
     async showMouseMovement() {
        const jsCode = `
        function enableCursor() {
            var seleniumFollowerImg = document.createElement('img');
            seleniumFollowerImg.setAttribute('src', 'data:image/png;base64,'
            + 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAQAAACGG/bgAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAA'
            + 'HsYAAB7GAZEt8iwAAAAHdElNRQfgAwgMIwdxU/i7AAABZklEQVQ4y43TsU4UURSH8W+XmYwkS2I0'
            + '9CRKpKGhsvIJjG9giQmliHFZlkUIGnEF7KTiCagpsYHWhoTQaiUUxLixYZb5KAAZZhbunu7O/PKf'
            + 'e+fcA+/pqwb4DuximEqXhT4iI8dMpBWEsWsuGYdpZFttiLSSgTvhZ1W/SvfO1CvYdV1kPghV68a3'
            + '0zzUWZH5pBqEui7dnqlFmLoq0gxC1XfGZdoLal2kea8ahLoqKXNAJQBT2yJzwUTVt0bS6ANqy1ga'
            + 'VCEq/oVTtjji4hQVhhnlYBH4WIJV9vlkXLm+10R8oJb79Jl1j9UdazJRGpkrmNkSF9SOz2T71s7M'
            + 'SIfD2lmmfjGSRz3hK8l4w1P+bah/HJLN0sys2JSMZQB+jKo6KSc8vLlLn5ikzF4268Wg2+pPOWW6'
            + 'ONcpr3PrXy9VfS473M/D7H+TLmrqsXtOGctvxvMv2oVNP+Av0uHbzbxyJaywyUjx8TlnPY2YxqkD'
            + 'dAAAAABJRU5ErkJggg==');
            seleniumFollowerImg.setAttribute('id', 'selenium_mouse_follower');
            seleniumFollowerImg.setAttribute('style', 'position: absolute; z-index: 9999999; pointer-events: none; left:0; top:0; width: 17px; height: 20px;');
            document.body.appendChild(seleniumFollowerImg);
            document.onmousemove = function (e) {
                document.getElementById('selenium_mouse_follower').style.left = e.pageX + 'px';
                document.getElementById('selenium_mouse_follower').style.top = e.pageY + 'px';
            };
        };
        enableCursor();        
        `
        await this.driver.executeScript(jsCode);
    }

    async getElements(elementBy: By): Promise<WebElement[]> {
        await this.driver.wait(until.elementsLocated(elementBy));
        let elements = await this.driver.findElements(elementBy);
        return elements;
    } 

    async isElementInViewportJs(toElement: WebElement): Promise<void> {
        const jsCode = `
            const el = arguments[0]
            // Special bonus for those using jQuery
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }
        
            var rect = el.getBoundingClientRect();
        
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
            );
        `
        return await this.driver.executeScript(jsCode, toElement);
    }

    async scrollIntoViewJs(toElement: WebElement, delayMs = 500): Promise<void> {
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", toElement);
        return await this.driver.sleep(delayMs);
    }

    async clickJs(toElement: WebElement): Promise<void> {
        return await this.driver.executeScript("arguments[0].click()", toElement);
    }

    async alertJs(message: string): Promise<void> {
        return await this.driver.executeScript("alert(arguments[0])", message)
    }

    async gentleBrowserClose(delayS:number=2){
        if (delayS > 0) {
            await this.alertJs(`Closing browser in ${delayS} seconds`)
            await this.driver.sleep(delayS * 1000)
        }
        await this.driver.quit()
    }


    // /**
    //  * Convenience method for drag and drop from the Actions API https://www.selenium.dev/documentation/webdriver/actions_api/
    //  * @param fromElement - element to start the drag from
    //  * @param toElement - element to drag to
    //  * @returns 
    //  */
    //  async doDragAndDrop(fromElement: WebElement, toElement: WebElement): Promise<void> {
    //     //required importing "Actions" 
    //     // return this.driver.actions().dragAndDrop(fromElement, toElement).perform()
    //     console.log(`doDragAndDrop: starting`)
    //     const actionPause = 500
    //     const actionPromise = this.driver
    //             .actions()
    //             .move({origin: fromElement, duration: 500}) //x:20, y:20, 
    //             .pause(actionPause)
    //             .press(Button.LEFT)
    //             .move({origin: Origin.POINTER, x:5, y:5}) // test
    //             .pause(actionPause)
    //             .move({origin: toElement, duration: 2000})
    //             .pause(actionPause)
    //             .move({origin: Origin.POINTER, x:5, y:5}) // test
    //             .release(Button.LEFT)
    //             .pause(actionPause)
    //             .perform();
    //     console.log(`doDragAndDrop: Action promise constructed`)
    //     return actionPromise
    // }

}