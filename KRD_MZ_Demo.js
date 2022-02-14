/*:
 * @target MZ
 * @plugindesc デモ用マップ自動スタート（タイトルデモ）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param seconds
 * @text デモ開始秒数
 * @desc タイトル画面で放置した時に、デモを開始する秒数。
 * @default 30
 * @type number
 * 
 * @param demoMap
 * @text デモ用マップ情報
 * 
 * @param demoMapId
 * @text マップID
 * @desc デモ用マップのマップ番号。値が無い場合はニューゲームと同じになります。
 * @default 1
 * @type number
 * @parent demoMap
 * 
 * @param demoStartX
 * @text 初期位置X
 * @desc デモ用マップのプレイヤー初期位置のX座標。値が無い場合はニューゲームと同じになります。
 * @default 0
 * @type number
 * @parent demoMap
 * 
 * @param demoStartY
 * @text 初期位置Y
 * @desc デモ用マップのプレイヤー初期位置のY座標。値が無い場合はニューゲームと同じになります。
 * @default 0
 * @type number
 * @parent demoMap
 * 
 * @help
# KRD_MZ_Test.js

デモ用マップ自動スタート（タイトルデモ）

タイトル画面で放置するとデモ用マップが自動スタートします。
デモ用マップは自動実行イベントで作成し、最後に「タイトル画面に戻す」想定です。

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/02/13) 作成開始
- ver.0.1.0 (2022/02/14) 非公開版完成
- ver.1.0.0 (2022/02/14) 公開

## 仕様メモ

デモ用マップでは、オートセーブされません。
ただし、デモ用マップから移動した場合は元の設定によります。

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const SECONDS = Number(PARAM["seconds"]) || 0;
const BORDER = SECONDS * 1000;

const DEMO_MAP_ID = Number(PARAM["demoMapId"]) || NaN;
const DEMO_START_X = Number(PARAM["demoStartX"]) ?? NaN;
const DEMO_START_Y = Number(PARAM["demoStartY"]) ?? NaN;

const KRD_Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function() {
	KRD_Scene_Title_start.apply(this, arguments);
	this._oldTime = Date.now();
	this._start = false;
};

const KRD_Scene_Title_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	const newTime = Date.now();
	if (!this._start && newTime - this._oldTime > BORDER) {
		this._start = true;
		this.startDemo();
		Scene_Base.prototype.update.call(this);
	} else {
		KRD_Scene_Title_update.apply(this, arguments);
	}
};

Scene_Title.prototype.startDemo = function() {
	DataManager.setupDemo();
	this._commandWindow.close();
	this.fadeOutAll();
	SceneManager.goto(Scene_Map);
};

DataManager.setupDemo = function() {
	this.createGameObjects();
	this.selectSavefileForNewGame();
	$gameParty.setupStartingMembers();
	$gamePlayer.setupForDemo();
	Graphics.frameCount = 0;
};

Game_Player.prototype.setupForDemo = function() {
	const mapId = isNaN(DEMO_MAP_ID) ? $dataSystem.startMapId : DEMO_MAP_ID;
	const x = isNaN(DEMO_START_X) ? $dataSystem.startX : DEMO_START_X;
	const y = isNaN(DEMO_START_Y) ? $dataSystem.startY : DEMO_START_Y;
	this.reserveTransfer(mapId, x, y, 2, 0);
};

const KRD_Scene_Base_isAutosaveEnabled = Scene_Base.prototype.isAutosaveEnabled;
Scene_Base.prototype.isAutosaveEnabled = function() {
	return KRD_Scene_Base_isAutosaveEnabled.apply(this, arguments)
		&& $gameMap.mapId() !== DEMO_MAP_ID;
};

})();
