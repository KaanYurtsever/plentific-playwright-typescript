import {BrowserContext, expect, Page} from "@playwright/test";
import {WebActions} from "../../lib/WebActions";
import {DemoPageObjects} from "../objectRepository/DemoPageObjects";
import BasePage from "./BasePage";
import {testConfig} from "../../testConfig";

let webActions: WebActions;

export default class DemoPage extends BasePage{

    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        webActions = new WebActions(this.page);
    }

    async checkDemoPageOpen(): Promise<void> {
        const allWindows = this.page.context().pages();
        await allWindows[1].bringToFront();
        console.log("title: " + await allWindows[1].title());
        const pageTitleTxt = await allWindows[1].title();
        await expect(pageTitleTxt).toBe(DemoPageObjects.BOOK_A_DEMO_PAGE_TITLE_TXT);
    }

    async bookADemo(): Promise<void> {
        const allWindows = this.page.context().pages();
        await allWindows[1].bringToFront();
        if (!await allWindows[1].locator(DemoPageObjects.FIRST_NAME_FIELD).isHidden()){
            await allWindows[1].fill(DemoPageObjects.FIRST_NAME_FIELD, testConfig.firstName);
            await allWindows[1].fill(DemoPageObjects.LAST_NAME_FIELD, testConfig.lastName);
            await allWindows[1].fill(DemoPageObjects.ORGANISATION_NAME_FIELD, testConfig.organisationName);
            await allWindows[1].fill(DemoPageObjects.JOB_TITLE_FIELD, testConfig.jobTitle);
            await allWindows[1].fill(DemoPageObjects.EMAIL_FIELD, testConfig.businessEmail);
            await allWindows[1].fill(DemoPageObjects.PHONE_NUMBER_FIELD, testConfig.phoneNumber);
            await allWindows[1].selectOption(DemoPageObjects.LOCATION_PROP_DROPDOWN, {
                value: testConfig.locationOfProp
            });
            await allWindows[1].selectOption(DemoPageObjects.AREA_FOCUS_DROPDOWN, {
                value: testConfig.areaOfFocus
            });
            await allWindows[1].selectOption(DemoPageObjects.PROP_UNDER_MNGMNT_DROPDOWN, {
                value: testConfig.propUnderMngmnt
            });
            await allWindows[1].click(DemoPageObjects.BOOK_A_DEMO_SUBMIT_BTN);
            const checkBoxErrorMsg = await allWindows[1].locator(DemoPageObjects.CHECK_BOX_ERROR_MSG).textContent();
            expect(checkBoxErrorMsg).toBe(DemoPageObjects.CHECK_BOX_ERROR_MSG_TXT);
        }else{
            await allWindows[1].fill(DemoPageObjects.EMAIL_FIELD, testConfig.businessEmail);
            await allWindows[1].setChecked(DemoPageObjects.CHECK_BOX, true);
            await allWindows[1].click(DemoPageObjects.CONTINUE_BTN);
            await allWindows[1].fill(DemoPageObjects.FIRST_NAME_FIELD, testConfig.firstName);
            await allWindows[1].fill(DemoPageObjects.LAST_NAME_FIELD, testConfig.lastName);
            await allWindows[1].selectOption(DemoPageObjects.COUNTRY_PHONE_DROPDOWN, {
                value: testConfig.countryPhone
            });
            await allWindows[1].fill(DemoPageObjects.COUNTRY_PHONE_WITHOUTCODE_FIELD, testConfig.countryPhoneWithoutCode);
            await allWindows[1].click(DemoPageObjects.CONTINUE_BTN);
            await allWindows[1].fill(DemoPageObjects.ORGANISATION_NAME_FIELD, testConfig.organisationName);
            expect(await allWindows[1].locator(DemoPageObjects.ORGANISATION_NAME_FIELD).isHidden()).toBe(false);
        }
    }
}