/*:
 * @target MZ
 * @plugindesc APNG戦闘背景
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @base ApngPicture
 * 
 * @help
# KRD_MZ_ApngBattleBG.js

APNG戦闘背景

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

## 注意

！！このプラグインは未完成です！！

戦闘から戻るとエラーが出ます。

エラーになるためコメントアウトした箇所が
本当は必要なのでエラーになってる可能性あり。

## 概要

APNGによる動く戦闘背景を設定できるようにします。

## 前提プラグイン

トリアコンタンさんの以下のプラグインが必要です。
（さらに別のプラグインも必要ですが、以下のプラグイン参照です）

ApngPicture（APNGピクチャプラグイン）
https://github.com/triacontane/RPGMakerMV/blob/mz_master/ApngPicture.js

## 使い方（用意する画像）

戦闘背景とするAPNGファイルを用意し、
img/battlebacks1/ 配下に置いてください。

## 使い方（ApngPicture側）

ApngPictureプラグイン
「シーンのAPNGのリスト」
対象のシーン：Scene_Battle
ファイル名：../battlebacks1/ をファイル名の左側に書く
（ファイル名は「テキスト」タブ側で記述する）

## 使い方（ツクール側）

マップの戦闘背景として用意したAPNGファイルを指定します。
（戦闘背景1側を設定します）
（戦闘背景2側に設定した場合は未確認です）
（他の手段による戦闘背景の設定は未確認です）

## 更新履歴

ver.|更新日|更新内容
---|---|---
0.0.1|2026/02/10|作成開始（公開）
0.0.2|2026/02/10|ヘルプを修正

## 以下プラグイン本体（ヘルプ欄には非表示）

*/

/*

```javascript
*/
(() => {
//--------------------------------------
"use strict"

const PATH = "../battlebacks1/";

//--------------------------------------

const _Sprite_Battleback_battleback1Bitmap = Sprite_Battleback.prototype.battleback1Bitmap;
Sprite_Battleback.prototype.battleback1Bitmap = function() {
	const base = _Sprite_Battleback_battleback1Bitmap.call(this, ...arguments);
	Sprite.prototype.addApngChild.call(this, PATH + this.battleback1Name());
	return base;
};

Sprite_Battleback.prototype.loadApngSprite = function(name) {
	return SceneManager.tryLoadApngSystem(name);
};

const _Sprite_addApngChild = Sprite.prototype.addApngChild;
Sprite.prototype.addApngChild = function(name) {
	// Sprite_Battleback.prototype.addApngChild だとダメだったので、
	// this.constructor.name を見てる。
	// たぶん、new してるクラスが違うんだと思う。

	if (this.constructor.name === "Sprite_Battleback") {
		if (this._apngSprite) {
			this.destroyApngIfNeed();
		}
		this._apngSprite = this.loadApngSprite(name);
		if (this._apngSprite) {

			// this.isApngCache() がエラーになるのでコメントアウトした。
			// 
			// if (this.isApngCache()) {
			// 	this._apngSprite.pixiApng.jumpToFrame(0);
			// 	this._apngSprite.pixiApng.play();
			// }

			this.addChild(this._apngSprite);
			const frame = this._apngSprite.pixiApng.textures[0]._frame;
			this.bitmap = new Bitmap(frame.width, frame.height);

			// updateApngAnchorでエラー出たからコメントアウトして、
			// ついでにupdateApngBlendModeも根拠なくコメントアウトした。
			//
			// this.updateApngAnchor();
			// this.updateApngBlendMode();
		}
		this._apngLoopCount = 1;
		this._apngLoopFrame = 0;
	} else {
		_Sprite_addApngChild.call(this, ...arguments);
	}
};

//--------------------------------------
})();
/*
```

*/
