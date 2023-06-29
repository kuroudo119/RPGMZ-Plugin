/*:
 * @target MZ
 * @plugindesc ステート付与上限数
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param PUSH_OUT_FLAG
 * @text 押し出しフラグ
 * @desc 上限を超える時に古いステートを解除して付与する: true ／ 付与できない: false
 * @default false
 * @type boolean
 * 
 * @param GOOD_STATE_MAX
 * @text 良性ステートの数
 * @desc 良いステートの付与上限数です。
 * @default 2
 * @type number
 * 
 * @param BAD_STATE_MAX
 * @text 悪性ステートの数
 * @desc 悪いステートの付与上限数です。
 * @default 2
 * @type number
 * 
 * @param OTHER_STATE_MAX
 * @text その他ステートの数
 * @desc その他ステートの付与上限数です。
 * @default 1
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

上限を超えて付与される場合、押し出しフラグにより処理されます。

## 使い方

ステートのメモ欄に <goodState> または <badState> と書いてください。
または <otherState> も使えます。

goodState は良性ステート、badState は悪性ステートとして、
otherState はその他ステートとして、
それぞれ数をカウントします。

## 補足

タグ <goodState> <badState> <otherState> を書いてないステートは
上限数に関係なく付与されます。

## 更新履歴

- ver.0.0.1 (2023/06/29) 作成開始
- ver.0.1.0 (2023/06/29) 非公開版完成
- ver.0.2.0 (2023/06/29) ステート優先度に対応
- ver.1.0.0 (2023/06/29) 公開
- ver.1.1.0 (2023/06/30) タグotherState追加、押し出しフラグ追加

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const GOOD_STATE_MAX = Number(PARAM["GOOD_STATE_MAX"]) || 0;
const BAD_STATE_MAX = Number(PARAM["BAD_STATE_MAX"]) || 0;
const OTHER_STATE_MAX = Number(PARAM["OTHER_STATE_MAX"]) || 0;

const GOOD_STATE_TAG = "goodState";
const BAD_STATE_TAG = "badState";
const OTHER_STATE_TAG = "otherState";

const STATE_DATA_LIST = [
	{tag: GOOD_STATE_TAG, max: GOOD_STATE_MAX},
	{tag: BAD_STATE_TAG, max: BAD_STATE_MAX},
	{tag: OTHER_STATE_TAG, max: OTHER_STATE_MAX},
];

const PUSH_OUT_FLAG = PARAM["PUSH_OUT_FLAG"] === "true";

//--------------------------------------
// ステート追加処理

const KRD_Game_Battler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
	let added = false;
	for (const data of STATE_DATA_LIST) {
		if ($dataStates[stateId].meta[data.tag]) {
			this.addStateByCount(stateId, data.tag, data.max);
			added = true;
			break;
		}
	}

	if (!added) {
		KRD_Game_Battler_addState.apply(this, arguments);
	}
};

Game_Battler.prototype.addStateByCount = function(stateId, tag, max) {
	const states = this._states.filter(id => $dataStates[id].meta[tag]);
	if (states.length < max) {
		KRD_Game_Battler_addState.call(this, stateId);
	} else {
		if (PUSH_OUT_FLAG) {
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
	}
};

//--------------------------------------
// ステート優先度の処理

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
