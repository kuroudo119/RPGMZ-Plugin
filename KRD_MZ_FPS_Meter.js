/*:
 * @target MZ
 * @plugindesc FPSメーターを表示します。スマホのテスト用
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
* @help
# KRD_MZ_FPS_Meter.js

FPSメーターを表示します。スマホのテスト用

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/03/16) 非公開版完成
- ver.1.0.0 (2023/05/03) 公開

 * 
 * 
 */

(() => {

"use strict";

const KRD_Graphics_createFPSCounter = Graphics._createFPSCounter;
Graphics._createFPSCounter = function() {
	KRD_Graphics_createFPSCounter.apply(this, arguments);
	this._switchFPSCounter();
};

})();
