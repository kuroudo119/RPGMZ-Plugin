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

上下左右でのカーソル移動の際に一覧の上端と下端が繋がるように
カーソル移動させます。

まとめ買いの時に10増減するのをやめます。

## 更新履歴

- ver.0.0.1 (2024/01/13) 作成開始
- ver.0.1.0 (2024/01/13) 非公開版完成
- ver.0.2.0 (2024/01/14) 数値入力への影響を修正
- ver.0.3.0 (2024/01/16) 長押しの挙動を変更
- ver.1.0.0 (2024/01/16) 公開
- ver.1.1.0 (2024/02/09) デバッグ画面の挙動を修正
- ver.1.2.0 (2024/02/20) マジックナンバーを関数化

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
// オプション画面
// 元の挙動を使う

const _Window_Options_cursorDown = Window_Options.prototype.cursorDown;
Window_Options.prototype.cursorDown = function(wrap) {
	_Window_Options_cursorDown.call(this, ...arguments);
};

const _Window_Options_cursorUp = Window_Options.prototype.cursorUp;
Window_Options.prototype.cursorUp = function(wrap) {
	_Window_Options_cursorUp.call(this, ...arguments);
};

const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
	_Window_Options_cursorRight.call(this, ...arguments);
};

const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
	_Window_Options_cursorLeft.call(this, ...arguments);
};

//--------------------------------------
// デバッグ画面

// 元の挙動を使う
const _Window_DebugEdit_cursorRight = Window_DebugEdit.prototype.cursorRight;
Window_DebugEdit.prototype.cursorRight = function(wrap) {
	_Window_DebugEdit_cursorRight.call(this, ...arguments);
};

// 元の挙動を使う
const _Window_DebugEdit_cursorLeft = Window_DebugEdit.prototype.cursorLeft;
Window_DebugEdit.prototype.cursorLeft = function(wrap) {
	_Window_DebugEdit_cursorLeft.call(this, ...arguments);
};

// 挙動を修正
Window_Selectable.prototype.cursorPagedown = function() {
	// カーソル移動なし
};

// 挙動を修正
Window_Selectable.prototype.cursorPageup = function() {
	// カーソル移動なし
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
// カーソル移動処理

const _Window_Selectable_cursorDown = Window_Selectable.prototype.cursorDown;
Window_Selectable.prototype.cursorDown = function(wrap) {
	if (this.index() === this.tailIndex()) {
		this.cursorHead();
	} else if (this.index() >= (this.maxItems() - this.maxCols())) {
		// 下のindexが空欄の時
		this.smoothSelect(this.nextIndex());
	} else if (this.row() === this.tailRow()) {
		this.smoothSelect(this.nextIndex());
	} else {
		_Window_Selectable_cursorDown.call(this, ...arguments);
	}
};

const _Window_Selectable_cursorUp = Window_Selectable.prototype.cursorUp;
Window_Selectable.prototype.cursorUp = function(wrap) {
	if (this.index() === this.headIndex()) {
		this.cursorTail();
	} else if (this.index() < (this.headIndex() + this.maxCols())) {
		// 上のindexが空欄の時
		this.smoothSelect(this.previousIndex());
	} else if (this.row() === this.headRow()) {
		this.smoothSelect(this.previousIndex());
	} else {
		_Window_Selectable_cursorUp.call(this, ...arguments);
	}
};

const _Window_Selectable_cursorRight = Window_Selectable.prototype.cursorRight;
Window_Selectable.prototype.cursorRight = function(wrap) {
	if (this.index() === this.tailIndex()) {
		this.cursorHead();
	} else if (this.maxCols() === this.minCols() && this.index() < this.tailIndex()) {
		this.smoothSelect(this.nextIndex());
	} else {
		_Window_Selectable_cursorRight.call(this, ...arguments);
	}
};

const _Window_Selectable_cursorLeft = Window_Selectable.prototype.cursorLeft
Window_Selectable.prototype.cursorLeft = function(wrap) {
	if (this.index() === this.headIndex()) {
		this.cursorTail();
	} else if (this.maxCols() === this.minCols() && this.index() > this.headIndex()) {
		this.smoothSelect(this.previousIndex());
	} else {
		_Window_Selectable_cursorLeft.call(this, ...arguments);
	}
};

// 新規作成
Window_Selectable.prototype.cursorHead = function() {
	if (!Input.isLongPressed("down") && !Input.isLongPressed("right")) {
		this.smoothSelect(this.headIndex());
	}
};

// 新規作成
Window_Selectable.prototype.cursorTail = function() {
	if (!Input.isLongPressed("up") && !Input.isLongPressed("left")) {
		this.smoothSelect(this.tailIndex());
	}
};

//--------------------------------------
// カーソル移動用データ

// 新規作成
Window_Selectable.prototype.nextIndex = function() {
	return this.index() + 1;
};

// 新規作成
Window_Selectable.prototype.previousIndex = function() {
	return this.index() - 1;
};

// 新規作成
Window_Selectable.prototype.headIndex = function() {
	return 0;
};

// 新規作成
Window_Selectable.prototype.tailIndex = function() {
	return this.maxItems() - 1;
};

// 新規作成
Window_Selectable.prototype.headRow = function() {
	return 0;
};

// 新規作成
Window_Selectable.prototype.tailRow = function() {
	return this.maxRows() - 1;
};

// 新規作成
Window_Selectable.prototype.minCols = function() {
	return 1;
};

//--------------------------------------
})();
