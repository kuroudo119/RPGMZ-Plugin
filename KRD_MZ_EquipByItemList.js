/*:
 * @target MZ
 * @plugindesc アイテム欄から装備
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
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

 * 
 * 
 */

(() => {

"use strict";

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
		x += 10;
		y += 20;
		const lineHeight = this.lineHeight();
		this.drawActorName(actor, x - 150, y);
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
			this.drawText(name, x + ImageManager.iconWidth + 4, y);
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
			this.drawCurrentParam(x + 140, y , paramId);
		}
		this.rawRightArrow(x + 200, y);
		if (this._tempActor) {
			this.drawNewParam(x + 240, y, paramId);
		}
	}

	drawParamName(x, y, paramId) {
		const width = 400;
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
			this.resetTextColor();
			this.drawText("-", x, y, 48, "center");
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
		return 48;
	}
}

Scene_ItemBase.prototype.createActorEquipWindow = function() {
	const rect = this.actorWindowRect();
	this._actorEquipWindow = new Window_MenuActorEquip(rect);
	this._actorEquipWindow.setHandler("ok", this.onActorOk.bind(this));
	this._actorEquipWindow.setHandler("cancel", this.onActorCancel.bind(this));
	this.addWindow(this._actorEquipWindow);
};

const _Scene_ItemBase_actorWindowRect = Scene_ItemBase.prototype.actorWindowRect;
Scene_ItemBase.prototype.actorWindowRect = function() {
	if (typeof KRD_MZ_UI_Landscape !== "undefined" && KRD_MZ_UI_Landscape) {
		const wx = 0;
		const wy = Math.min(this.mainAreaTop(), this.helpAreaTop());
		const ww = Math.floor(Graphics.boxWidth / 3 * 2);
		const wh = this.mainAreaHeight() + this.helpAreaHeight();
		return new Rectangle(wx, wy, ww, wh);
	} else {
		return _Scene_ItemBase_actorWindowRect.call(this, ...arguments);
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
		return true;
	} else {
		return _Window_ItemList_isEnabled.call(this, ...arguments);
	}
};

Window_ItemList.prototype.isEquipCategory = function() {
	return this._category === "weapon" || this._category === "armor";
};

const _Scene_Item_onItemOk = Scene_Item.prototype.onItemOk;
Scene_Item.prototype.onItemOk = function() {
	if (this._itemWindow.isEquipCategory()) {
		this.showActorEquipWindow();
	} else {
		_Scene_Item_onItemOk.call(this, ...arguments);
	}
};

const _Scene_ItemBase_showActorWindow = Scene_ItemBase.prototype.showActorWindow;
Scene_ItemBase.prototype.showActorWindow = function() {
	if (SceneManager._scene._itemWindow.isEquipCategory()) {
		this.showActorEquipWindow();
	} else {
		_Scene_ItemBase_showActorWindow.call(this, ...arguments);
	}
};

Scene_ItemBase.prototype.showActorEquipWindow = function() {
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

const _Scene_ItemBase_hideActorWindow = Scene_ItemBase.prototype.hideActorWindow;
Scene_ItemBase.prototype.hideActorWindow = function() {
	if (SceneManager._scene._itemWindow.isEquipCategory()) {
		this.hideActorEquipWindow();
	} else {
		_Scene_ItemBase_hideActorWindow.call(this, ...arguments);
	}
};

Scene_ItemBase.prototype.hideActorEquipWindow = function() {
	this._actorEquipWindow.hide();
	this._actorEquipWindow.deactivate();
	if (this._useWindow) {
		this._useWindow.hide();
	}
};

Scene_ItemBase.prototype.isActorEquipWindowActive = function() {
	return this._actorEquipWindow && this._actorEquipWindow.active;
};

const _Scene_ItemBase_onActorOk = Scene_ItemBase.prototype.onActorOk;
Scene_ItemBase.prototype.onActorOk = function() {
	if (this._itemWindow.isEquipCategory()) {
		this.equipItem();
	} else {
		_Scene_ItemBase_onActorOk.call(this, ...arguments);
	}
};

const _Scene_ItemBase_onActorCancel = Scene_ItemBase.prototype.onActorCancel;
Scene_ItemBase.prototype.onActorCancel = function() {
	_Scene_ItemBase_onActorCancel.call(this, ...arguments);
	this.hideActorEquipWindow();
};

Scene_ItemBase.prototype.equipItem = function() {
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

Scene_ItemBase.prototype.changeWeapon = function(item, actor) {
	const slotId = item.etypeId - 1;
	actor.changeEquip(slotId, item);
	SoundManager.playEquip();
	if (this._useWindow) {
		this._useWindow.drawEquip(item, actor);
	}
};

Scene_ItemBase.prototype.changeArmor = function(item, actor) {
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

Scene_ItemBase.prototype.cannotEquip = function(item, actor) {
	SoundManager.playBuzzer();
	if (this._useWindow) {
		this._useWindow.drawCannotEquip(item, actor);
	}
};

//--------------------------------------
})();
