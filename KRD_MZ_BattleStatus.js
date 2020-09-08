/*:
 * @target MZ
 * @plugindesc Battle status opacity is zero.
 * @author kuroudo119
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 *
 * @help
 * KRD_MZ_BattleStatus.js
 * (c) 2020 kuroudo119
 * 
 * This is under the MIT License.
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * ver.1 (2020/09/08) 1st Release.
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc バトルステータス透明化
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 *
 * @help
 * KRD_MZ__BattleStatus.js
 * (c) 2020 kuroudo119
 * 
 * このプラグインはMITライセンスです。
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * ver.1 (2020/09/08) 1st Release.
 * 
 * バトルステータスWindowを透明化して、右側に移動させます。
 * これにより、バトル画面を広く使えるようにします。
 * 
 * アクター表示位置、敵キャラ表示位置も変更されます。
 * 
 * バトル画面を変更する他のプラグインと競合する可能性があります。
 * 
 * 現バージョンではカスタマイズ機能はありません。
 * デフォルト解像度（816x624）が対象です。
 * 
 */

(() => {

'use strict';

const statusWindowY = 150;
const enemyWindowY = 150;
const enemyItemHeight = 10;

const actorHomeX = 600;
const actorHomeY = 270;
const actorHomeIndexY = 110;

const enemyHomeRateY = 1.3;
const enemyHomeY = 10;

//--------------------------------------
// バトル画面：バトルステータス縦表示

Scene_Battle.prototype.updateStatusWindowPosition = function() {
	// 使わない関数
};

Scene_Battle.prototype.statusWindowRect = function() {
	const ww = Graphics.boxWidth / 4;
	const wh = Graphics.boxHeight - statusWindowY;
	const wx = Graphics.boxWidth / 4 * 3;
	const wy = statusWindowY;
	return new Rectangle(wx, wy, ww, wh);
};

// バトルステータス表示アクター数
Window_BattleStatus.prototype.maxCols = function() {
	return 1;
};

Window_BattleStatus.prototype.itemHeight = function() {
	return this.innerHeight / 4;
};

Window_BattleStatus.prototype.drawItem = function(index) {
	// this.drawItemImage(index); // 顔画像を非表示
	this.drawItemStatus(index);
};

Window_BattleStatus.prototype.updateBackOpacity = function() {
	this.backOpacity = 0; // 透明化
};

Window_BattleStatus.prototype.showBackgroundDimmer = function() {
	// 使用しない関数
};

Window_BattleStatus.prototype.drawItemBackground = function(index) {
	// 使用しない関数
};

//--------------------------------------
// バトル画面

Scene_Battle.prototype.partyCommandWindowRect = function() {
	const ww = Graphics.boxWidth / 3;
	const wh = this.windowAreaHeight();
	const wx = Graphics.boxWidth / 3;
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.actorCommandWindowRect = function() {
	const ww = Graphics.boxWidth / 3;
	const wh = this.windowAreaHeight();
	const wx = Graphics.boxWidth / 3;
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
};

//--------------------------------------
// バトル画面：敵キャラ選択 Window

Window_BattleEnemy.prototype.maxCols = function() {
	return 1;
};

const KRD_Window_BattleEnemy_itemHeight = Window_BattleEnemy.prototype.itemHeight;
Window_BattleEnemy.prototype.itemHeight = function() {
	return KRD_Window_BattleEnemy_itemHeight.apply(this, arguments) + enemyItemHeight;
};

Scene_Battle.prototype.enemyWindowRect = function() {
	const ww = Graphics.boxWidth / 4;
	const wh = Graphics.boxHeight - enemyWindowY;
	const wx = Graphics.boxWidth / 4 * 3;
	const wy = enemyWindowY;
	return new Rectangle(wx, wy, ww, wh);
};

//--------------------------------------
// バトル画面：コマンド入力

Scene_Battle.prototype.startActorSelection = function() {
	this._actorWindow.refresh();
	this._actorWindow.show();
	this._actorWindow.activate();
	this._skillWindow.hide();
	this._itemWindow.hide();
};

Scene_Battle.prototype.onActorCancel = function() {
	this._actorWindow.hide();
	switch (this._actorCommandWindow.currentSymbol()) {
		case "skill":
			this._skillWindow.show();
			this._skillWindow.activate();
			break;
		case "item":
			this._itemWindow.show();
			this._itemWindow.activate();
			break;
	}
};

Scene_Battle.prototype.startEnemySelection = function() {
	this._enemyWindow.refresh();
	this._enemyWindow.show();
	this._enemyWindow.select(0);
	this._enemyWindow.activate();
	this._statusWindow.hide();
	this._actorCommandWindow.hide();
	this._skillWindow.hide();
	this._itemWindow.hide();
};

Scene_Battle.prototype.onEnemyCancel = function() {
	this._enemyWindow.hide();
	switch (this._actorCommandWindow.currentSymbol()) {
		case "attack":
			this._statusWindow.show();
			this._actorCommandWindow.show();
			this._actorCommandWindow.activate();
			break;
		case "skill":
			this._skillWindow.show();
			this._skillWindow.activate();
			break;
		case "item":
			this._itemWindow.show();
			this._itemWindow.activate();
			break;
	}
};

//--------------------------------------
// バトル画面：表示位置

Sprite_Actor.prototype.setActorHome = function(index) {
	this.setHome(actorHomeX, actorHomeY + index * actorHomeIndexY);
};

Sprite_Enemy.prototype.setHome = function(x, y) {
	this._homeX = x;
	this._homeY = y * enemyHomeRateY + enemyHomeY;
	this.updatePosition();
};

//--------------------------------------
})();
