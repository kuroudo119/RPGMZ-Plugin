/*:
 * @target MZ
 * @plugindesc タイマーを最前面に表示する
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_FrontTimer.js

タイマーを最前面に表示する

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2023/08/21) 作成開始
- ver.0.1.0 (2023/08/21) 非公開版完成
- ver.1.0.0 (2023/09/21) 公開

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

const KRD_Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
	KRD_Scene_Map_createDisplayObjects.apply(this, arguments);
	Spriteset_Base.prototype.createTimer.call(this);
};

const KRD_Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
	KRD_Scene_Battle_createDisplayObjects.apply(this, arguments);
	Spriteset_Base.prototype.createTimer.call(this);
};

//--------------------------------------
})();
