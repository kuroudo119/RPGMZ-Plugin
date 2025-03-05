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

## 更新履歴

- ver.0.0.1 (2025/03/05) 作成開始
- ver.0.1.0 (2025/03/05) 非公開版完成
- ver.1.0.0 (2025/03/05) 公開

 * 
 * 
 */


(() => {

"use strict";

const TAG_GROUP_2HANDS = "group2Hands";
const TAG_DRAIN_2HANDS = "drain2Hands";

//--------------------------------------

Game_Actor.prototype.hasNoShield = function() {
	return !this.equips()[1];
};

//--------------------------------------

// KRD_MZ_GroupTarget にある関数
const _Game_Action_isForEnemyGroup = Game_Action.prototype.isForEnemyGroup;
Game_Action.prototype.isForEnemyGroup = function() {
	const base = _Game_Action_isForEnemyGroup.call(this, ...arguments);
	const hasTag = !!this.item().meta[TAG_GROUP_2HANDS];
	const twoHands = this.subject().isActor() && this.subject().hasNoShield();
	return base || (hasTag && twoHands);
};

//--------------------------------------

const _Game_Action_isDrain = Game_Action.prototype.isDrain;
Game_Action.prototype.isDrain = function() {
	const base = _Game_Action_isDrain.call(this, ...arguments);
	const hasTag = !!this.item().meta[TAG_DRAIN_2HANDS];
	const twoHands = this.subject().isActor() && this.subject().hasNoShield();
	return base || (hasTag && twoHands);
};

//--------------------------------------
})();
