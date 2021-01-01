/*:
 * @target MZ
 * @plugindesc 音量調節スライダー
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 *
 * @help
 * KRD_MZ_InputRange.js
 * (c) 2020 kuroudo119
 * 
 * このプラグインはMITライセンスです。
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * ver.1 (2021/01/01) 初回リリース
 * 
 * スマホ動作用の外部ライブラリとして RangeTouch を使用します。
 * https://github.com/sampotts/rangetouch
 * 
 * index.html の<head>と</head>の間に以下を追加してください。
 * <script src="https://cdn.rangetouch.com/2.0.1/rangetouch.js"></script>
 * 
 */

(() => {

'use strict';

if (typeof RangeTouch !== 'undefined') {

	// const baseX = 280;
	// const baseY = 435;
	// const baseLineHeight = 78;
	const baseX = 380;
	const baseY = 300;
	const baseLineHeight = 43;

	let show  = false;

	class InputRange {
		constructor(value, x, y, window2, symbol, id) {
			this._input = document.createElement("input");
			this._input.type	= "range";
			this._input.id		= id;
			this._input.value	= value.toString();
			this._input.min		= "0";
			this._input.max		= "100";
			this._input.step	= "10";
			this._input.style.position	= "fixed";
			this._input.style.left		= x.toString() + "px";
			this._input.style.top		= y.toString() + "px";
			this._input.style.opacity	= "1";
			this._input.style.zIndex	= "50";

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

			this._range = new RangeTouch(this._input);
			document.body.appendChild(this._range.element);

			Graphics.zoomRange(id, x, y);
		}
	}

	const KRD_Scene_Options_start = Scene_Options.prototype.start;
	Scene_Options.prototype.start = function() {
		KRD_Scene_Options_start.apply(this, arguments);
		if (!show) {
			show = true;
			
			const x = baseX;
			const y = baseY;
			const lineHeight = baseLineHeight;
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
				const x = baseX;
				const y = baseY;
				const lineHeight = baseLineHeight;
				const y2 = y + lineHeight * index;
				this.zoomRange(id, x, y2);
			});
		}
	};

	Graphics.zoomRange = function(id, x, y) {
		if (Utils.isNwjs()) {
			// MZ Test Play
			this.zoomRangeMobile(id, x, y);
		} else if (Utils.isMobileDevice()) {
			// Phone
			this.zoomRangeMobile(id, x, y);
		} else {
			// Windows Chrome
			this.zoomRangeWindows(id, x, y);
		}
	};

	Graphics.zoomRangeMobile = function(id, x, y) {
		const x2 = x * this._realScale;
		const y2 = y * this._realScale;
		const baseRate = this._height / this._width;
		const stretchRate = this._stretchHeight() / this._stretchWidth();
		const rate = stretchRate - baseRate;
		let spaceLeft = 0;
		let spaceTop = 0;
		if (rate > 0) {
			// ウィンドウサイズが通常より縦長
			const realHeight = this._height * this._realScale;
			spaceTop = (window.innerHeight - realHeight) / 2;
		} else if (rate < 0) {
			// ウィンドウサイズが通常より横長
			const realWidth = this._width * this._realScale;
			spaceLeft = (window.innerWidth - realWidth) / 2;
		}
		const xx = Math.round(x2 + spaceLeft);
		const yy = Math.round(y2 + spaceTop);

		const element = document.getElementById(id);
		element.style.left = xx.toString() + 'px';
		element.style.top = yy.toString() + 'px';
	};

	Graphics.zoomRangeWindows = function(id, x, y) {
		const x2 = x * this._realScale;
		const y2 = y * this._realScale;
		const spaceLeft = (window.innerWidth - this._width) / 2;
		const spaceTop = (window.innerHeight - this._height) / 2;
		const xx = Math.round(x2 + spaceLeft);
		const yy = Math.round(y2 + spaceTop);

		const element = document.getElementById(id);
		element.style.left = xx.toString() + 'px';
		element.style.top = yy.toString() + 'px';
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

}

})();
