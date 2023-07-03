/*:
 * @target MZ
 * @plugindesc クリティカルのダメージ倍率を変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param criticalRate
 * @text クリティカル倍率
 * @desc クリティカル発生時にダメージにかかる倍率（パーセント）です。初期値 300
 * @default 300
 * @type number
 * 
 * @param USE_CRITICAL_FLAG
 * @text 引数クリティカル追加
 * @desc ダメージ計算式でクリティカル有無 cri を使えるようにします。
 * @default false
 * @type boolean
 * 
 * @help
# KRD_MZ_Critical.js

クリティカルのダメージ倍率を変更

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/02/19) 作成開始
- ver.0.1.0 (2021/02/19) 非公開版完成
- ver.0.2.0 (2023/07/03) クリティカルを引数に追加
- ver.1.0.0 (2023/07/03) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const CRITICAL_RATE = Number(PARAM["criticalRate"]) || 0;

const USE_CRITICAL_FLAG = PARAM["USE_CRITICAL_FLAG"] === "true";

//--------------------------------------

// 上書き
Game_Action.prototype.applyCritical = function(damage) {
	return Math.floor(damage * CRITICAL_RATE / 100);
};

//--------------------------------------

const KRD_Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
	if (USE_CRITICAL_FLAG) {
		const item = this.item();
		const baseValue = this.evalDamageFormula(target, critical);
		let value = baseValue * this.calcElementRate(target);
		if (this.isPhysical()) {
			value *= target.pdr;
		}
		if (this.isMagical()) {
			value *= target.mdr;
		}
		if (baseValue < 0) {
			value *= target.rec;
		}
		if (critical) {
			value = this.applyCritical(value);
		}
		value = this.applyVariance(value, item.damage.variance);
		value = this.applyGuard(value, target);
		value = Math.round(value);
		return value;
	} else {
		return KRD_Game_Action_makeDamageValue.apply(this, arguments);
	}
};

const KRD_Game_Action_evalDamageFormula = Game_Action.prototype.evalDamageFormula;
Game_Action.prototype.evalDamageFormula = function(target, critical) {
	if (USE_CRITICAL_FLAG) {
		try {
			const cri = critical;
	
			const item = this.item();
			const a = this.subject(); // eslint-disable-line no-unused-vars
			const b = target; // eslint-disable-line no-unused-vars
			const v = $gameVariables._data; // eslint-disable-line no-unused-vars
			const sign = [3, 4].includes(item.damage.type) ? -1 : 1;
			const value = Math.max(eval(item.damage.formula), 0) * sign;
			return isNaN(value) ? 0 : value;
		} catch (e) {
			return 0;
		}
	} else {
		return KRD_Game_Action_evalDamageFormula.apply(this, arguments);
	}
};

//--------------------------------------
})();
