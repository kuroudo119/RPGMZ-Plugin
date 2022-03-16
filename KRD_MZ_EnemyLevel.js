/*:
 * @target MZ
 * @plugindesc 敵レベル
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_EnemyLevel.js

敵レベル

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

ダメージ計算式に a.level と書いた場合、
敵キャラがそのスキルを使用すると、
ダメージ計算式の結果が 0 になります。

これを防ぐため敵キャラにレベルを設定するプラグインです。

## 使い方

敵キャラのメモ欄に <level:99> と記述します。
99はレベルの値。

未設定の場合は敵レベル 0 となります。

## 更新履歴

- ver.0.0.1 (2022/03/16) 作成開始
- ver.0.1.0 (2022/03/16) 非公開版完成
- ver.1.0.0 (2022/03/16) 公開

 * 
 * 
 */

(() => {

"use strict";

Object.defineProperty(Game_Enemy.prototype, "level", {
	get: function() {
		return Number($dataEnemies[this.enemyId()].meta.level) || 0;
	},
	configurable: true
});

})();
