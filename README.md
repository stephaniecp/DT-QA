# DT-QA

Set up GitHub actions: 
- Added new folders/file (.github, workflows, node.js.yml)
    Edit "name"
    Add this code to package.json:

"scripts": {
    "test": "npx jest"
},
    
    Add constructor chunk to basePage

runEnvName: string;
constructor(options?: Options) {
    this.runEnvName = (typeof(process.env["RUNENVNAME"]) == "undefined") ? "LOCAL" : process.env["RUNENVNAME"]
    console.log(`CURRENT RUNENVNAME is ${this.runEnvName}`) //RUNENV-GITHUB-CI if on github
    
    if (options && options.driver) {
        this.driver = options.driver;
    } else {
        const newBuilder = new Builder().withCapabilities(Capabilities.chrome())
        
        if (this.runEnvName == "RUNENV-GITHUB-CI") {
            console.log("ChromeConfig - github actions environment")
            const screen = {
                width: 1920,
                height: 1080
                };
            const chrome = require('selenium-webdriver/chrome');                   
            newBuilder.setChromeOptions(new chrome.Options().headless().windowSize(screen))
        } else {
            console.log("ChromeConfig - local environment")
        }

        this.driver = newBuilder.build()
    }
    if(options && options.url) this.url = options.url
}
