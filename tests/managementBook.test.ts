import test from "../lib/BaseTest";

test.describe("Management Pages Tests", () => {

    test("Book a demo @reg",  async ({basePage, demoPage, workOrderManagementPage}) => {

        await test.step("User should go to URL", async () => {
            await basePage.navigateToURL();
            await basePage.checkUrlCorrect();
        })

        await test.step("User should accept cookies", async () =>{
            await basePage.acceptCookies();
        })

        await test.step("User should go to Work Order Management Page", async () =>{
            await basePage.goToWorkOrderManagement();
            await workOrderManagementPage.checkWorkOrderManagementPageIsOpen();
        })

        await test.step("User should try to go book a demo page", async () =>{
            await workOrderManagementPage.clickBookADemo();
            await demoPage.checkDemoPageOpen();
        })

        await test.step("User shouldn't book a demo", async () => {
            await demoPage.bookADemo();
        })
    });


    test("Book a callback @smoke",  async ({basePage, callPage, voidsManagementPage}) => {

        await test.step("User should go to URL", async () => {
            await basePage.navigateToURL();
            await basePage.checkUrlCorrect();
        })

        await test.step("User should accept cookies", async () =>{
            await basePage.acceptCookies();
        })

        await test.step("User should go to Voids Management Page", async () =>{
            await basePage.goToVoidManagement();
            await voidsManagementPage.checkVoidsManagementPageIsOpen()
        })

        await test.step("User should try to go book a callback page", async () =>{
            await voidsManagementPage.clickBookACallback();
            await callPage.checkCallPageIsOpen();
        })

        await test.step("User shouldn't book a callback", async () => {
            await callPage.bookACallback();
        })
    });
})