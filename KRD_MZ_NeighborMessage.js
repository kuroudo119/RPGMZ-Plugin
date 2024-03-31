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
 * @desc メッセージを消去するまでのカウントです。1秒60カウント。初期値:100
 * @default 100
 * @type number
 * 
 * @param USE_LENGTH
 * @text 文字数カウント
 * @desc メッセージを消去するまでのカウントに文字数を追加します。1文字あたりのカウントです。初期値:5
 * @default 5
 * @type number
 * 
 * @param FONT_SIZE
 * @text フォントサイズ
 * @desc フォントサイズを変更したい場合に設定します。初期値:0
 * @default 0
 * @type number
 * 
 * @param MINUS_Y
 * @text Y座標補正値
 * @desc ウィンドウの表示位置を上に移動する固定値です。初期値:18
 * @default 18
 * @type number
 * 
 * @command doDTextPicture
 * @text イベントメッセージ表示
 * @desc イベントにメッセージを表示します。自動消去あり。
 * @arg text
 * @text メッセージ
 * @desc 表示するメッセージです。
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

改行したい場合は \n を記述します。

### msgZone

<msgZone:2,1>

メッセージを表示するプレイヤーとイベントの距離を記述します。
複数ページある場合はカンマ区切りで記述します。

省略すると 1 になります。

## プラグインコマンド

### イベントメッセージ表示 (doDTextPicture)

プラグインコマンド実行のタイミングで、
イベントにメッセージを表示します。

タグと同様に自動で消去します。
宝箱の中身を表示する等を想定しています。

## 制約事項

本プラグインでは、動的文字列ピクチャ生成プラグインを利用しています。
そのため、動的文字列ピクチャ生成プラグインの設定に影響します。
本プラグインでは、設定のウィンドウを true にします。

## 更新履歴

- ver.0.0.1 (2024/03/24) 作成開始
- ver.0.1.0 (2024/03/24) 非公開版完成
- ver.1.0.0 (2024/03/24) 公開
- ver.1.0.1 (2024/03/24) ピクチャIDの修正
- ver.1.0.2 (2024/03/25) ヘルプに制約事項を追記
- ver.1.1.0 (2024/03/26) 内部処理を修正
- ver.1.1.1 (2024/03/26) 既存セーブデータに対応
- ver.2.0.0 (2024/03/29) プラグインパラメータなど大きな変更
- ver.2.1.0 (2024/03/31) イベントにメッセージ表示を追加

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const MESSAGE_COUNT = Number(PARAM["MESSAGE_COUNT"]) || 0;
const USE_LENGTH = Number(PARAM["USE_LENGTH"]) || 0;
const FONT_SIZE = Number(PARAM["FONT_SIZE"]) || 0;
const MINUS_Y = Number(PARAM["MINUS_Y"]) || 0;

const ADD_PICTURE_ID = 20;

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

PluginManager.registerCommand(PLUGIN_NAME, "doDTextPicture", function(args) {
	this.doDTextPicture(args.text);
});

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
		this.doDTextPicture(text);
	}
	this._oldPosition = newPosition;
};

Game_Event.prototype.doDTextPicture = function(text) {
	const convText = Window_Base.prototype.convertEscapeCharacters(text);
	const cutRubyText = cutRuby(convText);
	const plusCount = cutRubyText.toString().length * USE_LENGTH;
	this._pictureCount = MESSAGE_COUNT + plusCount;

	const fontSize = FONT_SIZE;
	$gameScreen.setDTextPicture(convText, fontSize);

	const setting = {window: true};
	$gameScreen.setDtextSetting(setting);

	this._msgPictureId = $gameScreen.getMsgPictureId();
	this._msgX = this.screenX();
	this._minusY = this.minusY(cutRubyText);
	this._msgY = this.screenY() - this._minusY;
	$gameScreen.showPicture(this._msgPictureId, NAME, ORIGIN, this._msgX, this._msgY, SCALE_X, SCALE_Y, OPACITY, BLEND_MODE);
};

Game_Event.prototype.minusY = function(text) {
	const line = text.toString().split("\n").length;
	const fontSize = FONT_SIZE || $gameSystem.mainFontSize();
	const msgheight = line * fontSize;

	const sprites = SceneManager._scene._spriteset._characterSprites;
	// 同じ _characterName が複数ある場合に、最初のものを取得するが、
	// 同じ画像なので、同じ height であるはず。
	const sprite = sprites.find(sprite => sprite._characterName === this._characterName);
	const eventHeight = sprite._frame.height;

	return eventHeight + msgheight + MINUS_Y;
};

function cutRuby(text) {
	return typeof KRD_RUBY !== "undefined" ? KRD_RUBY.cutRuby(text) : text;
}

Game_Event.prototype.moveMessage = function() {
	const x = this.screenX();
	const y = this.screenY() - this._minusY;
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
	this.updatePictureCount();
};

Game_Event.prototype.updatePictureCount = function() {
	if (this._pictureCount != null) {
		if (this._pictureCount > 0) {
			this.moveMessage();
			this._pictureCount--;
		} else if (this._pictureCount <= 0) {
			this.eraseMessage();
			this._pictureCount = null;
		}
	}
};

//--------------------------------------

const _Game_Screen_clear = Game_Screen.prototype.clear;
Game_Screen.prototype.clear = function() {
	_Game_Screen_clear.call(this, ...arguments);
	this.initMsgPictureIdList();
};

Game_Screen.prototype.initMsgPictureIdList = function() {
	const maxId = this.maxPictures();
	this._msgPictureIdList = [];
	this._msgPictureIdListMaster = [];
	for (let i = 0; i < ADD_PICTURE_ID; i++) {
		this._msgPictureIdList.push(maxId - i);
		this._msgPictureIdListMaster.push(maxId - i);
	}
};

Game_Screen.prototype.getMsgPictureId = function() {
	if (!this._msgPictureIdList) {
		this.initMsgPictureIdList();
	}
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

Game_Map.prototype.eraseAllMessage = function() {
	this.events().forEach(event => {
		if (event.event().meta[TAG_TEXT] != undefined) {
			event.eraseMessage();
		}
	});
};

const _Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	$gameMap.eraseAllMessage();
	_Scene_Map_terminate.call(this, ...arguments);
};

//--------------------------------------
// イベントにピクチャ付与

Game_Interpreter.prototype.doDTextPicture = function(text) {
	const event = this.character();
	if (event) {
		event.doDTextPicture(text);
	}
};

//--------------------------------------
})();
