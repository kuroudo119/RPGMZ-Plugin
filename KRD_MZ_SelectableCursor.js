/*:
 * @target MZ
 * @plugindesc 端っこカーソル移動＋買い物数の増減変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_SelectableCursor.js

端っこカーソル移動＋買い物数の増減変更

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

上下左右でのカーソル移動の際に一覧の上端と下端が繋がるようにカーソル移動するように変更します。
まとめ買いの時に10増減するのをやめます。

## 更新履歴

- ver.0.0.1 (2024/01/13) 作成開始
- ver.0.1.0 (2024/01/13) 非公開版完成
- ver.0.2.0 (2024/01/14) 数値入力への影響を修正
- ver.0.3.0 (2024/01/16) 長押しの挙動を変更
- ver.1.0.0 (2024/01/16) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------
// 数値入力
// 元の挙動を使う

const _Window_NumberInput_cursorDown = Window_NumberInput.prototype.cursorDown;
Window_NumberInput.prototype.cursorDown = function(wrap) {
	_Window_NumberInput_cursorDown.call(this, ...arguments);
};

const _Window_NumberInput_cursorUp = Window_NumberInput.prototype.cursorUp;
Window_NumberInput.prototype.cursorUp = function(wrap) {
	_Window_NumberInput_cursorUp.call(this, ...arguments);
};

//--------------------------------------
// ショップ
// 10増減をやめる

// 上書き
Window_ShopNumber.prototype.processNumberChange = function() {
	if (this.isOpenAndActive()) {
		if (Input.isRepeated("right")) {
			this.changeNumber(1);
		}
		if (Input.isRepeated("left")) {
			this.changeNumber(-1);
		}
		if (Input.isRepeated("up")) {
			this.changeNumber(1);
		}
		if (Input.isRepeated("down")) {
			this.changeNumber(-1);
		}
	}
};

//--------------------------------------

const _Window_Selectable_cursorDown = Window_Selectable.prototype.cursorDown;
Window_Selectable.prototype.cursorDown = function(wrap) {
	const index = Math.max(0, this.index());
	const maxItems = this.maxItems();
	const maxCols = this.maxCols();
	if (index === maxItems - 1) {
		this.cursorHead();
	} else if (index >= maxItems - maxCols) {
		this.smoothSelect(index + 1);
	} else if (this.row() === (this.maxRows() - 1)) {
		this.smoothSelect(index + 1);
	} else {
		_Window_Selectable_cursorDown.call(this, ...arguments);
	}
};

const _Window_Selectable_cursorUp = Window_Selectable.prototype.cursorUp;
Window_Selectable.prototype.cursorUp = function(wrap) {
	if (this.index() === 0) {
		this.cursorTail();
	} else if (this.row() === 0) {
		this.smoothSelect(this.index() - 1);
	} else {
		_Window_Selectable_cursorUp.call(this, ...arguments);
	}
};

const _Window_Selectable_cursorRight = Window_Selectable.prototype.cursorRight;
Window_Selectable.prototype.cursorRight = function(wrap) {
	if (this.index() === this.maxItems() - 1) {
		this.cursorHead();
	} else if (this.maxCols() === 1 && this.index() < this.maxItems() - 1) {
		this.smoothSelect(this.index() + 1);
	} else {
		_Window_Selectable_cursorRight.call(this, ...arguments);
	}
};

const _Window_Selectable_cursorLeft = Window_Selectable.prototype.cursorLeft
Window_Selectable.prototype.cursorLeft = function(wrap) {
	if (this.index() === 0) {
		this.cursorTail();
	} else if (this.maxCols() === 1 && this.index() > 0) {
		this.smoothSelect(this.index() - 1);
	} else {
		_Window_Selectable_cursorLeft.call(this, ...arguments);
	}
};

// 新規作成
Window_Selectable.prototype.cursorHead = function() {
	if (!Input.isLongPressed("down") && !Input.isLongPressed("right")) {
		this.smoothSelect(0);
	}
};

// 新規作成
Window_Selectable.prototype.cursorTail = function() {
	if (!Input.isLongPressed("up") && !Input.isLongPressed("left")) {
		this.smoothSelect(this.maxItems() - 1);
	}
};

//--------------------------------------
})();
