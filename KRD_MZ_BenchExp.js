/*:
 * @target MZ
 * @plugindesc ベンチメンバー経験値
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param BENCH_EXP_RATE
 * @text ベンチメンバー経験値割合
 * @desc 戦闘に参加しないメンバーの経験値割合（パーセント）です。初期値：80
 * @type number
 * @default 80
 * 
 * @help
# KRD_MZ_BenchExp.js

ベンチメンバー経験値

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

ベンチメンバー（戦闘に参加しないメンバー）の獲得経験値を変更します。
システム設定を無視します。

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2026/03/31|作成開始
0.1.0|2026/03/31|非公開版完成
0.1.1|2026/04/03|BENCH_EXP_RATEのdefaultを変更
1.0.0|2026/04/17|公開

## 以下プラグイン本体（ヘルプ欄には非表示）

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const BENCH_EXP_RATE = (Number(PARAM["BENCH_EXP_RATE"]) || 0) / 100;

//--------------------------------------

// 上書き
Game_Actor.prototype.benchMembersExpRate = function() {
    return BENCH_EXP_RATE;
};

//--------------------------------------
})();
/*
```

*/
