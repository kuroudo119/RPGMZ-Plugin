/*:
 * @target MZ
 * @plugindesc 長押し円形バー
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param USE_LONG_PRESS_CANCEL
 * @text 長押しキャンセル
 * @desc 長押しキャンセル機能を有効にする: true ／ 有効にしない: false
 * @default true
 * @type boolean
 * 
 * @param LONG_PRESS_MENU
 * @text 長押しメニュー
 * @desc 長押しキャンセルにより、メニューを表示する: true ／ 表示しない: false
 * @default false
 * @type boolean
 * @parent USE_LONG_PRESS_CANCEL
 * 
 * @param NOT_LONG_PRESS_IN_EVENT
 * @text イベント中は長押し無視
 * @desc マップイベント中は長押しキャンセルしない: true ／ 長押しキャンセルする: false
 * @default true
 * @type boolean
 * @parent USE_LONG_PRESS_CANCEL
 * 
 * @param USE_LONG_PRESS_COMMON
 * @text 長押しコモンスイッチ
 * @desc 長押しコモンイベント呼出機能を有効にするスイッチ番号です。 0 の場合はこの機能を使いません。
 * @default 0
 * @type switch
 * 
 * @param COMMON_EVENT_ID
 * @text コモンイベント番号
 * @desc 呼び出すコモンイベントの番号です。0 の場合は長押しキャンセルになります。
 * @default 0
 * @type common_event
 * @parent USE_LONG_PRESS_COMMON
 * 
 * @param USE_LONG_PRESS_SWITCH
 * @text 長押しスイッチスイッチ
 * @desc 長押しスイッチ機能を有効にするスイッチ番号です。 0 の場合はこの機能を使いません。
 * @default 0
 * @type switch
 * 
 * @param SW_LONG_PRESS_SWITCH_ON
 * @text 長押し対象スイッチ
 * @desc 長押しスイッチ機能が有効な時、長押しによりONにするスイッチ番号です。
 * @default 0
 * @type switch
 * @parent USE_LONG_PRESS_SWITCH
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
 * @param NOT_LONG_PRESS_IN_MESSAGE
 * @text メッセージ長押し延長
 * @desc メッセージ表示中の長押し判定を伸ばします: true ／ 延長しない（デフォルト通り）: false
 * @default false
 * @type boolean
 * 
 * @param NO_SKIP_MESSAGE
 * @text メッセージ長押し不可
 * @desc メッセージ表示中の長押しによるメッセージ送りを不可とする: true ／ 可能（デフォルト通り）: false
 * @default false
 * @type boolean
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
以下のいずれかを実行できるプラグインです。

- キャンセル
- コモンイベント呼出
- スイッチON

マップ移動中のキャンセルはメニューを開く処理になります。
コモンイベント呼出はマップでのみ有効です。
スイッチONはイベント実行中やバトル中でもスイッチONにできると思います。

コモンイベント呼出とスイッチONの両方が有効な時、
コモンイベント呼出が優先され、スイッチONは動作しません。

## 準備

RPGツクールMZプロジェクト内の css フォルダに
krdRoundBar.css を入れてください。

## 補足

### メッセージ長押し延長

このパラメータがfalseの場合、
メッセージ表示中の長押しをメッセージ終了時に受け付けてしまいます。
（メッセージ送りするための長押し含む）

このパラメータがtrueの場合、
メッセージ表示中の長押しを受け付けませんが、
メッセージ送りが遅くなります。

## メッセージ長押し不可

「メッセージ長押し延長」をさらに強化した設定で、
このパラメータがtrueの場合、
長押しによるメッセージ送りを不可とします。

これにより、メッセージ終了時に長押し判定が残ることを防ぎます。

## 更新履歴

- ver.0.0.1 (2023/09/25) 作成開始
- ver.0.1.0 (2023/09/26) 非公開版完成 (プログレスバーではなくスピナー)
- ver.1.0.0 (2023/09/26) 公開
- ver.1.1.0 (2024/04/25) 長押しメニューをオプションにした
- ver.1.1.1 (2024/04/25) テストプレイでしかCSS読込できてなかった件を修正
- ver.1.2.0 (2024/04/25) 円形バーが出るのを遅くした
- ver.2.0.0 (2024/04/25) スイッチON機能を追加などの仕様変更
- ver.2.1.0 (2024/04/27) メッセージ長押し抑止を追加
- ver.2.2.0 (2024/05/02) イベント中は長押し無視を追加など
- ver.2.3.0 (2024/07/18) メニューでの長押しキャンセルと併用可能にした
- ver.2.4.0 (2024/07/29) メッセージ長押し不可を追加

 * 
 * 
 */

(() => {

"use strict";

const INDEX_PATH = document.baseURI;

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const USE_LONG_PRESS_CANCEL = PARAM["USE_LONG_PRESS_CANCEL"] === "true";
const LONG_PRESS_MENU = PARAM["LONG_PRESS_MENU"] === "true";
const NOT_LONG_PRESS_IN_EVENT = PARAM["NOT_LONG_PRESS_IN_EVENT"] === "true";

const USE_LONG_PRESS_COMMON = Number(PARAM["USE_LONG_PRESS_COMMON"]) || 0;
const COMMON_EVENT_ID = Number(PARAM["COMMON_EVENT_ID"]) || 0;

const USE_LONG_PRESS_SWITCH = Number(PARAM["USE_LONG_PRESS_SWITCH"]) || 0;
const SW_LONG_PRESS_SWITCH_ON = Number(PARAM["SW_LONG_PRESS_SWITCH_ON"]) || 0;

const LONG_PRESS_TIME = Number(PARAM["LONG_PRESS_TIME"]) || 0;
const DIV_TIME = Number(PARAM["DIV_TIME"]) || 1;
const LONG_PRESS_INTERVAL = 12;
const DEFAULT_INTERVAL = 6;

const NOT_LONG_PRESS_IN_MESSAGE = PARAM["NOT_LONG_PRESS_IN_MESSAGE"] === "true";
const NO_SKIP_MESSAGE = PARAM["NO_SKIP_MESSAGE"] === "true";

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
	if ($gameTemp && $gameSwitches) {
		if ($gameSwitches.value(USE_LONG_PRESS_COMMON)) {
			if ($gameTemp.canCallCommon()) {
				$gameTemp.callCommonLongPress();
			} else {
				if (USE_LONG_PRESS_CANCEL && !$gameTemp.isNotLongPressInEvent()) {
					$gameTemp.doCancelLongPress();
				}
			}
		} else if ($gameSwitches.value(USE_LONG_PRESS_SWITCH)) {
			if ($gameTemp.canDoSwitchOn()) {
				$gameTemp.doSwitchOn();
			} else {
				if (USE_LONG_PRESS_CANCEL && !$gameTemp.isNotLongPressInEvent()) {
					$gameTemp.doCancelLongPress();
				}
			}
		} else if (USE_LONG_PRESS_CANCEL) {
			if (!$gameTemp.isNotLongPressInEvent()) {
				$gameTemp.doCancelLongPress();
			}
		} 
	}
};

Game_Temp.prototype.isNotLongPressInEvent = function() {
	// タイトル画面に戻すイベント後に、
	// $gameMap.isEventRunning() が true のままなので、
	// タイトル画面では false にしている。
	const sceneName = SceneManager._scene.constructor.name;
	if (sceneName === "Scene_Title") {
		return false;
	}
	if (sceneName === "Scene_Load") {
		return false;
	}
	if (sceneName === "Scene_Options") {
		return false;
	}
	if (sceneName === "Scene_Info") {
		return false;
	}

	if ($gameParty.inBattle()) {
		return false;
	}

	return NOT_LONG_PRESS_IN_EVENT && $gameMap.isEventRunning();
};

Game_Temp.prototype.doCancelLongPress = function() {
	if (LONG_PRESS_MENU && this.isMenuEnabled()) {
		this.doCancelLongPressMain();
	} else if (!this.isMenuEnabled()) {
		this.doCancelLongPressMain();
	}
};

Game_Temp.prototype.isMenuEnabled = function() {
	if (this.isSceneMap()) {
		return SceneManager._scene.isMenuEnabled();
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
	return this.isSceneMap() && !$gameMap.isEventRunning();
};

Game_Temp.prototype.isSceneMap = function() {
	const sceneName = SceneManager._scene.constructor.name;
	return sceneName === "Scene_Map";
};

Game_Temp.prototype.canDoSwitchOn = function() {
	return $gameTemp.isSceneMap() || $gameParty.inBattle();
};

Game_Temp.prototype.doSwitchOn = function() {
	if ($gameTemp.canDoSwitchOn() && TouchInput.isLongPressed()) {
		TouchInput.clear();
		$gameTemp.eraseKrdRoundBar();
		$gameSwitches.setValue(SW_LONG_PRESS_SWITCH_ON, true);
	}

	if ($gameTemp.canDoSwitchOn() && TouchInput.isLongPressing()) {
		$gameTemp.showKrdRoundBar();
	} else {
		$gameTemp.eraseKrdRoundBar();
	}
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

	// メッセージ表示中の長押し対応
	// これにより早送りができなくなる。
	if (NO_SKIP_MESSAGE) {
		TouchInput.clear();
	}

	$gameTemp.eraseKrdRoundBar();

	// メッセージ表示中の長押し対応
	// これにより早送りが遅くなる。
	if (NOT_LONG_PRESS_IN_MESSAGE && TouchInput._pressedTime >= TouchInput.keyRepeatWait) {
		TouchInput._pressedTime = DEFAULT_INTERVAL;
	}
};

//--------------------------------------

const _Scene_Base_terminate = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function() {
	_Scene_Base_terminate.call(this, ...arguments);

	// メニューを閉じた時に長押し判定が残っているのをクリア
	TouchInput.clear();
	$gameTemp.eraseKrdRoundBar();
};

//--------------------------------------
})();
