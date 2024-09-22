/*:
 * @target MZ
 * @plugindesc 最低ダメージ
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param MIN_DAMAGE
 * @text 最低ダメージ
 * @desc ダメージがこの値より小さい時にこの値になります。初期値 2。
 * @default 2
 * @type number
 * 
 * @param MIN_PERCENT
 * @text 最低ダメージ確率
 * @desc ダメージが最低ダメージより小さい時にこの確率（パーセント）で最低ダメージになります。初期値 50。
 * @default 50
 * @type number
 * 
 * @param MIN_DAMAGE_PARAM
 * @text 最低ダメージ能力値
 * @desc ダメージがこの能力値より小さい時にこの値になります。能力値の番号（0～7）。初期値 2（攻撃力）。
 * @default 2
 * @type number
 * 
 * @param MIN_DAMAGE_PARAM_RATE
 * @text 最低ダメージ能力値割合
 * @desc 「最低ダメージ能力値」とする割合（パーセント）です。初期値 10。
 * @default 10
 * @type number
 * 
 * @help
# KRD_MZ_MinDamage.js

最低ダメージ

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2024/07/11) 作成開始
- ver.0.1.0 (2024/07/11) 非公開版完成
- ver.1.0.0 (2024/07/11) 公開
- ver.1.1.0 (2024/09/22) 「最低ダメージ能力値」を追加
- ver.1.1.1 (2024/09/22) 微修正

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const MIN_DAMAGE = Number(PARAM["MIN_DAMAGE"]) || 0;
const MIN_PERCENT = Number(PARAM["MIN_PERCENT"]) || 0;

const MIN_DAMAGE_PARAM = PARAM["MIN_DAMAGE_PARAM"] ? Number(PARAM["MIN_DAMAGE_PARAM"]) : NaN;
const MIN_DAMAGE_PARAM_RATE = (Number(PARAM["MIN_DAMAGE_PARAM_RATE"]) || 0) / 100;

//--------------------------------------

const _Game_Action_evalDamageFormula = Game_Action.prototype.evalDamageFormula;
Game_Action.prototype.evalDamageFormula = function(target) {
	const base = _Game_Action_evalDamageFormula.call(this, ...arguments);
	return this.checkMinDamage(base);
};

Game_Action.prototype.checkMinDamage = function(damage) {
	const minDamage = this.minDamage();
	if (damage >= 0 && damage < minDamage) {
		const random = Math.floor(Math.random() * 100);
		if (random < MIN_PERCENT) {
			return minDamage;
		} else {
			return damage;
		}
	} else {
		return damage;
	}
};

Game_Action.prototype.minDamage = function() {
	if (isNaN(MIN_DAMAGE_PARAM)) {
		return MIN_DAMAGE;
	} else {
		const damage = Math.floor(this.subject().param(MIN_DAMAGE_PARAM) * MIN_DAMAGE_PARAM_RATE);
		return damage > MIN_DAMAGE ? damage : MIN_DAMAGE;
	}
};

//--------------------------------------
})();
