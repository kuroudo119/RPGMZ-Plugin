/*:
 * @target MZ
 * @plugindesc バトルイベント時ダメージポップアップ
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 ***************************************
 * @command popupParty
 * @text 味方ダメージポップアップ
 * @desc イベントコマンドでHP増減した後にポップアップさせる時に使用する。
 * 
 * @command popupTroop
 * @text 敵ダメージポップアップ
 * @desc イベントコマンドでHP増減した後にポップアップさせる時に使用する。
 ***************************************
 * @help
# KRD_MZ_DamagePopup.js

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/02/19) 非公開版完成
- ver.1.0.0 (2021/06/05) 公開開始

## 使い方

プラグインコマンドを使ってください。

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME	= document.currentScript.src.match(/^.*\/(.*).js$/)[1];

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "popupParty", () => {
	$gameTemp.popupParty();
});

PluginManager.registerCommand(PLUGIN_NAME, "popupTroop", () => {
	$gameTemp.popupTroop();
});

//--------------------------------------
// ダメージポップアップ
// 
// イベントコマンドでのHP回復後などに、
// 以下をスクリプトコマンドで実行する。

Game_Temp.prototype.popupParty = function() {
	const target = $gameParty.battleMembers();
	target.forEach(actor => {
		Window_BattleLog.prototype.popupDamage.call(this, actor); 
	}, this);
};

Game_Temp.prototype.popupTroop = function() {
	const target = $gameTroop.members();
	target.forEach(enemy => {
		Window_BattleLog.prototype.popupDamage.call(this, enemy); 
	}, this);
};

//--------------------------------------
})();
