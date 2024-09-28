/*:
 * @target MZ
 * @plugindesc イベント戦闘でも先制判定
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param VAR_PREEMPTIVE
 * @text 先制攻撃変数
 * @desc この変数の値が正なら先制攻撃、負なら不意打ち。この結果が優先される。
 * @default 0
 * @type variable
 * 
 * @param SW_PREEMPTIVE
 * @text 通常先制判定スイッチ
 * @desc このスイッチがON：先制判定する（先制率アップなどが有効） ／ OFF：先制判定しない
 * @default 0
 * @type switch
 * 
 * @help
# KRD_MZ_Preemptive.js

イベント戦闘でも先制判定

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/02/19) 非公開版完成
- ver.0.1.0 (2021/09/17) 修正開始＆修正完了
- ver.0.2.0 (2024/09/02) 通常の先制判定もできるように修正
- ver.0.2.1 (2024/09/28) 通常先制判定スイッチの常時ONを修正
- ver.1.0.0 (2024/09/28) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const VAR_PREEMPTIVE = Number(PARAM["VAR_PREEMPTIVE"]) || 0;
const SW_PREEMPTIVE = Number(PARAM["SW_PREEMPTIVE"]) || 0;

//--------------------------------------
// バトルシステム：イベントバトルでも先制判定あり

const _BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
	_BattleManager_setup.call(this, ...arguments);

	if (VAR_PREEMPTIVE) {
		this.onEncounterVar($gameVariables.value(VAR_PREEMPTIVE));
	}
	if (SW_PREEMPTIVE && $gameSwitches.value(SW_PREEMPTIVE) && !this._preemptive && !this._surprise) {
		this.onEncounter();
	}
};

BattleManager.onEncounterVar = function(v = 0) {
	this._preemptive = v > 0;
	this._surprise = v < 0 && !this._preemptive;
};

//--------------------------------------
})();
