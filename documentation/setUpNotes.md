# Project Set Up notes

## Set up GitHub Actions: 
1. Added new folders/file (.github, workflows, node.js.yml)
2. Edit "name" in the new file
3. Add this code to package.json:
```
"scripts": {
    "test": "npx jest"
},
``` 
4. Add constructor code chunk to basePage:
```
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
```
5. Git commit

## View test results ran by GitHub Actions by following thse steps:
1. In the web, open the repo > click the Actions tab
    (In this case: https://github.com/stephaniecp/DT-QA/actions)

2. Click on test run

    ![](./documentation/viewtESTresults_1.png)

3. Click on sub test run again

    ![](./documentation/viewtESTresults_2.png)

4. Click on Build completed

    ![](./documentation/viewtESTresults_3.png)

5. Click to open "Run npm test". For example: https://github.com/stephaniecp/DT-QA/actions/runs/4548292721/jobs/8019171043

    ![](./documentation/viewtESTresults_4.png)

The content that will be displated will be the same as local terminal when running the tests locally
