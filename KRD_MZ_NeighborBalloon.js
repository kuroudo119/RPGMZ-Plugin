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

## 使い方（イベントページ毎にバルーン変更）

フキダシを表示させたいマップイベントの
メモ欄に <balloonPage:番号, 番号, 番号…> を記述します。
「番号」はフキダシの番号です。
カンマ区切りでイベントページ番号の順番に記述します。

フキダシを表示しないページは番号の代わりに false を記述してください。

## 更新履歴

- ver.0.0.1 (2022/07/23) 作成開始
- ver.0.1.0 (2022/07/23) 非公開版完成
- ver.1.0.0 (2022/07/23) 公開
- ver.1.1.0 (2022/07/23) イベント出現条件を満たしていない時は実行しない。
- ver.1.2.0 (2022/07/25) イベントページ毎にバルーン変更。
- ver.1.2.1 (2022/07/25) parseInt に修正。

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
	if (this._pageIndex < 0) {
		return;
	}

	const tagBalloonPage = this.event().meta.balloonPage;
	const tagBalloonId = this.event().meta.balloonId;
	if (tagBalloonPage || tagBalloonId) {
		const balloonPage = tagBalloonPage ? JSON.parse("[" + tagBalloonPage + "]") : null;
		const balloonId = balloonPage ? parseInt(balloonPage[this._pageIndex], 10) : parseInt(tagBalloonId, 10);

		this.doBalloon(balloonId);
	}
};

Game_Event.prototype.doBalloon = function(balloonId) {
	if (!isNaN(balloonId)) {
		this._oldPosition = this._oldPosition ? this._oldPosition : 0;
		const newPosition = this.neighborPlayer();
		if (this._oldPosition !== newPosition && newPosition > 0) {
			$gameTemp.requestBalloon(this, balloonId);
		}
		this._oldPosition = newPosition;
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
