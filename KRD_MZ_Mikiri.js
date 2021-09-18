/*:
 * @target MZ
 * @plugindesc 見切りスキル（受けたスキルをミスにする）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param cannotMoveMikiri
 * @text 行動不可見切り
 * @desc 行動できない状態でも見切りできる。
 * @default false
 * @type boolean
 * 
 * @param reflectMikiri
 * @text 魔法反射見切り
 * @desc 反射された魔法も見切りできる。
 * @default true
 * @type boolean
 * 
 * @help
# KRD_MZ_Mikiri.js

見切りスキル（受けたスキルをミスにする）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/09/18) 作成開始
- ver.0.1.0 (2021/09/18) 完成＆公開

## 使い方

スキルと見切りスキルを用意します。
スキルのメモ欄に <mikiri:99> と書きます。
99は見切りスキルの番号です。

見切りスキルは使用不可にするとよいです。

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const CANNOT_MOVE_MIKIRI = PARAM["cannotMoveMikiri"] === "true";
const REFLECT_MIKIRI = PARAM["reflectMikiri"] === "true";

const KRD_BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
BattleManager.invokeNormalAction = function(subject, target) {
	if (this.checkMikiri(target)) {
		const realTarget = this.applySubstitute(target);
		this._action.applyMikiri(realTarget);
		this._logWindow.displayActionResults(subject, realTarget);
	} else {
		KRD_BattleManager_invokeNormalAction.apply(this, arguments);
	}
};

BattleManager.checkMikiri = function(target) {
	if (!CANNOT_MOVE_MIKIRI && !target.canMove()) {
		return false;
	}
	if (this._action._item._dataClass === "skill") {
		const action = this._action._item._itemId;
		const mikiri = Number($dataSkills[action].meta.mikiri);
		if (mikiri) {
			if (target.isActor()) {
				const have = target.hasSkill(mikiri);
				if (have) {
					return true;
				}
			} else {
				const added = target.addedSkills().some(skill => skill === mikiri);
				if (added) {
					return true;
				}
			}
		}
	}

	return false;
};

Game_Action.prototype.applyMikiri = function(target) {
	const result = target.result();
	this.subject().clearResult();
	result.clear();
	result.used = this.testApply(target);
	result.missed = true;
	this.updateLastTarget(target);
};

const KRD_BattleManager_invokeMagicReflection = BattleManager.invokeMagicReflection;
BattleManager.invokeMagicReflection = function(subject, target) {
	if (REFLECT_MIKIRI && this.checkMikiri(subject)) {
		this._action._reflectionTarget = target;
		this._logWindow.displayReflection(target);
		this._action.applyMikiri(subject);
		this._logWindow.displayActionResults(target, subject);
	} else {
		KRD_BattleManager_invokeMagicReflection.apply(this, arguments);
	}
};

})();
