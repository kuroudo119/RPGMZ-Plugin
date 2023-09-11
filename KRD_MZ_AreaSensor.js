/*:
 * @target MZ
 * @plugindesc エリア感知センサー
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_AreaSensor.js

エリア感知センサー

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

プレイヤーとイベントの距離をチェックするスクリプトを提供するプラグインです。
使用には JavaScript の知識が必要です。

スクリプトは sensePlayer, senseOutPlayer の2種類があります。
前者はイベント範囲内にプレイヤーがいるかどうか、
後者はイベント範囲外にプレイヤーがいるかどうかをチェックします。

それぞれ、引数は距離（縦マス＋横マス）です。

## 使い方の例

### エリア内検知（近づいたらスイッチON）

1. マップイベントのトリガーを並列処理にします。
2. 条件分岐コマンドのスクリプトに this.sensePlayer(3) と書きます。
  上記の 3 は感知エリアのマス数（距離）です。
3. trueの時、スイッチをONにします。

### エリア外検知（離れたらスイッチOFF）

1. 移動ルートの設定のスクリプトに this.senseOutPlayer(6) と書きます。
  上記の 6 は感知エリアのマス数（距離）です。
2. if文を使用して、trueの時、スイッチをOFFにします。

## 更新履歴

- ver.0.0.1 (2023/05/15) 作成開始
- ver.0.1.0 (2023/05/15) 非公開版完成
- ver.0.2.0 (2023/09/11) ループするマップに対応
- ver.1.0.0 (2023/09/11) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

Game_Event.prototype.sensePlayer = function(distance) {
	const vector = this.vector();
	return vector <= distance;
};

Game_Interpreter.prototype.sensePlayer = function(distance) {
	const event = $gameMap.event(this.eventId());
	return event.sensePlayer(distance);
};

//--------------------------------------

Game_Event.prototype.senseOutPlayer = function(distance) {
	const vector = this.vector();
	return vector >= distance;
};

Game_Interpreter.prototype.senseOutPlayer = function(distance) {
	const event = $gameMap.event(this.eventId());
	return event.senseOutPlayer(distance);
};

//--------------------------------------

Game_Event.prototype.vector = function() {
	const px = $gamePlayer.x;
	const py = $gamePlayer.y;
	const diffX = $gameMap.isLoopHorizontal() ? this.vectorX() : Math.abs(this.x - px);
	const diffY = $gameMap.isLoopVertical() ? this.vectorY() : Math.abs(this.y - py);
	return diffX + diffY;
};

Game_Event.prototype.vectorX = function() {
	const px = $gamePlayer.x;
	if (this.x === px) {
		return 0;
	} else if (this.x > px) {
		const diffX = Math.abs(this.x - px);
		const diffXLoop = Math.abs(px + $gameMap.width() - this.x);
		const resultX = Math.min(diffX, diffXLoop);
		return resultX;
	} else {
		const diffX = Math.abs(this.x - px);
		const diffXLoop = Math.abs(this.x + $gameMap.width() - px);
		const resultX = Math.min(diffX, diffXLoop);
		return resultX;
	}
};

Game_Event.prototype.vectorY = function() {
	const py = $gamePlayer.y;
	if (this.y === py) {
		return 0;
	} else if (this.y > py) {
		const diffY = Math.abs(this.y - py);
		const diffYLoop = Math.abs(py + $gameMap.height() - this.y);
		const resultY = Math.min(diffY, diffYLoop);
		return resultY;
	} else {
		const diffY = Math.abs(this.y - py);
		const diffYLoop = Math.abs(this.y + $gameMap.height() - py);
		const resultY = Math.min(diffY, diffYLoop);
		return resultY;
	}
};

//--------------------------------------
})();
