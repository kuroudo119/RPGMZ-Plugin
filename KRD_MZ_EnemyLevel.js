/*:
 * @target MZ
 * @plugindesc 敵レベル
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param DEFAULT_LEVEL
 * @text 既定レベル
 * @desc 敵レベルが未設定の場合の敵レベルです。
 * @default 0
 * @type number
 * 
 * @param USE_NAME_LEVEL
 * @text 敵キャラ名から取得
 * @desc 敵キャラ名からレベルを取得する：true ／取得しない：false
 * @default false
 * @type boolean
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

## 敵キャラ名から取得

敵キャラ名の末尾に数字がある場合、
その数字を敵レベルとして扱います。

## 更新履歴

- ver.0.0.1 (2022/03/16) 作成開始
- ver.0.1.0 (2022/03/16) 非公開版完成
- ver.1.0.0 (2022/03/16) 公開
- ver.1.0.1 (2024/04/07) metaの取得方法を変更
- ver.2.0.0 (2025/02/24) 敵キャラ名から取得を追加

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const DEFAULT_LEVEL = Number(PARAM["DEFAULT_LEVEL"]) || 0;
const USE_NAME_LEVEL = PARAM["USE_NAME_LEVEL"] === "true";

Object.defineProperty(Game_Enemy.prototype, "level", {
	get: function() {
		return this.enemyLevel();
	},
	configurable: true
});

Game_Enemy.prototype.enemyLevel = function() {
	const nameLevel = this.nameLevel();
	if (nameLevel) {
		return nameLevel;
	} else {
		return this.metaLevel();
	}
};

Game_Enemy.prototype.metaLevel = function() {
	return Number(this.enemy().meta.level) || DEFAULT_LEVEL;
};

Game_Enemy.prototype.nameLevel = function() {
	if (USE_NAME_LEVEL) {
		const text = this.originalName();
		const regex = /(?<level>\d+$)/;
		const found = text?.toString().match(regex);
		if (found) {
			return Number(found.groups?.level);
		} else {
			return null;
		}
	} else {
		return null;
	}
};

})();
