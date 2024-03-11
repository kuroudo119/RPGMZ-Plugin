/*:
 * @target MZ
 * @plugindesc バトルイベント時ダメージポップアップ
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @command popupParty
 * @text 味方ダメージポップアップ
 * @desc イベントコマンドでHP増減した後にポップアップさせる時に使用する。
 * 
 * @command popupTroop
 * @text 敵ダメージポップアップ
 * @desc イベントコマンドでHP増減した後にポップアップさせる時に使用する。
 * 
 * @help
# KRD_MZ_DamagePopup.js

バトルイベント時ダメージポップアップ

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/02/19) 非公開版完成
- ver.1.0.0 (2021/06/05) 公開開始
- ver.1.0.1 (2021/06/18) コメント部分修正
- ver.1.1.0 (2024/03/11) スキルのコモンイベント以外に対応

## 使い方

イベントコマンドの後に、
プラグインコマンドを使ってください。

スキルのコモンイベント内ではなく、
バトルイベントで使う場合は、
プラグインコマンドの後に、
ウエイトを 1 などで設定してください。

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

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
	$gameParty.members().forEach(target => target.startDamagePopup());
};

Game_Temp.prototype.popupTroop = function() {
	$gameTroop.members().forEach(target => target.startDamagePopup());
};

//--------------------------------------
})();
