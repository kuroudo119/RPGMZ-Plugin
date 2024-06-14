/*:
 * @target MZ
 * @plugindesc TPBにて敵キャラの行動不可ステート解除時に即行動する件を修正
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_TPB_EnemyAction.js

TPBにて敵キャラの行動不可ステート解除時に即行動する件を修正

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2024/06/14) 作成開始
- ver.0.1.0 (2024/06/14) 非公開版完成
- ver 1.0.0 (2024/06/14) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

const _Game_Enemy_makeActions = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
	if (BattleManager.isTpb()) {
		if (this.isTpbCharged()) {
			_Game_Enemy_makeActions.call(this, ...arguments);
		}
	} else {
		_Game_Enemy_makeActions.call(this, ...arguments);
	}
};

//--------------------------------------
})();
