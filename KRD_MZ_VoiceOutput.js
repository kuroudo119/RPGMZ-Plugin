/*:
 * @target MZ
 * @plugindesc 音声出力（音声合成）
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @command VOICE_OUTPUT
 * @text 音声出力
 * @desc 音声出力（音声合成）するコマンドです。
 * @arg text
 * @text 音声出力文字列
 * @desc テストとして表示する文字列です。
 * @type multiline_string
 * @arg language
 * @text 出力言語
 * @desc 音声出力する言語。日本語は「ja-JP」です。
 * @default ja-JP
 * @type string
 * 
 * @command VOICE_OUTPUT_VAR
 * @text 音声出力（変数版）
 * @desc 変数内の文字列を音声出力（音声合成）するコマンドです。
 * @arg varText
 * @text 音声出力文字列変数番号
 * @desc テストとして表示する文字列が入っている変数の番号です。
 * @type variable
 * @arg language
 * @text 出力言語
 * @desc 音声出力する言語。日本語は「ja-JP」です。
 * @default ja-JP
 * @type string
 * 
 * @help
KRD_MZ_VoiceOutput.js

音声出力（音声合成）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 機能

本プラグインは Web Speech API を使用しています。

## 更新履歴

- ver.0.0.1 (2023/07/08) 作成開始
- ver.0.1.0 (2023/07/08) 非公開版完成
- ver.1.0.0 (2023/07/08) 公開

 * 
 * 
 */

const KRD_VOICE_OUTPUT = {};

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

const JAPANESE = "ja-JP";

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "VOICE_OUTPUT", args => {
	KRD_VOICE_OUTPUT.start(args.text, args.language)
});

PluginManager.registerCommand(PLUGIN_NAME, "VOICE_OUTPUT_VAR", args => {
	const id = Number(args.varText) || 0;
	const text = $gameVariables.value(id);
	KRD_VOICE_OUTPUT.start(text, args.language)
});

//--------------------------------------

KRD_VOICE_OUTPUT.start = function(text, language = JAPANESE) {
	if ("speechSynthesis" in window) {
		try {
			const synth = window.speechSynthesis;
			const utterThis = new SpeechSynthesisUtterance(text);
			utterThis.lang = language;

			synth.speak(utterThis);
			return true;
		} catch (e) {
			return false;
		}
	} else {
		return false;
	}
};

//--------------------------------------
})();
