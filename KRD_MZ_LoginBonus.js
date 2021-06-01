/*:
 * @target MZ
 * @plugindesc ログインボーナス支援
 * @author kuroudo119 (くろうど)
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @command KRD_canGetBonus
 * @text ボーナス受取可否
 * @desc タイマーの時間経過を確認し、経過している場合スイッチがONになります。
 ***
 * @arg name
 * @text タイマー名
 * @desc 複数タイマーを使い分ける場合の名前です。
 * @default bonus
 * @type string
 ***
 * @arg borderSecond
 * @text 経過秒数
 * @desc ログインボーナス発生に必要な秒数です。1時間は3600秒。24時間は86400秒です。
 * @default 43200
 * @type number
 ***
 * @arg swBonus
 * @text ボーナススイッチ
 * @desc ボーナス発生可否を入れるスイッチです。共用できます。
 * @default 1
 * @type switch
 * 
 * @help
# KRD_MZ_LoginBonus.js

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/06/01) 非公開版完成
- ver.1.0.0 (2021/06/01) 公開開始

 * 
 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME	= document.currentScript.src.match(/^.*\/(.*).js$/)[1];

//------------------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "KRD_canGetBonus", args => {
	const name = args.name;
	const border  = Number(args.borderSecond) || 0;
	const swBonus = Number(args.swBonus) || 0;
	$gameSwitches.setValue(swBonus, $gameSystem.canGetBonus(border, name));
});

//------------------------------------------------

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

})();
