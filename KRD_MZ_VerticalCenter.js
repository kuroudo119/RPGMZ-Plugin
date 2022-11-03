/*:
 * @target MZ
 * @plugindesc イベント表示位置を縦中央にする
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_VerticalCenter.js

イベント表示位置を縦中央にする

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

マップイベントのメモ欄に <vCenter> を記述することで、
そのイベント画像の縦表示を
イベントマスに対して、センタリングします。

## 更新履歴

- ver.0.0.1 (2022/11/03) 作成開始
- ver.0.1.0 (2022/11/03) 非公開版完成
- ver.1.0.0 (2022/11/03) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

const KRD_Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
	KRD_Sprite_Character_updatePosition.apply(this, arguments);
	if (this._character.event && this._character.event().meta.vCenter) {
		const height = this._frame.height;
		const baseHeight = $gameMap.tileHeight();
		const diff = Math.floor((height - baseHeight) / 2);
		this.y += diff;
	}
};

//--------------------------------------
})();
