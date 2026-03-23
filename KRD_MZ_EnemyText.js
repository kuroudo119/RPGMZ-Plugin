/*:
 * @target MZ
 * @plugindesc 敵キャラ文字列（敵キャラ画像を文字列に変更）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @base DTextPicture
 * 
 * @help
# KRD_MZ_EnemyText.js

敵キャラ文字列（敵キャラ画像を文字列に変更）

## 権利表記

(c) 2026 kuroudo119 (くろうど)

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

敵キャラのメモ欄に以下のタグを記述します
<EnemyText:表示する文字列>
「表示する文字列」が敵キャラ画像として表示されます。

## 必要プラグイン

DTextPicture （動的文字列ピクチャ生成プラグイン） トリアコンタンさん

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2026/03/23|作成開始
0.1.0|2026/03/23|非公開版完成
1.0.0|2026/03/23|公開

## 以下プラグイン本体（ヘルプ欄には非表示）

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const TAG_ENEMY_TEXT = "EnemyText";

//--------------------------------------
// Window_Dummy クラス
// DTextPicture プラグインからコピーした

class Window_Dummy extends Window_Base {
	constructor() {
		super(new Rectangle());
	}

	createTextContents(text, dTextInfo) {
		this._size = dTextInfo.size;
		this._face = dTextInfo.font;
		this._lineHeight = dTextInfo.lineHeight;
		this._text = text;
		const rect = this.textSizeEx(text);
		if (dTextInfo.pictureWidth) {
				rect.width = dTextInfo.pictureWidth;
		}
		if (dTextInfo.pictureHeight) {
				rect.height = dTextInfo.pictureHeight;
		}
		this._height = rect.height + this._padding * 2;
		this._width = rect.width + this._padding * 2;
		this.textPictureWidth = rect.width;
		this.textPictureAlign = dTextInfo.align;
		this.contents = new Bitmap(rect.width, rect.height);
		return this.contents;
	}

	drawTextContents() {
		this.drawTextEx(this._text, 0, 0);
		this.contents = null;
		this.destroy();
	}
}

//--------------------------------------
// makeDynamicBitmap 関数
// DTextPicture プラグインからコピーして改変

Sprite_Enemy.prototype.makeDynamicBitmap = function() {
	const tempWindow = new Window_Dummy();
	this.bitmap = tempWindow.createTextContents(this._enemyText, this.dTextInfo);
	this.setColorTone([0, 0, 0, 0]);
	tempWindow.drawTextContents();
};

//--------------------------------------

const _Sprite_Enemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
Sprite_Enemy.prototype.loadBitmap = function(name) {
	this._enemyText = this._enemy.enemy().meta[TAG_ENEMY_TEXT];
	if (this._enemyText) {
		this.dTextInfo = $gameScreen.getDTextPictureInfo();
		this.makeDynamicBitmap();
	} else {
		_Sprite_Enemy_loadBitmap.call(this, ...arguments);
	}
};

//--------------------------------------
})();
/*
```

*/
