/*:
 * @target MZ
 * @plugindesc オートセーブ2個（マップ切替、戦闘後）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_DoubleAutoSave.js

オートセーブ2個（マップ切替、戦闘後）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/06/14) 作成開始
- ver.0.1.0 (2022/06/14) 非公開版完成
- ver.1.0.0 (2022/06/15) 公開

 * 
 * 
 */

(() => {

"use strict";

const BATTLE_FILE_ID = 1;
const INIT_FILE_ID = 2;

//--------------------------------------
// 戦闘後オートセーブ

Scene_Battle.prototype.executeAutosave = function() {
	$gameSystem.onBeforeSave();
	DataManager.saveGame(BATTLE_FILE_ID)
		.then(() => this.onAutosaveSuccess())
		.catch(() => this.onAutosaveFailure());
};

//--------------------------------------
// 表示修正

Window_SavefileList.prototype.indexToSavefileId = function(index) {
	return index + (this._autosave ? 0 : INIT_FILE_ID);
};

Window_SavefileList.prototype.savefileIdToIndex = function(savefileId) {
	return savefileId - (this._autosave ? 0 : INIT_FILE_ID);
};

Window_SavefileList.prototype.isEnabled = function(savefileId) {
	if (this._mode === "save") {
		return savefileId >= INIT_FILE_ID;
	} else {
		return !!DataManager.savefileInfo(savefileId);
	}
};

Window_SavefileList.prototype.drawTitle = function(savefileId, x, y) {
	if (savefileId < INIT_FILE_ID) {
		const fileId = savefileId + 1;
		this.drawText(TextManager.autosave + " " + fileId, x, y, 180);
	} else {
		const fileId = savefileId - 1;
		this.drawText(TextManager.file + " " + fileId, x, y, 180);
	}
};

//--------------------------------------
const KRD_Scene_Save_initialize = Scene_Save.prototype.initialize;
Scene_Save.prototype.initialize = function() {
	KRD_Scene_Save_initialize.apply(this, arguments);
	this._initFileId = this._initFileId ? this._initFileId : INIT_FILE_ID;
};

//--------------------------------------
})();
