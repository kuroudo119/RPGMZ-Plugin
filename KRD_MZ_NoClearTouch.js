/*:
 * @target MZ
 * @plugindesc 敵キャラ透明部分選択なし（敵グループで画像を重ねる時に使う）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_NoClearTouch.js

敵キャラ透明部分選択なし（敵グループで画像を重ねる時に使う）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/01/25) 作成開始
- ver.0.1.0 (2022/01/26) 非公開版完成
- ver.1.0.0 (2022/01/26) 公開
- ver.1.1.0 (2022/01/27) マウスホバー処理修正
- ver.1.1.1 (2022/01/27) マウスホバー処理微修正

 * 
 * 
 */

(() => {

"use strict";

const KRD_Sprite_Enemy_hitTest = Sprite_Enemy.prototype.hitTest;
Sprite_Enemy.prototype.hitTest = function(x, y) {
	const ret = KRD_Sprite_Enemy_hitTest.apply(this, arguments);
	if (ret) {
		if (this._battler.isHidden()) {
			return false;
		}
		if (this._battler.isDead()) {
			return false;
		}
		if (this._battler.isSelected()) {
			if (this._bitmap) {
				const bitmapX = x + this.anchor.x * this.width;
				const bitmapY = y + this.anchor.y * this.height;
				const alpha = Number(this._bitmap.getAlphaPixel(bitmapX, bitmapY));
				if (alpha === 0) {
					return false;
				}
			}
		}
	}
	return ret;
};

const KRD_Sprite_Enemy_onMouseEnter = Sprite_Enemy.prototype.onMouseEnter;
Sprite_Enemy.prototype.onMouseEnter = function() {
	const enemy = this.selectTest();
	if (enemy) {
		$gameTemp.setTouchState(enemy, "select");
	} else {
		KRD_Sprite_Enemy_onMouseEnter.apply(this, arguments);
	}
};

const KRD_Sprite_Enemy_onMouseExit = Sprite_Enemy.prototype.onMouseExit;
Sprite_Enemy.prototype.onMouseExit = function() {
	const enemy = this.selectTest();
	if (enemy) {
		$gameTemp.setTouchState(enemy, "select");
	} else {
		KRD_Sprite_Enemy_onMouseExit.apply(this, arguments);
	}
};

Sprite_Enemy.prototype.selectTest = function() {
	const sprites = SceneManager._scene._spriteset._enemySprites;
	const stack = sprites.filter(sprite => sprite.isBeingTouched());
	if (stack && stack.length > 0) {
		return stack[stack.length - 1]._battler;
	} else {
		return null;
	}
};

})();
