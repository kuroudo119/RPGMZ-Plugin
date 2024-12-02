/*:
 * @target MZ
 * @plugindesc アイコン文字列
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_IconText.js

アイコン文字列

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このソフトウェアはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

### MITライセンス抄訳

1. 利用者はこのソフトウェアを無料で利用することができます。
2. 利用者はこのソフトウェアを改変、再配布することができます。
3. 利用者はこのソフトウェアによる不都合について作者に対し請求できません。
4. このソフトウェアの利用について保証はありません。
5. 作者はこのソフトウェアについての責任を負いません。

## 使い方

アイテムまたはスキルのメモ欄に以下のタグを記述することで、
アイコンに「文字列」が表示されます。

<itemText:文字列>

## 制御文字 IT

「文章の表示」などで、
制御文字 \IT[16,字] が使えます。

16はアイコン番号、字は文字列です。

## 更新履歴

- ver.0.0.1 (2024/12/02) 作成開始
- ver.0.1.0 (2024/12/02) 非公開版完成
- ver.1.0.0 (2024/12/02) 公開
- ver.1.0.1 (2024/12/03) 内部的にマジックナンバーを削減
- ver.1.0.2 (2024/12/03) 内部処理を修正

 * 
 * 
 */

(() => {

"use strict";

const FONT_SIZE = 16;
const PADDING = 2;
const BOTTOM = 2;
const ALIGN = "right";

const TAG_ITEM_TEXT = "itemText";

//--------------------------------------

const _Window_Base_drawIcon = Window_Base.prototype.drawIcon;
Window_Base.prototype.drawIcon = function(iconIndex, x, y, text) {
	_Window_Base_drawIcon.call(this, ...arguments);
	if (text) {
		this.drawIconText(text, x, y);
	}
};

Window_Base.prototype.drawIconText = function(text = "", x, y) {
	const width = ImageManager.iconWidth - PADDING * 2;
	const baseFontSize = this.contents.fontSize;
	this.contents.fontSize = FONT_SIZE;
	this.drawText(text, x, y - BOTTOM, width, ALIGN);
	this.contents.fontSize = baseFontSize;
};

//--------------------------------------

const _Window_Base_drawItemName = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, x, y, width) {
	if (item) {
		const text = item.meta[TAG_ITEM_TEXT];
		const name = this.convertEscapeCharacters(item.name);
		if (text) {
			const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
			const textMargin = ImageManager.iconWidth + 4;
			const itemWidth = Math.max(0, width - textMargin);
			this.resetTextColor();
			this.drawIcon(item.iconIndex, x, iconY, text);
			this.drawText(name, x + textMargin, y, itemWidth);
		} else {
			_Window_Base_drawItemName.call(this, ...arguments);
		}
	}
};

//--------------------------------------
// 自分用カスタム PANDA_ConvertDataName 向けの処理

const _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
	switch (code) {
		 case "IT":
			  this.processDrawIconText(textState);
			  break;
	}
	_Window_Base_processEscapeCharacter.call(this, ...arguments);
};

Window_Base.prototype.processDrawIconText = function(textState) {
	const data = this.obtainEscapeParamIcon(textState);
	const iconIndex = Number(data[0]) || 0;
	const text = data[1];
	if (textState.drawing) {
		 this.drawIcon(iconIndex || 0, textState.x + 2, textState.y + 2, text);
	}
	textState.x += ImageManager.iconWidth + 4;
};

Window_Base.prototype.obtainEscapeParamIcon = function(textState) {
	const regExp = /^\[\d+,.*\]/;
	const arr = regExp.exec(textState.text.slice(textState.index));
	if (arr) {
		textState.index += arr[0].length;
		const data = arr[0].slice(1, -1).split(",");
		return data;
	} else {
		return [];
	}
};

//--------------------------------------
})();
