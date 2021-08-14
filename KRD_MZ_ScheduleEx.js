/*:
 * @target MZ
 * @plugindesc スケジュール管理：追加機能
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_ScheduleEx.js

スケジュール管理：追加機能

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/08/13) 作成開始
- ver.0.1.0 (2021/08/13) 非公開版完成

 * 
 * 
 */

(() => {

"use strict";

//======================================
// セーブデータある時はニューゲーム選択不可

Window_TitleCommand.prototype.makeCommandList = function() {
	const continueEnabled = this.isContinueEnabled();
	this.addCommand(TextManager.newGame, "newGame", !continueEnabled);
	this.addCommand(TextManager.continue_, "continue", continueEnabled);
	this.addCommand(TextManager.options, "options");
};

//======================================
// セーブデータスロットはオートセーブのみ

DataManager.maxSavefiles = function() {
	return 1;
};

//======================================
// 不要なセーブデータ削減

DataManager.makeSaveContents = function() {
	// A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
	const contents = {};
	contents.system = $gameSystem;
	// contents.screen = $gameScreen;
	// contents.timer = $gameTimer;
	contents.switches = $gameSwitches;
	contents.variables = $gameVariables;
	// contents.selfSwitches = $gameSelfSwitches;
	// contents.actors = $gameActors;
	// contents.party = $gameParty;
	contents.map = $gameMap;
	// contents.player = $gamePlayer;
	return contents;
};

DataManager.extractSaveContents = function(contents) {
	$gameSystem = contents.system;
	// $gameScreen = contents.screen;
	// $gameTimer = contents.timer;
	$gameSwitches = contents.switches;
	$gameVariables = contents.variables;
	// $gameSelfSwitches = contents.selfSwitches;
	// $gameActors = contents.actors;
	// $gameParty = contents.party;
	$gameMap = contents.map;
	// $gamePlayer = contents.player;
};

//======================================
})();
