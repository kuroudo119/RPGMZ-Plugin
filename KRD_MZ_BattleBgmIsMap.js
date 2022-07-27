/*:
 * @target MZ
 * @plugindesc バトルBGMをマップBGMと同じにする
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_BattleBgmIsMap.js

バトルBGMをマップBGMと同じにする

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/08/16) 作成開始
- ver.0.1.0 (2021/08/16) 非公開版完成
- ver.0.2.0 (2022/07/27) 乗り物に対応
- ver.1.0.0 (2022/07/27) 公開

 * 
 * 
 */

(() => {

"use strict";

const KRD_Game_Map_autoplay = Game_Map.prototype.autoplay;
Game_Map.prototype.autoplay = function() {
	KRD_Game_Map_autoplay.apply(this, arguments);

	if ($dataMap.autoplayBgm) {
		if ($gamePlayer.isInVehicle()) {
			$gameSystem.setBattleBgm(AudioManager._currentBgm);
		} else {
			$gameSystem.setBattleBgm($dataMap.bgm);
		}
	}
};

const KRD_Game_Vehicle_playBgm = Game_Vehicle.prototype.playBgm;
Game_Vehicle.prototype.playBgm = function() {
	KRD_Game_Vehicle_playBgm.apply(this, arguments);
	$gameSystem.setBattleBgm(this.vehicle().bgm);
};

const KRD_Game_System_replayWalkingBgm = Game_System.prototype.replayWalkingBgm;
Game_System.prototype.replayWalkingBgm = function() {
	KRD_Game_System_replayWalkingBgm.apply(this, arguments);
	if (this._walkingBgm) {
		$gameSystem.setBattleBgm(this._walkingBgm);
	}
};

// Play BGM
const KRD_Game_Interpreter_command241 = Game_Interpreter.prototype.command241;
Game_Interpreter.prototype.command241 = function(params) {
	const ret = KRD_Game_Interpreter_command241.apply(this, arguments);
	$gameSystem.setBattleBgm(params[0]);
	return ret;
};

})();
