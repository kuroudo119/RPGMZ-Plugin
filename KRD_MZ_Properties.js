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
 * @text 攻撃力補正(武器なし)
 * @desc 武器なし時に攻撃力に掛ける割合（パーセント）です。
 * @default 150
 * @type number
 * 
 * @param ATK_LUK_RATE
 * @text 攻撃力補正(luk)
 * @desc 攻撃力に加算する運の割合（パーセント）です。
 * @default 100
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
 * @param MAT_MMP_RATE
 * @text 魔法力補正(mmp)
 * @desc 魔法力に加算する最大MPの割合（パーセント）です。
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
 * @help
# KRD_MZ_Properties.js

能力値（ダメージ計算式用プロパティ変更＆能力値内部計算）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 注意

## プラグインパラメータ

「防御力補正(critical)」「魔法防御補正(critical)」は
KRD_MZ_Critical プラグインが有効な場合に使えます。

## 適用範囲

本プラグインはアクター、敵キャラ両方に適用されます。

## 更新履歴

- ver.0.0.1 (2022/12/03) 作成開始
- ver.0.1.0 (2022/12/03) 非公開版完成
- ver.0.2.0 (2023/01/16) 仕様変更
- ver.0.3.0 (2023/02/28) シンプル能力値に変更
- ver.0.4.0 (2023/04/07) maxを敵キャラにも適用
- ver.0.5.0 (2023/07/03) クリティカルを能力値に反映
- ver.0.6.0 (2023/07/03) クリティカルを能力値に反映する処理を別ファイル
- ver.0.7.0 (2023/09/16) mmp を等倍にした。未使用ゲッターを削除
- ver.0.8.0 (2023/11/10) mmp を2倍にした
- ver.0.9.0 (2024/02/26) プラグインパラメータを追加
- ver.0.10.0 (2024/03/22) 能力値加算値の内部処理を修正
- ver.0.10.1 (2024/03/27) プラグインパラメータ取得漏れを修正
- ver.0.11.0 (2024/04/07) 追加値の割合をプラグインパラメータにした
- ver.0.12.0 (2024/09/14) 防御力のクリティカル補正などを追加
- ver.1.0.0 (2024/09/14) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const HP_RATE = (Number(PARAM["HP_RATE"]) || 100) / 100;
const MP_RATE = (Number(PARAM["MP_RATE"]) ?? 100) / 100;

const ATK_BAREHANDS = (Number(PARAM["ATK_BAREHANDS"]) || 0) / 100;
const ATK_LUK_RATE = (Number(PARAM["ATK_LUK_RATE"]) || 0) / 100;
const ATK_LEVEL_RATE = (Number(PARAM["ATK_LEVEL_RATE"]) || 0) / 100;

const MAT_LEVEL_RATE = (Number(PARAM["MAT_LEVEL_RATE"]) || 0) / 100;
const MAT_MMP_RATE = (Number(PARAM["MAT_MMP_RATE"]) || 0) / 100;

const DEF_CRI_RATE = (Number(PARAM["DEF_CRI_RATE"]) || 0) / 100;
const MDF_CRI_RATE = (Number(PARAM["MDF_CRI_RATE"]) || 0) / 100;

const PLUS_POINT = PARAM["PLUS_POINT"];

//--------------------------------------

Object.defineProperties(Game_BattlerBase.prototype, {
	mhp: {
		get: function() {
			return Math.floor(this.param(0) * HP_RATE);
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
			const weapons = this.isActor() ? this.weapons() : null;
			const bareHandsRate = this.isActor() && weapons.length === 0 ? ATK_BAREHANDS : 1;
			const level = this.level || 0;
			const levelPoint = Math.floor(level * ATK_LEVEL_RATE);
			const lukPoint = Math.floor(this.param(7) * ATK_LUK_RATE);
			return Math.floor((this.param(2) + lukPoint + levelPoint) * bareHandsRate);
		},
		configurable: true
	},
	def: {
		get: function() {
			const critical = this.critical ? DEF_CRI_RATE : 1;
			return Math.floor(this.param(3) * critical);
		},
		configurable: true
	},
	mat: {
		get: function() {
			const level = this.level || 0;
			const levelPoint = Math.floor(level * MAT_LEVEL_RATE);
			const mmpPoint = Math.floor(this.param(1) * MAT_MMP_RATE);
			return this.param(4) + mmpPoint + levelPoint;
		},
		configurable: true
	},
	mdf: {
		get: function() {
			const critical = this.critical ? MDF_CRI_RATE : 1;
			return Math.floor(this.param(5) * critical);
		},
		configurable: true
	},
});

//--------------------------------------

const _Game_BattlerBase_paramBasePlus = Game_BattlerBase.prototype.paramBasePlus;
Game_BattlerBase.prototype.paramBasePlus = function(paramId) {
	const base = _Game_BattlerBase_paramBasePlus.call(this, ...arguments);
	const plusString = "[" + PLUS_POINT + "]";
	const plusList = JSON.parse(plusString);
	const plus = Number(plusList[paramId]) || 0;
	return Math.max(0, base + plus);
};

//--------------------------------------
})();
