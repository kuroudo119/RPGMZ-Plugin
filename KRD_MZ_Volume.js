/*:
 * @target MZ
 * @plugindesc 音量オプション（BGS、MEをSEに統合。音量デフォルト値変更）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param defaultBGM
 * @text BGM音量既定値
 * @desc BGM音量のデフォルト値（0 ～ 100）。システム値：100
 * @default 20
 * @type number
 * @max 100
 * 
 * @param defaultSE
 * @text SE音量既定値
 * @desc SE音量のデフォルト値（0 ～ 100）。システム値：100
 * @default 20
 * @type number
 * @max 100
 * 
 * @param volumeOffset
 * @text 音量増減値
 * @desc 音量の増減値。システム値：20
 * @default 5
 * @type number
 * 
 * @param useVolumeWindow
 * @text 音量Window分割
 * @desc 音量Windowを分割する：true／分割しない：false
 * @default false
 * @type boolean
 * 
 * @help
# KRD_MZ_Volume.js

音量オプション（BGS、MEをSEに統合。音量デフォルト値変更）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.1.0 (2021/02/19) 非公開版完成
- ver.0.2.0 (2021/08/13) プラグインパラメータをBGMとSEに分けた。
- ver.0.3.0 (2021/08/19) プラグインパラメータ初期値変更。
- ver.0.4.0 (2022/01/16) プラグインパラメータ記述修正。
- ver.0.5.0 (2022/04/25) 音量増減値を追加。
- ver.0.6.0 (2022/04/25) 音量を別Windowにした。
- ver.0.6.1 (2022/04/26) 音量Window処理を修正。
- ver.0.6.2 (2022/04/30) 音量Window処理を修正。
- ver.1.0.0 (2022/05/01) 公開

 * 
 * 
 */

let Window_VolumeOptions = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const DEFAULT_BGM = Number(PARAM["defaultBGM"]) || 0;
const DEFAULT_SE = Number(PARAM["defaultSE"]) || 0;

const VOLUME_OFFSET = Number(PARAM["volumeOffset"]) || 0;

const USE_VOLUME_WINDOW = PARAM["useVolumeWindow"] === "true";
const DEFAULT_VOLUME_COMMANDS = 4;
const THIS_VOLUME_COMMANDS = 2;
const VOLUME_COMMANDS = USE_VOLUME_WINDOW ? DEFAULT_VOLUME_COMMANDS : THIS_VOLUME_COMMANDS;

//--------------------------------------
// オプション初期値

AudioManager._bgmVolume = DEFAULT_BGM;
AudioManager._bgsVolume = DEFAULT_SE;
AudioManager._meVolume = DEFAULT_SE;
AudioManager._seVolume = DEFAULT_SE;

ConfigManager.readVolume = function(config, name) {
	if (name in config) {
		return Number(config[name]).clamp(0, 100);
	} else {
		if (name === "bgmVolume") {
			return DEFAULT_BGM;
		} else {
			return DEFAULT_SE;
		}
	}
};

//--------------------------------------
// 効果音の統一（BGS, ME も SE とする）

Object.defineProperty(ConfigManager, "seVolume", {
	get: function() {
		return AudioManager.seVolume;
	},
	set: function(value) {
		AudioManager.seVolume = value;
		AudioManager.meVolume = value;
		AudioManager.bgsVolume = value;
	},
	configurable: true
});

//--------------------------------------
// オプション画面表示

const KRD_Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
	return KRD_Scene_Options_maxCommands.apply(this, arguments) - VOLUME_COMMANDS;
};

Window_Options.prototype.addVolumeOptions = function() {
	this.addCommand(TextManager.bgmVolume, "bgmVolume");
	this.addCommand(TextManager.seVolume, "seVolume");
};

//--------------------------------------
// 音量増減値

Window_Options.prototype.volumeOffset = function() {
	return VOLUME_OFFSET;
};

//--------------------------------------
// 音量ウィンドウ分割：音量クラス

Window_VolumeOptions = class extends Window_Options {
	initialize(rect) {
		super.initialize(...arguments);
		this.select(this.startIndex());
		this.activate();
	}

	setOptionsWindow(optionsWindow) {
		this._optionsWindow = optionsWindow;
	}

	makeCommandList() {
		this.addVolumeOptions();
	}

	addVolumeOptions() {
		this.addCommand(TextManager.bgmVolume, "header", false);
		this.addCommand("", "bgmVolume", false);
		this.addCommand("", "bgmVolumeDown");
		this.addCommand("", "bgmVolumeUp");
		this.addCommand(TextManager.seVolume, "header", false);
		this.addCommand("", "seVolume", false);
		this.addCommand("", "seVolumeDown");
		this.addCommand("", "seVolumeUp");
	}

	maxCols() {
		return 4;
	}

	startIndex() {
		return 2;
	}

	drawItem(index) {
		if (this.isHeader(index)) {
			const title = this.commandName(index);
			const rect = this.itemLineRect(index);
			this.resetTextColor();
			this.changePaintOpacity(true);
			this.drawText(title, rect.x, rect.y, rect.width, "left");
		} else if (this.isVolume(index)) {
			const status = this.statusText(index);
			const rect = this.itemLineRect(index);
			this.resetTextColor();
			this.changePaintOpacity(true);
			this.drawText(status, rect.x, rect.y, rect.width, "right");
		} else {
			const status = this.statusText(index);
			const rect = this.itemLineRect(index);
			this.resetTextColor();
			this.changePaintOpacity(true);
			this.drawText(status, rect.x, rect.y, rect.width, "center");
		}
	}

	drawItemBackground(index) {
		if (!this.isHeader(index) && !this.isVolume(index)) {
			super.drawItemBackground(...arguments);
		}
	}

	isHeader(index) {
		return index % this.maxCols() === 0;
	}

	isVolume(index) {
		return index % this.maxCols() === 1;
	}

	statusText(index) {
		const symbol = this.commandSymbol(index);
		if (this.isUpDownSymbol(symbol)) {
			const upDown = this.isUpSymbol(symbol);
			return this.upDownStatusText(upDown);
		} else {
			return super.statusText(...arguments);
		}
	}

	isUpDownSymbol(symbol) {
		return symbol.includes("Up") || symbol.includes("Down");
	}

	isUpSymbol(symbol) {
		return symbol.includes("Up");
	}

	upDownStatusText(value) {
		return value ? "↑" : "↓";
	}

	processOk = function() {
		const index = this.index();
		const baseSymbol = this.commandSymbol(index);
		const cutUpSymbol = baseSymbol.replace("Up", "");
		const symbol = cutUpSymbol.replace("Down", "");
		if (this.isVolumeSymbol(symbol) && this.isUpSymbol(baseSymbol)) {
			this.changeVolume(symbol, true, false);
		} else if (this.isVolumeSymbol(symbol) && !this.isUpSymbol(baseSymbol)) {
			this.changeVolume(symbol, false, false);
		} else {
			this.changeValue(symbol, !this.getConfigValue(symbol));
		}
	}

	onTouchOk() {
		if (this.isTouchOkEnabled()) {
			const hitIndex = this.hitIndex();
			if (this._cursorFixed) {
				if (hitIndex === this.index()) {
					this.processOk();
				}
			} else if (!this.isHeader(hitIndex) && !this.isVolume(hitIndex)) {
				// if を追加した。
				if (hitIndex === this.index()) {
					this.processOk();
				}
			}
		}
	}

	hitTest(x, y) {
		// Window_VolumeOptions の位置が基準なので、
		// Y座標の開始位置にこのWindowの高さを足している。
		const optInnerRect = new Rectangle(
			this._optionsWindow._padding,
			this.height + this._optionsWindow._padding,
			this._optionsWindow.innerWidth,
			this._optionsWindow.innerHeight
		);

		if (this.innerRect.contains(x, y)) {
			const cx = this.origin.x + x - this.padding;
			const cy = this.origin.y + y - this.padding;
			const topIndex = this.topIndex();
			for (let i = 0; i < this.maxVisibleItems(); i++) {
				const index = topIndex + i;
				if (!this.isHeader(index) && !this.isVolume(index)) {
					const rect = this.itemRect(index);
					if (rect.contains(cx, cy)) {
						return index;
					}
				}
			}
		} else if (optInnerRect.contains(x, y)) {
			this._optionsWindow.activate();
			this.deactivate();
			return this.index();
		}
		return -1;
	}

	cursorDown(wrap) {
		const index = Math.max(0, this.index());
		const maxItems = this.maxItems();
		if (index === maxItems - 2 || index == maxItems - 1) {
			this._optionsWindow.select(0);
			this._optionsWindow.activate();
			this.deactivate();
		} else {
			Window_Command.prototype.cursorDown.apply(this, arguments);
		}
	}

	cursorUp(wrap) {
		const index = Math.max(0, this.index());
		const maxCols = this.maxCols();
		if (index === maxCols - 2 || index === maxCols - 1) {
			this._optionsWindow.select(this._optionsWindow.maxItems() - 1);
			this._optionsWindow.activate();
			this.deactivate();
		} else {
			Window_Command.prototype.cursorUp.apply(this, arguments);
		}
	}
	
	cursorRight(wrap) {
		const index = Math.max(0, this.index());
		if (!this.isHeader(index + 1)) {
			Window_Command.prototype.cursorRight.apply(this, arguments);
		} else if (index % this.maxCols() === this.maxCols() - 1) {
			const index = this.index();
			const baseSymbol = this.commandSymbol(index);
			const cutUpSymbol = baseSymbol.replace("Up", "");
			const symbol = cutUpSymbol.replace("Down", "");
			if (this.isVolumeSymbol(symbol) && this.isUpSymbol(baseSymbol)) {
				this.changeVolume(symbol, true, false);
			}
		}
	}

	cursorLeft(wrap) {
		const index = Math.max(0, this.index());
		if (!this.isVolume(index - 1)) {
			Window_Command.prototype.cursorLeft.apply(this, arguments);
		} else if (index % this.maxCols() === this.maxCols() - 2) {
			const index = this.index();
			const baseSymbol = this.commandSymbol(index);
			const cutUpSymbol = baseSymbol.replace("Up", "");
			const symbol = cutUpSymbol.replace("Down", "");
			if (this.isVolumeSymbol(symbol) && !this.isUpSymbol(baseSymbol)) {
				this.changeVolume(symbol, false, false);
			}
		}
	}
};

//--------------------------------------
// 音量ウィンドウ分割：Window_Options

const KRD_Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
	if (USE_VOLUME_WINDOW) {
		this.addGeneralOptions();
	} else {
		KRD_Window_Options_makeCommandList.apply(this, arguments);
	}
};

const KRD_Window_Options_initialize = Window_Options.prototype.initialize;
Window_Options.prototype.initialize = function(rect) {
	KRD_Window_Options_initialize.apply(this, arguments);
	if (USE_VOLUME_WINDOW) {
		this.select(0);
		this.deactivate();
	}
};

Window_Options.prototype.setVolumeWindow = function(volumeWindow) {
	this._volumeWindow = volumeWindow;
};

const KRD_Window_Options_hitTest = Window_Options.prototype.hitTest;
Window_Options.prototype.hitTest = function(x, y) {
	if (USE_VOLUME_WINDOW && !this.innerRect.contains(x, y)) {
		this._volumeWindow.activate();
		this.deactivate();
		return this.index();
	} else {
		return KRD_Window_Options_hitTest.apply(this, arguments);
	}
};

const KRD_Window_Options_cursorUp = Window_Options.prototype.cursorUp;
Window_Options.prototype.cursorUp = function(wrap) {
	const index = Math.max(0, this.index());
	if (USE_VOLUME_WINDOW && index === 0) {
		this._volumeWindow.select(this._volumeWindow.maxItems() - 1);
		this._volumeWindow.activate();
		this.deactivate();
		Input.clear();
	} else {
		KRD_Window_Options_cursorUp.apply(this, arguments);
	}
}

const KRD_Window_Options_cursorDown = Window_Options.prototype.cursorDown;
Window_Options.prototype.cursorDown = function(wrap) {
	const index = Math.max(0, this.index());
	if (USE_VOLUME_WINDOW && index === this.maxItems() - 1) {
		this._volumeWindow.select(this._volumeWindow.startIndex());
		this._volumeWindow.activate();
		this.deactivate();
		Input.clear();
	} else {
		KRD_Window_Options_cursorDown.apply(this, arguments);
	}
}

//--------------------------------------
// 音量ウィンドウ分割：Scene_Options

const KRD_Scene_Options_create = Scene_Options.prototype.create;
Scene_Options.prototype.create = function() {
	KRD_Scene_Options_create.apply(this, arguments);
	if (USE_VOLUME_WINDOW) {
		this.createVolumeOptionsWindow();
		this._volumeWindow.setOptionsWindow(this._optionsWindow);
		this._optionsWindow.setVolumeWindow(this._volumeWindow);
	}
};

const KRD_Scene_Options_optionsWindowRect = Scene_Options.prototype.optionsWindowRect;
Scene_Options.prototype.optionsWindowRect = function() {
	if (USE_VOLUME_WINDOW) {
		const vn = this.maxVolumeCommands();
		const n = Math.min(this.maxCommands(), this.maxVisibleCommands());
		const ww = 400;
		const wh = this.calcWindowHeight(n, true);
		const vWh = this.calcWindowHeight(vn, true);
		const fullWh = this.calcWindowHeight(n + vn, true);
		const wx = (Graphics.boxWidth - ww) / 2;
		const vWy = (Graphics.boxHeight - fullWh) / 2;
		const wy = vWy + vWh;
		return new Rectangle(wx, wy, ww, wh);
	} else {
		return KRD_Scene_Options_optionsWindowRect.apply(this, arguments);
	}
};

Scene_Options.prototype.createVolumeOptionsWindow = function() {
	const rect = this.volumeWindowRect();
	this._volumeWindow = new Window_VolumeOptions(rect);
	this._volumeWindow.setHandler("cancel", this.popScene.bind(this));
	this.addWindow(this._volumeWindow);
};

Scene_Options.prototype.volumeWindowRect = function() {
	const vn = this.maxVolumeCommands();
	const n = Math.min(this.maxCommands(), this.maxVisibleCommands());
	const ww = 400;
	const wh = this.calcWindowHeight(vn, true);
	const fullWh = this.calcWindowHeight(n + vn, true);
	const wx = (Graphics.boxWidth - ww) / 2;
	const wy = (Graphics.boxHeight - fullWh) / 2;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Options.prototype.maxVolumeCommands = function() {
	return 2;
};

//--------------------------------------
})();
