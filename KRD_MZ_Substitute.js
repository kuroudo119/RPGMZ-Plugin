/*:
 * @target MZ
 * @plugindesc 身代わり表示
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @orderAfter BattleEffectPopup
 * 
 * @param popupPosition
 * @text ポップアップ位置
 * @desc ダメージポップアップ位置を身代わりキャラの位置とする。
 * @default false
 * @type boolean
 * 
 * @help
# KRD_MZ_Substitute.js

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
- ver.1.1.0 (2022/04/22) ポップアップ位置パラメータ追加。
- ver.1.1.1 (2022/05/03) ファイル名変更
- ver.1.1.2 (2024/12/03) BattleEffectPopup との順序を記述

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const POPUP_POSITION = PARAM["popupPosition"] === "true";

const _BattleManager_applySubstitute = BattleManager.applySubstitute;
BattleManager.applySubstitute = function(target) {
	const realTarget = _BattleManager_applySubstitute.call(this, ...arguments);

	if (this.checkSubstitute(target) && realTarget !== target) {
		target.substituted(realTarget);
		target.requestMotionRefresh();

		if (POPUP_POSITION) {
			$gameTemp.substituted(target);
		}
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

const _Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
	const actor = this._actor;
	if (actor) {
		if (actor.isSubstituting()) {
			this.startMotion("guard");
			this.substituteMove(actor.substitute());
			actor.clearSubstitute();
		}
	}
	_Sprite_Actor_refreshMotion.call(this, ...arguments);
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

//--------------------------------------
// ダメージポップアップ位置を変更

Game_Temp.prototype.isSubstituting = function() {
	return POPUP_POSITION && !!this._substitute;
};

Game_Temp.prototype.substituted = function(target) {
	this._substitute = target;
};

Game_Temp.prototype.clearSubstitute = function() {
	this._substitute = null;
};

Game_Temp.prototype.substitute = function() {
	return this._substitute;
};

const _Sprite_Battler_createDamageSprite = Sprite_Battler.prototype.createDamageSprite;
Sprite_Battler.prototype.createDamageSprite = function() {
	_Sprite_Battler_createDamageSprite.call(this, ...arguments);
	$gameTemp.clearSubstitute();
};

const _Sprite_Actor_createDamageSprite = Sprite_Actor.prototype.createDamageSprite;
Sprite_Actor.prototype.createDamageSprite = function() {
	if ($gameTemp.isSubstituting()) {
		const last = this._damages[this._damages.length - 1];
		const sprite = new Sprite_Damage();
		const target = $gameTemp.substitute();
		const targetSprite = this.parent.children.find(child => child._battler === target);

		if (target && targetSprite) {
			if (last) {
				sprite.x = last.x + 8;
				sprite.y = last.y - 16;
			} else {
				sprite.x = this.x + this.damageOffsetX();
				sprite.y = this.y + this.y - targetSprite.y + this.damageOffsetY();
			}
			sprite.setup(this._battler);
			this._damages.push(sprite);
			this.parent.addChild(sprite);
		}

		$gameTemp.clearSubstitute();
	} else {
		_Sprite_Actor_createDamageSprite.call(this, ...arguments);
	}
};

})();
