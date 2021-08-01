/*:
 * @target MZ
 * @plugindesc 縦長画面ユーザーインターフェース
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param base
 * @text 基礎
 * 
 * @param changeWidthHeight
 * @text 縦横入替
 * @desc 画面の高さと画面の幅を入れ替えます。「高度な設定」を使用しない場合に使います。
 * @default false
 * @type boolean
 * @parent base
 * 
 * @param itemHeight
 * @text コマンドの高さ
 * @desc すべてのコマンドの高さ。ツクール規定値は36ですが、72推奨。
 * @default 72
 * @type number
 * @parent base
 * 
 * @param buttonAreaHeight
 * @text タッチUIエリアの高さ
 * @desc タッチUIボタンエリアの高さ。ツクール規定値は52ですが、64推奨。
 * @default 64
 * @type number
 * @parent base
 * 
 * @param menu
 * @text メニュー画面
 * 
 * @param menuMaxCols
 * @text メニューコマンド列数
 * @desc メニューコマンドの列数。推奨値は 4 です。
 * @default 4
 * @type number
 * @parent menu
 * 
 * @param battle
 * @text バトル画面
 * 
 * @param nameFontSize
 * @text アクター名フォントサイズ
 * @desc バトルステータスのアクター名のフォントサイズ。 0 だとシステムサイズを使います。
 * @default 0
 * @type number
 * @parent battle
 * 
 * @help
# KRD_MZ_UI_Portrait.js

縦長画面ユーザーインターフェース
「縦816：横624」の画面解像度用レイアウトに変更します。

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/07/31) 再作成開始
- ver.1.0.0 (2021/08/01) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const CHANGE_WIDTH_HEIGHT = PARAM["changeWidthHeight"] === "true";
const ITEM_HEIGHT = Number(PARAM["itemHeight"]) || 72;
const BUTTON_AREA_HEIGHT = Number(PARAM["buttonAreaHeight"]) || 64;
const MENU_COLS = Number(PARAM["menuMaxCols"]) || 4;

const NAME_FONT_SIZE = Number(PARAM["nameFontSize"]) || 0;

const GAUGE_WIDTH = 128;
const MENU_STATUS_X = 40;
const STATUS_PLUS_X = 100;
const NAME_INPUT_HEIGHT = 54;

const BATTLE_STATUS_Y = 150;
const BATTLE_STATUS_PLUS_WIDTH = 40;
const BATTLE_STATUS_PLUS_X = 8;
const MAX_BATTLE_MEMBERS = 4;
const MAX_BATTLE_ENEMIES = 8;

const ACTOR_HOME_X = 560;
const ACTOR_HOME_BASE_Y = 260;
const ACTOR_HOME_BASE_Y_TP = 240;
const ACTOR_HOME_INDEX_Y = 160;
const ENEMY_HOME_BASE_Y = 110;
const ENEMY_HOME_RATE_Y = 1.4;

//======================================
// 全画面
//======================================
// 全画面：画面解像度の縦横入れ替え

const KRD_Scene_Boot_resizeScreen = Scene_Boot.prototype.resizeScreen;
Scene_Boot.prototype.resizeScreen = function() {
	if (CHANGE_WIDTH_HEIGHT) {
		const screenWidth = $dataSystem.advanced.screenWidth;
		const screenHeight = $dataSystem.advanced.screenHeight;
		Graphics.resize(screenHeight, screenWidth); // 縦横逆にしてる
		this.adjustBoxSize();
		this.adjustWindow();
	} else {
		KRD_Scene_Boot_resizeScreen.apply(this, arguments);
	}
};

const KRD_Scene_Boot_adjustBoxSize = Scene_Boot.prototype.adjustBoxSize;
Scene_Boot.prototype.adjustBoxSize = function() {
	if (CHANGE_WIDTH_HEIGHT) {
		const uiAreaWidth = $dataSystem.advanced.uiAreaWidth;
		const uiAreaHeight = $dataSystem.advanced.uiAreaHeight;
		const boxMargin = 4;
		Graphics.boxWidth = uiAreaHeight - boxMargin * 2; // 縦横逆にしてる
		Graphics.boxHeight = uiAreaWidth - boxMargin * 2; // 縦横逆にしてる
	} else {
		KRD_Scene_Boot_adjustBoxSize.apply(this, arguments);
	}
};

//--------------------------------------
// 全画面：コマンド高さを高くする

Window_Selectable.prototype.itemHeight = function() {
	return ITEM_HEIGHT;
};

//--------------------------------------
// 全画面：ボタンエリアの高さ

Scene_Base.prototype.buttonAreaHeight = function() {
	return BUTTON_AREA_HEIGHT;
};

//--------------------------------------
// 全画面：所持金 Window 表示位置調整

Window_Gold.prototype.itemHeight = function() {
	return this.innerHeight;
};

//======================================
// メニュー画面
//======================================

Window_MenuCommand.prototype.maxCols = function() {
	return MENU_COLS;
};

Scene_Menu.prototype.mainCommandWidth = function() {
	return Graphics.boxWidth;
};

Scene_Menu.prototype.commandWindowRect = function() {
	const ww = Graphics.boxWidth;
	const wh = this.calcWindowHeight(2, true);
	const wx = 0;
	const wy = this.mainAreaTop();
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.statusWindowRect = function() {
	const ww = Graphics.boxWidth;
	const wh = this.mainAreaHeight() - this.commandWindowRect().height;
	const wx = 0;
	const wy = this.mainAreaTop() + this.commandWindowRect().height;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.goldWindowRect = function() {
	const ww = Math.floor(Graphics.boxWidth / 2);
	const wh = this.buttonAreaHeight();
	const wx = ConfigManager.menuButtonLeft ? Graphics.boxWidth - ww : 0;
	const wy = 0;
	return new Rectangle(wx, wy, ww, wh);
};

const KRD_Window_MenuStatus_drawActorFace = Window_MenuStatus.prototype.drawActorFace;
Window_MenuStatus.prototype.drawActorFace = function(
	actor, x, y, width, height
) {
	KRD_Window_MenuStatus_drawActorFace.call(this, actor, x + MENU_STATUS_X, y, width, height);
};

const KRD_Window_MenuStatus_drawActorSimpleStatus = Window_MenuStatus.prototype.drawActorSimpleStatus;
Window_MenuStatus.prototype.drawActorSimpleStatus = function(actor, x, y) {
	KRD_Window_MenuStatus_drawActorSimpleStatus.call(this, actor, x + MENU_STATUS_X, y);
};

//======================================
// アイテム・スキル画面
//======================================
// アイテム画面

Scene_ItemBase.prototype.actorWindowRect = function() {
	const wx = 0;
	const wy = Math.min(this.mainAreaTop(), this.helpAreaTop());
	const ww = Graphics.boxWidth;
	const wh = this.mainAreaHeight();
	return new Rectangle(wx, wy, ww, wh);
};

//--------------------------------------
// スキル画面

Scene_Skill.prototype.skillTypeWindowRect = function() {
	const ww = this.mainCommandWidth();
	const wh = this.calcWindowHeight(2, true);
	const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
	const wy = this.mainAreaTop();
	return new Rectangle(wx, wy, ww, wh);
};

Window_SkillStatus.prototype.drawActorSimpleStatus = function(actor, x, y) {
	const lineHeight = this.lineHeight();
	this.drawActorName(actor, x, y);
	this.placeBasicGauges(actor, x, y + lineHeight);
};

//======================================
// 装備画面
//======================================

Window_EquipSlot.prototype.drawItem = function(index) {
	if (this._actor) {
		const slotName = this.actorSlotName(this._actor, index);
		const item = this.itemAt(index);
		const rect = this.itemLineRect(index);
		this.changeTextColor(ColorManager.systemColor());
		this.changePaintOpacity(this.isEnabled(index));
		if (item) {
			this.drawItemName(item, rect.x, rect.y, rect.width);
		} else {
			this.drawText(slotName, rect.x, rect.y, rect.width);
		}
		this.changePaintOpacity(true);
	}
};

//======================================
// ステータス画面
//======================================
// メインステータス Window

Window_Status.prototype.drawBlock1 = function() {
	const x1 = 6;
	const x2 = Math.floor(this.innerWidth / 2);
	const x3 = x1;
	const y = this.block1Y();
	const width = Math.floor(this.innerWidth / 2);
	this.drawActorName(this._actor, x1, y, width);
	this.drawActorClass(this._actor, x2, y, width);
	this.drawActorNickname(this._actor, x3, y + this.lineHeight(), this.innerWidth);
};

Window_Status.prototype.drawBlock2 = function() {
	const x1 = 12 + STATUS_PLUS_X;
	const x2 = 204 + STATUS_PLUS_X;
	const x3 = x1;
	const y = this.block2Y();
	this.drawActorFace(this._actor, x1, y);
	this.drawBasicInfo(x2, y);
	this.drawExpInfo(x3, y + Math.floor(this.lineHeight() * 4.5));
};

Window_Status.prototype.block2Y = function() {
	return this.lineHeight() * 2;
};

//--------------------------------------
// ステータス装備 Window

Window_StatusEquip.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	const equips = this._actor.equips();
	const item = equips[index];
	this.drawItemName(item, rect.x, rect.y, rect.width);
};

//======================================
// ショップ画面
//======================================

Scene_Shop.prototype.statusWidth = function() {
	return this._goldWindow.width;
};

//======================================
// 名前変更イベント
//======================================

Window_NameInput.prototype.itemHeight = function() {
	return NAME_INPUT_HEIGHT;
};

Scene_Name.prototype.editWindowRect = function() {
	const rate = NAME_INPUT_HEIGHT / ITEM_HEIGHT;
	const inputWindowHeight = Math.floor(this.calcWindowHeight(9 * rate, true));
	const padding = $gameSystem.windowPadding();
	const ww = 600;
	const wh = ImageManager.faceHeight + padding * 2;
	const wx = (Graphics.boxWidth - ww) / 2;
	const wy = (Graphics.boxHeight - (wh + inputWindowHeight + 8)) / 2;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Name.prototype.inputWindowRect = function() {
	const rate = NAME_INPUT_HEIGHT / ITEM_HEIGHT;
	const wx = this._editWindow.x;
	const wy = this._editWindow.y + this._editWindow.height + 8;
	const ww = this._editWindow.width;
	const wh = Math.floor(this.calcWindowHeight(9 * rate, true));
	return new Rectangle(wx, wy, ww, wh);
};

//======================================
// バトル画面
//======================================
// バトル画面：バトルステータス縦表示

Scene_Battle.prototype.updateStatusWindowPosition = function() {
	// 使わない関数
};

Scene_Battle.prototype.statusWindowRect = function() {
	const y = BATTLE_STATUS_Y;
	const ww = GAUGE_WIDTH + BATTLE_STATUS_PLUS_WIDTH;
	const wh = Graphics.boxHeight - y;
	const wx = Graphics.boxWidth - ww + BATTLE_STATUS_PLUS_X;
	const wy = y;
	return new Rectangle(wx, wy, ww, wh);
};

Window_BattleStatus.prototype.maxCols = function() {
	return 1;
};

Window_BattleStatus.prototype.itemHeight = function() {
	return Math.floor(this.innerHeight / MAX_BATTLE_MEMBERS);
};

Window_BattleStatus.prototype.drawItem = function(index) {
	if (!$gameSystem.isSideView()) {
		this.drawItemImage(index); // 顔画像表示
	}
	this.drawItemStatus(index);
};

Window_BattleStatus.prototype.updateBackOpacity = function() {
	this.backOpacity = 0; // 透明化
};

Window_BattleStatus.prototype.showBackgroundDimmer = function() {
	// 使用しない関数
};

Window_BattleStatus.prototype.drawItemBackground = function(index) {
	// 使用しない関数
};

//--------------------------------------
// バトル画面：バトルステータスのアクター名のフォントサイズ

Sprite_Name.prototype.fontSize = function() {
	return NAME_FONT_SIZE ? NAME_FONT_SIZE : $gameSystem.mainFontSize();
};

//--------------------------------------
// バトル画面：パーティ・アクターコマンド Window

Scene_Battle.prototype.partyCommandWindowRect = function() {
	const ww = Graphics.boxWidth / 2;
	const wh = this.windowAreaHeight();
	const wx = (Graphics.boxWidth - ww) / 2;
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createActorCommandWindow = function() {
	const rect = this.actorCommandWindowRect();
	const commandWindow = new Window_ActorCommand(rect);
	// commandWindow.y = Graphics.boxHeight - commandWindow.height; 使わない処理
	commandWindow.setHandler("attack", this.commandAttack.bind(this));
	commandWindow.setHandler("skill", this.commandSkill.bind(this));
	commandWindow.setHandler("guard", this.commandGuard.bind(this));
	commandWindow.setHandler("item", this.commandItem.bind(this));
	commandWindow.setHandler("cancel", this.commandCancel.bind(this));
	this.addWindow(commandWindow);
	this._actorCommandWindow = commandWindow;
};

Scene_Battle.prototype.actorCommandWindowRect = function() {
	return this.partyCommandWindowRect();
};

//--------------------------------------
// バトル画面：敵キャラ選択 Window

Window_BattleEnemy.prototype.maxCols = function() {
	return 1;
};

Window_BattleEnemy.prototype.itemHeight = function() {
	return Math.floor(this.innerHeight / MAX_BATTLE_ENEMIES);
};

Scene_Battle.prototype.enemyWindowRect = function() {
	const y = this.buttonAreaHeight() + this.helpAreaHeight();
	const ww = Math.floor(Graphics.boxWidth / 3);
	const wh = Graphics.boxHeight - y;
	const wx = Graphics.boxWidth - ww;
	const wy = y;
	return new Rectangle(wx, wy, ww, wh);
};

//--------------------------------------
// バトル画面：コマンド入力とWindow制御

const KRD_Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
Scene_Battle.prototype.startActorSelection = function() {
	KRD_Scene_Battle_startActorSelection.apply(this, arguments);
	this._skillWindow.hide();
	this._itemWindow.hide();
};

const KRD_Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
Scene_Battle.prototype.startEnemySelection = function() {
	KRD_Scene_Battle_startEnemySelection.apply(this, arguments);
	this._actorCommandWindow.hide();
	this._skillWindow.hide();
	this._itemWindow.hide();
};

const KRD_Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
	KRD_Scene_Battle_onEnemyCancel.apply(this, arguments);
	switch (this._actorCommandWindow.currentSymbol()) {
		case "attack":
			this._actorCommandWindow.show();
			this._statusWindow.show();
			break;
	}
};

//--------------------------------------
// バトル画面：キャラクター表示位置

Sprite_Actor.prototype.setActorHome = function(index) {
	if ($dataSystem.optDisplayTp) {
		this.setHome(ACTOR_HOME_X, ACTOR_HOME_BASE_Y_TP + index * ACTOR_HOME_INDEX_Y);
	} else {
		this.setHome(ACTOR_HOME_X, ACTOR_HOME_BASE_Y + index * ACTOR_HOME_INDEX_Y);
	}
};

Sprite_Enemy.prototype.setHome = function(x, y) {
	this._homeX = x;
	this._homeY = Math.floor(y * ENEMY_HOME_RATE_Y + ENEMY_HOME_BASE_Y);
	this.updatePosition();
};

//======================================
})();
