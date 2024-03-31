/*:
 * @target MZ
 * @plugindesc ピクチャ自動消去
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @command setEraseTimer
 * @text 消去タイマー設定
 * @desc ピクチャ消去するカウントを設定します。
 * @arg pictureId
 * @text ピクチャ番号
 * @desc カウントを設定するピクチャの番号です。
 * @default 0
 * @type number
 * @arg count
 * @text カウント
 * @desc ピクチャを消去するカウントです。1秒60カウント。初期値:120
 * @default 120
 * @type number
 * 
 * @help
# KRD_MZ_PictureAutoErase.js

ピクチャ自動消去

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2024/03/31) 作成開始
- ver.0.1.0 (2024/03/31) 非公開版完成
- ver.1.0.0 (2024/03/31) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

PluginManager.registerCommand(PLUGIN_NAME, "setEraseTimer", function(args) {
	const pictureId = Number(args.pictureId);
	const count = Number(args.count);
	$gameScreen.setEraseTimer(pictureId, count);
});

//--------------------------------------

Game_Screen.prototype.setEraseTimer = function(pictureId, count) {
	const picture = this.picture(pictureId);
	if (picture) {
		picture.setEraseTimer(count);
	}
};

Game_Picture.prototype.setEraseTimer = function(count) {
	this._eraseCount = count;
};

//--------------------------------------

const _Game_Screen_updatePictures = Game_Screen.prototype.updatePictures;
Game_Screen.prototype.updatePictures = function() {
	_Game_Screen_updatePictures.call(this, ...arguments);
	const pictureIdList = Object.keys(this._pictures);
	pictureIdList.forEach(pid => {
		const picture = this.picture(pid);
		if (picture && picture.shouldErase() ) {
			this.erasePicture(pid);
		}
	}, this);
};

//--------------------------------------

const _Game_Picture_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_Game_Picture_update.call(this, ...arguments);
	this.eraseCountDown();
};

Game_Picture.prototype.eraseCountDown = function() {
	if (this._eraseCount != null) {
		if (this._eraseCount > 0) {
			this._eraseCount--;
		}
	}
};

Game_Picture.prototype.shouldErase = function() {
	return this._eraseCount != null && this._eraseCount <= 0;
};

//--------------------------------------
})();
