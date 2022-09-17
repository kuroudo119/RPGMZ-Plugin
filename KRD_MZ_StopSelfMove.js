/*:
 * @target MZ
 * @plugindesc メッセージ中自律移動停止
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_StopSelfMove.js

メッセージ中自律移動停止

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/09/17) 作成開始
- ver.0.1.0 (2022/09/17) 非公開版完成
- ver.1.0.0 (2022/09/17) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

const KRD_Game_Event_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
	if (!$gameMessage.isBusy()) {
		KRD_Game_Event_updateSelfMovement.apply(this, arguments);
	}
};

//--------------------------------------
})();
