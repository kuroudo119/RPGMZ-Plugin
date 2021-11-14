/*:
 * @target MZ
 * @plugindesc メニューボタンサイズ拡大
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_Button.js

メニューボタンサイズ拡大

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴
- ver.0.0.1 (2021/02/20) 非公開版完成
- ver.1.0.0 (2021/06/12) 公開開始
- ver.1.0.1 (2021/06/18) コメント部分修正

## 使い方

ボタン画像(ButtonSet.png)のキャンバスサイズを拡張して、右側に幅2マス分の画像を追加してください。

 * 
 * 
 */

(() => {

"use strict";

const KRD_Sprite_Button_buttonData = Sprite_Button.prototype.buttonData;
Sprite_Button.prototype.buttonData = function() {
	if (this._buttonType === "menu") {
		return { x: 11, w: 2 };
	} else {
		return KRD_Sprite_Button_buttonData.apply(this, arguments);
	}
};

})();
