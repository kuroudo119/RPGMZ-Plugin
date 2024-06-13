/*:
 * @target MZ
 * @plugindesc ダメージあり反撃
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_CrossCounter.js

ダメージあり反撃

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/09/18) 作成開始
- ver.0.1.0 (2024/06/13) 非公開版完成
- ver.1.0.0 (2024/06/13) 公開

 * 
 * 
 */

(() => {

"use strict";

// 上書き
BattleManager.invokeAction = function(subject, target) {
	this._logWindow.push("pushBaseLine");
	if (Math.random() < this._action.itemMrf(target)) {
		this.invokeMagicReflection(subject, target);
	} else {
		this.invokeNormalAction(subject, target);

		if (!this._substituteCounter && Math.random() < this._action.itemCnt(target)) {
			this.updateDamagePopup(target);
			this.invokeCounterAttack(subject, target);
		}
	}
	subject.setLastTarget(target);
	this._logWindow.push("popBaseLine");
};

const _BattleManager_applySubstitute = BattleManager.applySubstitute;
BattleManager.applySubstitute = function(target) {
	this._substituteCounter = false;
	const result = _BattleManager_applySubstitute.call(this, ...arguments);
	if (result !== target) {
		this._substituteCounter = true;
	}
	return result;
};

// 新規作成
BattleManager.updateDamagePopup = function(target) {
	target.startDamagePopup();
	SceneManager._scene._spriteset._actorSprites.forEach(sprite => {
		sprite.update();
	});
	SceneManager._scene._spriteset._enemySprites.forEach(sprite => {
		sprite.update();
	});
};

})();
