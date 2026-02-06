/*:
 * @target MZ
 * @plugindesc 限定品ショップ
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_OnlyOneShop.js

限定品ショップ

## 権利表記

(c) 2025 kuroudo119 (くろうど)

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

ショップの販売品として、
販売数1個のアイテムを作ることができます。

このアイテムを所持している場合は買えません。
このアイテムは1個のみ買えます。

## 使い方

アイテムのメモ欄に
<OnlyOneShop>
というタグを書いてください。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2026/02/06|作成開始
0.1.0|2026/02/06|非公開版完成
1.0.0|2026/02/06|公開

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const TAG_ONLY_ONE = "OnlyOneShop";

//--------------------------------------

Game_Temp.prototype.onlyOneItem = function(item) {
	return item.meta[TAG_ONLY_ONE];
};

Game_Party.prototype.hasOnlyOneItem = function(item) {
	return $gameTemp.onlyOneItem(item) && this.hasItem(item);
};

//--------------------------------------

const _Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function(item) {
	const base = _Window_ShopBuy_isEnabled.call(this, ...arguments);
	const onlyOne = $gameParty.hasOnlyOneItem(item);
	return base && !onlyOne;
};

const _Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function() {
	const base = _Scene_Shop_maxBuy.call(this, ...arguments);
	const onlyOne = $gameTemp.onlyOneItem(this._item);
	if (onlyOne) {
		return Math.min(base, 1);
	} else {
		return base;
	}
};

//--------------------------------------
})();
/*
```

*/
