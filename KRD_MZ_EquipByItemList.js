/*:
 * @target MZ
 * @plugindesc アイテム欄から装備
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param CANNOT_WEAPON_TYPE
 * @text 装備不可武器タイプ
 * @desc アイテム欄から装備できない武器（武器タイプ）をカンマ区切りで記述します。
 * 
 * @param CANNOT_EQUIP_TYPE
 * @text 装備不可装備タイプ
 * @desc アイテム欄から装備できない防具（装備タイプ）をカンマ区切りで記述します。
 * 
 * @param BASE_X
 * @text 基本X
 * @desc アクター情報のX座標に加算する値です。初期値 20
 * @default 20
 * @type number
 * 
 * @param BASE_Y
 * @text 基本Y
 * @desc アクター情報のY座標に加算する値です。初期値 20
 * @default 20
 * @type number
 * 
 * @param ACTOR_NAME_X
 * @text アクター名X
 * @desc アクター名のX座標を決めるための値です。初期値 -160
 * @default -160
 * @type number
 * @min -10000
 * 
 * @param CURRENT_PARAM_X
 * @text 現在能力値X
 * @desc 現在の能力値のX座標を決めるための値です。初期値 140
 * @default 140
 * @type number
 * 
 * @param ARROW_X
 * @text 矢印X
 * @desc 矢印のX座標を決めるための値です。初期値 200
 * @default 200
 * @type number
 * 
 * @param NEW_PARAM_X
 * @text 装備後能力値X
 * @desc 装備後の能力値のX座標を決めるための値です。初期値 240
 * @default 240
 * @type number
 * 
 * @param PARAM_NAME_WIDTH
 * @text 能力値名表示幅
 * @desc 能力値名の表示幅の値です。基本的には「現在能力値X」と同じ値です。初期値 140
 * @default 140
 * @type number
 * 
 * @param PARAM_WIDTH
 * @text 能力値表示幅
 * @desc 能力値の表示幅の値です。初期値 48
 * @default 48
 * @type number
 * 
 * @help
# KRD_MZ_EquipByItemList.js

アイテム欄から装備

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 制約事項

- 二刀流の盾側スロットには未対応。
- 能力値は最大の値のみ表示。

## 更新履歴

- ver.0.0.1 (2024/08/26) 作成開始
- ver.0.1.0 (2024/08/26) 非公開版完成。能力値表示や同タイプは未対応
- ver.0.2.0 (2024/08/27) 現在の装備品を表示
- ver.0.3.0 (2024/08/27) 能力値変化を表示
- ver.0.4.0 (2024/08/28) アイコン表示位置を修正
- ver.0.5.0 (2024/08/29) 能力値変化の表示能力値を最大の値に変更
- ver.1.0.0 (2024/08/29) 公開
- ver.1.1.0 (2024/08/29) 装備不可の能力値は非表示
- ver.1.2.0 (2024/08/30) マジックナンバーをパラメータ化
- ver.1.2.1 (2024/08/31) スキル使用時のエラーを修正
- ver.1.3.0 (2024/09/01) 装備不可タイプを追加

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const CANNOT_WEAPON_TYPE = PARAM["CANNOT_WEAPON_TYPE"].replace(" ", "").split(",");
const CANNOT_EQUIP_TYPE = PARAM["CANNOT_EQUIP_TYPE"].replace(" ", "").split(",");

const BASE_X = Number(PARAM["BASE_X"]) || 0;
const BASE_Y = Number(PARAM["BASE_Y"]) || 0;

const ACTOR_NAME_X = Number(PARAM["ACTOR_NAME_X"]) || 0;
const CURRENT_PARAM_X = Number(PARAM["CURRENT_PARAM_X"]) || 0;
const ARROW_X = Number(PARAM["ARROW_X"]) || 0;
const NEW_PARAM_X = Number(PARAM["NEW_PARAM_X"]) || 0;

const PARAM_NAME_WIDTH = Number(PARAM["PARAM_NAME_WIDTH"]) || 0;
const PARAM_WIDTH = Number(PARAM["PARAM_WIDTH"]) || 0;

const ICON_PADDING = 4;

//--------------------------------------

class Window_MenuActorEquip extends Window_MenuActor {
	initialize(rect) {
		super.initialize(...arguments);
		this._actor = null;
		this._tempActor = null;
		this._item = null;
		this._slotId = 0;
	}

	show() {
		super.show();

		const item = SceneManager._scene.item();
		this.setItem(item);
		this.refresh();
	}

	setItem(item) {
		this._item = item;
	}

	item() {
		return this._item;
	}

	drawActorFace(actor, x, y, width, height) {
		this.changePaintOpacity(actor.canEquip(this.item()));
		super.drawActorFace(...arguments);
		this.changePaintOpacity(true);
	}

	drawActorSimpleStatus(actor, x, y) {
		this.changePaintOpacity(actor.canEquip(this.item()));
		this.drawActorEquipSimpleStatus(...arguments);
		this.changePaintOpacity(true);
	}

	drawActorEquipSimpleStatus(actor, x, y) {
		x += BASE_X;
		y += BASE_Y;
		const lineHeight = this.lineHeight();
		this.drawActorName(actor, x + ACTOR_NAME_X, y);
		this.resetTextColor();
		this.drawActorEquip(actor, x, y);
		this.drawEquipParam(actor, x, y + lineHeight);
		this.setTempActor(null);
	}

	drawActorEquip(actor, x, y) {
		if (this.item()) {
			const etypeId = this.item().etypeId;
			const equip = actor.equips()[etypeId - 1];
			const name = equip ? equip.name : "-";
			const iconIndex = equip ? equip.iconIndex : 0;
			const iconY = Math.floor((this.lineHeight() - ImageManager.iconWidth) / 2);
			this.drawIcon(iconIndex, x, y + iconY);
			this.drawText(name, x + ImageManager.iconWidth + ICON_PADDING, y);
		}
	}

	setActor(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
		}
	}

	setTempActor(tempActor) {
		if (this._tempActor !== tempActor) {
			this._tempActor = tempActor;
		}
	}

	updateTempActor() {
		if (this._actor && this._slotId >= 0) {
			const actor = JsonEx.makeDeepCopy(this._actor);
			const item = this.item();
			actor.forceChangeEquip(item.etypeId - 1, item);
			this.setTempActor(actor);
		}
	}

	drawEquipParam(actor, x, y) {
		const paramId = this.paramId();
		this.setActor(actor);
		this.updateTempActor();
		this.drawParamName(x, y, paramId);
		if (this._actor) {
			this.drawCurrentParam(x + CURRENT_PARAM_X, y , paramId);
		}
		this.rawRightArrow(x + ARROW_X, y);
		if (this._tempActor) {
			this.drawNewParam(x + NEW_PARAM_X, y, paramId);
		}
	}

	drawParamName(x, y, paramId) {
		const width = PARAM_NAME_WIDTH;
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(TextManager.param(paramId), x, y, width);
	}

	drawCurrentParam(x, y, paramId) {
		const paramWidth = this.paramWidth();
		this.resetTextColor();
		this.drawText(this._actor.param(paramId), x, y, paramWidth, "right");
	}

	rawRightArrow(x, y) {
		const rightArrowWidth = this.rightArrowWidth();
		this.changeTextColor(ColorManager.systemColor());
		this.drawText("\u2192", x, y, rightArrowWidth, "center");
	}
	
	drawNewParam(x, y, paramId) {
		const actor = this._tempActor;
		if (actor && actor.canEquip(this.item())) {
			const paramWidth = this.paramWidth();
			const newValue = this._tempActor.param(paramId);
			const diffvalue = newValue - this._actor.param(paramId);
			this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
			this.drawText(newValue, x, y, paramWidth, "right");
		} else {
			const paramWidth = this.paramWidth();
			this.resetTextColor();
			this.drawText("-", x, y, paramWidth, "center");
		}
	}

	paramId() {
		return this.maxParamId();
	}

	maxParamId() {
		if (this._item) {
			const params = this._item.params;
			const len = params.length;
			let maxParamId = DataManager.isWeapon(this._item) ? 2 : 3;
			let maxParam = 0;
			for (let i = 0; i < len; i++) {
				if (params[i] > maxParam) {
					maxParam = params[i];
					maxParamId = i;
				}
			}
			return maxParamId;
		}
		return 0;
	}

	rightArrowWidth() {
		return 32;
	}

	paramWidth() {
		return PARAM_WIDTH;
	}
}

Scene_Item.prototype.createActorEquipWindow = function() {
	const rect = this.actorWindowRect();
	this._actorEquipWindow = new Window_MenuActorEquip(rect);
	this._actorEquipWindow.setHandler("ok", this.onActorOk.bind(this));
	this._actorEquipWindow.setHandler("cancel", this.onActorCancel.bind(this));
	this.addWindow(this._actorEquipWindow);
};

const _Scene_Item_actorWindowRect = Scene_Item.prototype.actorWindowRect;
Scene_Item.prototype.actorWindowRect = function() {
	if (typeof KRD_MZ_UI_Landscape !== "undefined" && KRD_MZ_UI_Landscape) {
		const wx = 0;
		const wy = Math.min(this.mainAreaTop(), this.helpAreaTop());
		const ww = Math.floor(Graphics.boxWidth / 3 * 2);
		const wh = this.mainAreaHeight() + this.helpAreaHeight();
		return new Rectangle(wx, wy, ww, wh);
	} else {
		return _Scene_Item_actorWindowRect.call(this, ...arguments);
	}
};

const _Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
	_Scene_Item_create.call(this, ...arguments);
	this.createActorEquipWindow();
};

//--------------------------------------

const _Window_ItemList_isEnabled = Window_ItemList.prototype.isEnabled;
Window_ItemList.prototype.isEnabled = function(item) {
	if (this.isEquipCategory()) {
		return this.canEquipType(item);
	} else {
		return _Window_ItemList_isEnabled.call(this, ...arguments);
	}
};

Window_ItemList.prototype.isEquipCategory = function() {
	return this._category === "weapon" || this._category === "armor";
};

Window_ItemList.prototype.canEquipType = function(item) {
	if (DataManager.isWeapon(item) && CANNOT_WEAPON_TYPE.includes(item.wtypeId.toString())) {
		return false;
	} else if (DataManager.isArmor(item) && CANNOT_EQUIP_TYPE.includes(item.etypeId.toString())) {
		return false;
	}
	return true;
};

const _Scene_Item_onItemOk = Scene_Item.prototype.onItemOk;
Scene_Item.prototype.onItemOk = function() {
	if (this._itemWindow.isEquipCategory()) {
		this.showActorEquipWindow();
	} else {
		_Scene_Item_onItemOk.call(this, ...arguments);
	}
};

const _Scene_Item_showActorWindow = Scene_Item.prototype.showActorWindow;
Scene_Item.prototype.showActorWindow = function() {
	if (this._itemWindow.isEquipCategory()) {
		this.showActorEquipWindow();
	} else {
		_Scene_Item_showActorWindow.call(this, ...arguments);
	}
};

Scene_Item.prototype.showActorEquipWindow = function() {
	if (this.isCursorLeft()) {
		 this._actorEquipWindow.x = Graphics.boxWidth - this._actorEquipWindow.width;
	} else {
		 this._actorEquipWindow.x = 0;
	}
	this._actorEquipWindow.show();
	this._actorEquipWindow.activate();
	if (this._useWindow) {
		this._useWindow.show();
		this._useWindow.drawAskEquip(this.item(), this.actor());
	}
};

const _Scene_Item_hideActorWindow = Scene_Item.prototype.hideActorWindow;
Scene_Item.prototype.hideActorWindow = function() {
	if (SceneManager._scene._itemWindow.isEquipCategory()) {
		this.hideActorEquipWindow();
	} else {
		_Scene_Item_hideActorWindow.call(this, ...arguments);
	}
};

Scene_Item.prototype.hideActorEquipWindow = function() {
	this._actorEquipWindow.hide();
	this._actorEquipWindow.deactivate();
	if (this._useWindow) {
		this._useWindow.hide();
	}
};

Scene_Item.prototype.isActorEquipWindowActive = function() {
	return this._actorEquipWindow && this._actorEquipWindow.active;
};

const _Scene_Item_onActorOk = Scene_Item.prototype.onActorOk;
Scene_Item.prototype.onActorOk = function() {
	if (this._itemWindow.isEquipCategory()) {
		this.equipItem();
	} else {
		_Scene_Item_onActorOk.call(this, ...arguments);
	}
};

const _Scene_Item_onActorCancel = Scene_Item.prototype.onActorCancel;
Scene_Item.prototype.onActorCancel = function() {
	_Scene_Item_onActorCancel.call(this, ...arguments);
	this.hideActorEquipWindow();
};

Scene_Item.prototype.equipItem = function() {
	const actor = $gameParty.members()[this._actorEquipWindow.index()];
	const item = this.item();
	if (actor.canEquip(item)) {
		if (DataManager.isWeapon(item) && $gameParty._weapons[item.id] > 0) {
			this.changeWeapon(item, actor);
			this._actorEquipWindow.refresh();
		} else if (DataManager.isArmor(item) && $gameParty._armors[item.id] > 0) {
			this.changeArmor(item, actor);
			this._actorEquipWindow.refresh();
		} else {
			this.cannotEquip(item, actor);
		}
	} else {
		this.cannotEquip(item, actor);
	}
};

Scene_Item.prototype.changeWeapon = function(item, actor) {
	const slotId = item.etypeId - 1;
	actor.changeEquip(slotId, item);
	SoundManager.playEquip();
	if (this._useWindow) {
		this._useWindow.drawEquip(item, actor);
	}
};

Scene_Item.prototype.changeArmor = function(item, actor) {
	const slotId = item.etypeId - 1;
	if (actor.equipSlots()[slotId] !== 1) {
		actor.changeEquip(slotId, item);
		SoundManager.playEquip();
		if (this._useWindow) {
			this._useWindow.drawEquip(item, actor);
		}
	} else {
		this.cannotEquip(item, actor);
	}
};

Scene_Item.prototype.cannotEquip = function(item, actor) {
	SoundManager.playBuzzer();
	if (this._useWindow) {
		this._useWindow.drawCannotEquip(item, actor);
	}
};

//--------------------------------------
})();
