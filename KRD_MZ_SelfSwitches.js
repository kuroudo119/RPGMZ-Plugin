/*:
 * @target MZ
 * @plugindesc セルフスイッチ一括操作
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param MAP_TAG_LIST
 * @text マップタグ一覧
 * @desc 他マップ処理用にイベント番号を自動取得するタグをカンマ区切りで設定します。余分なスペースは入れないこと。
 * 
 * @command setSelfSwitches
 * @text 一括セルフスイッチ操作
 * @desc 指定タグを持つイベントのセルフスイッチを変更します。
 * @arg alphabet
 * @text アルファベット
 * @desc セルフスイッチのアルファベット A ～ D を指定します。カンマ区切りで複数記述できます。
 * @arg tag
 * @text タグ
 * @desc メモ欄に書いたタグ文字列。
 * @arg value
 * @text 値
 * @desc セルフスイッチON: true ／ OFF: false
 * @type boolean
 * @arg mapIdList
 * @text マップIDリスト
 * @desc 変更したいマップIDの一覧です。カンマ区切りで複数記述できます。未記入時は今いるマップです。
 * 
 * @help
# KRD_MZ_SelfSwitches.js

セルフスイッチ一括操作

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 他マップについて

そのマップに遷移したことがある場合のみ
セルフスイッチ一括操作可能。

## 更新履歴

- ver.0.0.1 (2023/03/31) 作成開始
- ver.0.1.0 (2023/03/31) 非公開版完成
- ver.1.0.0 (2023/04/01) 公開
- ver.2.0.0 (2023/04/11) 他マップを対象にできるようにした
- ver.2.0.1 (2023/05/19) 他マップについての制約事項を追記
- ver.3.0.0 (2023/06/01) 他マップ処理を修正
- ver.3.1.0 (2023/12/18) 複数アルファベットに対応

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const MAP_TAG_LIST = PARAM["MAP_TAG_LIST"] ? PARAM["MAP_TAG_LIST"].split(",") : [];

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "setSelfSwitches", args => {
	$gameTemp.setSelfSwitches(args.alphabet, args.tag, args.value === "true", args.mapIdList);
});

//--------------------------------------
Game_Temp.prototype.setSelfSwitches = function(alphabet, tag, value, argMapIdList) {
	if (argMapIdList) {
		this.setSelfSwitchesSomeMap(...arguments);
	} else {
		this.setSelfSwitchesCurrentMap(...arguments);
	}
};

Game_Temp.prototype.setSelfSwitchesCurrentMap = function(alphabet, tag, value) {
	const mapId = $gameMap.mapId();
	const eventIdList = this.eventIdList(tag);
	const paramAlhabetList = alphabet.split(",");
	for (const eventId of eventIdList) {
		for (const alpha of paramAlhabetList) {
			const key = [mapId, eventId, alpha];
			$gameSelfSwitches.setValue(key, !!value);
		}
	}
};

Game_Temp.prototype.setSelfSwitchesSomeMap = function(alphabet, tag, value, argMapIdList) {
	const paramAlhabetList = alphabet.split(",");
	const paramMapIdList = argMapIdList.split(",");
	for (const paramMapId of paramMapIdList) {
		const data = $gameSystem._eventIdObjectList.find(e => e.mapId === Number(paramMapId) && e.tag === tag);

		if (data) {
			for (const eventId of data.eventIdList) {
				for (const alpha of paramAlhabetList) {
					const key = [data.mapId, eventId, alpha];
					$gameSelfSwitches.setValue(key, !!value);
				}
			}
		}
	}
};

Game_Temp.prototype.eventIdList = function(tag) {
	return $gameMap.events().filter(event => event.event().meta[tag]).map(e => e.eventId());
};

//--------------------------------------
// マップ遷移時イベントID自動登録

const _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	_Scene_Map_start.call(this, ...arguments);
	this.setEventIdObjectList();
};

Scene_Map.prototype.setEventIdObjectList = function() {
	$gameSystem._eventIdObjectList = $gameSystem._eventIdObjectList ? $gameSystem._eventIdObjectList : [];

	for (const tag of MAP_TAG_LIST) {
		if (!$gameSystem._eventIdObjectList.some(e => e.mapId === $gameMap.mapId() && e.tag === tag)) {
			const eventIdList = $gameTemp.eventIdList(tag);
			if (eventIdList.length > 0) {
				$gameSystem._eventIdObjectList.push({
					mapId: $gameMap.mapId(),
					tag: tag,
					eventIdList: eventIdList
				});
			}
		}
	}
};

//--------------------------------------
})();
