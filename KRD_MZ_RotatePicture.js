/*:
 * @target MZ
 * @plugindesc ピクチャ回転
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @command rotateAngle
 * @text 角度指定ピクチャ回転
 * @desc ピクチャを指定角度まで回転させます。
 * @arg pictureId
 * @text ピクチャ番号
 * @desc 回転させるピクチャ番号です。
 * @type number
 * @arg speed
 * @text 回転スピード
 * @desc 右回転:正の数／左回転:負の数
 * @type number
 * @min -1000
 * @arg angle
 * @text 初期角度
 * @desc 回転開始時の角度です。
 * @type number
 * @min -1000
 * @arg maxAngle
 * @text 最大角度
 * @desc 回転を止める角度です。
 * @type number
 * @min -1000
 * @arg minAngle
 * @text 最小角度
 * @desc 回転を止める角度です。
 * @type number
 * @min -1000
 * 
 * @command rotateAngleVar
 * @text 角度指定ピクチャ回転(変数版)
 * @desc ピクチャを指定角度まで回転させます。
 * @arg pictureId
 * @text ピクチャ番号
 * @desc 回転させるピクチャ番号です。
 * @type variable
 * @arg speed
 * @text 回転スピード
 * @desc 右回転:正の数／左回転:負の数
 * @type variable
 * @arg angle
 * @text 初期角度
 * @desc 回転開始時の角度です。
 * @type variable
 * @arg maxAngle
 * @text 最大角度
 * @desc 回転を止める角度です。
 * @type variable
 * @arg minAngle
 * @text 最小角度
 * @desc 回転を止める角度です。
 * @type variable
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
- ver.1.1.0 (2023/10/08) 変数版プラグインコマンド追加
- ver.1.1.1 (2023/10/08) 誤字修正

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "rotateAngle", args => {
	const pictureId = Number(args.pictureId);
	const speed = Number(args.speed);
	const angle = Number(args.angle);
	const maxAngle = Number(args.maxAngle);
	const minAngle = Number(args.minAngle);
	$gameScreen.picture(pictureId).rotateAngle(speed, angle, maxAngle, minAngle);
});

PluginManager.registerCommand(PLUGIN_NAME, "rotateAngleVar", args => {
	const pictureId = $gameVariables.value(Number(args.pictureId));
	const speed = $gameVariables.value(Number(args.speed));
	const angle = $gameVariables.value(Number(args.angle));
	const maxAngle = $gameVariables.value(Number(args.maxAngle));
	const minAngle = $gameVariables.value(Number(args.minAngle));
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
