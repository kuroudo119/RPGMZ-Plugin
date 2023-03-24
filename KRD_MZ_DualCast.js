/*:
 * @target MZ
 * @plugindesc れんぞくまほう
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param dualSkillTypeId
 * @text 連続スキルタイプ番号
 * @desc 連続スキルのスキルタイプ番号です。デフォルト: 4
 * @default 4
 * @type number
 * 
 * @param baseSkillTypeId
 * @text 基本スキルタイプ番号
 * @desc 連続スキルの元となるスキルタイプ番号です。デフォルト: 1
 * @default 1
 * @type number
 * 
 * @param castTimes
 * @text 連続回数
 * @desc スキルを連続させる回数です。デフォルト: 2
 * @default 2
 * @type number
 * 
 * @help
# KRD_MZ_DualCast.js

れんぞくまほう

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2023/03/24) 作成開始
- ver.0.1.0 (2023/03/24) 非公開版完成
- ver.1.0.0 (2023/03/24) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const DUAL_CAST = {
	dualSkillTypeId: Number(PARAM["dualSkillTypeId"]) || 0,
	baseSkillTypeId: Number(PARAM["baseSkillTypeId"]) || 0,
	castTimes: Number(PARAM["castTimes"]) || 0
};

//--------------------------------------

const KRD_Window_SkillList_includes = Window_SkillList.prototype.includes;
Window_SkillList.prototype.includes = function(item) {
	if (this._stypeId === DUAL_CAST.dualSkillTypeId) {
		return item && item.stypeId === DUAL_CAST.baseSkillTypeId;
	} else {
		return KRD_Window_SkillList_includes.apply(this, arguments);
	}
};

const KRD_Scene_Battle_selectNextCommand = Scene_Battle.prototype.selectNextCommand;
Scene_Battle.prototype.selectNextCommand = function() {
	if (this._skillWindow._stypeId === DUAL_CAST.dualSkillTypeId) {
		const actor = BattleManager.actor();
		if (actor._actions.length < DUAL_CAST.castTimes) {
			actor._actions.push(new Game_Action(actor));

			this.selectNextCommandDualSkill();
		} else {
			KRD_Scene_Battle_selectNextCommand.apply(this, arguments);
			this._skillWindow._stypeId = 0;
		}
	} else {
		KRD_Scene_Battle_selectNextCommand.apply(this, arguments);
	}
};

Scene_Battle.prototype.selectNextCommandDualSkill = function() {
	BattleManager.selectNextCommand();

	this._skillWindow.refresh();
	this._skillWindow.show();
	this._skillWindow.activate();
	this._statusWindow.hide();
	this._actorCommandWindow.hide();
};

const KRD_Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function() {
	if (this._skillWindow._stypeId === DUAL_CAST.dualSkillTypeId) {
		const actor = BattleManager.actor();
		actor.clearActions();
		actor._actions.push(new Game_Action(actor));
		this._skillWindow._stypeId = 0;
	}

	KRD_Scene_Battle_onSkillCancel.apply(this, arguments);
};

//--------------------------------------
})();
