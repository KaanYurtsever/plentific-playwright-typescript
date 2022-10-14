import {BrowserContext, expect, Page} from "@playwright/test";
import {WebActions} from "../../lib/WebActions";
import {BasePageObjects} from "../objectRepository/BasePageObjects";
import {testConfig} from "../../testConfig";

let webActions: WebActions;

export default class BasePage {

    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {

        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page);
    }

    async navigateToURL(): Promise<void> {
        await webActions.navigateToURL(testConfig.prod);
    }

    async checkUrlCorrect(): Promise<void> {

        expect(this.page.url()).toBe(testConfig.prod)

    }

    async acceptCookies(): Promise<void>{
        await webActions.clickElement(BasePageObjects.ACCEPT_COOKIES_BTN);
    }

    async goToWorkOrderManagement(): Promise<void>{
        await this.page.hover(BasePageObjects.PRODUCTS_TAB);
        await this.page.hover(BasePageObjects.REPAIRS_MANAGER);
        await webActions.clickElement(BasePageObjects.WORK_ORDER_MANAGEMENT);
    }

    async goToVoidManagement(): Promise<void>{
        await this.page.hover(BasePageObjects.PRODUCTS_TAB);
        await this.page.hover(BasePageObjects.REPAIRS_MANAGER);
        await webActions.clickElement(BasePageObjects.VOIDS_MANAGEMENT);
    }
}