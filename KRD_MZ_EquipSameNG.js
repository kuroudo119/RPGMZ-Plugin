/*:
 * @target MZ
 * @plugindesc 自動装備での同じ装備品の禁止
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_EquipSameNG.js

自動装備での同じ装備品の禁止

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 機能

最強装備の時に、
メモ欄に <sameNG> とある
同じ装備品を複数装備しないようにします。

スキル習得など、
複数装備しても意味がない場合に使う想定です。

## 更新履歴

- ver.0.0.1 (2024/04/13) 作成開始
- ver.0.1.0 (2024/04/13) 非公開版完成
- ver.1.0.0 (2024/04/13) 公開

 * 
 * 
 */

(() => {

"use strict";

const TAG_SAME_NG = "sameNG";

//--------------------------------------

const _Game_Actor_bestEquipItem = Game_Actor.prototype.bestEquipItem;
Game_Actor.prototype.bestEquipItem = function(slotId) {
	const ngList = this.equips().filter(e => e != null && e.meta[TAG_SAME_NG]);
	if (ngList.length > 0) {
		return this.bestEquipItemSameNG(slotId, ngList);
	} else {
		return _Game_Actor_bestEquipItem.call(this, ...arguments);
	}
};

Game_Actor.prototype.bestEquipItemSameNG = function(slotId, ngList) {
	const etypeId = this.equipSlots()[slotId];
	const items = $gameParty
		.equipItems()
		.filter(item => item.etypeId === etypeId && this.canEquip(item));
	let bestItem = null;
	let bestPerformance = -1000;
	for (let i = 0; i < items.length; i++) {
		const performance = this.calcEquipItemPerformance(items[i]);
		if (performance > bestPerformance) {
			// 下の if を追加
			if (this.checkSameNG(ngList, items[i])) {
				bestPerformance = performance;
				bestItem = items[i];
			}
		}
	}
	return bestItem;
};

Game_Actor.prototype.checkSameNG = function(ngList, item) {
	return !ngList.includes(item);
};

//--------------------------------------
})();
