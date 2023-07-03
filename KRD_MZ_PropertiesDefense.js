/*:
 * @target MZ
 * @plugindesc クリティカル防御力パーセント
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @orderAfter KRD_MZ_Critical
 * 
 * @param CRITICAL_DEF_RATE
 * @text クリティカル防御力割合
 * @desc クリティカル時に防御力を変動させるパーセントです。
 * @default 100
 * @type number
 * 
 * @param CRITICAL_MDF_RATE
 * @text クリティカル魔法防御割合
 * @desc クリティカル時に魔法防御を変動させるパーセントです。
 * @default 100
 * @type number
 * 
 * @help
# KRD_MZ_PropertiesDefense.js

クリティカル防御力パーセント

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2023/07/03) 作成開始
- ver.0.1.0 (2023/07/03) 非公開版完成
- ver.1.0.0 (2023/07/03) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const CRITICAL_DEF_RATE = Number(PARAM["CRITICAL_DEF_RATE"]) || 0;
const CRITICAL_MDF_RATE = Number(PARAM["CRITICAL_MDF_RATE"]) || 0;

//--------------------------------------

Object.defineProperties(Game_BattlerBase.prototype, {
	def: {
		get: function() {
			return this._critical ? Math.floor(this.param(3) * CRITICAL_DEF_RATE / 100) : this.param(3);
		},
		configurable: true
	},
	mdf: {
		get: function() {
			return this._critical ? Math.floor(this.param(5) * CRITICAL_MDF_RATE / 100) : this.param(5);
		},
		configurable: true
	},
});

//--------------------------------------

const KRD_Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
	this.subject()._critical = !!critical;
	target._critical = !!critical;
	return KRD_Game_Action_makeDamageValue.apply(this, arguments);
};

//--------------------------------------
})();
