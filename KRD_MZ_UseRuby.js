/*:
 * @target MZ
 * @plugindesc ルビ併用時Windowサイズ調整
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @base KRD_MZ_Ruby
 * @orderAfter KRD_MZ_Param
 * @orderAfter KRD_MZ_ExpInEquip
 * 
 * @param general
 * @text 一般
 * 
 * @param plusHeight
 * @text 高さ加算値
 * @desc 1行の高さに追加する値。初期値 12
 * @default 12
 * @type number
 * @parent general
 * 
 * @param downLetter
 * @text 字下げ
 * @desc 文字表示位置を下げる。初期値 6
 * @default 6
 * @type number
 * @parent general
 * 
 * @param DOWN_LETTER_NO_RUBY
 * @text 字下げ（ルビなし時）
 * @desc ルビなし時に文字表示位置を下げる。初期値 0
 * @default 0
 * @type number
 * @parent general
 * 
 * @param message
 * @text 文章の表示
 * 
 * @param msgPlusHeight
 * @text 高さ加算値
 * @desc 「文章の表示」の1行の高さに追加する値。ひとつのWindowに2行表示(初期値): 24 ／ 3行表示: 12
 * @default 24
 * @type number
 * @parent message
 * 
 * @param msgDownLetter
 * @text 字下げ
 * @desc 「文章の表示」の文字表示位置を下げる。初期値 8
 * @default 8
 * @type number
 * @parent message
 * 
 * @param msgWindowHeight
 * @text メッセージWindow高さ
 * @desc メッセージWindowの高さ。変更しない場合 0 ／ システム初期値 176
 * @default 176
 * @type number
 * @parent message
 * 
 * @param messageScroll
 * @text 文章のスクロール表示
 * 
 * @param msgScrDownLetter
 * @text 字下げ
 * @desc 「文章のスクロール表示」の文字表示位置を下げる。初期値 14
 * @default 14
 * @type number
 * @parent messageScroll
 * 
 * @param MSG_PLUS_HEIGHT_OTHER
 * @text その他高さ加算
 * @desc その他メッセージの高さをルビのサイズ分加算する: true ／ しない: false
 * @default true
 * @type boolean
 * 
 * @help
# KRD_MZ_UseRuby.js

ルビ併用時Windowサイズ調整

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2021/08/06|作成開始
0.1.0|2021/09/01|非公開版完成
0.2.0|2021/10/26|字下げを対象箇所で分割
0.3.0|2021/11/09|一部数値の字下げを追加
0.4.0|2022/03/15|アイコン表示制御文字対応
0.5.0|2022/03/25|多言語プラグイン修正対応
0.6.0|2022/04/24|パーセント記号表示
0.7.0|2022/04/26|属性名の多言語プラグイン対応
0.8.0|2022/10/25|SimpleStatus の表示を微修正
0.8.1|2023/07/02|文章のスクロール処理を修正
0.9.0|2023/08/31|ルビなしモード、ひらがなモードに対応
0.10.0|2023/09/07|LANDSCAPE_PLUGIN 処理を追加
0.11.0|2023/10/27|ファイル名変更
0.12.0|2024/04/06|文章のスクロール処理を修正
0.13.0|2024/05/03|ルビプラグイン本体と役割分担
0.14.0|2024/05/30|DescInRectプラグインなし対応
0.14.1|2024/06/03|文字列を明示的に指定
0.14.2|2024/08/14|文字列のundefined対応
1.0.0|2025/07/25|公開
1.1.0|2025/10/31|パラメータ DOWN_LETTER_NO_RUBY を追加

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const PLUS_HEIGHT = Number(PARAM["plusHeight"]) || 0;
const DOWN_LETTER = Number(PARAM["downLetter"]) || 0;

const DOWN_LETTER_NO_RUBY = Number(PARAM["DOWN_LETTER_NO_RUBY"]) || 0;

const MSG_PLUS_HEIGHT = Number(PARAM["msgPlusHeight"]) || 0;
const MSG_DOWN_LETTER = Number(PARAM["msgDownLetter"]) || 0;
const MSG_WINDOW_HEIGHT = Number(PARAM["msgWindowHeight"]) || 0;

const MSG_PLUS_HEIGHT_OTHER = PARAM["MSG_PLUS_HEIGHT_OTHER"] === "true";

const MSG_SCR_DOWN_LETTER = Number(PARAM["msgScrDownLetter"]) || 0;

const EXP_MINUS_Y = 50;
const EXP_WIDTH = 320;

const DEFAULT_LINE_HEIGHT = 36;

//--------------------------------------
// Window_NameBox

const _Window_NameBox_drawTextEx = Window_NameBox.prototype.drawTextEx;
Window_NameBox.prototype.drawTextEx = function(text, x, y, width) {
	if (KRD_RUBY.isRuby(text)) {
		return _Window_NameBox_drawTextEx.call(this, text, x, y + this.downLetter(), width);
	} else {
		return _Window_NameBox_drawTextEx.call(this, ...arguments);
	}
};

//--------------------------------------
// Window_Base

Window_Base.prototype.downLetter = function() {
	if (KRD_RUBY.isCutRubyLanguage()) {
		return 0;
	} else if (KRD_RUBY.isCutBaseLanguage()) {
		return 0;
	} else {
		return DOWN_LETTER;
	}
};

Window_Base.prototype.downLetterNoRuby = function() {
	if (KRD_RUBY.isCutRubyLanguage()) {
		return 0;
	} else if (KRD_RUBY.isCutBaseLanguage()) {
		return 0;
	} else {
		return DOWN_LETTER_NO_RUBY;
	}
};

const _Window_Base_lineHeight = Window_Base.prototype.lineHeight;
Window_Base.prototype.lineHeight = function() {
	if (PLUS_HEIGHT) {
		return DEFAULT_LINE_HEIGHT + PLUS_HEIGHT;
	} else {
		return _Window_Base_lineHeight.call(this, ...arguments);
	}
};

const _Window_Base_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
	if (text != undefined) {
		text = this.processSkillDesc ? this.processSkillDesc(text) : text;
		text = this.getLangText ? this.getLangText(text) : text;
		text = this.convertEscapeCharacters(text.toString());
	
		if (KRD_RUBY.isRuby(text)) {
			_Window_Base_drawText.call(this, text, x, y + this.downLetter(), maxWidth, align);
		} else {
			_Window_Base_drawText.call(this, text, x, y + this.downLetterNoRuby(), maxWidth, align);
		}
	}
};

const _Window_Base_drawTextEx = Window_Base.prototype.drawTextEx;
Window_Base.prototype.drawTextEx = function(text, x, y, width) {
	if (text != undefined) {
		text = this.processSkillDesc ? this.processSkillDesc(text) : text;
		text = this.getLangText ? this.getLangText(text) : text;
		text = this.convertEscapeCharacters(text);	
	
		if (KRD_RUBY.isRuby(text)) {
			return _Window_Base_drawTextEx.call(this, text, x, y + this.downLetter(), width);
		} else {
			return _Window_Base_drawTextEx.call(this, text, x, y + this.downLetterNoRuby(), width);
	}
	}
};

//--------------------------------------
// メッセージ表示

const _Window_Message_lineHeight = Window_Message.prototype.lineHeight;
Window_Message.prototype.lineHeight = function() {
	if (MSG_PLUS_HEIGHT) {
		return DEFAULT_LINE_HEIGHT + MSG_PLUS_HEIGHT;
	} else {
		return _Window_Message_lineHeight.call(this, ...arguments);
	}
};

const _Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	_Window_Message_startMessage.call(this, ...arguments);
	this._textState.y = this._textState.y + MSG_DOWN_LETTER;
	this.contents.clear();
};

const _Window_Message_updateMessage = Window_Message.prototype.updateMessage;
Window_Message.prototype.updateMessage = function() {
	if (MSG_DOWN_LETTER) {
		const textState = this._textState;
		if (textState) {
			 while (!this.isEndOfText(textState)) {
				  if (this.needsNewPage(textState)) {
						this.newPage(textState);
						// 自動改ページの時に字下げが解除されるので再字下げ。
						textState.y = textState.y + MSG_DOWN_LETTER;
				  }
				  this.updateShowFast();
				  this.processCharacter(textState);
				  if (this.shouldBreakHere(textState)) {
						break;
				  }
			 }
			 this.flushTextState(textState);
			 if (this.isEndOfText(textState) && !this.isWaiting()) {
				  this.onEndOfText();
			 }
			 return true;
		} else {
			 return false;
		}
	} else {
		return _Window_Message_updateMessage.call(this, ...arguments);
	}
};

//--------------------------------------
// その他のメッセージ高さ

const _Window_ScrollText_lineHeight = Window_ScrollText.prototype.lineHeight;
Window_ScrollText.prototype.lineHeight = function() {
	if (MSG_PLUS_HEIGHT_OTHER) {
		return DEFAULT_LINE_HEIGHT + KRD_RUBY.rubyFontSize();
	} else {
		return _Window_ScrollText_lineHeight.call(this, ...arguments);
	}
};

const _Window_BattleLog_lineHeight = Window_BattleLog.prototype.lineHeight;
Window_BattleLog.prototype.lineHeight = function() {
	if (MSG_PLUS_HEIGHT_OTHER) {
		return DEFAULT_LINE_HEIGHT + KRD_RUBY.rubyFontSize() + 4;
	} else {
		return _Window_BattleLog_lineHeight.call(this, ...arguments);
	}
};

//--------------------------------------
// メッセージ Window

// Window サイズが奇数だとゴミが出るので偶数にしてる。
const _Scene_Base_calcWindowHeight = Scene_Base.prototype.calcWindowHeight;
Scene_Base.prototype.calcWindowHeight = function(numLines, selectable) {
	const tmp = Math.floor(_Scene_Base_calcWindowHeight.call(this, ...arguments));
	return tmp % 2 === 0 ? tmp : tmp + 1;
};

const _Scene_Message_messageWindowRect = Scene_Message.prototype.messageWindowRect;
Scene_Message.prototype.messageWindowRect = function() {
	if (MSG_WINDOW_HEIGHT) {
		const ww = Graphics.boxWidth;
		const wh = MSG_WINDOW_HEIGHT;
		const wx = (Graphics.boxWidth - ww) / 2;
		const wy = 0;
		return new Rectangle(wx, wy, ww, wh);
	} else {
		return _Scene_Message_messageWindowRect.call(this, ...arguments);
	}
};

//--------------------------------------
// 文章のスクロール

const _Window_ScrollText_startMessage = Window_ScrollText.prototype.startMessage;
Window_ScrollText.prototype.startMessage = function() {
	if (MSG_SCR_DOWN_LETTER) {
		this._text = $gameMessage.allText();
		if (this._text) {
			this._text = `\\PY[${MSG_SCR_DOWN_LETTER}]` + $gameMessage.allText();
			
			this.updatePlacement();
			this._allTextHeight = this.textSizeEx(this._text).height;
			this._allTextHeight -= MSG_SCR_DOWN_LETTER;
			this._blockHeight = this._maxBitmapHeight - this.height;
			this._blockIndex = 0;
			this.origin.y = this._scrollY = -this.height;
			this.createContents();
			this.refresh();
			this.show();
		} else {
			$gameMessage.clear();
		}
	} else {
		_Window_ScrollText_startMessage.call(this, ...arguments);
	}
};

//--------------------------------------
// 装備画面：能力値

Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
	const paramX = this.paramX();
	const paramWidth = this.paramWidth();
	const rightArrowWidth = this.rightArrowWidth();
	const name = TextManager.param(paramId);
	const downLetter = KRD_RUBY.isRuby(name) ? this.downLetter() : 0;
	this.drawParamName(x, y, paramId);
	if (this._actor) {
		this.drawCurrentParam(paramX, y + downLetter, paramId);
	}
	this.drawRightArrow(paramX + paramWidth, y + downLetter);
	if (this._tempActor) {
		this.drawNewParam(paramX + paramWidth + rightArrowWidth, y + downLetter, paramId);
	}
};

Window_EquipStatus.prototype.drawElement = function(x, y, paramId) {
	const paramX = this.paramX();
	const paramWidth = this.paramWidth();
	const rightArrowWidth = this.rightArrowWidth();
	const name = this.elementName(paramId);
	const downLetter = KRD_RUBY.isRuby(name) ? this.downLetter() : 0;
	this.drawElementName(x, y, paramId);
	if (this._actor) {
		 this.drawCurrentElement(paramX, y + downLetter, paramId);
	}
	this.drawRightArrow(paramX + paramWidth, y + downLetter);
	if (this._tempActor) {
		 this.drawNewElement(paramX + paramWidth + rightArrowWidth, y + downLetter, paramId);
	}
};

Window_StatusBase.prototype.elementName = function(index) {
	return TextManager.element ? TextManager.element(index) : $dataSystem.elements[index] ;
};

//--------------------------------------
// 装備画面：経験値

Window_EquipStatus.prototype.drawExpInfo = function(x, y) {
	const expTotalValue = Window_Status.prototype.expTotalValue;
	const expNextValue = Window_Status.prototype.expNextValue;
	const width = this.innerWidth - 18;

	const lineHeight = this.lineHeight();
	const expTotal = TextManager.expTotal.format(TextManager.exp);
	const expNext = TextManager.expNext.format(TextManager.level);
	const downLetterTotal = KRD_RUBY.isRuby(expTotal) ? this.downLetter() : 0;
	const downLetterNext = KRD_RUBY.isRuby(expNext) ? this.downLetter() : 0;
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(expTotal, x, y, width);
	this.drawText(expNext, x, y + lineHeight, width);
	this.resetTextColor();
	this.drawText(expTotalValue.call(this), x, y + downLetterTotal, width, "right");
	this.drawText(expNextValue.call(this), x, y + downLetterNext + lineHeight, width, "right");
};

//--------------------------------------
// ステータス画面

Window_Status.prototype.drawExpInfo = function(x, y) {
	const lineHeight = this.lineHeight();
	const width = EXP_WIDTH;
	y -= EXP_MINUS_Y;
	const expTotal = TextManager.expTotal.format(TextManager.exp);
	const expNext = TextManager.expNext.format(TextManager.level);
	const downLetterTotal = KRD_RUBY.isRuby(expTotal) ? this.downLetter() : 0;
	const downLetterNext = KRD_RUBY.isRuby(expNext) ? this.downLetter() : 0;
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(expTotal, x, y, width);
	this.drawText(expNext, x, y + lineHeight * 1, width);
	this.resetTextColor();
	this.drawText(this.expTotalValue(), x, y + downLetterTotal, width, "right");
	this.drawText(this.expNextValue(), x, y + downLetterNext + lineHeight * 1, width, "right");
};

//--------------------------------------
// ステータス画面：能力値

Window_StatusParams.prototype.drawItem = function(paramId, index) {
	const rect = this.itemLineRect(index);
	const name = TextManager.param(paramId);
	const downLetter = KRD_RUBY.isRuby(name) ? this.downLetter() : 0;
	const value = this._actor.param(paramId);
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(name, rect.x, rect.y, 160);
	this.resetTextColor();
	this.drawText(value, rect.x + 160, rect.y + downLetter, 60, "right");
};

Window_StatusParams.prototype.drawElement = function(paramId, index, percent) {
	const percentChar = percent ? "%" : "";
	const rect = this.itemLineRect(index);
	const name = this.elementName(paramId);
	const value = this.rateMulti100() ? Math.round(this._actor.elementRate(paramId) * 100) : this._actor.elementRate(paramId);
	const downLetter = KRD_RUBY.isRuby(name) ? this.downLetter() : 0;
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(name, rect.x, rect.y, 160);
	this.resetTextColor();
	this.drawText(value + percentChar, rect.x + 160, rect.y + downLetter, 60, "right");
};

//--------------------------------------
// ステータス画面 : 装備表示

Window_StatusEquip.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	const equips = this._actor.equips();
	const item = equips[index];
	const slotName = this.actorSlotName(this._actor, index);
	this.changeTextColor(ColorManager.systemColor());
	if (item) {
		this.drawItemName(item, rect.x, rect.y, rect.width);
	} else {
		this.drawText(slotName, rect.x, rect.y, rect.width, rect.height);
	}
};

//--------------------------------------
// アイコン表示制御文字対応

const _Window_Base_processDrawIcon = Window_Base.prototype.processDrawIcon;
Window_Base.prototype.processDrawIcon = function(iconIndex, textState) {
	if (!KRD_RUBY.isRuby(textState.text) || KRD_RUBY.isCutRubyLanguage()) {
		if (textState.drawing) {
			this.drawIcon(iconIndex, textState.x + 2, textState.y + 6);
		}
		textState.x += ImageManager.iconWidth + 4;
	} else {
		_Window_Base_processDrawIcon.call(this, ...arguments);
	}
};

const _Window_Message_processDrawIcon = Window_Message.prototype.processDrawIcon;
Window_Message.prototype.processDrawIcon = function(iconIndex, textState) {
	if (MSG_PLUS_HEIGHT !== 0) {
		if (textState.drawing) {
			const iconY = Math.floor(MSG_PLUS_HEIGHT / 2);
			this.drawIcon(iconIndex, textState.x + 2, textState.y + iconY);
		}
		textState.x += ImageManager.iconWidth + 4;
	} else {
		_Window_Message_processDrawIcon.call(this, ...arguments);
	}
};

//--------------------------------------
})();
