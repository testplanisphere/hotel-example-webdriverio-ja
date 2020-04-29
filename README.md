# hotel-example-webdriverio

![webdriverio](https://github.com/testplanisphere/hotel-example-webdriverio/workflows/webdriverio/badge.svg)

このプロジェクトはテスト自動化学習のためのサンプルコードです。
This project is example codes for learning test automation.

### テスト対象 / Test Object

https://hotel.testplanisphere.dev/ 

### 概要 / Overview

#### プログラミング言語 / Programming Language

* JavaScript

#### 自動化フレームワーク / Automation Framework

* [WebdriverIO](https://webdriver.io/)

#### テスティングフレームワーク / Testing Framework

* [Mocha](https://mochajs.org/)

#### ビルドツール / Build Tool

* [npm](https://www.npmjs.com/)

#### 静的解析ツール / Lint Tool

* [ESLint](https://eslint.org/)

### 実行方法 / How to Run

#### 必須環境 / Requirements

* Node.js 12
* Google Chrome

#### 依存ライブラリのインストール / Install Dependencies

```
npm install
```

#### テストの実行 / Run Tests

```
npm run test
```

#### 静的解析の実行 / Run Lint

```
npm run lint
```

### 変更履歴

#### v1.1.0 (2020-04-29)

* [#8](https://github.com/testplanisphere/hotel-example-webdriverio/pull/8) Github Actionsにpull_requestトリガーを追加
* [#9](https://github.com/testplanisphere/hotel-example-webdriverio/pull/9) テスト名を修正
* [#11](https://github.com/testplanisphere/hotel-example-webdriverio/pull/11) ConfirmPageのモーダルを閉じるボタンのセレクターを修正
* [#12](https://github.com/testplanisphere/hotel-example-webdriverio/pull/12) Github Actionsでのみheadlessモードを有効化
* [#14](https://github.com/testplanisphere/hotel-example-webdriverio/pull/14) Github ActionsでLintを実行するように修正
* [#15](https://github.com/testplanisphere/hotel-example-webdriverio/pull/15) READMEの記述内容を変更
* [#18](https://github.com/testplanisphere/hotel-example-webdriverio/pull/18) cookie削除処理をGlobal Hookへ移動
* [#19](https://github.com/testplanisphere/hotel-example-webdriverio/pull/19) 連絡手段の変更によるinputの表示切り替えテストを追加
* [#20](https://github.com/testplanisphere/hotel-example-webdriverio/pull/20) webdriverioをv6.1.3へアップデート
* [#22](https://github.com/testplanisphere/hotel-example-webdriverio/pull/22) Github ActionsにmacOSとWindowsランナーを追加
* [#25](https://github.com/testplanisphere/hotel-example-webdriverio/pull/25) テストデータのアドレスをexample.comに修正
* [#26](https://github.com/testplanisphere/hotel-example-webdriverio/pull/26) 日付入力が空の場合のテストを追加

#### v1.0.0 (2020-04-14)

* 正式リリース
