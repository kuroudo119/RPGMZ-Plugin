/*:
 * @target MZ
 * @plugindesc HP再生とMP再生の両ポップアップ
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param damageFontWidthRate
 * @text ダメージフォント幅
 * @desc ダメージフォントの幅割合。0 の場合はシステム値の 75 を使用。
 * @default 60
 * @type number
 * 
 * @help
# KRD_MZ_HPMPPopup.js

HP再生とMP再生の両ポップアップ

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2023/06/02) 作成開始
- ver.0.1.0 (2023/06/02) 非公開版完成
- ver.1.0.0 (2023/06/02) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const DEFAULT_FONT_WIDTH_RATE = 75;
const FONT_WIDTH_RATE = (Number(PARAM["damageFontWidthRate"]) || DEFAULT_FONT_WIDTH_RATE) / 100;

//--------------------------------------

const KRD_Sprite_Damage_setup = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function(target) {
	const result = target.result();
	if (!(result.missed || result.evaded)
	&& (result.hpAffected && (target.isAlive() && result.mpDamage !== 0))) {
		const colorType = result.hpDamage >= 0 ? 0 : 1;
		const colorType2 = result.mpDamage >= 0 ? 2 : 3;
		const data1 = {value: result.hpDamage, colorType: colorType};
		const data2 = {value: result.mpDamage, colorType: colorType2};
		this.createDigits2(data1, data2);
	} else {
		KRD_Sprite_Damage_setup.apply(this, arguments);
	}
};

Sprite_Damage.prototype.createDigits2 = function(data1, data2) {
	this.createDigitsOneLine(data1.value, data1.colorType, 2, FONT_WIDTH_RATE);
	this.createDigitsOneLine(data2.value, data2.colorType, 1, FONT_WIDTH_RATE);
};

Sprite_Damage.prototype.createDigitsOneLine = function(value, colorType = 0, anchor = 1, fontWidthRate = DEFAULT_FONT_WIDTH_RATE) {
	this._colorType = colorType;
	const string = Math.abs(value).toString();
	const h = this.fontSize();
	const w = Math.floor(h * fontWidthRate);
	for (let i = 0; i < string.length; i++) {
		const sprite = this.createChildSprite(w, h);
		sprite.bitmap.drawText(string[i], 0, 0, w, h, "center");
		sprite.x = (i - (string.length - 1) / 2) * w;
		sprite.anchor.y = anchor;
		sprite.dy = -i;
	}
};

//--------------------------------------
})();
