const LoginPage = require('../pageobjects/login.page');
const MyPage = require('../pageobjects/my.page');
const TopPage = require('../pageobjects/top.page');

describe('ログイン', () => {
  it('定義済みユーザでログインができること', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('ichiro@example.com');
    await LoginPage.password.setValue('password');
    await LoginPage.submit();

    await expect(MyPage.header).toHaveText('マイページ');
  });

  it('未入力でエラーとなること', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('');
    await LoginPage.password.setValue('');
    await LoginPage.submit();

    await expect(LoginPage.emailMessage).toHaveText('このフィールドを入力してください。');
    await expect(LoginPage.passwordMessage).toHaveText('このフィールドを入力してください。');
  });

  it('未登録のユーザでエラーとなること', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('error@example.com');
    await LoginPage.password.setValue('error');
    await LoginPage.submit();

    await expect(LoginPage.emailMessage).toHaveText('メールアドレスまたはパスワードが違います。');
    await expect(LoginPage.passwordMessage).toHaveText('メールアドレスまたはパスワードが違います。');
  });
});
