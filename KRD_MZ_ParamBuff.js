/*:
 * @target MZ
 * @plugindesc 強化・弱体（バフ・デバフ）割合変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param RATE_GROUP
 * @text 強化・弱体割合
 * 
 * @param MHP_BUFF_RATE
 * @text 最大HP 強化割合
 * @desc 最大HPの強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
 * @type number
 * @parent RATE_GROUP
 * 
 * @param MMP_BUFF_RATE
 * @text 最大MP 強化割合
 * @desc 最大MPの強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
 * @type number
 * @parent RATE_GROUP
 * 
 * @param ATK_BUFF_RATE
 * @text 攻撃力 強化割合
 * @desc 攻撃力の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
 * @type number
 * @parent RATE_GROUP
 * 
 * @param DEF_BUFF_RATE
 * @text 防御力 強化割合
 * @desc 防御力の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
 * @type number
 * @parent RATE_GROUP
 * 
 * @param MAT_BUFF_RATE
 * @text 魔法力 強化割合
 * @desc 魔法力の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
 * @type number
 * @parent RATE_GROUP
 * 
 * @param MDF_BUFF_RATE
 * @text 魔法防御 強化割合
 * @desc 魔法防御の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
 * @type number
 * @parent RATE_GROUP
 * 
 * @param AGI_BUFF_RATE
 * @text 敏捷性 強化割合
 * @desc 敏捷性の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
 * @type number
 * @parent RATE_GROUP
 * 
 * @param LUK_BUFF_RATE
 * @text 運 強化割合
 * @desc 運の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
 * @type number
 * @parent RATE_GROUP
 * 
 * @param MAX_BUFF
 * @text 最大強化回数
 * 
 * @param MAX_BUFF_MHP
 * @text 最大HP 最大強化回数
 * @desc 最大HPに強化を重ねがけできる回数です。システム値は 2 ですが初期値 4 です。
 * @default 4
 * @type number
 * @parent MAX_BUFF
 * 
 * @param MAX_BUFF_MMP
 * @text 最大MP 最大強化回数
 * @desc 最大MPに強化を重ねがけできる回数です。システム値は 2 ですが初期値 4 です。
 * @default 4
 * @type number
 * @parent MAX_BUFF
 * 
 * @param MAX_BUFF_ATK
 * @text 攻撃力 最大強化回数
 * @desc 攻撃力に強化を重ねがけできる回数です。システム値は 2 ですが初期値 4 です。
 * @default 4
 * @type number
 * @parent MAX_BUFF
 * 
 * @param MAX_BUFF_DEF
 * @text 防御力 最大強化回数
 * @desc 防御力に強化を重ねがけできる回数です。システム値は 2 ですが初期値 4 です。
 * @default 4
 * @type number
 * @parent MAX_BUFF
 * 
 * @param MAX_BUFF_MAT
 * @text 魔法力 最大強化回数
 * @desc 魔法力に強化を重ねがけできる回数です。システム値は 2 ですが初期値 4 です。
 * @default 4
 * @type number
 * @parent MAX_BUFF
 * 
 * @param MAX_BUFF_MDF
 * @text 魔法防御 最大強化回数
 * @desc 魔法防御に強化を重ねがけできる回数です。システム値は 2 ですが初期値 4 です。
 * @default 4
 * @type number
 * @parent MAX_BUFF
 * 
 * @param MAX_BUFF_AGI
 * @text 敏捷性 最大強化回数
 * @desc 敏捷性に強化を重ねがけできる回数です。システム値は 2 ですが初期値 4 です。
 * @default 4
 * @type number
 * @parent MAX_BUFF
 * 
 * @param MAX_BUFF_LUK
 * @text 運 最大強化回数
 * @desc 運に強化を重ねがけできる回数です。システム値は 2 ですが初期値 4 です。
 * @default 4
 * @type number
 * @parent MAX_BUFF
 * 
 * @param MAX_DEBUFF
 * @text 最大弱体回数
 * 
 * @param MAX_DEBUFF_MHP
 * @text 最大HP 最大弱体回数
 * @desc 弱体を重ねがけできる回数です。システム値は 2 ですが初期値 2 です。
 * @default 2
 * @type number
 * @parent MAX_DEBUFF
 * 
 * @param MAX_DEBUFF_MMP
 * @text 最大MP 最大弱体回数
 * @desc 弱体を重ねがけできる回数です。システム値は 2 ですが初期値 2 です。
 * @default 2
 * @type number
 * @parent MAX_DEBUFF
 * 
 * @param MAX_DEBUFF_ATK
 * @text 攻撃力 最大弱体回数
 * @desc 弱体を重ねがけできる回数です。システム値は 2 ですが初期値 2 です。
 * @default 2
 * @type number
 * @parent MAX_DEBUFF
 * 
 * @param MAX_DEBUFF_DEF
 * @text 防御力 最大弱体回数
 * @desc 防御力弱体を重ねがけできる回数です。システム値は 2 ですが初期値 4 です。
 * @default 4
 * @type number
 * @parent MAX_DEBUFF
 * 
 * @param MAX_DEBUFF_MAT
 * @text 魔法力 最大弱体回数
 * @desc 魔法力に弱体を重ねがけできる回数です。システム値は 2 ですが初期値 2 です。
 * @default 2
 * @type number
 * @parent MAX_DEBUFF
 * 
 * @param MAX_DEBUFF_MDF
 * @text 魔法防御 最大弱体回数
 * @desc 魔法防御に弱体を重ねがけできる回数です。システム値は 2 ですが初期値 4 です。
 * @default 4
 * @type number
 * @parent MAX_DEBUFF
 * 
 * @param MAX_DEBUFF_AGI
 * @text 敏捷性 最大弱体回数
 * @desc 敏捷性に弱体を重ねがけできる回数です。システム値は 2 ですが初期値 2 です。
 * @default 2
 * @type number
 * @parent MAX_DEBUFF
 * 
 * @param MAX_DEBUFF_LUK
 * @text 運 最大弱体回数
 * @desc 運に弱体を重ねがけできる回数です。システム値は 2 ですが初期値 2 です。
 * @default 2
 * @type number
 * @parent MAX_DEBUFF
 * 
 * @param ICON_BUFF_START
 * @text バフ用アイコン画像初期値
 * @desc バフ用アイコン画像の初期indexです。システム値は 32 ですが初期値 320 です。
 * @default 320
 * @type number
 * 
 * @param ICON_DEBUFF_START
 * @text デバフ用アイコン画像初期値
 * @desc デバフ用アイコン画像の初期indexです。システム値は 48 ですが初期値 352 です。
 * @default 352
 * @type number
 * 
 * @help
# KRD_MZ_ParamBuff.js

強化・弱体（バフ・デバフ）割合変更

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 補足

アイコン画像 /img/system/IconSet.png は下方向に画像サイズを拡張可能です。

## 更新履歴

- ver.0.0.1 (2023/06/15) 作成開始
- ver.0.1.0 (2023/06/15) 非公開版完成
- ver.0.2.0 (2023/06/18) パラメータを能力値ごとに分けた
- ver.1.0.0 (2023/06/18) 公開
- ver.1.1.0 (2023/10/29) 最大回数を変更可能にした
- ver.1.1.1 (2023/10/31) パラメータの初期値を変更した
- ver.1.1.2 (2023/11/13) パラメータの初期値を変更した
- ver.2.0.0 (2025/06/18) 最大回数を能力値ごとにした

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const MHP_BUFF_RATE = (Number(PARAM["MHP_BUFF_RATE"]) || 0) / 100;
const MMP_BUFF_RATE = (Number(PARAM["MMP_BUFF_RATE"]) || 0) / 100;
const ATK_BUFF_RATE = (Number(PARAM["ATK_BUFF_RATE"]) || 0) / 100;
const DEF_BUFF_RATE = (Number(PARAM["DEF_BUFF_RATE"]) || 0) / 100;
const MAT_BUFF_RATE = (Number(PARAM["MAT_BUFF_RATE"]) || 0) / 100;
const MDF_BUFF_RATE = (Number(PARAM["MDF_BUFF_RATE"]) || 0) / 100;
const AGI_BUFF_RATE = (Number(PARAM["AGI_BUFF_RATE"]) || 0) / 100;
const LUK_BUFF_RATE = (Number(PARAM["LUK_BUFF_RATE"]) || 0) / 100;

const PARAM_BUFF_RATE = [
	MHP_BUFF_RATE,
	MMP_BUFF_RATE,
	ATK_BUFF_RATE,
	DEF_BUFF_RATE,
	MAT_BUFF_RATE,
	MDF_BUFF_RATE,
	AGI_BUFF_RATE,
	LUK_BUFF_RATE
];

const MAX_BUFF_MHP = Number(PARAM["MAX_BUFF_MHP"] || 0);
const MAX_BUFF_MMP = Number(PARAM["MAX_BUFF_MMP"] || 0);
const MAX_BUFF_ATK = Number(PARAM["MAX_BUFF_ATK"] || 0);
const MAX_BUFF_DEF = Number(PARAM["MAX_BUFF_DEF"] || 0);
const MAX_BUFF_MAT = Number(PARAM["MAX_BUFF_MAT"] || 0);
const MAX_BUFF_MDF = Number(PARAM["MAX_BUFF_MDF"] || 0);
const MAX_BUFF_AGI = Number(PARAM["MAX_BUFF_AGI"] || 0);
const MAX_BUFF_LUK = Number(PARAM["MAX_BUFF_LUK"] || 0);

const MAX_BUFF = [
	MAX_BUFF_MHP,
	MAX_BUFF_MMP,
	MAX_BUFF_ATK,
	MAX_BUFF_DEF,
	MAX_BUFF_MAT,
	MAX_BUFF_MDF,
	MAX_BUFF_AGI,
	MAX_BUFF_LUK
];

const MAX_DEBUFF_MHP = Number(PARAM["MAX_DEBUFF_MHP"] || 0);
const MAX_DEBUFF_MMP = Number(PARAM["MAX_DEBUFF_MMP"] || 0);
const MAX_DEBUFF_ATK = Number(PARAM["MAX_DEBUFF_ATK"] || 0);
const MAX_DEBUFF_DEF = Number(PARAM["MAX_DEBUFF_DEF"] || 0);
const MAX_DEBUFF_MAT = Number(PARAM["MAX_DEBUFF_MAT"] || 0);
const MAX_DEBUFF_MDF = Number(PARAM["MAX_DEBUFF_MDF"] || 0);
const MAX_DEBUFF_AGI = Number(PARAM["MAX_DEBUFF_AGI"] || 0);
const MAX_DEBUFF_LUK = Number(PARAM["MAX_DEBUFF_LUK"] || 0);

const MAX_DEBUFF = [
	MAX_DEBUFF_MHP,
	MAX_DEBUFF_MMP,
	MAX_DEBUFF_ATK,
	MAX_DEBUFF_DEF,
	MAX_DEBUFF_MAT,
	MAX_DEBUFF_MDF,
	MAX_DEBUFF_AGI,
	MAX_DEBUFF_LUK
];

const ICON_BUFF_START = Number(PARAM["ICON_BUFF_START"] || 0);
const ICON_DEBUFF_START = Number(PARAM["ICON_DEBUFF_START"] || 0);

//--------------------------------------

// 上書き
Game_BattlerBase.prototype.paramBuffRate = function(paramId) {
	return this._buffs[paramId] * PARAM_BUFF_RATE[paramId] + 1.0;
};

// 上書き
Game_BattlerBase.prototype.isMaxBuffAffected = function(paramId) {
	return this._buffs[paramId] === MAX_BUFF[paramId];
};

// 上書き
Game_BattlerBase.prototype.isMaxDebuffAffected = function(paramId) {
	return this._buffs[paramId] === -MAX_DEBUFF[paramId];
};

// 上書き
Game_BattlerBase.prototype.buffIconIndex = function(buffLevel, paramId) {
	if (buffLevel > 0) {
		 return ICON_BUFF_START + (buffLevel - 1) * 8 + paramId;
	} else if (buffLevel < 0) {
		 return ICON_DEBUFF_START + (-buffLevel - 1) * 8 + paramId;
	} else {
		 return 0;
	}
};

//--------------------------------------
})();
