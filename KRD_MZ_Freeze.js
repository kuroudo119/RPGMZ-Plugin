/*:
 * @target MZ
 * @plugindesc プレイヤーを移動不可にして、代わりにコモンイベントを実行します。
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @param swFreezing
 * @text 移動不可スイッチ
 * @desc プレイヤーを移動不可にする時にONにするスイッチ。
 * @default 1
 * @type switch
 * 
 * @param cmnAction
 * @text 行動コモン
 * @desc 移動の代わりに実行するコモンイベント。
 * @default 1
 * @type common_event
 * 
 * @help
 * KRD_MZ_Freeze.js
 * プレイヤー移動不可プラグインです。
 * (c) 2020 kuroudo119
 * 
 * このプラグインはMITライセンスです。
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * ver.1 (2020/11/14) 1st Release.
 * 
 * 移動不可状態で移動を試みた場合、
 * 移動の代わりにコモンイベントを実行します。
 * 
 */

(function() {

'use strict';

const PLUGIN_NAME	= "KRD_MZ_Freeze";
const PARAM			= PluginManager.parameters(PLUGIN_NAME);

// Switch ID
const SW_FREEZING	= Number(PARAM["swFreezing"]) || 1;

// Common Event ID
const CMN_ACTION	= Number(PARAM["cmnAction"]) || 1;

//------------------------------------------------
// Player can't move and execute the common event.

const KRD_Game_Player_executeMove = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {
	if ($gameSwitches.value(SW_FREEZING)) {
		$gameTemp.reserveCommonEvent(CMN_ACTION);
	} else {
		KRD_Game_Player_executeMove.call(this, direction);
	}
};

const KRD_Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
Game_Player.prototype.triggerButtonAction = function() {
	if ($gameSwitches.value(SW_FREEZING)) {
		if (Input.isTriggered('ok')) {
			$gameTemp.reserveCommonEvent(CMN_ACTION);
			return true;
		}
		return false;
	} else {
		KRD_Game_Player_triggerButtonAction.call(this);
	}
};

}());
