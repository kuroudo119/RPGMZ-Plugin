/*:
 * @target MZ
 * @plugindesc ダメージゲージ
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @help
 * KRD_MZ_DamageGauge.js
 * (c) 2021 kuroudo119
 * 
 * このプラグインはMITライセンスです。
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * 【更新履歴】
 * ver.1.0.0 (2021/04/24) 初版リリース
 * 
 * 【機能】
 * ダメージを受けるとゲージが増えます。
 * 最大値の時、表示する値が 0 になります。
 * 値が 0 の時、最大値が表示されます。
 * 
 */

(() => {

"use strict";

const KRD_Sprite_Gauge_gaugeRate = Sprite_Gauge.prototype.gaugeRate;
Sprite_Gauge.prototype.gaugeRate = function() {
	if (this._statusType === "time") {
		return KRD_Sprite_Gauge_gaugeRate.apply(this, arguments);
	} else {
		return 1 - KRD_Sprite_Gauge_gaugeRate.apply(this, arguments);
	}
};

Sprite_Gauge.prototype.drawValue = function() {
	const currentValue = this.currentMaxValue() - this.currentValue();
	const width = this.bitmapWidth();
	const height = this.bitmapHeight();
	this.setupValueFont();
	this.bitmap.drawText(currentValue, 0, 0, width, height, "right");
};

})();
