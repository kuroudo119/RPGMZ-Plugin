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
 * @param LONG_PRESS_MENU
 * @text 長押しメニュー
 * @desc コモンイベント番号 0 の時、長押しメニュー表示する: true ／ 表示しない: false
 * @default false
 * @type boolean
 * @parent COMMON_EVENT_ID
 * 
 * @param LONG_PRESS_TIME
 * @text 長押し時間
 * @desc 長押し判定になるフレーム数です。初期値 48
 * @default 48
 * @type number
 * 
 * @param DIV_TIME
 * @text 回転速度
 * @desc 長押し時間を割る値です。値が大きいと回転が速くなります。初期値 96
 * @default 96
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
- ver.1.1.0 (2024/04/25) 長押しメニューをオプションにした
- ver.1.1.1 (2024/04/25) テストプレイでしかCSS読込できてなかった件を修正
- ver.1.2.0 (2024/04/25) 円形バーが出るのを遅くした

 * 
 * 
 */

(() => {

"use strict";

const INDEX_PATH = document.baseURI;

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const COMMON_EVENT_ID = Number(PARAM["COMMON_EVENT_ID"]) || 0;
const LONG_PRESS_TIME = Number(PARAM["LONG_PRESS_TIME"]) || 0;
const DIV_TIME = Number(PARAM["DIV_TIME"]) || 1;

const LONG_PRESS_INTERVAL = 12;

const LONG_PRESS_MENU = PARAM["LONG_PRESS_MENU"] === "true";

//--------------------------------------
// 長押し

TouchInput.isLongPressing = function() {
	return this.isPressed() && this._pressedTime > TouchInput.keyRepeatInterval && this._pressedTime <= this.keyRepeatWait;
};

TouchInput.keyRepeatInterval = LONG_PRESS_INTERVAL;
TouchInput.keyRepeatWait = LONG_PRESS_TIME;

const _TouchInput_update = TouchInput.update;
TouchInput.update = function() {
	_TouchInput_update.call(this, ...arguments);
	if ($gameTemp) {
		if (COMMON_EVENT_ID) {
			$gameTemp.callCommonLongPress();
		} else {
			$gameTemp.doCancelLongPress();
		}
	}
};

Game_Temp.prototype.doCancelLongPress = function() {
	if (LONG_PRESS_MENU && this.isMenuEnabled()) {
		this.doCancelLongPressMain();
	} else if (!this.isMenuEnabled()) {
		this.doCancelLongPressMain();
	}
};

Game_Temp.prototype.isMenuEnabled = function() {
	const scene = SceneManager._scene;
	if (scene.constructor.name === "Scene_Map") {
		return scene.isMenuEnabled();
	} else {
		return false;
	}
};

Game_Temp.prototype.doCancelLongPressMain = function() {
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
// 円形プログレスバー（現状はスピナー）

const ROUND_BAR_ID = "krdRoundBar";
const ROUND_BAR_IMAGE_ID = "krdRoundBarImage";
const CSS_PATH = "/css/krdRoundBar.css";

class KRD_RoundBar {
	constructor() {
		const link = document.createElement("link");
		link.href = INDEX_PATH + "/../" + CSS_PATH;
		link.rel = "stylesheet";
		link.type = "text/css";
		const head = document.getElementsByTagName("head")[0];
		head.appendChild(link);

		this._roundBar = document.createElement("div");
		this._roundBar.id  = ROUND_BAR_ID;

		const roundBarImage = document.createElement("div");
		roundBarImage.id  = ROUND_BAR_IMAGE_ID;
		const time = LONG_PRESS_TIME / DIV_TIME;
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

//--------------------------------------

const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_Game_Temp_initialize.call(this, ...arguments);
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

const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
	_Window_Message_terminateMessage.call(this, ...arguments);
	$gameTemp.eraseKrdRoundBar();
};

//--------------------------------------
})();
