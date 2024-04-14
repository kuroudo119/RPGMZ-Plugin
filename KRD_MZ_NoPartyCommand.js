/*:
 * @target MZ
 * @plugindesc パーティコマンド非表示
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_NoPartyCommand.js

パーティコマンド非表示

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 機能概要

戦闘時のパーティコマンドを非表示にします。
アクターコマンドのキャンセル時にパーティコマンドが表示されます。

## 更新履歴

- ver.0.0.1 (2024/04/14) 作成開始
- ver.0.1.0 (2024/04/14) 非公開版完成
- ver.1.0.0 (2024/04/14) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
	_Scene_Battle_startPartyCommandSelection.call(this, ...arguments);
	if (!this._noSkipPartyCommand) {
		this._partyCommandWindow.deactivate();
		this.commandFight();
	}
};

const _Scene_Battle_commandCancel = Scene_Battle.prototype.commandCancel;
Scene_Battle.prototype.commandCancel = function() {
	this._noSkipPartyCommand = true;
	_Scene_Battle_commandCancel.call(this, ...arguments);
};

const _Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function() {
	_Scene_Battle_endCommandSelection.call(this, ...arguments);
	this._noSkipPartyCommand = false;
};

//--------------------------------------
})();
