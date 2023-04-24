/*:
 * @target MZ
 * @plugindesc 逃走率変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param PLUS_RATIO
 * @text 逃走率加算値
 * @desc 初期逃走率に加算する割合（パーセント）です。初期値: 50
 * @default 50
 * @type number
 * @min -10000
 * 
 * @help
# KRD_MZ_EscapeRatio.js

逃走率変更

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2023/01/01) 作成開始
- ver.0.1.0 (2023/04/24) 非公開版完成
- ver.1.0.0 (2023/04/24) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const PLUS_RATIO = (Number(PARAM["PLUS_RATIO"]) || 0 ) / 100;

//--------------------------------------

const KRD_BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
	KRD_BattleManager_makeEscapeRatio.apply(this, arguments);
	this._escapeRatio += PLUS_RATIO;
};

//--------------------------------------
})();
