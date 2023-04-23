/*:
 * @target MZ
 * @plugindesc オートゲーム（決定ボタン自動押下）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param BORDER
 * @text オート決定時間
 * @desc 自動で決定キーを押す時間です。単位はミリ秒、初期値は 5000 です。
 * @default 5000
 * @type number
 * 
 * @help
# KRD_MZ_AutoGame.js

オートゲーム（決定ボタン自動押下）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2023/04/22) 作成開始
- ver.0.1.0 (2023/04/22) 非公開版完成
- ver.0.2.0 (2023/04/23) リファクタリング
- ver.1.0.0 (2023/04/23) 公開

 * 
 * 
 */

let Sprite_AutoButton = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const BUTTON_Y = 8;
const BUTTON_R = 90;

const BORDER = Number(PARAM["BORDER"]) || 0;

const ENTER_KEY = 13;

//--------------------------------------
Sprite_AutoButton = class extends Sprite_Button {
	update() {
		Sprite_Clickable.prototype.update.call(this);
		this.updateAutoButtonFrame();
	}

	updateAutoButtonFrame() {
		const frame = SceneManager._scene.isAutoMode() ? this._hotFrame : this._coldFrame;
		if (frame) {
			this.setFrame(frame.x, frame.y, frame.width, frame.height);
		}
	}
};

//--------------------------------------
// ボタン表示

const KRD_Scene_Base_create = Scene_Base.prototype.create;
Scene_Base.prototype.create = function() {
	KRD_Scene_Base_create.apply(this, arguments);
};

Scene_Base.prototype.isAutoMode = function() {
	return $gameSystem._autoMode;
};

Scene_Base.prototype.changeAutoMode = function() {
	this._oldTime = Date.now();
	$gameSystem._autoMode = !$gameSystem._autoMode;
	this._autoModeButton.updateAutoButtonFrame();
};

Scene_Base.prototype.createAutoModeButton = function() {
	this._autoModeButton = new Sprite_AutoButton("up2");
	this._autoModeButton.x = Math.floor(Graphics.boxWidth / 2);
	this._autoModeButton.x += Math.floor(this._autoModeButton.blockWidth() / 2);
	this._autoModeButton.y = BUTTON_Y;
	this._autoModeButton.rotation = (BUTTON_R * Math.PI) / 180;
	this._autoModeButton.setClickHandler(this.changeAutoMode.bind(this));
	this.addWindow(this._autoModeButton);
};

const KRD_Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
Scene_Message.prototype.createAllWindows = function() {
	KRD_Scene_Message_createAllWindows.apply(this, arguments);
	this.createAutoModeButton();
};

//--------------------------------------
// ボタン押した時は移動不可

const KRD_Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
	if (SceneManager._scene._autoModeButton._pressed) {
		return false;
	}
	return KRD_Game_Player_canMove.apply(this, arguments);
};

//--------------------------------------
// オート処理

Scene_Base.prototype.autoEnter = function() {
	Input._onKeyDown({keyCode:ENTER_KEY});
	this._inputting = true;
};

Scene_Base.prototype.isBorderOver = function() {
	this._oldTime = this._oldTime ? this._oldTime : Date.now();
	this._newTime = Date.now();
	if (this._newTime - this._oldTime >= BORDER) {
		this._oldTime = this._newTime;
		return true;
	}
	return false;
};

Scene_Base.prototype.updateAutoMode = function() {
	if (this.isAutoMode()) {
		if (this.isBorderOver()) {
			this.autoEnter();
		} else if (this._inputting) {
			Input.clear();
			this._inputting = false;
		}
	}
};

const KRD_Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	KRD_Scene_Map_update.apply(this, arguments);
	this.updateAutoMode();
};

const KRD_Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	KRD_Scene_Battle_update.apply(this, arguments);
	this.updateAutoMode();
};

//--------------------------------------
})();
