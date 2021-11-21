module.exports = class Page {
  async open(path) {
      await browser.url(path);
  }
}
