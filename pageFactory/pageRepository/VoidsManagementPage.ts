import {BrowserContext, expect, Page} from "@playwright/test";
import {WebActions} from "../../lib/WebActions";
import {VoidsManagementObjects} from "../objectRepository/VoidsManagementObjects";
import BasePage from "./BasePage";

let webActions: WebActions;

export default class VoidsManagementPage extends BasePage{

    constructor(page: Page, context: BrowserContext) {

        super(page, context);
        webActions = new WebActions(this.page);
    }

    async checkVoidsManagementPageIsOpen(): Promise<void> {
        const voidsManagementPageText = this.page.locator(VoidsManagementObjects.VOIDS_MANAGER_TEXT);
        await expect(voidsManagementPageText).toHaveText(VoidsManagementObjects.VOIDS_MANAGEMENT_EXPECTED_TXT);
    }

    async clickBookACallback(): Promise<void> {
        await webActions.clickElement(VoidsManagementObjects.BOOK_A_CALLBACK_BTN);
    }
}