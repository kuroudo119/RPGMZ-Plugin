/*:
 * @target MZ
 * @plugindesc ダメージ計算式の Infinity の許容
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_CorrectInfinity.js

ダメージ計算式の Infinity の許容

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

能力値などに Infinity がある場合、
ダメージ計算における分散度の処理で、
Infinity - Infinity
（Infinityの減算）が発生し、結果が NaN になってしまうので、
NaN の場合、元のダメージである Infinity にします。

また、Infinityダメージを受け、HPが -Infinity となると
以降の clamp 処理で値がおかしくなります。
（特に Game_BattlerBase.prototype.refresh）
そのため、clamp にも処理を追加しています。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2025/09/25|作成開始
0.1.0|2025/09/25|完成
1.0.0|2025/09/25|公開

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const _Game_Action_applyVariance = Game_Action.prototype.applyVariance;
Game_Action.prototype.applyVariance = function(damage, variance) {
	const base = _Game_Action_applyVariance.call(this, ...arguments);
	return isNaN(base) ? damage : base;
};

const _Number_clamp = Number.prototype.clamp;
Number.prototype.clamp = function(min, max) {
	if (this == null || isNaN(this)) {
		return min;
	}
	if (this === Infinity) {
		return max;
	}
	if (this === -Infinity) {
		return min;
	}
	return _Number_clamp.call(this, ...arguments);
};

//--------------------------------------
})();
/*
```

*/
