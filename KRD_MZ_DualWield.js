/*:
 * @target MZ
 * @plugindesc 同じ武器タイプのみ二刀流
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_DualWield.js

同じ武器タイプのみ二刀流

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

装備している武器と同じ武器タイプのみ装備可能になります。
武器の特徴で二刀流を設定してください。

尚、武器をすべて外さないと別の武器タイプを装備できません。

## 更新履歴

- ver.0.0.1 (2021/02/19) 非公開版完成
- ver.1.0.0 (2022/03/09) 公開
- ver.1.0.1 (2022/06/26) ヘルプ追記

 * 
 * 
 */

(() => {

"use strict";

const KRD_Game_Actor_canEquipWeapon = Game_Actor.prototype.canEquipWeapon;
Game_Actor.prototype.canEquipWeapon = function(item) {
	const ret = KRD_Game_Actor_canEquipWeapon.apply(this, arguments);
	if (this.isDualWield()) {
		const weapon = this.weapons()[0];
		if (!weapon) {
			return ret;
		}
		return ret && item.wtypeId === weapon.wtypeId;
	}
	return ret;
};

})();
