/*:
 * @target MZ
 * @plugindesc 演奏音量が90%の時に変更する
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param afterBgm
 * @text 変更後BGM音量
 * @desc BGMの演奏の音量が90%の時、この値（パーセント）に変更する。
 * @default 40
 * @type number
 * 
 * @param afterBgs
 * @text 変更後BGS音量
 * @desc BGSの演奏の音量が90%の時、この値（パーセント）に変更する。
 * @default 60
 * @type number
 * 
 * @param afterMe
 * @text 変更後ME音量
 * @desc MEの演奏の音量が90%の時、この値（パーセント）に変更する。
 * @default 60
 * @type number
 * 
 * @param afterSe
 * @text 変更後SE音量
 * @desc SEの演奏の音量が90%の時、この値（パーセント）に変更する。
 * @default 60
 * @type number
 * 
 * @help
# KRD_MZ_VolumeIsNot90.js

演奏音量が90%の時に変更する

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2023/02/16) 作成開始
- ver.0.1.0 (2023/02/16) 非公開版完成
- ver.1.0.0 (2023/02/16) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const AFTER_BGM = Number(PARAM["afterBgm"]) || 0;
const AFTER_BGS = Number(PARAM["afterBgs"]) || 0;
const AFTER_ME = Number(PARAM["afterMe"]) || 0;
const AFTER_SE = Number(PARAM["afterSe"]) || 0;

const DEFAULT_VOLUME = 90;

const KRD_AudioManager_updateBgmParameters = AudioManager.updateBgmParameters;
AudioManager.updateBgmParameters = function(bgm) {
	if (bgm && bgm.volume === DEFAULT_VOLUME) {
		bgm.volume = AFTER_BGM;
	}
	KRD_AudioManager_updateBgmParameters.apply(this, arguments);
};

const KRD_AudioManager_updateBgsParameters = AudioManager.updateBgsParameters;
AudioManager.updateBgsParameters = function(bgs) {
	if (bgs && bgs.volume === DEFAULT_VOLUME) {
		bgs.volume = AFTER_BGS;
	}
	KRD_AudioManager_updateBgsParameters.apply(this, arguments);
};

const KRD_AudioManager_updateMeParameters = AudioManager.updateMeParameters;
AudioManager.updateMeParameters = function(me) {
	if (me && me.volume === DEFAULT_VOLUME) {
		me.volume = AFTER_ME;
	}
	KRD_AudioManager_updateMeParameters.apply(this, arguments);
};

const KRD_AudioManager_updateSeParameters = AudioManager.updateSeParameters;
AudioManager.updateSeParameters = function(buffer, se) {
	if (se && se.volume === DEFAULT_VOLUME) {
		se.volume = AFTER_SE;
	}
	KRD_AudioManager_updateSeParameters.apply(this, arguments);
};

})();
