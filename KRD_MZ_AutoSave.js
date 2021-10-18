/*:
 * @target MZ
 * @plugindesc オプションに「オートセーブ」を追加
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param argOptionName
 * @text オプション名
 * @desc オプション画面に表示する文字列。
 * @type struct<optionName>
 * 
 * @help
# KRD_MZ_AutoSave.js

オプションに「オートセーブ」を追加

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/10/18) 作成開始
- ver.0.1.0 (2021/10/18) 非公開版完成
- ver.1.0.0 (2021/10/18) 公開

 * 
 * 
 */

/*~struct~optionName:
 * 
 * @param text
 * @text オプション名
 * @desc オプション画面に表示する文字列（多言語プラグイン対応）
 * @default ["オートセーブ"]
 * @type string[]
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const OPTION_NAME = JSON.parse(PARAM["argOptionName"] || null);
const DEFAULT_NAME = "オートセーブ";

//--------------------------------------
// オプション : オートセーブ追加

ConfigManager.autoSave = true;

const KRD_ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = KRD_ConfigManager_makeData.apply(this, arguments);
	config.autoSave = this.autoSave;
	return config;
};

const KRD_ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	KRD_ConfigManager_applyData.apply(this, arguments);
	this.autoSave = this.readFlag(config, "autoSave", true);
};

const KRD_Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
	return KRD_Scene_Options_maxCommands.apply(this, arguments) + 1;
};

const KRD_Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
	KRD_Window_Options_addGeneralOptions.apply(this, arguments);
	try {
		const language = ConfigManager.multilingual || 0;
		const text = JSON.parse(OPTION_NAME.text)[language];
		this.addCommand(text, "autoSave");
	} catch(e) {
		this.addCommand(DEFAULT_NAME, "autoSave");
	}
};

//--------------------------------------
// オートセーブ有効／無効処理

const KRD_Scene_Base_requestAutosave = Scene_Base.prototype.requestAutosave;
Scene_Base.prototype.requestAutosave = function() {
	if (ConfigManager.autoSave) {
		KRD_Scene_Base_requestAutosave.apply(this, arguments);
	}
};

//--------------------------------------
})();
