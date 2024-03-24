/*:
 * @target MZ
 * @plugindesc 隣接時メッセージ表示
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @base DTextPicture
 * @base KRD_MZ_NeighborBalloon
 * 
 * @param MESSAGE_COUNT
 * @text メッセージカウント
 * @desc メッセージを消去するまでのカウントです。1秒60カウント。初期値:180
 * @default 180
 * @type number
 * 
 * @param MINUS_Y
 * @text マイナスY座標
 * @desc イベントのY座標から減算する値。初期値:100
 * @default 100
 * @type number
 * 
 * @help
# KRD_MZ_NeighborMessage.js

隣接時メッセージ表示

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 必要プラグイン

以下のプラグインが必要です。

DTextPicture
KRD_MZ_NeighborBalloon

## 使い方

イベントのメモ欄に msgText, msgZone の2つのタグを書きます。
イベントのメモ欄が狭いことに注意してください。

### msgText

<msgText:"テキスト","テキスト2">

表示する文章をクォーテーション（' または "）で囲んで記述します。
複数ページある場合はカンマ区切りで記述します。

### msgZone

<msgZone:2,1>

メッセージを表示するプレイヤーとイベントの距離を記述します。
複数ページある場合はカンマ区切りで記述します。

## 更新履歴

- ver.0.0.1 (2024/03/24) 作成開始
- ver.0.1.0 (2024/03/24) 非公開版完成
- ver.1.0.0 (2024/03/24) 公開
- ver.1.0.1 (2024/03/24) ピクチャIDの修正

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const MESSAGE_COUNT = Number(PARAM["MESSAGE_COUNT"]) || 0;
const MINUS_Y = Number(PARAM["MINUS_Y"]) || 0;

const ADD_PICTURE_ID = 10;

const TAG_TEXT = "msgText";
const TAG_ZONE = "msgZone";

const NAME = "";
const ORIGIN = 1;
const SCALE_X = 100;
const SCALE_Y = 100;
const OPACITY = 255;
const BLEND_MODE = 0;
const DURATION = 1;
const EASING_TYPE = 0;

//--------------------------------------

const _Game_Event_updateStop = Game_Event.prototype.updateStop;
Game_Event.prototype.updateStop = function() {
	_Game_Event_updateStop.call(this, ...arguments);
	this.doNeighborMessage();
};

Game_Event.prototype.doNeighborMessage = function() {
	if (this._pageIndex < 0) {
		return;
	}

	const tagText = this.event().meta[TAG_TEXT];
	const tagZone = this.event().meta[TAG_ZONE];
	const textPage = tagText ? JSON.parse("[" + tagText + "]") : null;
	const zonePage = tagZone ? JSON.parse("[" + tagZone + "]") : null;
	const text = textPage ? textPage[this._pageIndex] : "";
	const zone = zonePage ? parseInt(zonePage[this._pageIndex]) : 1;

	this.doMessage(text, zone);
};

Game_Event.prototype.doMessage = function(text, zone = 1) {
	this._oldPosition = this._oldPosition ? this._oldPosition : false;
	const newPosition = this.playerIsInZone(zone);
	if (text && this._msgPictureId == null && newPosition && this._oldPosition !== newPosition) {
		this._pictureCount = MESSAGE_COUNT;
		const fontSize = 0;
		$gameScreen.setDTextPicture(text, fontSize);
		const setting = {window: true};
		$gameScreen.setDtextSetting(setting);
		this._msgPictureId = $gameScreen.getMsgPictureId();
		this._msgX = this.screenX();
		this._msgY = this.screenY() - MINUS_Y;
		$gameScreen.showPicture(this._msgPictureId, NAME, ORIGIN, this._msgX, this._msgY, SCALE_X, SCALE_Y, OPACITY, BLEND_MODE);
	}
	this._oldPosition = newPosition;
};

Game_Event.prototype.moveMessage = function() {
	const x = this.screenX();
	const y = this.screenY() - MINUS_Y;
	$gameScreen.movePicture(this._msgPictureId, ORIGIN, x, y, SCALE_X, SCALE_Y, OPACITY, BLEND_MODE, DURATION, EASING_TYPE);
};

Game_Event.prototype.eraseMessage = function() {
	$gameScreen.erasePicture(this._msgPictureId);
	$gameScreen.setMsgPictureId(this._msgPictureId);
	this._msgPictureId = null;
};

const _Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
	_Game_Event_update.call(this, ...arguments);
	if (this._pictureCount >= 0) {
		this.moveMessage();
		this._pictureCount--;
	} else if (this._pictureCount < 0) {
		this.eraseMessage();
	}
};

//--------------------------------------

const _Game_Screen_clear = Game_Screen.prototype.clear;
Game_Screen.prototype.clear = function() {
	_Game_Screen_clear.call(this, ...arguments);
	const maxId = this.maxPictures();
	this._msgPictureIdList = [];
	this._msgPictureIdListMaster = [];
	for (let i = 0; i < ADD_PICTURE_ID; i++) {
		this._msgPictureIdList.push(maxId - i);
		this._msgPictureIdListMaster.push(maxId - i);
	}
};

Game_Screen.prototype.getMsgPictureId = function() {
	return this._msgPictureIdList.pop();
};

Game_Screen.prototype.setMsgPictureId = function(id) {
	if (id != null) {
		this._msgPictureIdList.push(id);
	}
};

const _Game_Screen_maxPictures = Game_Screen.prototype.maxPictures;
Game_Screen.prototype.maxPictures = function() {
	return _Game_Screen_maxPictures.call(this, ...arguments) + ADD_PICTURE_ID;
};

//--------------------------------------

Game_Screen.prototype.eraseAllPicture = function() {
	this._msgPictureIdListMaster.forEach(id => {
		this.erasePicture(id);
	}, this);
};

const _Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	$gameScreen.eraseAllPicture();
	_Scene_Map_terminate.call(this, ...arguments);
};

//--------------------------------------
})();
