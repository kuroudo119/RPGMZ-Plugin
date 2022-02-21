/*:
 * @target MZ
 * @plugindesc セーブデータとセーブ画面・ロード画面の変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param versionKey
 * @text バージョン識別子
 * @desc TextScriptBaseプラグインで設定した識別子。初期値 ver
 * @default ver
 * 
 * @param versionText
 * @text バージョン表示文字列
 * @desc バージョンの前に表示する文字列。初期値 ver.
 * @default ver.
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
 * @param maxRows
 * @text 行数
 * @desc セーブデータ一覧の行数。初期値 5
 * @default 5
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

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const VERSION_KEY = PARAM["versionKey"];
const VERSION_TEXT = PARAM["versionText"];

const MAP_Y_PLUS  = Number(PARAM["mapY"]) || 0;
const MAX_COLS = Number(PARAM["maxCols"]) || 0;
const MAX_ROWS = Number(PARAM["maxRows"]) || 0;
const LINE_HEIGHT = Number(PARAM["lineHeight"]) || 0;

const VAR_TEXT = Number(PARAM["varText"]) || 0;

const USE_DIALOG = PARAM["useDialog"] === "true";
const USE_MAP_IMAGE = PARAM["useMapImage"] === "true";

//--------------------------------------
// セーブデータ info 追加

const KRD_DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function() {
	const info = KRD_DataManager_makeSavefileInfo.apply(this, arguments);
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

	try {
		if ($gameTemp._mapName) {
			const ret = $gameTemp._mapName;
			$gameTemp._mapName = "";
			return ret;
		} else {
			return $gameMap.displayName();
		}
	} catch(e) {
		return "";
	}
};

DataManager.getVersion = function() {
	try {
		return $gameSystem.getTextBase(VERSION_KEY);
	} catch(e) {
		return "";
	}
};

DataManager.getMapImage = function() {
	const result = $gameTemp._mapImage ? 
	{
		src: $gameTemp._mapImage.src,
		width: $gameTemp._mapImage.width,
		height: $gameTemp._mapImage.height,
	} : null;

	$gameTemp._mapImage = null;
	return result;
};

//--------------------------------------
// セーブ画面

Window_SavefileList.prototype.drawContents = function(info, rect) {
	if (USE_MAP_IMAGE && info.mapImage) {
		const image = new Image(info.mapImage.width, info.mapImage.height);
		image.src = info.mapImage.src;
		image.addEventListener("load", element => {
			this.drawMapImage(rect, image);
			this.drawMainContents(info, rect);
		});
	} else {
		this.drawMainContents(info, rect);
	}
};

Window_SavefileList.prototype.drawMainContents = function(info, rect) {
	this.changePaintOpacity(true);

	const bottom = rect.y + rect.height;
	const lineHeight = this.lineHeight();
	this.drawPartyCharacters(info, rect.x + 16, bottom - lineHeight - 8);

	const y2 = rect.y - 2 + lineHeight * 2;
	this.drawPlaytime(info, rect.x, y2, rect.width);

	const y3 = rect.y + lineHeight;
	const timestamp = new Date(info.timestamp).toLocaleString();
	this.drawText(timestamp, rect.x, y3, rect.width, "right");

	if (info.mapName) {
		const y4 = bottom - lineHeight + MAP_Y_PLUS;
		this.drawTextEx(info.mapName, rect.x, y4, rect.width);
	}
	if (info.version) {
		const y5 = rect.y + 4;
		this.drawText(VERSION_TEXT + info.version, rect.x, y5, rect.width, "right");
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

			this.contents.context.globalCompositeOperation = "source-over";
			this.contents.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
			this.contents._baseTexture.update();
		} catch (exception) {
			//
		}
	}
};

const KRD_Window_SavefileList_maxCols = Window_SavefileList.prototype.maxCols;
Window_SavefileList.prototype.maxCols = function() {
	return MAX_COLS ? MAX_COLS : KRD_Window_SavefileList_maxCols.apply(this, arguments);
};

const KRD_Window_SavefileList_lineHeight = Window_SavefileList.prototype.lineHeight;
Window_SavefileList.prototype.lineHeight = function() {
	return LINE_HEIGHT ? LINE_HEIGHT : KRD_Window_SavefileList_lineHeight.apply(this, arguments);
};

const KRD_Window_SavefileList_itemHeight = Window_SavefileList.prototype.itemHeight;
Window_SavefileList.prototype.itemHeight = function() {
	if (MAX_ROWS) {
		return Math.floor(this.innerHeight / MAX_ROWS);
	} else {
		return KRD_Window_SavefileList_itemHeight.apply(this, arguments);
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
// maxCols が 2 の時
// マップ画像使用時に画像読込遅延により表示がおかしくなるので、index = 0 としてる。

const KRD_Window_SavefileList_selectSavefile = Window_SavefileList.prototype.selectSavefile;
Window_SavefileList.prototype.selectSavefile = function(savefileId) {
	if (USE_MAP_IMAGE) {
		const index = 0;
		this.select(index);
		this.setTopRow(index - 2);
	} else {
		if (MAX_COLS === 2) {
			const index = Math.max(0, this.savefileIdToIndex(savefileId));
			this.select(index);
			this.setTopRow(Math.floor(index / 2) - 2);
		} else {
			KRD_Window_SavefileList_selectSavefile.apply(this, arguments);
		}
	}
};

//--------------------------------------
// セーブ確認ダイアログ

const KRD_Scene_Save_create = Scene_Save.prototype.create;
Scene_Save.prototype.create = function() {
	if (USE_DIALOG) {
		Scene_File.prototype.create.apply(this, arguments);
		this.createConfirmWindow();
	} else {
		KRD_Scene_Save_create.apply(this, arguments);
	}
};

const KRD_Scene_Save_onSavefileOk = Scene_Save.prototype.onSavefileOk;
Scene_Save.prototype.onSavefileOk = function() {
	if (USE_DIALOG && this.savefileId() !== 0) {
		Scene_File.prototype.onSavefileOk.apply(this, arguments);
		this._confirmWindow.show();
		this._confirmWindow.activate();
		this._confirmWindow.refresh();
	} else {
		KRD_Scene_Save_onSavefileOk.apply(this, arguments);
	}
};

Scene_Save.prototype.createConfirmWindow = function() {
	const rect = this.confirmWindowRect();
	this._confirmWindow = new Window_Confirm(rect);
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
	this.activateListWindow();
	this._confirmWindow.hide();
	this._confirmWindow.deactivate();
};

class Window_Confirm extends Window_Command {
	makeCommandList() {
		this.addCommand(TextManager.save, "save");
		this.addCommand(TextManager.cancel, "cancel");
	}

	itemHeight() {
		return Math.floor(this.innerHeight / 2);
	}
}

//--------------------------------------
// バトル時のマップ名を一時保存する
//
// バトル終了時のオートセーブは、タイミングの都合で、
// $gameMap.displayName() に失敗する。

const KRD_Scene_Battle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
	KRD_Scene_Battle_create.apply(this, arguments);
	try {
		$gameTemp._mapName = $gameMap.displayName();
	} catch (e) {
		$gameTemp._mapName = "";
	}
};

//--------------------------------------
// セーブマップ画像追加

const KRD_Scene_Map_stop = Scene_Map.prototype.stop;
Scene_Map.prototype.stop = function() {
	if (!SceneManager.isNextScene(Scene_Map)) {
		this.mapImage();
	} else {
		$gameTemp._mapImage = null;
	}
	KRD_Scene_Map_stop.apply(this, arguments);
};

Scene_Base.prototype.mapImage = function() {
	if (USE_MAP_IMAGE) {
		const scale = 0.125;
		const width = Math.floor(Graphics.boxWidth * scale);
		const height = Math.floor(Graphics.boxHeight * scale);
		const bitmap = SceneManager.snapWH(width, height);
		const image = new Image(width, height);
		image.src = bitmap.canvas.toDataURL("image/jpeg", 0.1);
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
