/*:
 * @target MZ
 * @plugindesc Window_Table クラス追加
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_Table.js

Window_Table クラス追加

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/08/09) 作成開始
- ver.0.1.0 (2021/08/12) 非公開版完成

 * 
 * 
 */

Window_Table = null;

(() => {

"use strict";

Window_Table = class extends Window_Command {
	makeCommandList() {
		super.makeCommandList();
		this.addHeader();
		this.addBlank();
		this.addTable();
	}

	addHeader() {
		// オーバーライドして使う。
		for (let i = 1; i <= this.maxCols(); i++) {
			this.addCommand(i, "header", false);
		}
	}

	addBlank() {
		for (let i = 0; i < this.blank(); i++) {
			this.addCommand("", "blank", false);
		}
	}

	addTable() {
		// オーバーライドして使う。
	}

	blank() {
		return 0;
	}

	drawAllItems() {
		this.drawHeader();
		this.drawBlank();
		this.drawTable();
	}

	drawBlockItem(start, end, color, background) {
		const topIndex = this.topIndex();
		for (let i = start; i < end; i++) {
			const index = topIndex + i;
			if (index < this.maxItems()) {
				if (background) {
					this.drawItemBackground(index);
				}
				if (color) {
					const div = this.maxCols() || 1;
					this.drawItemColor(index, color[index % div]);
				} else {
					this.drawItem(index);
				}
			}
		}
	}

	drawHeader() {
		const start = 0;
		const end = this.maxCols();
		const color = null;
		this.drawBlockItem(start, end, color, false);
	}

	drawBlank() {
		const start = this.maxCols();
		const end = start + this.blank();
		this.drawBlockItem(start, end, null, false);
	}

	drawTable() {
		const start = this.maxCols() + this.blank();
		const end = this.maxVisibleItems();
		const color = null;
		this.drawBlockItem(start, end, color, true);
	}

	drawItemColor(index, color = 0) {
		const rect = this.itemLineRect(index);
		const align = this.itemTextAlign();
		this.changeTextColor(ColorManager.textColor(color));
		this.changePaintOpacity(this.isCommandEnabled(index));
		this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
	}

	startIndex() {
		return this.maxCols() + this.blank();
	}

	initIndex() {
		return this.startIndex();
	}

	onTouchOk() {
		if (this.isTouchOkEnabled()) {
			const hitIndex = this.hitIndex();
			if (this._cursorFixed) {
				if (hitIndex === this.index()) {
					this.processOk();
				}
			} else if (hitIndex >= 0) {
				// if を追加した。
				if (hitIndex === this.index()) {
					this.processOk();
				}
			}
		}
	}

	hitTest(x, y) {
		if (this.innerRect.contains(x, y)) {
			const cx = this.origin.x + x - this.padding;
			const cy = this.origin.y + y - this.padding;
			const topIndex = this.topIndex();
			// for の初期値を変更した。
			for (let i = this.startIndex(); i < this.maxVisibleItems(); i++) {
				const index = topIndex + i;
				if (index < this.maxItems()) {
					const rect = this.itemRect(index);
					if (rect.contains(cx, cy)) {
						return index;
					}
				}
			}
		}
		return -1;
	}

	isIndexOk(nextIndex) {
		return nextIndex >= this.startIndex();
	}

	cursorUp(wrap) {
		const index = Math.max(0, this.index());
		const maxCols = this.maxCols();
		if (this.isIndexOk(index - maxCols)) {
			super.cursorUp(...arguments);
		}
	}

	cursorLeft(wrap) {
		const index = Math.max(0, this.index());
		if (this.isIndexOk(index - 1)) {
			super.cursorLeft(...arguments);
		}
	}

	cursorPageup() {
		const index = this.index();
		if (this.isIndexOk(index - this.maxPageItems())) {
			super.cursorPageup(...arguments);
		}
	}
};

})();
