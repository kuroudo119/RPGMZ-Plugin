/*:
 * @target MZ
 * @plugindesc 右から数値入力
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_RightNumberInput.js

右から数値入力

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

「数値入力」コマンドの初期入力ケタを1の位にします。

## 更新履歴

- ver.0.0.1 (2024/01/12) 作成開始
- ver.0.1.0 (2024/01/12) 非公開版完成
- ver.1.0.0 (2024/01/12) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

const _Window_NumberInput_start = Window_NumberInput.prototype.start;
Window_NumberInput.prototype.start = function() {
	_Window_NumberInput_start.call(this, ...arguments);
	this.select(this.maxItems() - 1);
};

//--------------------------------------
})();
