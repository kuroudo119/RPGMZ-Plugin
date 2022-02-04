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
 * @param cmnPrePage
 * @text 前ページ時コモンイベント
 * @desc 前ページへの切替ボタン（月変更）を押した時に実行されるコモンイベント。
 * @default 5
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
 * @command drawCircles
 * @text 画像描画
 * @desc カレンダー上のスケジュールがtrueの日付に画像を描画します。
 * @arg pictureName
 * @text 画像
 * @desc 表示する画像データを指定します。
 * @type file
 * @dir img/pictures
 * @arg pictureId
 * @text ピクチャ番号
 * @desc ピクチャ番号開始値（+31まで使用されます）
 * @type number
 * 
 * @command eraseCircles
 * @text 画像消去
 * @desc カレンダー上に描画した画像を消去します。
 * @arg pictureId
 * @text ピクチャ番号
 * @desc ピクチャ番号開始値（+31まで使用されます）
 * @type number
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
- ver.1.4.0 (2021/11/19) 画像描画コマンドを追加。
- ver.1.5.0 (2021/12/18) 前ページボタンは別パラメータにした。
- ver.2.0.0 (2022/02/04) セーブデータのキーを変更した（旧との互換性なし）。

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
const CMN_PRE_PAGE = Number(PARAM["cmnPrePage"]) || 0;

const MONTH_END = 31;

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

PluginManager.registerCommand(PLUGIN_NAME, "drawCircles", args => {
	$gameSystem.drawCircles(Number(args.pictureId), args.pictureName);
});

PluginManager.registerCommand(PLUGIN_NAME, "eraseCircles", args => {
	$gameSystem.eraseCircles(Number(args.pictureId));
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
		if (this._calendarWindow) {
			this._calendarWindow.activate();
		}
	}

	nextMonth() {
		super.nextMonth(...arguments);
		$gameTemp.reserveCommonEvent(CMN_PAGE);
	}

	previousMonth() {
		super.previousMonth(...arguments);
		$gameTemp.reserveCommonEvent(CMN_PRE_PAGE);
	}

	drawCircle(date, pidStart, pictureName) {
		const dateIndex = this._calendarWindow.startIndex() + date - 1;
		const pictureId = pidStart + date;
		const origin = 1;
		const x = this._calendarWindow.rectCenterX(dateIndex);
		const y = this._calendarWindow.rectCenterY(dateIndex);
		const scaleX = 100;
		const scaleY = 100;
		const opacity = 255;
		const blendMode = 0;
		$gameScreen.showPicture(pictureId, pictureName, origin, x, y, scaleX, scaleY, opacity, blendMode);
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
	const strDate = [year, month, date];
	if (flag) {
		this._schedule[strDate] = flag;
	} else {
		delete this._schedule[strDate];
	}
};

Game_System.prototype.getSchedule = function(year, month, date) {
	const strDate = [year, month, date];
	return this._schedule[strDate];
};

Game_System.prototype.makeScheduleMonth = function(year, month) {
	const scheduleMonth = {};
	for (let i = 1; i <= MONTH_END; i++) {
		if (this.getSchedule(year, month, i)) {
			const strDate = [year, month, i];
			scheduleMonth[strDate] = true;
		}
	}
	return scheduleMonth;
};

Game_System.prototype.getScheduleMonth = function(schedule, year, month, date) {
	const strDate = [year, month, date];
	return schedule[strDate];
};

Game_System.prototype.getAllSchedule = function() {
	return this._schedule;
};

Game_System.prototype.getSortedKeys = function() {
	const padded = this.zeroPaddingSchedule(Object.keys(this._schedule));
	const sorted = this.zeroSuppressSchedule(padded.sort());
	return sorted;
};

Game_System.prototype.zeroPaddingSchedule = function(keys) {
	return keys.map(day => {
		if (day.length < 10) {
			const split = day.split(",");
			const year = split[0];
			const month = split[1];
			const date = split[2];
			return year.padStart(4, "0") + "," + month.padStart(2, "0") + "," + date.padStart(2, "0");
		} else {
			return day;
		}
	});
};

Game_System.prototype.zeroSuppressSchedule = function(keys) {
	return keys.map(day => {
		const split = day.split(",");
		const year = Number(split[0]);
		const month = Number(split[1]);
		const date = Number(split[2]);
		return year + "," + month + "," + date;
	});
};

Game_System.prototype.countSchedule = function() {
	return Object.keys(this._schedule).length;
};

Game_System.prototype.firstSchedule = function() {
	const schedule = this.getSortedKeys();
	const first = schedule[0];
	return first;
};

Game_System.prototype.lastSchedule = function() {
	const schedule = this.getSortedKeys();
	const last = schedule[schedule.length - 1];
	return last;
};

Game_System.prototype.dateFromString = function(strDate) {
	if (strDate) {
		const split = strDate.split(",");
		const year = Number(split[0]);
		const month = Number(split[1]);
		const date = Number(split[2]);
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

Game_System.prototype.daysFromToday = function(strDate) {
	if (strDate) {
		const split = strDate.split(",");
		const year = Number(split[0]);
		const month = Number(split[1]);
		const date = Number(split[2]);
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
// 画像描画
//======================================

Game_System.prototype.drawCircles = function(pictureId, pictureName) {
	const year = SceneManager._scene._calendarWindow.getFullYear();
	const month = SceneManager._scene._calendarWindow.getMonth();
	const scheduleMonth = this.makeScheduleMonth(year, month);

	for (let i = 1; i <= MONTH_END; i++) {
		if (this.getScheduleMonth(scheduleMonth, year, month, i)) {
			SceneManager._scene.drawCircle(i, pictureId, pictureName);
		}
	}
};

Game_System.prototype.eraseCircles = function(pictureId) {
	for (let i = pictureId; i <= (pictureId + MONTH_END); i++) {
		$gameScreen.erasePicture(i);
	}
};

//======================================
})();
