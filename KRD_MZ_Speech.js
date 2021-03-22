/*:
 * @target MZ
 * @plugindesc 音声入力（音声認識）
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @param varSpeech
 * @text 音声入力結果変数番号
 * @desc 音声入力結果（文字列）を入れる変数の番号。
 * @default 1
 * @type variable
 * 
 * @help
KRD_MZ_Speech.js

【権利表記】
(c) 2021 kuroudo119

【利用規約】
このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 
【更新履歴】
ver.0.0.1 (2021/03/10) 作成開始
ver.1.0.0 (2021/03/22) 公開

【機能】
本プラグインは Web Speech API を使用しています。

ブラウザでマイクを使って音声入力（音声認識）します。
ゲームプレイヤーがブラウザのマイクを許可する必要があります。
音声入力結果をプラグインパラメータで指定した変数に入れます。

入力した音声は日本語（漢字に自動変換）となります。

現時点 (2021/03/10) では、ブラウザは Chrome のみ使用可能です。
Chromeであっても、iPhone（iOS）では使用できません。

【使い方】
イベントコマンド「条件分岐」の「スクリプト」欄に speech() と書きます。

戻り値がありますので、条件分岐できます。
（条件を満たさないときの分岐のチェックが使えます）
　　音声入力が可能な場合は、戻り値が true です。
　　音声入力できない場合は、戻り値が false （条件を満たさない）です。

【イベントコマンド（参考）】

◆変数の操作：#0001 [音声入力データ] = 0
◆変数の操作：#0002 [入力待ちカウンタ] = 0
◆条件分岐：スクリプト：speech()
　◆文章：なし, なし, 暗くする, 中
　：　　：↓これをマイクに向かって叫べ！！
　：　　：\C[6]\{\{\V[3]\}\}\C[0]
　◆ループ
　　◆条件分岐：[音声入力データ] ≠ 0
　　　◆ループの中断
　　　◆
　　：分岐終了
　　◆条件分岐：[入力待ちカウンタ] > 240
　　　◆文章：なし, なし, 暗くする, 中
　　　：　　：時間切れ。
　　　◆ループの中断
　　　◆
　　：分岐終了
　　◆変数の操作：#0002 [入力待ちカウンタ] += 1
　　◆ウェイト：1フレーム
　　◆
　：以上繰り返し
　◆
：それ以外のとき
　◆文章：なし, なし, 暗くする, 中
　：　　：残念ながら、
　：　　：音声入力が出来ない環境のようです。
　◆
：分岐終了

 * 
 * 
 */

function speech() {
	"use strict";

	const PLUGIN_NAME	= "KRD_MZ_Speech";
	const PARAM			= PluginManager.parameters(PLUGIN_NAME);
	const VAR_SPEECH	= Number(PARAM["varSpeech"]);
	
	if ("speechSynthesis" in window) {
		try {
			const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
			const recognition = new SpeechRecognition();
			recognition.lang = "ja-JP";

			recognition.onresult = ((event) => {
				$gameVariables.setValue(VAR_SPEECH, event.results[0][0].transcript);
			});
	
			recognition.start();
			return true;
		} catch (e) {
			return false;
		}
	} else {
		return false;
	}
}
