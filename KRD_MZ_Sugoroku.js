/*:
 * @target MZ
 * @plugindesc すごろくプラグイン。
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @param cmnSugoroku
 * @text すごろくコモン開始位置
 * @desc このプラグインで使用するコモンイベントの開始位置（6個以上使用する）
 * @default 1
 * @type common_event
 * 
 * @param swSugoroku
 * @text すごろくスイッチ開始位置
 * @desc このプラグインで使用するスイッチの開始位置（2個使用する）
 * @default 1
 * @type switch
 * 
 * @param varSugoroku
 * @text すごろく変数開始位置
 * @desc このプラグインで使用する変数の開始位置（3個使用する）
 * @default 1
 * @type variable
 * 
 * @command KRD_loadSugoroku
 * @text すごろく再開
 * @desc すごろく中のセーブデータをロードした時に使います。
 * 
 * @command KRD_setPlayerStep
 * @text プレイヤー歩数指定
 * @desc プレイヤーが移動する歩数を指定します。
 * @arg varStep
 * @text 歩数変数
 * @desc 移動する歩数の値が入っている変数
 * @type variable
 * 
 * @command KRD_setPlayerStepValue
 * @text プレイヤー歩数指定（値）
 * @desc プレイヤーが移動する歩数の値を指定します。
 * @arg step
 * @text 歩数
 * @desc 移動する歩数の値
 * @type number
 * 
 * @command KRD_setRivalStep
 * @text ライバル歩数指定
 * @desc ライバルが移動する歩数を指定します。
 * @arg varStep
 * @text 歩数変数
 * @desc 移動する歩数の値が入っている変数
 * @type variable
 * 
 * @command KRD_initRival
 * @text ライバル初期化
 * @desc 保存したライバル位置を初期化します。
 * 
 * @help
 * KRD_MZ_Sugoroku.js
 * すごろくプラグインです。
 * (c) 2020 kuroudo119
 * 
 * このプラグインはMITライセンスです。
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * ver.1 (2020/11/14) 1st Release.
 * ver.2 (2020/11/15) 「すごろくコモン開始位置」を変更した。
 * 
 * 【プラグインパラメータ】
 * 「すごろくコモン開始位置」で指定したコモンイベントから
 * 連続したコモンイベントを使用します。
 * それぞれに応じたイベントを作成して下さい。
 *   0:プレイヤー移動処理（プラグイン内では使用しません）
 *   1:ライバル移動処理（プラグイン内では使用しません）
 *   2:ライバルからの衝突時に呼ばれるイベント
 *   3:アクターからの衝突時に呼ばれるイベント
 *   4:戻る移動での衝突時に呼ばれるイベント
 *   5:プレイヤーがマスに止まった時のイベント
 *       リージョン0番のすごろくイベントです。
 *       ゴールイベントとしてお使い下さい。
 *   6:以降リージョン番号に対応するすごろくイベント
 * 
 * 「すごろくスイッチ開始位置」から2個のスイッチを使用します。
 * 必要に応じてイベントコマンドからON／OFFして下さい。
 *   0:すごろくスイッチ
 *       プラグイン内では使いませんが、すごろくの状態管理にお使い下さい。
 *   1:衝突スイッチ
 *       ONの場合、ライバルと衝突します。
 *       OFFの場合、ライバルと重なってもすり抜けます。
 * 
 * 「すごろく変数開始位置」から3個の変数を使用します。
 * いずれもデータの保存用に使います。
 *   0:プレイヤーの向き
 *   1:ライバルX座標
 *   2:ライバルY座標
 * 
 * 【プラグインコマンド】
 * 「すごろく再開」はセーブデータのロード直後に呼ぶためのコマンドです。
 * ライバルの位置が復元されます。
 * 
 * 「プレイヤー歩数指定」と「プレイヤー歩数指定（値）」は
 * プレイヤーの移動に使用します。
 * 変数を使用するか、直接値を指定するかの違いです。
 * 
 * 「ライバル歩数指定」はライバルの移動に使用します。
 * 歩数の入った変数を指定して下さい。
 * 
 * 「ライバル初期化」は新しいマップに移動した場合などに使います。
 * ライバル位置が初期化されます。
 * そのマップでイベント1番が置かれている位置になります。
 * 
 * 【マップに関する設定】
 * 移動に使用するタイルセットに地形タグを設定してください。
 * 
 * 地形タグ : 移動する方向
 *       1 : 下 ↓
 *       2 : 左 ←
 *       3 : 右 →
 *       4 : 上 ↑
 * 
 * 止まった時に発生するコモンイベントの番号と
 * 対応するリージョンIDをマップに設定してください。
 * 「すごろくイベントのコモンイベント番号 ＋ リージョン番号」が
 * 「止まった時に発生するコモンイベントの番号」となります。
 * 
 * 【すごろくの開始について】
 * 自動実行イベントでプラグインコマンド「すごろく再開」を実行して下さい。
 * 各種スイッチや変数を初期化して下さい。
 * そして、「プレイヤー移動処理」を用意して実行して下さい。
 * 
 * 【プレイヤー移動処理】
 * プラグインコマンド「プレイヤー歩数指定」を使用して、
 * プレイヤーが移動する歩数（マスの数）を設定してください。
 * 
 * これにより、マスに設定された地形タグに従って自動的に移動します。
 * そして、止まったマスのリージョンIDを元に
 * 算出されたコモンイベントを実行します。
 * 
 * 【ライバルの使い方】
 * 一緒にすごろくをするキャラクターを1体用意する事が出来ます。
 * このプラグインではこれをライバルと呼びます。
 * 
 * ライバルはイベントID 1 を使います。
 * 
 * ライバルを移動させるには
 * コモンイベントにライバル移動処理を記述する必要があります。
 * 任意の「すごろくイベント」の中にライバル移動処理を記述してください。
 * プレイヤーの移動後に（マスによっては）ライバルが移動します。
 * 
 * ライバル移動処理の中では、
 * プラグインコマンド「ライバル歩数指定」を使用して、
 * ライバルが移動する歩数（マスの数）を設定してください。
 * これにより、ライバルが自動的に移動します。
 * ライバルはマスに止まってもイベントが発生しません。
 * 
 * ライバルとの衝突イベントを発生させる場合、
 * 「衝突スイッチ」を ON にしてください。
 * 
 * 【歩数について】
 * 歩数がマイナスの場合、マスの向きと反対方向に移動します。
 * つまり、戻る移動をするわけですが、曲がる事は出来ません。
 * 
 */

(function() {

'use strict';

const PLUGIN_NAME	= "KRD_MZ_Sugoroku";
const PARAM			= PluginManager.parameters(PLUGIN_NAME);

// Common Event ID
const CMN_SUGOROKU			= Number(PARAM["cmnSugoroku"]) || 1;
const cmnPlayerMove			= CMN_SUGOROKU;      // プラグイン内では使用しない
const cmnRivalMove			= CMN_SUGOROKU + 1;  // プラグイン内では使用しない
const cmnCollisionByRival	= CMN_SUGOROKU + 2;
const cmnCollisionByActor	= CMN_SUGOROKU + 3;
const cmnCollisionByReverse	= CMN_SUGOROKU + 4;
const cmnSugorokuEvent		= CMN_SUGOROKU + 5;

// Switch ID
const SW_SUGOROKU	= Number(PARAM["swSugoroku"]) || 1;
const swSugoroku	= SW_SUGOROKU;    // プラグイン内では使用しない
const swCollision	= SW_SUGOROKU + 1;

// Variable ID
const VAR_SUGOROKU	= Number(PARAM["varSugoroku"]) || 1;
const varDirection	= VAR_SUGOROKU;
const varEventX		= VAR_SUGOROKU + 1;
const varEventY		= VAR_SUGOROKU + 2;

// Event ID
const evRival		= 1;

// Move Speed
const moveSpeed		= 6;
const defaultSpeed	= 4;

//------------------------------------------------
// Plugin Command for MV

const KRD_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	KRD_Game_Interpreter_pluginCommand.call(this, command, args);

	switch (command) {
		case 'KRD_setPlayerStep':
			const v = !!Number(args) ? Number(args) : 0;
			$gamePlayer.setStep($gameVariables.value(v));
			break;
		case 'KRD_setPlayerStepValue':
			const step = !!Number(args) ? Number(args) : 0;
			$gamePlayer.setStep(step);
			break;
		case 'KRD_setRivalStep':
			if (!!$gameMap._events[evRival]) {
				const v = !!Number(args) ? Number(args) : 0;
				$gameMap._events[evRival].setStep($gameVariables.value(v));
			}
			break;
		case 'KRD_loadSugoroku':
			$gamePlayer.loadSugoroku();
			break;
		case 'KRD_initRival':
			if (!!$gameMap._events[evRival]) {
				$gameMap._events[evRival].initRival();
			}
			break;
	}
};

//------------------------------------------------
// Plugin Command for MZ

PluginManager.registerCommand(PLUGIN_NAME, "KRD_loadSugoroku", () => {
	$gamePlayer.loadSugoroku();
});

PluginManager.registerCommand(PLUGIN_NAME, "KRD_setPlayerStep", args => {
	const varStep = Number(args.varStep) || 1;
	$gamePlayer.setStep($gameVariables.value(varStep));
});

PluginManager.registerCommand(PLUGIN_NAME, "KRD_setPlayerStepValue", args => {
	const step = Number(args.step) || 1;
	$gamePlayer.setStep(step);
});

PluginManager.registerCommand(PLUGIN_NAME, "KRD_setRivalStep", args => {
	if (!!$gameMap._events[evRival]) {
		const varStep = Number(args.varStep) || 1;
		$gameMap._events[evRival].setStep($gameVariables.value(varStep));
	}
});

PluginManager.registerCommand(PLUGIN_NAME, "KRD_initRival", () => {
	if (!!$gameMap._events[evRival]) {
		$gameMap._events[evRival].initRival();
	}
});

//------------------------------------------------
// Sugoroku Load from Savedata

Game_Player.prototype.loadSugoroku = function(){
	if (!!$gameMap._events[evRival]) {
		$gameMap._events[evRival].loadRival();
	}
};

//------------------------------------------------
// Sugoroku Step

Game_Player.prototype.setStep = function(step = null){
	this._step = step;
};

Game_Player.prototype.sugorokuStep = function(){
	const x = $gamePlayer.x;
	const y = $gamePlayer.y;
	let direction = $gameMap.terrainTag(x, y);
	const next = $gameVariables.value(varDirection);
	if (next > 0 && next <= 4) {
		direction = next;
		$gameVariables.setValue(varDirection, 0);
	}
	switch (direction) {
		case 1: // Down
			this.setDirection(2);
			break;
		case 2: // Left
			this.setDirection(4);
			break;
		case 3: // Right
			this.setDirection(6);
			break;
		case 4: // Up
			this.setDirection(8);
			break;
		default: // Don't Move
			return;
	}
	this.forceMoveForward();
	if (!!$gameMap._events[evRival]) {
		$gameMap._events[evRival].collisionEvent(cmnCollisionByActor);
	}
};

Game_Player.prototype.sugorokuReverse = function(){
	const x = $gamePlayer.x;
	const y = $gamePlayer.y;
	const tag = $gameMap.terrainTag(x, y);
	switch (tag) {
		case 1: // Down -> Up
			this.setDirection(8);
			break;
		case 2: // Left -> Right
			this.setDirection(6);
			break;
		case 3: // Right -> Left
			this.setDirection(4);
			break;
		case 4: // Up -> Down
			this.setDirection(2);
			break;
		default: // Don't Move
			return;
	}
	this.forceMoveForward();
	if (!!$gameMap._events[evRival]) {
		$gameMap._events[evRival].collisionEvent(cmnCollisionByReverse);
	}
};

const KRD_Game_Player_updateStop = Game_Player.prototype.updateStop;
Game_Player.prototype.updateStop = function() {
	KRD_Game_Player_updateStop.call(this);
	
	if (this._step != null) {
		if (this._step > 0) {
			this._step -= 1;
			this.setMoveSpeed(moveSpeed);
			this.sugorokuStep();
		} else if (this._step < 0) {
			this._step += 1;
			this.setMoveSpeed(moveSpeed);
			this.sugorokuReverse();
		} else {
			this.checkRegion();
			this.setMoveSpeed(defaultSpeed);
			this._step = null;
		}
	}
};

const KRD_Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
	if (!!$gameMap._events[evRival]) {
		if (!!(this._step == null && $gameMap._events[evRival]._step == null)) {
			return KRD_Game_Player_canMove.call(this);
		}
		return false;
	} else {
		if (this._step == null) {
			return KRD_Game_Player_canMove.call(this);
		}
		return false;
	}
};

const KRD_Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
Scene_Map.prototype.isMenuCalled = function() {
	if ($gamePlayer.canMove()) {
		return KRD_Scene_Map_isMenuCalled.call(this);
	}
	return false;
};

//------------------------------------------------
// Sugoroku Stop Event

Game_Player.prototype.checkRegion = function(){
	const x = $gamePlayer.x;
	const y = $gamePlayer.y;
	const region = $gameMap.regionId(x, y);
	$gameTemp.reserveCommonEvent(cmnSugorokuEvent + region);
};

//------------------------------------------------
// Rival Move

Game_Event.prototype.setStep = function(step = null){
	this._step = step;
};

Game_Event.prototype.sugorokuStep = function(){
	const x = this.x;
	const y = this.y;
	const tag = $gameMap.terrainTag(x, y);
	switch (tag) {
		case 1: // Down
			this.setDirection(2);
			break;
		case 2: // Left
			this.setDirection(4);
			break;
		case 3: // Right
			this.setDirection(6);
			break;
		case 4: // Up
			this.setDirection(8);
			break;
		default: // Don't Move
			return;
	}
	this.moveForward();
	this.collisionEvent(cmnCollisionByRival);
};

const KRD_Game_Event_updateStop = Game_Event.prototype.updateStop;
Game_Event.prototype.updateStop = function() {
	KRD_Game_Event_updateStop.call(this);

	if (this._step != null) {
		if (this._step > 0) {
			this._step -= 1;
			this.setThrough(true);
			this.setMoveSpeed(moveSpeed);
			this.sugorokuStep();
		} else {
			this.saveRival();
			this.setMoveSpeed(defaultSpeed);
			this.setThrough(false);
			this._step = null;
		}
	}
};

//------------------------------------------------
// Rival Position

Game_Event.prototype.initRival = function(){
	$gameVariables.setValue(varEventX, 0);
	$gameVariables.setValue(varEventY, 0);
};

Game_Event.prototype.loadRival = function(){
	const x = $gameVariables.value(varEventX);
	const y = $gameVariables.value(varEventY);
	if (x != 0 && y != 0) {
		this.locate(x, y);
	}
};

Game_Event.prototype.saveRival = function(){
	$gameVariables.setValue(varEventX, this.x);
	$gameVariables.setValue(varEventY, this.y);
};

//------------------------------------------------
// Collision

Game_Event.prototype.checkCollision = function(){
	const x = $gamePlayer.x;
	const y = $gamePlayer.y;
	const eventX = this.x;
	const eventY = this.y;
	return x === eventX && y === eventY;
};

Game_Event.prototype.collisionEvent = function(commonId){
	if ($gameSwitches.value(swCollision) && this.checkCollision()) {
		$gamePlayer._step = null;
		this._step = null;
		this.saveRival();
		if (!!commonId) {
			$gameTemp.reserveCommonEvent(commonId);
		}
	}
};

//------------------------------------------------
}());
