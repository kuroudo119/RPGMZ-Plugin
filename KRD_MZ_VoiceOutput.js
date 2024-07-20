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
 * @param BUTTON_IOS
 * @text iPhone用ボタン表示
 * @desc iPhoneの場合に「iPhone用ボタン」を表示します。ユーザーが押すと音声合成が利用可能になります。
 * @default true
 * @type boolean
 * 
 * @param BUTTON_IOS_TEXT
 * @text iPhone用ボタン文字列
 * @desc 「iPhone用ボタン」を表示する文字列です。
 * @default 音声合成を使う
 * @parent BUTTON_IOS
 * 
 * @param MESSAGE_TOUCH
 * @text メッセージ送り対処
 * @desc メッセージ表示中の入力処理を変更し、プラグインパラメータ「長押し時間」を使います。
 * @default true
 * @type boolean
 * 
 * @param KEY_REPEAT
 * @text 長押し時間
 * @desc 長押し扱いになる時間。システム値:24、プラグイン初期値:48
 * @default 48
 * @type number
 * @parent MESSAGE_TOUCH
 * 
 * @param AUTO
 * @text 自動
 * 
 * @param VAR_AUTO_SPEAK
 * @text 自動音声合成変数
 * @desc プラグインコマンドなしで音声合成するパターンの変数番号です。変数の値が 0 の時は音声合成しません。
 * @default 0
 * @type variable
 * @parent AUTO
 * 
 * @param AUTO_SPEAK_PATTERN
 * @text 自動音声合成パターン
 * @desc プラグインコマンドなしで音声合成するパターンです。自動音声合成変数の値が1以上の時にパターンを使用します。
 * @type struct<pattern>[]
 * @parent AUTO
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
 * @command VOICE_OUTPUT_VAR2
 * @text 音声出力（変数版）2
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
 * @desc 音声合成のピッチ（音の高低）のパーセントが入っている変数の番号です。
 * @type variable
 * @arg rate
 * @text レート
 * @desc 音声合成のレート（速度）のパーセントが入っている変数の番号です。
 * @type variable
 * 
 * @command VOICE_CANCEL
 * @text 音声キャンセル
 * @desc 再生中の音声を取り消します。
 * 
 * @help
# KRD_MZ_VoiceOutput.js

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

## 自動音声合成

「文章の表示」「文章のスクロール表示」コマンドを使用した際に、
プラグインコマンドなしで音声合成します。

事前に決めた「自動音声合成パターン」を「自動音声合成変数」で指定します。
index = 0 が 1 となります。
0 は自動音声合成しないですので、1 始まりで指定してください。

## iPhone用ボタン

iPhoneではユーザー操作に伴うAPI実行を1回行う必要があります。
そのためのボタンです。

## 制約事項

音声終わりにメッセージ送りをすると
次のメッセージも送られる場合があります。

これは「メッセージ送り対処」を true にし、
「長押し時間」をシステム値より長くすることで回避できます。

この時、「選択肢の表示」コマンドの選択が
クリックからトリガーに変わります。
ちなみに、クリックはボタンを離した時、
トリガーはボタンを押した時です。

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
- ver.1.5.2 (2023/08/17) 修正が適切か不明なのでコメントアウト
- ver.1.6.0 (2023/08/17) speak の引数に null を使用可能にした
- ver.1.7.0 (2023/11/03) VOICE_OUTPUT_VAR2 コマンド追加
- ver.1.8.0 (2023/11/06) iPhone用ボタン追加
- ver.1.9.0 (2023/12/02) コンフィグの音量を優先（関数の直接使用対応）
- ver.1.10.0 (2023/12/21) ゲームパッドでの音声キャンセル時の不具合を修正
- ver.1.11.0 (2024/01/22) iPhone用ボタンの文字列をパラメータ化
- ver.1.12.0 (2024/01/22) 音声終わりメッセージ送りで連打扱いの事象を修正
- ver.1.12.1 (2024/01/25) 上記の追加修正
- ver.1.12.2 (2024/02/11) 選択肢のキャンセルボタンがタッチできないを修正
- ver.1.13.0 (2024/02/12) Web Audio API 動作テスト追加（不要な機能）
- ver.2.0.0 (2024/07/20) 自動音声合成を追加

 * 
 * 
 */

/*~struct~pattern:
 * 
 * @param language
 * @text 出力言語
 * @desc 音声出力する言語。日本語は「ja-JP」です。
 * @default ja-JP
 * @type string
 * 
 * @param pitch
 * @text ピッチ
 * @desc 音声合成のピッチ（音の高低）です。
 * @type number
 * 
 * @param rate
 * @text レート
 * @desc 音声合成のレート（速度）です。
 * @type number
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

const BUTTON_IOS = PARAM["BUTTON_IOS"] === "true";
const BUTTON_IOS_TEXT = PARAM["BUTTON_IOS_TEXT"];

const MESSAGE_TOUCH = PARAM["MESSAGE_TOUCH"] === "true";
const KEY_REPEAT = Number(PARAM["KEY_REPEAT"]) || 0;

const VAR_AUTO_SPEAK = Number(PARAM["VAR_AUTO_SPEAK"]) || 0;
const AUTO_SPEAK_PATTERN = JSON.parse(PARAM["AUTO_SPEAK_PATTERN"] || null);

// 動作確認用
const FORCE_BUTTON_IOS = false;

// Web Audio API 動作テスト
const WEB_AUDIO = false;
const VERSION_PIXY = true;
const AUDIO_SRC = "audio/se/Heal1.ogg";
const AUDIO_ID = "test";

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

PluginManager.registerCommand(PLUGIN_NAME, "VOICE_OUTPUT_VAR2", args => {
	const text = $gameVariables.value(Number(args.varText));
	const pitch = $gameVariables.value(Number(args.pitch));
	const rate = $gameVariables.value(Number(args.rate));
	KRD_VOICE_OUTPUT.speak(text, args.language, AudioManager.speakVolume, pitch, rate);
});

PluginManager.registerCommand(PLUGIN_NAME, "VOICE_CANCEL", args => {
	KRD_VOICE_OUTPUT.cancel();
});

//--------------------------------------
// 音声合成

KRD_VOICE_OUTPUT.speak = function(text, language = JAPANESE, volume, pitch, rate) {
	if ("speechSynthesis" in window) {
		const synth = window.speechSynthesis;
		const utterThis = new SpeechSynthesisUtterance(text);
		utterThis.lang = language;

		const speakVolume = volume == null ? AudioManager.speakVolume : Number(volume) || 0;
		utterThis.volume = speakVolume / 100;

		if (pitch != null && !isNaN(pitch)) {
			utterThis.pitch = (Number(pitch) || 0) / 100;
		}
		if (rate != null && !isNaN(rate)) {
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

const _ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = _ConfigManager_makeData.call(this, ...arguments);
	config.speakVolume = this.speakVolume;
	return config;
};

const _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	_ConfigManager_applyData.call(this, ...arguments);
	this.speakVolume = this.readVolume(config, "speakVolume");
};

const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
	if (OPTION_SPEAK_VOLUME) {
		return _Scene_Options_maxCommands.call(this, ...arguments) + 1;
	} else {
		return _Scene_Options_maxCommands.call(this, ...arguments);
	}
};

const _Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
Window_Options.prototype.addVolumeOptions = function() {
	_Window_Options_addVolumeOptions.call(this, ...arguments);
	if (OPTION_SPEAK_VOLUME) {
		this.addCommand(OPTION_SPEAK_VOLUME, "speakVolume");
	}
};

//--------------------------------------
// 自動キャンセル

const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
	_Window_Message_terminateMessage.call(this, ...arguments);
	if (AUTO_CANCEL) {
		KRD_VOICE_OUTPUT.cancel();
	}
};

const _Window_ScrollText_terminateMessage = Window_ScrollText.prototype.terminateMessage;
Window_ScrollText.prototype.terminateMessage = function() {
	_Window_ScrollText_terminateMessage.call(this, ...arguments);
	if (AUTO_CANCEL_SCROLL) {
		KRD_VOICE_OUTPUT.cancel();
	}
};

//--------------------------------------
// iPhone用ボタン

KRD_VOICE_OUTPUT.isiPhone = function() {
	const r = /iPhone|iPad|iPod/i;
	return !!navigator.userAgent.match(r);
};

KRD_VOICE_OUTPUT.createButtonElement = function() {
	const button = document.createElement("button");
	button.id = "speak";
	button.textContent = BUTTON_IOS_TEXT;
	button.style.position = "absolute";
	button.style.width = "150px"
	button.style.height = "50px"
	button.style.top    = "0px";
	button.style.right  = "0px";
	button.style.zIndex = "12";
	document.body.appendChild(button);
};

// Web Audio API 動作テスト
KRD_VOICE_OUTPUT.createAudioElement = function() {
	const audio = document.createElement("audio");
	audio.src = AUDIO_SRC;
	audio.id = AUDIO_ID;
	document.body.appendChild(audio);
};

// Web Audio API 動作テスト
KRD_VOICE_OUTPUT.audioStart = function() {
	if (VERSION_PIXY) {
		// pixi.js を見て作った処理
		const audioElement = new Audio(AUDIO_SRC);
		audioElement.play();
	} else {
		// Web Audio API で調べた処理
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		const audioContext = new AudioContext();
		const audioElement = document.querySelector("audio");
		const track = audioContext.createMediaElementSource(audioElement);
		track.connect(audioContext.destination);
		audioElement.play();
	}
};

if (FORCE_BUTTON_IOS || (BUTTON_IOS && KRD_VOICE_OUTPUT.isiPhone())) {
	KRD_VOICE_OUTPUT.createButtonElement();

	if (WEB_AUDIO) {
		// Web Audio API 動作テスト
		KRD_VOICE_OUTPUT.createAudioElement();
	}
	
	document.getElementById("speak").addEventListener("click", function(){
		if (WEB_AUDIO) {
			// Web Audio API 動作テスト
			KRD_VOICE_OUTPUT.audioStart();
		} else {
			// 確認音
			SoundManager.playOk();
		}

		window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
		document.body.removeChild(document.getElementById("speak"));
	});
}

//--------------------------------------
// メッセージのタッチ操作を修正
//
// 音声再生が終わるタイミングでクリックすると、
// 長押し扱いになり連続決定されると思われる事象の対処。

const _Window_Message_isTriggered = Window_Message.prototype.isTriggered;
Window_Message.prototype.isTriggered = function() {
	if (MESSAGE_TOUCH) {
		return (
			Input.isRepeated2("ok") ||
			Input.isRepeated2("cancel") ||
			TouchInput.isRepeated2()
		);
	} else {
		return _Window_Message_isTriggered.call(this, ...arguments);
	}
};

Input.keyRepeatWait2 = KEY_REPEAT;
Input.keyRepeatInterval2 = Input.keyRepeatInterval;

Input.isRepeated2 = function(keyName) {
	if (this._isEscapeCompatible(keyName) && this.isRepeated2("escape")) {
		 return true;
	} else {
		 return (
			  this._latestButton === keyName &&
			  (this._pressedTime === 0 ||
					(this._pressedTime >= this.keyRepeatWait2 &&
						 this._pressedTime % this.keyRepeatInterval2 === 0))
		 );
	}
};

TouchInput.keyRepeatWait2 = KEY_REPEAT;
TouchInput.keyRepeatInterval2 = TouchInput.keyRepeatInterval;

TouchInput.isRepeated2 = function() {
	return (
		this.isPressed() &&
		(this._currentState.triggered ||
		(this._pressedTime >= this.keyRepeatWait2 &&
		this._pressedTime % this.keyRepeatInterval2 === 0))
	);
};

const _Window_ChoiceList_processTouch = Window_ChoiceList.prototype.processTouch;
Window_ChoiceList.prototype.processTouch = function() {
	if (MESSAGE_TOUCH) {
		if (this.isOpenAndActive()) {
			if (this.isHoverEnabled() && TouchInput.isHovered()) {
				this.onTouchSelect(false);
			} else if (TouchInput.isTriggered()) {
				this.onTouchSelect(true);
			}
			if (TouchInput.isTriggered()) { // isClicked から変更
				this.onTouchOk();
			} else if (TouchInput.isCancelled()) {
				this.onTouchCancel();
			}
		}
	} else {
		_Window_ChoiceList_processTouch.call(this, ...arguments);
	}
};

//--------------------------------------

const _Game_Message_add = Game_Message.prototype.add;
Game_Message.prototype.add = function(text) {
	const autoSpeak = $gameVariables.value(VAR_AUTO_SPEAK);
	if (autoSpeak > 0) {
		const param = JSON.parse(AUTO_SPEAK_PATTERN[autoSpeak - 1] || null);
		if (param) {
			const cutLangText = cutLangEsc(text);
			const convText = Window_Base.prototype.convertEscapeCharacters(Window_Base.prototype.convertEscapeCharacters(cutLangText));
			const rubyText = typeof KRD_RUBY !== "undefined" ? KRD_RUBY.returnRuby(convText) : convText;
			const speakText = cutEsc(rubyText);
			KRD_VOICE_OUTPUT.speak(speakText, param.language, null, Number(param.pitch), Number(param.rate));
		}
	}
	_Game_Message_add.call(this, ...arguments);
};

function cutEsc(text) {
	const regex1 = /\x1b..\[\d+\]/gi;
	const regex2 = /\x1b.\[\d+\]/gi;
	const regex3 = /\x1b./gi;
	const result1 = text.toString().replace(regex1, "");
	const result2 = result1.toString().replace(regex2, "");
	const result3 = result2.toString().replace(regex3, "");
	return result3;
}

function cutLangEsc(text) {
	const regex1 = /\\LANGF\[.*\]/gi;
	const regex2 = /\\LANGFEND/gi;
	const result1 = text.toString().replace(regex1, "");
	const result2 = result1.toString().replace(regex2, "");
	return result2;
}

//--------------------------------------
})();
