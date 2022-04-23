/*:
 * @target MZ
 * @plugindesc 運によるステート有効度を変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param stateRate
 * @text ステート有効度影響率
 * @desc ステート付与側と対象との能力値差がステート有効度に影響する割合です。千分率です。0 だと影響なしになります。
 * @default 1
 * @type number
 * 
 * @help
# KRD_MZ_StateByLuck.js

運によるステート有効度を変更

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/04/23) 作成開始
- ver.0.1.0 (2022/04/23) 非公開版完成
- ver.1.1.0 (2022/04/23) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const STATE_RATE = Number(PARAM["stateRate"]) || 0;

const KRD_Game_Action_lukEffectRate = Game_Action.prototype.lukEffectRate;
Game_Action.prototype.lukEffectRate = function(target) {
	if (STATE_RATE === 0) {
		return 1;
	} else if (STATE_RATE === 1) {
		return KRD_Game_Action_lukEffectRate.apply(this, arguments);
	} else {
		const stateRate = STATE_RATE / 1000;
		return Math.max(1.0 + (this.subject().luk - target.luk) * stateRate, 0.0);
	}
};

})();
