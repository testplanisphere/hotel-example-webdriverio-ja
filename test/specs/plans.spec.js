const LoginPage = require('../pageobjects/login.page');
const MyPage = require('../pageobjects/my.page');
const PlansPage = require('../pageobjects/plans.page');
const TopPage = require('../pageobjects/top.page');

describe('プラン一覧', () => {
  it('未ログイン状態でプラン一覧が表示されること', async () =>{
    await TopPage.open();
    await TopPage.goToPlansPage();
    const planTitles = await PlansPage.getPlanTitles();

    await expect(planTitles).toHaveLength(7);
    await expect(planTitles[0]).toHaveText('お得な特典付きプラン');
    await expect(planTitles[1]).toHaveText('素泊まり');
    await expect(planTitles[2]).toHaveText('出張ビジネスプラン');
    await expect(planTitles[3]).toHaveText('エステ・マッサージプラン');
    await expect(planTitles[4]).toHaveText('貸し切り露天風呂プラン');
    await expect(planTitles[5]).toHaveText('カップル限定プラン');
    await expect(planTitles[6]).toHaveText('テーマパーク優待プラン');
  });

  it('一般会員でログイン状態でプラン一覧が表示されること', async () =>{
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('sakura@example.com');
    await LoginPage.password.setValue('pass1234');
    await LoginPage.submit();
    await MyPage.goToPlansPage();
    const planTitles = await PlansPage.getPlanTitles();

    await expect(planTitles).toHaveLength(9);
    await expect(planTitles[0]).toHaveText('お得な特典付きプラン');
    await expect(planTitles[1]).toHaveText('ディナー付きプラン');
    await expect(planTitles[2]).toHaveText('お得なプラン');
    await expect(planTitles[3]).toHaveText('素泊まり');
    await expect(planTitles[4]).toHaveText('出張ビジネスプラン');
    await expect(planTitles[5]).toHaveText('エステ・マッサージプラン');
    await expect(planTitles[6]).toHaveText('貸し切り露天風呂プラン');
    await expect(planTitles[7]).toHaveText('カップル限定プラン');
    await expect(planTitles[8]).toHaveText('テーマパーク優待プラン');
  });

  it('プレミアム会員でログイン状態でプラン一覧が表示されること', async () =>{
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('ichiro@example.com');
    await LoginPage.password.setValue('password');
    await LoginPage.submit();
    await MyPage.goToPlansPage();
    const planTitles = await PlansPage.getPlanTitles();

    await expect(planTitles).toHaveLength(10);
    await expect(planTitles[0]).toHaveText('お得な特典付きプラン');
    await expect(planTitles[1]).toHaveText('プレミアムプラン');
    await expect(planTitles[2]).toHaveText('ディナー付きプラン');
    await expect(planTitles[3]).toHaveText('お得なプラン');
    await expect(planTitles[4]).toHaveText('素泊まり');
    await expect(planTitles[5]).toHaveText('出張ビジネスプラン');
    await expect(planTitles[6]).toHaveText('エステ・マッサージプラン');
    await expect(planTitles[7]).toHaveText('貸し切り露天風呂プラン');
    await expect(planTitles[8]).toHaveText('カップル限定プラン');
    await expect(planTitles[9]).toHaveText('テーマパーク優待プラン');
  });
});
