/*:
 * @target MZ
 * @plugindesc 敵キャラ逃走時ドロップ
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_EscapeDropItem.js

敵キャラ逃走時ドロップ

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/12/22) 作成開始
- ver.0.1.0 (2021/12/22) 非公開版完成
- ver.1.0.0 (2021/12/22) 公開

## タグ

メモ欄に記述する。
敵キャラ1体に各タグ1つずつ記述可能。

### 通常ドロップアイテムを逃走時にもドロップする

<escapeDropUseRegular>

### 逃走時専用ドロップアイテム

以下の3つを1セットで記述する。

<escapeDropKind:番号>
番号には 1:アイテム, 2:武器, 3:防具 を指定する。

<escapeDropDataId:番号>
番号にはアイテム等の番号を指定する。

<escapeDropDenominator:番号>
番号には「番号分の1」の確率を指定する。

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------
// 基本機能

const KRD_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	KRD_Game_Battler_initMembers.apply(this, arguments);
	this._escaped = false;
};

const KRD_Game_Battler_escape = Game_Battler.prototype.escape;
Game_Battler.prototype.escape = function() {
	KRD_Game_Battler_escape.apply(this, arguments);
	this._escaped = true;
};

Game_Battler.prototype.isEscaped = function() {
	return this._escaped;
};

Game_Unit.prototype.escapeMembers = function() {
	return this.members().filter(member => member.isEscaped());
};

Game_Troop.prototype.makeEscapeDropItems = function() {
	const members = this.escapeMembers();
	return members.reduce((r, enemy) => r.concat(enemy.makeDropItems()), []);
};

const KRD_Game_Troop_makeDropItems = Game_Troop.prototype.makeDropItems;
Game_Troop.prototype.makeDropItems = function() {
	const dead = KRD_Game_Troop_makeDropItems.apply(this, arguments);
	const escaped = this.makeEscapeDropItems();
	return dead.concat(escaped);
};

//--------------------------------------
// 追加機能

const KRD_Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
	const ret = KRD_Game_Enemy_makeDropItems.apply(this, arguments);
	const useRegular = this.enemy().meta.escapeDropUseRegular;
	if (useRegular && this.isEscaped()) {
		return ret.concat(this.makeEscapeDropItems());
	} else if (this.isEscaped()) {
		return this.makeEscapeDropItems();
	} else {
		return ret;
	}
};

Game_Enemy.prototype.makeEscapeDropItems = function() {
	const rate = this.dropItemRate();
	const enemy = this.enemy();
	const kind = Number(enemy.meta.escapeDropKind);
	const dataId = Number(enemy.meta.escapeDropDataId);
	const denominator = Number(enemy.meta.escapeDropDenominator);
	if (kind > 0 && Math.random() * denominator < rate) {
		return this.itemObject(kind, dataId);
	} else {
		return [];
	}
};

//--------------------------------------
})();
