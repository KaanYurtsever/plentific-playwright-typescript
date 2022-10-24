import { PlaywrightTestConfig } from "@playwright/test";


const config: PlaywrightTestConfig = {

    use: {
        viewport: null,
        headless: false,
        screenshot: "on",
        video: "on",
        trace: "retain-on-failure",
        launchOptions: {
            args: ["--start-maximized"],
        }
    },
    timeout: 60000,
    grep: [new RegExp("@smoke"), new RegExp("@reg")],
    testMatch: ["managementBook.test.ts"],
    retries: 0,
    reporter: [
        ["dot"], // -> console
        ["json", { outputFile: "test-result.json" }], //  -> JSON
        ['html', {
            open: "always"
        }],// -> HTML
        ['experimental-allure-playwright']
    ],
    globalTeardown: './global-teardown.ts'
}
export default config;