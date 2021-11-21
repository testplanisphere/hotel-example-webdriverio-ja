const Page = require('./page');

class IconPage extends Page {
  get icon() { return $('#icon'); }
  get zoom() { return $('#zoom'); }
  get color() { return $('#color'); }
  get submitButton() { return $('#icon-form > button'); }
  get iconMessage() { return $('#icon ~ .invalid-feedback'); }

  async submit() {
    await (await this.submitButton).click();
  }

  async setZoom(value) {
    await browser.execute((input, value) => {
      input.value = value;
    }, await this.zoom, value);
  }

  async setColor(value) {
    await browser.execute((input, value) => {
      input.value = value;
    }, await this.color, value);
  }
}

module.exports = new IconPage();
