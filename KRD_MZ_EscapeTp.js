/*:
 * @target MZ
 * @plugindesc TPを消費して逃げる
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param ESCAPE_TP
 * @text 逃走時消費TP
 * @desc 逃走選択時に消費するTPです。初期値：25
 * @type number
 * @default 25
 * 
 * @help
# KRD_MZ_EscapeTp.js

TPを消費して逃げる

## 権利表記

(c) 2026 kuroudo119 (くろうど)

## 利用規約

このソフトウェアはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

### MITライセンス抄訳

1. 利用者はこのソフトウェアを無料で利用することができます。
-  商用利用、年齢制限作品などへの利用もできます。
-  利用作品でのクレジットは利用者の任意です。
2. 利用者はこのソフトウェアを改変、再配布することができます。
-  権利表記の削除、変更はできません。
3. 利用者はこのソフトウェアによる不都合について作者に対し請求できません。
4. このソフトウェアの利用について保証はありません。
5. 作者はこのソフトウェアについての責任を負いません。

## 概要

逃げる時に「逃走時消費TP」が必要になります。

戦闘参加メンバーの誰かが「逃走時消費TP」を持っていれば確実に逃げられます。
足りない場合は逃げれません。

逃げるの成否に関わらず戦闘参加メンバー全員のTPが消費されます。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2026/03/30|作成開始
0.1.0|2026/03/30|非公開版完成
1.0.0|2026/03/30|公開

## 以下プラグイン本体（ヘルプ欄には非表示）

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const ESCAPE_TP = Number(PARAM["ESCAPE_TP"]) || 0;

const ESCAPE_OK = 1;
const ESCAPE_NG = 0;

//--------------------------------------

const _BattleManager_processEscape = BattleManager.processEscape;
BattleManager.processEscape = function() {
	if ($gameParty.canEscape()) {
		this._escapeRatio = ESCAPE_OK;
	} else {
		this._escapeRatio = ESCAPE_NG;
	}
	$gameParty.processEscape();

	return _BattleManager_processEscape.call(this, ...arguments);
};

// 新規
Game_Party.prototype.canEscape = function() {
	return this.battleMembers().some(actor => actor.canEscape());
};

// 新規
Game_Actor.prototype.canEscape = function() {
	return this.tp >= this.escapeTp();
};

// 新規
Game_Party.prototype.processEscape = function() {
	this.battleMembers().forEach(actor => actor.processEscape());
};

// 新規
Game_Actor.prototype.processEscape = function() {
	this.gainTp(-this.escapeTp());
};

// 新規
Game_Actor.prototype.escapeTp = function() {
	return ESCAPE_TP;
};

//--------------------------------------
})();
/*
```

*/
