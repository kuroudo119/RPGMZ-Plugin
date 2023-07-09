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

プラグインコマンドを使用すると、
Web Speech API に対応したブラウザで音声が流れます。

## 更新履歴

- ver.0.0.1 (2023/07/08) 作成開始
- ver.0.1.0 (2023/07/08) 非公開版完成
- ver.1.0.0 (2023/07/08) 公開
- ver.1.1.0 (2023/07/09) 音量オプションを追加

 * 
 * 
 */

const KRD_VOICE_OUTPUT = {};

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const OPTION_SPEAK_VOLUME = PARAM["OPTION_SPEAK_VOLUME"];

const JAPANESE = "ja-JP";

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "VOICE_OUTPUT", args => {
	KRD_VOICE_OUTPUT.speak(args.text, args.language, AudioManager.speakVolume)
});

PluginManager.registerCommand(PLUGIN_NAME, "VOICE_OUTPUT_VAR", args => {
	const id = Number(args.varText) || 0;
	const text = $gameVariables.value(id);
	KRD_VOICE_OUTPUT.speak(text, args.language, AudioManager.speakVolume)
});

//--------------------------------------
// 音声合成

KRD_VOICE_OUTPUT.speak = function(text, language = JAPANESE, volume) {
	if ("speechSynthesis" in window) {
		try {
			const synth = window.speechSynthesis;
			const utterThis = new SpeechSynthesisUtterance(text);
			utterThis.lang = language;

			if (volume !== undefined) {
				utterThis.volume = (Number(volume) || 0) / 100;
			}

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
// 音量

AudioManager._speakVolume = 100;

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
})();
