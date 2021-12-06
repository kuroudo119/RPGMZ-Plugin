/*:
 * @target MZ
 * @plugindesc 最大TP基準値変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param maxTpParam
 * @text 基準能力値
 * @desc TP最大値として使う能力値。テキスト欄で固定値を設定する事もできます。
 * @default 100
 * @type select
 * @option 100
 * @option 最大HP
 * @option 最大MP
 * @option 攻撃力
 * @option 防御力
 * @option 魔法力
 * @option 魔法防御
 * @option 敏捷性
 * @option 運
 * 
 * @param regenerateTpFlag
 * @text TP再生率基準値変更
 * @desc TP再生率の基準値を基準能力値に変更する true ／ しない false
 * @default true
 * @type boolean
 * 
 * @help
# KRD_MZ_MaxTP.js

最大TP基準値変更

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/12/06) 作成開始
- ver.0.1.0 (2021/12/06) 非公開版完成
- ver.1.0.0 (2021/12/06) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const MAX_TP_PARAM = PARAM["maxTpParam"];
const REGENERATE_TP_FLAG = PARAM["regenerateTpFlag"] === "true";

const KRD_Game_BattlerBase_maxTp = Game_BattlerBase.prototype.maxTp;
Game_BattlerBase.prototype.maxTp = function() {
	const maxTpParam = this.maxTpParam();
	if (maxTpParam != null) {
		return maxTpParam;
	} else {
		return KRD_Game_BattlerBase_maxTp.apply(this, arguments);
	}
};

const KRD_Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp;
Game_Battler.prototype.regenerateTp = function() {
	if (REGENERATE_TP_FLAG) {
		const maxTpParam = this.maxTpParam();
		if (maxTpParam != null) {
			const value = Math.floor(maxTpParam * this.trg);
			this.gainSilentTp(value);
		} else {
			KRD_Game_Battler_regenerateTp.apply(this, arguments);
		}
	} else {
		KRD_Game_Battler_regenerateTp.apply(this, arguments);
	}
};

Game_BattlerBase.prototype.maxTpParam = function() {
	if (!isNaN(Number(MAX_TP_PARAM))) {
		return Number(MAX_TP_PARAM);
	} else {
		switch (MAX_TP_PARAM) {
			case "なし":
				return null;
			case "最大HP":
				return this.mhp;
			case "最大MP":
				return this.mmp;
			case "攻撃力":
				return this.atk;
			case "防御力":
				return this.def;
			case "魔法力":
				return this.mat;
			case "魔法防御":
				return this.mdf;
			case "敏捷性":
				return this.agi;
			case "運":
				return this.luk;
			default:
				return null;
		}
	}
};

})();
