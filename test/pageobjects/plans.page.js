const Page = require('./page');

class PlansPage extends Page {
  get loading() { return $('#plan-list > div[role="status"]'); }
  get planTitles() { return $$('.card-title'); }
  get plans() { return $$('.card'); }

  async getPlanTitles() {
    await (await this.loading).waitForExist({reverse: true});
    return await this.planTitles;
  }

  async openPlanByTitle(title) {
    await (await this.loading).waitForExist({reverse: true});
    // this.plans.find((elm) => elm.$('.card-title').getText() === title).$('<a>').click();
    for (const plan of await this.plans) {
      if (await (await plan.$('.card-title')).getText() === title) {
        await (await plan.$('<a>')).click();
        break;
      }
    }
    await browser.waitUntil(async () => (await browser.getWindowHandles()).length === 2);
  }
}

module.exports = new PlansPage();
