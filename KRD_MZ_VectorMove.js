/*:
 * @target MZ
 * @plugindesc マップ上ベクトル移動
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_VectorMove.js

マップ上ベクトル移動

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/02/04) 作成開始
- ver.0.1.0 (2022/02/04) 非公開版完成（ジャンプのみ）
- ver.1.0.0 (2022/02/04) 公開

## 使い方

「移動ルートの設定」の「スクリプト」欄に、 this.function() と記述します。
function() は以下です。

- jumpToPlayer()
- vectorJump(distance, x, y)
- vectorJumpToPlayer(distance)
- vectorJumpToEvent(distance, eventId)
- vectorJumpToTile(distance, destinationX, destinationY)

distance : 1回の移動で進むベクトルの大きさ

 * 
 * 
 */

(() => {

"use strict";

Game_CharacterBase.prototype.jumpToPlayer = function() {
	const xPlus = $gamePlayer.x - this.x;
	const yPlus = $gamePlayer.y - this.y;
	this.jump(xPlus, yPlus);
};

Game_CharacterBase.prototype.vectorJump = function(distance, x, y) {
	const angle = Math.atan2(y, x);
	const xPlus = distance * Math.cos(angle);
	const yPlus = distance * Math.sin(angle);
	this.jump(xPlus, yPlus);
};

Game_CharacterBase.prototype.vectorJumpToPlayer = function(distance) {
	const x = $gamePlayer.x - this.x;
	const y = $gamePlayer.y - this.y;
	this.vectorJump(distance, x, y);
};

Game_CharacterBase.prototype.vectorJumpToEvent = function(distance, eventId) {
	const event = $gameMap.event(eventId);
	const x = event.x - this.x;
	const y = event.y - this.y;
	this.vectorJump(distance, x, y);
};

Game_CharacterBase.prototype.vectorJumpToTile = function(distance, destinationX, destinationY) {
	const x = destinationX - this.x;
	const y = destinationY - this.y;
	this.vectorJump(distance, x, y);
};

})();
