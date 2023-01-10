const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

module.exports = {
    startBrowser : async function() {
        let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        try {
            await driver.get('http://localhost:8084');
            //await driver.manage().window().maximize();
        } finally {
            //await driver.quit();
        }
    },
}