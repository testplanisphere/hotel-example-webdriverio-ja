const MyPage = require('../pageobjects/my.page');
const SignupPage = require('../pageobjects/signup.page');
const TopPage = require('../pageobjects/top.page');

describe('会員登録', () => {
  it('ユーザの新規登録ができること', async () => {
    await TopPage.open();
    await TopPage.goToSignupPage();
    await SignupPage.email.setValue('new-user@example.com');
    await SignupPage.password.setValue('password');
    await SignupPage.passwordConfirmation.setValue('password');
    await SignupPage.username.setValue('新規ユーザ１');
    await SignupPage.rankNormal.click();
    await SignupPage.address.setValue('神奈川県横浜市港区');
    await SignupPage.tel.setValue('01234567891');
    await SignupPage.gender.selectByVisibleText('女性');
    await SignupPage.setBirthday('2000-01-01');
    await SignupPage.setNotification(true);
    await SignupPage.submit();

    await expect(MyPage.header).toHaveText('マイページ');
  });

  it('必須項目を未入力にするとエラーとなること', async () => {
    await TopPage.open();
    await TopPage.goToSignupPage();
    await SignupPage.email.setValue('');
    await SignupPage.password.setValue('');
    await SignupPage.passwordConfirmation.setValue('');
    await SignupPage.username.setValue('');
    await SignupPage.rankPremium.click();
    await SignupPage.address.setValue('');
    await SignupPage.tel.setValue('');
    await SignupPage.gender.selectByVisibleText('回答しない');
    await SignupPage.setBirthday('');
    await SignupPage.setNotification(false);
    await SignupPage.submit();

    await expect(SignupPage.emailMessage).toHaveText('このフィールドを入力してください。');
    await expect(SignupPage.passwordMessage).toHaveText('このフィールドを入力してください。');
    await expect(SignupPage.passwordConfirmationMessage).toHaveText('このフィールドを入力してください。');
    await expect(SignupPage.usernameMessage).toHaveText('このフィールドを入力してください。');
    await expect(SignupPage.addressMessage).toHaveText('');
    await expect(SignupPage.telMessage).toHaveText('');
    await expect(SignupPage.genderMessage).toHaveText('');
    await expect(SignupPage.birthdayMessage).toHaveText('');
  });

  it('指定のフォーマット外の入力でエラーとなること', async () => {
    await TopPage.open();
    await TopPage.goToSignupPage();
    await SignupPage.email.setValue('a');
    await SignupPage.password.setValue('1234567');
    await SignupPage.passwordConfirmation.setValue('1');
    await SignupPage.username.setValue('テストテスト');
    await SignupPage.rankNormal.click();
    await SignupPage.address.setValue('千葉県千葉市');
    await SignupPage.tel.setValue('1234567890');
    await SignupPage.gender.selectByVisibleText('その他');
    await SignupPage.setBirthday('2000-01-01');
    await SignupPage.setNotification(true);
    await SignupPage.submit();

    await expect(SignupPage.emailMessage).toHaveText('メールアドレスを入力してください。');
    await expect(SignupPage.passwordMessage).toHaveText('8文字以上で入力してください。');
    await expect(SignupPage.passwordConfirmationMessage).toHaveText('8文字以上で入力してください。');
    await expect(SignupPage.usernameMessage).toHaveText('');
    await expect(SignupPage.addressMessage).toHaveText('');
    await expect(SignupPage.telMessage).toHaveText('指定されている形式で入力してください。');
    await expect(SignupPage.genderMessage).toHaveText('');
    await expect(SignupPage.birthdayMessage).toHaveText('');
  });

  it('登録済みのメールアドレスはエラーとなること', async () => {
    await TopPage.open();
    await TopPage.goToSignupPage();
    await SignupPage.email.setValue('new-user@example.com');
    await SignupPage.password.setValue('password');
    await SignupPage.passwordConfirmation.setValue('password');
    await SignupPage.username.setValue('新規ユーザ１');
    await SignupPage.rankNormal.click();
    await SignupPage.address.setValue('神奈川県横浜市港区');
    await SignupPage.tel.setValue('01234567891');
    await SignupPage.gender.selectByVisibleText('女性');
    await SignupPage.setBirthday('2000-01-01');
    await SignupPage.setNotification(true);
    await SignupPage.submit();

    await expect(SignupPage.emailMessage).toHaveText('このメールアドレスはすでに登録済みです。');
  });

  it('入力パスワードが一致しないとエラーとなること', async () => {
    await TopPage.open();
    await TopPage.goToSignupPage();
    await SignupPage.email.setValue('new-user@example.com');
    await SignupPage.password.setValue('password');
    await SignupPage.passwordConfirmation.setValue('123456789');
    await SignupPage.rankNormal.click();
    await SignupPage.address.setValue('神奈川県横浜市港区');
    await SignupPage.tel.setValue('01234567891');
    await SignupPage.gender.selectByVisibleText('男性');
    await SignupPage.setBirthday('2000-01-01');
    await SignupPage.setNotification(true);
    await SignupPage.submit();

    await expect(SignupPage.passwordConfirmationMessage).toHaveText('入力されたパスワードと一致しません。');
  });
});
