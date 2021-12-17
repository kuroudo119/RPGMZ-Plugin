/*:
 * @target MZ
 * @plugindesc ゲームパッドABボタン入替
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
# KRD_MZ_Gamepad.js

ゲームパッドABボタン入替

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/12/17) 作成開始
- ver.0.1.0 (2021/12/17) 非公開版完成
- ver.1.0.0 (2021/12/17) 公開

 * 
 * 
 */

/*~struct~optionName:
 * 
 * @param text
 * @text オプション名
 * @desc オプション画面に表示する文字列（多言語プラグイン対応）
 * @default ["パッドABボタン入替"]
 * @type string[]
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const OPTION_NAME = JSON.parse(PARAM["argOptionName"] || null);
const DEFAULT_NAME = "パッドABボタン入替";

//--------------------------------------
// オプション : メニューボタン・キャンセルボタン表示位置

ConfigManager.changeGamepad = false;

const KRD_ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = KRD_ConfigManager_makeData.apply(this, arguments);
	config.changeGamepad = this.changeGamepad;
	return config;
};

const KRD_ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	KRD_ConfigManager_applyData.apply(this, arguments);
	this.changeGamepad = this.readFlag(config, "changeGamepad");
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
		this.addCommand(text, "changeGamepad");
	} catch(e) {
		this.addCommand(DEFAULT_NAME, "changeGamepad");
	}
};

//--------------------------------------
const gamepadMapperDefault = {
	0: "ok", // A
	1: "cancel", // B
	2: "shift", // X
	3: "menu", // Y
	4: "pageup", // LB
	5: "pagedown", // RB
	12: "up", // D-pad up
	13: "down", // D-pad down
	14: "left", // D-pad left
	15: "right" // D-pad right
};

const gamepadMapperChangeAB = {
	0: "cancel", // A
	1: "ok", // B
	2: "shift", // X
	3: "menu", // Y
	4: "pageup", // LB
	5: "pagedown", // RB
	12: "up", // D-pad up
	13: "down", // D-pad down
	14: "left", // D-pad left
	15: "right" // D-pad right
};

Input.changeGamepad = function() {
	if (ConfigManager.changeGamepad) {
		this.gamepadMapper = gamepadMapperChangeAB;
	} else {
		this.gamepadMapper = gamepadMapperDefault;
	}
	this._latestButton = null;
};

const KRD_Scene_Options_terminate = Scene_Options.prototype.terminate;
Scene_Options.prototype.terminate = function() {
	KRD_Scene_Options_terminate.apply(this, arguments);
	Input.changeGamepad();
};

const KRD_Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
	KRD_Scene_Title_create.apply(this, arguments);
	Input.changeGamepad();
};

//--------------------------------------
})();
