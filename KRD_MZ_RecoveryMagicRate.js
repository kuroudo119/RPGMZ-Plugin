/*:
 * @target MZ
 * @plugindesc 回復魔法割合
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param ACTOR_SETTING
 * @text アクター設定
 * @desc アクターの回復魔法割合の設定です。
 * @type struct<actor>[]
 * 
 * @param CLASS_SETTING
 * @text 職業設定
 * @desc 職業の回復魔法割合の設定です。
 * @type struct<class>[]
 * 
 * @help
# KRD_MZ_recoveryMagicRate.js

回復魔法割合

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このソフトウェアはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

### MITライセンス抄訳

1. 利用者はこのソフトウェアを無料で利用することができます。
2. 利用者はこのソフトウェアを改変、再配布することができます。
3. 利用者はこのソフトウェアによる不都合について作者に対し請求できません。
4. このソフトウェアの利用について保証はありません。
5. 作者はこのソフトウェアについての責任を負いません。

## 概要

- 回復魔法を使用した時に効果量に割合を掛けることができます。
- 「薬の知識」の回復魔法版です。
- ダメージ計算式でのHP回復にのみ影響します。

## 注意

- ゲーム中に割合を変更することは出来ません。
- makeDamageValue を変更する他のプラグインと競合します。

## 更新履歴

- ver.0.0.1 (2025/03/04) 作成開始
- ver.0.1.0 (2025/03/04) 非公開版完成
- ver.1.0.0 (2025/03/04) 公開
- ver.1.0.1 (2025/03/26) アイテムにも有効だったのでスキルに限定

 * 
 * 
 */

/*~struct~actor:
 * @param id
 * @text アクター番号
 * @desc アクターの番号です。
 * @type actor
 * 
 * @param recoveryRate
 * @text 回復魔法割合
 * @desc 回復魔法の効果量にかかる割合（パーセント）です。
 * @type number
 * @default 100
 * 
 */

/*~struct~class:
 * @param id
 * @text 職業番号
 * @desc 職業の番号です。
 * @type class
 * 
 * @param recoveryRate
 * @text 回復魔法割合
 * @desc 回復魔法の効果量にかかる割合（パーセント）です。
 * @type number
 * @default 100
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const ACTOR_SETTING_BASE = JSON.parse(PARAM["ACTOR_SETTING"] || null);
const ACTOR_SETTING = [];
ACTOR_SETTING_BASE?.forEach(e => ACTOR_SETTING.push(JSON.parse(e)));

const CLASS_SETTING_BASE = JSON.parse(PARAM["CLASS_SETTING"] || null);
const CLASS_SETTING = [];
CLASS_SETTING_BASE?.forEach(e => CLASS_SETTING.push(JSON.parse(e)));

const DEFAULT_RATE = 1;

//--------------------------------------

Object.defineProperties(Game_BattlerBase.prototype, {
	recm: {
		get: function() {
			if (this.isActor()) {
				const list = [];
				makeRateList(list, ACTOR_SETTING, this.actorId());
				makeRateList(list, CLASS_SETTING, this._classId);
				if (list) {
					const rate = totalRate(list);
					return rate;
				}
			}

			return DEFAULT_RATE;
		},
		configurable: true
	},
});

function makeRateList(list, setting, baseId) {
	const found = setting?.find(e => Number(e.id) === baseId);
	if (found) {
		const data = Number(found.recoveryRate) || 0;
		const rate = data / 100;
		list.push(rate);
	}
}

function totalRate(list) {
	return list.reduce((total, rate) => total * rate, 1);
}

//--------------------------------------

// 上書き
Game_Action.prototype.makeDamageValue = function(target, critical) {
	const item = this.item();
	const baseValue = this.evalDamageFormula(target);
	let value = baseValue * this.calcElementRate(target);
	if (this.isPhysical()) {
		 value *= target.pdr;
	}
	if (this.isMagical()) {
		 value *= target.mdr;
	}
	if (baseValue < 0) {
		 value *= target.rec;

		// 追加 start
		if (this.isSkill()) {
			const recoveryRate = this.subject().recm;
			value *= recoveryRate;
		}
		// 追加 end
	}
	if (critical) {
		 value = this.applyCritical(value);
	}
	value = this.applyVariance(value, item.damage.variance);
	value = this.applyGuard(value, target);
	value = Math.round(value);
	return value;
};

//--------------------------------------
})();
