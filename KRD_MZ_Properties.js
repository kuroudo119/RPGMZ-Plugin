/*:
 * @target MZ
 * @plugindesc 能力値（ダメージ計算式用プロパティ変更＆能力値内部計算）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param HP_RATE
 * @text 最大HP補正
 * @desc 最大HPに掛ける割合（パーセント）です。
 * @default 100
 * @type number
 * 
 * @param MP_RATE
 * @text 最大MP補正
 * @desc 最大MPに掛ける割合（パーセント）です。
 * @default 100
 * @type number
 * 
 * @param ATK_BAREHANDS
 * @text 武器なし補正
 * @desc 武器なし時に「運」に掛ける割合（パーセント）です。
 * @default 120
 * @type number
 * 
 * @param MIN_ATK_BAREHANDS
 * @text 武器なし最低値
 * @desc 武器なし時に「運」が低い場合、この値を最低値とします。
 * @default 55
 * @type number
 * 
 * @param ATK_LEVEL_RATE
 * @text 攻撃力補正(level)
 * @desc 攻撃力に加算するレベルの割合（パーセント）です。
 * @default 0
 * @type number
 * 
 * @param MAT_LEVEL_RATE
 * @text 魔法力補正(level)
 * @desc 魔法力に加算するレベルの割合（パーセント）です。
 * @default 0
 * @type number
 * 
 * @param DEF_CRI_RATE
 * @text 防御力補正(critical)
 * @desc 会心時に防御力に掛ける割合（パーセント）です。会心ではない時は 100% です。
 * @default 50
 * @type number
 * 
 * @param MDF_CRI_RATE
 * @text 魔法防御補正(critical)
 * @desc 会心時に魔法防御に掛ける割合（パーセント）です。会心ではない時は 100% です。
 * @default 50
 * @type number
 * 
 * @param PLUS_POINT
 * @text 能力値加算値
 * @desc 能力値に加算する値をカンマ区切りで値を8個記述します。
 * @default 0, 0, 0, 0, 0, 0, 0, 0
 * 
 * @param USE_HP_LEVEL_RATE
 * @text 敵レベルによるHP補正
 * @desc 敵レベルに応じてその敵HPを補正する：スイッチON ／補正しない：スイッチOFF
 * @default 0
 * @type switch
 * 
 * @param BORDER_LEVEL
 * @text レベル境界値
 * @desc レベル差分を取得する基準となる値です。
 * @default 50
 * @type number
 * @parent USE_HP_LEVEL_RATE
 * 
 * @param HP_LEVEL_RATE
 * @text HPレベル割合
 * @desc レベル差分に掛ける割合（パーセント）です。
 * @default 800
 * @type number
 * @parent USE_HP_LEVEL_RATE
 * 
 * @help
# KRD_MZ_Properties.js

能力値（ダメージ計算式用プロパティ変更＆能力値内部計算）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
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

## 注意

## プラグインパラメータ

「防御力補正(critical)」「魔法防御補正(critical)」は
KRD_MZ_Critical プラグインが有効な場合に使えます。

## 適用範囲

本プラグインはアクター、敵キャラ両方に適用されます。

## pow

luk の代わりに pow が使えます。

## 敵レベルによるHP補正

この機能を使うと、敵レベルに応じて敵の最大HPを補正することができます。
敵レベルの設定には別プラグインが必要です。

敵レベル ‐ レベル境界値 = レベル差分
レベル差分 * HPレベル割合 = 加算値（負数あり）
を算出し、最大HPに加算値を加えます。

加算値の一の位は切り捨てされます。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2022/12/03|作成開始
0.1.0|2022/12/03|非公開版完成
0.2.0|2023/01/16|仕様変更
0.3.0|2023/02/28|シンプル能力値に変更
0.4.0|2023/04/07|maxを敵キャラにも適用
0.5.0|2023/07/03|クリティカルを能力値に反映
0.6.0|2023/07/03|クリティカルを能力値に反映する処理を別ファイル
0.7.0|2023/09/16|mmp を等倍にした。未使用ゲッターを削除
0.8.0|2023/11/10|mmp を2倍にした
0.9.0|2024/02/26|プラグインパラメータを追加
0.10.0|2024/03/22|能力値加算値の内部処理を修正
0.10.1|2024/03/27|プラグインパラメータ取得漏れを修正
0.11.0|2024/04/07|追加値の割合をプラグインパラメータにした
0.12.0|2024/09/14|防御力のクリティカル補正などを追加
1.0.0|2024/09/14|公開
1.1.0|2025/02/24|敵レベルによるHP補正を追加
1.2.0|2025/03/19|敵レベルによるHP補正をスイッチに変更
1.2.1|2025/03/20|小数対策を追加
2.0.0|2025/03/31|pow を追加、一部パラメータ削除
2.1.0|2025/04/23|HPレベル割合をパーセントに変更
2.2.0|2025/07/29|リファクタリングなど

 * 
 * 
 */

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const HP_RATE = (Number(PARAM["HP_RATE"]) || 100) / 100;
const MP_RATE = (Number(PARAM["MP_RATE"]) ?? 100) / 100;

const ATK_BAREHANDS = (Number(PARAM["ATK_BAREHANDS"]) || 0) / 100;
const MIN_ATK_BAREHANDS = Number(PARAM["MIN_ATK_BAREHANDS"]) || 0;

const ATK_LEVEL_RATE = (Number(PARAM["ATK_LEVEL_RATE"]) || 0) / 100;

const MAT_LEVEL_RATE = (Number(PARAM["MAT_LEVEL_RATE"]) || 0) / 100;

const DEF_CRI_RATE = (Number(PARAM["DEF_CRI_RATE"]) || 0) / 100;
const MDF_CRI_RATE = (Number(PARAM["MDF_CRI_RATE"]) || 0) / 100;

const PLUS_POINT = PARAM["PLUS_POINT"];

const USE_HP_LEVEL_RATE = Number(PARAM["USE_HP_LEVEL_RATE"]) || 0;
const BORDER_LEVEL = Number(PARAM["BORDER_LEVEL"]) || 0;
const HP_LEVEL_RATE = (Number(PARAM["HP_LEVEL_RATE"]) || 0) / 100;
const MIN_HP = 1;

//--------------------------------------

Object.defineProperties(Game_BattlerBase.prototype, {
	mhp: {
		get: function() {
			return this.levelRateHp(Math.floor(this.param(0) * HP_RATE));
		},
		configurable: true
	},
	mmp: {
		get: function() {
			return Math.floor(this.param(1) * MP_RATE);
		},
		configurable: true
	},
	atk: {
		get: function() {
			return this.levelAttack(this.param(2), ATK_LEVEL_RATE);
		},
		configurable: true
	},
	def: {
		get: function() {
			return this.criticalDefense(this.param(3), DEF_CRI_RATE);
		},
		configurable: true
	},
	mat: {
		get: function() {
			return this.levelAttack(this.param(4), MAT_LEVEL_RATE);
		},
		configurable: true
	},
	mdf: {
		get: function() {
			return this.criticalDefense(this.param(5), MDF_CRI_RATE);
		},
		configurable: true
	},
	luk: {
		get: function() {
			return this.power();
		},
		configurable: true
  },
	pow: {
		get: function() {
			return this.power();
		},
		configurable: true
  },
});

//--------------------------------------

Game_BattlerBase.prototype.levelAttack = function(param, rate) {
	const level = this.level || 0;
	const levelPoint = Math.floor(level * rate);
	return param + levelPoint;
};

Game_BattlerBase.prototype.criticalDefense = function(param, rate) {
	return this.critical ? Math.floor(param * rate) : param;
};

//--------------------------------------

Game_BattlerBase.prototype.power = function() {
	const luck = this.param(7);
	const bareHandsPower = this.bareHandsPoint(luck);
	return bareHandsPower;
};

Game_Actor.prototype.bareHandsPoint = function(param) {
	const bareHandsRate = this.hasNoWeapons() ? ATK_BAREHANDS : 1;
	const bareHandsPoint = Math.floor(param * bareHandsRate);
	const bareHandsPower = Math.max(bareHandsPoint, MIN_ATK_BAREHANDS);
	return bareHandsPower;
};

Game_Enemy.prototype.bareHandsPoint = function(param) {
	return param;
};

//--------------------------------------

Game_BattlerBase.prototype.levelRateHp = function(param) {
	return param;
};

Game_Enemy.prototype.levelRateHp = function(param) {
	if ($gameSwitches.value(USE_HP_LEVEL_RATE)) {
		const level = this.level || 0;
		if (level > 0) {
			const diffLevel = level - BORDER_LEVEL;
			const levelPoint = diffLevel * HP_LEVEL_RATE;
			const truncLevelPoint = Math.floor(levelPoint * 0.1) * 10;
			const newHp = param + truncLevelPoint;
			const levelRateHp = Math.floor(Math.max(newHp, MIN_HP));
			return levelRateHp;
		}
	}
	return param;
};

//--------------------------------------
// 能力値加算値

const _Game_BattlerBase_paramBasePlus = Game_BattlerBase.prototype.paramBasePlus;
Game_BattlerBase.prototype.paramBasePlus = function(paramId) {
	const base = _Game_BattlerBase_paramBasePlus.call(this, ...arguments);
	const plusString = "[" + PLUS_POINT + "]";
	const plusList = JSON.parse(plusString);
	const plus = Number(plusList[paramId]) || 0;
	const paramBasePlus = Math.max(0, base + plus);
	return paramBasePlus;
};

//--------------------------------------
})();
/*
```

*/
