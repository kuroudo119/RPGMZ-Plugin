/*:
 * @target MZ
 * @plugindesc ルビ振り
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param rubyFontSize
 * @text ルビフォントサイズ
 * @desc ルビのフォントサイズ。初期値 12
 * @default 12
 * @type number
 * 
 * @param useRuby
 * @text ルビ使用
 * 
 * @param baseRuby
 * @text ベース
 * @desc Window_Base にルビを使用します。
 * @default false
 * @type boolean
 * @parent useRuby
 * 
 * @param selectRuby
 * @text リスト
 * @desc Window_Selectable にルビを使用します。
 * @default false
 * @type boolean
 * @parent useRuby
 * 
 * @param commandRuby
 * @text コマンド
 * @desc Window_Command にルビを使用します。
 * @default false
 * @type boolean
 * @parent useRuby
 * 
 * @param msgRuby
 * @text メッセージ
 * @desc Window_Message 等にルビを使用します。
 * @default true
 * @type boolean
 * @parent useRuby
 * 
 * @param argTitleRuby
 * @text タイトルルビ
 * @desc タイトルに付けるルビ。1か所のみ。
 * @type struct<titleRuby>
 * 
 * @param BASIC_WINDOW_WIDTH
 * @text 基準解像度幅
 * @desc 基準とする解像度幅。解像度変更する場合のタイトルルビに影響。初期値 816
 * @default 816
 * @type number
 * 
 * @param CUT_RUBY_LANGUAGE_LIST
 * @text ルビなしモード
 * @desc ルビ側を削除して漢字側を表示する言語リスト。カンマ区切りで言語番号を記述する。
 * 
 * @param CUT_BASE_LANGUAGE_LIST
 * @text ひらがなモード
 * @desc 漢字側を削除してルビ側を表示する言語リスト。カンマ区切りで言語番号を記述する。
 * 
 * @help
# KRD_MZ_Ruby.js

ルビ振り

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 使い方

文字入力欄で \R[日本語,ルビ] のようにカンマ区切りで記述します。

## 注意

ルビがメッセージ欄などの枠からはみ出すことがありますが、
このプラグインに画面レイアウト変更機能はありません。

## ルビなしモード、ひらがなモード

多言語プラグインと併用した時に使用できます。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2021/08/5|再作成開始
0.1.0|2021/08/22|非公開版完成
0.2.0|2022/01/04|ルビなし時にdrawText使用
0.3.0|2022/01/26|正規表現のキャプチャグループに変更
0.4.0|2022/02/01|ルビサイズ調整を変更
0.5.0|2022/03/06|isRubyを修正
0.6.0|2022/03/15|ルビなしもアイコン表示対応した
0.6.1|2022/03/25|isRubyを修正など
0.6.2|2022/03/28|アイコン表示位置修正
0.6.3|2022/06/04|F9時にエラー出たので修正
0.7.0|2022/06/15|通貨単位の表示を追加
0.8.0|2022/06/24|多言語プラグインの制御文字処理を追加
0.8.1|2022/06/27|選択肢の表示処理を追加
0.9.0|2023/06/19|タイトルルビの処理を修正
0.10.0|2023/06/19|多言語プラグイン処理を修正
0.11.0|2023/07/05|多言語プラグインの修正により不要処理削除
0.11.1|2023/07/06|リファクタリング
0.12.0|2023/08/31|ルビなしモード、ひらがなモードを追加
0.12.1|2023/10/09|ルビなしモード、ひらがなモードが空欄時の修正
0.13.0|2023/10/27|可変解像度に対応
0.14.0|2023/11/11|アイコン処理を修正
0.15.0|2023/11/19|textSizeEx に convertEscapeCharacters 追加
0.16.0|2023/12/02|バトルステータスの名前にルビ側を使う
0.16.1|2024/05/03|関数追加
0.16.2|2024/12/09|obtainEscapeRuby の戻り値にダミーデータを設定
0.17.0|2025/02/09|hasIcon に制御文字 IT を追加
1.0.0|2025/07/25|公開
1.1.0|2025/10/31|drawItemNameでのアイコン処理を変更

 * 
 * 
 */

/*~struct~titleRuby:
 * 
 * @param text
 * @text ルビ
 * @desc タイトルに表示するルビ。
 * @default [""]
 * @type string[]
 * 
 * @param x
 * @text X座標
 * @desc ルビを表示するX座標。
 * @default [0]
 * @type number[]
 * 
 */

const KRD_RUBY = {};

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const BASE_RUBY = PARAM["baseRuby"] === "true";
const SELECT_RUBY = PARAM["selectRuby"] === "true";
const COMMAND_RUBY = PARAM["commandRuby"] === "true";
const MSG_RUBY = PARAM["msgRuby"] === "true";

const TITLE_RUBY = PARAM["argTitleRuby"] ? JSON.parse(PARAM["argTitleRuby"]) : null;

const RUBY_FONT_SIZE = Number(PARAM["rubyFontSize"]) || 0;

const BASIC_WINDOW_WIDTH = Number(PARAM["BASIC_WINDOW_WIDTH"]) || 0;

const CUT_RUBY_LANGUAGE_LIST = JSON.parse("[" + (PARAM["CUT_RUBY_LANGUAGE_LIST"] || "") + "]");
const CUT_BASE_LANGUAGE_LIST = JSON.parse("[" + (PARAM["CUT_BASE_LANGUAGE_LIST"] || "") + "]");

//--------------------------------------
// ルビ : メイン処理

const _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
	switch (code) {
		case "R":
			this.processRuby(textState);
			break;
		default:
			_Window_Base_processEscapeCharacter.call(this, ...arguments);
	}
};

Window_Base.prototype.obtainEscapeRuby = function(textState) {
	// 正規表現のキャプチャグループを使用
	const regExp = /^\[(?<base>[^,]*?),(?<ruby>[^,]*?)\]/;
	const arr = regExp.exec(textState.text.slice(textState.index));
	if (arr) {
		textState.index += arr[0].length;
		return arr;
	} else {
		return {
			groups:{
				base:"",
				ruby:"",
			}
		};
	}
};

Window_Base.prototype.processRuby = function(textState) {
	if (KRD_RUBY.isCutRubyLanguage()) {
		this.notUseRuby(textState);
		return;
	}
	if (KRD_RUBY.isCutBaseLanguage()) {
		this.notUseBase(textState);
		return;
	}

	if (BASE_RUBY) {
		this.drawRuby(textState);
	} else {
		this.notUseRuby(textState);
	}
};

Window_Selectable.prototype.processRuby = function(textState) {
	if (KRD_RUBY.isCutRubyLanguage()) {
		this.notUseRuby(textState);
		return;
	}
	if (KRD_RUBY.isCutBaseLanguage()) {
		this.notUseBase(textState);
		return;
	}

	if (SELECT_RUBY) {
		this.drawRuby(textState);
	} else {
		this.notUseRuby(textState);
	}
};

Window_Command.prototype.processRuby = function(textState) {
	if (KRD_RUBY.isCutRubyLanguage()) {
		this.notUseRuby(textState);
		return;
	}
	if (KRD_RUBY.isCutBaseLanguage()) {
		this.notUseBase(textState);
		return;
	}

	if (COMMAND_RUBY) {
		this.drawRuby(textState);
	} else {
		this.notUseRuby(textState);
	}
};

Window_Message.prototype.processRuby = function(textState) {
	if (KRD_RUBY.isCutRubyLanguage()) {
		this.notUseRuby(textState);
		return;
	}

	if (MSG_RUBY) {
		this.drawRuby(textState);
	} else {
		this.notUseRuby(textState);
	}
};

Window_ScrollText.prototype.processRuby = function(textState) {
	Window_Message.prototype.processRuby.call(this, textState);
};

Window_Base.prototype.drawRuby = function(textState) {
	const splited = this.obtainEscapeRuby(textState);
	const baseText = splited.groups.base;
	const rubyText = splited.groups.ruby;

	const width = this.textWidth(baseText);
	const size = this.contents.fontSize;
	const defaultSize = $gameSystem.mainFontSize();

	const rubySize = this.rubyFontSize(size, defaultSize);
	const rubyY = this.rubyY(textState, size, defaultSize, rubySize);
	const rubyHeight = this.rubyHeight(textState, rubySize);

	this.setFontSize(rubySize);
	this.contents.drawText(rubyText, textState.x, rubyY, width, rubyHeight, "center");
	this.setFontSize(size);
	textState.buffer += baseText;
};

Window_Message.prototype.drawRuby = function(textState) {
	if (KRD_RUBY.isCutBaseLanguage()) {
		const splited = this.obtainEscapeRuby(textState);
		const baseText = splited.groups.base;
		const rubyText = splited.groups.ruby;
	
		const width = this.textWidth(baseText);
		this.contents.drawText(rubyText, textState.x, textState.y, width, textState.height, "center");
		textState.x += width;
	} else {
		Window_Base.prototype.drawRuby.call(this, textState);
	}
};

Window_ScrollText.prototype.drawRuby = function(textState) {
	Window_Message.prototype.drawRuby.call(this, textState);
};

Window_Base.prototype.setFontSize = function(size) {
	this.contents.fontSize = size;
};

Window_Base.prototype.rubyFontSize = function(size, defaultSize) {
	const miniSize = RUBY_FONT_SIZE >= size ? size - 2 : RUBY_FONT_SIZE;
	const rubySize = size > defaultSize ? Math.round(size * 0.45) : miniSize;
	return rubySize;
};

Window_Base.prototype.rubyY = function(textState, size, defaultSize, rubySize) {
	const defaultY = textState.y - Math.round((size + rubySize) * 0.62);
	const miniY = textState.y - Math.round((size + rubySize) * 0.7);
	const rubyY = size >= defaultSize ? defaultY : miniY;
	return rubyY;
};

Window_Base.prototype.rubyHeight = function(textState, rubySize) {
	const rubyHeight = textState.height + rubySize - Math.round(rubySize * 0.5);
	return rubyHeight;
};

const _Window_Base_textSizeEx = Window_Base.prototype.textSizeEx;
Window_Base.prototype.textSizeEx = function(text) {
	const convText = this.convertEscapeCharacters(text);
	if (KRD_RUBY.isCutBaseLanguage()) {
		return _Window_Base_textSizeEx.call(this, KRD_RUBY.returnRuby(convText));
	} else {
		return _Window_Base_textSizeEx.call(this, KRD_RUBY.cutRuby(convText));
	}
};

Window_Base.prototype.notUseRuby = function(textState) {
	const splited = this.obtainEscapeRuby(textState);
	const baseText = splited.groups.base;
	textState.buffer += baseText;
};

Window_Base.prototype.notUseBase = function(textState) {
	const splited = this.obtainEscapeRuby(textState);
	const rubyText = splited.groups.ruby;
	textState.buffer += rubyText;
};

//--------------------------------------
// 全画面 : drawText を drawTextRuby にバイパス

const _Window_Base_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
	if (KRD_RUBY.isCutBaseLanguage()) {
		const cutIconText = KRD_RUBY.cutIcon(text);
		const cutBaseText = KRD_RUBY.returnRuby(cutIconText);
		_Window_Base_drawText.call(this, cutBaseText, x, y, maxWidth, align);
		return;
	}

	if (KRD_RUBY.isRuby(text)) {
		this.drawTextRuby(...arguments);
	} else if (KRD_RUBY.hasIcon(text)) {
		this.drawTextRuby(...arguments);
	} else {
		_Window_Base_drawText.call(this, ...arguments);
	}
};

Window_Base.prototype.drawTextRuby = function(text, x, y, width, align) {
	if (align === "center") {
		x = this.centerX(...arguments);
	} else if (align === "right") {
		x = this.rightX(...arguments);
	}
	const textState = this.createTextState(text.toString(), x, y, width);
	this.processAllText(textState);
};

Window_Base.prototype.centerX = function(text, x, y, maxWidth, align) {
	const iw = KRD_RUBY.hasIcon(text) ? ImageManager.iconWidth - 12 : 0;
	const cutIconText = KRD_RUBY.cutIcon(text);
	const tw = this.textWidth(KRD_RUBY.cutRuby(cutIconText));
	const tx = x + Math.floor((maxWidth - tw) / 2) - iw;
	return tx;
};

Window_Base.prototype.rightX = function(text, x, y, maxWidth, align) {
	const tw = this.textWidth(KRD_RUBY.cutIcon(KRD_RUBY.cutRuby(text)));
	const tx = x + maxWidth - tw;
	return tx;
};

//--------------------------------------
// 特別処理

// 上書き
Window_Base.prototype.drawItemName = function(item, x, y, width) {
	if (item) {
		const convText = this.convertEscapeCharacters(item.name);
		if (KRD_RUBY.hasHeadIcon(convText)) {
			this.drawItemNameIcon(item, x, y, width, convText);
		} else {
			this.drawItemNameMain(item, x, y, width, convText);
		}
	}
};

Window_Base.prototype.drawItemNameMain = function(item, x, y, width, convText) {
	const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
	const textMargin = ImageManager.iconWidth + 4;
	const itemWidth = Math.max(0, width - textMargin);
	this.resetTextColor();
	this.drawIcon(item.iconIndex, x, iconY);
	this.drawText(convText, x + textMargin, y, itemWidth);
};

Window_Base.prototype.drawItemNameIcon = function(item, x, y, width, convText) {
	const iconIndex = KRD_RUBY.returnIconIndex(convText);
	const cutIconText = KRD_RUBY.cutIcon(convText);

	const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
	const textMargin = ImageManager.iconWidth + 4;
	const itemWidth = Math.max(0, width - textMargin);
	this.resetTextColor();
	this.drawIcon(item.iconIndex, x, iconY);

	const x2 = x + textMargin;
	const textWidth = itemWidth - textMargin;
	this.drawIcon(iconIndex, x2, iconY);
	this.drawText(cutIconText, x2 + textMargin, y, textWidth);
};

// 決定ボタン等がはみ出すのでmaxWidthを効かせるためにExから戻してる。
Window_NameInput.prototype.drawText = function(text, x, y, maxWidth, align) {
	_Window_Base_drawText.call(this, ...arguments);
};

//--------------------------------------
// オプション画面

Window_Options.prototype.drawText = function(text, x, y, maxWidth, align) {
	Window_Base.prototype.drawText.call(this, ...arguments);
};

//--------------------------------------
// メッセージ高さ
//
// KRD_MZ_UseRuby で変更可能になるのでコメントアウト。

// const _Window_Message_lineHeight = Window_Message.prototype.lineHeight;
// Window_Message.prototype.lineHeight = function() {
// 	if (MSG_RUBY) {
// 		return _Window_Message_lineHeight.call(this, ...arguments) + RUBY_FONT_SIZE;
// 	} else {
// 		return _Window_Message_lineHeight.call(this, ...arguments);
// 	}
// };

//--------------------------------------
// その他のメッセージ高さ

// const _Window_ScrollText_lineHeight = Window_ScrollText.prototype.lineHeight;
// Window_ScrollText.prototype.lineHeight = function() {
// 	if (MSG_RUBY) {
// 		return _Window_ScrollText_lineHeight.call(this, ...arguments) + RUBY_FONT_SIZE;
// 	} else {
// 		return _Window_ScrollText_lineHeight.call(this, ...arguments);
// 	}
// };

// const _Window_BattleLog_lineHeight = Window_BattleLog.prototype.lineHeight;
// Window_BattleLog.prototype.lineHeight = function() {
// 	if (MSG_RUBY) {
// 		return _Window_BattleLog_lineHeight.call(this, ...arguments) + RUBY_FONT_SIZE + 4;
// 	} else {
// 		return _Window_BattleLog_lineHeight.call(this, ...arguments);
// 	}
// };

//--------------------------------------
// メッセージ : convertEscapeCharacters を使用

const _Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	_Window_Message_startMessage.call(this, ...arguments);
	this._textState.text = this.convertEscapeCharacters(this._textState.text);
};

//--------------------------------------
// メッセージの名前欄 : convertEscapeCharacters を使用

const _Window_NameBox_refresh = Window_NameBox.prototype.refresh;
Window_NameBox.prototype.refresh = function() {
	this._name = this.convertEscapeCharacters(this._name);
	_Window_NameBox_refresh.call(this, ...arguments);
};

const _Window_NameBox_lineHeight = Window_NameBox.prototype.lineHeight;
Window_NameBox.prototype.lineHeight = function() {
	if (BASE_RUBY) {
		return 36 + RUBY_FONT_SIZE;
	} else {
		return _Window_NameBox_lineHeight.call(this, ...arguments);
	}
};

const _Window_NameBox_itemHeight = Window_NameBox.prototype.itemHeight;
Window_NameBox.prototype.itemHeight = function() {
	if (BASE_RUBY) {
		return 36 + RUBY_FONT_SIZE;
	} else {
		return _Window_NameBox_itemHeight.call(this, ...arguments);
	}
};

//--------------------------------------
// バトルステータスの名前

const _Sprite_Name_name = Sprite_Name.prototype.name;
Sprite_Name.prototype.name = function() {
	const name = _Sprite_Name_name.call(this, ...arguments);
	return KRD_RUBY.cutBase(name);
};

//--------------------------------------
// 名前入力

Window_NameEdit.prototype.setup = function(actor, maxLength) {
	this._actor = actor;
	this._maxLength = maxLength;
	const name = KRD_RUBY.cutRuby(actor.name());
	this._name = name.slice(0, this._maxLength);
	this._index = this._name.length;
	this._defaultName = this._name;
	ImageManager.loadFace(actor.faceName());
};

//--------------------------------------
// 選択肢の表示

Window_ChoiceList.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	const text = this.convertEscapeCharacters(this.commandName(index));
	this.drawTextEx(text, rect.x, rect.y, rect.width);
};

//--------------------------------------
// 通貨単位表示

const _Window_Base_drawCurrencyValue = Window_Base.prototype.drawCurrencyValue;
Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
	if (KRD_RUBY.hasIcon(unit)) {
		const cutText = KRD_RUBY.cutIcon(KRD_RUBY.cutRuby(unit));
		const unitWidth = this.textWidth(cutText + " ");
		const iconWidth = ImageManager.iconWidth;
		const sumWidth = unitWidth + Math.floor(iconWidth);

		this.resetTextColor();
		this.drawText(value, x, y, width - sumWidth, "right");
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(" " + unit, x, y, width - iconWidth, "right");
	} else if (KRD_RUBY.isRuby(unit)) {
		const cutText = KRD_RUBY.cutIcon(KRD_RUBY.cutRuby(unit));
		const unitWidth = this.textWidth(cutText + " ");

		this.resetTextColor();
		this.drawText(value, x, y, width - unitWidth, "right");
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(unit, x, y, width, "right");
	} else {
		_Window_Base_drawCurrencyValue.call(this, ...arguments);
	}
};

//--------------------------------------
// タイトル画面にルビ追加

const _Scene_Title_drawGameTitle = Scene_Title.prototype.drawGameTitle;
Scene_Title.prototype.drawGameTitle = function() {
	_Scene_Title_drawGameTitle.call(this, ...arguments);

	if (TITLE_RUBY) {
		this.drawRubyTitle();
	}
};

Scene_Title.prototype.drawRubyTitle = function() {
	this._gameTitleRubySprite = new Sprite(
		new Bitmap(Graphics.width, Graphics.height)
	);
	this.addChild(this._gameTitleRubySprite);

	const language = multilingual();
	const titleRuby = TITLE_RUBY && TITLE_RUBY.text ? JSON.parse(TITLE_RUBY.text) : null;
	const ruby = titleRuby && titleRuby[language] ? titleRuby[language] : "";
	const titleX = TITLE_RUBY && TITLE_RUBY.x ? JSON.parse(TITLE_RUBY.x) : 0;
	const x = titleX && titleX[language] ? Number(titleX[language]) || 0 : 0;
	const w = Math.floor((Graphics.width - BASIC_WINDOW_WIDTH) / 2);
	const x2 = x + w;
	const y = Graphics.height / 4 - 60;
	const maxWidth = Graphics.width;
	const height = 48;
	const bitmap = this._gameTitleRubySprite.bitmap;

	bitmap.fontFace = $gameSystem.mainFontFace();
	bitmap.outlineColor = "black";
	bitmap.outlineWidth = 2;
	bitmap.fontSize = $gameSystem.mainFontSize();
	bitmap.drawText(ruby, x2, y, maxWidth, height, "left");
};

//--------------------------------------
// 他のプラグインでも使える関数

KRD_RUBY.rubyFontSize = function() {
	return RUBY_FONT_SIZE;
};

KRD_RUBY.cutRuby = function(text) {
	return this.returnBase(text);
};

KRD_RUBY.returnBase = function(text) {
	const regex1 = /\\R\[(?<base>[^,]*?),(?<ruby>[^,]*?)\]/g;
	const regex2 = /\x1bR\[(?<base>[^,]*?),(?<ruby>[^,]*?)\]/g;
	
	const result1 = text?.toString().replace(regex1, baseReplacer);
	const result2 = result1?.toString().replace(regex2, baseReplacer);
	return result2;
};

function baseReplacer(match, p1, p2, offset, string, groups) {
	return groups.base;
}

KRD_RUBY.isRuby = function(text) {
	const regex1 = /\\R\[/;
	const regex2 = /\x1bR\[/;
	return !!(text?.toString().match(regex1) || text?.toString().match(regex2));
};

KRD_RUBY.hasIcon = function(text) {
	return !!( text?.toString().match(/\\I\[/)
		|| text?.toString().match(/\x1bI\[/)
		|| text?.toString().match(/\\IT\[/)
		|| text?.toString().match(/\x1bIT\[/)
	);
};

KRD_RUBY.hasHeadIcon = function(text) {
	return !!( text?.toString().match(/^\\I\[/)
		|| text?.toString().match(/^\x1bI\[/)
		|| text?.toString().match(/^\\IT\[/)
		|| text?.toString().match(/^\x1bIT\[/)
	);
};

KRD_RUBY.cutIcon = function(text) {
	const regex1 = /\\I\[\d+?\]/g;
	const regex2 = /\x1bI\[\d+?\]/g;
	
	const result1 = text?.toString().replace(regex1, iconReplacer);
	const result2 = result1?.toString().replace(regex2, iconReplacer);
	return result2;
};

function iconReplacer() {
	return "";
}

KRD_RUBY.returnIconIndex = function(text) {
	const regex1 = /\\I\[(?<index>\d+)\]/;
	const regex2 = /\x1bI\[(?<index>\d+)\]/;
	
	const result1 = text?.toString().match(regex1);
	const result2 = text?.toString().match(regex2);
	const iconIndex1 = Number(result1?.groups.index);
	const iconIndex2 = Number(result2?.groups.index);
	if (!isNaN(iconIndex1)) {
		return iconIndex1 || 0;
	} else {
		return iconIndex2 || 0;
	}
};

function multilingual() {
	if (typeof KRD_MULTILINGUAL !== "undefined") {
		return KRD_MULTILINGUAL.multilingual();
	}
	return 0;
}

KRD_RUBY.isCutRubyLanguage = function() {
	const language = multilingual();
	return CUT_RUBY_LANGUAGE_LIST.includes(language);
};

KRD_RUBY.isCutBaseLanguage = function() {
	const language = multilingual();
	return CUT_BASE_LANGUAGE_LIST.includes(language);
};

KRD_RUBY.cutBase = function(text) {
	return this.returnRuby(text);
};

KRD_RUBY.returnRuby = function(text) {
	const regex1 = /\\R\[(?<base>[^,]*?),(?<ruby>[^,]*?)\]/g;
	const regex2 = /\x1bR\[(?<base>[^,]*?),(?<ruby>[^,]*?)\]/g;
	
	const result1 = text?.toString().replace(regex1, rubyReplacer);
	const result2 = result1?.toString().replace(regex2, rubyReplacer);
	return result2;
};

function rubyReplacer(match, p1, p2, offset, string, groups) {
	return groups.ruby;
}

//--------------------------------------
})();
