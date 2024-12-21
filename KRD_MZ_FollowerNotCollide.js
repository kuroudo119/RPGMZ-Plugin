/*:
 * @target MZ
 * @plugindesc フォロワー非衝突（すり抜け）
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_FollowerNotCollide.js

フォロワー非衝突（すり抜け）

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このソフトウェアはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

### MITライセンス抄訳

（解釈に違いがある場合は原文が優先されます）

1. 利用者はこのソフトウェアを無料で利用することができます。
2. 利用者はこのソフトウェアを改変、再配布することができます。
3. 利用者はこのソフトウェアによる不都合について作者に対し請求できません。
4. このソフトウェアの利用について保証はありません。
5. 作者はこのソフトウェアについての責任を負いません。

## 概要

フォロワーがすり抜け扱いになり、イベントと衝突しなくなります。

## 更新履歴

- ver.0.0.1 (2024/10/14) 作成開始
- ver.0.1.0 (2024/10/14) 非公開版完成
- ver.1.0.0 (2024/10/14) 公開
- ver.1.1.0 (2024/12/18) イベントとの重なりを修正
- ver.1.1.1 (2024/12/18) イベントとの重なりを修正
- ver.1.2.0 (2024/12/21) sprite の取得方法を変更

 * 
 * 
 */

(() => {

"use strict";

const BASE_SIZE = 48;

//--------------------------------------

Game_Followers.prototype.isSomeoneCollided = function(x, y) {
	return false;
};

//--------------------------------------

const _Game_Event_screenZ = Game_Event.prototype.screenZ;
Game_Event.prototype.screenZ = function() {
	const spriteset = SceneManager._scene._spriteset;
	const sprite = spriteset.findTargetSprite(this);
	if (sprite) {
		if (sprite.height > BASE_SIZE || sprite.width > BASE_SIZE) {
			return _Game_Event_screenZ.call(this, ...arguments) + 1;
		}
	}

	if (this.isNormalPriority() && this._moveType !== 0) {
		return _Game_Event_screenZ.call(this, ...arguments) + 1;
	} else {
		return _Game_Event_screenZ.call(this, ...arguments);
	}
};

//--------------------------------------
})();
