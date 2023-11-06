/*:
 * @target MZ
 * @plugindesc 音声入力（音声認識）
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @param varSpeech
 * @text 入力結果変数番号
 * @desc 音声入力結果（文字列）を入れる変数の番号。
 * @default 1
 * @type variable
 * 
 * @param language
 * @text 入力言語
 * @desc 音声入力する言語。日本語は「ja-JP」。
 * @default ja-JP
 * 
 * @help
_MZ_VoiceInput.js

【権利表記】
(c) 2021 kuroudo119

【利用規約】
このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 
【更新履歴】
ver.0.0.1 (2021/03/10) 作成開始
ver.1.0.0 (2021/03/22) 公開
ver.2.0.0 (2022/02/18) _MZ_Speech からファイル名変更
ver.2.1.0 (2023/11/05) recognition.stop() 処理を追加
ver.2.1.1 (2023/11/06) SpeechRecognition 取得元を修正
ver.2.2.0 (2023/11/06) KRD_VOICE_INPUT.stop() を追加

【機能】
本プラグインは Web Speech API を使用しています。

ブラウザでマイクを使って音声入力（音声認識）します。
ゲームプレイヤーがブラウザのマイクを許可する必要があります。
音声入力結果をプラグインパラメータで指定した変数に入れます。

入力した音声は日本語（漢字に自動変換）となります。

現時点 (2021/03/10) では、ブラウザは Chrome のみ使用可能です。
Chromeであっても、iPhone（iOS）では使用できません。

【使い方】
イベントコマンド「条件分岐」の
「スクリプト」欄に KRD_VOICE_INPUT.start() と書きます。

戻り値がありますので、条件分岐できます。
（条件を満たさないときの分岐のチェックが使えます）
　　音声入力が可能な場合は、戻り値が true です。
　　その後、すぐに音声入力が始まります。
　　音声入力結果はプラグインパラメータで指定した変数に入ります。
　　変数に 0 以外の値が入るまでループするのが良いでしょう。
　　また、このループには時間制限を設けるのが良いでしょう。

　　音声入力できない場合は、戻り値が false （条件を満たさない）です。

【イベントコマンド（例）】
◆変数の操作：#0001 [音声入力データ] = 0
◆変数の操作：#0002 [入力待ちカウンタ] = 0
◆条件分岐：スクリプト：KRD_VOICE_INPUT.start()
　◆文章：なし, なし, 暗くする, 中
　：　　：↓これをマイクに向かって叫べ！！
　：　　：\C[6]\{\{これでもくらえ\}\}\C[0]
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
◆スクリプト：KRD_VOICE_INPUT.stop();
◆文章：なし, なし, ウィンドウ, 中
：　　：音声入力の結果。
：　　：\C[6]\{\{\V[1]\}\}\C[0]

 * 
 * 
 */

const KRD_VOICE_INPUT = {};

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const VAR_SPEECH = Number(PARAM["varSpeech"]) || 0;
const LANGUAGE = PARAM["language"] || "ja-JP";

let recognition = null;

KRD_VOICE_INPUT.start = function(varSpeech = VAR_SPEECH, language = LANGUAGE) {
	if ("speechSynthesis" in window) {
		try {
			const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
			recognition = new SpeechRecognition();
			recognition.lang = language;

			recognition.onresult = (event) => {
				$gameVariables.setValue(varSpeech, event.results[0][0].transcript);
			};

			recognition.onspeechend = () => {
				recognition.stop();
			};

			recognition.start();
			return true;
		} catch (e) {
			return false;
		}
	} else {
		return false;
	}
};

KRD_VOICE_INPUT.stop = function() {
	if (recognition) {
		recognition.stop();
	}
};

})();
