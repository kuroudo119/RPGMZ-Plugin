/*:
 * @target MZ
 * @plugindesc Window_CrossTable クラス追加
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @base KRD_MZ_Table
 * 
 * @command startScene
 * @text シーン開始
 * @desc Scene_CrossTable を始めます。
 * 
 * @help
# KRD_MZ_CrossTable.js

Window_CrossTable クラス追加

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2024/07/26) 作成開始
- ver.0.1.0 (2024/07/26) 非公開版完成
- ver.1.0.0 (2024/07/26) 公開

 * 
 * 
 */

let Window_CrossTable = null;
let Scene_CrossTable = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

PluginManager.registerCommand(PLUGIN_NAME, "startScene", args => {
	SceneManager.push(Scene_CrossTable);
});

Window_CrossTable = class extends Window_Table {
	initialize(rect) {
		this.clearField();
		super.initialize(...arguments);
		this.select(this.baseIndex());
	}

	addHeader() {
		this.addCommand("\\", "header", false);
		const maxCols = this.fieldCols();
		for (let i = 0; i < maxCols; i++) {
			this.addCommand(i, "header", false);
		}
	}

	addTable() {
		const maxCols = this.fieldCols();
		const maxRows = this.fieldRows();
		for (let i = 0; i < maxRows; i++) {
			this.addCommand(i, "name", false);
			for (let j = 0; j < maxCols; j++) {
				this.addCommand(this._field[i][j], "crossTable", true);
			}
		}
	}

	maxCols() {
		return 4;
	}

	maxBaseRows() {
		return 5;
	}

	fieldCols() {
		return this.maxCols() - 1;
	}

	fieldRows() {
		return this.maxBaseRows() - 1;
	}

	baseIndex() {
		return this.maxCols() + 1;
	}

	drawTable() {
		const indexSize = this.maxCols() * this.maxBaseRows();
		const maxCols = this.maxCols();
		for (let i = maxCols; i < indexSize; i++) {
			const col = i % maxCols;
			if (col === 0) {
				this.drawItemFalse(i);
			} else {
				this.drawItemTrue(i);
			}
		}
	}

	drawItemTrue(index) {
		this.drawItemBackground(index);
		this.drawItem(index);
	}

	drawItemFalse(index) {
		this.drawItem(index);
	}

	hitTest(x, y) {
		if (this.innerRect.contains(x, y)) {
			const cx = this.origin.x + x - this.padding;
			const cy = this.origin.y + y - this.padding;
			const topIndex = this.topIndex();
			const maxCols = this.maxCols();
			// for の初期値を変更した。
			for (let i = this.startIndex(); i < this.maxVisibleItems(); i++) {
				const index = topIndex + i;
				if (index < this.maxItems()) {
					const rect = this.itemRect(index);
					if (rect.contains(cx, cy)) {
						if (index % maxCols === 0) {
							return -1;
						}
						return index;
					}
				}
			}
		}
		return -1;
	}

	cursorUp(wrap) {
		const row = Math.floor(this.index() / this.maxCols());
		if (row > 1) {
			super.cursorUp(...arguments);
		}
	}

	cursorLeft(wrap) {
		const col = this.index() % this.maxCols();
		if (col > 1) {
			super.cursorLeft(...arguments);
		}
	}

	cursorRight(wrap) {
		const col = this.index() % this.maxCols();
		if (col < this.maxCols() - 1) {
			super.cursorRight(...arguments);
		}
	}
	
	initChar() {
		return "-";
	}

	okChar() {
		return "o";
	}

	ngChar() {
		return "x";
	}

	clearField() {
		const tmpRow = [];
		const maxCols = this.fieldCols();
		for (let i = 0; i < maxCols; i++) {
			tmpRow.push(this.initChar());
		}

		this._field = [];
		const maxRows = this.fieldRows();
		for (let i = 0; i < maxRows; i++) {
			const newRow = tmpRow.concat();
			this._field.push(newRow);
		}
	}

	setChar(char, index) {
		const baseIndex = this.baseIndex();
		const maxCols = this.maxCols();
		const x = (index - baseIndex) % maxCols;
		const y = Math.floor((index - baseIndex) / maxCols);

		this._field[y][x] = char;
	}
};

Scene_CrossTable = class extends Scene_Map {
	createDisplayObjects() {
		this.createSpriteset();
		this.createWindowLayer();
  
		// 追加
		this.createCrossTableObjects();

		this.createAllWindows();
		this.createButtons();
		this._mapNameWindow.hide();
	};

	createCrossTableObjects() {
		this.createCrossTableWindow();
	}

	createCrossTableWindow() {
		const rect = this.CrossTableWindowRect();
		const crossTableWindow = new Window_CrossTable(rect);
		crossTableWindow.setHandler("crossTable", this.commandSet.bind(this));
		crossTableWindow.setHandler("cancel", this.commandCancel.bind(this));
		this.addWindow(crossTableWindow);
		this._crossTableWindow = crossTableWindow;
	}

	CrossTableWindowRect() {
		const ww = Graphics.boxWidth;
		const wh = Math.floor(Graphics.boxHeight / 2);
		const wx = 0;
		const wy = Math.floor(Graphics.boxHeight / 4);
		return new Rectangle(wx, wy, ww, wh);
	}

	createButtons() {
		if (ConfigManager.touchUI) {
				this.createCancelButton();
		}
	}

	createCancelButton() {
		this._cancelButton = new Sprite_Button("cancel");
		this._cancelButton.x = Graphics.boxWidth - this._cancelButton.width - 4;
		this._cancelButton.y = this.buttonY();
		this.addWindow(this._cancelButton);
	};

	commandSet() {
		this._crossTableWindow.setChar(this._crossTableWindow.okChar(), this._crossTableWindow.index());
		this._crossTableWindow.refresh();
		this._crossTableWindow.activate();
	}

	commandCancel() {
		// オーバーライドして使う。
		SceneManager.goto(Scene_Title);
	}
};

})();
