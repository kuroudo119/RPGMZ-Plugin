/*:
 * @target MZ
 * @plugindesc js ファイルに md も書いちゃうサンプル
 * @help

# js ファイルに md も書いちゃうサンプル

JavaScript 部分を ```javascript にしてしまえば、
マークダウンとして扱えるのではないか？
と思ったので、実験。

## このファイルの留意事項

アットマークはRPGツクールMZのプラグインヘルプで特別な意味を持つので、
そこで表示が途切れてしまう。
しかし、アットマークは他でも特別な意味を持つので使わざるを得ない。

## 著者紹介

くろうどです。

- Twitter やってます。
- ゲームアツマールにゲーム投稿してます。
- Google Play に Android アプリ投稿してます。

プログラミング知識について……。

1. Java は昔に勉強しました。
2. HTML と CSS も昔に勉強しました。
3. JavaScript は Java の知識を元に書いてます。

[Twitter @kuroudo119](https://twitter.com/kuroudo119)

![サンプル画像](img/KRD_Logo_48.png)

## 表サンプル

1|2|3|4
---|---|---|---
aaa|bbb|ccc|ddd
aaa|bbb|ccc|ddd
aaa|bbb|ccc|ddd

## UMLサンプル

PlantUML を使用したシーケンス図のサンプル。

```plantuml
@startuml
testA -> testB
testA <- testB
@enduml
```

## JavaScript サンプル

JavaScript のサンプル。

*/

/*

```javascript
//*/
(() => {

"use strict"

/**
 * サンプル関数
 * @param {string} str 戻り値に使うテキスト。
 * @returns {string} str を返す。str が無い場合はデフォルト値を返す。
 */
const msg = (str = "This is test message.") => {
	return str;
};

console.log(msg("テストだよ。"));
console.log(msg());

})();
/*
```

*/
