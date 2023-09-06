/*:
 * @target MZ
 * @plugindesc トーストメッセージ
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @command SHOW_TOAST
 * @text トースト表示
 * @desc トーストメッセージを表示します。
 * @arg message
 * @text メッセージ
 * @desc 表示するメッセージです。
 * 
 * @help
# KRD_MZ_Toast.js

トーストメッセージ

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 機能

数秒程度の間だけ表示される
主に通知用のメッセージを表示します。

他のWindowより前面に表示されます。

## 更新履歴

- ver.0.0.1 (2023/09/06) 作成開始
- ver.0.1.0 (2023/09/06) 非公開版完成
- ver.1.0.0 (2023/09/06) 公開

 * 
 * 
 */

let Window_Toast = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

//--------------------------------------

PluginManager.registerCommand(PLUGIN_NAME, "SHOW_TOAST", args => {
	if (SceneManager._scene._toastWindow) {
		const text = args.message;
		SceneManager._scene._toastWindow.open(text);
	}
});

//--------------------------------------

Window_Toast = class extends Window_MapName {
	update() {
		Window_Base.prototype.update.call(this);
		if (this._showCount > 0) {
			this.updateFadeIn();
			this._showCount--;
		} else {
			this.updateFadeOut();
			if (this.contentsOpacity <= 0) {
				this.hide();
			}
		}
	}

	open(text, showCount = 150) {
		this.refresh(text);
		this._showCount = showCount;
		this.show();
	}

	close() {
		this.hide();
		super.close(...arguments);
	}

	refresh(text) {
		this.contents.clear();
		if (text) {
			const width = this.innerWidth;
			this.drawBackground(0, 0, width, this.lineHeight());
			this.drawText(text, 0, 0, width, "center");
		}
	}
};

//--------------------------------------

const KRD_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	KRD_Scene_Map_createAllWindows.apply(this, arguments);
	this.createToastWindow();
	this._toastWindow.hide();
};

const KRD_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	KRD_Scene_Battle_createAllWindows.apply(this, arguments);
	this.createToastWindow();
	this._toastWindow.hide();
};

Scene_Base.prototype.createToastWindow = function() {
	const rect = this.toastWindowRect();
	this._toastWindow = new Window_Toast(rect);
	this.addWindow(this._toastWindow);
};

Scene_Base.prototype.toastWindowRect = function() {
	const ww = Graphics.boxWidth;
	const wh = this.calcWindowHeight(1, false);
	const wx = Math.floor((Graphics.boxWidth - ww) / 2);
	const wy = Math.floor((Graphics.boxHeight - wh) / 4) * 3;
	return new Rectangle(wx, wy, ww, wh);
};

//--------------------------------------

const KRD_Scene_Map_stop = Scene_Map.prototype.stop;
Scene_Map.prototype.stop = function() {
	KRD_Scene_Map_stop.apply(this, arguments);
	this._toastWindow.close();
};

const KRD_Scene_Battle_stop = Scene_Battle.prototype.stop;
Scene_Battle.prototype.stop = function() {
	KRD_Scene_Battle_stop.apply(this, arguments);
	this._toastWindow.close();
};

//--------------------------------------
})();
