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

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------

const _Game_CharacterBase_screenZ = Game_CharacterBase.prototype.screenZ;
Game_CharacterBase.prototype.screenZ = function() {
	const base = _Game_CharacterBase_screenZ.call(this, ...arguments);
	if (this.isObjectCharacter()) {
		return 1;
	} else {
		return base;
	}
};

//--------------------------------------

Game_Followers.prototype.isSomeoneCollided = function(x, y) {
	return false;
};

Game_Follower.prototype.screenZ = function() {
	return 2;
};

//--------------------------------------
})();
