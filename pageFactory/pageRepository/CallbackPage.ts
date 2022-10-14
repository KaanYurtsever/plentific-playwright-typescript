import {BrowserContext, expect, Page} from "@playwright/test";
import {WebActions} from "../../lib/WebActions";
import BasePage from "./BasePage";
import {testConfig} from "../../testConfig";
import {CallbackObjects} from "../objectRepository/CallbackObjects";

let webActions: WebActions;

export default class CallbackPage extends BasePage{

    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        webActions = new WebActions(this.page);
    }

    async checkCallPageIsOpen(): Promise<void> {
        const pageTitleTxt = await this.page.title();
        console.log("title: " + pageTitleTxt);
        await expect(pageTitleTxt).toBe(CallbackObjects.CALL_A_BOOK_PAGE_TITLE_TXT);
    }

    async bookACallback(): Promise<void> {
        if (await this.page.locator(CallbackObjects.FIRST_NAME_FIELD).isHidden()){
            await webActions.enterElementText(CallbackObjects.FIRST_NAME_FIELD, testConfig.firstName);
            await webActions.enterElementText(CallbackObjects.LAST_NAME_FIELD, testConfig.lastName);
            await webActions.enterElementText(CallbackObjects.ORGANISATION_NAME_FIELD, testConfig.organisationName);
            await webActions.enterElementText(CallbackObjects.JOB_TITLE_FIELD, testConfig.jobTitle);
            await webActions.enterElementText(CallbackObjects.EMAIL_FIELD, testConfig.businessEmail);
            await webActions.enterElementText(CallbackObjects.PHONE_NUMBER_FIELD, testConfig.phoneNumber);
            await this.page.selectOption(CallbackObjects.LOCATION_PROP_DROPDOWN, {
                value: testConfig.locationOfProp
            });
            await this.page.selectOption(CallbackObjects.AREA_FOCUS_DROPDOWN, {
                value: testConfig.areaOfFocus
            });
            await this.page.selectOption(CallbackObjects.PROP_UNDER_MNGMNT_DROPDOWN, {
                value: testConfig.propUnderMngmnt
            });
            await webActions.clickElement(CallbackObjects.BOOK_A_DEMO_SUBMIT_BTN);
            const checkBoxErrorMsg = await this.page.locator(CallbackObjects.CHECK_BOX_ERROR_MSG).textContent();
            expect(checkBoxErrorMsg).toBe(CallbackObjects.CHECK_BOX_ERROR_MSG_TXT);
        }else{
            await webActions.enterElementText(CallbackObjects.EMAIL_FIELD, testConfig.businessEmail);
            await this.page.setChecked(CallbackObjects.CHECK_BOX, true);
            await webActions.clickElement(CallbackObjects.CONTINUE_BTN);
            await webActions.enterElementText(CallbackObjects.FIRST_NAME_FIELD, testConfig.firstName);
            await webActions.enterElementText(CallbackObjects.LAST_NAME_FIELD, testConfig.lastName);
            await this.page.selectOption(CallbackObjects.COUNTRY_PHONE_DROPDOWN, {
                value: testConfig.countryPhone
            });
            await webActions.enterElementText(CallbackObjects.COUNTRY_PHONE_WITHOUTCODE_FIELD, testConfig.countryPhoneWithoutCode);
            await webActions.clickElement(CallbackObjects.CONTINUE_BTN);
            await webActions.enterElementText(CallbackObjects.ORGANISATION_NAME_FIELD, testConfig.organisationName);
            expect(await this.page.locator(CallbackObjects.ORGANISATION_NAME_FIELD).isHidden()).toBe(false);
        }
    }
}