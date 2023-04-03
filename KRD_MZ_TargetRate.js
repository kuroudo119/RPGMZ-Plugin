/*:
 * @target MZ
 * @plugindesc 隊列狙われ率変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param formationTgrRate
 * @text 狙われ率変更率
 * @desc アクターの狙われ率が変更される割合（パーセント）をカンマ区切りで記述。
 * @default 100, 100, 100, 100
 * 
 * @help
# KRD_MZ_TargetRate.js

隊列狙われ率変更

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/12/10) 作成開始
- ver.0.1.0 (2022/12/10) 非公開版完成
- ver.0.2.0 (2022/12/13) プラグインパラメータをカンマ区切りに変更
- ver.0.3.0 (2022/12/17) エラー時デフォルト値を変更
- ver.0.4.0 (2023/04/03) エラー時デフォルト値を定数化
- ver.1.0.0 (2023/04/03) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const RATE_LIST = JSON.parse("[" + PARAM["formationTgrRate"] + "]");
const DEFAULT_RATE = 100;

//--------------------------------------

Object.defineProperties(Game_Actor.prototype, {
	tgr: {
		get: function() {
			const baseTgr = this.sparam(0);
			const baseRate = RATE_LIST[this.index()] >= 0 ? RATE_LIST[this.index()] : DEFAULT_RATE;
			const rate = baseRate / 100;
			return baseTgr * rate;
		},
		configurable: true
	}
});

//--------------------------------------
})();
