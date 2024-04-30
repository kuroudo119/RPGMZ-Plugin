/*:
 * @target MZ
 * @plugindesc ゲーム画面ストレッチモード（F3）をONで開始
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_StretchMode.js

ゲーム画面ストレッチモード（F3）をONで開始

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2024/04/30) 作成開始
- ver.0.1.0 (2024/04/30) 非公開版完成

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

Graphics._defaultStretchMode = function() {
	// 元々、テストプレイとスマホは true らしい。
	// return Utils.isNwjs() || Utils.isMobileDevice();

	return true;
};

//--------------------------------------
})();
