/*:
 * @target MZ
 * @plugindesc スマホ画面でゲーム画面外の余白を無くします。
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @help
 * KRD_MZ_StretchHeight.js
 * スマホ画面高さ修正プラグイン
 * (c) 2021 kuroudo119
 * 
 * このプラグインはMITライセンスです。
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * ver.1 (2021/02/12) 1st Release.
 * 
 */

(() => {

"use strict";

Graphics._stretchHeight = function() {
	if (Utils.isMobileDevice()) {
		// [Note] Mobile browsers often have special operations at the top and
		//   bottom of the screen.
		// ↑ Why this "Note"?
		return document.documentElement.clientHeight;
	} else {
		return window.innerHeight;
	}
};

})();
