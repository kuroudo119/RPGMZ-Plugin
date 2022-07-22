/*:
 * @target MZ
 * @plugindesc 隣接時フキダシ表示
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_NeighborBalloon.js

隣接時フキダシ表示

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

プレイヤーの隣にイベントがあると、
そのイベントにフキダシが表示されます。

## 使い方

フキダシを表示させたいマップイベントの
メモ欄に <balloonId:番号> を記述します。
「番号」はフキダシの番号です。

## 更新履歴

- ver.0.0.1 (2022/07/23) 作成開始
- ver.0.1.0 (2022/07/23) 非公開版完成

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------
const KRD_Game_Event_refresh = Game_Event.prototype.refresh;
Game_Event.prototype.refresh = function() {
	KRD_Game_Event_refresh.apply(this, arguments);
	this.doNeighborBalloon();
};

const KRD_Game_Event_updateStop = Game_Event.prototype.updateStop;
Game_Event.prototype.updateStop = function() {
	KRD_Game_Event_updateStop.apply(this, arguments);
	this.doNeighborBalloon();
};

Game_Event.prototype.doNeighborBalloon = function() {
	const balloonId = Number(this.event().meta.balloonId);
	if (!isNaN(balloonId)) {
		this._position = this._position ? this._position : 0;
		const newPosition = this.neighborPlayer();
		if (this._position !== newPosition && newPosition > 0) {
			$gameTemp.requestBalloon(this, balloonId);
		}
		this._position = newPosition;
	}
};

Game_Event.prototype.neighborPlayer = function() {
	if (this.x === $gamePlayer.x && this.y === $gamePlayer.y + 1) {
		// console.log("プレイヤーの下にイベントあるよ！");
		return 2;
	}
	if (this.x === $gamePlayer.x - 1 && this.y === $gamePlayer.y) {
		// console.log("プレイヤーの左にイベントあるよ！");
		return 4;
	}
	if (this.x === $gamePlayer.x + 1 && this.y === $gamePlayer.y) {
		// console.log("プレイヤーの右にイベントあるよ！");
		return 6;
	}
	if (this.x === $gamePlayer.x && this.y === $gamePlayer.y - 1) {
		// console.log("プレイヤーの上にイベントあるよ！");
		return 8;
	}
	return 0;
};

//--------------------------------------
})();
