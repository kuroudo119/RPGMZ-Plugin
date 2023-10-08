/*:
 * @target MZ
 * @plugindesc ピクチャ回転
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @command ratateAngle
 * @text 角度指定ピクチャ回転
 * @desc ピクチャを指定角度まで回転させます。
 * @arg pictureId
 * @text ピクチャ番号
 * @desc 
 * @default 
 * @type number
 * @arg speed
 * @text 回転スピード
 * @desc 
 * @default 
 * @type number
 * @min -1000
 * @arg angle
 * @text 初期角度
 * @desc 
 * @default 
 * @type number
 * @min -1000
 * @arg maxAngle
 * @text 最大角度
 * @desc 
 * @default 
 * @type number
 * @min -1000
 * @arg minAngle
 * @text 最小角度
 * @desc 
 * @default 
 * @type number
 * @min -1000
 * 
 * @help
# KRD_MZ_RotatePicture.js

ピクチャ回転

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

プラグインコマンド「角度指定ピクチャ回転」を使い、
ピクチャを指定角度まで回転させます。
（ピクチャの回転を指定角度で止めます）

## 更新履歴

- ver.0.0.1 (2023/10/08) 作成開始
- ver.0.1.0 (2023/10/08) 非公開版完成
- ver.1.0.0 (2023/10/08) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "ratateAngle", args => {
	const pictureId = Number(args.pictureId);
	const speed = Number(args.speed);
	const angle = Number(args.angle);
	const maxAngle = Number(args.maxAngle);
	const minAngle = Number(args.minAngle);
	$gameScreen.picture(pictureId).rotateAngle(speed, angle, maxAngle, minAngle);
});

//--------------------------------------

Game_Picture.prototype.setAngle = function(angle, maxAngle, minAngle) {
	this._angle = angle;
	this._maxAngle = maxAngle;
	this._minAngle = minAngle;
};

Game_Picture.prototype.rotateAngle = function(speed, angle, maxAngle, minAngle) {
	this.setAngle(angle, maxAngle, minAngle);
	this.rotate(speed);
};

const KRD_Game_Picture_updateRotation = Game_Picture.prototype.updateRotation;
Game_Picture.prototype.updateRotation = function() {
	if (this._maxAngle != undefined && this._minAngle != undefined) {
		if (this.angle() >= this._minAngle && this.angle() <= this._maxAngle) {
			KRD_Game_Picture_updateRotation.apply(this, arguments);
		} else {
			this._maxAngle = null;
			this._minAngle = null;
			this._rotationSpeed = 0;
		}
	} else {
		KRD_Game_Picture_updateRotation.apply(this, arguments);
	}
};

//--------------------------------------
})();
