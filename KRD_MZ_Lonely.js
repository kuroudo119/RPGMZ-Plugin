/*:
 * @target MZ
 * @plugindesc 敵グループが1体の時にスイッチON
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param SW_LONELY_ACTOR
 * @text 味方1人スイッチ
 * @desc パーティが1人になった時にONになるスイッチです。
 * @type switch
 * @default 0
 * 
 * @param SW_LONELY_ENEMY
 * @text 敵1体スイッチ
 * @desc 敵グループが1体になった時にONになるスイッチです。
 * @type switch
 * @default 0
 * 
 * @help
# KRD_MZ_Lonely.js

敵グループが1体の時にスイッチON

## 権利表記

(c) 2021 kuroudo119 (くろうど)

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

敵グループが1体の場合、スイッチをONにし、
それ以外の場合、スイッチをOFFにします。

敵キャラの行動パターンにこのスイッチを使ってください。

必要に応じて、明示的にスイッチをOFFにしてください。

## おまけ

パーティが1人になった時のスイッチもあります。

戦闘開始時にスイッチをOFFにします。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2025/07/25|作成開始
0.1.0|2025/07/25|非公開版完成
1.0.0|2025/07/25|公開

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const SW_LONELY_ACTOR = PARAM["SW_LONELY_ACTOR"];
const SW_LONELY_ENEMY = PARAM["SW_LONELY_ENEMY"];

//--------------------------------------
// 主処理

const _Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
	_Game_Battler_refresh.call(this, ...arguments);
	$gameParty.setLonely();
	$gameTroop.setLonely();
};

// 新規作成
Game_Unit.prototype.isLonely = function() {
	return this.aliveMembers().length === 1;
};

// 新規作成
Game_Party.prototype.setLonely = function() {
	if (this.isLonely()) {
		$gameSwitches.setValue(SW_LONELY_ACTOR, true);
	} else {
		$gameSwitches.setValue(SW_LONELY_ACTOR, false);
	}
};

// 新規作成
Game_Troop.prototype.setLonely = function() {
	if (this.isLonely()) {
		$gameSwitches.setValue(SW_LONELY_ENEMY, true);
	} else {
		$gameSwitches.setValue(SW_LONELY_ENEMY, false);
	}
};

//--------------------------------------
// 初期化

// 新規作成
Game_Party.prototype.initLonely = function() {
	$gameSwitches.setValue(SW_LONELY_ACTOR, false);
};

// 新規作成
Game_Troop.prototype.initLonely = function() {
	$gameSwitches.setValue(SW_LONELY_ENEMY, false);
};

const _Scene_Battle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
	_Scene_Battle_create.call(this, ...arguments);
	$gameParty.initLonely();
	$gameTroop.initLonely();
};

//--------------------------------------
})();
/*
```

*/
