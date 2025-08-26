/*:
 * @target MZ
 * @plugindesc 職業ごとに最大レベル設定
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_ClassMaxLevel.js

職業ごとに最大レベル設定

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 使い方

職業のメモ欄に以下のタグを記述します。
<maxLv:99>

その職業の最大レベルが99になります。

## 注意点

最大レベルに達していても経験値は獲得します。

そのため、最大レベルが高い職業に転職（経験値を維持する）した場合に、
レベルアップすることがあります。

## 更新履歴

- ver.0.0.1 (2021/02/15) 作成開始
- ver.0.1.0 (2021/02/15) 非公開版完成
- ver.0.2.0 (2025/08/26) リファクタリング
- ver.1.0.0 (2025/08/26) 公開

 * 
 * 
 */

(() => {

"use strict";

const TAG_MAX_CLASS_LEVEL = "maxLv";

const _Game_Actor_maxLevel = Game_Actor.prototype.maxLevel;
Game_Actor.prototype.maxLevel = function() {
	const base = _Game_Actor_maxLevel.call(this, ...arguments);
	const maxLevel = Number(this.currentClass().meta[TAG_MAX_CLASS_LEVEL]);
	if (!isNaN(maxLevel)) {
		return Math.min(base, maxLevel);
	} 
	return base;
};

// levelUp を直接呼び出した時のチェック追加。
// changeLevel にはチェックがある。
const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
	if (!this.isMaxLevel()) {
		_Game_Actor_levelUp.call(this, ...arguments);
	}
};

})();
