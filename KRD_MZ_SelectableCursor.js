/*:
 * @target MZ
 * @plugindesc 端っこカーソル移動＋買い物数の増減変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param LIST_HEAD_TAIL
 * @text 先頭と最後を繋げる
 * @desc リストの先頭と最後をカーソル移動可能にする。
 * @default false
 * @type boolean
 * 
 * @param SHOP_NO_PLUS_10
 * @text 店で購入数10増減しない
 * @desc 店での購入数を10増減しない（1にする）
 * @default true
 * @type boolean
 * 
 * @param LIST_ACTOR_CHANGE_SKILL
 * @text スキル一覧アクター変更
 * @desc スキル一覧部分でページアップ・ダウンするとアクターチェンジする。
 * @default true
 * @type boolean
 * 
 * @param LIST_ACTOR_CHANGE_EQUIP
 * @text 装備一覧アクター変更
 * @desc 装備一覧部分でページアップ・ダウンするとアクターチェンジする。
 * @default true
 * @type boolean
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
- ver.1.3.0 (2024/02/28) 一覧でもアクターチェンジ
- ver.1.4.0 (2024/03/20) 先頭と最後を繋げるオプションを追加

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const LIST_HEAD_TAIL = PARAM["LIST_HEAD_TAIL"] === "true";

const SHOP_NO_PLUS_10 = PARAM["SHOP_NO_PLUS_10"] === "true";

const LIST_ACTOR_CHANGE_SKILL = PARAM["LIST_ACTOR_CHANGE_SKILL"] === "true";
const LIST_ACTOR_CHANGE_EQUIP = PARAM["LIST_ACTOR_CHANGE_EQUIP"] === "true";

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
Window_DebugEdit.prototype.cursorPagedown = function() {
	// カーソル移動なし
};

// 挙動を修正
Window_DebugEdit.prototype.cursorPageup = function() {
	// カーソル移動なし
};

//--------------------------------------
// ショップ
// 10増減をやめる

const _Window_ShopNumber_processNumberChange = Window_ShopNumber.prototype.processNumberChange;
Window_ShopNumber.prototype.processNumberChange = function() {
	if (SHOP_NO_PLUS_10) {
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
	} else {
		_Window_ShopNumber_processNumberChange.call(this, ...arguments);
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
	if (LIST_HEAD_TAIL && !Input.isLongPressed("down") && !Input.isLongPressed("right")) {
		this.smoothSelect(this.headIndex());
	}
};

// 新規作成
Window_Selectable.prototype.cursorTail = function() {
	if (LIST_HEAD_TAIL && !Input.isLongPressed("up") && !Input.isLongPressed("left")) {
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
// リストWindowでもアクターチェンジ可能にする

const _Scene_Skill_createItemWindow = Scene_Skill.prototype.createItemWindow;
Scene_Skill.prototype.createItemWindow = function() {
	_Scene_Skill_createItemWindow.call(this, ...arguments);
	
	if (LIST_ACTOR_CHANGE_SKILL) {
		this._itemWindow.setHandler("pagedown", this.nextActor.bind(this));
		this._itemWindow.setHandler("pageup", this.previousActor.bind(this));
	}
};

const _Scene_Equip_createSlotWindow = Scene_Equip.prototype.createSlotWindow;
Scene_Equip.prototype.createSlotWindow = function() {
	_Scene_Equip_createSlotWindow.call(this, ...arguments);

	if (LIST_ACTOR_CHANGE_EQUIP) {
		this._slotWindow.setHandler("pagedown", this.nextActor.bind(this));
		this._slotWindow.setHandler("pageup", this.previousActor.bind(this));
	}
};

//--------------------------------------
})();
