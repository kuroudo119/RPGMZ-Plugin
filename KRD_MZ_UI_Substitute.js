/*:
 * @target MZ
 * @plugindesc 身代わり表示
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_UI_Substitute.js

身代わり表示

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/04/17) 作成開始
- ver.0.1.0 (2022/04/17) 非公開版完成
- ver.1.0.0 (2022/04/18) 公開

 * 
 * 
 */

(() => {

"use strict";

const KRD_BattleManager_applySubstitute = BattleManager.applySubstitute;
BattleManager.applySubstitute = function(target) {
	const realTarget = KRD_BattleManager_applySubstitute.apply(this, arguments);

	if (this.checkSubstitute(target) && realTarget !== target) {
		target.substituted(realTarget);
		target.requestMotionRefresh();
	}
	return realTarget;
};

Game_Battler.prototype.clearSubstitute = function() {
	this._substitute = null;
};

Game_Battler.prototype.isSubstituting = function() {
	return !!this._substitute;
};

Game_Battler.prototype.substituted = function(substitute) {
	this._substitute = substitute;
};

Game_Battler.prototype.substitute = function() {
	return this._substitute;
};

const KRD_Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
	const actor = this._actor;
	if (actor) {
		if (actor.isSubstituting()) {
			this.startMotion("guard");
			this.substituteMove(actor.substitute());
			actor.clearSubstitute();
		}
	}
	KRD_Sprite_Actor_refreshMotion.apply(this, arguments);
};

Sprite_Actor.prototype.substituteMove = function(substitute) {
	if (substitute) {
		const substituteSprite = this.parent.children.find(child => child._battler === substitute);

		if (substituteSprite) {
			const subX = substituteSprite.x;
			const subY = substituteSprite.y;
			const subW = substituteSprite.width;
			const x = this.x - subX - subW;
			const y = this.y - subY;
			const duration = 12;
			substituteSprite.startMove(x, y, duration);
		}
	}
};

})();
