/*:
 * @target MZ
 * @plugindesc 両手持ちボーナス
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @orderAfter KRD_MZ_GroupTarget
 * 
 * @help
# KRD_MZ_Bonus2Hands.js

両手持ちボーナス

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このソフトウェアはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

### MITライセンス抄訳

1. 利用者はこのソフトウェアを無料で利用することができます。
2. 利用者はこのソフトウェアを改変、再配布することができます。
3. 利用者はこのソフトウェアによる不都合について作者に対し請求できません。
4. このソフトウェアの利用について保証はありません。
5. 作者はこのソフトウェアについての責任を負いません。

## 使い方

### 両手持ち時グループ攻撃

スキルのメモ欄に <group2Hands> と書き、
盾（スロット2）を装備していない時、
グループ対象になります。

KRD_MZ_GroupTarget プラグインが必要です。

### 両手持ち時吸収攻撃

スキルのメモ欄に <drain2Hands> と書き、
盾（スロット2）を装備していない時、
HP吸収になります。

### 両手持ち時会心率アップ

スキルのメモ欄に <critical2Hands:99> と書き、
盾（スロット2）を装備していない時、
会心率が 99% アップします。

### 両手持ち時ステート付与

スキルのメモ欄に 
<state2Hands:12>
<stateRate2Hands:99>
と書き、
盾（スロット2）を装備していない時、
攻撃時にステート 12 を 99% 付与します。
（ステート有効度などの影響あり）

【注意】
使用効果欄に、
ステート付与 0% で構わないので何か設定してください。

## 更新履歴

- ver.0.0.1 (2025/03/05) 作成開始
- ver.0.1.0 (2025/03/05) 非公開版完成
- ver.1.0.0 (2025/03/05) 公開
- ver.1.1.0 (2025/03/06) 公開
- ver.1.1.1 (2025/11/28) 会心率の計算を修正

 * 
 * 
 */

(() => {

"use strict";

const TAG_GROUP_2HANDS = "group2Hands";
const TAG_DRAIN_2HANDS = "drain2Hands";
const TAG_CRITICAL_2HANDS = "critical2Hands";
const TAG_STATE_2HANDS = "state2Hands";
const TAG_STATE_RATE_2HANDS = "stateRate2Hands";

//--------------------------------------

Game_Actor.prototype.hasNoShield = function() {
	return !this.equips()[1];
};

Game_BattlerBase.prototype.isTwoHands = function() {
	return false;
};

Game_Actor.prototype.isTwoHands = function(tag, item) {
	const hasTag = item.meta[tag];
	const twoHands = this.hasNoShield();
	return hasTag && twoHands;
};

Game_BattlerBase.prototype.twoHandsValue = function() {
	return null;
};

Game_Actor.prototype.twoHandsValue = function(tag, item) {
	const value = item.meta[tag];
	const twoHands = this.hasNoShield();
	return twoHands ? value : null;
};

//--------------------------------------

// KRD_MZ_GroupTarget にある関数
const _Game_Action_isForEnemyGroup = Game_Action.prototype.isForEnemyGroup;
Game_Action.prototype.isForEnemyGroup = function() {
	const base = _Game_Action_isForEnemyGroup.call(this, ...arguments);
	const twoHands = this.subject().isTwoHands(TAG_GROUP_2HANDS, this.item());
	return base || twoHands;
};

//--------------------------------------

const _Game_Action_isDrain = Game_Action.prototype.isDrain;
Game_Action.prototype.isDrain = function() {
	const base = _Game_Action_isDrain.call(this, ...arguments);
	const twoHands = this.subject().isTwoHands(TAG_DRAIN_2HANDS, this.item());
	return base || twoHands;
};

//--------------------------------------

const _Game_Action_itemCri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function(target) {
	const base = _Game_Action_itemCri.call(this, ...arguments);
	const value = this.subject().twoHandsValue(TAG_CRITICAL_2HANDS, this.item());
	if (value != null) {
		const cri = (Number(value) || 0) / 100;
		return base + cri;
	} else {
		return base;
	}
};

//--------------------------------------

const _Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect;
Game_Action.prototype.applyItemEffect = function(target, effect) {
	_Game_Action_applyItemEffect.call(this, ...arguments);
	this.itemEffectState2Hands(target);
};

Game_Action.prototype.itemEffectState2Hands = function(target) {
	const value = this.subject().twoHandsValue(TAG_STATE_2HANDS, this.item());
	const value2 = this.subject().twoHandsValue(TAG_STATE_RATE_2HANDS, this.item());
	if (value != null && value2 != null) {
		const stateId = Number(value) || 0;
		const rate = Number(value2) || 0;
		if (stateId > 0 && rate > 0) {
			let chance = rate / 100;
			chance *= target.stateRate(stateId);
			chance *= this.lukEffectRate(target);
			if (Math.random() < chance) {
				target.addState(stateId);
				this.makeSuccess(target);
			}
		}
	}
};

//--------------------------------------
})();
