/*:
 * @target MZ
 * @plugindesc 選択肢内説明
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param descFontSize
 * @text 説明フォントサイズ
 * @desc 選択肢内の説明のフォントサイズ。0 の場合システム値 -6 となります。
 * @default 0
 * @type number
 * 
 * @param BASIC
 * @text 基本設定
 * 
 * @param itemRows
 * @text アイテム行数
 * @desc アイテム画面のアイテムの行数。
 * @default 4
 * @type number
 * @parent BASIC
 * 
 * @param skillRows
 * @text スキル行数
 * @desc スキル画面のスキルの行数。
 * @default 4
 * @type number
 * @parent BASIC
 * 
 * @param equipRows
 * @text 装備行数
 * @desc 装備画面の装備中装備品の行数。装備アイテム画面もこの値と同じ。
 * @default 4
 * @type number
 * @parent BASIC
 * 
 * @param buyRows
 * @text ショップ購入行数
 * @desc ショップ画面での購入時の行数。
 * @default 4
 * @type number
 * @parent BASIC
 * 
 * @param sellRows
 * @text ショップ売却行数
 * @desc ショップ画面での売却時のアイテム行数。
 * @default 3
 * @type number
 * @parent BASIC
 * 
 * @param choiceRows
 * @text アイテム選択行数
 * @desc アイテム選択イベントの行数。
 * @default 4
 * @type number
 * @parent BASIC
 * 
 * @param battleRows
 * @text バトル画面行数
 * @desc バトル画面でのアイテム・スキルの行数。
 * @default 4
 * @type number
 * @parent BASIC
 * 
 * @param DESC_ONE_LINE
 * @text 説明文1行モード
 * @desc 説明文を最初の1行のみ表示します：true ／ 説明文すべて表示します：false
 * @default false
 * @type boolean
 * 
 * @param ONE_LINE_ITEM_ROWS
 * @text アイテム行数
 * @desc アイテム画面のアイテムの行数。
 * @default 5
 * @type number
 * @parent DESC_ONE_LINE
 * 
 * @param ONE_LINE_SKILL_ROWS
 * @text スキル行数
 * @desc スキル画面のスキルの行数。
 * @default 5
 * @type number
 * @parent DESC_ONE_LINE
 * 
 * @param ONE_LINE_EQUIP_ROWS
 * @text 装備行数
 * @desc 装備画面の装備中装備品の行数。装備アイテム画面もこの値と同じ。
 * @default 6
 * @type number
 * @parent DESC_ONE_LINE
 * 
 * @param ONE_LINE_BUY_ROWS
 * @text ショップ購入行数
 * @desc ショップ画面での購入時の行数。
 * @default 6
 * @type number
 * @parent DESC_ONE_LINE
 * 
 * @param ONE_LINE_SELL_ROWS
 * @text ショップ売却行数
 * @desc ショップ画面での売却時のアイテム行数。
 * @default 4
 * @type number
 * @parent DESC_ONE_LINE
 * 
 * @param ONE_LINE_CHOICE_ROWS
 * @text アイテム選択行数
 * @desc アイテム選択イベントの行数。
 * @default 4
 * @type number
 * @parent DESC_ONE_LINE
 * 
 * @param ONE_LINE_BATTLE_ROWS
 * @text バトル画面行数
 * @desc バトル画面でのアイテム・スキルの行数。
 * @default 5
 * @type number
 * @parent DESC_ONE_LINE
 * 
 * @param equipSlotMode
 * @text 装備枠名上書き
 * @desc 装備あり時、装備枠名を消して装備品名を書きます。
 * @default true
 * @type boolean
 * 
 * @param ITEM_MINUS_Y
 * @text アイテム一覧Y補正
 * @desc アイテム一覧の表示の縦位置を上側に修正します。
 * @default 0
 * @type number
 * 
 * @param SKILL_MINUS_Y
 * @text スキル一覧Y補正
 * @desc スキル一覧の表示の縦位置を上側に修正します。
 * @default 0
 * @type number
 * 
 * @param ACTOR_COMMAND_DESC
 * @text アクターコマンド説明
 * @desc アクターコマンドに説明を追加します。
 * @default false
 * @type boolean
 * 
 * @param BATTLE_ITEM_DESC
 * @text アイテムコマンド説明
 * @desc 戦闘時のアイテムコマンドに説明を追加します。
 * @default アイテムを使用します。
 * @type multiline_string
 * @parent ACTOR_COMMAND_DESC
 * 
 * @param BATTLE_SKILLTYPE_DESC
 * @text スキルコマンド説明
 * @desc 戦闘時のスキルコマンド（スキルタイプ）に説明を追加します。
 * @type multiline_string[]
 * @parent ACTOR_COMMAND_DESC
 * 
 * @param USE_VARIABLE_ATTACK_NAME
 * @text 可変攻撃コマンド
 * @desc 戦闘時の攻撃コマンドを攻撃スキルの物に変更します。
 * @default false
 * @type boolean
 * @parent ACTOR_COMMAND_DESC
 * 
 * @param BATTLE_COMMAND_ICON_LANGUAGE
 * @text 攻撃コマンドアイコン言語
 * @desc 攻撃コマンドのアイコンを設定する言語番号をカンマ区切りで記述します。
 * @parent ACTOR_COMMAND_DESC
 * 
 * @help
# KRD_MZ_UI_DescInRect.js

選択肢内説明

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 注意

このプラグインにはWindowサイズを変更する機能はありません。

## 更新履歴

- ver.0.0.1 (2021/07/29) 作成開始
- ver.0.1.0 (2021/08/27) 非公開版完成
- ver.0.1.1 (2022/01/04) ルビなし時にdrawText使用
- ver.0.2.0 (2022/03/11) 多言語プラグイン ver.3.0.0 対応
- ver.0.2.1 (2022/04/02) フォントサイズ既定値変更
- ver.0.2.2 (2022/04/26) アイコン表示位置を修正
- ver.0.2.3 (2022/06/11) 制御文字チェック方法を変更
- ver.0.3.0 (2022/06/29) プラグインパラメータ名を変更
- ver.0.3.1 (2022/09/18) 説明の表示方法を変更
- ver.0.4.0 (2023/06/10) アクターコマンドに説明を追加
- ver.0.5.0 (2023/06/21) アクターコマンド説明にconvertを追加
- ver.0.6.0 (2023/06/23) プラグインパラメータSKILL_MINUS_Yを追加
- ver.0.7.0 (2023/08/19) ショップ表示位置の横長画面対応
- ver.0.7.1 (2023/08/21) ショップ個数WindowのYを修正
- ver.0.8.0 (2023/08/31) ルビなしモード、ひらがなモードに対応
- ver.0.9.0 (2023/09/07) LANDSCAPE_PLUGIN を追加
- ver.0.10.0 (2024/08/15) LANDSCAPE_PLUGIN 用の値をベタ書きで変更
- ver.0.11.0 (2024/08/17) DESC_ONE_LINE を追加
- ver.1.0.0 (2024/09/17) 公開
- ver.1.1.0 (2024/09/25) LANDSCAPE_PLUGIN 用の値を変更
- ver.1.2.0 (2025/02/04) descOneLine 関数を追加
- ver.1.3.0 (2025/02/10) ショップ画面の表示位置変更
- ver.1.4.0 (2025/04/05) 星型ゲージプラグインとの併用を追加
- ver.1.5.0 (2025/05/04) Landscapeでの売却の行数を可変にした
- ver.1.6.0 (2025/05/11) LANDSCAPE_PLUGIN 用の値を変更
- ver.1.7.0 (2025/06/27) 1行モード用の行数のパラメータを追加

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const LANDSCAPE_PLUGIN = typeof KRD_MZ_UI_Landscape !== "undefined" ? KRD_MZ_UI_Landscape : false;

const DESC_FONT_SIZE = Number(PARAM["descFontSize"]) || 0;

const PARAM_ITEM_ROWS = Number(PARAM["itemRows"]) || 0;
const PARAM_SKILL_ROWS = Number(PARAM["skillRows"]) || 0;
const PARAM_EQUIP_ROWS = Number(PARAM["equipRows"]) || 0;
const PARAM_BUY_ROWS = Number(PARAM["buyRows"]) || 0;
const PARAM_SELL_ROWS = Number(PARAM["sellRows"]) || 0;
const PARAM_CHOICE_ROWS = Number(PARAM["choiceRows"]) || 0;
const PARAM_BATTLE_ROWS = Number(PARAM["battleRows"]) || 0;

const PARAM_DESC_ONE_LINE = PARAM["DESC_ONE_LINE"] === "true";
const DESC_ONE_LINE = LANDSCAPE_PLUGIN ? true : PARAM_DESC_ONE_LINE;

const ONE_LINE_ITEM_ROWS = Number(PARAM["ONE_LINE_ITEM_ROWS"]) || 0;
const ONE_LINE_SKILL_ROWS = Number(PARAM["ONE_LINE_SKILL_ROWS"]) || 0;
const ONE_LINE_EQUIP_ROWS = Number(PARAM["ONE_LINE_EQUIP_ROWS"]) || 0;
const ONE_LINE_BUY_ROWS = Number(PARAM["ONE_LINE_BUY_ROWS"]) || 0;
const ONE_LINE_SELL_ROWS = Number(PARAM["ONE_LINE_SELL_ROWS"]) || 0;
const ONE_LINE_CHOICE_ROWS = Number(PARAM["ONE_LINE_CHOICE_ROWS"]) || 0;
const ONE_LINE_BATTLE_ROWS = Number(PARAM["ONE_LINE_BATTLE_ROWS"]) || 0;

function getRows(basicRows, oneLineRows, landscapePlus = 0) {
	if (LANDSCAPE_PLUGIN) {
		return oneLineRows + landscapePlus;
	} else {
		return DESC_ONE_LINE ? oneLineRows : basicRows;
	}
}

const ITEM_ROWS = getRows(PARAM_ITEM_ROWS, ONE_LINE_ITEM_ROWS, -1);
const SKILL_ROWS = getRows(PARAM_SKILL_ROWS, ONE_LINE_SKILL_ROWS, -1);
const EQUIP_SLOT_ROWS = getRows(PARAM_EQUIP_ROWS, ONE_LINE_EQUIP_ROWS, -3);
const EQUIP_ITEM_ROWS = getRows(PARAM_EQUIP_ROWS, ONE_LINE_EQUIP_ROWS, -2);
const BUY_ROWS = getRows(PARAM_BUY_ROWS, ONE_LINE_BUY_ROWS, -3);
const SELL_ROWS = getRows(PARAM_SELL_ROWS, ONE_LINE_SELL_ROWS);
const CHOICE_ROWS = getRows(PARAM_CHOICE_ROWS, ONE_LINE_CHOICE_ROWS, -2);
const BATTLE_ROWS = getRows(PARAM_BATTLE_ROWS, ONE_LINE_BATTLE_ROWS, -1);

const SLOT_MODE = PARAM["equipSlotMode"] === "true";

const ACTOR_COMMAND_DESC = PARAM["ACTOR_COMMAND_DESC"] === "true";
const BATTLE_ITEM_DESC = PARAM["BATTLE_ITEM_DESC"];
const BATTLE_SKILLTYPE_DESC = PARAM["BATTLE_SKILLTYPE_DESC"] ? JSON.parse(PARAM["BATTLE_SKILLTYPE_DESC"]) : [];

const USE_VARIABLE_ATTACK_NAME = PARAM["USE_VARIABLE_ATTACK_NAME"] === "true";
const BATTLE_COMMAND_ICON_LANGUAGE = PARAM["BATTLE_COMMAND_ICON_LANGUAGE"] ? JSON.parse("[" + PARAM["BATTLE_COMMAND_ICON_LANGUAGE"] + "]") : [];

const ITEM_MINUS_Y = Number(PARAM["ITEM_MINUS_Y"]) || 0;
const SKILL_MINUS_Y = Number(PARAM["SKILL_MINUS_Y"]) || 0;

//--------------------------------------
// 説明をrectに表示（共通）

// 自作関数
Window_Base.prototype.drawDescription = function(item, x, y, width) {
	if (item) {
		if (item.description) {
			const preText = this.processSkillDesc ? this.processSkillDesc(item.description) : item.description;
			const text = this.convertEscapeCharacters(preText);
			this.changeTextColor(ColorManager.normalColor());
			this.drawTextDesc(text, x, y, width);
		}
	}
};

// 自作関数
Window_Base.prototype.drawTextDesc = function(text, x, y, width) {
	const baseFontSize = this.contents.fontSize;
	const fontSize = DESC_FONT_SIZE || $gameSystem.mainFontSize() - 6;
	const text2 = this.getLangText ? this.getLangText(text) : text;
	const str = text2.split("\n");

	if (DESC_ONE_LINE) {
		this.contents.fontSize = fontSize;
		this.drawText(str[0], x, y, width);
	} else {
		str.forEach((desc, i) => {
			const plusY = i > 0 ? -(baseFontSize - fontSize - 2) : 0;
			const lineY = y + this.lineHeight() * i + plusY;
			this.contents.fontSize = fontSize;
			this.drawText(desc, x, lineY, width);
		});
	}

	this.contents.fontSize = $gameSystem.mainFontSize();
};

// 自作関数
Window_Base.prototype.descOneLine = function() {
	return DESC_ONE_LINE;
};

//--------------------------------------
// ヘルプWindowを非表示

Scene_MenuBase.prototype.helpAreaHeight = function() {
	return 0;
};

Scene_Battle.prototype.helpAreaHeight = function() {
	return 0;
};

//--------------------------------------
// アイテム画面

Window_ItemList.prototype.itemHeight = function() {
	return Math.floor(this.innerHeight / ITEM_ROWS);
};

Window_ItemList.prototype.drawItem = function(index) {
	const item = this.itemAt(index);
	if (item) {
		const numberWidth = this.numberWidth();
		const rect = this.itemRectWithPadding(index);
		const y = rect.y + this.itemPadding() - ITEM_MINUS_Y;
		this.changePaintOpacity(this.isEnabled(item));
		this.drawItemName(item, rect.x, y, rect.width - numberWidth);
		this.drawItemNumber(item, rect.x, y, rect.width);
		this.drawDescription(item, rect.x, y + this.lineHeight(), rect.width);
		this.changePaintOpacity(true);
	}
};

//--------------------------------------
// スキル画面

Window_SkillList.prototype.itemHeight = function() {
	return Math.floor(this.innerHeight / SKILL_ROWS);
};

Window_SkillList.prototype.drawItem = function(index) {
	if (typeof KRD_Sprite_StarGauge !== "undefined") {
		this.drawItemStar(index);
	} else {
		this.drawItemMain(index);
	}
};

Window_SkillList.prototype.drawItemMain = function(index) {
	const skill = this.itemAt(index);
	if (skill) {
		const costWidth = this.costWidth();
		const rect = this.itemRectWithPadding(index);
		const y = rect.y + this.itemPadding() - SKILL_MINUS_Y;
		this.changePaintOpacity(this.isEnabled(skill));
		this.drawItemName(skill, rect.x, y, rect.width - costWidth);
		this.drawSkillCost(skill, rect.x, y, rect.width);
		this.drawDescription(skill, rect.x, y + this.lineHeight(), rect.width);
		this.changePaintOpacity(true);
	}
};

Window_SkillList.prototype.drawItemStar = function(index) {
	const skill = this.itemAt(index);
	if (skill) {
		const costWidth = this.costWidth();
		const rect = this.itemRectWithPadding(index);
		const textWidth = rect.width - costWidth;
		const y = rect.y + this.itemPadding() - SKILL_MINUS_Y;
		this.changePaintOpacity(this.isEnabled(skill));
		this.drawItemName(skill, rect.x, y, textWidth);
		this.drawSkillCost(skill, rect.x + textWidth, y, costWidth);
		this.drawDescription(skill, rect.x, y + this.lineHeight(), rect.width);
		this.changePaintOpacity(true);
	}
};

//--------------------------------------
// 装備画面

Window_EquipSlot.prototype.itemHeight = function() {
	return Math.floor(this.innerHeight / EQUIP_SLOT_ROWS);
};

Window_EquipSlot.prototype.drawItem = function(index) {
	if (this._actor) {
		const slotName = this.actorSlotName(this._actor, index);
		const item = this.itemAt(index);
		const slotNameWidth = this.slotNameWidth();
		const rect = this.itemRectWithPadding(index);
		const itemWidth = rect.width - slotNameWidth;
		const y = rect.y + this.itemPadding() - ITEM_MINUS_Y;
		this.changeTextColor(ColorManager.systemColor());
		this.changePaintOpacity(this.isEnabled(index));
		if (SLOT_MODE) {
			if (item) {
				this.drawItemName(item, rect.x, y, rect.width);
				this.drawDescription(item, rect.x, y + this.lineHeight(), rect.width);
			} else {
				this.drawText(slotName, rect.x, y, slotNameWidth, rect.height);
			}
		} else {
			this.drawText(slotName, rect.x, y, slotNameWidth, rect.height);
			this.drawItemName(item, rect.x + slotNameWidth, y, itemWidth);
			this.drawDescription(item, rect.x, y + this.lineHeight(), rect.width);
		}
		this.changePaintOpacity(true);
	}
};

Window_EquipItem.prototype.itemHeight = function() {
	return Math.floor(this.innerHeight / EQUIP_ITEM_ROWS);
};

//--------------------------------------
// ショップ画面

Window_ShopBuy.prototype.itemHeight = function() {
	return Math.floor(this.innerHeight / BUY_ROWS);
};

Window_ShopBuy.prototype.drawItem = function(index) {
	const item = this.itemAt(index);
	const price = this.price(item);
	const rect = this.itemRectWithPadding(index);
	const priceWidth = this.priceWidth();
	const priceX = rect.x + rect.width - priceWidth;
	const nameWidth = rect.width - priceWidth;
	const y = rect.y + this.itemPadding();
	this.changePaintOpacity(this.isEnabled(item));
	this.drawItemName(item, rect.x, y, nameWidth);
	this.drawText(price, priceX, y, priceWidth, "right");
	this.drawDescription(item, rect.x, y + this.lineHeight(), rect.width);
	this.changePaintOpacity(true);
};

const _Window_ShopNumber_refresh = Window_ShopNumber.prototype.refresh;
Window_ShopNumber.prototype.refresh = function() {
	_Window_ShopNumber_refresh.call(this, ...arguments);
	this.drawItemDescription();
};

Window_ShopNumber.prototype.drawItemDescription = function() {
	const padding = this.itemPadding();
	const x = padding * 2;
	const y = this.descY();
	const width = this.innerWidth - padding * 2;
	this.drawDescription(this._item, x, y, width);
};

Window_ShopNumber.prototype.itemNameY = function() {
	return Math.floor(this.innerHeight / 4 - this.lineHeight());
};

Window_ShopNumber.prototype.totalPriceY = function() {
	return Math.floor(this.itemNameY() + this.lineHeight() * 1.5);
};

Window_ShopNumber.prototype.descY = function() {
	return Math.floor(this.totalPriceY() + this.lineHeight() * 1.5);
};

Window_ShopNumber.prototype.buttonY = function() {
	return Math.floor(this.descY() + this.lineHeight() * 2.5);
};

Window_ShopSell.prototype.itemHeight = function() {
	return Math.floor(this.innerHeight / SELL_ROWS);
};

//--------------------------------------
// 「:」をスペースに変更

Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
	if (this.needsNumber()) {
		 this.drawText(" ", x, y, width - this.textWidth("00"), "right");
		 this.drawText($gameParty.numItems(item), x, y, width, "right");
	}
};

//--------------------------------------
// アイテム選択イベント

Window_EventItem.prototype.itemHeight = function() {
	return Math.floor(this.innerHeight / CHOICE_ROWS);
};

//--------------------------------------
// バトル画面

Window_BattleItem.prototype.itemHeight = function() {
	return Math.floor(this.innerHeight / BATTLE_ROWS);
};

Window_BattleSkill.prototype.itemHeight = function() {
	return Math.floor(this.innerHeight / BATTLE_ROWS);
};

//--------------------------------------
// アクターコマンド説明追加

const _Window_ActorCommand_drawItem = Window_ActorCommand.prototype.drawItem;
Window_ActorCommand.prototype.drawItem = function(index) {
	if (ACTOR_COMMAND_DESC) {
		const rect = this.itemRectWithPadding(index);
		const y = rect.y + this.itemPadding();
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		if (index === 0 && USE_VARIABLE_ATTACK_NAME) {
			const skillId = this._actor.attackSkillId();
			const skillName = $dataSkills[skillId].name;
			const convName = this.convertEscapeCharacters(this.convertEscapeCharacters(skillName));
			if (typeof KRD_MULTILINGUAL !== "undefined" && BATTLE_COMMAND_ICON_LANGUAGE.includes(KRD_MULTILINGUAL.multilingual())) {
				const iconIndex = $dataSkills[skillId].iconIndex;
				this.drawIcon(iconIndex, rect.x + 2, y + 6);
				this.drawText(convName, rect.x + ImageManager.iconWidth + 4, y, rect.width);
			} else {
				this.drawText(convName, rect.x, y, rect.width);
			}
		} else {
			this.drawText(this.commandName(index), rect.x, y, rect.width);
		}
		this.drawTextDesc(this.commandDesc(index), rect.x, y + this.lineHeight(), rect.width);
	} else {
		_Window_ActorCommand_drawItem.call(this, ...arguments);
	}
};

const _Window_ActorCommand_addCommand = Window_ActorCommand.prototype.addCommand;
Window_ActorCommand.prototype.addCommand = function(
	name, symbol, enabled = true, ext = null
) {
	_Window_ActorCommand_addCommand.call(this, ...arguments);

	if (ACTOR_COMMAND_DESC) {
		switch(symbol) {
			case "attack":
				this._list[this._list.length - 1].desc = $dataSkills[this._actor.attackSkillId()].description;
				break;
			case "skill":
				this._list[this._list.length - 1].desc = BATTLE_SKILLTYPE_DESC[ext - 1];
				break;
			case "guard":
				this._list[this._list.length - 1].desc = $dataSkills[this._actor.guardSkillId()].description;
				break;
			case "item":
				this._list[this._list.length - 1].desc = BATTLE_ITEM_DESC;
				break;
		}
	}
};

Window_ActorCommand.prototype.commandDesc = function(index) {
	const desc = this._list[index].desc || "";
	const convDesc = this.convertEscapeCharacters(this.convertEscapeCharacters(desc));
	return convDesc;
};

//--------------------------------------
})();
