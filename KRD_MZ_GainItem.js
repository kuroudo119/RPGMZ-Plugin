/*:
 * @target MZ
 * @plugindesc アイテムの増減（変数版）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @command gainItem
 * @text アイテムの増減
 * @desc アイテムの増減コマンドを呼びます。
 * @arg type
 * @text 種別
 * @desc アイテム、武器、防具から選択。
 * @type select
 * @option アイテム
 * @option 武器
 * @option 防具
 * @arg varItemId
 * @text アイテム番号変数
 * @desc アイテム番号が入った変数番号。
 * @type variable
 * @arg plus
 * @text 増減フラグ
 * @desc 増やす:true ／ 減らす:false
 * @type boolean
 * @default true
 * @arg varCount
 * @text 増減数
 * @desc 増減数が入った変数番号。
 * @type variable
 * @arg equip
 * @text 装備品を含むフラグ
 * @desc 装備品を含んで減らす:true ／ 装備品を含めない:false
 * @type boolean
 * @default false
 * 
 * @command isOverItem
 * @text アイテム所持数チェック
 * @desc 結果スイッチ番号に結果が入ります。アイテムの所持数が指定数以上：true ／指定数未満：false
 * @arg type
 * @text 種別
 * @desc アイテム、武器、防具から選択。
 * @type select
 * @option アイテム
 * @option 武器
 * @option 防具
 * @arg varItemId
 * @text アイテム番号変数
 * @desc アイテム番号が入った変数番号。
 * @type variable
 * @arg itemMax
 * @text アイテム上限数
 * @desc チェックするアイテムの所持上限数を指定します。
 * @type number
 * @arg swResult
 * @text 結果スイッチ番号
 * @desc 結果を入れるスイッチ番号。
 * @type switch
 * 
 * @help
# KRD_MZ_GainItem.js

【実験】

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 使い方

プラグインコマンドから使ってください。

## 更新履歴

- ver.0.0.1 (2024/01/07) 作成開始
- ver.0.1.0 (2024/01/07) 非公開版完成
- ver.0.2.0 (2025/08/25) isOverItem コマンドを追加
- ver.1.0.0 (2025/08/26) 公開

 * 
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "gainItem", function(args) {
	const id = $gameVariables.value(Number(args.varItemId));
	const plus = args.plus === "true";
	const count = $gameVariables.value(Number(args.varCount));
	const equip = args.equip === "true";
	switch(args.type) {
		case "アイテム":
			this.gainItem(id, plus, count);
			break;
		case "武器":
			this.gainWeapon(id, plus, count, equip);
			break;
		case "防具":
			this.gainArmor(id, plus, count, equip);
			break;
	}
});

PluginManager.registerCommand(PLUGIN_NAME, "isOverItem", function(args) {
	const id = $gameVariables.value(Number(args.varItemId));
	const max = Number(args.itemMax);
	const swResult = Number(args.swResult);
	if (args.type === "アイテム") {
		const item = $dataItems[id];
		const result = $gameTemp.isOverItem(item, max);
		$gameSwitches.setValue(swResult, result);
	} else if (args.type === "武器") {
		const item = $dataWeapons[id];
		const result = $gameTemp.isOverItem(item, max);
		$gameSwitches.setValue(swResult, result);
	} else if (args.type === "防具") {
		const item = $dataArmors[id];
		const result = $gameTemp.isOverItem(item, max);
		$gameSwitches.setValue(swResult, result);
	}
});

//--------------------------------------

Game_Interpreter.prototype.gainItem = function(itemId, plus, count) {
	const numPlus = plus ? 0 : -1;
	const params = [itemId, numPlus, 0, count];
	this.command126(params);
};

Game_Interpreter.prototype.gainWeapon = function(itemId, plus, count, equip) {
	const numPlus = plus ? 0 : -1;
	const params = [itemId, numPlus, 0, count, equip];
	this.command127(params);
};

Game_Interpreter.prototype.gainArmor = function(itemId, plus, count, equip) {
	const numPlus = plus ? 0 : -1;
	const params = [itemId, numPlus, 0, count, equip];
	this.command128(params);
};

//--------------------------------------

Game_Temp.prototype.isOverItem = function(item, max) {
	const numItems = $gameParty.numItems(item);
	if (!isNaN(max)) {
		if (numItems >= max) {
			return true;
		}
	}
	return false;
};

//--------------------------------------
})();
