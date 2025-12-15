/*:
 * @target MZ
 * @plugindesc 習得スキル共通化
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param MAIN_SKILLS_ACTOR_ID
 * @text スキル習得アクターID
 * @desc 習得スキルを共通化する元データとなるアクターの番号です。初期値：1
 * @type number
 * @default 1
 * 
 * @help
# KRD_MZ_OnlyOneSkills.js

習得スキル共通化

## 権利表記

(c) 2025 kuroudo119 (くろうど)

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

## 概要

全アクターで同じ習得スキルリストを参照します。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2025/12/15|作成開始
0.1.0|2025/12/15|非公開版完成
1.0.0|2025/12/15|公開

## 以下プラグイン本体（ヘルプ欄には非表示）

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const MAIN_SKILLS_ACTOR_ID = Number(PARAM["MAIN_SKILLS_ACTOR_ID"]) || 0;

//--------------------------------------

const _Game_Actor_skills = Game_Actor.prototype.skills;
Game_Actor.prototype.skills = function() {
	const actorId = MAIN_SKILLS_ACTOR_ID;
	if (actorId > 0) {
		const actor = $gameActors.actor(actorId);
		if (this !== actor) {
			return _Game_Actor_skills.call(actor);
		}
	}
	return _Game_Actor_skills.call(this, ...arguments);
};

//--------------------------------------
})();
/*
```

*/
