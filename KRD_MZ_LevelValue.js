/*:
 * @target MZ
 * @plugindesc 価格にレベルを反映
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_LevelValue.js

価格にレベルを反映

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

メモ欄に <levelValue> と書いたアイテムの価格を
「設定価格 ＊ パーティ内の最大レベル」
にします。

## 更新履歴

- ver.0.0.1 (2022/03/16) 作成開始
- ver.0.1.0 (2022/03/16) 非公開版完成
- ver.1.0.0 (2022/03/16) 公開

 * 
 * 
 */

(() => {

"use strict";

const KRD_Window_ShopBuy_price = Window_ShopBuy.prototype.price;
Window_ShopBuy.prototype.price = function(item) {
	if (item.meta.levelValue) {
		const actorsLevel = $gameParty.members().map(actor => actor._level);
		const partyMaxLevel = Math.max(...actorsLevel);
		const base = this._price[this._data.indexOf(item)] || 0;
		return base * partyMaxLevel;
	} else {
		return KRD_Window_ShopBuy_price.apply(this, arguments);
	}
};

Game_Temp.prototype.canLevelUp = function(actorId) {
	return !$gameActors.actor(actorId).isMaxLevel();
}

})();
