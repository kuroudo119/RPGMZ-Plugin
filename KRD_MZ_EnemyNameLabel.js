/*:
 * @target MZ
 * @plugindesc 敵キャラ名ラベル
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param FONT_SIZE
 * @text フォントサイズ
 * @desc 文字の大きさです。0 にするとシステム値を使います。初期値：0
 * @type number
 * @default 0
 * 
 * @help
# KRD_MZ_EnemyNameLabel.js

敵キャラ名ラベル

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

敵キャラ画像の下部に敵キャラ名を表示します。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2026/03/24|作成開始
0.1.0|2026/03/24|非公開版完成
1.0.0|2026/03/24|公開

## 以下プラグイン本体（ヘルプ欄には非表示）

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const FONT_SIZE = Number(PARAM["FONT_SIZE"]) || 0;
const BOTTOM = 0;

//--------------------------------------

class Sprite_EnemyName extends Sprite_Name {
	fontSize() {
		if (FONT_SIZE > 0) {
			return FONT_SIZE;
		} else {
			return super.fontSize();
		}
	}

	redraw() {
		const name = this.name();
		const width = this.bitmapWidth();
		const height = this.bitmapHeight();
		this.setupFont();
		this.bitmap.clear();
		this.bitmap.drawText(name, 0, 0, width, height, "center");
	}
}

//--------------------------------------

const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
	_Sprite_Enemy_setBattler.call(this, ...arguments);
	this.setNameLabel();
};

Sprite_Enemy.prototype.setNameLabel = function() {
	const battler = this._battler;
	const nameLabel = new Sprite_EnemyName();
	nameLabel.setup(battler);
	const x = nameLabel.x - nameLabel.width / 2;
	const y = BOTTOM;
	nameLabel.move(x, y);
	nameLabel.show();
	this.addChild(nameLabel);
};

//--------------------------------------
})();
/*
```

*/
