/*:
 * @target MZ
 * @plugindesc サイコロを振り、結果を変数に入れます。
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @param swRolling
 * @text サイコロ中スイッチ
 * @desc サイコロを振っている最中である事を示すスイッチ。
 * @default 1
 * @type switch
 * 
 * @param varDice
 * @text サイコロ変数開始位置
 * @desc 指定した変数番号以降の3個の変数を使います。
 * @default 1
 * @type variable
 * 
 * @param plusX
 * @text サイコロ表示X
 * @desc サイコロ表示位置（X座標 408）を補正します。
 * 縦長画面の場合は -96 として下さい。
 * @default 0
 * @type number
 * @min -10000
 * 
 * @param plusY
 * @text サイコロ表示Y
 * @desc サイコロ表示位置（Y座標 140）を補正します。
 * 縦長画面の場合は 240 として下さい。
 * @default 0
 * @type number
 * @min -10000
 * 
 * @command KRD_eraseDice
 * @text サイコロ消去
 * @desc 振ったサイコロ結果を消去します。
 * 
 * @requiredAssets img/pictures/Dice_01
 * @requiredAssets img/pictures/Dice_02
 * @requiredAssets img/pictures/Dice_03
 * @requiredAssets img/pictures/Dice_04
 * @requiredAssets img/pictures/Dice_05
 * @requiredAssets img/pictures/Dice_06
 * 
 * @help
 * KRD_MZ_Dice.js
 * サイコロプラグインです。
 * (c) 2020 kuroudo119
 * 
 * このプラグインはMITライセンスです。
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * ver.1 (2020/11/14) 1st Release.
 * ver.2 (2020/11/15) サイコロ画像フォルダ位置を修正。
 * 
 * 出目1～6のサイコロ画像（100x100ピクセル）を用意して下さい。
 * img/pictures/KRD フォルダ配下にサイコロ画像を置いて下さい。
 * ファイル名は「Dice_01.png」～「Dice_06.png」として下さい。
 * 
 * スイッチを1個使用します。
 * 『サイコロ中スイッチ』をONにするとサイコロを振ります。
 * 止める時はこのスイッチをOFFにして下さい。
 * 
 * 変数を3個使用します。
 * 『使用する変数3個』は以下の用途で使用します。
 *   0: サイコロ個数（最大15個まで）
 *   1: サイコロの計算方法
 *       1:nD6（n個のサイコロ出目を足し算する）
 *       2:D66（片方を10の位、もう片方を1の位）
 *       3:nD6して3以上の個数
 *       4:nD6して4以上の個数
 *       5:D66（小さい出目を10の位とする）
 *       6:D66（大きい出目を10の位とする）
 *   2: サイコロ結果
 * 
 * プラグインコマンドは1個です。
 * サイコロ消去：表示したサイコロを消去します。
 * 
 * このプラグインの使い方
 * 以下のようにイベントコマンドを記述します。
 * 
 * ◆変数の操作：#0001 サイコロ個数 = 8
 * ◆変数の操作：#0002 サイコロ計算方法 = 3
 * ◆スイッチの操作：#0001 サイコロ振ってる = ON
 * ◆文章：なし, なし, ウィンドウ, 下
 * ：　　：サイコロ止める？
 * ◆選択肢の表示：はい (ウィンドウ, 中, #1, -)
 * ：はいのとき
 *   ◆スイッチの操作：#0001 サイコロ振ってる = OFF
 *   ◆
 * ：分岐終了
 * ◆文章：なし, なし, ウィンドウ, 下
 * ：　　：サイコロ結果は \V[3]！！
 * ◆プラグインコマンド：KRD_MZ_Dice, サイコロ消去
 * 
 */

(function() {

'use strict';

const PLUGIN_NAME	= "KRD_MZ_Dice";
const PARAM			= PluginManager.parameters(PLUGIN_NAME);

// Switch ID
const SW_ROLLING	= Number(PARAM["swRolling"]) || 1;

// Variable ID
const VAR_DICE			= Number(PARAM["varDice"]) || 1;
const VAR_ROLL_TYPE		= VAR_DICE + 1;
const VAR_ROLL_RESULT	= VAR_DICE + 2;

// Dice Image Position
const PLUS_X	= Number(PARAM["plusX"]) || 0;
const PLUS_Y	= Number(PARAM["plusY"]) || 0;
const dx		= 408 + PLUS_X;
const dNext		= 120;
const dHalf		= 60;
const dy		= 140 + PLUS_Y;

//------------------------------------------------
// Plugin Command for MV

const KRD_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	KRD_Game_Interpreter_pluginCommand.call(this, command, args);

	switch (command) {
		case 'KRD_eraseDice':
			$gameScreen.eraseDice();
			break;
	}
};

//------------------------------------------------
// Plugin Command for MZ

PluginManager.registerCommand(PLUGIN_NAME, "KRD_eraseDice", () => {
	$gameScreen.eraseDice();
});

//------------------------------------------------
// Dice Roll

const maxDice = 15;

Game_Screen.prototype.rollDice = function(count = 0, max = 1){
	const name = [
		'Dice_01'
		, 'Dice_02'
		, 'Dice_03'
		, 'Dice_04'
		, 'Dice_05'
		, 'Dice_06'
	];
	const d4 = dNext + dHalf;
	const d5 = dNext + dNext;
	const baseX = [
		  [dx] // 1
		, [dx - dHalf, dx + dHalf] // 2
		, [dx - dNext, dx, dx + dNext] // 3
		, [dx - dNext, dx, dx + dNext, dx] // 4
		, [dx - dNext, dx, dx + dNext, dx - dHalf, dx + dHalf] // 5
		, [dx - dNext, dx, dx + dNext, dx - dNext, dx, dx + dNext] // 6
		, [dx - dNext, dx, dx + dNext, dx - dNext, dx, dx + dNext, dx] // 7
		, [dx - dNext, dx, dx + dNext, dx - dNext, dx, dx + dNext, dx - dHalf, dx + dHalf] // 8
		, [dx - dNext, dx, dx + dNext, dx - dNext, dx, dx + dNext, dx - dNext, dx, dx + dNext] // 9
		, [dx - d5, dx - dNext, dx, dx + dNext, dx - d5, dx - dNext, dx, dx + dNext, dx - dNext, dx] //10
		, [dx - d5, dx - dNext, dx, dx + dNext, dx - d5, dx - dNext, dx, dx + dNext, dx - d4, dx - dHalf, dx + dHalf] //11
		, [dx - d5, dx - dNext, dx, dx + dNext, dx - d5, dx - dNext, dx, dx + dNext, dx - d5, dx - dNext, dx, dx + dNext] //12
		, [dx - d5, dx - dNext, dx, dx + dNext, dx - d5, dx - dNext, dx, dx + dNext, dx - d5, dx - dNext, dx, dx + dNext, dx - dHalf] //13
		, [dx - d5, dx - dNext, dx, dx + dNext, dx - d5, dx - dNext, dx, dx + dNext, dx - d5, dx - dNext, dx, dx + dNext, dx - dNext, dx] //14
		, [dx - d5, dx - dNext, dx, dx + dNext, dx - d5, dx - dNext, dx, dx + dNext, dx - d5, dx - dNext, dx, dx + dNext, dx - d4, dx - dHalf, dx + dHalf] //15
	];
	const xx = baseX[max - 1][count];
	const y3 = dy + Math.floor(count / 3) * dNext;
	const y4 = dy + Math.floor(count / 4) * dNext;
	const y5 = dy + Math.floor(count / 4) * dNext;
	const dice = Math.randomInt(6) + 1;
	if (max <= 9) {
		//   showPicture(pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
		this.showPicture(count + 1, name[dice - 1], 1, xx, y3, 100, 100, 255, 0);
	} else if (max <= 12) {
		//   showPicture(pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
		this.showPicture(count + 1, name[dice - 1], 1, xx, y4, 100, 100, 255, 0);
	} else if (max <= 15) {
		//   showPicture(pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
		this.showPicture(count + 1, name[dice - 1], 1, xx, y5, 100, 100, 255, 0);
	}
	return dice;
};

Game_Screen.prototype.rollAllDice = function() {
	$gameVariables.setValue(VAR_ROLL_RESULT, 0);
	const max = Math.min($gameVariables.value(VAR_DICE), maxDice);
	let result = 0;
	for (let i = 0; i < max; i++) {
		result += this.rollDice(i, max);
	}
	$gameVariables.setValue(VAR_ROLL_RESULT, result);
};

Game_Screen.prototype.rollD66 = function() {
	$gameVariables.setValue(VAR_DICE, 2);
	const dice1 = this.rollDice(0, 2);
	const dice2 = this.rollDice(1, 2);
	const result = dice1 * 10 + dice2;
	$gameVariables.setValue(VAR_ROLL_RESULT, result);
};

Game_Screen.prototype.rollD66aA = function() {
	$gameVariables.setValue(VAR_DICE, 2);
	const dice1 = this.rollDice(0, 2);
	const dice2 = this.rollDice(1, 2);
	const result = dice1 <= dice2 ? dice1 * 10 + dice2 : dice2 * 10 + dice1;
	$gameVariables.setValue(VAR_ROLL_RESULT, result);
};

Game_Screen.prototype.rollD66Bb = function() {
	$gameVariables.setValue(VAR_DICE, 2);
	const dice1 = this.rollDice(0, 2);
	const dice2 = this.rollDice(1, 2);
	const result = dice1 > dice2 ? dice1 * 10 + dice2 : dice2 * 10 + dice1;
	$gameVariables.setValue(VAR_ROLL_RESULT, result);
};

Game_Screen.prototype.rollUpper = function(border = 3) {
	$gameVariables.setValue(VAR_ROLL_RESULT, 0);
	const max = Math.min($gameVariables.value(VAR_DICE), maxDice);
	let result = 0;
	for (let i = 0; i < max; i++) {
		result += this.rollDice(i, max) >= border ? 1 : 0;
	}
	$gameVariables.setValue(VAR_ROLL_RESULT, result);
};

Game_Screen.prototype.selectRollType = function() {
	if ($gameSwitches.value(SW_ROLLING)) {
		switch ($gameVariables.value(VAR_ROLL_TYPE)) {
			case 1:
				this.rollAllDice();
				break;
			case 2:
				this.rollD66();
				break;
			case 3:
				this.rollUpper();
				break;
			case 4:
				this.rollUpper(4);
				break;
			case 5:
				this.rollD66aA();
				break;
			case 6:
				this.rollD66Bb();
				break;
			default:
				this.rollAllDice();
				break;
		}
	}
};

const KRD_Game_Screen_updatePictures = Game_Screen.prototype.updatePictures;
Game_Screen.prototype.updatePictures = function() {
	this.selectRollType();
	KRD_Game_Screen_updatePictures.call(this);
};

Game_Screen.prototype.eraseDice = function() {
	const max = Math.min($gameVariables.value(VAR_DICE), maxDice);
	for (let i = 1; i <= max; i++) {
		const realPictureId = this.realPictureId(i);
		this._pictures[realPictureId] = null;
	}
};

//------------------------------------------------
}());
