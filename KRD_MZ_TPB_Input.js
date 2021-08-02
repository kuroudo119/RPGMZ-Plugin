/*:
 * @target MZ
 * @plugindesc TPB(ウェイト)コマンド同時入力制御
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_TPB_Input.js

TPB(ウェイト)コマンド同時入力制御

誰かが行動中の時はプレイヤーのコマンド入力をしない
（コマンド入力がキャンセルされる）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/03/06) 非公開版完成
- ver.1.0.0 (2021/08/02) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------
// 誰かが行動中の時はプレイヤーのコマンド入力をしない
// （コマンド入力がキャンセルされる）

BattleManager.isAnyActing = function() {
	return this.allBattleMembers().some(battler => battler.isActing());
};

const KRD_Game_Battler_canInput = Game_Battler.prototype.canInput;
Game_Battler.prototype.canInput = function() {
	if (BattleManager.isTpb() && this.isTpbCharged() && BattleManager.isAnyActing()) {
		return false;
	} else {
		return KRD_Game_Battler_canInput.apply(this, arguments);
	}
};

//--------------------------------------
// コマンド入力時の前進を削除
// （コマンド入力のキャンセルが嫌な時に使う）

// Sprite_Actor.prototype.shouldStepForward = function() {
// 	return this._actor.isActing();
// };

//--------------------------------------
// TPBゲージ初期値を敏捷性のみにする（動作確認用）

// Game_Battler.prototype.initTpbChargeTime = function(advantageous) {
// 	const speed = this.tpbRelativeSpeed();
// 	this._tpbState = "charging";
// 	// this._tpbChargeTime = advantageous ? 1 : speed * Math.random() * 0.5;
// 	this._tpbChargeTime = advantageous ? 1 : speed * 0.5;
// 	if (this.isRestricted()) {
// 		this._tpbChargeTime = 0;
// 	}
// };

//--------------------------------------
})();
