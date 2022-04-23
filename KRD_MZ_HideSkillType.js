/*:
 * @target MZ
 * @plugindesc バトル時スキルタイプ一部非表示
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param hideSkillTypeId
 * @text 非表示スキルタイプ番号
 * @desc バトル時に非表示にするスキルタイプ番号。
 * @default 0
 * @type number
 * 
 * @help
# KRD_MZ_HideSkillType.js

バトル時スキルタイプ一部非表示

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## metaタグ

### <hideGuard>

バトル時に防御コマンドを非表示にする。
アクター or 職業のメモ欄に記述可能。

## 更新履歴

- ver.0.0.1 (2021/09/29) 作成開始
- ver.0.1.0 (2021/09/29) 非公開版完成
- ver.1.0.0 (2021/09/29) 公開
- ver.1.1.0 (2022/04/06) 防御コマンド非表示タグ追加。

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const HIDE_SKILL_TYPE_ID = Number(PARAM["hideSkillTypeId"]) || 0;

Window_ActorCommand.prototype.addSkillCommands = function() {
	const skillTypes = this._actor.skillTypes();
	for (const stypeId of skillTypes) {
		if (stypeId === HIDE_SKILL_TYPE_ID) {
			continue;
		}
		const name = TextManager.skillType ? TextManager.skillType(stypeId) : $dataSystem.skillTypes[stypeId];
		this.addCommand(name, "skill", true, stypeId);
	}
};

const KRD_Window_ActorCommand_addGuardCommand = Window_ActorCommand.prototype.addGuardCommand;
Window_ActorCommand.prototype.addGuardCommand = function() {
	const actorId = this._actor.actorId();
	const classId = this._actor._classId;
	const actorTag = !!$dataActors[actorId].meta.hideGuard;
	const classTag = !!$dataClasses[classId].meta.hideGuard;
	const hideGuard = actorTag || classTag;

	if (!hideGuard) {
		KRD_Window_ActorCommand_addGuardCommand.apply(this, arguments);
	}
};

})();
