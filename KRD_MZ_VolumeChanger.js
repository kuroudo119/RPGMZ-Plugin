/*:
 * @target MZ
 * @plugindesc 演奏音量倍率
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param PERCENT_BGM
 * @text BGM音量割合
 * @desc BGMの演奏の音量に、この値（パーセント）をかける。
 * @default 20
 * @type number
 * 
 * @param PERCENT_BGS
 * @text BGS音量割合
 * @desc BGSの演奏の音量に、この値（パーセント）をかける。
 * @default 20
 * @type number
 * 
 * @param PERCENT_ME
 * @text ME音量割合
 * @desc MEの演奏の音量に、この値（パーセント）をかける。
 * @default 20
 * @type number
 * 
 * @param PERCENT_SE
 * @text SE音量割合
 * @desc SEの演奏の音量に、この値（パーセント）をかける。
 * @default 20
 * @type number
 * 
 * @param SPECIAL_DIRECTORY
 * @text 特定ディレクトリ名
 * @desc 特定ディレクトリとしてしていする文字列。
 * 
 * @param SPECIAL_VOLUME
 * @text 特定ディレクトリ音量割合
 * @desc 特定ディレクトリに入っている音声の演奏の音量に、この値（パーセント）をかける。
 * @default 40
 * @type number
 * 
 * @help
# KRD_MZ_VolumeChanger.js

演奏音量倍率

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2023/04/15) 作成開始
- ver.0.1.0 (2023/04/15) 非公開版完成
- ver.1.0.0 (2023/04/16) 公開
- ver.1.1.0 (2023/04/17) 特定ディレクトリ機能を追加

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const PERCENT_BGM = Number(PARAM["PERCENT_BGM"]) || 0;
const PERCENT_BGS = Number(PARAM["PERCENT_BGS"]) || 0;
const PERCENT_ME = Number(PARAM["PERCENT_ME"]) || 0;
const PERCENT_SE = Number(PARAM["PERCENT_SE"]) || 0;

const SPECIAL_DIRECTORY = PARAM["SPECIAL_DIRECTORY"];
const SPECIAL_VOLUME = Number(PARAM["SPECIAL_VOLUME"]) || 0;

const KRD_AudioManager_updateBgmParameters = AudioManager.updateBgmParameters;
AudioManager.updateBgmParameters = function(bgm) {
	if (bgm) {
		const percent = SPECIAL_DIRECTORY && bgm.name.match(SPECIAL_DIRECTORY) ? SPECIAL_VOLUME : PERCENT_BGM;
		bgm.volume = this._bgmVolume * percent / 100;
	}
	KRD_AudioManager_updateBgmParameters.apply(this, arguments);
};

const KRD_AudioManager_updateBgsParameters = AudioManager.updateBgsParameters;
AudioManager.updateBgsParameters = function(bgs) {
	if (bgs) {
		const percent = SPECIAL_DIRECTORY && bgs.name.match(SPECIAL_DIRECTORY) ? SPECIAL_VOLUME : PERCENT_BGS;
		bgs.volume = this._bgsVolume * percent / 100;
	}
	KRD_AudioManager_updateBgsParameters.apply(this, arguments);
};

const KRD_AudioManager_updateMeParameters = AudioManager.updateMeParameters;
AudioManager.updateMeParameters = function(me) {
	if (me) {
		const percent = SPECIAL_DIRECTORY && me.name.match(SPECIAL_DIRECTORY) ? SPECIAL_VOLUME : PERCENT_ME;
		me.volume = this._meVolume * percent / 100;
	}
	KRD_AudioManager_updateMeParameters.apply(this, arguments);
};

const KRD_AudioManager_updateSeParameters = AudioManager.updateSeParameters;
AudioManager.updateSeParameters = function(buffer, se) {
	if (se) {
		const percent = SPECIAL_DIRECTORY && se.name.match(SPECIAL_DIRECTORY) ? SPECIAL_VOLUME : PERCENT_SE;
		se.volume = this._seVolume * percent / 100;
	}
	KRD_AudioManager_updateSeParameters.apply(this, arguments);
};

})();
