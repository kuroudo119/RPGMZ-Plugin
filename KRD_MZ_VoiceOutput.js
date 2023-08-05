/*:
 * @target MZ
 * @plugindesc 音声出力（音声合成）
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @param OPTION_SPEAK_VOLUME
 * @text 音声合成音量オプション
 * @desc 音声合成の音量をオプションに追加します。追加しない場合は文字を消してください。
 * @default 合成音量
 * 
 * @param DEFAULT_SPEAK
 * @text 音声合成音量既定値
 * @desc 音声合成音量のデフォルト値（0 ～ 100）。初期値：100
 * @default 100
 * @type number
 * @max 100
 * 
 * @param AUTO_CANCEL
 * @text メッセージ自動キャンセル
 * @desc 「文章の表示」を閉じる時に音声合成の再生を終了します。
 * @default true
 * @type boolean
 * 
 * @param AUTO_CANCEL_SCROLL
 * @text スクロール自動キャンセル
 * @desc 「文章のスクロール表示」を閉じる時に音声合成の再生を終了します。
 * @default true
 * @type boolean
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
 * @arg pitch
 * @text ピッチ
 * @desc 音声合成のピッチ（音の高低）のパーセントです。初期値：100
 * @default 100
 * @type number
 * @arg rate
 * @text レート
 * @desc 音声合成のレート（速度）のパーセントです。初期値：100
 * @default 100
 * @type number
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
 * @arg pitch
 * @text ピッチ
 * @desc 音声合成のピッチ（音の高低）のパーセントです。初期値：100
 * @default 100
 * @type number
 * @arg rate
 * @text レート
 * @desc 音声合成のレート（速度）のパーセントです。初期値：100
 * @default 100
 * @type number
 * 
 * @command VOICE_CANCEL
 * @text 音声キャンセル
 * @desc 再生中の音声を取り消します。
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

プラグインコマンドを使用すると、
Web Speech API に対応したブラウザで音声が流れます。

## 更新履歴

- ver.0.0.1 (2023/07/08) 作成開始
- ver.0.1.0 (2023/07/08) 非公開版完成
- ver.1.0.0 (2023/07/08) 公開
- ver.1.1.0 (2023/07/09) 音量オプションを追加
- ver.1.2.0 (2023/07/10) デフォルト音量、ピッチ、速度、キャンセルを追加
- ver.1.3.0 (2023/07/11) 自動キャンセルを追加
- ver.1.4.0 (2023/08/03) 音声キャンセル時の不具合修正、パラメータ追加
- ver.1.5.0 (2023/08/05) 選択肢ありでの音声キャンセル時の不具合修正
- ver.1.5.1 (2023/08/05) 選択肢ありでの音声キャンセル時の不具合修正

 * 
 * 
 */

const KRD_VOICE_OUTPUT = {};

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const OPTION_SPEAK_VOLUME = PARAM["OPTION_SPEAK_VOLUME"];
const DEFAULT_SPEAK = Number(PARAM["DEFAULT_SPEAK"]) || 0;

const JAPANESE = "ja-JP";

const AUTO_CANCEL = PARAM["AUTO_CANCEL"] === "true";
const AUTO_CANCEL_SCROLL = PARAM["AUTO_CANCEL_SCROLL"] === "true";

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "VOICE_OUTPUT", args => {
	KRD_VOICE_OUTPUT.speak(args.text, args.language, AudioManager.speakVolume, args.pitch, args.rate);
});

PluginManager.registerCommand(PLUGIN_NAME, "VOICE_OUTPUT_VAR", args => {
	const id = Number(args.varText) || 0;
	const text = $gameVariables.value(id);
	KRD_VOICE_OUTPUT.speak(text, args.language, AudioManager.speakVolume, args.pitch, args.rate);
});

PluginManager.registerCommand(PLUGIN_NAME, "VOICE_CANCEL", args => {
	KRD_VOICE_OUTPUT.cancel();
	Input.clear();
	TouchInput.clear();
	KRD_VOICE_OUTPUT._canceled = true;
});

//--------------------------------------
// 音声合成

KRD_VOICE_OUTPUT.speak = function(text, language = JAPANESE, volume, pitch, rate) {
	if ("speechSynthesis" in window) {
		const synth = window.speechSynthesis;
		const utterThis = new SpeechSynthesisUtterance(text);
		utterThis.lang = language;

		if (volume !== undefined) {
			utterThis.volume = (Number(volume) || 0) / 100;
		}
		if (pitch !== undefined) {
			utterThis.pitch = (Number(pitch) || 0) / 100;
		}
		if (rate !== undefined) {
			utterThis.rate = (Number(rate) || 0) / 100;
		}

		synth.speak(utterThis);
	}
};

KRD_VOICE_OUTPUT.cancel = function() {
	if ("speechSynthesis" in window) {
		window.speechSynthesis.cancel();
	}
};

//--------------------------------------
// 音量

AudioManager._speakVolume = DEFAULT_SPEAK;

Object.defineProperty(AudioManager, "speakVolume", {
	get: function() {
		 return this._speakVolume;
	},
	set: function(value) {
		 this._speakVolume = value;
	},
	configurable: true
});

//--------------------------------------
// オプション追加

Object.defineProperty(ConfigManager, "speakVolume", {
	get: function() {
		 return AudioManager.speakVolume;
	},
	set: function(value) {
		 AudioManager.speakVolume = value;
	},
	configurable: true
});

const KRD_ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = KRD_ConfigManager_makeData.apply(this, arguments);
	config.speakVolume = this.speakVolume;
	return config;
};

const KRD_ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	KRD_ConfigManager_applyData.apply(this, arguments);
	this.speakVolume = this.readVolume(config, "speakVolume");
};

const KRD_Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
	if (OPTION_SPEAK_VOLUME) {
		return KRD_Scene_Options_maxCommands.apply(this, arguments) + 1;
	} else {
		return KRD_Scene_Options_maxCommands.apply(this, arguments);
	}
};

const KRD_Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
Window_Options.prototype.addVolumeOptions = function() {
	KRD_Window_Options_addVolumeOptions.apply(this, arguments);
	if (OPTION_SPEAK_VOLUME) {
		this.addCommand(OPTION_SPEAK_VOLUME, "speakVolume");
	}
};

//--------------------------------------
// 自動キャンセル

const KRD_Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
	KRD_Window_Message_terminateMessage.apply(this, arguments);
	if (AUTO_CANCEL) {
		KRD_VOICE_OUTPUT.cancel();
		Input.clear();
		TouchInput.clear();
		KRD_VOICE_OUTPUT._canceled = true;
	}
};

const KRD_Window_ScrollText_terminateMessage = Window_ScrollText.prototype.terminateMessage;
Window_ScrollText.prototype.terminateMessage = function() {
	KRD_Window_ScrollText_terminateMessage.apply(this, arguments);
	if (AUTO_CANCEL_SCROLL) {
		KRD_VOICE_OUTPUT.cancel();
		Input.clear();
		TouchInput.clear();
	}
};

//--------------------------------------
// 自動キャンセルの二重クリック対応

KRD_VOICE_OUTPUT._canceled = false;

const KRD_Window_ChoiceList_onTouchOk = Window_ChoiceList.prototype.onTouchOk;
Window_ChoiceList.prototype.onTouchOk = function() {
	if (AUTO_CANCEL && KRD_VOICE_OUTPUT._canceled) {
		TouchInput.clear();
		KRD_VOICE_OUTPUT._canceled = false;
	}
	KRD_Window_ChoiceList_onTouchOk.apply(this, arguments);
};

const KRD_Window_ChoiceList_onTouchSelect = Window_ChoiceList.prototype.onTouchSelect;
Window_ChoiceList.prototype.onTouchSelect = function() {
	if (AUTO_CANCEL && KRD_VOICE_OUTPUT._canceled) {
		KRD_VOICE_OUTPUT._canceled = false;
	}
	KRD_Window_ChoiceList_onTouchSelect.apply(this, arguments);
};

//--------------------------------------
})();
