/*:
 * @target MZ
 * @plugindesc 縦長画面ユーザーインターフェース（Portrait UI）
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
 * @param menuRows
 * @text メニューコマンド行数
 * @desc メニューコマンドの行数。初期値は 2 です。
 * @default 2
 * @type number
 * @min 2
 * @max 3
 * @parent menu
 * 
 * @param useDrawCharacter
 * @text 歩行画像置換
 * @desc 顔画像表示を歩行画像に変換する: true ／ しない: false
 * @default false
 * @type boolean
 * @parent menu
 * 
 * @param skill
 * @text スキル画面
 * 
 * @param skillTypeRows
 * @text スキルタイプ行数
 * @desc スキルタイプの行数。初期値は 2 です。
 * @default 2
 * @type number
 * @parent skill
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
 * @param battleHeight
 * @text バトルWindow高さ
 * @desc バトル時の Window 高さ。行数で指定する。初期値 4
 * @default 4
 * @type number
 * @parent battle
 * 
 * @param battleCommand
 * @text バトルコマンド数
 * @desc 「バトルWindow高さ」の中に何個コマンドを表示するか。初期値 4
 * @default 4
 * @type number
 * @parent battle
 * 
 * @param battleListHeight
 * @text バトルリストWindow高さ
 * @desc バトル時のアイテム・スキルリストの高さ。行数で指定する。初期値 8
 * @default 8
 * @type number
 * @parent battle
 * 
 * @param map
 * @text マップ画面
 * 
 * @param eventItemHeight
 * @text アイテム選択Window高さ
 * @desc アイテム選択の Window 高さ。行数で指定する。初期値 4
 * @default 4
 * @type number
 * @parent map
 * 
 * @help
# KRD_MZ_UI_Portrait.js

縦長画面ユーザーインターフェース（Portrait UI）
「縦816 : 横624」の画面解像度用レイアウトに変更します。

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/07/31) 再作成開始
- ver.1.0.0 (2021/08/01) 公開
- ver.1.1.0 (2021/08/07) Window 高さ変更を追加
- ver.1.2.0 (2021/08/12) プラグインパラメータ 0 でシステム値
- ver.1.3.0 (2022/03/28) UI高さ変更に対応
- ver.1.3.1 (2022/04/02) 解像度拡大時表示位置調整追加
- ver.1.4.0 (2022/04/24) TPなし時のゲージ間隔変更
- ver.1.5.0 (2022/05/02) パラメータ追加
- ver.1.6.0 (2022/06/02) 歩行画像置換を追加
- ver.1.7.0 (2022/06/26) 内部処理をクラスに変更
- ver.1.8.0 (2022/10/24) メニューコマンドを3行にできるようにした
- ver.1.8.1 (2022/10/25) SimpleStatus の表示を微修正
- ver.1.9.0 (2023/02/05) SimpleStatus の表示を微修正
- ver.1.10.0 (2023/02/17) 敵キャラの攻撃アニメの既定値を設定

 * 
 * 
 */

let Window_BattleStatusVertical = null;
let Window_BattleActorVertical = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const CHANGE_WIDTH_HEIGHT = PARAM["changeWidthHeight"] === "true";
const ITEM_HEIGHT = Number(PARAM["itemHeight"]) || 0;
const BUTTON_AREA_HEIGHT = Number(PARAM["buttonAreaHeight"]) || 0;
const MENU_COLS = Number(PARAM["menuMaxCols"]) || 0;
const MENU_ROWS = Number(PARAM["menuRows"]) ?? 2;

const SKILL_TYPE_ROWS = Number(PARAM["skillTypeRows"]) || 0;

const NAME_FONT_SIZE = Number(PARAM["nameFontSize"]) || 0;
const BATTLE_HEIGHT = Number(PARAM["battleHeight"]) || 0;
const BATTLE_COMMAND = Number(PARAM["battleCommand"]) || 0;
const BATTLE_LIST_HEIGHT = Number(PARAM["battleListHeight"]) || 0;

const EVENT_ITEM_HEIGHT = Number(PARAM["eventItemHeight"]) || 0;

const USE_DRAW_CHARACTER = PARAM["useDrawCharacter"] === "true";
const USE_CHARACTER2 = true;

const GAUGE_WIDTH = 128;
const MENU_STATUS_X = 40;
const MENU_STATUS_Y = 4;
const STATUS_PLUS_X = 100;
const NAME_INPUT_HEIGHT = 54;

const BATTLE_STATUS_PLUS_WIDTH = 40;
const BATTLE_STATUS_PLUS_X = 8;
const MAX_BATTLE_MEMBERS = 4;
const MAX_BATTLE_ENEMIES = 8;

const ACTOR_HOME_X = 560;
const ACTOR_HOME_Y = 100;
const ENEMY_HOME_BASE_Y = 110;
const ENEMY_HOME_RATE_Y = 1.4;

const BASIC_UI_HEIGHT = 816;
const BASIC_UI_WIDTH = 624;

//======================================
// 全画面
//======================================
// 全画面 : 画面解像度の縦横入れ替え

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
// 全画面 : コマンド高さを高くする

const KRD_Window_Selectable_itemHeight = Window_Selectable.prototype.itemHeight;
Window_Selectable.prototype.itemHeight = function() {
	return ITEM_HEIGHT ? ITEM_HEIGHT : KRD_Window_Selectable_itemHeight.apply(this, arguments);
};

//--------------------------------------
// 全画面 : ボタンエリアの高さ

const KRD_Scene_Base_buttonAreaHeight = Scene_Base.prototype.buttonAreaHeight;
Scene_Base.prototype.buttonAreaHeight = function() {
	return BUTTON_AREA_HEIGHT ? BUTTON_AREA_HEIGHT : KRD_Scene_Base_buttonAreaHeight.apply(this, arguments);
};

//--------------------------------------
// 全画面 : 所持金 Window 表示位置調整

Window_Gold.prototype.itemHeight = function() {
	return this.innerHeight;
};

//======================================
// メニュー全体
//======================================
// 顔画像を歩行画像に変換

const KRD_Window_StatusBase_drawActorFace = Window_StatusBase.prototype.drawActorFace;
Window_StatusBase.prototype.drawActorFace = function(
	actor, x, y, width, height
) {
	if (USE_DRAW_CHARACTER) {
		this.drawActorCharacterInFace(actor, x, y);
	} else {
		KRD_Window_StatusBase_drawActorFace.apply(this, arguments);
	}
};

Window_StatusBase.prototype.drawActorCharacterInFace = function(actor, x, y) {
	const cw = 48;
	const ch = 48;
	const fw = Math.floor(ImageManager.faceWidth / 2);
	const fh = Math.floor(ImageManager.faceHeight / 2);
	const w = USE_CHARACTER2 ? fw : fw + (cw / 2);
	const h = USE_CHARACTER2 ? fh : fh + (ch / 2);
	this.drawActorCharacter2(actor, x + w, y + h);
};

const KRD_Window_MenuStatus_drawActorCharacterInFace = Window_MenuStatus.prototype.drawActorCharacterInFace;
Window_MenuStatus.prototype.drawActorCharacterInFace = function(actor, x, y) {
	KRD_Window_MenuStatus_drawActorCharacterInFace.call(this, actor, x, y - 10);
};

const KRD_Window_SkillStatus_drawActorCharacterInFace = Window_SkillStatus.prototype.drawActorCharacterInFace;
Window_SkillStatus.prototype.drawActorCharacterInFace = function(actor, x, y) {
	KRD_Window_SkillStatus_drawActorCharacterInFace.call(this, actor, x + 20, y + 20);
};

Window_StatusBase.prototype.drawActorCharacter2 = function(actor, x, y) {
	this.drawCharacter2(actor.characterName(), actor.characterIndex(), x, y);
};

Window_Base.prototype.drawCharacter2 = function(
	characterName, characterIndex, x, y
) {
	const bitmap = ImageManager.loadCharacter(characterName);
	const big = ImageManager.isBigCharacter(characterName);
	const pw = bitmap.width / (big ? 3 : 12);
	const ph = bitmap.height / (big ? 4 : 8);
	const n = big ? 0: characterIndex;
	const sx = ((n % 4) * 3 + 1) * pw;
	const sy = Math.floor(n / 4) * 4 * ph;
	this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph, pw * 2, ph * 2);
};

//======================================
// メニュー画面
//======================================
// メニュー画面 : レイアウト変更

Window_MenuCommand.prototype.maxCols = function() {
	return MENU_COLS;
};

Scene_Menu.prototype.mainCommandWidth = function() {
	return Graphics.boxWidth;
};

Scene_Menu.prototype.commandWindowRect = function() {
	const ww = Graphics.boxWidth;
	const wh = this.calcWindowHeight(MENU_ROWS, true);
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

//--------------------------------------
// メニュー画面 : ステータス表示

const KRD_Window_MenuStatus_drawActorFace = Window_MenuStatus.prototype.drawActorFace;
Window_MenuStatus.prototype.drawActorFace = function(
	actor, x, y, width, height
) {
	const left = Graphics.boxWidth > BASIC_UI_WIDTH ? Math.floor((this.width - x - MENU_STATUS_X - ImageManager.faceWidth) / 4) : 0;
	const newX = x + MENU_STATUS_X + left;
	const newY = USE_DRAW_CHARACTER && MENU_ROWS >= 3 ? y - 8 : y;
	KRD_Window_MenuStatus_drawActorFace.call(this, actor, newX, newY, width, height);
};

const KRD_Window_MenuStatus_drawActorSimpleStatus = Window_MenuStatus.prototype.drawActorSimpleStatus;
Window_MenuStatus.prototype.drawActorSimpleStatus = function(actor, x, y) {
	const left = Graphics.boxWidth > BASIC_UI_WIDTH ? Math.floor((this.width - x - MENU_STATUS_X) / 4) : 0;
	const newX = x + MENU_STATUS_X + left;
	const newY = y + MENU_STATUS_Y;
	if (MENU_ROWS >= 3 && $gameParty.maxBattleMembers() >= 4) {
		const lineHeight = this.lineHeight();
		const plusHeight = Math.floor(this.itemRect(0).height / 5);
		const newY2 = newY + plusHeight;
		const x2 = newX + 180;
		this.drawActorName(actor, newX, newY2);
		this.drawActorIcons(actor, newX, newY2 + lineHeight * 1);
		this.placeBasicGauges(actor, x2, newY2);
	} else {
		KRD_Window_MenuStatus_drawActorSimpleStatus.call(this, actor, newX, newY);
	}
};

const KRD_Window_MenuStatus_numVisibleRows = Window_MenuStatus.prototype.numVisibleRows;
Window_MenuStatus.prototype.numVisibleRows = function() {
	return $gameParty.maxBattleMembers() || KRD_Window_MenuStatus_numVisibleRows.apply(this, arguments);
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
	const wh = this.calcWindowHeight(SKILL_TYPE_ROWS, true);
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
	this.drawBasicInfo(x2, y - 8);
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

//--------------------------------------
// レイアウト変更：ゲージ

const KRD_Window_StatusBase_gaugeLineHeight = Window_StatusBase.prototype.gaugeLineHeight;
Window_StatusBase.prototype.gaugeLineHeight = function() {
	if ($dataSystem.optDisplayTp) {
		return KRD_Window_StatusBase_gaugeLineHeight.apply(this, arguments);
	} else if ($gameParty.inBattle()) {
		return KRD_Window_StatusBase_gaugeLineHeight.apply(this, arguments) + 4;
	} else {
		return KRD_Window_StatusBase_gaugeLineHeight.apply(this, arguments) + 8;
	}
};

//======================================
// ショップ画面
//======================================

Scene_Shop.prototype.statusWidth = function() {
	return this._goldWindow.width;
};

Window_ShopCommand.prototype.maxCols = function() {
	return 2;
};

Window_ShopCommand.prototype.makeCommandList = function() {
	this.addCommand(TextManager.buy, "buy");
	this.addCommand(TextManager.sell, "sell", !this._purchaseOnly);
};

//======================================
// アイテム選択イベント
//======================================

const KRD_Scene_Message_eventItemWindowRect = Scene_Message.prototype.eventItemWindowRect;
Scene_Message.prototype.eventItemWindowRect = function() {
	if (EVENT_ITEM_HEIGHT) {
		const wx = 0;
		const wy = 0;
		const ww = Graphics.boxWidth;
		const wh = this.calcWindowHeight(EVENT_ITEM_HEIGHT, true);
		return new Rectangle(wx, wy, ww, wh);
	} else {
		return KRD_Scene_Message_eventItemWindowRect.apply(this, arguments);
	}
};

//======================================
// 名前変更イベント
//======================================

Window_NameInput.prototype.itemHeight = function() {
	return NAME_INPUT_HEIGHT;
};

Scene_Name.prototype.editWindowRect = function() {
	const itemHeight = ITEM_HEIGHT ? ITEM_HEIGHT : 36;
	const rate = NAME_INPUT_HEIGHT / itemHeight;
	const inputWindowHeight = Math.floor(this.calcWindowHeight(9 * rate, true));
	const padding = $gameSystem.windowPadding();
	const ww = 600;
	const wh = ImageManager.faceHeight + padding * 2;
	const wx = (Graphics.boxWidth - ww) / 2;
	const wy = (Graphics.boxHeight - (wh + inputWindowHeight + 8)) / 2;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Name.prototype.inputWindowRect = function() {
	const itemHeight = ITEM_HEIGHT ? ITEM_HEIGHT : 36;
	const rate = NAME_INPUT_HEIGHT / itemHeight;
	const wx = this._editWindow.x;
	const wy = this._editWindow.y + this._editWindow.height + 8;
	const ww = this._editWindow.width;
	const wh = Math.floor(this.calcWindowHeight(9 * rate, true));
	return new Rectangle(wx, wy, ww, wh);
};

//======================================
// バトル画面
//======================================
// バトル画面 : バトルステータス縦表示

Scene_Battle.prototype.updateStatusWindowPosition = function() {
	// 使わない関数
};

Scene_Battle.prototype.statusWindowRect = function() {
	const buttonAreaHeight = this.buttonAreaHeight();
	const helpAreaHeight = Window_Base.prototype.fittingHeight(2);
	const y = buttonAreaHeight + helpAreaHeight;

	const ww = GAUGE_WIDTH + BATTLE_STATUS_PLUS_WIDTH;
	const wh = Graphics.boxHeight - y;
	const wx = Graphics.boxWidth - ww + BATTLE_STATUS_PLUS_X;
	const wy = y;
	return new Rectangle(wx, wy, ww, wh);
};

//--------------------------------------
// 新クラス

Window_BattleStatusVertical = class extends Window_BattleStatus {
	maxCols() {
		return 1;
	};

	itemHeight() {
		return Math.floor(this.innerHeight / MAX_BATTLE_MEMBERS);
	}
	
	drawItem(index) {
		if (!$gameSystem.isSideView()) {
			this.drawItemImage(index); // 顔画像表示
		}
		this.drawItemStatus(index);
	}
	
	updateBackOpacity() {
		this.backOpacity = 0; // 透明化
	}
	
	showBackgroundDimmer() {
		// 使用しない関数
	}
	
	drawItemBackground(index) {
		// 使用しない関数
	}

	stateIconY(rect) {
		const ret = super.stateIconY(...arguments);
		const diffY = $gameTemp.diffUiHeight();
		if (!$dataSystem.optDisplayTp && diffY > 0) {
			const plusY = Math.floor(diffY / 4);
			return ret + plusY;
		} else {
			return ret;
		}
	}
};

//--------------------------------------
// 新クラス
// Window_BattleStatusVertical と同じメソッド

Window_BattleActorVertical = class extends Window_BattleActor {
	maxCols() {
		return 1;
	};

	itemHeight() {
		return Math.floor(this.innerHeight / MAX_BATTLE_MEMBERS);
	}
	
	drawItem(index) {
		if (!$gameSystem.isSideView()) {
			this.drawItemImage(index); // 顔画像表示
		}
		this.drawItemStatus(index);
	}
	
	updateBackOpacity() {
		this.backOpacity = 0; // 透明化
	}
	
	showBackgroundDimmer() {
		// 使用しない関数
	}
	
	drawItemBackground(index) {
		// 使用しない関数
	}

	stateIconY(rect) {
		const ret = super.stateIconY(...arguments);
		const diffY = $gameTemp.diffUiHeight();
		if (!$dataSystem.optDisplayTp && diffY > 0) {
			const plusY = Math.floor(diffY / 4);
			return ret + plusY;
		} else {
			return ret;
		}
	}
}

//--------------------------------------
Scene_Battle.prototype.createStatusWindow = function() {
	const rect = this.statusWindowRect();
	const statusWindow = new Window_BattleStatusVertical(rect);
	this.addWindow(statusWindow);
	this._statusWindow = statusWindow;
};

Scene_Battle.prototype.createActorWindow = function() {
	const rect = this.actorWindowRect();
	this._actorWindow = new Window_BattleActorVertical(rect);
	this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
	this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
	this.addWindow(this._actorWindow);
};

//--------------------------------------
// バトル画面 : バトルステータスのアクター名のフォントサイズ

Sprite_Name.prototype.fontSize = function() {
	return NAME_FONT_SIZE ? NAME_FONT_SIZE : $gameSystem.mainFontSize();
};

//--------------------------------------
// バトル画面 : Window 高さ

Scene_Battle.prototype.windowAreaHeight = function() {
	return this.calcWindowHeight(BATTLE_HEIGHT, true);
};

const KRD_Window_PartyCommand_itemHeight = Window_PartyCommand.prototype.itemHeight;
Window_PartyCommand.prototype.itemHeight = function() {
	if (BATTLE_COMMAND) {
		return Math.floor(this.innerHeight / BATTLE_COMMAND);
	} else {
		return KRD_Window_PartyCommand_itemHeight.apply(this, arguments);
	}
};

const KRD_Window_ActorCommand_itemHeight = Window_ActorCommand.prototype.itemHeight;
Window_ActorCommand.prototype.itemHeight = function() {
	if (BATTLE_COMMAND) {
		return Math.floor(this.innerHeight / BATTLE_COMMAND);
	} else {
		return KRD_Window_ActorCommand_itemHeight.apply(this, arguments);
	}
};

Scene_Battle.prototype.windowListHeight = function() {
	return this.calcWindowHeight(BATTLE_LIST_HEIGHT, true);
};

Scene_Battle.prototype.skillWindowRect = function() {
	const ww = Graphics.boxWidth;
	const wh = this.windowListHeight();
	const wx = 0;
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
};

//--------------------------------------
// バトル画面 : パーティ・アクターコマンド Window

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
// バトル画面 : 敵キャラ選択 Window

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
// バトル画面 : コマンド入力とWindow制御

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
// バトル画面 : キャラクター表示位置

Sprite_Actor.prototype.setActorHome = function(index) {
	const statusWindow = SceneManager._scene._statusWindow;
	const y = statusWindow.y + ACTOR_HOME_Y;
	const indexY = index * statusWindow.itemHeight() + this.actorHomePlus();
	this.setHome(ACTOR_HOME_X, y + indexY);
};

Game_Temp.prototype.diffUiHeight = function() {
	const diffY = Graphics.boxHeight - BASIC_UI_HEIGHT + 8;
	return diffY;
};

Sprite_Actor.prototype.actorHomePlus = function() {
	if (!$dataSystem.optDisplayTp) {
		const diffY = $gameTemp.diffUiHeight();
		const plusY = Math.floor(diffY / 4);
		return plusY;
	} else {
		return 0;
	}
};

Sprite_Enemy.prototype.setHome = function(x, y) {
	this._homeX = x;
	this._homeY = Math.floor((y * ENEMY_HOME_RATE_Y) + ENEMY_HOME_BASE_Y);
	this.updatePosition();
};

//--------------------------------------
// バトル画面 : 敵キャラの攻撃アニメの既定値を設定

const KRD_Window_BattleLog_showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
	if (subject && targets) {
		this.showNormalAnimation(targets, subject.attackAnimationId1(), false);
	}
	KRD_Window_BattleLog_showEnemyAttackAnimation.apply(this, arguments);
};

Game_Enemy.prototype.attackAnimationId1 = function() {
	return this.bareHandsAnimationId();
};

Game_Enemy.prototype.bareHandsAnimationId = function() {
	return 1;
};

//======================================
})();
