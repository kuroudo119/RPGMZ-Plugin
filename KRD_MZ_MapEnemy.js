/*:
 * @target MZ
 * @plugindesc マップイベント敵キャラ
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param useDamagePopup
 * @text ダメージポップアップ
 * @desc 別途スクリプト必要。ダメージポップアップを「 true: 表示する ／ false: 表示しない」
 * @default true
 * @type boolean
 * 
 * @param useHpGauge
 * @text HPゲージ
 * @desc 敵キャラにHPゲージを「true: 表示する ／ false: 表示しない」
 * @default true
 * @type boolean
 * 
 * @command clearInput
 * @text 入力クリア
 * @desc 入力バッファを空にします。押しっぱなし等の入力を一旦無しにします。
 * 
 * @command forceCritical
 * @text 強制クリティカル
 * @desc 次のダメージ処理を必ずクリティカルにします。
 * 
 * @command checkCollision
 * @text 衝突チェック
 * @desc プレイヤーと敵イベントの位置関係をチェックします。
 * @arg varResult
 * @text 結果変数
 * @desc チェック結果を入れる変数番号を指定します。結果の値はプラグイン管理のヘルプ参照。
 * @type variable
 * 
 * @command showSkillAnimation
 * @text skillアニメーション表示
 * @desc 使用したスキルに設定されたアニメーションを表示します。
 * @arg varSkillId
 * @text スキル番号変数
 * @desc スキル番号が入っている変数を指定します。
 * @type variable
 * @arg varCharacterId
 * @text キャラクター番号変数
 * @desc イベント番号が入っている変数を指定します。プレイヤーを指定する場合は -1 が入っている変数です。
 * @type variable
 * @arg waitMode
 * @text ウェイト
 * @desc アニメーション表示中のウェイトあり:ON(true) ／ ウェイトなし:OFF(false)
 * @type boolean
 * 
 * @command showItemAnimation
 * @text itemアニメーション表示
 * @desc 使用したアイテムに設定されたアニメーションを表示します。
 * @arg varItemId
 * @text アイテム番号変数
 * @descアイテム番号が入っている変数を指定します。
 * @type variable
 * @arg varCharacterId
 * @text キャラクター番号変数
 * @desc イベント番号が入っている変数を指定します。プレイヤーを指定する場合は変数に -1 を入れます。
 * @type variable
 * @arg waitMode
 * @text ウェイト
 * @desc アニメーション表示中のウェイトあり:ON(true) ／ ウェイトなし:OFF(false)
 * @type boolean
 * 
 * @command mapDamagePlayer
 * @text Playerダメージ発生
 * @desc スキル使用でプレイヤーにダメージを発生させます。
 * @arg varEventId
 * @text イベントID変数
 * @desc イベントIDが入っている変数番号を指定します。
 * @type variable
 * @arg varSkillId
 * @text スキルID変数
 * @desc スキルIDが入っている変数番号を指定します。
 * @type variable
 * 
 * @command mapDamageEnemy
 * @text Enemyダメージ発生
 * @desc スキル使用で敵キャラにダメージを発生させます。
 * @arg varEventId
 * @text イベントID変数
 * @desc イベントIDが入っている変数番号を指定します。
 * @type variable
 * @arg varSkillId
 * @text スキルID変数
 * @desc スキルIDが入っている変数番号を指定します。
 * @type variable
 * 
 * @command mapDamageTroop
 * @text Troopダメージ発生
 * @desc スキル使用で敵グループにダメージを発生させます。
 * @arg varSkillId
 * @text スキルID変数
 * @desc スキルIDが入っている変数番号を指定します。
 * @type variable
 * 
 * @command itemMapDamageEnemy
 * @text Enemyダメージ発生item
 * @desc アイテム使用で敵キャラにダメージを発生させます。
 * @arg varEventId
 * @text イベントID変数
 * @desc イベントIDが入っている変数番号を指定します。
 * @type variable
 * @arg varSkillId
 * @text スキルID変数
 * @desc スキルIDが入っている変数番号を指定します。
 * @type variable
 * 
 * @command itemMapDamageTroop
 * @text Troopダメージ発生item
 * @desc アイテム使用で敵グループにダメージを発生させます。
 * @arg varSkillId
 * @text スキルID変数
 * @desc スキルIDが入っている変数番号を指定します。
 * @type variable
 * 
 * @command mapPopupPlayer
 * @text Playerダメージポップアップ
 * @desc ダメージ発生後に使用することでプレイヤーのダメージポップアップします。
 * 
 * @command mapPopupTroop
 * @text Enemyダメージポップアップ
 * @desc ダメージ発生後に使用することで敵キャラのダメージポップアップします。
 * 
 * @command isDeadTroop
 * @text 敵キャラKOチェック
 * @desc 攻撃後に敵イベント全体の中に戦闘不能になった敵キャラが存在するかチェック。存在する:ON(true) ／ 存在しない:OFF(false)
 * @arg swResult
 * @text 結果スイッチ
 * @desc チェック結果を入れるスイッチ番号を指定します。
 * @type switch
 * 
 * @command eraseAllDeadEvent
 * @text KO敵キャラ消去
 * @desc 戦闘不能の敵キャラを「イベントの一時消去」します。
 * 
 * @command processTroopCollapse
 * @text 敵キャラ撃破報酬獲得
 * @desc 敵キャラ戦闘不能時にこのコマンドを使うと経験値、お金、宝物を獲得します。
 * 
 * @help
# KRD_MZ_MapEnemy.js

マップイベント敵キャラ

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2022/01/04) 作成開始
- ver.0.0.2 (2022/01/11) HPゲージとダメージポップアップ追加
- ver.0.0.3 (2022/01/12) ダメージ処理をプラグイン化
- ver.0.0.4 (2022/01/15) 衝突処理をプラグイン化
- ver.0.0.5 (2022/01/17) セーブ不可を解決、ロード不可はまだある。
- ver.0.0.6 (2022/01/17) ロード不可マップでセーブ不可にする一時的な対処。
- ver.0.0.7 (2022/01/18) プラグインパラメータを追加。
- ver.0.0.8 (2022/01/19) ロード不可を解決した。
- ver.0.0.9 (2022/01/20) KRD_Game_MapAction クラスを追加。
- ver.0.1.0 (2022/01/21) 非公開版完成
- ver.1.0.0 (2022/01/21) 公開
- ver.1.1.0 (2022/01/21) 報酬獲得関数を作成。
- ver.1.1.1 (2022/01/22) ポップアップとゲージが出ないバグ修正。
- ver.1.2.1 (2022/01/22) プラグインコマンド追加。

## 使い方

マップイベントのメモ欄に <MapEnemy:敵キャラ番号> を記述します。
(敵キャラ番号は数字を記述すること)
そのマップイベントは記述した敵キャラ番号のデータを持ちます。

## プラグインコマンド

### checkCollision (衝突チェック)

衝突チェックの結果は以下のとおり。

0 : チェック対象外
200 : 正面衝突
400 : プレイヤーから敵イベントの左右に衝突
800 : プレイヤーから敵イベントの背後に衝突
1200 : 敵イベントからプレイヤーの背後に衝突
1400 : 敵イベントからプレイヤーの左右に衝突
1800 : 正面衝突

## 注意

プレイヤーのダメージポップアップを表示するためには、
データベース「システム1」の「戦闘画面」を「サイドビュー」にすること。

 * 
 * 
 */

let KRD_Game_MapEnemy = null;
let KRD_Sprite_MapGauge = null;
let KRD_Sprite_Battler = null;
let KRD_Game_MapAction = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const USE_DAMAGE_POPUP = PARAM["useDamagePopup"] === "true";
const USE_HP_GAUGE = PARAM["useHpGauge"] === "true";

const USE_DISPLAY_REWARDS = false;
const DEFAULT_ANIMATION_ID = 1;

const META_TAG = "MapEnemy";

// -------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "clearInput", args => {
	$gameTemp.clearInput();
});

PluginManager.registerCommand(PLUGIN_NAME, "forceCritical", args => {
	$gameTemp.forceCritical();
});

PluginManager.registerCommand(PLUGIN_NAME, "checkCollision", args => {
	$gameVariables.setValue(Number(args.varResult) , $gameTemp.checkCollision());
});

PluginManager.registerCommand(PLUGIN_NAME, "showSkillAnimation", args => {
	const skillId = $gameVariables.value(Number(args.varSkillId));
	const characterId = $gameVariables.value(Number(args.varCharacterId));
	const waitMode = args.waitMode === "true";
	$gameTemp.showSkillAnimation(skillId, characterId, waitMode);
});

PluginManager.registerCommand(PLUGIN_NAME, "showItemAnimation", args => {
	const itemId = $gameVariables.value(Number(args.varItemId));
	const characterId = $gameVariables.value(Number(args.varCharacterId));
	const waitMode = args.waitMode === "true";
	$gameTemp.showItemAnimation(itemId, characterId, waitMode);
});

PluginManager.registerCommand(PLUGIN_NAME, "mapDamagePlayer", args => {
	const eventId = $gameVariables.value(Number(args.varEventId));
	const skillId = $gameVariables.value(Number(args.varSkillId));
	$gameTemp.mapDamagePlayer(eventId, skillId);
});

PluginManager.registerCommand(PLUGIN_NAME, "mapDamageEnemy", args => {
	const eventId = $gameVariables.value(Number(args.varEventId));
	const skillId = $gameVariables.value(Number(args.varSkillId));
	$gameTemp.mapDamageEnemy(eventId, skillId);
});

PluginManager.registerCommand(PLUGIN_NAME, "mapDamageTroop", args => {
	const skillId = $gameVariables.value(Number(args.varSkillId));
	$gameTemp.mapDamageTroop(skillId);
});

PluginManager.registerCommand(PLUGIN_NAME, "itemMapDamageEnemy", args => {
	const eventId = $gameVariables.value(Number(args.varEventId));
	const skillId = $gameVariables.value(Number(args.varSkillId));
	$gameTemp.itemMapDamageEnemy(eventId, skillId);
});

PluginManager.registerCommand(PLUGIN_NAME, "itemMapDamageTroop", args => {
	const skillId = $gameVariables.value(Number(args.varSkillId));
	$gameTemp.itemMapDamageTroop(skillId);
});

PluginManager.registerCommand(PLUGIN_NAME, "mapPopupPlayer", args => {
	$gameTemp.mapPopupPlayer();
});

PluginManager.registerCommand(PLUGIN_NAME, "mapPopupTroop", args => {
	$gameTemp.mapPopupTroop();
});

PluginManager.registerCommand(PLUGIN_NAME, "isDeadTroop", args => {
	$gameSwitches.setValue(Number(args.swResult) , $gameTemp.isDeadTroop());
});

PluginManager.registerCommand(PLUGIN_NAME, "eraseAllDeadEvent", args => {
	$gameTemp.eraseAllDeadEvent();
});

PluginManager.registerCommand(PLUGIN_NAME, "processTroopCollapse", args => {
	$gameTemp.processTroopCollapse();
});

// -------------------------------------
// KRD_Game_MapEnemy クラス

KRD_Game_MapEnemy = class extends Game_Enemy {
	constructor(enemyId, x, y, eventId) {
		super(...arguments);
		this._eventId = eventId;
	}

	eventId() {
		return this._eventId;
	}
};

// -------------------------------------
// セーブデータにインスタンスを含める処理
//
// グローバルで let で宣言した時、
// windowオブジェクトのプロパティを生成しない事への対処。

window[KRD_Game_MapEnemy.name] = KRD_Game_MapEnemy;

// -------------------------------------
// KRD_Sprite_MapGauge クラス

KRD_Sprite_MapGauge = class extends Sprite_Gauge {
	bitmapWidth() {
		return 40;
	}
	
	gaugeHeight() {
		return 6;
	}
	
	gaugeX() {
		return 0;
	}

	label() {
		return "";
	}

	drawValue() {
		// empty
	}

	drawGaugeRect(x, y, width, height) {
		super.drawGaugeRect(...arguments);
		this.move(x - 20, y - 48);
	}
};

// -------------------------------------
// KRD_Sprite_Battler クラス(ダメージポップアップ用)

KRD_Sprite_Battler = class extends Sprite_Battler {
};

// -------------------------------------
// KRD_Game_MapAction クラス (ダメージ計算用)

KRD_Game_MapAction = class extends Game_Action {
	setSubject(subject) {
		if (subject.isActor()) {
			super.setSubject(...arguments);
		} else {
			this._subjectEnemyIndex = subject.eventId();
			this._subjectActorId = 0;
		}
	}

	subject() {
		if (this._subjectActorId > 0) {
			return super.subject(...arguments);
		} else {
			return $gameMap.event(this._subjectEnemyIndex)._enemy;
		}
	}

	makeDamageValue(target, critical) {
		if ($gameTemp._critical) {
			target.result().critical = true;
			$gameTemp._critical = false;
			return super.makeDamageValue(target, true);
		} else {
			return super.makeDamageValue(...arguments);
		}
	}
};

// -------------------------------------
// 敵キャラデータ追加

const KRD_Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
	KRD_Game_Event_initialize.apply(this, arguments);
	const mapEnemy = Number($dataMap.events[eventId].meta[META_TAG]);
	if (mapEnemy) {
		this._enemy = new KRD_Game_MapEnemy(mapEnemy, 0, 0, eventId);
	}
};

// -------------------------------------
// meta リストを取得

Game_Map.prototype.metaList = function(tag = META_TAG) {
	return $dataMap.events.filter(event => event && !!event.meta[tag]);
};

// -------------------------------------
// HPゲージ追加

const KRD_Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
	KRD_Scene_Map_createDisplayObjects.apply(this, arguments);
	if (USE_HP_GAUGE) {
		this.createHpGauge();
	}
};

Scene_Map.prototype.createHpGauge = function() {
	const metaList = $gameMap.metaList(META_TAG);
	const metaIdList = metaList.map(e => e.id);
	$gameMap.events().forEach((event, i) => {
		if (metaIdList.includes(event.eventId())) {
			const characterSprites = SceneManager._scene._spriteset._characterSprites;
			const gauge = new KRD_Sprite_MapGauge();
			gauge.setup(event._enemy, "hp");
			characterSprites[i].addChild(gauge);
		}
	});
};

// -------------------------------------
// マップでのダメージポップアップ追加

const KRD_Scene_Map_createDisplayObjects2 = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
	KRD_Scene_Map_createDisplayObjects2.apply(this, arguments);
	if (USE_DAMAGE_POPUP) {
		this.createDamagePopup();
	}
};

Scene_Map.prototype.createDamagePopup = function() {
	this.createDamagePopupPlayer();
	this.createDamagePopupEnemy();
};

Scene_Map.prototype.createDamagePopupEnemy = function() {
	const metaList = $gameMap.metaList(META_TAG);
	const metaIdList = metaList.map(e => e.id);
	$gameMap.events().forEach((event, i) => {
		if (metaIdList.includes(event.eventId())) {
			const characterSprites = SceneManager._scene._spriteset._characterSprites;
			const sprite = new KRD_Sprite_Battler(event._enemy);
			characterSprites[i].addChild(sprite);
		}
	});
};

Scene_Map.prototype.createDamagePopupPlayer = function() {
	const metaList = $gameMap.metaList(META_TAG);
	if (metaList && metaList.length > 0) {
		const sprite = new KRD_Sprite_Battler($gameParty.leader());
		const characterSprites = SceneManager._scene._spriteset._characterSprites;
		const index = characterSprites.findIndex(cs => cs._character.constructor.name === "Game_Player");
		if (index > 0) {
			characterSprites[index].addChild(sprite);
		}
	}
};

//--------------------------------------
// ダメージポップアップ
// 
// イベントコマンドでのダメージ後やHP回復後に、
// 以下をスクリプトコマンドで実行する。

Game_Temp.prototype.mapPopupPlayer = function() {
	if (USE_DAMAGE_POPUP) {
		$gameParty.leader().startDamagePopup();
	}
};

Game_Temp.prototype.mapPopupEnemy = function(eventId) {
	if (USE_DAMAGE_POPUP) {
		const ev = $gameMap.event(eventId);
		ev._enemy.startDamagePopup();
	}
};

Game_Temp.prototype.mapPopupTroop = function() {
	if (USE_DAMAGE_POPUP) {
		$gameMap.metaList(META_TAG).forEach(event => {
			this.mapPopupEnemy(event.id);
		}, this);
	}
};

// -------------------------------------
// マップダメージ

Game_Temp.prototype.mapDamage = function(target, subject, skillId) {
	this._action = new KRD_Game_MapAction(subject);
	this._action.setSkill(skillId);
	this._action.apply(target);
};

Game_Temp.prototype.mapDamageEnemy = function(eventId, skillId) {
	const subject = $gameParty.leader();
	const target = $gameMap.event(eventId)._enemy;
	this.mapDamage(target, subject, skillId);
};

Game_Temp.prototype.mapDamageTroop = function(skillId) {
	$gameMap.metaList(META_TAG).forEach(event => {
		this.mapDamageEnemy(event.id, skillId);
	}, this);
};

Game_Temp.prototype.mapDamagePlayer = function(eventId, skillId) {
	const subject = $gameMap.event(eventId)._enemy;
	const target = $gameParty.leader();
	this.mapDamage(target, subject, skillId);
};

// -------------------------------------
// マップダメージ (アイテム版)

Game_Temp.prototype.itemMapDamage = function(target, subject, itemId) {
	this._action = new KRD_Game_MapAction(subject);
	this._action.setItem(itemId);
	this._action.apply(target);
};

Game_Temp.prototype.itemMapDamageEnemy = function(eventId, itemId) {
	const subject = $gameParty.leader();
	const target = $gameMap.event(eventId)._enemy;
	this.itemMapDamage(target, subject, itemId);
};

Game_Temp.prototype.itemMapDamageTroop = function(itemId) {
	$gameMap.metaList(META_TAG).forEach(event => {
		this.itemMapDamageEnemy(event.id, itemId);
	}, this);
};

// -------------------------------------
// 残HPチェック

Game_Temp.prototype.isDeadEnemy = function(eventId) {
	const event = $gameMap.event(eventId);
	return !event._erased && event._enemy.isDead();
};

Game_Temp.prototype.isDeadTroop = function() {
	const metaList = $gameMap.metaList(META_TAG);
	this._deadList = metaList.filter(event => this.isDeadEnemy(event.id), this);
	return !!this._deadList.length;
};

// -------------------------------------
// イベントの一時消去

Game_Temp.prototype.eraseAllDeadEvent = function() {
	if (this._deadList) {
		this._deadList.forEach(event => {
			$gameMap.eraseEvent(event.id);
		});
	}
};

// -------------------------------------
// プレイヤーとイベントの接触時の位置関係判断

Game_Temp.prototype.checkCollision = function() {
	if (this.runningEventId() > 0) {
		const player = $gamePlayer;
		const playerDirection = player.direction();
		const event = this.runningEvent();
		const eventDirection = event.direction();
		const eventPosition = this.eventPosition(player, event);

		if (playerDirection === eventPosition) {
			return this.attackByPlayer(eventPosition, eventDirection);
		} else {
			return this.attackByEvent(eventPosition, playerDirection);
		}
	}
	return 0;
};

Game_Temp.prototype.runningEventId = function() {
	return $gameMap._interpreter.eventId();
};

Game_Temp.prototype.runningEvent = function() {
	return $gameMap.event(this.runningEventId());
};

Game_Temp.prototype.eventPosition = function(player, event) {
	const diffX = event._x - player._x;
	const diffY = event._y - player._y;
	const ix = diffX + 1;
	const iy = diffY + 1;

	// Player position is center.
	const positionTable = [
		[0,8,0],
		[4,0,6],
		[0,2,0],
	];

	const range = [0, 1, 2];
	if (range.includes(ix) && range.includes(iy)) {
		return positionTable[iy][ix];
	} else {
		return 0;
	}
};

Game_Temp.prototype.attackByPlayer = function(position, direction) {
	return this.checkCollisionTable(position, direction);
};

Game_Temp.prototype.attackByEvent = function(position, direction) {
	// BACK_ATTACK = 1200;
	// BATTLE      = 1400;
	// COLLISION   = 1800;
	return this.checkCollisionTable(position, direction) + 1000;
};

Game_Temp.prototype.checkCollisionTable = function(position, direction) {
	const COLLISION = 200;
	const BATTLE    = 400;
	const CRITICAL  = 800;
	const positionIndex = position / 2 - 1;
	const directionIndex = direction / 2 - 1;

	const collisionTable = [
		[CRITICAL, BATTLE, BATTLE, COLLISION],
		[BATTLE, CRITICAL, COLLISION, BATTLE],
		[BATTLE, COLLISION, CRITICAL, BATTLE],
		[COLLISION, BATTLE, BATTLE, CRITICAL],
	];

	const range = [0, 1, 2, 3];
	if (range.includes(positionIndex) && range.includes(directionIndex)) {
		return collisionTable[positionIndex][directionIndex];
	} else {
		return 0;
	}
};

// -------------------------------------
// マップバトル報酬

Game_Temp.prototype.processTroopCollapse = function() {
	if (this._deadList) {
		this._deadList.forEach(enemy => {
			this.processEnemyCollapse(enemy.id);
		}, this);
	}
};

Game_Temp.prototype.processEnemyCollapse = function(eventId) {
	BattleManager.makeMapEnemyRewards(eventId);
	if (USE_DISPLAY_REWARDS) {
		BattleManager.displayRewards();
	}
	BattleManager.gainRewards();
};

BattleManager.makeMapEnemyRewards = function(eventId) {
	const enemy = $gameMap.event(eventId)._enemy;
	const goldRate = Game_Troop.prototype.goldRate.call(this);
	this._rewards = {
		 gold: enemy.gold() * goldRate,
		 exp: enemy.exp(),
		 items: enemy.makeDropItems()
	};
};

const KRD_Game_Actor_gainExp = Game_Actor.prototype.gainExp;
Game_Actor.prototype.gainExp = function(exp) {
	if ($gameParty.inBattle()) {
		KRD_Game_Actor_gainExp.apply(this, arguments);
	} else {
		const newExp = this.currentExp() + Math.round(exp * this.finalExpRate());
		this.changeExp(newExp, USE_DISPLAY_REWARDS);
	}
};

// -------------------------------------
// スキルに設定されたアニメーションを表示

Game_Temp.prototype.showSkillAnimation = function(skillId, characterId, waitMode) {
	const animationId = $dataSkills[skillId].animationId;
	this.showAnimation(animationId, characterId, waitMode);
};

Game_Temp.prototype.showItemAnimation = function(itemId, characterId, waitMode) {
	const animationId = $dataItems[itemId].animationId;
	this.showAnimation(animationId, characterId, waitMode);
};

Game_Temp.prototype.showAnimation = function(animationId, characterId, waitMode) {
	const animeId = this.getAnimationId(animationId, characterId);
	const param = [characterId, animeId, waitMode];
	if (animeId > 0) {
		$gameMap._interpreter.command212(param);
	}
};

Game_Temp.prototype.getAnimationId = function(animationId, characterId) {
	if (animationId >= 0) {
		return animationId;
	} else {
		if (characterId >= 0) {
			const weapon = $gameParty.leader().weapons()[0];
			if (weapon && weapon.id > 0) {
				return $dataWeapons[weapon.id].animationId;
			} else {
				return this.defaultAnimationId();
			}
		} else {
			return this.defaultAnimationId();
		}
	}
};

Game_Temp.prototype.defaultAnimationId = function() {
	if ($dataAnimations.length > 0) {
		return DEFAULT_ANIMATION_ID;
	} else {
		return 0;
	}
};

// -------------------------------------

Game_Temp.prototype.clearInput = function() {
	Input.clear();
};

Game_Temp.prototype.forceCritical = function() {
	this._critical = true;
};

// -------------------------------------
})();
