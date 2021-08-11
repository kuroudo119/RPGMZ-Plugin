/*:
 * @target MZ
 * @plugindesc 選択肢SE変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param swChoice2nd
 * @text 選択肢2番SE変更スイッチ番号
 * @desc 選択肢2番以降のSE変更可否を指定するスイッチ番号。
 * @default 1
 * @type switch
 * 
 * @param useCancelSE
 * @text キャンセルSE使用
 * @desc true の場合は選択肢2番以降にキャンセルSEを使用。
 * false の場合はブザーSEを使用。
 * @default true
 * @type boolean
 * 
 * @param swChoiceCancel
 * @text 選択肢キャンセルSE変更スイッチ番号
 * @desc 選択肢キャンセル時のSEを決定SEに変更するかどうかのスイッチ番号。
 * @default 2
 * @type switch
 * 
 * @help
# KRD_MZ_ChoiceSE.js

選択肢SE変更

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/08/12) 作成開始
- ver.0.1.0 (2021/08/12) 非公開版完成
- ver.1.0.0 (2021/08/12) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const SW_CHOICE_2ND = Number(PARAM["swChoice2nd"]) || 0;
const SW_CHOICE_CANCEL = Number(PARAM["swChoiceCancel"]) || 0;
const USE_CANCEL_SE = PARAM["useCancelSE"] === "true";

const KRD_Window_ChoiceList_processOk = Window_ChoiceList.prototype.processOk;
Window_ChoiceList.prototype.processOk = function() {
	const index = this.index();
	const swChoice2nd = $gameSwitches.value(SW_CHOICE_2ND);
	if (swChoice2nd && this.isCurrentItemEnabled() && index >= 1) {
		if (USE_CANCEL_SE) {
			SoundManager.playCancel();
		} else {
			SoundManager.playBuzzer();
		}

		this.updateInputData();
		this.deactivate();
		this.callOkHandler();
	} else {
		KRD_Window_ChoiceList_processOk.apply(this, arguments);
	}
};

const KRD_Window_ChoiceList_processCancel = Window_ChoiceList.prototype.processCancel;
Window_ChoiceList.prototype.processCancel = function() {
	const swChoiceCancel = $gameSwitches.value(SW_CHOICE_CANCEL);
	if (swChoiceCancel) {
		SoundManager.playOk();

		this.updateInputData();
		this.deactivate();
		this.callCancelHandler();
	} else {
		KRD_Window_ChoiceList_processCancel.apply(this, arguments);
	}
};

})();
