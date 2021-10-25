/*:
 * @target MZ
 * @plugindesc スケジュール管理
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @base KRD_MZ_Calendar
 * 
 * @param cmnOpening
 * @text 開始時コモンイベント
 * @desc シーン開始時に実行されるコモンイベント。
 * @default 1
 * @type common_event
 * 
 * @param cmnDay
 * @text 日付押下時コモンイベント
 * @desc 日付ボタンを押した時に実行されるコモンイベント。
 * @default 2
 * @type common_event
 * 
 * @param cmnCancel
 * @text キャンセル時コモンイベント
 * @desc キャンセルボタンを押した時に実行されるコモンイベント。
 * @default 3
 * @type common_event
 * 
 * @param cmnPage
 * @text ページ切替時コモンイベント
 * @desc ページ切替ボタン（月変更）を押した時に実行されるコモンイベント。
 * @default 4
 * @type common_event
 * 
 * @command startScene
 * @text シーン開始
 * @desc Scene_Schedule を始めます。KRD_MZ_Calendar の年月日変数で初期値を設定できます。
 * 
 * @command clearSchedule
 * @text スケジュール初期化
 * @desc 保存しているスケジュールデータを初期化します。
 * 
 * @command setSchedule
 * @text スケジュール設定
 * @desc 保存しているスケジュールデータに値を1つ設定します。
 * @arg year
 * @text 年
 * @desc 設定対象の年が入っている変数番号を指定します。
 * @type variable
 * @arg month
 * @text 月
 * @desc 設定対象の月が入っている変数番号を指定します。
 * @type variable
 * @arg date
 * @text 日
 * @desc 設定対象の日が入っている変数番号を指定します。
 * @type variable
 * @arg flag
 * @text 設定値
 * @desc 設定日付の「ON:true／OFF:false」が入っているスイッチ番号を指定します。
 * @type switch
 * 
 * @command getSchedule
 * @text スケジュール取得
 * @desc 保存しているスケジュールデータから「ON:true／OFF:false」を取得します。
 * @arg year
 * @text 年
 * @desc 設定対象の年が入っている変数番号を指定します。
 * @type variable
 * @arg month
 * @text 月
 * @desc 設定対象の月が入っている変数番号を指定します。
 * @type variable
 * @arg date
 * @text 日
 * @desc 設定対象の日が入っている変数番号を指定します。
 * @type variable
 * @arg result
 * @text 取得データ
 * @desc 指定日付の「ON:true／OFF:false」を入れるスイッチ番号です。
 * @type switch
 * 
 * @command countSchedule
 * @text スケジュール設定数取得
 * @desc 保存しているスケジュールデータから設定値の数を取得します。
 * @arg result
 * @text 取得データ
 * @desc 取得した値を入れる変数番号です。
 * @type variable
 * 
 * @command firstSchedule
 * @text 保存データ先頭取得
 * @desc 保存しているスケジュールデータの先頭の日付を取得します。
 * @arg result
 * @text 取得データ
 * @desc 取得した値を入れる変数番号です。
 * @type variable
 * 
 * @command lastSchedule
 * @text 保存データ末尾取得
 * @desc 保存しているスケジュールデータの末尾の日付を取得します。
 * @arg result
 * @text 取得データ
 * @desc 取得した値を入れる変数番号です。
 * @type variable
 * 
 * @command diffToday
 * @text 本日日付差分
 * @desc 指定日付と本日日付との日数差分を取得します。
 * @arg year
 * @text 年
 * @desc 設定対象の年が入っている変数番号を指定します。
 * @type variable
 * @arg month
 * @text 月
 * @desc 設定対象の月が入っている変数番号を指定します。
 * @type variable
 * @arg date
 * @text 日
 * @desc 設定対象の日が入っている変数番号を指定します。
 * @type variable
 * @arg result
 * @text 取得データ
 * @desc 取得した値を入れる変数番号です。
 * @type variable
 * 
 * @help
# KRD_MZ_Schedule.js

スケジュール管理

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/08/09) 作成開始
- ver.0.1.0 (2021/08/13) 非公開版完成
- ver.1.0.0 (2021/08/13) 公開
- ver.1.1.0 (2021/08/15) スケジュール管理の開始日取得関数を追加
- ver.1.1.1 (2021/08/15) 即時関数外の変数宣言をletに修正。
- ver.1.2.0 (2021/09/19) ページ切替処理を追加。
- ver.1.3.0 (2021/10/25) プラグインコマンドを追加。

 * 
 * 
 */

let Scene_Schedule = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const CMN_OPENING = Number(PARAM["cmnOpening"]) || 0;
const CMN_DAY = Number(PARAM["cmnDay"]) || 0;
const CMN_CANCEL = Number(PARAM["cmnCancel"]) || 0;

const CMN_PAGE = Number(PARAM["cmnPage"]) || 0;

//======================================
// プラグインコマンド
//======================================
PluginManager.registerCommand(PLUGIN_NAME, "startScene", args => {
	SceneManager.push(Scene_Schedule);
});

PluginManager.registerCommand(PLUGIN_NAME, "clearSchedule", args => {
	$gameSystem.clearSchedule();
});

PluginManager.registerCommand(PLUGIN_NAME, "setSchedule", args => {
	$gameSystem.setSchedule(
		$gameVariables.value(Number(args.year)),
		$gameVariables.value(Number(args.month)),
		$gameVariables.value(Number(args.date)),
		$gameSwitches.value(Number(args.flag))
	);
});

PluginManager.registerCommand(PLUGIN_NAME, "getSchedule", args => {
	$gameSwitches.setValue(Number(args.result),
		$gameSystem.getSchedule(
			$gameVariables.value(Number(args.year)),
			$gameVariables.value(Number(args.month)),
			$gameVariables.value(Number(args.date))
		)
	);
});

PluginManager.registerCommand(PLUGIN_NAME, "countSchedule", args => {
	$gameVariables.setValue(Number(args.result), $gameSystem.countSchedule());
});

PluginManager.registerCommand(PLUGIN_NAME, "firstSchedule", args => {
	$gameVariables.setValue(Number(args.result), $gameSystem.firstSchedule());
});

PluginManager.registerCommand(PLUGIN_NAME, "lastSchedule", args => {
	$gameVariables.setValue(Number(args.result), $gameSystem.lastSchedule());
});

PluginManager.registerCommand(PLUGIN_NAME, "diffToday", args => {
	$gameVariables.setValue(Number(args.result),
		$gameSystem.diffToday(
			$gameVariables.value(Number(args.year)),
			$gameVariables.value(Number(args.month)),
			$gameVariables.value(Number(args.date))
		)
	);
});

//======================================
// スケジュールクラス
//======================================
Scene_Schedule = class extends Scene_Calendar {
	constructor() {
		super(...arguments);
	}

	createDisplayObjects() {
		super.createDisplayObjects();
		this._calendarWindow.deactivate();
		if (CMN_OPENING) {
			$gameTemp.reserveCommonEvent(CMN_OPENING);
		}
	}

	terminate() {
		super.terminate();
		$gameMessage.clear();
		$gameScreen.clear();
	}

	commandDay() {
		if (CMN_DAY) {
			this._calendarWindow.deactivate();
			$gameTemp.reserveCommonEvent(CMN_DAY);
		} else {
			this._calendarWindow.activate();
		}
	}

	commandCancel() {
		if (CMN_CANCEL) {
			this._calendarWindow.deactivate();
			$gameTemp.reserveCommonEvent(CMN_CANCEL);
		} else {
			super.commandCancel();
		}
	}

	finishCommon() {
		if (SceneManager._scene._calendarWindow) {
			this._calendarWindow.activate();
		}
	}

	nextMonth() {
		super.nextMonth(...arguments);
		$gameTemp.reserveCommonEvent(CMN_PAGE);
	}

	previousMonth() {
		super.previousMonth(...arguments);
		$gameTemp.reserveCommonEvent(CMN_PAGE);
	}
};

const KRD_Game_Interpreter_setupReservedCommonEvent = Game_Interpreter.prototype.setupReservedCommonEvent;
Game_Interpreter.prototype.setupReservedCommonEvent = function() {
	if ($gameTemp.isCommonEventReserved()) {
		return KRD_Game_Interpreter_setupReservedCommonEvent.apply(this, arguments);
	} else {
		// コモンイベント終了時処理
		if (SceneManager._scene.finishCommon) {
			SceneManager._scene.finishCommon();
			return false;
		}
	}
	return false;
};

//======================================
// セーブデータ
//======================================
// ここでの month は 1 ～ 12 とする。

const KRD_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	KRD_Game_System_initialize.apply(this, arguments);
	this._schedule = {};
};

Game_System.prototype.clearSchedule = function() {
	this._schedule = {};
};

Game_System.prototype.setSchedule = function(year, month, date, flag) {
	const strDate = this.stringDate(year, month, date);
	if (flag) {
		this._schedule[strDate] = flag;
	} else {
		delete this._schedule[strDate];
	}
};

Game_System.prototype.getSchedule = function(year, month, date) {
	const strDate = this.stringDate(year, month, date);
	return this._schedule[strDate];
};

Game_System.prototype.getAllSchedule = function() {
	return this._schedule;
};

Game_System.prototype.stringDate = function(year, month, date) {
	return year.toString().padStart(4, "0") + month.toString().padStart(2, "0") + date.toString().padStart(2, "0");
};

Game_System.prototype.countSchedule = function() {
	return Object.keys(this._schedule).length;
};

Game_System.prototype.firstSchedule = function() {
	const schedule = Object.keys(this._schedule);
	const first = schedule[0];
	return first;
};

Game_System.prototype.lastSchedule = function() {
	const schedule = Object.keys(this._schedule);
	const len = schedule.length;
	const last = schedule[len - 1];
	return last;
};

Game_System.prototype.dateFromString = function(strDate) {
	if (strDate && strDate.length === 8) {
		const year = Number(strDate.slice(0, 4)) || 1;
		const month = Number(strDate.slice(4, 6)) || 1;
		const date = Number(strDate.slice(6, 8)) || 1;
		return new Date(year, month - 1, date);
	} else {
		return null;
	}
};

Game_System.prototype.diffToday = function(year, month, date) {
	const arg = new Date(year, month - 1, date);
	const today = getToday();
	const diff = arg - today;
	return diff;
};

Game_System.prototype.daysFromLast = function(strDate) {
	if (strDate && strDate.length === 8) {
		const year = Number(strDate.slice(0, 4)) || 1;
		const month = Number(strDate.slice(4, 6)) || 1;
		const date = Number(strDate.slice(6, 8)) || 1;
		const last = new Date(year, month - 1, date);

		const today = getToday();

		const diff = last - today;
		const oneDay = 24 * 60 * 60 * 1000;
		const days = Math.floor(diff / oneDay);
		return days;
	} else {
		return null;
	}
};

// 今日の0時00分のDate型を取得する。
function getToday() {
	const tmp = new Date();
	const y = tmp.getFullYear();
	const m = tmp.getMonth();
	const d = tmp.getDate();
	const today = new Date(y, m, d);
	return today;
};

//======================================
})();
