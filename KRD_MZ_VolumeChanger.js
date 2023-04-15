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

const KRD_AudioManager_updateBgmParameters = AudioManager.updateBgmParameters;
AudioManager.updateBgmParameters = function(bgm) {
	if (bgm) {
		bgm.volume = this._bgmVolume * PERCENT_BGM / 100;
	}
	KRD_AudioManager_updateBgmParameters.apply(this, arguments);
};

const KRD_AudioManager_updateBgsParameters = AudioManager.updateBgsParameters;
AudioManager.updateBgsParameters = function(bgs) {
	if (bgs) {
		bgs.volume = this._bgsVolume * PERCENT_BGS / 100;
	}
	KRD_AudioManager_updateBgsParameters.apply(this, arguments);
};

const KRD_AudioManager_updateMeParameters = AudioManager.updateMeParameters;
AudioManager.updateMeParameters = function(me) {
	if (me) {
		me.volume = this._meVolume * PERCENT_ME / 100;
	}
	KRD_AudioManager_updateMeParameters.apply(this, arguments);
};

const KRD_AudioManager_updateSeParameters = AudioManager.updateSeParameters;
AudioManager.updateSeParameters = function(buffer, se) {
	if (se) {
		se.volume = this._seVolume * PERCENT_SE / 100;
	}
	KRD_AudioManager_updateSeParameters.apply(this, arguments);
};

})();
