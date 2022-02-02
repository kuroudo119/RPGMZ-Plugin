/*:
 * @target MZ
 * @plugindesc マップイベント敵キャラ (アクションRPG)
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
 * @param useHpGaugePlayer
 * @text HPゲージ(プレイヤー)
 * @desc プレイヤーにHPゲージを「true: 表示する ／ false: 表示しない」
 * @default true
 * @type boolean
 * 
 * @param useStateIcon
 * @text ステートアイコン
 * @desc ステートアイコンを「true: 表示する ／ false: 表示しない」
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
 * @command checkEventCollision
 * @text イベント衝突チェック
 * @desc イベントと敵イベントの位置関係をチェックします。
 * @arg varResult
 * @text 結果変数
 * @desc チェック結果を入れる変数番号を指定します。結果の値はプラグイン管理のヘルプ参照。
 * @type variable
 * @arg varAttack
 * @text 攻撃側イベント
 * @desc 攻撃側のイベント番号が入っている変数を指定します。
 * @type variable
 * @arg varDefense
 * @text 守備側イベント
 * @desc 守備側のイベント番号が入っている変数を指定します。
 * @type variable
 * 
 * @command checkCollisionAll
 * @text 全衝突チェック
 * @desc 移動する攻撃イベントと全イベントとの位置関係をチェックします。転がる岩などに使います。
 * @arg varAttack
 * @text 攻撃側イベント
 * @desc 攻撃側のイベント番号が入っている変数を指定します。
 * @type variable
 * @arg varEventId
 * @text 衝突EventID変数
 * @desc 衝突したイベント番号を入れる変数番号を指定します。衝突なしは 0 です。
 * @type variable
 * @arg varCollision
 * @text 衝突結果変数
 * @desc 衝突チェック結果を入れる変数番号を指定します。値はプラグイン管理のヘルプ参照。
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
 * @command addStateEnemy
 * @text Enemyステート付与
 * @desc 敵キャラにステートを付与します。アイコン表示のみでステート効果は発揮しません。
 * @arg varStateId
 * @text ステートID変数
 * @desc ステートIDが入っている変数番号を指定します。
 * @type variable
 * @arg varEventId
 * @text イベントID変数
 * @desc イベントIDが入っている変数番号を指定します。
 * @type variable
 * 
 * @command addStatePlayer
 * @text Playerステート付与
 * @desc プレイヤーにステートを付与します。
 * @arg varStateId
 * @text ステートID変数
 * @desc ステートIDが入っている変数番号を指定します。
 * @type variable
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
- ver.1.2.0 (2022/01/22) プラグインコマンド追加。
- ver.1.3.0 (2022/01/24) ステートアイコン表示を追加。
- ver.1.4.0 (2022/01/25) ステート付与コマンドを追加。
- ver.1.5.0 (2022/01/28) イベント同士の衝突チェック処理を追加。非公開
- ver.1.5.1 (2022/01/29) playerAttackSet 仮作成。のちに削除。非公開
- ver.1.5.2 (2022/01/30) 衝突チェック処理を修正。非公開
- ver.1.6.0 (2022/01/31) 全イベント衝突チェックを追加。非公開
- ver.1.7.0 (2022/02/02) イベント発射サポート関数を作成。

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
-200 : 敵イベントからプレイヤーの背後に衝突
-400 : 敵イベントからプレイヤーの左右に衝突
-800 : 正面衝突

尚、KRD_MZ_DirectionFix プラグイン等を使わないと、
接触したイベントがプレイヤー側を向くので、
正面衝突しか発生しません。

## 補足

### 敵イベントID取得

変数の操作コマンドの
スクリプト欄に this.eventId() と記述することで取得できます。

### ダメージポップアップ

プレイヤーのダメージポップアップを表示するためには、
データベース「システム1」の「戦闘画面」を「サイドビュー」にすること。

 * 
 * 
 */

let KRD_Game_MapEnemy = null;
let KRD_Sprite_MapGauge = null;
let KRD_Sprite_MapActor = null;
let KRD_Sprite_MapEnemy = null;
let KRD_Game_MapAction = null;
let KRD_Sprite_MapStateIcon = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const USE_DAMAGE_POPUP = PARAM["useDamagePopup"] === "true";
const USE_HP_GAUGE = PARAM["useHpGauge"] === "true";
const USE_HP_GAUGE_PLAYER = PARAM["useHpGaugePlayer"] === "true";
const USE_STATE_ICON = PARAM["useStateIcon"] === "true";

const USE_DISPLAY_REWARDS = false;
const DEFAULT_ANIMATION_ID = 1;

const META_ENEMY = "MapEnemy";
const META_BALL = "Ball";
const META_LAUNCH = "Launch";

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

PluginManager.registerCommand(PLUGIN_NAME, "checkEventCollision", args => {
	const attackId = $gameVariables.value(Number(args.varAttack));
	const defenseId = $gameVariables.value(Number(args.varDefense));
	$gameVariables.setValue(Number(args.varResult) , $gameTemp.checkCollision(attackId, defenseId));
});

PluginManager.registerCommand(PLUGIN_NAME, "checkCollisionAll", args => {
	const attackId = $gameVariables.value(Number(args.varAttack));
	const result = $gameTemp.checkCollisionAll(attackId);
	$gameVariables.setValue(Number(args.varEventId), result.eventId);
	$gameVariables.setValue(Number(args.varCollision), result.collision);
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

PluginManager.registerCommand(PLUGIN_NAME, "addStateEnemy", args => {
	const stateId = $gameVariables.value(Number(args.varStateId));
	const eventId = $gameVariables.value(Number(args.varEventId));
	$gameTemp.addStateEnemy(stateId, eventId);
});

PluginManager.registerCommand(PLUGIN_NAME, "addStatePlayer", args => {
	const stateId = $gameVariables.value(Number(args.varStateId));
	$gameTemp.addStatePlayer(stateId);
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
		this.move(x - 20, y - 44);
	}
};

// -------------------------------------
// KRD_Sprite_MapBattler クラス (ダメージポップアップ用)

KRD_Sprite_MapActor = class extends Sprite_Battler {
}

KRD_Sprite_MapEnemy = class extends Sprite_Battler {
};

// -------------------------------------
// KRD_Sprite_MapStateIcon クラス (アイコン表示用)

KRD_Sprite_MapStateIcon = class extends Sprite_StateIcon {
	constructor(eventHeight = 0) {
		super(...arguments);
		this._eventHeight = eventHeight;
	}

	update() {
		super.update(...arguments);
		const x = 0;
		const y = -this._eventHeight - 12;
		this.move(x, y);
	}
}

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

	testApply(target) {
		return target.hp > 0;
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
	this.createEnemy(eventId);
};

Game_Event.prototype.createEnemy = function(eventId) {
	const mapEnemy = Number($dataMap.events[eventId].meta[META_ENEMY]);
	if (mapEnemy) {
		this._enemy = new KRD_Game_MapEnemy(mapEnemy, 0, 0, eventId);
	}
};

// -------------------------------------
// meta リストを取得

Game_Map.prototype.metaList = function(tag) {
	return $dataMap.events.filter(event => event && !!event.meta[tag]);
};

Game_Map.prototype.metaIdList = function(tag) {
	return this.metaList(tag).map(e => e.id);
};

// -------------------------------------
// マップでのダメージポップアップ追加
// HPゲージ追加
// ステートアイコン追加

const KRD_Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	KRD_Scene_Map_start.apply(this, arguments);
	this.createMapBattlerSprite();
};

Scene_Map.prototype.createMapBattlerSprite = function() {
	this.createMapEnemySprite();
	this.createMapPlayerSprite();
};

Scene_Map.prototype.createMapEnemySprite = function() {
	const metaIdList = $gameMap.metaIdList(META_ENEMY);

	metaIdList.forEach(eventId => {
		const characterSprites = SceneManager._scene._spriteset._characterSprites;
		const index = $gameMap.characterSpritesIndex(eventId);
		const cs = characterSprites[index];
		const event = $gameMap.event(eventId);
		const battler = event._enemy;
		if (characterSprites && cs && event) {
			if (USE_DAMAGE_POPUP) {
				this.createDamagePopup(cs, battler);
			}
			if (USE_HP_GAUGE) {
				this.createHpGauge(cs, battler);
			}
			if (USE_STATE_ICON) {
				const h = event._size ? event._size[1] : 48;
				this.createStateIcon(cs, battler, h);
			}
		}
	}, this);
};

Scene_Map.prototype.createMapPlayerSprite = function() {
	const metaIdList = $gameMap.metaIdList(META_ENEMY);
	if (metaIdList.length > 0) {
		const characterSprites = SceneManager._scene._spriteset._characterSprites;
		const index = characterSprites.findIndex(cs => cs._character.constructor.name === "Game_Player");
		const cs = characterSprites[index];
		const battler = $gameParty.leader();
		if (characterSprites && cs) {
			if (USE_DAMAGE_POPUP) {
				this.createDamagePopup(cs, battler);
			}
			if (USE_HP_GAUGE_PLAYER) {
				this.createHpGauge(cs, battler);
			}
			if (USE_STATE_ICON) {
				const h = $gamePlayer._size ? $gamePlayer._size[1] : 48;
				this.createStateIcon(cs, battler, h);
			}
		}
	}
};

Scene_Map.prototype.createDamagePopup = function(characterSprite, battler) {
	if (battler.isActor()) {
		const sprite = new KRD_Sprite_MapActor(battler);
		characterSprite.addChild(sprite);
	} else {
		const sprite = new KRD_Sprite_MapEnemy(battler);
		characterSprite.addChild(sprite);
		}
};

Scene_Map.prototype.createHpGauge = function(characterSprite, battler) {
	const gauge = new KRD_Sprite_MapGauge();
	gauge.setup(battler, "hp");
	characterSprite.addChild(gauge);
};

Scene_Map.prototype.createStateIcon = function(characterSprite, battler, h) {
	const stateIcon = new KRD_Sprite_MapStateIcon(h);
	stateIcon.setup(battler);
	characterSprite.addChild(stateIcon);
};

Game_Map.prototype.characterSpritesIndex = function(eventId) {
	return this.events().findIndex(event => event.eventId() === eventId);
};

//--------------------------------------
// ダメージポップアップ表示
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
		$gameMap.metaIdList(META_ENEMY).forEach(id => {
			this.mapPopupEnemy(id);
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
	const event = $gameMap.event(eventId);
	if (event) {
		const target = event._enemy;
		this.mapDamage(target, subject, skillId);
	}
};

Game_Temp.prototype.mapDamageTroop = function(skillId) {
	$gameMap.metaIdList(META_ENEMY).forEach(id => {
		this.mapDamageEnemy(id, skillId);
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
	const event = $gameMap.event(eventId);
	if (event) {
		const target = event._enemy;
		this.itemMapDamage(target, subject, itemId);
	}
};

Game_Temp.prototype.itemMapDamageTroop = function(itemId) {
	$gameMap.metaIdList(META_ENEMY).forEach(id => {
		this.itemMapDamageEnemy(id, itemId);
	}, this);
};

// -------------------------------------
// 残HPチェック

Game_Temp.prototype.isDeadEnemy = function(eventId) {
	const event = $gameMap.event(eventId);
	return !event._erased && event._enemy.isDead();
};

Game_Temp.prototype.isDeadTroop = function() {
	const metaIdList = $gameMap.metaIdList(META_ENEMY);
	this._deadList = metaIdList.filter(id => this.isDeadEnemy(id), this);
	return !!this._deadList.length;
};

// -------------------------------------
// イベントの一時消去

Game_Temp.prototype.eraseAllDeadEvent = function() {
	if (this._deadList) {
		this._deadList.forEach(id => {
			$gameMap.eraseEvent(id);
		});
	}
};

// -------------------------------------
// プレイヤーとイベントの接触時の位置関係判断

Game_Temp.prototype.checkCollision = function(attackId, defenseId) {
	if (this.runningEventId() > 0 || (attackId && defenseId)) {
		const player = attackId && attackId > 0 ? $gameMap.event(attackId) : $gamePlayer;
		const event = defenseId && defenseId > 0 ? $gameMap.event(defenseId) : this.runningEvent();

		return this.checkCollisionMain(player, event);
	}
	return 0;
};

Game_Temp.prototype.checkCollisionMain = function(player, event) {
	if (event._erased) {
		return 0;
	} 

	const playerDirection = player.direction();
	const eventDirection = event.direction();
	const eventPosition = this.eventPosition(player, event);

	if (playerDirection === eventPosition) {
		return this.attackByPlayer(eventPosition, eventDirection);
	} else {
		return this.attackByEvent(eventPosition, playerDirection);
	}
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
	// BACK  = -200;
	// SIDE  = -400;
	// FRONT = -800;
	return -this.checkCollisionTable(position, direction);
};

Game_Temp.prototype.checkCollisionTable = function(position, direction) {
	const FRONT = 200;
	const SIDE  = 400;
	const BACK  = 800;
	const positionIndex = position / 2 - 1;
	const directionIndex = direction / 2 - 1;

	const collisionTable = [
		[BACK, SIDE, SIDE, FRONT],
		[SIDE, BACK, FRONT, SIDE],
		[SIDE, FRONT, BACK, SIDE],
		[FRONT, SIDE, SIDE, BACK],
	];

	const range = [0, 1, 2, 3];
	if (range.includes(positionIndex) && range.includes(directionIndex)) {
		return collisionTable[positionIndex][directionIndex];
	} else {
		return 0;
	}
};

// -------------------------------------
// 移動する攻撃イベントと全イベントの衝突チェック

Game_Temp.prototype.checkCollisionAll = function(attackId) {
	const player = attackId && attackId > 0 ? $gameMap.event(attackId) : $gamePlayer;
	const metaIdList = $gameMap.metaIdList(META_ENEMY);

	for (let i = 0; i < metaIdList.length; i++) {
		const collision = this.checkCollisionMain(player, $gameMap.event(metaIdList[i]));
		if (collision > 0) {
			return {"eventId": metaIdList[i], "collision": collision};
		}
	}
	return {"eventId": 0, "collision": 0};
};

Game_Temp.prototype.anyCollision = function(attackId, collisionList) {
	const attacker = $gameMap.event(attackId);
	const metaIdList = $gameMap.metaIdList(META_ENEMY);

	for (let i = 0; attacker && i < metaIdList.length; i++) {
		const collision = this.checkCollisionMain(attacker, $gameMap.event(metaIdList[i]));
		if (collisionList.includes(collision)) {
			return metaIdList[i];
		}
	}
	return 0;
};

// -------------------------------------
// マップバトル報酬

Game_Temp.prototype.processTroopCollapse = function() {
	if (this._deadList) {
		this._deadList.forEach(id => {
			this.processEnemyCollapse(id);
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
	if (animeId > 0) {
		const params = [characterId, animeId, waitMode];
		if (characterId > 0) {
			const character = $gameMap.event(characterId);
			if (character) {
				 $gameTemp.requestAnimation([character], params[1]);
				 if (params[2]) {
					  $gameMap._interpreter.setWaitMode("animation");
				 }
			}
		} else {
			$gameMap._interpreter.command212(params);
		}
	}
};

Game_Temp.prototype.getAnimationId = function(animationId, characterId) {
	if (animationId > 0) {
		return animationId;
	} else {
		if (characterId >= 0) {
			const weapon = $gameParty.leader().weapons()[0];
			if (weapon && (weapon.id > 0)) {
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

Game_Temp.prototype.addStateEnemy = function(stateId, eventId) {
	$gameMap.event(eventId)._enemy.addState(stateId);
};

Game_Temp.prototype.addStatePlayer = function(stateId) {
	$gameParty.leader().addState(stateId);
};

// -------------------------------------
// 指定イベントのセルフスイッチ変更

Game_Temp.prototype.setSelfSwitch = function(mapId, eventId, alphabet, value) {
	const key = [mapId, eventId, alphabet];
	$gameSelfSwitches.setValue(key, value);
};

// -------------------------------------
// 「イベントの位置変更」のイベントID指定

Game_Temp.prototype.setEventLocation = function(eventId, x, y, direction) {
	const event = $gameMap.event(eventId);
	if (event) {
		event.locate(x, y);
		if (direction > 0) {
			event.setDirection(direction);
		}
	}
};

// -------------------------------------
// 「移動ルートの設定(プレイヤーの逆を向く)」のイベントID指定

Game_Temp.prototype.turnAwayFromPlayer = function(eventId) {
	const event = $gameMap.event(eventId);
	if (event) {
		event.turnAwayFromPlayer();
	}
};

// -------------------------------------
// 「移動ルートの設定(一歩前進)」のイベントID指定
//
// Game_Interpreter であることに注意！！

Game_Interpreter.prototype.moveForward = function(eventId, waitMode) {
	$gameMap.refreshIfNeeded();
	const character = $gameMap.event(eventId);
	if (character) {
		const moveRoute = {
			list: [
				{code: Game_Character.ROUTE_MOVE_FORWARD, indent: null},
				{code: 0}
			],
			repeat: false,
			skippable: false,
			wait: waitMode
		};
		character.forceMoveRoute(moveRoute);
	}
};

// -------------------------------------
// 玉がどれかの敵イベントに当たったチェック

Game_Interpreter.prototype.anyCollision = function(skillId) {
	const waitMode = true;
	const targetId = $gameTemp.anyCollision(this.eventId(), [200, 400, 800, -800]);
	if (targetId > 0) {
		$gameTemp.showSkillAnimation(skillId, targetId, waitMode);
		$gameTemp.mapDamageEnemy(targetId, skillId);
		$gameTemp.mapPopupEnemy(targetId);
		return true;
	}
	return false;
}

// -------------------------------------
// 玉移動数チェック

Game_Interpreter.prototype.checkOverStep = function(step) {
	const event = $gameMap.event(this.eventId());
	const launchId = this.launchEventId(this.eventId());
	const launch = $gameMap.event(launchId);
	const direction = event.direction();
	const diffX = Math.abs(event.x - launch.x);
	const diffY = Math.abs(event.y - launch.y);
	const eventStep = this.eventStep(direction, diffX, diffY);

	if (eventStep >= step) {
		return true;
	} else {
		return false;
	}
};

Game_Interpreter.prototype.eventStep = function(direction, diffX, diffY) {
	switch(direction) {
		case 2:
		case 8:
			return diffY;
		case 4:
		case 6:
			return diffX;
	}
	return 0;
};

Game_Interpreter.prototype.ballIndex = function(ballId) {
	const ballIdList = $gameMap.metaIdList(META_BALL);
	const index = ballIdList.findIndex(id => id === ballId);
	return index;
};

Game_Interpreter.prototype.launchEventId = function(ballId) {
	const index = this.ballIndex(ballId);
	const launchIdList = $gameMap.metaIdList(META_LAUNCH);
	return launchIdList[index];
};

Game_Interpreter.prototype.launchIndex = function(launchId) {
	const launchIdList = $gameMap.metaIdList(META_LAUNCH);
	const index = launchIdList.findIndex(id => id === launchId);
	return index;
};

Game_Interpreter.prototype.ballEventId = function(launchId) {
	const index = this.launchIndex(launchId);
	const ballIdList = $gameMap.metaIdList(META_BALL);
	return ballIdList[index];
};

// -------------------------------------

Game_Interpreter.prototype.resetBallSelfSwitches = function(alphabet) {
	const ballIdList = $gameMap.metaIdList(META_BALL);
	ballIdList.forEach(id => {
		$gameTemp.setSelfSwitch($gameMap.mapId(), id, alphabet, false);
	});
};

// -------------------------------------
})();
