import { test as baseTest } from '@playwright/test';
import BasePage from "../pageFactory/pageRepository/BasePage";
import DemoPage from "../pageFactory/pageRepository/DemoPage";
import WorkOrderManagementPage from "../pageFactory/pageRepository/WorkOrderManagementPage";
import VoidsManagementPage from "../pageFactory/pageRepository/VoidsManagementPage";
import CallbackPage from "../pageFactory/pageRepository/CallbackPage";

const test = baseTest.extend<{

    basePage: BasePage;
    demoPage: DemoPage;
    callPage: CallbackPage;
    workOrderManagementPage: WorkOrderManagementPage;
    voidsManagementPage: VoidsManagementPage;

}>({
    basePage: async ({ page , context}, use) => {
        await use(new BasePage(page, context));
    },
    demoPage: async ({ page, context }, use) => {
        await use(new DemoPage(page, context));
    },
    workOrderManagementPage: async ({ page, context }, use) => {
        await use(new WorkOrderManagementPage(page, context));
    },
    voidsManagementPage: async ({ page, context }, use) => {
        await use(new VoidsManagementPage(page, context));
    },
    callPage: async ({ page, context }, use) => {
        await use(new CallbackPage(page, context));
    }
});

export default test;