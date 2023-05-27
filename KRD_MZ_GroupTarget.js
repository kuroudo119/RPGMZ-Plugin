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
「範囲が単体」かつ「連続回数が9」の時、
同じ敵番号をグループとして対象範囲にします。

敵キャラがそのスキル使用した場合、
連続回数を1とします。

尚、対象が既に倒されている場合、
index 0 から順に生存チェックして、
生存している敵キャラ（グループ）に対象が変更されます。

## 更新履歴

- ver.0.0.1 (2023/05/27) 作成開始
- ver.0.1.0 (2023/05/27) 非公開版完成
- ver.1.0.0 (2023/05/27) 公開

 * 
 * 
 */

(() => {

"use strict";

const GROUP_SCOPE = 1;
const GROUP_REPEATS = 9;

const ENEMY_USE_REPEATS = 1;
const TROOP_MAX_MEMBERS = 8;

//--------------------------------------

const KRD_Game_Action_makeTargets = Game_Action.prototype.makeTargets;
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
		return KRD_Game_Action_makeTargets.apply(this, arguments);
	}
};

Game_Action.prototype.targetsForGroup = function() {
	const unit = this.opponentsUnit();
	const aliveMembers = unit.aliveMembers();
	const targets = this.setEnemyGroup(aliveMembers);
	return targets;
};

Game_Action.prototype.isForEnemyGroup = function() {
	return this.item().scope === GROUP_SCOPE && this.item().repeats === GROUP_REPEATS;
};

Game_Action.prototype.setEnemyGroup = function(targets) {
	const enemyId = $gameTroop._enemies[this._targetIndex].enemyId();
	const group = targets.filter(target => target.enemyId() === enemyId);
	return group;
};

const KRD_Game_Action_numRepeats = Game_Action.prototype.numRepeats;
Game_Action.prototype.numRepeats = function() {
	if (this.item().repeats === GROUP_REPEATS) {
		return ENEMY_USE_REPEATS;
	} else {
		return KRD_Game_Action_numRepeats.apply(this, arguments);
	}
};

//--------------------------------------
})();
