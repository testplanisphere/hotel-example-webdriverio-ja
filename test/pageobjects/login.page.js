const Page = require('./page');

class LoginPage extends Page {
  get email() { return $('#email'); }
  get password() { return $('#password'); }
  get submitButton() { return $('#login-button'); }
  get emailMessage() { return $('#email-message'); }
  get passwordMessage() { return $('#password-message'); }

  async submit() {
    await (await this.submitButton).click();
  }
}

module.exports = new LoginPage();
