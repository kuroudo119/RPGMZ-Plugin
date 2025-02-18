/*:
 * @target MZ
 * @plugindesc drawTextをdrawTextExに変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param WINDOW_LIST
 * @text 対象Window一覧
 * @desc drawTextをdrawTextExに変更するWindowの一覧です。
 * @type select[]
 * @option Window_Selectable
 * @option Window_Command
 * @option Window_Gold
 * @option Window_StatusBase
 * @option Window_MenuCommand
 * @option Window_MenuStatus
 * @option Window_MenuActor
 * @option Window_ItemCategory
 * @option Window_ItemList
 * @option Window_SkillType
 * @option Window_SkillStatus
 * @option Window_SkillList
 * @option Window_EquipStatus
 * @option Window_EquipSlot
 * @option Window_Status
 * @option Window_StatusParams
 * @option Window_StatusEquip
 * @option Window_Options
 * @option Window_SavefileList
 * @option Window_ShopBuy
 * @option Window_ShopNumber
 * @option Window_ShopStatus
 * @option Window_NameEdit
 * @option Window_NameInput
 * @option Window_ChoiceList
 * @option Window_NumberInput
 * @option Window_EventItem
 * @option Window_ScrollText
 * @option Window_MapName
 * @option Window_BattleLog
 * @option Window_PartyCommand
 * @option Window_ActorCommand
 * @option Window_BattleStatus
 * @option Window_BattleActor
 * @option Window_BattleEnemy
 * @option Window_BattleSkill
 * @option Window_BattleItem
 * @option Window_TitleCommand
 * @option Window_GameEnd
 * @option Window_DebugRange
 * @option Window_DebugEdit
 * 
 * @help
# KRD_MZ_Bypass.js

drawTextをdrawTextExに変更

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

## 概要

drawTextをdrawTextExに変えることで、
制御文字が使えるようになります。

ただし、表示位置のセンタリングや
枠内に収める機能が使えなくなります。

## 更新履歴

- ver.0.0.1 (2025/02/18) 作成開始
- ver.0.1.0 (2025/02/18) 非公開版完成
- ver.1.0.0 (2025/02/18) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const WINDOW_LIST = PARAM["WINDOW_LIST"];

//--------------------------------------

const _Window_Base_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
	if (WINDOW_LIST.includes(this.constructor.name)) {
		this.drawTextEx(...arguments);
	} else {
		_Window_Base_drawText.call(this, ...arguments);
	}
};

//--------------------------------------
})();
