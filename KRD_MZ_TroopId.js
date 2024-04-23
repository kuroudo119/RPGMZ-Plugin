/*:
 * @target MZ
 * @plugindesc シンボルエンカウント用の敵グループ番号
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_TroopId.js

シンボルエンカウント用の敵グループ番号

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 概要

「戦闘の処理」で「ランダムエンカウントと同じ」場合に、
敵グループの組合せを、
メモ欄で指定した組合せにできます。

同じマップ内でエンカウントする組合せに幅を持たせることができます。

## 使い方

イベントのメモ欄に以下のタグを記述してください。

<encounterList: encounterListのjson >

※「encounterListのjson」については、
マップデータ (Map999.json) 内のencounterListを参考にしてください。
何か設定してコピペすると良いでしょう。

## 更新履歴

- ver.0.0.1 (2024/04/23) 作成開始
- ver.0.1.0 (2024/04/23) 非公開版完成
- ver.1.0.0 (2024/04/23) 公開

 * 
 * 
 */

(() => {

"use strict";

const TAG_ENCOUNTER_LIST = "encounterList";

//--------------------------------------

const _Game_Map_encounterList = Game_Map.prototype.encounterList;
Game_Map.prototype.encounterList = function() {
	const tagEncounterList = this.getTagEncounterList(TAG_ENCOUNTER_LIST);
	if (tagEncounterList) {
		return tagEncounterList;
	} else {
		return _Game_Map_encounterList.call(this, ...arguments);
	}
};

Game_Map.prototype.getTagEncounterList = function(tag) {
	try {
		const event = this._interpreter.character(0);
		const encounterList = event.event().meta[tag];
		const parsed = JSON.parse(encounterList || null);
		return parsed;
	} catch(e) {
		// console.log(e);
		return null;
	}
};

//--------------------------------------
})();
