/*:
 * @target MZ
 * @plugindesc ピクチャ角度
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @command GET_ANGLE
 * @text 角度取得
 * @desc 角度を取得します。
 * @arg pid
 * @text ピクチャ番号
 * @desc 角度を取得するピクチャ番号です。
 * @type number
 * @arg vid
 * @text 変数番号
 * @desc 取得した角度を入れる変数の番号です。
 * @type variable
 * 
 * @command GET_ANGLE_VAR
 * @text 角度取得（変数版）
 * @desc 角度を取得します。
 * @arg varPid
 * @text ピクチャ番号の変数番号
 * @desc 角度を取得するピクチャ番号が入っている変数の番号です。
 * @type variable
 * @arg vid
 * @text 変数番号
 * @desc 取得した角度を入れる変数の番号です。
 * @type variable
 * 
 * @command SET_ANGLE
 * @text 角度設定
 * @desc 角度を設定します。
 * @arg pid
 * @text ピクチャ番号
 * @desc 角度を設定するピクチャ番号です。
 * @type number
 * @arg angle
 * @text 角度
 * @desc 角度です。
 * @type number
 * 
 * @command SET_ANGLE_VAR
 * @text 角度設定（変数版）
 * @desc 角度を設定します。
 * @arg varPid
 * @text ピクチャ番号の変数番号
 * @desc 角度を設定するピクチャ番号が入っている変数の番号です。
 * @type variable
 * @arg varAngle
 * @text 角度の変数番号
 * @desc 角度が入っている変数の番号です。
 * @type variable
 * 
 * @help
# KRD_MZ_PictureAngle.js

ピクチャ角度

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

ピクチャの角度に関するプラグインコマンドを提供します。

## 更新履歴

- ver.0.0.1 (2024/01/28) 作成開始
- ver.0.1.0 (2024/01/28) 非公開版完成
- ver.1.0.0 (2024/03/08) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "GET_ANGLE", args => {
	const vid = Number(args.vid) || 0;
	const pid = Number(args.pid) || 0;
	const angle = $gameScreen.picture(pid).angle();
	$gameVariables.setValue(vid, angle);
});

PluginManager.registerCommand(PLUGIN_NAME, "GET_ANGLE_VAR", args => {
	const vid = Number(args.vid) || 0;
	const pid = $gameVariables.value(Number(args.varPid));
	const angle = $gameScreen.picture(pid).angle();
	$gameVariables.setValue(vid, angle);
});

PluginManager.registerCommand(PLUGIN_NAME, "SET_ANGLE", args => {
	const pid = Number(args.pid) || 0;
	const angle = Number(args.angle) || 0;
	if ($gameScreen.picture(pid)) {
		$gameScreen.picture(pid)._angle = angle;
	}
});

PluginManager.registerCommand(PLUGIN_NAME, "SET_ANGLE_VAR", args => {
	const vid = Number(args.vid) || 0;
	const pid = $gameVariables.value(Number(args.varPid));
	const angle = $gameVariables.value(vid);
	if ($gameScreen.picture(pid)) {
		$gameScreen.picture(pid)._angle = angle;
	}
});

//--------------------------------------
})();
