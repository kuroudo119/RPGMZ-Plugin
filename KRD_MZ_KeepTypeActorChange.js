/*:
 * @target MZ
 * @plugindesc スキル画面アクター変更時スキルタイプ index 保持
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_KeepTypeActorChange.js

スキル画面アクター変更時スキルタイプ index 保持

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

## 更新履歴

- ver.0.0.1 (2025/04/08) 作成開始
- ver.0.1.0 (2025/04/08) 非公開版完成
- ver.1.0.0 (2025/04/08) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

const _Scene_Skill_onActorChange = Scene_Skill.prototype.onActorChange;
Scene_Skill.prototype.onActorChange = function() {
	const old = this._skillTypeWindow.index();
	_Scene_Skill_onActorChange.call(this, ...arguments);
	if (old < this._skillTypeWindow.maxItems()) {
		this._skillTypeWindow.select(old);
	}
};

//--------------------------------------
})();
