/*:
 * @target MZ
 * @plugindesc ログインボーナス支援
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @command KRD_canGetBonus
 * @text タイマー式ボーナス
 * @desc タイマーの時間経過を確認し、経過している場合スイッチがONになります。
 * 
 * @arg name
 * @text タイマー名
 * @desc 複数タイマーを使い分ける場合の名前です。
 * @default bonus
 * @type string
 * 
 * @arg borderSecond
 * @text 経過秒数
 * @desc ボーナス取得に必要な秒数です。1時間は3600秒。24時間は86400秒です。
 * @default 43200
 * @type number
 * 
 * @arg swBonus
 * @text ボーナススイッチ
 * @desc ボーナス取得可否が入るスイッチです。共用できます。
 * @default 1
 * @type switch
 * 
 * @command KRD_isNewDate
 * @text 時刻リセット式ボーナス
 * @desc 時刻リセット式ボーナスです。その日のボーナスを未取得の場合にスイッチがONになります。
 * 
 * @arg resetHour
 * @text リセット時
 * @desc リセット時刻の「時」です。この時刻を過ぎるとその日のボーナスを受け取れます。
 * @default 0
 * @type number
 * @min 0
 * @max 23
 * 
 * @arg resetMinutes
 * @text リセット分
 * @desc リセット時刻の「分」です。
 * @default 0
 * @type number
 * @min 0
 * @max 59
 * 
 * @arg swBonus
 * @text ボーナススイッチ
 * @desc ボーナス取得可否が入るスイッチです。
 * @default 1
 * @type switch
 * 
 * @help
# KRD_MZ_LoginBonus.js

ログインボーナス支援

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/06/01) 非公開版完成
- ver.1.0.0 (2021/06/01) 公開開始
- ver.1.0.1 (2021/06/18) プラグインコマンド引数のtypeを修正
- ver.1.1.0 (2022/03/26) 時刻リセット式を追加

 * 
 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

//------------------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "KRD_canGetBonus", args => {
	const name = args.name;
	const border  = Number(args.borderSecond) || 0;
	const swBonus = Number(args.swBonus) || 0;
	$gameSwitches.setValue(swBonus, $gameSystem.canGetBonus(border, name));
});

PluginManager.registerCommand(PLUGIN_NAME, "KRD_isNewDate", args => {
	const resetHour = Number(args.resetHour) || 0;
	const resetMinutes = Number(args.resetMinutes) || 0;
	const swBonus = Number(args.swBonus) || 0;
	$gameSwitches.setValue(swBonus, $gameSystem.isNewDate(resetHour, resetMinutes));
});

//------------------------------------------------
// タイマー式

Game_System.prototype.canGetBonus = function(second, name = "bonus") {
	this._oldTime = this._oldTime || {};
	this._oldTime[name] = this._oldTime[name] || 0;
	const millisecond = 1000;
	const border = millisecond * second;
	const newTime = Date.now();
	if ((newTime - this._oldTime[name]) >= border) {
		this._oldTime[name] = newTime;
		return true;
	} else {
		return false;
	}
};

//------------------------------------------------
// 特定時刻リセット式

Game_System.prototype.isNewDate = function(resetHour = 0, resetMinutes = 0) {
	this._last = this._last || 0;
	const now = new Date();
	const today = (new Date(now.getFullYear(), now.getMonth(), now.getDate(), resetHour, resetMinutes)).getTime();
	const tomorrow = (new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, resetHour, resetMinutes)).getTime();
	const border = now.getTime() >= today ? tomorrow : today;

	if (this._last < border) {
		this._last = border;
		return true;
	} else {
		return false;
	}
};

//------------------------------------------------
})();
