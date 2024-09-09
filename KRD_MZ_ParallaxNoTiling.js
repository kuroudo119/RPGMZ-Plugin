/*:
 * @target MZ
 * @plugindesc 遠景画像の繰り返しなし
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_ParallaxNoTiling.js

遠景画像の繰り返しなし

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 使い方

適用したいマップのメモ欄に以下のタグを書いてください。
<noTiling>

## 更新履歴

- ver.0.0.1 (2024/02/08) 作成開始
- ver.0.1.0 (2024/02/08) 非公開版完成
- ver.1.0.0 (2024/09/09) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

const TAG_NO_TILING = "noTiling";

const _Spriteset_Map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	if ($dataMap.meta[TAG_NO_TILING]) {
		this._parallax = new Sprite();
		this._parallax.move(0, 0, Graphics.width, Graphics.height);
		this._baseSprite.addChild(this._parallax);

		this._parallax.origin = {};
		this._parallax.origin.x = 0;
		this._parallax.origin.y = 0;
	} else {
		_Spriteset_Map_createParallax.call(this, ...arguments);
	}
};

const _Spriteset_Map_updateParallax = Spriteset_Map.prototype.updateParallax;
Spriteset_Map.prototype.updateParallax = function() {
	if ($dataMap.meta[TAG_NO_TILING]) {
		if (this._parallaxName !== $gameMap.parallaxName()) {
			this._parallaxName = $gameMap.parallaxName();
			this._parallax.bitmap = ImageManager.loadParallax(this._parallaxName);
		}
 
		if (this._parallax.bitmap) {
			const bitmap = this._parallax.bitmap;
			this._parallax.origin.x = Math.floor((Graphics.width - bitmap.width) / 2);
			this._parallax.origin.y = Math.floor((Graphics.height - bitmap.height) / 2);

			const x = this._parallax.origin.x;
			const y = this._parallax.origin.y;
			this._parallax.move(x, y, bitmap.width, bitmap.height);
		}
	} else {
		_Spriteset_Map_updateParallax.call(this, ...arguments);
	}
};

//--------------------------------------
})();
