/*:
 * @target MZ
 * @plugindesc 常時画像表示。ウォーターマーク等に使用できます。
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param file
 * @text ファイル名
 * @desc 表示する画像のFILE名です。
 * 画像は img/pictures/ フォルダ内に置いてください。
 * @type file
 * @dir img/pictures/
 * 
 * @param alt
 * @text ALTタグ
 * @desc HTMLのimgタグのaltに設定する値です。
 * 画像の読込失敗時にこの文字列が表示されます。
 * @default KRD_AlwaysImage
 * 
 * @param id
 * @text IDタグ
 * @desc HTMLのimgタグのIDに設定する値です。
 * 特に変更する必要はありません。
 * @default KRD_AlwaysImage
 * 
 * @param bottom
 * @text 画像下余白
 * @desc Windowの下と画像の下の空白部分です。
 * 単位はピクセルです。表示する位置を微調整できます。
 * @default 10
 * @type number
 * @min -10000
 * 
 * @param right
 * @text 画像右余白
 * @desc Windowの右端と画像の右端の空白部分です。
 * 単位はピクセルです。表示する位置を微調整できます。
 * @default 10
 * @type number
 * @min -10000
 * 
 * @param opacity
 * @text 不透明度
 * @desc 表示する画像の不透明度です。
 * 0:透明 → 100:不透明
 * @default 100
 * @type number
 * @max 100
 * 
 * @param commonEventId
 * @text コモンイベント番号
 * @desc 画像をクリックまたはタッチした時に実行する
 * コモンイベントの番号です。1以上の場合に有効。
 * @default 0
 * @type common_event
 * 
 * @help
# KRD_AlwaysImage.js

常時画像表示。ウォーターマーク等に使用できます。

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/01/13) MZ版作成開始
- ver.0.1.0 (2022/01/13) 非公開版完成
- ver.1.0.0 (2022/01/13) 公開
- ver.1.1.0 (2022/01/13) コモン呼出を左クリックのみ＆連打不可

## 概要

これはWindow内に常時画像を表示させるプラグインです。

ここで言うWindowはブラウザのWindowです。
ゲームの表示領域の外も含みます。

そのWindowの右下に画像を常時表示します。
ゲーム起動時から表示するので、
タイトル画面でも表示されます。

非表示にする機能はありません。

ブラウザのサイズを変更しても
画像サイズは変わりませんが、
表示位置は変更されます。

オマケ機能として、
マップ画面で、
画像を左クリックまたはタッチした時に、
任意のコモンイベントひとつを呼ぶ機能があります。

 * 
 * 
 */

(function() {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const PATH = "./img/pictures/";
const FILE = PARAM["file"] + ".png";
const ALT  = PARAM["alt"] || "KRD_AlwaysImage";
const ID   = PARAM["id"] || "KRD_AlwaysImage";
const BOTTOM_SPACE = PARAM["bottom"] || "0";
const RIGHT_SPACE  = PARAM["right"] || "0";
const OPACITY      = ((Number(PARAM["opacity"]) || 0) / 100).toString();
const COMMON_EVENT = Number(PARAM["commonEventId"]) || 0;

let viewStatus = false;

class KRD_AlwaysImage {
	constructor() {
		this._img = document.createElement("img");
		this._img.src = PATH + FILE;
		this._img.alt = ALT;
		this._img.id  = ID;
		this._img.style.position = "fixed";
		this._img.style.bottom   = BOTTOM_SPACE + "px";
		this._img.style.right    = RIGHT_SPACE + "px";
		this._img.style.opacity  = OPACITY;
		this._img.style.zIndex   = "11";

		this.noDeaultAction();

		if (COMMON_EVENT > 0) {
			this.touchListener();
		}

		document.body.appendChild(this._img);
	}

	noDeaultAction() {
		this._img.oncontextmenu = function() {
			return false;
		};
		this._img.addEventListener("mousedown", ev => {
			ev.preventDefault();
		}, false);
		this._img.addEventListener("touchstart", ev => {
			ev.preventDefault();
		}, false);
	}

	touchListener() {
		function touchEvent() {
			if ($gamePlayer.canMove()) {
				$gameTemp.reserveCommonEvent(COMMON_EVENT);
			}
		}

		this._img.addEventListener("click", () => {
			touchEvent();
		}, false);
		this._img.addEventListener("touchend", () => {
			touchEvent();
		}, false);
	}
}

const KRD_Scene_Base_start = Scene_Base.prototype.start;
Scene_Base.prototype.start = function() {
	KRD_Scene_Base_start.apply(this, arguments);
	if (!viewStatus) {
		viewStatus = true;
		this._portrait = new KRD_AlwaysImage();
	}
};

}());
