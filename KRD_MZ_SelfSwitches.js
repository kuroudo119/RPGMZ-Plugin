/*:
 * @target MZ
 * @plugindesc セルフスイッチ一括操作
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @command setSelfSwitches
 * @text 一括セルフスイッチ操作
 * @desc 指定タグを持つイベントのセルフスイッチを変更します。
 * @arg alphabet
 * @text アルファベット
 * @desc セルフスイッチのアルファベット A ～ D を指定します。
 * @arg tag
 * @text タグ
 * @desc メモ欄に書いたタグ文字列。
 * @arg value
 * @text 値
 * @desc セルフスイッチON: true ／ OFF: false
 * @type boolean
 * 
 * @help
# KRD_MZ_SelfSwitches.js

セルフスイッチ一括操作

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2023/03/31) 作成開始
- ver.0.1.0 (2023/03/31) 非公開版完成
- ver.1.0.0 (2023/04/01) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "setSelfSwitches", args => {
	$gameTemp.setSelfSwitches(args.alphabet, args.tag, args.value === "true");
});

//--------------------------------------
Game_Temp.prototype.setSelfSwitches = function(alphabet, tag, value) {
	const eventIdList = this.eventIdList(tag);
	const mapId = $gameMap.mapId();

	eventIdList.forEach(eventId => {
		const key = [mapId, eventId, alphabet];
		$gameSelfSwitches.setValue(key, !!value);
	}, this);
};

Game_Temp.prototype.eventIdList = function(tag) {
	return $gameMap.events().filter(event => event.event().meta[tag]).map(e => e.eventId());
};

//--------------------------------------
})();
