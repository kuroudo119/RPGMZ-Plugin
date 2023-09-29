/*:
 * @target MZ
 * @plugindesc HP回避率連動
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_HpDodge.js.js

HP回避率連動

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

指定した敵キャラにおいて、HPの最大HPの割合が高いと回避率が高くなります。

つまり、敵キャラに魔法などでダメージを与える事で、
だんだん物理攻撃が命中するようになります。

## 使い方

### HpDodgeRate

HP回避率連動したい敵キャラのメモ欄に
<HpDodgeRate:999> と書きます。

999 はHPの最大HPとの割合（パーセント）です。
100 の場合、HP100%で回避率+100%です。
100 の場合、HP50%で回避率+50%です。
50 の場合、HP100%で回避率+50%です。
50 の場合、HP50%で回避率+25%です。

### HpDodgeBorder

HP回避率連動を打ち切りたい場合、
敵キャラのメモ欄に追加で
<HpDodgeBorder:99> と書くことができます。

99 はHPの最大HPとの割合（パーセント）です。
50 の場合、HP50%で回避率の追加がなくなります。
25 の場合、HP25%で回避率の追加がなくなります。

つまり、
<HpDodgeRate:80>
<HpDodgeBorder:25>
と設定した場合、
HP100%で回避率+80%です。
HP75%で回避率+60%です。
HP50%で回避率+40%です。
HP26%で回避率+20.8%です。
HP25%で回避率の追加なしです。

## 更新履歴

- ver.0.0.1 (2023/09/29) 作成開始
- ver.0.1.0 (2023/09/29) 非公開版完成
- ver.1.0.0 (2023/09/29) 公開

 * 
 * 
 */

(() => {

"use strict";

const HP_DODGE_RATE_TAG = "HpDodgeRate";
const HP_DODGE_BORDER_TAG = "HpDodgeBorder";

//--------------------------------------

Game_Battler.prototype.hpDodgeRate = function() {
	return 0;
};

Game_Enemy.prototype.hpDodgeRate = function() {
	return Number(this.enemy().meta[HP_DODGE_RATE_TAG] / 100) || 0;
};

Game_Battler.prototype.hpDodgeBorder = function() {
	return 0;
};

Game_Enemy.prototype.hpDodgeBorder = function() {
	return Number(this.enemy().meta[HP_DODGE_BORDER_TAG] / 100);
};

Game_Battler.prototype.hpDodge = function() {
	return 0;
};

Game_Enemy.prototype.hpDodge = function() {
	const hp = this.hp;
	const mhp = this.mhp;
	const hpRate = hp / mhp;
	const rate = this.hpDodgeRate();
	const border = this.hpDodgeBorder();
	const result = rate * hpRate;
	if (isNaN(border)) {
		return result;
	} else {
		if (hpRate >= border) {
			return result;
		} else {
			return 0;
		}
	}
};

//--------------------------------------

Object.defineProperties(Game_Enemy.prototype, {
	// EVAsion rate
	eva: {
		get: function() {
			return this.xparam(1) + this.hpDodge();
		},
		configurable: true
	}
});

//--------------------------------------
})();
