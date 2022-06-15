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
- ver.1.1.0 (2022/06/15) 不要なコードを削除
- ver.1.2.0 (2022/06/15) セーブデータ名を設定可能にした

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const SAVE_NAME_MAP = PARAM["saveFileMap"];
const SAVE_NAME_BATTLE = PARAM["saveFileBattle"];

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

Window_SavefileList.prototype.isEnabled = function(savefileId) {
	if (this._mode === "save") {
		return savefileId >= INIT_FILE_ID;
	} else {
		return !!DataManager.savefileInfo(savefileId);
	}
};

Window_SavefileList.prototype.drawTitle = function(savefileId, x, y) {
	if (savefileId < INIT_FILE_ID) {
		if (SAVE_NAME_MAP && SAVE_NAME_BATTLE) {
			if (savefileId === 0) {
				const name = this.getName(SAVE_NAME_MAP);
				this.drawText(name, x, y, 180);
			} else if (savefileId === 1) {
				const name = this.getName(SAVE_NAME_BATTLE);
				this.drawText(name, x, y, 180);
			}
		} else {
			const fileId = savefileId + 1;
			this.drawText(TextManager.autosave + " " + fileId, x, y, 180);
		}
	} else {
		const fileId = savefileId - 1;
		this.drawText(TextManager.file + " " + fileId, x, y, 180);
	}
};

// 多言語プラグイン対応
Window_SavefileList.prototype.getName = function(savefileName) {
	if (typeof KRD_MULTILINGUAL !== "undefined") {
		return KRD_MULTILINGUAL.getLangText(savefileName);
	} else {
		return savefileName;
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
