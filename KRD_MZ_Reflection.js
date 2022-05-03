/*:
 * @target MZ
 * @plugindesc 魔法反射アニメーション表示
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param reflectAnimeId
 * @text 魔法反射アニメーション番号
 * @desc 魔法反射アニメーション番号。デフォルトは42「回復/単体2」
 * @default 42
 * @type number
 * 
 * @help
# KRD_MZ_Reflection.js

魔法反射アニメーション表示

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/09/18) 作成開始
- ver.0.1.0 (2021/09/18) 非公開版完成
- ver.0.1.1 (2022/04/17) ファイル名変更
- ver.0.1.2 (2022/05/03) ファイル名変更
- ver.0.2.0 (2022/05/03) 戦闘開始直後target側にポップアップ出るのを修正
- ver.1.0.0 (2022/05/04) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const REFLECT_ANIME_ID = Number(PARAM["reflectAnimeId"]) || 0;

const KRD_Window_BattleLog_displayReflection = Window_BattleLog.prototype.displayReflection;
Window_BattleLog.prototype.displayReflection = function(target) {
	target._result.clear();
	this.push("showAnimation", target, [target], REFLECT_ANIME_ID);
	KRD_Window_BattleLog_displayReflection.apply(this, arguments);
};

})();
