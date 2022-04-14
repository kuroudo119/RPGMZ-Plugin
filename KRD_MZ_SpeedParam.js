/*:
 * @target MZ
 * @plugindesc 速度補正能力値加算
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_SpeedParam.js

速度補正能力値加算

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 使い方

速度補正に能力値を加算したいスキルのメモ欄に、
<speedParam:luk>
のように記述します。

上記 luk の部分には atk, def などが使えます。

## 補足

TPBの場合、負の速度補正（キャストタイム）に加算します。
つまり、能力値が高いとキャストタイムが短くなります。

## 更新履歴

- ver.0.0.1 (2022/04/13) 作成開始
- ver.0.1.0 (2022/04/13) 非公開版完成
- ver.0.2.0 (2022/04/14) タグ版に変更して、TPBにも対応。
- ver.1.0.0 (2022/04/14) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------
// TPB

Game_Battler.prototype.tpbRequiredCastTime = function() {
	const actions = this._actions.filter(action => action.isValid());
	const items = actions.map(action => action.item());
	const delay = items.reduce(
		(r, item) => {
			const defaultDelay = r + Math.max(0, -item.speed);
			const plusSpeed = this.plusSpeed(item);
			return defaultDelay - plusSpeed;
		}, 0
	);
	return Math.sqrt(delay) / this.tpbSpeed();
};

//--------------------------------------
// ターン制

// 行動不可の時は action が無く Infinity が入るが、
// これは元々の仕様。
Game_Battler.prototype.makeSpeed = function() {
	this._speed = Math.min(...this._actions.map(
		action => {
			const speed = action.speed();
			const plusSpeed = this.plusSpeed(action.item());
			return speed + plusSpeed;
		}
	)) || 0;
};

//--------------------------------------
// 共通

Game_BattlerBase.prototype.plusSpeed = function(item) {
	const tag = item.meta.speedParam;
	return tag !== undefined ? Math.floor(this[tag]) || 0 : 0;
};

//--------------------------------------
})();
