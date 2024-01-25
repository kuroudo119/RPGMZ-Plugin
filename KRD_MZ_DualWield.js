/*:
 * @target MZ
 * @plugindesc 同じ武器タイプのみ二刀流
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param dualSameWeapon
 * @text 同じ武器タイプのみ二刀流
 * @desc 同じ武器タイプのみ二刀流で装備可能にする：true ／ しない：false
 * @default true
 * @type boolean
 * 
 * @param attackTimesPlus
 * @text 二刀流時攻撃回数追加
 * @desc 二刀流時に2枠とも同じ武器タイプを装備していると攻撃回数+1にする：true ／ しない：false
 * @default false
 * @type boolean
 * 
 * @help
# KRD_MZ_DualWield.js

同じ武器タイプのみ二刀流

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/02/19) 非公開版完成
- ver.1.0.0 (2022/03/09) 公開
- ver.2.0.0 (2023/02/08) 二刀流時に攻撃回数を増やす機能を追加
- ver.2.0.1 (2023/02/08) リファクタリング
- ver.2.1.0 (2023/11/10) ショップシーンは対象外、攻撃回数追加条件変更

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const DUAL_SAME_WEAPON = PARAM["dualSameWeapon"] === "true";
const ATTACK_TIMES_PLUS = PARAM["attackTimesPlus"] === "true";

// -------------------------------------
// 同じ武器タイプのみ二刀流

const _Game_Actor_canEquipWeapon = Game_Actor.prototype.canEquipWeapon;
Game_Actor.prototype.canEquipWeapon = function(item) {
	if (SceneManager._scene.constructor.name === "Scene_Shop") {
		return _Game_Actor_canEquipWeapon.call(this, ...arguments);
	}

	if (DUAL_SAME_WEAPON && this.isDualWield()) {
		const ret = _Game_Actor_canEquipWeapon.call(this, ...arguments);
		const weapon = this.weapons()[0];
		return weapon ? ret && item.wtypeId === weapon.wtypeId : ret;
	}
	return _Game_Actor_canEquipWeapon.call(this, ...arguments);
};

// -------------------------------------
// 二刀流時攻撃回数追加

const _Game_Actor_attackTimesAdd = Game_Actor.prototype.attackTimesAdd;
Game_Actor.prototype.attackTimesAdd = function() {
	if (ATTACK_TIMES_PLUS) {
		const base = _Game_Actor_attackTimesAdd.call(this, ...arguments);
		const plus = this.isAttackTimesPlus() ? 1 : 0;
		return base + plus;
	} else {
		return _Game_Actor_attackTimesAdd.call(this, ...arguments);
	}
};

Game_Actor.prototype.isAttackTimesPlus = function() {
	if (this.isDualWield()) {
		const weapon1 = this.weapons()[0];
		const weapon2 = this.weapons()[1];
		if (weapon1 && weapon2 && weapon1.wtypeId === weapon2.wtypeId) {
			return true;
		}
	}
	return false;
};

// -------------------------------------
})();
