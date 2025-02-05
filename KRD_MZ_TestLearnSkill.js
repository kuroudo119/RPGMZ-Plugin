/*:
 * @target MZ
 * @plugindesc アイテム使用スキル習得のスキルタイプチェック
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_TestLearnSkill.js

アイテム使用スキル習得のスキルタイプチェック

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このソフトウェアはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

### MITライセンス抄訳

1. 利用者はこのソフトウェアを無料で利用することができます。
2. 利用者はこのソフトウェアを改変、再配布することができます。
3. 利用者はこのソフトウェアによる不都合について作者に対し請求できません。
4. このソフトウェアの利用について保証はありません。
5. 作者はこのソフトウェアについての責任を負いません。

## 更新履歴

- ver.0.0.1 (2025/02/04) 作成開始
- ver.0.1.0 (2025/02/04) 非公開版完成
- ver.1.0.0 (2025/02/05) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

const _Game_Action_testItemEffect = Game_Action.prototype.testItemEffect;
Game_Action.prototype.testItemEffect = function(target, effect) {
	if (effect.code === Game_Action.EFFECT_LEARN_SKILL) {
		const skillId = effect.dataId;
		const skillTypeId = $dataSkills[skillId].stypeId;
		const hasSkillType = target.isActor() && target.skillTypes().includes(skillTypeId);

		return hasSkillType && _Game_Action_testItemEffect.call(this, ...arguments);
	} else {
		return _Game_Action_testItemEffect.call(this, ...arguments);
	}
};

//--------------------------------------
})();
