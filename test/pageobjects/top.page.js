const Page = require('./page');

class TopPage extends Page {
  get loginLink() { return $('=ログイン'); }
  get signupLink() { return $('=会員登録'); }
  get planLink() { return $('=宿泊予約'); }

  async open() {
    await super.open('/ja/');
  }

  async goToLoginPage() {
    await (await this.loginLink).click();
  }

  async goToSignupPage() {
    await (await this.signupLink).click();
  }

  async goToPlansPage() {
    await (await this.planLink).click();
  }
}

module.exports = new TopPage();
