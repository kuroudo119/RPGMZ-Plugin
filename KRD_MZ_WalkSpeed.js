/*:
 * @target MZ
 * @plugindesc 歩行スピード変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param useClassMeta
 * @text 職業メモ欄使用
 * @desc 職業のメモ欄 <moveSpeed:5> を使用する：true ／ 使用しない：false。
 * @default false
 * @type boolean
 * 
 * @help
# KRD_MZ_WalkSpeed.js

歩行スピード変更

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/10/06) 作成開始
- ver.0.1.0 (2022/10/06) 非公開版完成
- ver.1.0.0 (2022/10/06) 公開

## 機能概要

歩行スピードを標準(4)と2倍速(5)の中間(4.5)にします。

ダッシュ時のスピードは +1 ですが、最大でも 5 となります。

プラグインパラメータ「職業メモ欄使用」が true の時、
職業のメモ欄に <moveSpeed:5> と記述した場合、
そのアクターが先頭の場合、歩行スピードが 5 となります。

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const USE_CLASS_META = PARAM["useClassMeta"] === "true";

const DEFAULT_WALK_SPEED = 4;
const NEW_WALK_SPEED = 4.5;
const MAX_DASH_SPEED = 5;

//--------------------------------------

Game_Player.prototype.setMoveSpeed = function(moveSpeed) {
	if (USE_CLASS_META) {
		this._moveSpeed = this.leaderMoveSpeed();
	} else {
		this._moveSpeed = NEW_WALK_SPEED;
	}
};

const KRD_Game_Player_realMoveSpeed = Game_Player.prototype.realMoveSpeed;
Game_Player.prototype.realMoveSpeed = function() {
	const moveSpeed = KRD_Game_Player_realMoveSpeed.apply(this, arguments);
	return moveSpeed >= MAX_DASH_SPEED ? MAX_DASH_SPEED : moveSpeed;
};

//--------------------------------------

Game_Player.prototype.leaderMoveSpeed = function() {
	return Number($dataClasses[$gameParty.leader()._classId]?.meta.moveSpeed) || DEFAULT_WALK_SPEED;
};

const KRD_Scene_Menu_terminate = Scene_Menu.prototype.terminate;
Scene_Menu.prototype.terminate = function() {
	KRD_Scene_Menu_terminate.apply(this, arguments);
	if (USE_CLASS_META) {
		$gamePlayer.setMoveSpeed(DEFAULT_WALK_SPEED);
	}
};

const KRD_Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
	KRD_Game_Party_addActor.apply(this, arguments);
	$gamePlayer.setMoveSpeed(DEFAULT_WALK_SPEED);
};

const KRD_Game_Party_removeActor = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
	KRD_Game_Party_removeActor.apply(this, arguments);
	$gamePlayer.setMoveSpeed(DEFAULT_WALK_SPEED);
};

//--------------------------------------
})();
