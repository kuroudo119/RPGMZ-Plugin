//==============================================================================
// app.js
// Copyright (c) 2015 - 2020 Douraku
// Released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//==============================================================================

/*:
 * @target MZ
 * @plugindesc アプリケーション専用プラグイン ver1.0.0 キャストタイムゲージを抜粋
 * @author 道楽
 * 
 */

(function (exports) {
	'use strict';

	//--------------------------------------------------------------------------
	/** ColorManager */
	ColorManager.castGaugeColor1 = function() { return this.textColor(14); };
	ColorManager.castGaugeColor2 = function() { return this.textColor(6); };

	//--------------------------------------------------------------------------
	/** Game_Battler */
	Game_Battler.prototype.isTpbCasting = function()
	{
		return this._tpbState === "casting";
	};

	Game_Battler.prototype.tpbCastTime = function()
	{
		return this._tpbCastTime;
	};

	//--------------------------------------------------------------------------
	/** Sprite_Gauge */
	(function () {
		const base = Sprite_Gauge.prototype.currentValue;
		Sprite_Gauge.prototype.currentValue = function()
		{
			return this.isCastingTimeGauge() ? this._battler.tpbCastTime() : base.apply(this, arguments);
		};
	}());

	(function () {
		const base = Sprite_Gauge.prototype.currentMaxValue;
		Sprite_Gauge.prototype.currentMaxValue = function()
		{
			return this.isCastingTimeGauge() ? this._battler.tpbRequiredCastTime() : base.apply(this, arguments);
		};
	}());

	(function () {
		const base = Sprite_Gauge.prototype.gaugeColor1;
		Sprite_Gauge.prototype.gaugeColor1 = function()
		{
			return this.isCastingTimeGauge() ? ColorManager.castGaugeColor1() : base.apply(this, arguments);
		};
	}());

	(function () {
		const base = Sprite_Gauge.prototype.gaugeColor2;
		Sprite_Gauge.prototype.gaugeColor2 = function()
		{
			return this.isCastingTimeGauge() ? ColorManager.castGaugeColor2() : base.apply(this, arguments);
		};
	}());

	Sprite_Gauge.prototype.isCastingTimeGauge = function()
	{
		if ( this._statusType !== "time" )
		{
			return false;
		}
		if ( !this._battler )
		{
			return false;
		}
		if ( !this._battler.isTpbCasting() )
		{
			return false;
		}
		if ( this._battler.tpbRequiredCastTime() <= 0 )
		{
			return false;
		}
		return true;
	};

}((this.app = this.app || {})));
