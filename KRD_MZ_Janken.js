/*:
 * @target MZ
 * @plugindesc じゃんけん
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @command janken
 * @text じゃんけん
 * @desc じゃんけんを実行します。
 * @arg varYou
 * @text あなた変数番号
 * @desc あなたの手を入れる変数番号。グー:0, チョキ:1, パー:2
 * @type variable
 * @arg varOpponent
 * @text 対戦相手変数番号
 * @desc 対戦相手の手を入れる変数番号。グー:0, チョキ:1, パー:2
 * @type variable
 * @arg varResult
 * @text 結果変数番号
 * @desc じゃんけんの結果が入る変数番号。勝ち:1, あいこ:0, 負け:-1
 * @type variable
 * 
 * @help
KRD_MZ_Janken.js

じゃんけん

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 使い方

プラグインコマンドを使ってください。

## 更新履歴

- ver.0.0.1 (2021/10/13) 修正開始
- ver.0.1.0 (2021/10/13) 非公開版完成
- ver.0.1.1 (2022/11/14) プラグインコマンド追加
- ver.0.2.0 (2024/02/23) 内部処理を修正
- ver.0.3.0 (2025/09/03) 内部処理を修正
- ver.1.0.0 (2025/09/03) 公開

 * 
 * 
 */

(function() {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "janken", function(args) {
	const you = $gameVariables.value(Number(args.varYou));
	const opponent = $gameVariables.value(Number(args.varOpponent));
	const result = $gameTemp.janken(you, opponent);
	$gameVariables.setValue(Number(args.varResult), result);
});

//--------------------------------------
// ↓you / opp→  rock    scissors    paper
// rock         draw    win         lose
// scissors     lose    draw        win
// paper        win     lose        draw

Game_Temp.prototype.janken = function(you, opponent) {
	const janken = [[ 0,  1, -1],
	                [-1,  0,  1],
	                [ 1, -1,  0]];
	return janken[you][opponent];
};

//--------------------------------------
}());
