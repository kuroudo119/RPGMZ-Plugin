/*:
 * @target MZ
 * @plugindesc param の計算順序を変更
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_ParamOrder.js

param の計算順序を変更

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

## 機能

能力値(param)の計算順序を変更します。

- 既定
(Base + Plus) * Rate * BuffRate

- 本プラグインでの変更後
(Base * Rate + Plus) * BuffRate

## 用途

既定では、例えば、
アクターの攻撃力を 120% と設定した場合に、
装備品での攻撃力増加量も 120% される。

そこで計算順序を変更することで、
装備品での攻撃力増加量を100%（DB設定値のまま）とする。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2025/11/10|作成開始
0.1.0|2025/11/10|非公開版完成
1.0.0|2025/11/10|公開

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

//--------------------------------------

// 上書き
Game_BattlerBase.prototype.param = function(paramId) {
	const value = (
		this.paramBase(paramId) *
		this.paramRate(paramId) +
		this.paramPlus(paramId) ) *
		this.paramBuffRate(paramId);
	const maxValue = this.paramMax(paramId);
	const minValue = this.paramMin(paramId);
	return Math.round(value.clamp(minValue, maxValue));
};

//--------------------------------------
})();
/*
```

*/
