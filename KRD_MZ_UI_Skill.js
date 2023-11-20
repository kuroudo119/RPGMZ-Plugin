/*:
 * @target MZ
 * @plugindesc スキル画面の挙動修正
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_UI_Skill.js

スキル画面の挙動修正

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

メニューのスキル画面で以下の挙動を修正します。

- 味方全体が対象のスキルで先頭キャラしか選択決定できない件
- 「＜」「＞」ボタンでキャラ変更した時のリスト側フォーカスの件

## 更新履歴

- ver.0.0.1 (2023/11/20) 作成開始
- ver.0.1.0 (2023/11/20) 非公開版完成
- ver.1.0.0 (2023/11/20) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------
// 味方全体が対象のスキルで先頭キャラしか選択決定できない件の修正

const _Window_Selectable_onTouchOk = Window_Selectable.prototype.onTouchOk;
Window_Selectable.prototype.onTouchOk = function() {
	_Window_Selectable_onTouchOk.call(this, ...arguments);
	if (this.isTouchOkEnabled()) {
		const hitIndex = this.hitIndex();
		if (this.cursorAll() && hitIndex >= 0) {
			this.processOk();
		}
	}
};

//--------------------------------------
// 「＜」「＞」ボタンでキャラ変更した時のリスト側フォーカスの件の修正

const _Scene_Skill_onActorChange = Scene_Skill.prototype.onActorChange;
Scene_Skill.prototype.onActorChange = function() {
	_Scene_Skill_onActorChange.call(this, ...arguments);
	this._itemWindow.deactivate();
};

//--------------------------------------
})();
