/*:
 * @target MZ
 * @plugindesc 強化・弱体（バフ・デバフ）割合変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param MHP_BUFF_RATE
 * @text 最大HP 強化割合
 * @desc 最大HPの強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
 * @type number
 * 
 * @param MMP_BUFF_RATE
 * @text 最大MP 強化割合
 * @desc 最大MPの強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
 * @type number
 * 
 * @param ATK_BUFF_RATE
 * @text 攻撃力 強化割合
 * @desc 攻撃力の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 50
 * @type number
 * 
 * @param DEF_BUFF_RATE
 * @text 防御力 強化割合
 * @desc 防御力の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 50
 * @type number
 * 
 * @param MAT_BUFF_RATE
 * @text 魔法力 強化割合
 * @desc 魔法力の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 50
 * @type number
 * 
 * @param MDF_BUFF_RATE
 * @text 魔法防御 強化割合
 * @desc 魔法防御の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 50
 * @type number
 * 
 * @param AGI_BUFF_RATE
 * @text 敏捷性 強化割合
 * @desc 敏捷性の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
 * @type number
 * 
 * @param LUK_BUFF_RATE
 * @text 運 強化割合
 * @desc 運の強化・弱体の1段階ごとの変化率（パーセント）です。システム値は 25 です。
 * @default 25
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

## 更新履歴

- ver.0.0.1 (2023/06/15) 作成開始
- ver.0.1.0 (2023/06/15) 非公開版完成
- ver.0.2.0 (2023/06/18) パラメータを能力値ごとに分けた
- ver.1.0.0 (2023/06/18) 公開

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

//--------------------------------------

Game_BattlerBase.prototype.paramBuffRate = function(paramId) {
	return this._buffs[paramId] * PARAM_BUFF_RATE[paramId] + 1.0;
};

//--------------------------------------
})();
