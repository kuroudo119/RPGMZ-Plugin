/*:
 * @target MZ
 * @plugindesc オートセーブ2個（マップ切替、戦闘後）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param saveFileMap
 * @text マップ切替データ名
 * @desc マップ切替時のオートセーブ表示名です。初期値「マップ」
 * @default マップ
 * 
 * @param saveFileBattle
 * @text バトル後データ名
 * @desc バトル後のオートセーブ表示名です。初期値「バトル」
 * @default バトル
 * 
 * @param setSavefileId
 * @text ファイルID更新
 * @desc オートセーブ時にも最新セーブファイル番号を更新する。初期値「false」
 * @default false
 * @type boolean
 * 
 * @help
# KRD_MZ_DoubleAutoSave.js

オートセーブ2個（マップ切替、戦闘後）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 補足

最新セーブファイル番号はセーブデータに含まれています。
なので、最新ではないファイルをロードすると、
そのファイルが最新である状態が復元されます。

## 更新履歴

- ver.0.0.1 (2022/06/14) 作成開始
- ver.0.1.0 (2022/06/14) 非公開版完成
- ver.1.0.0 (2022/06/15) 公開
- ver.1.1.0 (2022/06/15) 不要なコードを削除
- ver.1.2.0 (2022/06/15) セーブデータ名を設定可能にした
- ver.1.2.1 (2022/06/16) リファクタリングした
- ver.1.2.2 (2022/06/17) 多言語プラグイン対応を不要にしたので削除
- ver.1.3.0 (2022/07/04) パラメータ setSavefileId を追加
- ver.1.4.0 (2023/03/01) 元関数を退避した
- ver.1.5.0 (2023/03/02) 関数を追加

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const SAVE_NAME_MAP = PARAM["saveFileMap"];
const SAVE_NAME_BATTLE = PARAM["saveFileBattle"];

const SET_FILE_ID = PARAM["setSavefileId"] === "true";

const MAP_FILE_ID = 0;
const BATTLE_FILE_ID = 1;
const INIT_FILE_ID = 2;

//--------------------------------------
// 戦闘後オートセーブ

Scene_Battle.prototype.executeAutosave = function() {
	if (SET_FILE_ID) {
		$gameSystem.setSavefileId(BATTLE_FILE_ID);
	}
	$gameSystem.onBeforeSave();
	DataManager.saveGame(BATTLE_FILE_ID)
		.then(() => this.onAutosaveSuccess())
		.catch(() => this.onAutosaveFailure());
};

//--------------------------------------
// マップ移動時も最新セーブファイル番号を更新

const KRD_Scene_Base_executeAutosave = Scene_Base.prototype.executeAutosave;
Scene_Base.prototype.executeAutosave = function() {
	if (SET_FILE_ID) {
		$gameSystem.setSavefileId(MAP_FILE_ID);
	}
	KRD_Scene_Base_executeAutosave.apply(this, arguments);
};

//--------------------------------------
// 最新セーブファイル番号
// 
// セーブがある時はオートセーブ番号を最新にしない

const KRD_DataManager_latestSavefileId = DataManager.latestSavefileId;
DataManager.latestSavefileId = function() {
	const globalInfo = this._globalInfo;
	const validInfo = globalInfo.slice(INIT_FILE_ID).filter(x => x);
	if (validInfo.length > 0) {
		const latest = Math.max(...validInfo.map(x => x.timestamp));
		const index = globalInfo.findIndex(x => x && x.timestamp === latest);
		return index > 0 ? index : 0;
	} else {
		return KRD_DataManager_latestSavefileId.apply(this, arguments);
	}
};

//--------------------------------------
// 表示修正

Window_SavefileList.prototype.isEnabled = function(savefileId) {
	if (this._mode === "save") {
		return savefileId >= INIT_FILE_ID;
	} else {
		return !!DataManager.savefileInfo(savefileId);
	}
};

const KRD_Window_SavefileList_drawTitle = Window_SavefileList.prototype.drawTitle;
Window_SavefileList.prototype.drawTitle = function(savefileId, x, y) {
	if (savefileId < INIT_FILE_ID) {
		if (SAVE_NAME_MAP && SAVE_NAME_BATTLE) {
			if (savefileId === 0) {
				this.drawText(SAVE_NAME_MAP, x, y, 180);
			} else if (savefileId === 1) {
				this.drawText(SAVE_NAME_BATTLE, x, y, 180);
			}
		} else {
			const fileId = savefileId + 1;
			this.drawText(TextManager.autosave + " " + fileId, x, y, 180);
		}
	} else {
		const fileId = savefileId - 1;
		KRD_Window_SavefileList_drawTitle.call(this, fileId, x, y);
	}
};

//--------------------------------------
const KRD_Scene_Save_initialize = Scene_Save.prototype.initialize;
Scene_Save.prototype.initialize = function() {
	KRD_Scene_Save_initialize.apply(this, arguments);
	this._initFileId = this._initFileId || $gameTemp.initFileId();
};

//--------------------------------------
Scene_Save.prototype.firstSavefileId = function() {
	const fileId = $gameSystem.savefileId() ;
	return $gameTemp.isAutoSaveFileId(fileId) ? $gameTemp.initFileId() : fileId;
};

//--------------------------------------
Game_Temp.prototype.isAutoSaveFileId = function(fileId){
	return fileId < $gameTemp.initFileId();
};

Game_Temp.prototype.initFileId = function() {
	return INIT_FILE_ID;
};

//--------------------------------------
})();
