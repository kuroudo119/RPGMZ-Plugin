/*:
 * @target MZ
 * @plugindesc セーブデータとセーブ画面・ロード画面の変更（サンプル）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_Save_sample.js

セーブデータとセーブ画面・ロード画面の変更（サンプル）

## 権利表記

(c) 2025 kuroudo119 (くろうど)

## 利用規約

このソフトウェアはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

### MITライセンス抄訳

1. 利用者はこのソフトウェアを無料で利用することができます。
-  商用利用、年齢制限作品などへの利用もできます。
-  利用作品でのクレジットは利用者の任意です。
2. 利用者はこのソフトウェアを改変、再配布することができます。
-  権利表記の削除、変更はできません。
3. 利用者はこのソフトウェアによる不都合について作者に対し請求できません。
4. このソフトウェアの利用について保証はありません。
5. 作者はこのソフトウェアについての責任を負いません。

## 概要

セーブデータに文字列を追加し、
セーブ画面・ロード画面に表示します。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2025/09/10|作成開始
0.1.0|2025/09/10|完成
1.0.0|2025/09/10|公開

 */

/*

```javascript
*/

(() => {
//--------------------------------------

"use strict";

//--------------------------------------
// セーブデータ
// DataManager.makeSavefileInfo の改造

// 元の関数を変数に確保する。
const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;

// 変更したい関数。
DataManager.makeSavefileInfo = function() {

	// 確保した元の関数を使い、変数 info を作り、元のデータを入れる。
	// これをやらないと元のデータが消えてしまう。
	const info = _DataManager_makeSavefileInfo.call(this, ...arguments);

	// info に test というプロパティを追加し、Test という文字列を入れている。
	info.test = "Test";

	// info を戻す。
	return info;

};

//--------------------------------------
// セーブ画面
// Window_SavefileList の改造

// 元の関数を変数に確保する。
const _Window_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;

// 変更したい関数。
Window_SavefileList.prototype.drawContents = function(info, rect) {

	// 確保した元の関数を使う。
	// これは戻り値がないので使うだけ。
	_Window_SavefileList_drawContents.call(this, ...arguments);

	// 念のため、info.test の有無チェックをしてる。
	if (info.test) {

		// drawText で info.test 内の文字列を表示する。
		// ここでは、枠の右上に表示させている。
		this.drawText(info.test, rect.x, rect.y, rect.width, "right");

	}
};

//--------------------------------------
})();
/*
```

*/
