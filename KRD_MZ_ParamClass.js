/*:
 * @target MZ
 * @plugindesc 能力値用職業
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_ParamClass.js

能力値用職業

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

能力値用の職業（職業A）を設定できるようにします。

能力値曲線は職業Aのデータを使用し、
その他のデータは職業Bのデータを使用します。

職業Aがサブ扱いです。

メインとなる職業Bについては、
通常の職業の設定の通りです。

## 設定方法

データベースのアクターのメモ欄に以下を記述します。

<ParamClass:職業Aの職業ID>

## 二つ名の変更

アクターの「二つ名」に \PC と設定することで、
職業Aの名前を表示することができます。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2025/10/23|作成開始
0.1.0|2025/10/23|非公開版完成
1.0.0|2025/10/23|公開
1.1.0|2025/10/28|paramClassName関数を追加

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const TAG_PARAM_CLASS = "ParamClass";

const ESCAPE_PARAM_CLASS = "\\PC";

//--------------------------------------

Game_Actor.prototype.paramClassId = function() {
	const paramClass = Number(this.actor().meta[TAG_PARAM_CLASS]) || 0;
	return paramClass > 0 ? paramClass : this._classId;
};

Game_Actor.prototype.paramClass = function() {
	return $dataClasses[this.paramClassId()];
};

Game_Actor.prototype.paramBase = function(paramId) {
	return this.paramClass().params[paramId][this._level];
};

//--------------------------------------

Game_Actor.prototype.paramClassName = function() {
	return this.paramClass().name;
};

const _Game_Actor_nickname = Game_Actor.prototype.nickname;
Game_Actor.prototype.nickname = function() {
	const base = _Game_Actor_nickname.call(this, ...arguments);
	if (base === ESCAPE_PARAM_CLASS) {
		return this.paramClassName();
	} else {
		return base;
	}
};

//--------------------------------------
})();
/*
```

*/
