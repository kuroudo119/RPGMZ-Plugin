/*:
 * @target MZ
 * @plugindesc HP吸収率
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_DrainRate.js

HP吸収率

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 使い方

スキルのメモ欄に <drainRate:50> と記述します。
50 はパーセントです。

## 更新履歴

- ver.0.0.1 (2023/06/23) 作成開始
- ver.0.1.0 (2023/06/23) 非公開版完成

 * 
 * 
 */

(() => {

"use strict";

const DEFAULT_PERCENT = 100;

//--------------------------------------

const KRD_Game_Action_gainDrainedHp = Game_Action.prototype.gainDrainedHp;
Game_Action.prototype.gainDrainedHp = function(value) {
	const percent = Number(this.item().meta.drainRate) || DEFAULT_PERCENT;
	const value2 = Math.floor(value * percent / 100);
	KRD_Game_Action_gainDrainedHp.call(this, value2);
};

//--------------------------------------
})();
