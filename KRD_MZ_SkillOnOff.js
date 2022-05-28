/*:
 * @target MZ
 * @plugindesc スキルON／OFF
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param maxSkills
 * @text 最大スキル数
 * @desc 使用可能な最大スキル数。初期値: 8
 * @default 8
 * @type number
 * 
 * @param onIcon
 * @text ONアイコン
 * @desc スキルON時のアイコン。初期値: 160
 * @default 160
 * @type number
 * 
 * @param offIcon
 * @text OFFアイコン
 * @desc スキルOFF時のアイコン。初期値: 16
 * @default 16
 * @type number
 * 
 * @param iconY
 * @text アイコンY
 * @desc アイコンY座標の表示位置調整。初期値: 2
 * @default 2
 * @type number
 * 
 * @param showCount
 * @text カウンタ表示
 * @desc 選択数カウンタを表示する: true ／ しない: false
 * @default true
 * @type boolean
 * 
 * @param commandName
 * @text メニューコマンド名
 * @desc メニュー画面のコマンド名です。初期値「習得」
 * @default 習得
 * 
 * @param clearName
 * @text 初期化コマンド名
 * @desc 選択をリセットする選択肢名。初期値「全て外す」
 * @default 全て外す
 * 
 * @help
# KRD_MZ_SkillOnOff.js

スキルON／OFF

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/05/27) 作成開始
- ver.0.1.0 (2022/05/27) 非公開版完成
- ver.0.2.0 (2022/05/28) 選択数カウンタ追加
- ver.1.0.0 (2022/05/28) 公開
- ver.1.1.0 (2022/05/28) スキルが減る状況に対応

 * 
 * 
 */

let Scene_SkillSelect = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const MAX_SKILLS = Number(PARAM["maxSkills"]) || 0;
const ON_ICON = Number(PARAM["onIcon"]) || 0;
const OFF_ICON = Number(PARAM["offIcon"]) || 0;

const ICON_Y = Number(PARAM["iconY"]) || 0;

const SHOW_COUNT = PARAM["showCount"] === "true";
const COMMAND_NAME = PARAM["commandName"];
const CLEAR_NAME = PARAM["clearName"];

//--------------------------------------
// スキル選択クラス

Scene_SkillSelect = class extends Scene_Skill {
	onItemOk() {
		const index = this._itemWindow.index();
		const max = this._itemWindow.maxItems();
		if (index < max - 1) {
			this.onItemOkMain();
		} else {
			this.onItemClear();
		}
	}

	onItemOkMain() {
		const actor = this.actor();
		const id = this.item().id;
		const typeId = this.item().stypeId;
		if (!actor.isOnSkill(id, typeId)) {
			actor.onUseSkill(id, typeId);
		} else {
			actor.offUseSkill(id, typeId);
		}
		this._itemWindow.refresh();
		this._statusWindow.refresh();
		this._itemWindow.activate();
	}

	onItemClear() {
		const skillTypeWindow = SceneManager._scene._skillTypeWindow;
		const index = skillTypeWindow.index();
		const stypeId = index >= 0 ? skillTypeWindow._list[index].ext : null;
		if (stypeId !== null) {
			this.actor().clearUseSkills(stypeId);
		}
		this._itemWindow.refresh();
		this._statusWindow.refresh();
		this._itemWindow.activate();
	}
};

//--------------------------------------
// 内部データ

const KRD_Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
	KRD_Game_Actor_initMembers.apply(this, arguments);
	this._useSkills = this._useSkills || {};
};

Game_Actor.prototype.maxUseSkills = function() {
	return MAX_SKILLS;
};

Game_Actor.prototype.clearUseSkills = function(typeId) {
	this._useSkills[typeId] = [];
};

Game_Actor.prototype.onUseSkill = function(id, typeId) {
	if (this._useSkills[typeId].length < this.maxUseSkills() && !this.isOnSkill(id, typeId)) {
		this._useSkills[typeId].push(id);
	}
};

Game_Actor.prototype.offUseSkill = function(id, typeId) {
	const index = this._useSkills[typeId].indexOf(id);
	if (index >= 0) {
		this._useSkills[typeId].splice(index, 1);
	}
};

Game_Actor.prototype.isOnSkill = function(id, typeId) {
	if (!this._useSkills[typeId]) {
		this._useSkills[typeId] = [];
	}
	return this._useSkills[typeId].includes(id);
};

//--------------------------------------
// スキルリスト画面

const KRD_Window_SkillList_makeItemList = Window_SkillList.prototype.makeItemList;
Window_SkillList.prototype.makeItemList = function() {
	KRD_Window_SkillList_makeItemList.apply(this, arguments);
	if (SceneManager._scene.constructor.name === "Scene_SkillSelect") {
		this._data.push(null);
	}
};

const KRD_Window_SkillList_isEnabled = Window_SkillList.prototype.isEnabled;
Window_SkillList.prototype.isEnabled = function(item) {
	if (SceneManager._scene.constructor.name === "Scene_SkillSelect") {
		return true;
	} else {
		return KRD_Window_SkillList_isEnabled.apply(this, arguments);
	}
};

Window_SkillList.prototype.drawItem = function(index) {
	if (this.itemAt(index)) {
		if (this.drawDescription) {
			this.drawItemDesc(index);
		} else {
			this.drawItemDefault(index);
		}
	} else {
		this.drawItemNull(index);
	}
};

Window_SkillList.prototype.drawItemDefault = function(index) {
	const skill = this.itemAt(index);
	if (skill) {
		const checkWidth = ImageManager.iconWidth + 2;
		const costWidth = this.costWidth();
		const rect = this.itemLineRect(index);
		this.changePaintOpacity(this.isEnabled(skill));
		this.drawCheck(skill, rect.x, rect.y + ICON_Y);
		this.drawItemName(skill, rect.x + checkWidth, rect.y, rect.width - costWidth - checkWidth);
		this.drawSkillCost(skill, rect.x, rect.y, rect.width);
		this.changePaintOpacity(true);
	}
};

Window_SkillList.prototype.drawItemDesc = function(index) {
	const skill = this.itemAt(index);
	if (skill) {
		const checkWidth = ImageManager.iconWidth + 2;
		const costWidth = this.costWidth();
		const rect = this.itemRectWithPadding(index);
		const y = rect.y + this.itemPadding();
		this.changePaintOpacity(this.isEnabled(skill));
		this.drawCheck(skill, rect.x, y + ICON_Y);
		this.drawItemName(skill, rect.x + checkWidth, y, rect.width - costWidth - checkWidth);
		this.drawSkillCost(skill, rect.x, y, rect.width);
		this.drawDescription(skill, rect.x, y + this.lineHeight(), rect.width);
		this.changePaintOpacity(true);
	}
};

Window_SkillList.prototype.drawItemNull = function(index) {
	const skill = this.itemAt(index);
	if (skill === null) {
		const rect = this.itemLineRect(index);
		this.changePaintOpacity(true);
		this.drawTextEx(CLEAR_NAME, rect.x, rect.y, rect.width);
	}
};

Window_SkillList.prototype.drawCheck = function(skill, x, y) {
	if (this.isOnSkill(skill)) {
		this.drawIcon(ON_ICON, x, y);
	} else {
		this.drawIcon(OFF_ICON, x, y);
	}
};

Window_SkillList.prototype.isOnSkill = function(skill) {
	return skill && this._actor.isOnSkill(skill.id, skill.stypeId);
};

//--------------------------------------
// 選択数表示

const KRD_Window_SkillStatus_refresh = Window_SkillStatus.prototype.refresh;
Window_SkillStatus.prototype.refresh = function() {
	KRD_Window_SkillStatus_refresh.apply(this, arguments);
	if (SHOW_COUNT && this._actor 
	&& SceneManager._scene._itemWindow && this._actor._useSkills) {
		const skillTypeWindow = SceneManager._scene._skillTypeWindow;
		const index = skillTypeWindow.index();
		const stypeId = index >= 0 ? skillTypeWindow._list[index].ext : null;
		const useSkills = this._actor.useSkills ? this._actor._useSkills[stypeId] : null;
		const count = stypeId && useSkills ? useSkills.length : 0;
		const max = MAX_SKILLS;
		const text = `${count} / ${max}`;
		const x = 0;
		const y = this.innerHeight - this.lineHeight();
		this.resetTextColor();
		this.drawText(text, x, y, this.innerWidth, "center");
	}
};

const KRD_Window_SkillType_select = Window_SkillType.prototype.select;
Window_SkillType.prototype.select = function(index) {
	KRD_Window_SkillType_select.apply(this, arguments);
	if (SHOW_COUNT && SceneManager._scene._statusWindow) {
		SceneManager._scene._statusWindow.refresh();
	}
};

//--------------------------------------
// メニューコマンド

Window_MenuCommand.prototype.addMainCommands = function() {
	const enabled = this.areMainCommandsEnabled();
	if (this.needsCommand("item")) {
		this.addCommand(TextManager.item, "item", enabled);
	}
	if (this.needsCommand("skill")) {
		this.addCommand(TextManager.skill, "skill", enabled);
	}

	if (COMMAND_NAME) {
		this.addCommand(COMMAND_NAME, "skillSelect", enabled);
	}

	if (this.needsCommand("equip")) {
		this.addCommand(TextManager.equip, "equip", enabled);
	}
	if (this.needsCommand("status")) {
		this.addCommand(TextManager.status, "status", enabled);
	}
};

const KRD_Window_Command_commandName = Window_Command.prototype.commandName;
Window_Command.prototype.commandName = function(index) {
	if (typeof KRD_MULTILINGUAL !== "undefined") {
		const name = KRD_MULTILINGUAL.getLangText(this._list[index].name);
		return name;
	} else {
		return KRD_Window_Command_commandName.apply(this, arguments);
	}
};

const KRD_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	KRD_Scene_Menu_createCommandWindow.apply(this, arguments);
	this._commandWindow.setHandler("skillSelect", this.commandPersonal.bind(this));
};

const KRD_Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
	if (this._commandWindow.currentSymbol() === "skillSelect") {
		SceneManager.push(Scene_SkillSelect);
	} else {
		KRD_Scene_Menu_onPersonalOk.apply(this, arguments);
	}
};

//--------------------------------------
// バトル画面：スキル表示

Window_BattleSkill.prototype.makeItemList = function() {
	if (this._actor) {
		this._data = this._actor.useSkills().filter(item => this.includes(item));
	} else {
		this._data = [];
	}

	if (this.sortList) {
		this.sortList();
	}
};

Game_Actor.prototype.useSkills = function() {
	const list = [];
	const stypeList = Object.keys(this._useSkills);
	for (const stype of stypeList) {
		this._useSkills[stype].sort((a, b) => {
			return (Number(a) || 0) - (Number(b) || 0);
		});

		for (const id of this._useSkills[stype]) {
			const skills = this._skills.concat(this.addedSkills());
			if (skills.includes(id) && !list.includes($dataSkills[id])) {
				list.push($dataSkills[id]);
			}
		}
	}
	return list;
};

//--------------------------------------
})();
