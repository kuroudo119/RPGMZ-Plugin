/*:
 * @target MZ
 * @plugindesc 最低ダメージ
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param MIN_DAMAGE
 * @text 最低ダメージ
 * @desc ダメージがこの値より小さい時にこの値になります。
 * @default 2
 * @type number
 * 
 * @param MIN_PERCENT
 * @text 最低ダメージ確率
 * @desc ダメージが最低ダメージより小さい時にこの確率（パーセント）で最低ダメージになります。
 * @default 50
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

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const MIN_DAMAGE = Number(PARAM["MIN_DAMAGE"]) || 0;
const MIN_PERCENT = Number(PARAM["MIN_PERCENT"]) || 0;

//--------------------------------------

const _Game_Action_evalDamageFormula = Game_Action.prototype.evalDamageFormula;
Game_Action.prototype.evalDamageFormula = function(target) {
	const base = _Game_Action_evalDamageFormula.call(this, ...arguments);
	if (base >= 0 && base < MIN_DAMAGE) {
		const random = Math.floor(Math.random() * 100);
		if (random < MIN_PERCENT) {
			return MIN_DAMAGE;
		} else {
			return base;
		}
	} else {
		return base;
	}
};

//--------------------------------------
})();
