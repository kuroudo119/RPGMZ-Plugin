/*:
 * @target MZ
 * @plugindesc ステート付与上限数
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param GOOD_STATE
 * @text 良性ステートの数
 * @desc 良いステートの付与上限数です。
 * @default 2
 * @type number
 * 
 * @param BAD_STATE
 * @text 悪性ステートの数
 * @desc 悪いステートの付与上限数です。
 * @default 3
 * @type number
 * 
 * @help
# KRD_MZ_StateMaxCount.js

ステート付与上限数

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

ステートの付与数に上限を設定します。
上限を超えて付与される場合、古いステートが解除されます。

## 使い方

ステートのメモ欄に <goodState> または <badState> と書いてください。

goodState は良性ステート、badState は悪性ステートとして、
それぞれ数をカウントします。

## 補足

タグ <goodState> <badState> を書いてないステートは
上限数に関係なく付与されます。

## 更新履歴

- ver.0.0.1 (2023/06/29) 作成開始
- ver.0.1.0 (2023/06/29) 非公開版完成
- ver.0.2.0 (2023/06/29) ステート有効度に対応
- ver.1.0.0 (2023/06/29) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const GOOD_STATE = Number(PARAM["GOOD_STATE"]) || 0;
const BAD_STATE = Number(PARAM["BAD_STATE"]) || 0;

const GOOD_STATE_TAG = "goodState";
const BAD_STATE_TAG = "badState";

//--------------------------------------

const KRD_Game_Battler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
	const goodState = $dataStates[stateId].meta[GOOD_STATE_TAG];
	const badState = $dataStates[stateId].meta[BAD_STATE_TAG];
	if (goodState) {
		this.addStateByCount(stateId, GOOD_STATE_TAG, GOOD_STATE);
	} else if (badState) {
		this.addStateByCount(stateId, BAD_STATE_TAG, BAD_STATE);
	} else {
		KRD_Game_Battler_addState.apply(this, arguments);
	}
};

Game_Battler.prototype.addStateByCount = function(stateId, tag, max) {
	const states = this._states.filter(id => $dataStates[id].meta[tag]);
	if (states.length < max) {
		KRD_Game_Battler_addState.call(this, stateId);
	} else {
		if (this.isStateAddable(stateId)) {
			if (!this.isStateAffected(stateId)) {
				const erased = states.shift();
				this.eraseState(erased);

				this.addNewState(stateId);
				this.refresh();
			}
			this.resetStateCounts(stateId);
			this._result.pushAddedState(stateId);
		}
	}
};

// 上書き
Game_BattlerBase.prototype.sortStates = function(states) {
	// ステート付与順序が変わるので通常（引数なし）は使用しない
	if (states) {
		states.sort((a, b) => {
			const p1 = $dataStates[a].priority;
			const p2 = $dataStates[b].priority;
			if (p1 !== p2) {
				return p2 - p1;
			}
			return a - b;
		});
	}
};

// 上書き
Game_BattlerBase.prototype.stateOverlayIndex = function() {
	const base = this._states.map(id => id);
	this.sortStates(base);
	const states = base.map(id => $dataStates[id]);

	if (states.length > 0) {
		 return states[0].overlay;
	} else {
		 return 0;
	}
};

//--------------------------------------
})();
