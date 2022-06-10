/*:
 * @target MZ
 * @plugindesc 装備コマンド分割（武器防具、装飾品 or スキルなど）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param front
 * @text 装備コマンド（前）
 * 
 * @param slotTypeWeapon
 * @text 装備タイプ（前）
 * @desc 前部分の装備タイプ番号をカンマ区切りで記述。初期値は「1, 2, 3, 4」
 * @default 1, 2, 3, 4
 * @parent front
 * 
 * @param equipWeaponName
 * @text 装備コマンド名（前）
 * @desc 前部分の装備コマンド名を記述します。初期値は「装備」
 * @default 装備
 * @parent front
 * 
 * @param back
 * @text 装備コマンド（後）
 * 
 * @param slotTypeSkill
 * @text 装備タイプ（後）
 * @desc 後ろ部分の装備タイプ番号をカンマ区切りで記述。初期値は「5」
 * @default 5
 * @parent back
 * 
 * @param equipSkillName
 * @text 装備コマンド名（後）
 * @desc 後ろ部分の装備コマンド名を記述します。初期値は「装飾品」
 * @default 装飾品
 * @parent back
 * 
 * @help
# KRD_MZ_DivideEquip.js

装備コマンド分割（武具、スキル）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

装備タイプを分割し、それぞれにコマンドを用意します。

武器防具と装飾品に分けたり、
武器防具とスキル習得用防具に分けたりする想定です。

## 使い方

プラグインパラメータに装備タイプを設定します。
この時、前後合わせて、データベースの装備タイプの数と同じにします。

同じ装備タイプを複数設定すると、同じ装備タイプを複数装備できます。

元の装備コマンドを非表示にする場合は、
データベースのシステム2にあるチェックを外してください。

## 更新履歴

- ver.0.0.1 (2022/06/09) 作成開始
- ver.0.1.0 (2022/06/09) 非公開版完成
- ver.0.2.0 (2022/06/10) パラメータ追加
- ver.1.0.0 (2022/06/10) 公開

 * 
 * 
 */

let Scene_EquipDivide = null;
let Scene_EquipWeapon = null;
let Scene_EquipSkill = null;

let Window_EquipSlotDivide = null;
let Window_EquipSlotWeapon = null;
let Window_EquipSlotSkill = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const WEAPON_SLOTS = JSON.parse("[" + PARAM["slotTypeWeapon"] + "]");
const WEAPON_INDEX = 0;
const SKILL_SLOTS = JSON.parse("[" + PARAM["slotTypeSkill"] + "]");
const SKILL_INDEX = WEAPON_SLOTS.length;

const EQUIP_WEAPON_NAME = PARAM["equipWeaponName"];
const EQUIP_SKILL_NAME = PARAM["equipSkillName"];

//--------------------------------------
Scene_EquipDivide = class extends Scene_Equip {
	constructor() {
		super(...arguments);
		this._slotIndex = 0;
		this._slots = null;
	}

	executeEquipChange() {
		const actor = this.actor();
		const slotId = this._slotWindow.index() + this._slotIndex;
		const item = this._itemWindow.item();
		actor.changeEquip(slotId, item);
	}

	commandOptimize() {
		SoundManager.playEquip();
		this.actor().optimizeEquipments(this._slotIndex, this._slots);
		this._statusWindow.refresh();
		this._slotWindow.refresh();
		this._commandWindow.activate();
	}
	
	commandClear = function() {
		SoundManager.playEquip();
		this.actor().clearEquipments(this._slotIndex, this._slots);
		this._statusWindow.refresh();
		this._slotWindow.refresh();
		this._commandWindow.activate();
	}
};

//--------------------------------------
Scene_EquipWeapon = class extends Scene_EquipDivide {
	constructor() {
		super(...arguments);
		this._slotIndex = WEAPON_INDEX;
		this._slots = WEAPON_SLOTS;
	}

	createSlotWindow() {
		const rect = this.slotWindowRect();
		this._slotWindow = new Window_EquipSlotWeapon(rect);
		this._slotWindow.setHelpWindow(this._helpWindow);
		this._slotWindow.setStatusWindow(this._statusWindow);
		this._slotWindow.setHandler("ok", this.onSlotOk.bind(this));
		this._slotWindow.setHandler("cancel", this.onSlotCancel.bind(this));
		this.addWindow(this._slotWindow);
	}
};

//--------------------------------------
Scene_EquipSkill = class extends Scene_EquipDivide {
	constructor() {
		super(...arguments);
		this._slotIndex = SKILL_INDEX;
		this._slots = SKILL_SLOTS;
	}

	createSlotWindow() {
		const rect = this.slotWindowRect();
		this._slotWindow = new Window_EquipSlotSkill(rect);
		this._slotWindow.setHelpWindow(this._helpWindow);
		this._slotWindow.setStatusWindow(this._statusWindow);
		this._slotWindow.setHandler("ok", this.onSlotOk.bind(this));
		this._slotWindow.setHandler("cancel", this.onSlotCancel.bind(this));
		this.addWindow(this._slotWindow);
	}
};

//--------------------------------------
Window_EquipSlotDivide = class extends Window_EquipSlot {
	constructor() {
		super(...arguments);
		this._slotIndex = 0;
		this._slots = null;
	}

	update() {
		Window_StatusBase.prototype.update.call(this);
		if (this._itemWindow) {
			this._itemWindow.setSlotId(this.index() + this._slotIndex);
		}
	}

	maxItems() {
		return this._actor ? this._slots.length : 0;
	}

	actorSlotName(actor, index) {
		return super.actorSlotName(actor, index + this._slotIndex);
	}

	itemAt(index) {
		return super.itemAt(index + this._slotIndex);
	}

	isEnabled = function(index) {
		return this._actor ? this._actor.isEquipChangeOk(index + this._slotIndex) : false;
	};
};

//--------------------------------------
Window_EquipSlotWeapon = class extends Window_EquipSlotDivide {
	constructor() {
		super(...arguments);
		this._slotIndex = WEAPON_INDEX;
		this._slots = WEAPON_SLOTS;
	}
};

//--------------------------------------
Window_EquipSlotSkill = class extends Window_EquipSlotDivide {
	constructor() {
		super(...arguments);
		this._slotIndex = SKILL_INDEX;
		this._slots = SKILL_SLOTS;
	}
};

//--------------------------------------
const KRD_Game_Actor_equipSlots = Game_Actor.prototype.equipSlots;
Game_Actor.prototype.equipSlots = function() {
	if (WEAPON_SLOTS && SKILL_SLOTS) {
		const slots = WEAPON_SLOTS.concat(SKILL_SLOTS);
		if (slots.length >= 2 && this.isDualWield()) {
			 slots[1] = 1;
		}
		return slots;
	} else {
		return KRD_Game_Actor_equipSlots.apply(this, arguments);
	}
};

const KRD_Game_Actor_clearEquipments = Game_Actor.prototype.clearEquipments;
Game_Actor.prototype.clearEquipments = function(index, slots) {
	if (index >= 0 && slots) {
		const maxSlots = index + slots.length;
		for (let i = index; i < maxSlots; i++) {
			if (this.isEquipChangeOk(i)) {
				this.changeEquip(i, null);
			}
		}
	} else {
		KRD_Game_Actor_clearEquipments.apply(this, arguments);
	}
};

const KRD_Game_Actor_optimizeEquipments = Game_Actor.prototype.optimizeEquipments;
Game_Actor.prototype.optimizeEquipments = function(index, slots) {
	if (index >= 0 && slots) {
		const maxSlots = index + slots.length;
		this.clearEquipments(...arguments);
		for (let i = index; i < maxSlots; i++) {
			if (this.isEquipChangeOk(i)) {
				this.changeEquip(i, this.bestEquipItem(i));
			}
		}
	} else {
		KRD_Game_Actor_optimizeEquipments.apply(this, arguments);
	}
};

//--------------------------------------
Window_MenuCommand.prototype.addMainCommands = function() {
	const enabled = this.areMainCommandsEnabled();
	if (this.needsCommand("item")) {
		this.addCommand(TextManager.item, "item", enabled);
	}
	if (this.needsCommand("skill")) {
		this.addCommand(TextManager.skill, "skill", enabled);
	}
	if (this.needsCommand("equip")) {
		this.addCommand(TextManager.equip, "equip", enabled);
	}

	this.addCommand(EQUIP_WEAPON_NAME, "equipWeapon", enabled);
	this.addCommand(EQUIP_SKILL_NAME, "equipSkill", enabled);

	if (this.needsCommand("status")) {
		this.addCommand(TextManager.status, "status", enabled);
	}
};

//--------------------------------------
const KRD_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	KRD_Scene_Menu_createCommandWindow.apply(this, arguments);
	this._commandWindow.setHandler("equipWeapon", this.commandPersonal.bind(this));
	this._commandWindow.setHandler("equipSkill", this.commandPersonal.bind(this));
};


const KRD_Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
	const symbol = this._commandWindow.currentSymbol();
	if (symbol === "equipWeapon") {
		SceneManager.push(Scene_EquipWeapon);
	} else if (symbol === "equipSkill") {
		SceneManager.push(Scene_EquipSkill);
	} else {
		KRD_Scene_Menu_onPersonalOk.apply(this, arguments);
	}
};

//--------------------------------------
const KRD_Window_Command_commandName = Window_Command.prototype.commandName;
Window_Command.prototype.commandName = function(index) {
	if (typeof KRD_MULTILINGUAL !== "undefined") {
		const name = KRD_MULTILINGUAL.getLangText(this._list[index].name);
		return name;
	} else {
		return KRD_Window_Command_commandName.apply(this, arguments);
	}
};

//--------------------------------------
})();
