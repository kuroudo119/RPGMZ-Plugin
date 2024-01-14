/*:
 * @target MZ
 * @plugindesc 盾回避
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param ANIMATON_ID
 * @text アニメーション番号
 * @desc 盾回避時に表示するアニメーションの番号です。
 * @type animation
 * 
 * @help
# KRD_MZ_ShieldBlock.js

盾回避

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

盾の回避率を別途設定し、
回避した場合にアニメーションを表示させるプラグインです。

## 使い方

物理回避したい盾のメモ欄に以下を記述します。
<ShieldBlock:50>
50は本プラグイン用の回避率

魔法回避したい盾のメモ欄に以下を記述します。
<BarrierBlock:50>
50は本プラグイン用の魔法回避率

## 更新履歴

- ver.0.0.1 (2024/01/12) 作成開始
- ver.0.1.0 (2024/01/12) 非公開版完成
- ver.1.0.0 (2024/01/12) 公開
- ver.1.0.1 (2024/01/14) 誤字修正

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const TAG_SHIELD = "ShieldBlock";
const TAG_BARRIER = "BarrierBlock";

const SHIELD_SLOT = 1;
const ANIMATON_ID = Number(PARAM["ANIMATON_ID"]) || 0;

//--------------------------------------
// 処理

// 上書き
Game_Action.prototype.apply = function(target) {
	const result = target.result();
	this.subject().clearResult();
	result.clear();
	result.used = this.testApply(target);
	result.missed = result.used && Math.random() >= this.itemHit(target);
	result.evaded = !result.missed && Math.random() < this.itemEva(target);
	result.physical = this.isPhysical();
	result.drain = this.isDrain();
	this.block(target, result);
	if (result.isHit()) {
		 if (this.item().damage.type > 0) {
			  result.critical = Math.random() < this.itemCri(target);
			  const value = this.makeDamageValue(target, result.critical);
			  this.executeDamage(target, value);
		 }
		 for (const effect of this.item().effects) {
			  this.applyItemEffect(target, effect);
		 }
		 this.applyItemUserEffect(target);
	}
	this.updateLastTarget(target);
};

const _Game_ActionResult_isHit = Game_ActionResult.prototype.isHit;
Game_ActionResult.prototype.isHit = function() {
	const base = _Game_ActionResult_isHit.call(this, ...arguments);
	return base && !this.blocked;
};

// 新規作成
Game_Action.prototype.block = function(target, result) {
	result.blocked = false;
	if (!result.missed && !result.evaded) {
		if (this.isPhysical()) {
			result.blocked = this.blocking(target, TAG_SHIELD);
		} else if (this.isMagical()) {
			result.blocked = this.blocking(target, TAG_BARRIER);
		}
	}
	if (result.blocked) {
		BattleManager._logWindow.push("showAnimation", this.subject(), [target], ANIMATON_ID);
	}
};

// 新規作成
Game_Action.prototype.blocking = function(target, tag) {
	if (target.isActor()) {
		const shield = target.equips()[SHIELD_SLOT];
		const blockPoint = shield?.meta[tag];
		const blockRate = (Number(blockPoint) / 100) || 0;
		return Math.random() < blockRate;
	} else {
		return false;
	}
};

//--------------------------------------
})();
