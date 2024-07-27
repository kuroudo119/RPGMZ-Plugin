/*:
 * @target MZ
 * @plugindesc oxゲーム
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @base KRD_MZ_CrossTable
 * 
 * @param CMN_CANCEL
 * @text キャンセルコモンイベント
 * @desc シーン内でキャンセル時の処理をするコモンイベントの番号です。
 * @type common_event
 * 
 * @param V_GAME_RESULT
 * @text ゲーム結果変数
 * @desc ゲーム結果を入れる変数の番号です。
 * @type variable
 * 
 * @param V_CPU_LEVEL
 * @text CPUレベル変数
 * @desc 対戦相手の強さ（弱：0 ～ 9：強）を入れる変数の番号です。
 * @type variable
 * 
 * @command startScene
 * @text シーン開始
 * @desc Scene_OX_Game を始めます。
 * 
 * @help
# KRD_MZ_OX_Game.js

oxゲーム

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2024/07/25) 作成開始
- ver.0.1.0 (2024/07/26) 非公開版完成
- ver.0.2.0 (2024/07/27) 勝敗チェック処理を修正など
- ver.1.0.0 (2024/07/27) 公開

 * 
 * 
 */

let Window_OX_Game = null;
let Scene_OX_Game = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const CMN_CANCEL = Number(PARAM["CMN_CANCEL"]) || 0;
const V_GAME_RESULT = Number(PARAM["V_GAME_RESULT"]) || 0;

const POINT_WIN = 1;
const POINT_LOSE = -1;
const POINT_DRAW = -10000;
const POINT_PLAYING = 0;

const WIN_COUNT = 3;

const MAX_CPU_LEVEL = 10;
const V_CPU_LEVEL = Number(PARAM["V_CPU_LEVEL"]) || 0;

PluginManager.registerCommand(PLUGIN_NAME, "startScene", args => {
	SceneManager.push(Scene_OX_Game);
});

Window_OX_Game = class extends Window_CrossTable {
	addTable() {
		const maxCols = this.fieldCols();
		const maxRows = this.fieldRows();
		for (let i = 0; i < maxRows; i++) {
			this.addCommand(i, "name", false);
			for (let j = 0; j < maxCols; j++) {
				const data = this._field[i][j];
				if (data !== this.initChar()) {
					this.addCommand(data, "crossTable", false);
				} else {
					this.addCommand(data, "crossTable", true);
				}
			}
		}
	}

	maxCols() {
		return 4;
	}

	maxBaseRows() {
		return 4;
	}

	indexCenter() {
		return 10;
	}

	winPatternList() {
		const base = this.baseIndex();
		const row2Base = base + this.maxCols();
		const row3Base = base + this.maxCols() * 2;
		return [
			[base, base + 1, base + 2],
			[row2Base, row2Base + 1, row2Base + 2],
			[row3Base, row3Base + 1, row3Base + 2],
			[base, row2Base, row3Base],
			[base + 1, row2Base + 1, row3Base + 1],
			[base + 2, row2Base + 2, row3Base + 2],
			[base, row2Base + 1, row3Base + 2],
			[base + 2, row2Base + 1, row3Base],
		];
	}

	priorityIndexList() {
		const base = this.baseIndex();
		const row3Base = base + this.maxCols() * 2;
		return [base, base + 2, row3Base, row3Base + 2];
	}

	checkGame(char) {
		const winPatternList = this.winPatternList();
		const setList = this.setList(char);
		for (const winPattern of winPatternList) {
			const count = this.checkWinPattern(winPattern, setList);
			if (count >= WIN_COUNT) {
				if (char === this.okChar()) {
					return POINT_WIN;
				} else {
					return POINT_LOSE;
				}
			}
		}

		const canSetList = this.canSetList();
		if (canSetList.length === 0) {
			return POINT_DRAW;
		}
		return POINT_PLAYING;
	}

	checkWinPattern(winPattern, setList) {
		let count = 0;
		winPattern.forEach(index => {
			if (setList.includes(index)) {
				count += 1;
			}
		}, this);
		return count;
	}

	canSetList() {
		return this._list.map((data, i) => {
			if(data.enabled) {
				return i;
			}
		}, this).filter(e => !!e);
	}

	setList(char) {
		if (char === this.okChar()) {
			return this.okList();
		} else if (char === this.ngChar()) {
			return this.ngList();
		}
		return [];
	}

	okList() {
		return this._list.map((data, i) => {
			if (data.name === this.okChar()) {
				return i;
			}
		}, this).filter(e => !!e);
	}

	ngList() {
		return this._list.map((data, i) => {
			if (data.name === this.ngChar()) {
				return i;
			}
		}, this).filter(e => !!e);
	}

	opponentSet() {
		const canSetList = this.canSetList();
		if (canSetList.length > 0) {
			const random = Math.floor(Math.random() * MAX_CPU_LEVEL);
			if (random < $gameVariables.value(V_CPU_LEVEL)) {
				let index = this.opponentCenter(canSetList);
				if (!index) index = this.setTest(canSetList, this.ngChar());
				if (!index) index = this.setTest(canSetList, this.okChar());
				if (!index) index = this.opponentPriority(canSetList);
				if (!index) index = this.opponentRandom(canSetList);
				this.setChar(this.ngChar(), index);
			} else {
				this.setChar(this.ngChar(), this.opponentRandom(canSetList));
			}
		}
	}

	opponentCenter(canSetList) {
		const indexCenter = this.indexCenter();
		return canSetList.includes(indexCenter) ? indexCenter : null;
	}

	setTest(canSetList, char) {
		const setList = char === this.okChar() ? this.okList() : this.ngList();
		const winPatternList = this.winPatternList();
		for (const canSet of canSetList) {
			const testList = setList.concat([canSet]);
			for (const winPattern of winPatternList) {
				const count = this.checkWinPattern(winPattern, testList);
				if (count >= WIN_COUNT) {
					return canSet;
				}
			}
		}
		return null;
	}

	opponentPriority(canSetList) {
		const priorityIndexList = this.priorityIndexList();
		return canSetList.find(index => priorityIndexList.includes(index));
	}

	opponentRandom(canSetList) {
		const random = Math.floor(Math.random() * canSetList.length);
		return canSetList[random];
	}
};

Scene_OX_Game = class extends Scene_CrossTable {
	createCrossTableObjects() {
		super.createCrossTableObjects(...arguments);
		const random = Math.floor(Math.random() * 2);
		if (random >= 1) {
			this._crossTableWindow.opponentSet();
			this._crossTableWindow.refresh();
			this._crossTableWindow.activate();
		}
	}

	createCrossTableWindow() {
		const rect = this.CrossTableWindowRect();
		const crossTableWindow = new Window_OX_Game(rect);
		crossTableWindow.setHandler("crossTable", this.commandSet.bind(this));
		crossTableWindow.setHandler("cancel", this.commandCancel.bind(this));
		this.addWindow(crossTableWindow);
		this._crossTableWindow = crossTableWindow;
	}

	commandSet() {
		super.commandSet();
		const result = this._crossTableWindow.checkGame(this._crossTableWindow.okChar());
		if (result === POINT_PLAYING) {
			this._crossTableWindow.opponentSet();
			this._crossTableWindow.refresh();
			this._crossTableWindow.activate();
			const opponentResult = this._crossTableWindow.checkGame(this._crossTableWindow.ngChar());
			if (opponentResult === POINT_LOSE) {
				this.gameLose();
			} else if (opponentResult === POINT_DRAW) {
				this.gameDraw();
			}
		} else if (result === POINT_WIN) {
			this.gameWin();
		} else if (result === POINT_DRAW) {
			this.gameDraw();
		}
	}

	commandCancel() {
		$gameTemp.reserveCommonEvent(CMN_CANCEL);
	}

	gameWin() {
		this._crossTableWindow.deactivate();
		$gameVariables.setValue(V_GAME_RESULT, POINT_WIN);
	}

	gameLose() {
		this._crossTableWindow.deactivate();
		$gameVariables.setValue(V_GAME_RESULT, POINT_LOSE);
	}

	gameDraw() {
		this._crossTableWindow.deactivate();
		$gameVariables.setValue(V_GAME_RESULT, POINT_DRAW);
	}
};

})();
