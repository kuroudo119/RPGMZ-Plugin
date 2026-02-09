/*:
 * @target MZ
 * @plugindesc 装備タイプ限定最強装備
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param EQUIP_SLOT_LIST
 * @text 最強装備する装備一覧
 * @desc 「最強装備」に含める装備タイプ番号（1始まり）をカンマ区切りで書いてください。
 * @type string
 * 
 * @param CLEAR_SLOT_LIST
 * @text 全て外す装備一覧
 * @desc 「全て外す」に含める装備タイプ番号（1始まり）をカンマ区切りで書いてください。
 * @type string
 * 
 * @help
# KRD_MZ_OptimizeEquip.js

装備タイプ限定最強装備

## 権利表記

(c) 2026 kuroudo119 (くろうど)

## 利用規約

このソフトウェアはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

### MITライセンス抄訳

1. 利用者はこのソフトウェアを無料で利用することができます。
-  商用利用、年齢制限作品などへの利用もできます。
-  利用作品でのクレジットは利用者の任意です。
2. 利用者はこのソフトウェアを改変、再配布することができます。
-  権利表記の削除、変更はできません。
3. 利用者はこのソフトウェアによる不都合について作者に対し請求できません。
4. このソフトウェアの利用について保証はありません。
5. 作者はこのソフトウェアについての責任を負いません。

## 概要

装備コマンド内の「最強装備」および「全て外す」で
対象とする装備スロットを限定します。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2026/02/09|作成開始
0.1.0|2026/02/09|非公開版完成
1.0.0|2026/02/09|公開

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const EQUIP_SLOT_LIST = JSON.parse("[" + PARAM["EQUIP_SLOT_LIST"] + "]");
const CLEAR_SLOT_LIST = JSON.parse("[" + PARAM["CLEAR_SLOT_LIST"] + "]");

//--------------------------------------

// 上書き
Game_Actor.prototype.clearEquipments = function(list) {
	const slotList = list ? list : CLEAR_SLOT_LIST;
	slotList.forEach(id => {
		const i = id - 1;
		const maxSlots = this.equipSlots().length;
		if (i < maxSlots) {
			if (this.isEquipChangeOk(i)) {
				this.changeEquip(i, null);
			}
		}
	}, this);
};

// 上書き
Game_Actor.prototype.optimizeEquipments = function() {
	this.clearEquipments(EQUIP_SLOT_LIST);
	EQUIP_SLOT_LIST.forEach(id => {
		const i = id - 1;
		const maxSlots = this.equipSlots().length;
		if (i < maxSlots) {
			if (this.isEquipChangeOk(i)) {
				this.changeEquip(i, this.bestEquipItem(i));
			}
		}
	}, this);
};

//--------------------------------------
})();
/*
```

*/
