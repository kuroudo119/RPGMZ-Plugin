/*:
 * @target MZ
 * @plugindesc マップステータス
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param SW_MAP_STATUS
 * @text 状態スイッチ番号
 * @desc マップステータスの状態を示すスイッチの番号です。
 * @type switch
 * 
 * @param POSITION
 * @text 表示位置
 * @desc マップステータスを表示する位置です。下：2、左：4、右：6、上：8
 * @type select
 * @option 下(2)
 * @value 2
 * @option 左(4)
 * @value 4
 * @option 右(6)
 * @value 6
 * @option 上(8)
 * @value 8
 * @default 6
 * 
 * @command SHOW_MAP_STATUS
 * @text マップステータス開始
 * @desc マップステータスを表示するコマンドです。
 * 
 * @command HIDE_MAP_STATUS
 * @text マップステータス終了
 * @desc マップステータスを非表示にするコマンドです。
 * 
 * @help
# KRD_MZ_MapStatus.js

マップステータス

## 権利表記

(c) 2026 kuroudo119 (くろうど)

## 利用規約

このソフトウェアはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

### MITライセンス抄訳

1. 利用者はこのソフトウェアを無料で利用することができます。
-  商用利用、年齢制限作品などへの利用もできます。
-  利用作品でのクレジットは利用者の任意です。
2. 利用者はこのソフトウェアを改変、再配布することができます。
-  権利表記の削除、変更はできません。
3. 利用者はこのソフトウェアによる不都合について作者に対し請求できません。
4. このソフトウェアの利用について保証はありません。
5. 作者はこのソフトウェアについての責任を負いません。

## 概要

マップ画面にステータスを表示します。
ステータス表示は、Window_BattleStatus を元にしています。

## プラグインコマンド

マップステータス開始(SHOW_MAP_STATUS) で表示して、
マップステータス終了(HIDE_MAP_STATUS) で非表示にします。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2026/02/23|作成開始（作り直し）
0.1.0|2026/02/23|非公開版完成
1.0.0|2026/02/23|公開
2.0.0|2026/03/03|プラグインパラメータ「表示位置」に変更

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const SW_MAP_STATUS = Number(PARAM["SW_MAP_STATUS"]) || 0;
const POSITION = Number(PARAM["POSITION"]) || 0;

const BASE_VERTICAL_RECT_WIDTH = 168;
const BASE_HORIZONTAL_RECT_WIDTH = 156;
const BASE_RECT_HEIGHT = 134;

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "SHOW_MAP_STATUS", function() {
	$gameTemp.showMapStatus();
});

PluginManager.registerCommand(PLUGIN_NAME, "HIDE_MAP_STATUS", function() {
	$gameTemp.hideMapStatus();
});

//--------------------------------------
// プラグインコマンド実行用関数

Game_Temp.prototype.showMapStatus = function() {
	$gameSwitches.setValue(SW_MAP_STATUS, true);
};

Game_Temp.prototype.hideMapStatus = function() {
	$gameSwitches.setValue(SW_MAP_STATUS, false);
};

//--------------------------------------
// Scene_Map （ウィンドウ部分）

const _Scene_Map_createMapNameWindow = Scene_Map.prototype.createMapNameWindow;
Scene_Map.prototype.createMapNameWindow = function() {
	_Scene_Map_createMapNameWindow.call(this, ...arguments);
	this.createMapStatus();
};

Scene_Map.prototype.createMapStatus = function() {
	if (POSITION === 2) {
		this.createBottomMapStatus();
	} else if (POSITION === 4) {
		this.createLeftMapStatus();
	} else if (POSITION === 6) {
		this.createRightMapStatus();
	} else if (POSITION === 8) {
		this.createTopMapStatus();
	} else {
		this.createRightMapStatus();
	}
};

Scene_Map.prototype.createTopMapStatus = function() {
	const rect = this.topStatusWindowRect();
	this._statusWindow = new Window_MapStatus_Horizon(rect);
	this.addWindow(this._statusWindow);
};

Scene_Map.prototype.createBottomMapStatus = function() {
	const rect = this.bottomStatusWindowRect();
	this._statusWindow = new Window_MapStatus_Horizon(rect);
	this.addWindow(this._statusWindow);
};

Scene_Map.prototype.createLeftMapStatus = function() {
	const rect = this.leftStatusWindowRect();
	this._statusWindow = new Window_MapStatus_Vertical(rect);
	this.addWindow(this._statusWindow);
};

Scene_Map.prototype.createRightMapStatus = function() {
	const rect = this.rightStatusWindowRect();
	this._statusWindow = new Window_MapStatus_Vertical(rect);
	this.addWindow(this._statusWindow);
};

Scene_Map.prototype.topStatusWindowRect = function() {
	const members = $gameParty.maxBattleMembers() || 1;
	const ww = BASE_HORIZONTAL_RECT_WIDTH * members;
	const wh = BASE_RECT_HEIGHT;
	const wx = Math.floor((Graphics.boxWidth - ww) / 2);
	const tmpY = Math.floor((Graphics.height - Graphics.boxHeight) / 2);
	const wy = -tmpY;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Map.prototype.bottomStatusWindowRect = function() {
	const members = $gameParty.maxBattleMembers() || 1;
	const ww = BASE_HORIZONTAL_RECT_WIDTH * members;
	const wh = BASE_RECT_HEIGHT;
	const wx = Math.floor((Graphics.boxWidth - ww) / 2);
	const tmpY = Math.floor((Graphics.height - Graphics.boxHeight) / 2);
	const wy = Graphics.boxHeight + tmpY - wh;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Map.prototype.leftStatusWindowRect = function() {
	const members = $gameParty.maxBattleMembers() || 1;
	const ww = BASE_VERTICAL_RECT_WIDTH;
	const bh = this.buttonAreaHeight();
	const tmpH1 = BASE_RECT_HEIGHT * members;
	const tmpH2 = Graphics.boxHeight - bh * 2;
	const wh = tmpH1 < tmpH2 ? tmpH1 : tmpH2;
	const tmpX = Math.floor((Graphics.width - Graphics.boxWidth) / 2);
	const wx = -tmpX;
	const wy = Math.floor((Graphics.boxHeight - wh) / 2);
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Map.prototype.rightStatusWindowRect = function() {
	const members = $gameParty.maxBattleMembers() || 1;
	const ww = BASE_VERTICAL_RECT_WIDTH;
	const bh = this.buttonAreaHeight();
	const tmpH1 = BASE_RECT_HEIGHT * members;
	const tmpH2 = Graphics.boxHeight - bh * 2;
	const wh = tmpH1 < tmpH2 ? tmpH1 : tmpH2;
	const tmpX = Math.floor((Graphics.width - Graphics.boxWidth) / 2);
	const wx = Graphics.boxWidth + tmpX - ww;
	const wy = Math.floor((Graphics.boxHeight - wh) / 2);
	return new Rectangle(wx, wy, ww, wh);
};

//--------------------------------------
// Scene_Map （更新処理）

const _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_Scene_Map_update.call(this, ...arguments);
	this.updateMapStatus();
};

Scene_Map.prototype.updateMapStatus = function() {
	const mapStatus = $gameSwitches.value(SW_MAP_STATUS);
	if (mapStatus) {
		if (this._statusWindow.isOpening()) {
			this._statusWindow.refresh();
		} else {
			this._statusWindow.open();
		}
	} else {
		if (!this._statusWindow.isClosing()) {
			this._statusWindow.close();
		}
	}
};

//--------------------------------------
// Window_MapStatus クラス（共通）

class Window_MapStatus extends Window_BattleStatus {
	drawItemImage(index) {
		// nothing
	}

	placeTimeGauge(actor, x, y) {
		// nothing
	}

	updateBackOpacity() {
		this.backOpacity = 0;
	}

	showBackgroundDimmer() {
		Window_Base.prototype.showBackgroundDimmer.call(this, ...arguments);
	}
	
	drawItemBackground(index) {
		Window_Selectable.prototype.drawItemBackground.call(this, ...arguments);
	}
}

//--------------------------------------
// Window_MapStatus クラス（横配置）

class Window_MapStatus_Horizon extends Window_MapStatus {
	maxCols() {
		return $gameParty.maxBattleMembers() || 1;
	}
}

//--------------------------------------
// Window_MapStatus クラス（縦配置）

class Window_MapStatus_Vertical extends Window_MapStatus {
	maxCols() {
		return 1;
	}

	itemHeight() {
		const members = $gameParty.maxBattleMembers() || 1;
		return Math.floor(this.innerHeight / members);
	}

	rowSpacing() {
		return Window_Selectable.prototype.rowSpacing.call(this, ...arguments);
	}
}

//--------------------------------------
})();
/*
```

*/
