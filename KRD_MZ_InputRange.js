/*:
 * @target MZ
 * @plugindesc 音量調節スライダー
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param BASE_X
 * @text X座標
 * @desc プラグインパラメータのテストです。
 * @default 300
 * @type number
 * 
 * @param BASE_Y
 * @text Y座標
 * @desc プラグインパラメータのテストです。
 * @default 300
 * @type number
 * 
 * @param BASE_LINE_HEIGHT
 * @text 1行の高さ
 * @desc プラグインパラメータのテストです。
 * @default 43
 * @type number
 * 
 * @param ZOOM_PATTERN_INDEX
 * @text ズームパターン番号
 * @desc スライダーの大きさです。
 * @default 0
 * @type select
 * @option 標準
 * @value 0
 * @option 大きい
 * @value 1
 * 
 * @help
# KRD_MZ_Test.js

音量調節スライダー

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 外部ライブラリ

スマホ動作用の外部ライブラリとして RangeTouch を使用します。
https://github.com/sampotts/rangetouch

index.html の<head>と</head>の間に以下を追加してください。
<script src="https://cdn.rangetouch.com/2.0.1/rangetouch.js"></script>

## 更新履歴

- ver.1.0.0 (2021/01/01) 公開
- ver.1.1.0 (2024/08/26) プラグインパラメータ追加

 * 
 * 
 */

(() => {

'use strict';

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const BASE_X = Number(PARAM["BASE_X"]) || 0;
const BASE_Y = Number(PARAM["BASE_Y"]) || 0;
const BASE_LINE_HEIGHT = Number(PARAM["BASE_LINE_HEIGHT"]) || 0;

const ZOOM_PATTERN_INDEX = Number(PARAM["ZOOM_PATTERN_INDEX"]) || 0;
const ZOOM_PATTERN = [
	{zoom:"1", rate:1},
	{zoom:"1.5", rate:0.667},
];

let show  = false;

class InputRange {
	constructor(value, x, y, window2, symbol, id) {
		this._input = document.createElement("input");
		this._input.type  = "range";
		this._input.id    = id;
		this._input.value = value.toString();
		this._input.min   = "0";
		this._input.max   = "100";
		this._input.step  = "10";
		this._input.style.position = "fixed";
		this._input.style.left     = x.toString() + "px";
		this._input.style.top      = y.toString() + "px";
		this._input.style.opacity  = "1";
		this._input.style.zIndex   = "50";
		this._input.style.zoom     = ZOOM_PATTERN[ZOOM_PATTERN_INDEX].zoom;

		// Nothing right click.
		this._input.oncontextmenu = function() {
			return false;
		};

		function move(input, window2, symbol) {
			const value = Number(input.value);
			window2.changeValue(symbol, value);
		}

		// Mouse
		this._input.addEventListener('mousemove', function(ev, win = window2, sbl = symbol){
			move(this, win, sbl);
		}, false);

		// Touch
		this._input.addEventListener('touchmove', function(ev, win = window2, sbl = symbol){
			move(this, win, sbl);
		}, false);

		if (typeof RangeTouch !== "undefined" && Utils.isMobileDevice()) {
			this._range = new RangeTouch(this._input);
			document.body.appendChild(this._range.element);
		} else {
			document.body.appendChild(this._input);
		}

		Graphics.zoomRange(id, x, y);
	}
}

const KRD_Scene_Options_start = Scene_Options.prototype.start;
Scene_Options.prototype.start = function() {
	KRD_Scene_Options_start.apply(this, arguments);
	if (!show) {
		show = true;
		
		const x = BASE_X;
		const y = BASE_Y;
		const lineHeight = BASE_LINE_HEIGHT;
		this._bgmRange = new InputRange(AudioManager.bgmVolume, x, y, this._optionsWindow, "bgmVolume", "bgmRange");
		this._bgsRange = new InputRange(AudioManager.bgsVolume, x, y + lineHeight, this._optionsWindow, "bgsVolume", "bgsRange");
		this._meRange = new InputRange(AudioManager.meVolume, x, y + lineHeight * 2, this._optionsWindow, "meVolume", "meRange");
		this._seRange = new InputRange(AudioManager.seVolume, x, y + lineHeight * 3, this._optionsWindow, "seVolume", "seRange");
	}
};

const KRD_Scene_Options_terminate = Scene_Options.prototype.terminate;
Scene_Options.prototype.terminate = function() {
	KRD_Scene_Options_terminate.apply(this, arguments);
	if (show) {
		show = false;
		// ↓作成したIDの""なしを引数にする
		document.body.removeChild(bgmRange);
		document.body.removeChild(bgsRange);
		document.body.removeChild(meRange);
		document.body.removeChild(seRange);
	}
};

const KRD_Graphics_updateRealScale = Graphics._updateRealScale;
Graphics._updateRealScale = function() {
	KRD_Graphics_updateRealScale.apply(this, arguments);
	if (show) {
		const rangeId = ["bgmRange", "bgsRange", "meRange", "seRange"];
		rangeId.forEach((id, index) => {
			const x = BASE_X;
			const y = BASE_Y;
			const lineHeight = BASE_LINE_HEIGHT;
			const y2 = y + lineHeight * index;
			this.zoomRange(id, x, y2);
		});
	}
};

Graphics.zoomRange = function(id, x, y) {
	const rate = ZOOM_PATTERN[ZOOM_PATTERN_INDEX].rate
	const x2 = x * this._realScale * rate;
	const y2 = y * this._realScale * rate;
	const rw = Graphics.width * this._realScale;
	const rh = Graphics.height * this._realScale;
	const xSpace = Math.floor((this._stretchWidth() - rw) / 2 * rate);
	const ySpace = Math.floor((this._stretchHeight() - rh) / 2 * rate);
	const xx = x2 + xSpace;
	const yy = y2 + ySpace;
	const element = document.getElementById(id);
	element.style.left = xx.toString() + 'px';
	element.style.top = yy.toString() + 'px';
	element.style.zoom = ZOOM_PATTERN[ZOOM_PATTERN_INDEX].zoom;
};

Window_Options.prototype.processOk = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (this.isVolumeSymbol(symbol)) {
			// this.changeVolume(symbol, true, true);
	} else {
		this.changeValue(symbol, !this.getConfigValue(symbol));
	}
};

})();
