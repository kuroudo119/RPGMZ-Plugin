/*:
 * @target MZ
 * @plugindesc 長押し円形バー
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param COMMON_EVENT_ID
 * @text コモンイベント番号
 * @desc 呼び出すコモンイベントの番号です。0 の場合は長押しキャンセルになります。
 * @default 0
 * @type common_event
 * 
 * @param LONG_PRESS_TIME
 * @text 長押し時間
 * @desc 長押し判定になるフレーム数です。初期値 24
 * @default 24
 * @type number
 * 
 * @help
# KRD_MZ_RoundBar.js

長押し円形バー

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 機能

長押し時に円形バー（現状はスピナー）を表示し、
長押し時間のあいだ押し続けると、
キャンセルまたはコモンイベント呼出を行うプラグインです。

マップ移動中のキャンセルはメニューを開くとなります。
コモンイベント呼出はマップでのみ有効です。

## 使い方

RPGツクールMZプロジェクト内の css フォルダに
krdRoundBar.css を入れてください。

## 更新履歴

- ver.0.0.1 (2023/09/25) 作成開始
- ver.0.1.0 (2023/09/26) 非公開版完成 (プログレスバーではなくスピナー)
- ver.1.0.0 (2023/09/26) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

//--------------------------------------
// 長押し

const COMMON_EVENT_ID = Number(PARAM["COMMON_EVENT_ID"]) || 0;
const LONG_PRESS_TIME = Number(PARAM["LONG_PRESS_TIME"]) || 0;

TouchInput.isLongPressing = function() {
	return this.isPressed() && this._pressedTime > TouchInput.keyRepeatInterval && this._pressedTime <= this.keyRepeatWait;
};

TouchInput.keyRepeatWait = LONG_PRESS_TIME;

const KRD_TouchInput_update = TouchInput.update;
TouchInput.update = function() {
	KRD_TouchInput_update.apply(this, arguments);
	if ($gameTemp) {
		if (COMMON_EVENT_ID) {
			$gameTemp.callCommonLongPress();
		} else {
			$gameTemp.doCancelLongPress();
		}
	}
};

Game_Temp.prototype.doCancelLongPress = function () {
	if (TouchInput.isLongPressed()) {
		$gameTemp.eraseKrdRoundBar();
		Input._currentState["escape"] = true;
	}

	if (TouchInput.isLongPressing()) {
		$gameTemp.showKrdRoundBar();
	} else {
		$gameTemp.eraseKrdRoundBar();
		Input._currentState["escape"] = false;
	}
};

Game_Temp.prototype.callCommonLongPress = function() {
	if ($gameTemp.canCallCommon() && TouchInput.isLongPressed()) {
		TouchInput.clear();
		$gameTemp.eraseKrdRoundBar();
		$gameTemp.reserveCommonEvent(COMMON_EVENT_ID);
	}

	if ($gameTemp.canCallCommon() && TouchInput.isLongPressing()) {
		$gameTemp.showKrdRoundBar();
	} else {
		$gameTemp.eraseKrdRoundBar();
	}
};

Game_Temp.prototype.canCallCommon = function() {
	const sceneName = SceneManager._scene.constructor.name;
	return sceneName === "Scene_Map" && !$gameMap.isEventRunning();
};

//--------------------------------------
// 円形プログレスバー

const ROUND_BAR_ID = "krdRoundBar";
const ROUND_BAR_IMAGE_ID = "krdRoundBarImage";
const CSS_PATH = "/css/krdRoundBar.css";

class KRD_RoundBar {
	constructor() {
		const link = document.createElement("link");
		link.href = CSS_PATH;
		link.rel = "stylesheet";
		link.type = "text/css";
		const head = document.getElementsByTagName("head")[0];
		head.appendChild(link);

		this._roundBar = document.createElement("div");
		this._roundBar.id  = ROUND_BAR_ID;

		const roundBarImage = document.createElement("div");
		roundBarImage.id  = ROUND_BAR_IMAGE_ID;
		const time = LONG_PRESS_TIME / 60;
		roundBarImage.style.animation = `krdSpin ${time}s linear`;

		this._roundBar.appendChild(roundBarImage);

		this.noDefaultAction();
	}

	showKrdRoundBar() {
		const loadingRoundBar = document.getElementById(ROUND_BAR_ID);
		if (!loadingRoundBar) {
			document.body.appendChild(this._roundBar);
		}
	}

	eraseKrdRoundBar() {
		const loadingRoundBar = document.getElementById(ROUND_BAR_ID);
		if (loadingRoundBar) {
			document.body.removeChild(loadingRoundBar);
		}
	}

	noDefaultAction() {
		// Nothing right click.
		this._roundBar.oncontextmenu = function() {
			return false;
		};

		// Nothing zoom by double click on iPhone.
		this._roundBar.addEventListener("mousedown", ev => {
			ev.preventDefault();
		}, false);
		this._roundBar.addEventListener("touchstart", ev => {
			ev.preventDefault();
		}, false);
	}
}

const KRD_Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	KRD_Game_Temp_initialize.apply(this, arguments);
	this.initKrdRoundBar();
};

Game_Temp.prototype.initKrdRoundBar = function() {
	this._krdRoundBar = new KRD_RoundBar();
};

Game_Temp.prototype.showKrdRoundBar = function() {
	this._krdRoundBar.showKrdRoundBar();
};

Game_Temp.prototype.eraseKrdRoundBar = function() {
	this._krdRoundBar.eraseKrdRoundBar();
};

//--------------------------------------
})();
