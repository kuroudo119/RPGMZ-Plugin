/*:
 * @target MZ
 * @plugindesc 特定武器限定会心率
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_CriticalWeapon.js

特定武器限定会心率

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 使用方法

武器のメモ欄に <KRD_CriticalRate:99> と記述します。
99 は会心率（パーセント）です。
スキルのメモ欄に <KRD_UseCritical> と記述します。

アクターが <KRD_UseCritical> のあるスキルを使用した場合に、
武器の <KRD_CriticalRate:99> の会心率を加算します。

## 更新履歴

- ver.0.0.1 (2023/02/14) 作成開始
- ver.0.1.0 (2023/02/14) 非公開版完成
- ver.1.0.0 (2023/02/16) 公開

 * 
 * 
 */

(() => {

"use strict";

const KRD_Game_Action_itemCri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function(target) {
	if (this.subject().isActor() && this.item().meta.KRD_UseCritical) {
		const weapons = this.subject().weapons();
		const criticalRate = weapons.reduce((rate, weapon) => rate + Number(weapon.meta.KRD_CriticalRate), 0);
		const base = KRD_Game_Action_itemCri.apply(this, arguments);
		const plus = criticalRate ? criticalRate / 100 : 0;
		return base + plus;
	} else {
		return KRD_Game_Action_itemCri.apply(this, arguments);
	}
};

})();
