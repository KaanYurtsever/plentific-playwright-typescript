import {BrowserContext, expect, Page} from "@playwright/test";
import {WebActions} from "../../lib/WebActions";
import {WorkOrderManagementObjects} from "../objectRepository/WorkOrderManagementObjects";
import BasePage from "./BasePage";

let webActions: WebActions;

export default class WorkOrderManagementPage extends BasePage{

    constructor(page: Page, context: BrowserContext) {

        super(page, context);
        webActions = new WebActions(this.page);
    }

    async checkWorkOrderManagementPageIsOpen(): Promise<void> {
        const workOrderManagementPageText = this.page.locator(WorkOrderManagementObjects.WORK_ORDER_MANAGEMENT_TEXT);
        await expect(workOrderManagementPageText).toHaveText(WorkOrderManagementObjects.WORK_ORDER_MANAGEMENT_EXPECTED_TXT);
    }

    async clickBookADemo(): Promise<void> {
        const [multiPage] = await Promise.all([
            this.context.waitForEvent("page"),
            await webActions.clickElement(WorkOrderManagementObjects.BOOK_A_DEMO_BTN)
        ])
        await multiPage.waitForLoadState();
        const allWindows = multiPage.context().pages();
        await allWindows[1].bringToFront();
    }
}