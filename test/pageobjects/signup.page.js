const Page = require('./page');

class SignupPage extends Page {
  get email() { return $('#email'); }
  get password() { return $('#password'); }
  get passwordConfirmation() { return $('#password-confirmation'); }
  get username() { return $('#username'); }
  get rankPremium() { return $('#rank-premium'); }
  get rankNormal() { return $('#rank-normal'); }
  get address() { return $('#address'); }
  get tel() { return $('#tel'); }
  get gender() { return $('#gender'); }
  get birthday() { return $('#birthday'); }
  get notification() { return $('#notification'); }
  get submitButton() { return $('#signup-form > button'); }
  get emailMessage() { return $('#email ~ .invalid-feedback'); }
  get passwordMessage() { return $('#password ~ .invalid-feedback'); }
  get passwordConfirmationMessage() { return $('#password-confirmation ~ .invalid-feedback'); }
  get usernameMessage() { return $('#username ~ .invalid-feedback'); }
  get addressMessage() { return $('#address ~ .invalid-feedback'); }
  get telMessage() { return $('#tel ~ .invalid-feedback'); }
  get genderMessage() { return $('#gender ~ .invalid-feedback'); }
  get birthdayMessage() { return $('#birthday ~ .invalid-feedback'); }

  async setBirthday(birthday) {
    await browser.execute((input, value) => {
      input.value = value;
    }, await this.birthday, birthday);
  }

  async setNotification(checked) {
    if (await (await this.notification).isSelected() !== checked) {
      await (await this.notification).click();
    }
  }

  async submit() {
    await (await this.submitButton).click();
  }
}

module.exports = new SignupPage();
