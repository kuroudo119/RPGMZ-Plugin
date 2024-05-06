/*:
 * @target MZ
 * @plugindesc セーブデータとセーブ画面・ロード画面の変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param versionKey
 * @text バージョン値
 * @desc バージョンの値となる文字列。TextScriptBaseプラグインに対応しています。初期値 \js[ver]
 * @default \js[ver]
 * 
 * @param versionText
 * @text バージョン表示文字列
 * @desc バージョンの前に表示する文字列。TextScriptBaseプラグインに対応しています。初期値 \tx[verText]
 * @default \tx[verText]
 * 
 * @param mapY
 * @text マップ名Y
 * @desc マップ名のY座標に追加する値。初期値 -4
 * @default -4
 * @type number
 * @min -10000
 * 
 * @param maxCols
 * @text 列数
 * @desc セーブデータ一覧の列数。初期値 2
 * @default 2
 * @type number
 * 
 * @param MAX_COLS_L
 * @text 列数(横長画面)
 * @desc セーブデータ一覧の列数(横長画面)。初期値 3
 * @default 3
 * @type number
 * 
 * @param maxRows
 * @text 行数
 * @desc セーブデータ一覧の行数。初期値 5
 * @default 5
 * @type number
 * 
 * @param PARAM_MAX_ROWS_L
 * @text 行数(横長画面)
 * @desc セーブデータ一覧の行数(横長画面)。初期値 3
 * @default 3
 * @type number
 * 
 * @param lineHeight
 * @text 行の高さ
 * @desc セーブデータ内の行の高さ。初期値 32 ／システム値 36
 * @default 32
 * @type number
 * 
 * @param varText
 * @text テキスト変数番号
 * @desc マップ名の代わりに表示するテキストが入っている変数番号。この変数はセーブ後にゼロクリアされる。
 * @default 0
 * @type variable
 * 
 * @param useDialog
 * @text 確認ダイアログ使用
 * @desc true: セーブ確認ダイアログを表示する。 ／ false: 表示しない。
 * @default true
 * @type boolean
 * 
 * @param useMapImage
 * @text マップ画像使用
 * @desc true: セーブしたマップの画面キャプチャを表示する。 ／ false: 表示しない。
 * @default true
 * @type boolean
 * 
 * @param usePng
 * @text pngを使用
 * @desc true: pngを使う。ファイルサイズが大きくなります。 ／ false: jpegを使う。
 * @default false
 * @type boolean
 * @parent useMapImage
 * 
 * @param compressRate
 * @text jpeg圧縮率
 * @desc jpegの圧縮率です。パーセントで記述します。
 * @default 10
 * @type number
 * @max 100
 * @parent useMapImage
 * 
 * @param thumbnailScale
 * @text サムネイル割合
 * @desc マップ画像サイズのゲーム画面サイズとの割合です。パーセントで記述します。初期値13
 * @default 13
 * @type number
 * @parent useMapImage
 * 
 * @param USE_MAP_IMAGE_MAP_CHANGE
 * @text 移動時のマップ画像使用
 * @desc true: マップ移動時もマップ画像あり。 ／ false: マップ移動時はマップ画像なし。
 * @default false
 * @type boolean
 * @parent useMapImage
 * 
 * @help
# KRD_MZ_Save.js

セーブデータとセーブ画面・ロード画面の変更

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/02/20) 非公開版完成
- ver.0.1.0 (2021/08/22) 修正開始＆修正完了
- ver.0.1.1 (2021/09/17) 修正開始＆修正完了
- ver.0.2.0 (2021/11/05) マップ名に文字列表示可能
- ver.0.3.0 (2021/11/09) 文字の表示位置を調整
- ver.0.4.0 (2022/01/15) 確認ダイアログ表示有無オプション追加
- ver.0.5.0 (2022/02/21) マップ画像表示を追加
- ver.0.6.0 (2022/03/09) プラグインパラメータ追加
- ver.0.7.0 (2022/03/27) プラグインパラメータ追加
- ver.0.7.1 (2022/06/14) ダブルオートセーブ対応した。
- ver.0.7.2 (2022/06/16) 不透明度の処理を修正した。
- ver.0.8.0 (2022/06/29) タイトル表示処理を修正した。
- ver.0.9.0 (2022/07/04) 最新ファイルの文字色を変更するようにした。
- ver.0.10.0 (2022/07/08) 確認ダイアログのSEを修正した。
- ver.0.10.1 (2022/10/18) 確認ダイアログのクラス名を変更した。
- ver.0.10.2 (2022/11/17) バージョン表示文字列の初期値を変更した。
- ver.0.11.0 (2023/02/28) バージョン取得処理を変更。
- ver.0.12.0 (2023/03/01) 最新ファイルをselectするようにした。
- ver.0.12.1 (2023/03/02) 最新ファイルselect処理を修正。
- ver.0.12.2 (2023/03/02) リファクタリング
- ver.0.13.0 (2023/05/22) 選択不可ファイルをグレーアウト
- ver.0.14.0 (2023/06/16) パラメータにバージョンモードを追加した。
- ver.0.14.1 (2023/06/16) try文を減らした。
- ver.0.15.0 (2023/09/07) LANDSCAPE_PLUGIN 対応
- ver.0.16.0 (2023/10/26) VERSION_KEY 仕様変更
- ver.0.17.0 (2023/10/31) LANDSCAPE_PLUGIN 対応
- ver.0.18.0 (2024/05/06) 内部処理改善
- ver.0.19.0 (2024/05/06) マップ移動オートセーブのサムネイルあり追加

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const LANDSCAPE_PLUGIN = typeof KRD_MZ_UI_Landscape !== "undefined" ? KRD_MZ_UI_Landscape : false;

const VERSION_KEY = PARAM["versionKey"];
const VERSION_TEXT = PARAM["versionText"];

const MAP_Y_PLUS  = Number(PARAM["mapY"]) || 0;
const MAX_COLS = Number(PARAM["maxCols"]) || 0;
const MAX_COLS_L = Number(PARAM["MAX_COLS_L"]) || 0;
const PARAM_MAX_ROWS = Number(PARAM["maxRows"]) || 0;
const PARAM_MAX_ROWS_L = Number(PARAM["PARAM_MAX_ROWS_L"]) || 0;
const MAX_ROWS = LANDSCAPE_PLUGIN ? PARAM_MAX_ROWS_L : PARAM_MAX_ROWS;
const LINE_HEIGHT = Number(PARAM["lineHeight"]) || 0;

const VAR_TEXT = Number(PARAM["varText"]) || 0;

const USE_DIALOG = PARAM["useDialog"] === "true";
const USE_MAP_IMAGE = PARAM["useMapImage"] === "true";

const USE_PNG = PARAM["usePng"] === "true";
const MIME_PNG = "image/png";
const MIME_JPEG = "image/jpeg";
const MIME_TYPE = USE_PNG ? MIME_PNG : MIME_JPEG;
const COMPRESS_RATE = (Number(PARAM["compressRate"]) || 10) / 100;
const THUMBNAIL_SCALE = Number(PARAM["thumbnailScale"] || 13) / 100;

const USE_MAP_IMAGE_MAP_CHANGE = PARAM["USE_MAP_IMAGE_MAP_CHANGE"] === "true";

const INIT_FILE_ID = 1;

const NEW_FILE_COLOR = 17;

//--------------------------------------
// セーブデータ info 追加

const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function() {
	const info = _DataManager_makeSavefileInfo.call(this, ...arguments);
	info.mapName = this.getMapName();
	info.version = this.getVersion();
	info.mapImage = this.getMapImage();
	return info;
};

DataManager.getMapName = function() {
	const text = $gameVariables.value(VAR_TEXT);
	if (!!text && text !== 0) {
		$gameVariables.setValue(VAR_TEXT, 0);
		return text;
	}

	if ($gameTemp._mapName) {
		const ret = $gameTemp._mapName;
		$gameTemp._mapName = "";
		return ret;
	} else {
		if ($dataMap) {
			return $gameMap.displayName();
		} else {
			return "";
		}
	}
};

DataManager.getVersion = function() {
	return Window_Base.prototype.convertEscapeCharacters(VERSION_KEY);
};

DataManager.getMapImage = function() {
	const result = $gameTemp._mapImage ? 
	{
		src: $gameTemp._mapImage.src,
		width: $gameTemp._mapImage.width,
		height: $gameTemp._mapImage.height,
	} : null;

	return result;
};

//--------------------------------------
// セーブ画面

Window_SavefileList.prototype.drawItem = function(index) {
	// 最初に index:0 から始まるので初期indexをselectしておく
	this.firstSelectSavefile();

	this.drawItemMain(index);
};

Window_SavefileList.prototype.drawItemMain = function(index) {
	const savefileId = this.indexToSavefileId(index);
	const info = DataManager.savefileInfo(savefileId);
	const rect = this.itemRectWithPadding(index);
	this.resetTextColor();

	// 遅延対策で changePaintOpacity を drawContents 内でも実行する
	// ここではグレーアウトされる
	this.changePaintOpacity(this.opacityMode(savefileId, !info));

	this.drawTitle(savefileId, rect.x, rect.y + 4);
	if (info) {
		this.drawContents(info, rect, savefileId);
	}
};

Window_SavefileList.prototype.opacityMode = function(savefileId, noInfo) {
	if (this._mode === "save" && $gameTemp.isAutoSaveFileId(savefileId) ) {
		return false;
	} else if (this._mode === "load" && noInfo) {
		return false;
} else {
		return true;
	}
};

Window_SavefileList.prototype.drawContents = function(info, rect, savefileId) {
	if (USE_MAP_IMAGE && info.mapImage) {
		const image = new Image(info.mapImage.width, info.mapImage.height);
		image.src = info.mapImage.src;
		image.addEventListener("load", element => {
			this.changePaintOpacity(this.opacityMode(savefileId, !info));
			this.drawMapImage(rect, image);
			this.drawTitle(savefileId, rect.x, rect.y + 4);
			this.drawMainContents(info, rect, savefileId);
		});
	} else {
		this.changePaintOpacity(this.opacityMode(savefileId, !info));
		this.drawTitle(savefileId, rect.x, rect.y + 4);
		this.drawMainContents(info, rect, savefileId);
	}
};

Window_SavefileList.prototype.firstSelectSavefile = function() {
	if (!this._firstView) {
		this.selectSavefile(SceneManager._scene.firstSavefileId());
		this._firstView = true;
	}
};

Window_SavefileList.prototype.changeTitleColor = function(savefileId) {
	if (savefileId === SceneManager._scene.firstSavefileId()) {
		this.changeTextColor(ColorManager.textColor(NEW_FILE_COLOR));
	}
}

Window_SavefileList.prototype.drawMainContents = function(info, rect, savefileId) {
	const bottom = rect.y + rect.height;
	const lineHeight = this.lineHeight();
	this.drawPartyCharacters(info, rect.x + 16, bottom - lineHeight - 8);

	const y2 = rect.y - 2 + lineHeight * 2;
	this.drawPlaytime(info, rect.x, y2, rect.width);

	const y3 = rect.y + lineHeight;
	const timestamp = new Date(info.timestamp).toLocaleString();
	this.changeTitleColor(savefileId);
	this.drawText(timestamp, rect.x, y3, rect.width, "right");
	this.resetTextColor()

	if (info.mapName) {
		const y4 = bottom - lineHeight + MAP_Y_PLUS;
		this.drawText(info.mapName, rect.x, y4, rect.width);
	}
	if (info.version) {
		const y5 = rect.y + 4;
		const verText = Window_Base.prototype.convertEscapeCharacters(VERSION_TEXT);
		this.drawText(verText + info.version, rect.x, y5, rect.width, "right");
	}
};

Window_SavefileList.prototype.drawMapImage = function(rect, image) {
	if (image) {
		try {
			const sx = 0;
			const sy = 0;
			const sw = image.width;
			const sh = image.height;
			const dw = sw;
			const dh = sh;
			const dx = rect.x + rect.width - dw;
			const dy = rect.y + Math.floor((rect.height - dh) / 2);

			// rmmz_core の Bitmap.prototype.blt から移植
			this.contents.context.globalCompositeOperation = "source-over";
			this.contents.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
			this.contents._baseTexture.update();
		} catch (exception) {
			//
		}
	}
};

const _Window_SavefileList_maxCols = Window_SavefileList.prototype.maxCols;
Window_SavefileList.prototype.maxCols = function() {
	if (MAX_COLS) {
		if (LANDSCAPE_PLUGIN) {
			return MAX_COLS_L;
		} else {
			return MAX_COLS;
		}
	} else {
		return _Window_SavefileList_maxCols.call(this, ...arguments);
	}
};

const _Window_SavefileList_lineHeight = Window_SavefileList.prototype.lineHeight;
Window_SavefileList.prototype.lineHeight = function() {
	return LINE_HEIGHT ? LINE_HEIGHT : _Window_SavefileList_lineHeight.call(this, ...arguments);
};

const _Window_SavefileList_itemHeight = Window_SavefileList.prototype.itemHeight;
Window_SavefileList.prototype.itemHeight = function() {
	if (MAX_ROWS) {
		return Math.floor(this.innerHeight / MAX_ROWS);
	} else {
		return _Window_SavefileList_itemHeight.call(this, ...arguments);
	}
};

Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
	if (info.characters) {
		let characterX = x;
		for (const data of info.characters) {
			this.drawCharacter(data[0], data[1], characterX, y);
			characterX += 42;
		}
	}
};

//--------------------------------------
// maxCols が 2 の時の処理を修正

const _Window_SavefileList_selectSavefile = Window_SavefileList.prototype.selectSavefile;
Window_SavefileList.prototype.selectSavefile = function(savefileId) {
	if (MAX_COLS === 2) {
		const index = Math.max(0, this.savefileIdToIndex(savefileId));
		this.select(index);
		this.setTopRow(Math.floor(index / 2) - 2);
	} else {
		_Window_SavefileList_selectSavefile.call(this, ...arguments);
	}
};

const _Window_SavefileList_initialize = Window_SavefileList.prototype.initialize;
Window_SavefileList.prototype.initialize = function(rect) {
	_Window_SavefileList_initialize.call(this, ...arguments);
	this._firstView = false;
};

//--------------------------------------
// セーブ確認ダイアログ

const _Scene_Save_create = Scene_Save.prototype.create;
Scene_Save.prototype.create = function() {
	if (USE_DIALOG) {
		_Scene_Save_create.call(this, ...arguments);
		this.createConfirmWindow();
	} else {
		_Scene_Save_create.call(this, ...arguments);
	}
};

const _Scene_Save_onSavefileOk = Scene_Save.prototype.onSavefileOk;
Scene_Save.prototype.onSavefileOk = function() {
	this._initFileId = this._initFileId || $gameTemp.initFileId();
	if (USE_DIALOG && this.savefileId() >= this._initFileId) {
		Scene_File.prototype.onSavefileOk.call(this, ...arguments);
		this._confirmWindow.show();
		this._confirmWindow.activate();
		this._confirmWindow.refresh();
	} else {
		_Scene_Save_onSavefileOk.call(this, ...arguments);
	}
};

Scene_Save.prototype.createConfirmWindow = function() {
	const rect = this.confirmWindowRect();
	this._confirmWindow = new Window_Save_Confirm(rect);
	this._confirmWindow.setHandler("save", this.onConfirmOk.bind(this));
	this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
	this.addWindow(this._confirmWindow);
	this._confirmWindow.hide();
	this._confirmWindow.deactivate();
};

Scene_Save.prototype.confirmWindowRect = function() {
	const ww = this.mainCommandWidth();
	const wh = this.calcWindowHeight(2, true);
	const wx = Math.floor((Graphics.boxWidth - ww) / 2);
	const wy = Math.floor((Graphics.boxHeight - wh) / 2);
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Save.prototype.onConfirmOk = function() {
	const savefileId = this.savefileId();
	if (this.isSavefileEnabled(savefileId)) {
		this.executeSave(savefileId);
		this._confirmWindow.hide();
		this._confirmWindow.deactivate();
	} else {
		this.onSaveFailure();
		this._confirmWindow.hide();
		this._confirmWindow.deactivate();
	}
};

Scene_Save.prototype.onConfirmCancel = function() {
	SoundManager.playCancel();
	this.activateListWindow();
	this._confirmWindow.hide();
	this._confirmWindow.deactivate();
	this._confirmWindow.select(0);
};

class Window_Save_Confirm extends Window_Command {
	makeCommandList() {
		this.addCommand(TextManager.save, "save");
		this.addCommand(TextManager.cancel, "cancel");
	}

	itemHeight() {
		return Math.floor(this.innerHeight / 2);
	}

	playOkSound() {
		//
	}
}

//--------------------------------------
// バトル時のマップ名を一時保存する

const _Scene_Battle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
	_Scene_Battle_create.call(this, ...arguments);
	if ($dataMap) {
		$gameTemp._mapName = $gameMap.displayName();
	} else {
		$gameTemp._mapName = "";
	}
};

//--------------------------------------
Game_Temp.prototype.isAutoSaveFileId = function(fileId){
	return fileId < $gameTemp.initFileId();
};

Game_Temp.prototype.initFileId = function() {
	return INIT_FILE_ID;
};

//--------------------------------------
// セーブマップ画像追加（マップ移動オートセーブ用）

if (USE_MAP_IMAGE_MAP_CHANGE) {
	const _Scene_Map_onTransferEnd = Scene_Map.prototype.onTransferEnd;
	Scene_Map.prototype.onTransferEnd = function() {
		_Scene_Map_onTransferEnd.call(this, ...arguments);
	};
	
	const _Scene_Map_requestAutosave = Scene_Map.prototype.requestAutosave;
	Scene_Map.prototype.requestAutosave = function() {
		this._reserveAutosave = true;
	};
	
	Scene_Map.prototype.requestAutosaveMain = function() {
		if (this._reserveAutosave && this._fadeOpacity === 0 && !$gameMap.isEventRunning()) {
			this._reserveAutosave = false;
			this.mapImage();
			_Scene_Map_requestAutosave.call(this, ...arguments);
		}
	};
	
	const _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		_Scene_Map_update.call(this, ...arguments);
		this.requestAutosaveMain();
	};
}

//--------------------------------------
// セーブマップ画像追加

const _Scene_Map_stop = Scene_Map.prototype.stop;
Scene_Map.prototype.stop = function() {
	if (!SceneManager.isNextScene(Scene_Map)) {
		this.mapImage();
	} else {
		$gameTemp._mapImage = null;
	}
	_Scene_Map_stop.call(this, ...arguments);
};

Scene_Base.prototype.mapImage = function() {
	if (USE_MAP_IMAGE) {
		const scale = THUMBNAIL_SCALE;
		const width = Math.floor(Graphics.boxWidth * scale);
		const height = Math.floor(Graphics.boxHeight * scale);
		const bitmap = SceneManager.snapWH(width, height);
		const image = new Image(width, height);
		image.src = bitmap.canvas.toDataURL(MIME_TYPE, COMPRESS_RATE);
		$gameTemp._mapImage = image;
	} else {
		$gameTemp._mapImage = null;
	}
};

SceneManager.snapWH = function(w, h) {
	return Bitmap.snapWH(this._scene, w, h);
};

Bitmap.snapWH = function(stage, w, h) {
	const width = Graphics.width;
	const height = Graphics.height;
	const bitmap = new Bitmap(width, height);
	const renderTexture = PIXI.RenderTexture.create(width, height);
	if (stage) {
		const renderer = Graphics.app.renderer;
		renderer.render(stage, renderTexture);
		stage.worldTransform.identity();
		const canvas = renderer.extract.canvas(renderTexture);
		bitmap.context.drawImage(canvas, 0, 0, w, h);
		canvas.width = 0;
		canvas.height = 0;
	}
	renderTexture.destroy({ destroyBase: true });
	bitmap.baseTexture.update();
	return bitmap;
};

//--------------------------------------
})();
