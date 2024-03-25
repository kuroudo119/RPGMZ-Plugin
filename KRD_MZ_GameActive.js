/*:
 * @target MZ
 * @plugindesc モバイルデバイス時ゲームWindowアクティブ（スマホアプリ化用）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_GameActive.js

モバイルデバイス時ゲームWindowアクティブ（スマホアプリ化用）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/05/01) 作成開始
- ver.0.1.0 (2022/05/01) 非公開版完成
- ver.1.0.0 (2024/03/25) 公開

 * 
 * 
 */

(() => {

"use strict";

const _SceneManager_isGameActive = SceneManager.isGameActive;
SceneManager.isGameActive = function() {
	if (Utils.isMobileDevice()) {
		return true;
	} else {
		return _SceneManager_isGameActive.call(this, ...arguments);
	}
};

})();
