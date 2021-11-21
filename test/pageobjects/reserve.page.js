const Page = require('./page');

class ReservePage extends Page {
  get reserveDate() { return $('#date'); }
  get datePickerClose() { return $('.ui-datepicker-close'); }
  get reserveTerm() { return $('#term'); }
  get headCount() { return $('#head-count'); }
  get breakfastPlan() { return $('#breakfast'); }
  get earlyCheckInPlan() { return $('#early-check-in'); }
  get sightseeingPlan() { return $('#sightseeing'); }
  get username() { return $('#username'); }
  get contact() { return $('#contact'); }
  get email() { return $('#email'); }
  get tel() { return $('#tel'); }
  get comment() { return $('#comment'); }
  get submitButton() { return $('button[data-test="submit-button"]') }
  get roomFrame() { return $('iframe[name="room"]'); }
  get planName() { return $('#plan-name'); }
  get reserveDateMessage() { return $('#date ~ .invalid-feedback'); }
  get reserveTermMessage() { return $('#term ~ .invalid-feedback'); }
  get headCountMessage() { return $('#head-count ~ .invalid-feedback'); }
  get usernameMessage() { return $('#username ~ .invalid-feedback'); }
  get emailMessage() { return $('#email ~ .invalid-feedback'); }
  get telMessage() { return $('#tel ~ .invalid-feedback'); }

  async setReserveDate(value) {
    await (await this.reserveDate).setValue(value);
    await (await this.datePickerClose).click();
  }

  async setBreakfastPlan(checked) {
    if (await (await this.breakfastPlan).isSelected() !== checked) {
      await (await this.breakfastPlan).click();
    }
  }

  async setEarlyCheckInPlan(checked) {
    if (await (await this.earlyCheckInPlan).isSelected() !== checked) {
      await (await this.earlyCheckInPlan).click();
    }
  }

  async setSightseeingPlan(checked) {
    if (await (await this.sightseeingPlan).isSelected() !== checked) {
      await (await this.sightseeingPlan).click();
    }
  }

  async submit() {
    await (await this.submitButton).click();
  }
}

module.exports = new ReservePage();
