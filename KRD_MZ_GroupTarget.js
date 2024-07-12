/*:
 * @target MZ
 * @plugindesc グループ（同一敵番号）対象スキル
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_GroupTarget.js

グループ（同一敵番号）対象スキル

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 仕様

アクターが使用したスキル（アイテム）の
「範囲が単体」または「範囲がランダム1体」
かつ、メモ欄に <GroupTarget> がある時、
同じ敵番号をグループとして対象範囲にします。

敵キャラがそのスキル使用した場合、
グループになりません。

尚、対象が既に倒されている場合、
index 0 から順に生存チェックして、
生存している敵キャラ（グループ）に対象が変更されます。

## 更新履歴

- ver.0.0.1 (2023/05/27) 作成開始
- ver.0.1.0 (2023/05/27) 非公開版完成
- ver.1.0.0 (2023/05/27) 公開
- ver.2.0.0 (2023/10/19) metaタグ版に変更

 * 
 * 
 */

(() => {

"use strict";

const GROUP_SCOPE = [1, 3];
const TROOP_MAX_MEMBERS = 8;

const TAG_GROUP_TARGET = "GroupTarget";

//--------------------------------------

const _Game_Action_makeTargets = Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
	if (this.isForEnemyGroup() && this.subject().isActor()) {
			const targets = [];
			targets.push(...this.targetsForGroup());
			for (let i = 0; targets.length === 0 && i < TROOP_MAX_MEMBERS; i++) {
				this.setTarget(i);
				targets.push(...this.targetsForGroup());
			}
			return targets;
	} else {
		return _Game_Action_makeTargets.call(this, ...arguments);
	}
};

Game_Action.prototype.isForEnemyGroup = function() {
	return GROUP_SCOPE.includes(this.item().scope) && !!this.item().meta[TAG_GROUP_TARGET];
};

Game_Action.prototype.targetsForGroup = function() {
	const unit = this.opponentsUnit();
	const aliveMembers = unit.aliveMembers();
	const enemyId = this.isForRandom() ? unit.randomTarget().enemyId() : $gameTroop._enemies[this._targetIndex].enemyId();
	const targets = aliveMembers.filter(target => target.enemyId() === enemyId);
	return targets;
};

//--------------------------------------
})();
