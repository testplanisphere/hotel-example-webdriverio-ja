const path = require('path');
const IconPage = require('../pageobjects/icon.page');
const LoginPage = require('../pageobjects/login.page');
const MyPage = require('../pageobjects/my.page');
const SignupPage = require('../pageobjects/signup.page');
const TopPage = require('../pageobjects/top.page');

describe('マイページ', () => {
  it('定義済みユーザの情報が表示されること_ichiro', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('ichiro@example.com');
    await LoginPage.password.setValue('password');
    await LoginPage.submit();

    await expect(MyPage.email).toHaveText('ichiro@example.com');
    await expect(MyPage.username).toHaveText('山田一郎');
    await expect(MyPage.rank).toHaveText('プレミアム会員');
    await expect(MyPage.address).toHaveText('東京都豊島区池袋');
    await expect(MyPage.tel).toHaveText('01234567891');
    await expect(MyPage.gender).toHaveText('男性');
    await expect(MyPage.birthday).toHaveText('未登録');
    await expect(MyPage.notification).toHaveText('受け取る');
  });

  it('定義済みユーザの情報が表示されること_sakura', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('sakura@example.com');
    await LoginPage.password.setValue('pass1234');
    await LoginPage.submit();

    await expect(MyPage.email).toHaveText('sakura@example.com');
    await expect(MyPage.username).toHaveText('松本さくら');
    await expect(MyPage.rank).toHaveText('一般会員');
    await expect(MyPage.address).toHaveText('神奈川県横浜市鶴見区大黒ふ頭');
    await expect(MyPage.tel).toHaveText('未登録');
    await expect(MyPage.gender).toHaveText('女性');
    await expect(MyPage.birthday).toHaveText('2000年4月1日');
    await expect(MyPage.notification).toHaveText('受け取らない');
  });

  it('定義済みユーザの情報が表示されること_jun', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('jun@example.com');
    await LoginPage.password.setValue('pa55w0rd!');
    await LoginPage.submit();

    await expect(MyPage.email).toHaveText('jun@example.com');
    await expect(MyPage.username).toHaveText('林潤');
    await expect(MyPage.rank).toHaveText('プレミアム会員');
    await expect(MyPage.address).toHaveText('大阪府大阪市北区梅田');
    await expect(MyPage.tel).toHaveText('01212341234');
    await expect(MyPage.gender).toHaveText('その他');
    await expect(MyPage.birthday).toHaveText('1988年12月17日');
    await expect(MyPage.notification).toHaveText('受け取らない');
  });

  it('定義済みユーザの情報が表示されること_yoshiki', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('yoshiki@example.com');
    await LoginPage.password.setValue('pass-pass');
    await LoginPage.submit();

    await expect(MyPage.email).toHaveText('yoshiki@example.com');
    await expect(MyPage.username).toHaveText('木村良樹');
    await expect(MyPage.rank).toHaveText('一般会員');
    await expect(MyPage.address).toHaveText('未登録');
    await expect(MyPage.tel).toHaveText('01298765432');
    await expect(MyPage.gender).toHaveText('未登録');
    await expect(MyPage.birthday).toHaveText('1992年8月31日');
    await expect(MyPage.notification).toHaveText('受け取る');
  });

  it('新規登録したユーザの情報が表示されること', async () => {
    await TopPage.open();
    await TopPage.goToSignupPage();
    await SignupPage.email.setValue('new-user@example.com');
    await SignupPage.password.setValue('11111111');
    await SignupPage.passwordConfirmation.setValue('11111111');
    await SignupPage.username.setValue('田中花子');
    await SignupPage.rankNormal.click();
    await SignupPage.address.setValue('神奈川県横浜市港区');
    await SignupPage.tel.setValue('09876543211');
    await SignupPage.gender.selectByVisibleText('女性');
    await SignupPage.setBirthday('2000-01-01');
    await SignupPage.setNotification(false);
    await SignupPage.submit();

    await expect(MyPage.email).toHaveText('new-user@example.com');
    await expect(MyPage.username).toHaveText('田中花子');
    await expect(MyPage.rank).toHaveText('一般会員');
    await expect(MyPage.address).toHaveText('神奈川県横浜市港区');
    await expect(MyPage.tel).toHaveText('09876543211');
    await expect(MyPage.gender).toHaveText('女性');
    await expect(MyPage.birthday).toHaveText('2000年1月1日');
    await expect(MyPage.notification).toHaveText('受け取らない');
  });

  it('アイコン設定で画像以外のファイルはエラーとなること', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('new-user@example.com');
    await LoginPage.password.setValue('11111111');
    await LoginPage.submit();
    await MyPage.iconLink.click();
    const filePath = path.join(__dirname, '..', 'uploadfiles', 'dummy.txt');
    await IconPage.icon.setValue(filePath);

    await expect(IconPage.iconMessage).toHaveText('画像ファイルを選択してください。');
  });

  it('アイコン設定で10KBを越えるファイルはエラーとなること', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('new-user@example.com');
    await LoginPage.password.setValue('11111111');
    await LoginPage.submit();
    await MyPage.iconLink.click();
    const filePath = path.join(__dirname, '..', 'uploadfiles', '240x240_12.png');
    await IconPage.icon.setValue(filePath);

    await expect(IconPage.iconMessage).toHaveText('ファイルサイズは10KB以下にしてください。');
  });

  it('設定したアイコンがマイページに表示されること', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('new-user@example.com');
    await LoginPage.password.setValue('11111111');
    await LoginPage.submit();
    await MyPage.iconLink.click();
    const filePath = path.join(__dirname, '..', 'uploadfiles', '240x240_01.png');
    await IconPage.icon.setValue(filePath);
    await IconPage.setZoom(80);
    await IconPage.setColor('#000000');
    await IconPage.submit();

    await expect(MyPage.iconImage).toExist();
    // await expect(MyPage.iconImage).toHaveAttribute('width', '70');
    await expect((await MyPage.iconImage.getCSSProperty('backgroundColor')).value).toBe('rgba(0,0,0,1)');
  });

  it('新規登録したユーザが削除できること', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('new-user@example.com');
    await LoginPage.password.setValue('11111111');
    await LoginPage.submit();
    await MyPage.delete();

    await expect(await browser.getAlertText()).toBe('退会すると全ての情報が削除されます。\nよろしいですか？');
    await browser.acceptAlert();
    await browser.pause(1000); // eslint-disable-line wdio/no-pause
    await expect(await browser.getAlertText()).toBe('退会処理を完了しました。ご利用ありがとうございました。');
    await browser.acceptAlert();
    await expect(browser).toHaveUrl('index.html', {containing: true});
  });
});
