/*:
 * @target MZ
 * @plugindesc バトルログ非表示（戦闘高速化）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @orderAfter SimpleMsgSideViewMZ
 * 
 * @help
# KRD_MZ_NoBattleLog.js

バトルログ非表示（戦闘高速化）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

バトルログを非表示にします。
それにより、戦闘高速化の効果が得られます。

サイドビューで SimpleMsgSideViewMZ 等の
他のプラグインと併用することを想定しています。

DBにてアニメーションの速度を速くすることで
さらなる戦闘高速化の効果が得られます。

## 更新履歴

- ver.0.0.1 (2021/03/16) 非公開版完成
- ver.0.1.0 (2021/08/21) 修正開始＆修正完了
- ver.1.0.0 (2024/06/20) 公開

 * 
 * 
 */

(() => {

"use strict";

// 上書き
Window_BattleLog.prototype.addText = function(text) {
	// 処理なし
};

// 上書き
Window_BattleLog.prototype.waitForEffect = function() {
	// 処理なし
};

})();
