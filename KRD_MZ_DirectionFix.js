/*:
 * @target MZ
 * @plugindesc マップ移動衝突時の振り向き禁止
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_DirectionFix.js

マップ移動衝突時の振り向き禁止

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/01/01) 作成開始
- ver.0.1.0 (2022/01/01) 未公開版完成
- ver.1.0.0 (2022/01/01) 公開

## 使い方

振り向き禁止したいイベントのメモ欄に <DirectionFix> と書く。

 * 
 * 
 */

(() => {

"use strict";

const KRD_Game_Character_turnTowardCharacter = Game_Character.prototype.turnTowardCharacter;
Game_Character.prototype.turnTowardCharacter = function(character) {
	const directionFix = $dataMap.events[this._eventId].meta.DirectionFix;
	if (!directionFix) {
		KRD_Game_Character_turnTowardCharacter.apply(this, arguments);
	}
};

})();
