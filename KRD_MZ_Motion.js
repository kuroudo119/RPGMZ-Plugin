/*:
 * @target MZ
 * @plugindesc スキルモーション変更
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @help
 * KRD_MZ_Motion.js
 * (c) 2021 kuroudo119
 * 
 * このプラグインはMITライセンスです。
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * 【更新履歴】
 * ver.1.0.0 (2021/03/08) 初回リリース
 * 
 * 【機能】
 * サイドビュー戦闘時に、指定したスキル（[SV]魔法スキルを含む）の
 * スキル使用アクターモーションを通常攻撃モーションに変更します。
 * 
 * 【使い方】
 * 通常攻撃モーションにしたいスキルのメモ欄に、
 * <attackMotion> を記述します。
 * 
 */

(() => {

"use strict";

//--------------------------------------
// スキルモーション変更

const KRD_Game_Actor_performAction = Game_Actor.prototype.performAction;
Game_Actor.prototype.performAction = function(action) {
	if (action.isSkill() && $dataSkills[action._item._itemId].meta.attackMotion) {
		Game_Battler.prototype.performAction.call(this, action);
		this.performAttack();
	} else {
		KRD_Game_Actor_performAction.apply(this, arguments);
	}
};

//--------------------------------------
})();
