const DateTime = require('luxon').DateTime;
const ConfirmPage = require('../pageobjects/confirm.page');
const LoginPage = require('../pageobjects/login.page');
const MyPage = require('../pageobjects/my.page');
const PlansPage = require('../pageobjects/plans.page');
const ReservePage = require('../pageobjects/reserve.page');
const RoomPage = require('../pageobjects/room.page');
const TopPage = require('../pageobjects/top.page');

describe('宿泊予約', () => {
  afterEach(async () => {
    if ((await browser.getWindowHandles()).length > 1) {
      await browser.closeWindow();
    }
    await browser.switchWindow(/^宿泊プラン一覧.+$/);
  });

  it('画面表示時の初期値が設定されていること_未ログイン' , async () => {
    await TopPage.open();
    await TopPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得な特典付きプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    const tomorrow = DateTime.local().plus({ days: 1 }).toFormat('yyyy/LL/dd');

    await expect(ReservePage.planName).toHaveText('お得な特典付きプラン');
    await expect(ReservePage.reserveDate).toHaveValue(tomorrow);
    await expect(ReservePage.reserveTerm).toHaveValue('1');
    await expect(ReservePage.headCount).toHaveValue('1');
    await expect(ReservePage.email).not.toBeDisplayed();
    await expect(ReservePage.tel).not.toBeDisplayed();
    await ReservePage.contact.selectByVisibleText('メールでのご連絡');
    await expect(ReservePage.email).toBeDisplayed();
    await expect(ReservePage.tel).not.toBeDisplayed();
    await expect(ReservePage.email).toHaveValue('');
    await ReservePage.contact.selectByVisibleText('電話でのご連絡');
    await expect(ReservePage.email).not.toBeDisplayed();
    await expect(ReservePage.tel).toBeDisplayed();
    await expect(ReservePage.tel).toHaveValue('');

    await browser.switchToFrame(await ReservePage.roomFrame);
    await expect(RoomPage.header).toHaveText('スタンダードツイン');
    await browser.switchToFrame(null);
  });

  it('画面表示時の初期値が設定されていること_ログイン済み' , async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('ichiro@example.com');
    await LoginPage.password.setValue('password');
    await LoginPage.submit();
    await MyPage.goToPlansPage();
    await PlansPage.openPlanByTitle('プレミアムプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    const tomorrow = DateTime.local().plus({ days: 1 }).toFormat('yyyy/LL/dd');

    await expect(ReservePage.planName).toHaveText('プレミアムプラン');
    await expect(ReservePage.reserveDate).toHaveValue(tomorrow);
    await expect(ReservePage.reserveTerm).toHaveValue('1');
    await expect(ReservePage.headCount).toHaveValue('2');
    await expect(ReservePage.username).toHaveValue('山田一郎');
    await expect(ReservePage.email).not.toBeDisplayed();
    await expect(ReservePage.tel).not.toBeDisplayed();
    await ReservePage.contact.selectByVisibleText('メールでのご連絡');
    await expect(ReservePage.email).toBeDisplayed();
    await expect(ReservePage.tel).not.toBeDisplayed();
    await expect(ReservePage.email).toHaveValue('ichiro@example.com');
    await ReservePage.contact.selectByVisibleText('電話でのご連絡');
    await expect(ReservePage.email).not.toBeDisplayed();
    await expect(ReservePage.tel).toBeDisplayed();
    await expect(ReservePage.tel).toHaveValue('01234567891');

    await browser.switchToFrame(await ReservePage.roomFrame);
    await expect(RoomPage.header).toHaveText('プレミアムツイン');
    await browser.switchToFrame(null);
  });

  it('入力値が空白でエラーとなること' , async () => {
    await TopPage.open();
    await TopPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得な特典付きプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    await ReservePage.setReserveDate('');
    await ReservePage.reserveTerm.setValue('');
    await ReservePage.headCount.setValue('');
    await ReservePage.username.setValue('テスト太郎');  // フォーカス移動

    await expect(ReservePage.reserveDateMessage).toHaveText('このフィールドを入力してください。');
    await expect(ReservePage.reserveTermMessage).toHaveText('このフィールドを入力してください。');
    await expect(ReservePage.headCountMessage).toHaveText('このフィールドを入力してください。');
  });

  it('不正な入力値でエラーとなること_小' , async () => {
    await TopPage.open();
    await TopPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得な特典付きプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    const today = DateTime.local().toFormat('yyyy/LL/dd');

    await ReservePage.setReserveDate(today);
    await ReservePage.reserveTerm.setValue('0');
    await ReservePage.headCount.setValue('0');
    await ReservePage.username.setValue('テスト太郎');  // フォーカス移動

    await expect(ReservePage.reserveDateMessage).toHaveText('翌日以降の日付を入力してください。');
    await expect(ReservePage.reserveTermMessage).toHaveText('1以上の値を入力してください。');
    await expect(ReservePage.headCountMessage).toHaveText('1以上の値を入力してください。');
  });

  it('不正な入力値でエラーとなること_大' , async () => {
    await TopPage.open();
    await TopPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得な特典付きプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    const after90 = DateTime.local().plus({ days: 91 }).toFormat('yyyy/LL/dd');

    await ReservePage.setReserveDate(after90);
    await ReservePage.reserveTerm.setValue('10');
    await ReservePage.headCount.setValue('10');
    await ReservePage.username.setValue('テスト太郎');  // フォーカス移動

    await expect(ReservePage.reserveDateMessage).toHaveText('3ヶ月以内の日付を入力してください。');
    await expect(ReservePage.reserveTermMessage).toHaveText('9以下の値を入力してください。');
    await expect(ReservePage.headCountMessage).toHaveText('9以下の値を入力してください。');
  });

  it('不正な入力値でエラーとなること_文字列' , async() => {
    await TopPage.open();
    await TopPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得な特典付きプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    await ReservePage.setReserveDate('12/3//345');
    await ReservePage.reserveTerm.setValue('a');  // 入力できない
    await ReservePage.headCount.setValue('a');  // 入力できない
    await ReservePage.username.setValue('テスト太郎');  // フォーカス移動

    await expect(ReservePage.reserveDateMessage).toHaveText('有効な値を入力してください。');
    await expect(ReservePage.reserveTermMessage).toHaveText('このフィールドを入力してください。');
    await expect(ReservePage.headCountMessage).toHaveText('このフィールドを入力してください。');
  });

  it('不正な入力値でエラーとなること_確定時_メール選択' , async () => {
    await TopPage.open();
    await TopPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得な特典付きプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    await ReservePage.username.setValue('');
    await ReservePage.contact.selectByVisibleText('メールでのご連絡');
    await ReservePage.email.setValue('');
    await ReservePage.submit();

    await expect(ReservePage.usernameMessage).toHaveText('このフィールドを入力してください。');
    await expect(ReservePage.emailMessage).toHaveText('このフィールドを入力してください。');
  });

  it('不正な入力値でエラーとなること_確定時_電話選択' , async () => {
    await TopPage.open();
    await TopPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得な特典付きプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    await ReservePage.username.setValue('');
    await ReservePage.contact.selectByVisibleText('電話でのご連絡');
    await ReservePage.tel.setValue('');
    await ReservePage.submit();

    await expect(ReservePage.usernameMessage).toHaveText('このフィールドを入力してください。');
    await expect(ReservePage.telMessage).toHaveText('このフィールドを入力してください。');
  });

  it('宿泊予約が完了すること_未ログイン_初期値' , async () => {
    await TopPage.open();
    await TopPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得な特典付きプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    const expectedStart = DateTime.local().plus({ days: 1 });
    const expectedEnd = DateTime.local().plus({ days: 2 });
    let expectedTotalBill;
    if (expectedStart.weekday === 6 || expectedStart.weekday === 7) {
      expectedTotalBill = '合計 8,750円（税込み）';
    } else {
      expectedTotalBill = '合計 7,000円（税込み）';
    }
    const expectedTerm = `${expectedStart.toFormat('yyyy年L月d日')} 〜 ${expectedEnd.toFormat('yyyy年L月d日')} 1泊`

    await ReservePage.username.setValue('テスト太郎');
    await ReservePage.contact.selectByVisibleText('希望しない');
    await ReservePage.submit();

    await expect(ConfirmPage.totalBill).toHaveText(expectedTotalBill);
    await expect(ConfirmPage.planName).toHaveText('お得な特典付きプラン');
    await expect(ConfirmPage.term).toHaveText(expectedTerm);
    await expect(ConfirmPage.headCount).toHaveText('1名様');
    await expect(ConfirmPage.plans).toHaveText('なし');
    await expect(ConfirmPage.username).toHaveText('テスト太郎様');
    await expect(ConfirmPage.contact).toHaveText('希望しない');
    await expect(ConfirmPage.comment).toHaveText('なし');

    await ConfirmPage.confirm();
    await expect(ConfirmPage.modalMessage).toHaveText('ご来館、心よりお待ちしております。');
    await ConfirmPage.close();
    await expect(await browser.waitUntil(async () => (await browser.getWindowHandles()).length === 1)).toBeTruthy();
  });

  it('宿泊予約が完了すること_ログイン' , async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('ichiro@example.com');
    await LoginPage.password.setValue('password');
    await LoginPage.submit();
    await MyPage.goToPlansPage();
    await PlansPage.openPlanByTitle('プレミアムプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    const expectedStart = DateTime.local().plus({ days: 90 });
    const expectedEnd = DateTime.local().plus({ days: 92 });
    let expectedTotalBill;
    if (expectedStart.weekday === 6) {
      expectedTotalBill = '合計 112,000円（税込み）';
    } else if (expectedStart.weekday === 5 || expectedStart.weekday === 7) {
      expectedTotalBill = '合計 102,000円（税込み）';
    } else {
      expectedTotalBill = '合計 92,000円（税込み）';
    }
    const expectedTerm = `${expectedStart.toFormat('yyyy年L月d日')} 〜 ${expectedEnd.toFormat('yyyy年L月d日')} 2泊`

    await ReservePage.reserveTerm.setValue('2');
    await ReservePage.headCount.setValue('4');
    await ReservePage.setBreakfastPlan(true);
    await ReservePage.setEarlyCheckInPlan(true);
    await ReservePage.setSightseeingPlan(false);
    await ReservePage.contact.selectByVisibleText('メールでのご連絡');
    await ReservePage.comment.setValue('あああ\n\nいいいいいいい\nうう');
    await ReservePage.reserveDate.setValue(expectedStart.toFormat('yyyy/LL/dd'));
    await ReservePage.submit();

    await expect(ConfirmPage.totalBill).toHaveText(expectedTotalBill);
    await expect(ConfirmPage.planName).toHaveText('プレミアムプラン');
    await expect(ConfirmPage.term).toHaveText(expectedTerm);
    await expect(ConfirmPage.headCount).toHaveText('4名様');
    await expect(ConfirmPage.plans).toHaveTextContaining('朝食バイキング');
    await expect(ConfirmPage.plans).toHaveTextContaining('昼からチェックインプラン');
    await expect(ConfirmPage.plans).not.toHaveTextContaining('お得な観光プラン');
    await expect(ConfirmPage.username).toHaveText('山田一郎様');
    await expect(ConfirmPage.contact).toHaveText('メール：ichiro@example.com');
    await expect(ConfirmPage.comment).toHaveText('あああ\n\nいいいいいいい\nうう');

    await ConfirmPage.confirm();
    await expect(ConfirmPage.modalMessage).toHaveText('ご来館、心よりお待ちしております。');
    await ConfirmPage.close();
    await expect(await browser.waitUntil(async () => (await browser.getWindowHandles()).length === 1)).toBeTruthy();
  });
});
