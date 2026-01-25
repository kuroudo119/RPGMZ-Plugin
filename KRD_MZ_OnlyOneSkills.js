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
 * @param CONCAT_SKILL_LIST
 * @text スキル一覧結合
 * @desc 各アクターのスキル一覧と「スキル習得アクターID」のスキル一覧を結合する：true ／ しない：false
 * @type boolean
 * @default false
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

パーティー外のアクターでもスキル一覧を参照でき、
「スキルの増減」コマンドは使えるので、
仲間にしないスキル一覧専用のアクターを用意しても構いません。

### パラメータ「スキル一覧結合」

「スキル習得アクターID」のスキル一覧に加えて、
各アクターのスキル一覧を結合します。

装備品でのスキル追加により、アクターに差を付ける場合を想定しています。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2025/12/15|作成開始
0.1.0|2025/12/15|非公開版完成
1.0.0|2025/12/15|公開
1.1.0|2026/01/25|「スキル一覧結合」を追加

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
const CONCAT_SKILL_LIST = PARAM["CONCAT_SKILL_LIST"] === "true";

//--------------------------------------

const _Game_Actor_skills = Game_Actor.prototype.skills;
Game_Actor.prototype.skills = function() {
	const result = this.onlyOneSkills();
	if (result != null) {
		return result;
	}
	return _Game_Actor_skills.call(this, ...arguments);
};

Game_Actor.prototype.onlyOneSkills = function() {
	const actorId = MAIN_SKILLS_ACTOR_ID;
	if (actorId > 0) {
		const actor = $gameActors.actor(actorId);
		if (this !== actor) {
			const onlyList = _Game_Actor_skills.call(actor);
			if (CONCAT_SKILL_LIST) {
				const base = _Game_Actor_skills.call(this, ...arguments);
				const joinList = onlyList.concat(base);
				const result = Array.from(new Set(joinList)); // 重複除去
				return result;
			} else {
				return onlyList;
			}
		}
	}
	return null;
};

//--------------------------------------
})();
/*
```

*/
