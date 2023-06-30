/*:
 * @target MZ
 * @plugindesc 歩行スピード変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param swUseThisPlugin
 * @text 機能利用スイッチ番号
 * @desc 本プラグインの利用有無切替スイッチ番号。0 の場合は常時利用する。
 * @default 0
 * @type switch
 * 
 * @param useClassMeta
 * @text 職業メモ欄使用
 * @desc 職業のメモ欄 <moveSpeed:5> を使用する：true ／ 使用しない：false。
 * @default false
 * @type boolean
 * 
 * @command setMoveSpeed
 * @text 移動スピード設定
 * @desc 移動スピード設定処理を実行します。移動ルートの設定コマンド後などに使用してください。
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
- ver.1.1.0 (2022/10/07) 乗り物などに対応した
- ver.1.1.1 (2022/10/09) 移動ルートの設定内スクリプト用フラグ追加
- ver.1.2.0 (2023/01/29) 本プラグインのON/OFFをできるようにした
- ver.1.2.1 (2023/06/30) 本プラグインのON/OFF処理を修正

## 機能概要

歩行スピードを標準(4)と2倍速(5)の中間(4.5)にします。

ダッシュ時のスピードは +1 ですが、最大でも 5 となります。

### プラグインパラメータ「職業メモ欄使用」

プラグインパラメータ「職業メモ欄使用」が true の時、
タグ <moveSpeed:5> が使用可能になります。

職業のメモ欄に <moveSpeed:5> と記述した場合、
そのアクターが先頭の場合、歩行スピードが 5 となります。

タグが無い場合の歩行スピードは 4 になります。

### プラグインコマンド「移動スピード設定」

移動スピード設定処理を実行します。
移動ルートの設定コマンド後などに使用してください。

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const SW_USE_THIS_PLUGIN = Number(PARAM["swUseThisPlugin"]) || 0;
const USE_CLASS_META = PARAM["useClassMeta"] === "true";

const DEFAULT_WALK_SPEED = 4;
const NEW_WALK_SPEED = 4.5;
const MAX_DASH_SPEED = 5;

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "setMoveSpeed", args => {
	$gamePlayer.setMoveSpeed($gamePlayer._moveSpeed);
});

//--------------------------------------

const KRD_Game_Player_setMoveSpeed = Game_Player.prototype.setMoveSpeed;
Game_Player.prototype.setMoveSpeed = function(moveSpeed, flag) {
	if ($gameTemp.useWalkSpeedPlugin()) {
		if (flag) {
			// 移動ルートの設定内スクリプト用フラグ
			this.krdSetMoveSpeed();
		} else if (this.isMoveRouteForcing()) {
			KRD_Game_Player_setMoveSpeed.apply(this, arguments);
		} else if (this._vehicleType === "walk" || this._vehicleGettingOff) {
			this.krdSetMoveSpeed();
		} else {
			KRD_Game_Player_setMoveSpeed.apply(this, arguments);
		}
	} else {
		KRD_Game_Player_setMoveSpeed.apply(this, arguments);
	}
};

const KRD_Game_Player_realMoveSpeed = Game_Player.prototype.realMoveSpeed;
Game_Player.prototype.realMoveSpeed = function() {
	if ($gameTemp.useWalkSpeedPlugin()) {
		const moveSpeed = KRD_Game_Player_realMoveSpeed.apply(this, arguments);
		return moveSpeed >= MAX_DASH_SPEED ? MAX_DASH_SPEED : moveSpeed;
	} else {
		return KRD_Game_Player_realMoveSpeed.apply(this, arguments);
	}
};

//--------------------------------------

Game_Player.prototype.krdSetMoveSpeed = function() {
	if (USE_CLASS_META) {
		this._moveSpeed = this.leaderMoveSpeed();
	} else {
		this._moveSpeed = NEW_WALK_SPEED;
	}
};

Game_Player.prototype.leaderMoveSpeed = function() {
	return Number($dataClasses[$gameParty.leader()._classId]?.meta.moveSpeed) || DEFAULT_WALK_SPEED;
};

//--------------------------------------

Game_Temp.prototype.useWalkSpeedPlugin = function() {
	return SW_USE_THIS_PLUGIN === 0 || $gameSwitches.value(SW_USE_THIS_PLUGIN);
};

//--------------------------------------

const KRD_Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	KRD_Scene_Map_start.apply(this, arguments);
	if ($gameTemp.useWalkSpeedPlugin()) {
		$gamePlayer.setMoveSpeed($gamePlayer._moveSpeed);
	}
};

const KRD_Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
	KRD_Game_Party_addActor.apply(this, arguments);
	if ($gameTemp.useWalkSpeedPlugin()) {
		$gamePlayer.setMoveSpeed($gamePlayer._moveSpeed);
	}
};

const KRD_Game_Party_removeActor = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
	KRD_Game_Party_removeActor.apply(this, arguments);
	if ($gameTemp.useWalkSpeedPlugin()) {
		$gamePlayer.setMoveSpeed($gamePlayer._moveSpeed);
	}
};

const KRD_Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
	KRD_Game_Actor_changeClass.apply(this, arguments);
	if ($gameTemp.useWalkSpeedPlugin()) {
		$gamePlayer.setMoveSpeed($gamePlayer._moveSpeed);
	}
};

//--------------------------------------
})();
