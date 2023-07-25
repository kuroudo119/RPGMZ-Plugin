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
そのイベントにフキダシアイコンが表示されます。

## 使い方

フキダシアイコンを表示させたいマップイベントの
メモ欄に <balloonId:番号> を記述します。
「番号」はフキダシアイコンの番号です。

## 使い方（イベントページ毎にフキダシアイコン変更）

フキダシアイコンを表示させたいマップイベントの
メモ欄に <balloonPage:番号, 番号, 番号…> を記述します。
「番号」はフキダシの番号です。
カンマ区切りでイベントページ番号の順番に記述します。

フキダシを表示しないページは番号の代わりに false を記述してください。

## 使い方（フキダシアイコン表示距離）

前述の balloonPage と併用します。
使用しない場合は、距離 1 となります。

メモ欄に <zonePage:距離, 距離, 距離…> を記述します。
「距離」はイベントとプレイヤーの距離の数値です。
カンマ区切りでイベントページ番号の順番に記述します。

フキダシを表示しないページは範囲として 0 を記述してください。

## 更新履歴

- ver.0.0.1 (2022/07/23) 作成開始
- ver.0.1.0 (2022/07/23) 非公開版完成
- ver.1.0.0 (2022/07/23) 公開
- ver.1.1.0 (2022/07/23) イベント出現条件を満たしていない時は実行しない
- ver.1.2.0 (2022/07/25) イベントページ毎にバルーン変更
- ver.1.2.1 (2022/07/25) parseInt に修正
- ver.1.3.0 (2023/07/25) タグ zonePage を追加、リファクタリング

 * 
 * 
 */

(() => {

"use strict";

const TAG_BALLOON_ID = "balloonId";
const TAG_BALLOON_PAGE = "balloonPage";
const TAG_ZONE_PAGE = "zonePage";

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

	const tagBalloonPage = this.event().meta[TAG_BALLOON_PAGE];
	const tagBalloonId = this.event().meta[TAG_BALLOON_ID];
	const tagZonePage = this.event().meta[TAG_ZONE_PAGE];
	if (tagBalloonPage || tagBalloonId) {
		const balloonPage = tagBalloonPage ? JSON.parse("[" + tagBalloonPage + "]") : null;
		const balloonId = balloonPage ? parseInt(balloonPage[this._pageIndex], 10) : parseInt(tagBalloonId, 10);

		const zonePage = tagZonePage ? JSON.parse("[" + tagZonePage + "]") : null;
		const zone = zonePage ? parseInt(zonePage[this._pageIndex]) : 1;

		this.doBalloon(balloonId, zone);
	}
};

Game_Event.prototype.doBalloon = function(balloonId, zone = 1) {
	if (!isNaN(balloonId)) {
		this._oldPosition = this._oldPosition ? this._oldPosition : false;
		const newPosition = this.playerIsInZone(zone);
		if (newPosition && this._oldPosition !== newPosition) {
			$gameTemp.requestBalloon(this, balloonId);
		}
		this._oldPosition = newPosition;
	}
};

Game_Event.prototype.playerIsInZone = function(zone) {
	return this.distanceToPlayer() <= zone;
};

Game_Event.prototype.distanceToPlayer = function() {
	const diffX = Math.abs(this.x - $gamePlayer.x);
	const diffY = Math.abs(this.y - $gamePlayer.y);
	return diffX + diffY;
};

//--------------------------------------
})();
