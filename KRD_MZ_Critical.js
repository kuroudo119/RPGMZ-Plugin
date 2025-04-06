/*:
 * @target MZ
 * @plugindesc クリティカルのダメージ倍率を変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @orderAfter KRD_MZ_ShieldBlock
 * 
 * @param criticalRate
 * @text クリティカル倍率
 * @desc クリティカル発生時にダメージにかかる倍率（パーセント）です。初期値 300
 * @default 300
 * @type number
 * 
 * @help
# KRD_MZ_Critical.js

クリティカルのダメージ倍率を変更

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## ダメージ計算式

ダメージ計算式に b.critical が使えるようになります。
三項演算子で使う想定です。

## 更新履歴

- ver.0.0.1 (2021/02/19) 作成開始
- ver.0.1.0 (2021/02/19) 非公開版完成
- ver.0.2.0 (2023/07/03) クリティカルを引数に追加
- ver.1.0.0 (2023/07/03) 公開
- ver.1.0.1 (2024/09/07) 「引数クリティカル追加」が機能してなかったので修正
- ver.1.1.0 (2024/09/07) 上記は使い方の誤りだったのでついでに機能変更
- ver.1.2.0 (2024/09/14) 計算式の a, b 両方にクリティカルを設定
- ver.2.0.0 (2025/04/06) 計算式の b のみに変更

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const CRITICAL_RATE = Number(PARAM["criticalRate"]) || 0;

//--------------------------------------

// 上書き
Game_Action.prototype.applyCritical = function(damage) {
	return Math.floor(damage * CRITICAL_RATE / 100);
};

//--------------------------------------

const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
	target.critical = critical;
	return _Game_Action_makeDamageValue.call(this, ...arguments);
};

const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	_Game_Action_apply.call(this, ...arguments);
	target.critical = false;
};

//--------------------------------------
})();
