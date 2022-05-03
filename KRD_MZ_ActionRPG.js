/*:
 * @target MZ
 * @plugindesc アクションRPG
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param useDamagePopup
 * @text ダメージポップアップ
 * @desc 別途スクリプト必要。ダメージポップアップを「true: 表示する ／ false: 表示しない」
 * @default true
 * @type boolean
 * 
 * @param mapGauge
 * @text マップゲージ
 * 
 * @param useHpGauge
 * @text HPゲージ
 * @desc 敵キャラにHPゲージを「true: 表示する ／ false: 表示しない」
 * @default true
 * @type boolean
 * @parent mapGauge
 * 
 * @param useHpGaugePlayer
 * @text HPゲージ(プレイヤー)
 * @desc プレイヤーにHPゲージを「true: 表示する ／ false: 表示しない」
 * @default true
 * @type boolean
 * @parent mapGauge
 * 
 * @param useHpGaugeFollower
 * @text HPゲージ(フォロワー)
 * @desc 隊列の仲間にHPゲージを「true: 表示する ／ false: 表示しない」
 * @default true
 * @type boolean
 * @parent mapGauge
 * 
 * @param gaugeHeight
 * @text ゲージ高さ
 * @desc ゲージの高さ。デフォルト: 6
 * @default 6
 * @type number
 * @parent mapGauge
 * 
 * @param useStateIcon
 * @text ステートアイコン
 * @desc ステートアイコンを「true: 表示する ／ false: 表示しない」
 * @default true
 * @type boolean
 * 
 * @param alwaysPlayerHp
 * @text プレイヤーHP常時表示
 * @desc プレイヤーHPを常時「true: 表示する ／ false: 表示しない」
 * @default true
 * @type boolean
 * 
 * @param alwaysFollowerHp
 * @text フォロワーHP常時表示
 * @desc 隊列の仲間のHPを常時「true: 表示する ／ false: 表示しない」
 * @default true
 * @type boolean
 * 
 * @param useDisplayRewards
 * @text バトル報酬表示
 * @desc バトル報酬ウィンドウを「true: 表示する ／ false: 表示しない」
 * @default false
 * @type boolean
 * 
 * @param cmnGameOver
 * @text ゲームオーバーイベント
 * @desc マップバトルのゲームオーバー時に呼び出すコモンイベント。プラグインコマンド「ゲームオーバー状態初期化」と併用。
 * @type common_event
 * 
 * @param alwaysMapGameover
 * @text 常時ゲームオーバーイベント
 * @desc ゲームオーバーコモンイベントをマップバトル以外でも「true: 呼ぶ ／ false: 呼ばない」
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
 * @command checkRangeCollision
 * @text 衝突チェック距離斜め
 * @desc プレイヤーと敵イベントの位置関係をチェックします。斜めあり、距離あり。
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
 * @command resetBallSelfSwitches
 * @text 一括玉セルフスイッチOFF
 * @desc 全ての「玉」のセルフスイッチをOFFにします。
 * @arg alphabet
 * @text アルファベット
 * @desc セルフスイッチのアルファベット A ～ D を指定します。
 * 
 * @command resetEnemyBallSelfSwitches
 * @text 一括敵玉セルフスイッチOFF
 * @desc 全ての「敵玉」のセルフスイッチをOFFにします。
 * @arg alphabet
 * @text アルファベット
 * @desc セルフスイッチのアルファベット A ～ D を指定します。
 * 
 * @command eraseMapEnemy
 * @text 全敵イベント消去
 * @desc 全ての敵イベントを一時消去します。
 * 
 * @command clearGameOver
 * @text ゲームオーバー状態初期化
 * @desc ゲームオーバーイベントの中で使ってください。
 * 
 * @help
# KRD_MZ_ActionRPG.js

アクションRPG

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 使い方

マップイベントのメモ欄に <MapEnemy:敵キャラ番号> タグを記述します。
(敵キャラ番号は数字を記述すること)
そのマップイベントは記述した敵キャラ番号のデータを持ちます。

## 用語

- 敵イベント
  メモ欄に <MapEnemy:敵キャラ番号> タグを記述したマップイベント。
  イベント内に敵キャラデータを持っている。

- マップバトル
  敵イベントが存在するマップ。
  先頭キャラが戦闘不能になるとゲームオーバーになる。

- 玉
  メモ欄に <Ball> タグを記述したマップイベント。
  発射装置から発射し、敵イベントにダメージを与えられる。

- 発射装置
  メモ欄に <Launch> タグを記述したマップイベント。
  プレイヤー操作で玉を発射できる。
  （という作り方を想定している）

- 敵玉
  メモ欄に <EnemyBall> タグを記述したマップイベント。
  敵玉発射装置から発射され、プレイヤーが当たるとダメージを受ける。

- 敵玉発射装置
  メモ欄に <EnemyLaunch> タグを記述したマップイベント。
  敵玉を発射できる。

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

敵イベントのメモ欄に <DirectionFix> と書くこと。
接触したイベントがプレイヤー側を向くので、正面衝突しか発生しません。

## 補足

### 敵イベントID取得

スクリプト欄に this.eventId() と記述することで取得できます。

### ダメージポップアップ

プレイヤーのダメージポップアップを表示するためには、
データベース「システム1」の「戦闘画面」を「サイドビュー」にすること。

## 更新履歴

- ver.0.0.1 (2022/01/04) 作成開始
- ver.0.0.2 (2022/01/11) HPゲージとダメージポップアップ追加
- ver.0.0.3 (2022/01/12) ダメージ処理をプラグイン化
- ver.0.0.4 (2022/01/15) 衝突処理をプラグイン化
- ver.0.0.5 (2022/01/17) セーブ不可を解決、ロード不可はまだある。
- ver.0.0.6 (2022/01/17) ロード不可マップでセーブ不可にする一時的対処。
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
- ver.1.5.0 (2022/01/28) イベント同士の衝突チェック処理を追加。
- ver.1.5.1 (2022/01/29) playerAttackSet 仮作成。のちに削除。
- ver.1.5.2 (2022/01/30) 衝突チェック処理を修正。
- ver.1.6.0 (2022/01/31) 全イベント衝突チェックを追加。
- ver.1.7.0 (2022/02/02) イベント発射サポート関数を作成。
- ver.1.7.1 (2022/02/02) anyCollision関数をリファクタリング。
- ver.1.7.2 (2022/02/06) anyCollision関数に引数を追加。
- ver.1.8.0 (2022/02/07) イベント移動可能チェックを追加。
- ver.1.9.0 (2022/02/09) 自分用 TinyGetInfoWndMZ 併用処理を追加。
- ver.1.10.0 (2022/02/10) ステート効果を反映。ゲームオーバー処理追加。
- ver.1.10.1 (2022/02/11) ダメージ表示位置をリセットするようにした。
- ver.1.11.0 (2022/02/27) 敵玉の処理を追加。
- ver.1.11.1 (2022/03/03) 玉のリファクタリング。
- ver.1.11.2 (2022/03/15) 一部数値の定数化。
- ver.1.12.0 (2022/03/21) 常時プレイヤーHPゲージ表示追加。
- ver.1.13.0 (2022/03/23) フォロワーのHPゲージ表示追加。
- ver.1.13.1 (2022/03/27) Scene_Scheduleに対応。
- ver.1.13.2 (2022/04/04) 戦闘テストでエラーになる件を修正。
- ver.1.14.0 (2022/04/12) KRD_MZ_DirectionFix を内蔵した。
- ver.1.15.0 (2022/04/12) checkRangeCollision を追加した。
- ver.1.15.1 (2022/05/02) パラメータ初期値変更。

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
const USE_HP_GAUGE_FOLLOWER = PARAM["useHpGaugeFollower"] === "true";

const CMN_GAME_OVER = Number(PARAM["cmnGameOver"]) || 0;

const ALWAYS_PLAYER_HP = PARAM["alwaysPlayerHp"] === "true";
const ALWAYS_FOLLOWER_HP = PARAM["alwaysFollowerHp"] === "true";
const ALWAYS_MAP_GAMEOVER = PARAM["alwaysMapGameover"] === "true";

const USE_DISPLAY_REWARDS = PARAM["useDisplayRewards"] === "true";
const DEFAULT_ANIMATION_ID = 1;
const DAMAGE_POPUP_COUNT = 5;

const META_ENEMY = "MapEnemy";
const META_BALL = "Ball";
const META_LAUNCH = "Launch";
const META_ENEMY_BALL = "EnemyBall";
const META_ENEMY_LAUNCH = "EnemyLaunch";
const META_BOSS = "MapBoss";

const FRONT = 200;
const SIDE = 400;
const BACK = 800;
const E_BACK = -200;
const E_SIDE = -400;
const E_FRONT = -800;

const GAUGE_WIDTH = 40;
const GAUGE_HEIGHT = Number(PARAM["gaugeHeight"]) || 6;

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

PluginManager.registerCommand(PLUGIN_NAME, "checkRangeCollision", args => {
	$gameVariables.setValue(Number(args.varResult) , $gameTemp.checkRangeCollision());
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

PluginManager.registerCommand(PLUGIN_NAME, "resetBallSelfSwitches", args => {
	$gameTemp.resetBallSelfSwitches(args.alphabet, META_BALL);
});

PluginManager.registerCommand(PLUGIN_NAME, "resetEnemyBallSelfSwitches", args => {
	$gameTemp.resetBallSelfSwitches(args.alphabet, META_ENEMY_BALL);
});

PluginManager.registerCommand(PLUGIN_NAME, "eraseMapEnemy", args => {
	$gameMap.eraseMapEnemy();
});

PluginManager.registerCommand(PLUGIN_NAME, "clearGameOver", args => {
	$gameMap._gameOver = false;
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
		return GAUGE_WIDTH;
	}
	
	gaugeHeight() {
		return GAUGE_HEIGHT;
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
		const halfWidth = Math.floor(this.bitmapWidth() / 2);
		const eventHeight = 48;
		const diffHeight = eventHeight - this.bitmapWidth();
		const bottom = eventHeight - Math.floor(diffHeight / 2);
		this.move(x - halfWidth, y - bottom);
	}
};

// -------------------------------------
// KRD_Sprite_MapBattler クラス (ダメージポップアップ用)

KRD_Sprite_MapActor = class extends Sprite_Battler {
};

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
			return $gameMap.enemy(this._subjectEnemyIndex);
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
// マップ移動衝突時の振り向き禁止
// 同じ処理なので KRD_MZ_DirectionFix は不要

const KRD_Game_Character_turnTowardCharacter = Game_Character.prototype.turnTowardCharacter;
Game_Character.prototype.turnTowardCharacter = function(character, flag) {
	if (flag) {
		// スクリプトから実行で DirectionFix の影響なし動作をしたい場合の処理
		KRD_Game_Character_turnTowardCharacter.apply(this, arguments);
	} else {
		const directionFix = this._eventId ? $dataMap.events[this._eventId].meta.DirectionFix : false;
		if (!directionFix) {
			KRD_Game_Character_turnTowardCharacter.apply(this, arguments);
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
	const enemyId = Number($dataMap.events[eventId].meta[META_ENEMY]);
	if (enemyId) {
		this._enemy = new KRD_Game_MapEnemy(enemyId, 0, 0, eventId);
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
// enemy を取得

Game_Map.prototype.enemy = function(eventId) {
	return this.event(eventId) ? this.event(eventId).enemy() : null;
};

Game_Event.prototype.enemy = function() {
	return this._enemy;
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
	this.createMapFollowerSprite();
};

Scene_Map.prototype.createMapEnemySprite = function() {
	const metaIdList = $gameMap.metaIdList(META_ENEMY);

	metaIdList.forEach(eventId => {
		const characterSprites = SceneManager._scene._spriteset._characterSprites;
		const index = $gameMap.characterSpritesIndex(eventId);
		const cs = characterSprites[index];
		const event = $gameMap.event(eventId);
		const battler = $gameMap.enemy(eventId);
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
	if (this.constructor.name === "Scene_Schedule") {
		return;
	}

	if (ALWAYS_PLAYER_HP || $gameParty.inMapBattle()) {
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

Scene_Map.prototype.createMapFollowerSprite = function() {
	if (this.constructor.name === "Scene_Schedule") {
		return;
	}

	if ($gamePlayer.followers().isVisible()) {
		if (ALWAYS_FOLLOWER_HP || $gameParty.inMapBattle()) {
			const characterSprites = SceneManager._scene._spriteset._characterSprites;
			const csIndexList = characterSprites.map((cs, index) => {
				if (cs._character.constructor.name === "Game_Follower") {
					return index;
				}
			}).filter(i => !isNaN(i));
			const followers = $gameParty.battleMembers().filter((e, index) => index > 0);

			followers.forEach((battler, index) => {
				const cs = characterSprites[csIndexList[csIndexList.length - index - 1]];

				if (characterSprites && cs) {
					if (USE_DAMAGE_POPUP) {
						this.createDamagePopup(cs, battler);
					}
					if (USE_HP_GAUGE_FOLLOWER) {
						this.createHpGauge(cs, battler);
					}
					if (USE_STATE_ICON) {
						const h = $gamePlayer._size ? $gamePlayer._size[1] : 48;
						this.createStateIcon(cs, battler, h);
					}
				}
			}, this);
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
		$gameMap.enemy(eventId).startDamagePopup();
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
	const target = $gameMap.enemy(eventId);
	if (target) {
		this.mapDamage(target, subject, skillId);
	}
};

Game_Temp.prototype.mapDamageTroop = function(skillId) {
	$gameMap.metaIdList(META_ENEMY).forEach(id => {
		this.mapDamageEnemy(id, skillId);
	}, this);
};

Game_Temp.prototype.mapDamagePlayer = function(eventId, skillId) {
	const subject = $gameMap.enemy(eventId);
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
	const target = $gameMap.enemy(eventId);
	if (target) {
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
	return event && !event._erased && $gameMap.enemy(eventId).isDead();
};

Game_Temp.prototype.isDeadTroop = function() {
	const metaIdList = $gameMap.metaIdList(META_ENEMY);
	this._deadList = metaIdList.filter(id => this.isDeadEnemy(id), this);
	return !!this._deadList.length;
};

// -------------------------------------
// 戦闘不能の敵イベントの一時消去

Game_Temp.prototype.eraseAllDeadEvent = function() {
	if (this._deadList) {
		this._deadList.forEach(id => {
			$gameMap.enemy(id).performCollapse();
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
	return -this.checkCollisionTable(position, direction);
};

Game_Temp.prototype.checkCollisionTable = function(position, direction) {
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
// プレイヤーとイベントの接触時の位置関係判断
// 距離あり、斜めあり

Game_Temp.prototype.checkRangeCollision = function(attackId, defenseId) {
	if (this.runningEventId() > 0 || (attackId && defenseId)) {
		const player = attackId && attackId > 0 ? $gameMap.event(attackId) : $gamePlayer;
		const event = defenseId && defenseId > 0 ? $gameMap.event(defenseId) : this.runningEvent();

		return this.checkRangeCollisionMain(player, event);
	}
	return 0;
};

Game_Temp.prototype.checkRangeCollisionMain = function(player, event) {
	if (event._erased) {
		return 0;
	} 

	const playerDirection = player.direction();
	const eventDirection = event.direction();
	const eventPosition = this.eventRangePosition(player, event);

	if (this.isAttackByPlayer(playerDirection, eventPosition)) {
		if (this.isFaceToFace(playerDirection, eventDirection)) {
			return FRONT;
		} else if (this.isBackAttack(playerDirection, eventDirection)) {
			return BACK;
		} else {
			return SIDE;
		}
	} else {
		if (this.isFaceToFace(eventDirection, playerDirection)) {
			return E_FRONT;
		} else if (this.isBackAttack(eventDirection, playerDirection)) {
			return E_BACK;
		} else {
			return E_SIDE;
		}
	}
};

Game_Temp.prototype.isAttackByPlayer = function(playerDirection, eventPosition) {
	const table = {
		2: [1, 2, 3],
		4: [1, 4, 7],
		6: [3, 6, 9],
		8: [7, 8, 9],
	};

	const result = !!table[playerDirection].includes(eventPosition);
	return result;
};

Game_Temp.prototype.isFaceToFace = function(atkDirection, defDirection) {
	const table = {
		2: {8: true},
		4: {6: true},
		6: {4: true},
		8: {2: true},
	};

	const result = !!table[atkDirection][defDirection];
	return result;
};

Game_Temp.prototype.isBackAttack = function(atkDirection, defDirection) {
	const table = {
		2: {2: true},
		4: {4: true},
		6: {6: true},
		8: {8: true},
	};

	const result = !!table[atkDirection][defDirection];
	return result;
};

Game_Temp.prototype.eventRangePosition = function(player, event) {
	const diffX = event._x - player._x;
	const diffY = event._y - player._y;
	const plusDiffX = diffX > 0 ? 1 : diffX;
	const plusDiffY = diffY > 0 ? 1 : diffY;
	const minusDiffX = plusDiffX < 0 ? -1 : plusDiffX;
	const minusDiffY = plusDiffY < 0 ? -1 : plusDiffY;
	const ix = minusDiffX + 1;
	const iy = minusDiffY + 1;

	// Player position is center.
	const positionTable = [
		[7,8,9],
		[4,5,6],
		[1,2,3],
	];

	const range = [0, 1, 2];
	if (range.includes(ix) && range.includes(iy)) {
		return positionTable[iy][ix];
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

Game_Temp.prototype.anyCollision = function(attackId, collisionCode) {
	const attacker = $gameMap.event(attackId);
	const metaIdList = $gameMap.metaIdList(META_ENEMY);

	const findId = metaIdList.find(id => {
		const collision = this.checkCollisionMain(attacker, $gameMap.event(id));
		return !!collisionCode.includes(collision);
	}, this);

	return findId;
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
		BattleManager.gainRewards();
	} else if (typeof KRD_TINY_GET_INFO !== "undefined") {
		KRD_TINY_GET_INFO.addGetRewardsWindow(BattleManager._rewards.exp, BattleManager._rewards.gold);
		BattleManager.gainExp();
		BattleManager.gainGold();

		// item は addGetItemWindow の中で gainItem してる。
		BattleManager._rewards.items.forEach(item => {
			KRD_TINY_GET_INFO.addGetItemWindow(this.typeName(item), item.id, 1, false);
		}, this);
	} else {
		BattleManager.gainRewards();
	}
};

Game_Temp.prototype.typeName = function(item) {
	if (item.itypeId) {
		return "item";
	} else if (item.wtypeId) {
		return "weapon";
	} else if (item.atypeId) {
		return "armor";
	}
	return null;
}

BattleManager.makeMapEnemyRewards = function(eventId) {
	const enemy = $gameMap.enemy(eventId);
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
		this.changeExp(newExp, USE_DISPLAY_REWARDS || typeof KRD_TINY_GET_INFO !== "undefined");
	}
};

const KRD_Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
Game_Actor.prototype.displayLevelUp = function(newSkills) {
	if (!$gameParty.inBattle() && typeof KRD_TINY_GET_INFO !== "undefined") {
		KRD_TINY_GET_INFO.addLevelUpWindow(this.name(), this._level);
		return;
	}
	KRD_Game_Actor_displayLevelUp.apply(this, arguments);
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
	$gameMap.enemy(eventId).addState(stateId);
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
// 「移動ルートの設定(プレイヤーの方を向く)」のイベントID指定

Game_Temp.prototype.turnTowardPlayer = function(eventId) {
	const event = $gameMap.event(eventId);
	if (event) {
		event.turnTowardPlayer();
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

Game_Interpreter.prototype.anyCollision = function(skillId, eventId) {
	const evId = eventId ? eventId : this.eventId();
	const waitMode = true;
	const collisionCode = [FRONT, SIDE, BACK, E_FRONT];
	const targetId = $gameTemp.anyCollision(evId, collisionCode);
	if (targetId > 0) {
		$gameTemp.showSkillAnimation(skillId, targetId, waitMode);
		$gameTemp.mapDamageEnemy(targetId, skillId);
		$gameTemp.mapPopupEnemy(targetId);
		return true;
	}
	return false;
};

// -------------------------------------
// イベント移動可能チェック

Game_Interpreter.prototype.canPass = function(eventId) {
	const event = $gameMap.event(eventId);
	return event.canPass(event.x, event.y, event.direction());
};

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

// -------------------------------------
// 玉と発射装置のIDを紐付け（共通処理）

Game_Interpreter.prototype.metaBallIndex = function(ballId, ballTag) {
	const ballIdList = $gameMap.metaIdList(ballTag);
	const index = ballIdList.findIndex(id => id === ballId);
	return index;
};

Game_Interpreter.prototype.metaLaunchEventId = function(ballId, launchTag, ballTag) {
	const index = this.metaBallIndex(ballId, ballTag);
	const launchIdList = $gameMap.metaIdList(launchTag);
	return launchIdList[index];
};

Game_Interpreter.prototype.metaLaunchIndex = function(launchId, launchTag) {
	const launchIdList = $gameMap.metaIdList(launchTag);
	const index = launchIdList.findIndex(id => id === launchId);
	return index;
};

Game_Interpreter.prototype.metaBallEventId = function(launchId, ballTag, launchTag) {
	const index = this.metaLaunchIndex(launchId, launchTag);
	const ballIdList = $gameMap.metaIdList(ballTag);
	return ballIdList[index];
};

// -------------------------------------
// 玉と発射装置のIDを紐付け

Game_Interpreter.prototype.ballIndex = function(ballId) {
	return this.metaBallIndex(ballId, META_BALL);
};

Game_Interpreter.prototype.launchEventId = function(ballId) {
	return this.metaLaunchEventId(ballId, META_LAUNCH, META_BALL);
};

Game_Interpreter.prototype.launchIndex = function(launchId) {
	return this.metaLaunchIndex(launchId, META_LAUNCH);
};

Game_Interpreter.prototype.ballEventId = function(launchId) {
	return this.metaBallEventId(launchId, META_BALL, META_LAUNCH);
};

// -------------------------------------
// 敵玉と敵玉発射装置のIDを紐付け

Game_Interpreter.prototype.enemyBallIndex = function(ballId) {
	return this.metaBallIndex(ballId, META_ENEMY_BALL);
};

Game_Interpreter.prototype.enemyLaunchEventId = function(ballId) {
	return this.metaLaunchEventId(ballId, META_ENEMY_LAUNCH, META_ENEMY_BALL);
};

Game_Interpreter.prototype.enemyLaunchIndex = function(launchId) {
	return this.metaLaunchIndex(launchId, META_ENEMY_LAUNCH);
};

Game_Interpreter.prototype.enemyBallEventId = function(launchId) {
	return this.metaBallEventId(launchId, META_ENEMY_BALL, META_ENEMY_LAUNCH);
};

// -------------------------------------
// すべての玉のセルフスイッチをOFF

Game_Temp.prototype.resetBallSelfSwitches = function(alphabet, tag = META_BALL) {
	const ballIdList = $gameMap.metaIdList(tag);
	ballIdList.forEach(id => {
		this.setSelfSwitch($gameMap.mapId(), id, alphabet, false);
	}, this);
};

// -------------------------------------
// 行動不可ステート効果の反映

const KRD_Game_Event_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
	if (!this.enemy()) {
		KRD_Game_Event_updateSelfMovement.apply(this, arguments);
	} else if (this.enemy().canMove()) {
		KRD_Game_Event_updateSelfMovement.apply(this, arguments);
	}
};

// -------------------------------------
// マップでのターン終了処理

const KRD_Game_Party_onPlayerWalk = Game_Party.prototype.onPlayerWalk;
Game_Party.prototype.onPlayerWalk = function() {
	KRD_Game_Party_onPlayerWalk.apply(this, arguments);
	$gameMap.onPlayerWalk();
};

Game_Map.prototype.onPlayerWalk = function() {
	const metaIdList = this.metaIdList(META_ENEMY);
	metaIdList.forEach(id => {
		this.enemy(id).turnEndOnMap();
	}, this);
};

Game_Party.prototype.inMapBattle = function() {
	if ($gameParty.inBattle()) {
		return false;
	}

	return !!$gameMap.metaIdList(META_ENEMY).length;
};

Game_Party.prototype.isAlwaysPlayerHp = function() {
	const inBattle = $gameParty.inBattle();
	const playerHp = ALWAYS_PLAYER_HP && USE_DAMAGE_POPUP;
	return !inBattle && playerHp;
};

Game_Party.prototype.canMapDamagePopup = function() {
	return (this.inMapBattle() && USE_DAMAGE_POPUP) || this.isAlwaysPlayerHp();
};

const KRD_Game_Actor_turnEndOnMap = Game_Actor.prototype.turnEndOnMap;
Game_Actor.prototype.turnEndOnMap = function() {
	KRD_Game_Actor_turnEndOnMap.apply(this, arguments);
	if ($gameParty.steps() % this.stepsForTurn() === 0) {
		if (this.result().hpDamage < 0) {
			this.performMapRecover();
		}
	}
};

const KRD_Game_Actor_performMapDamage = Game_Actor.prototype.performMapDamage;
Game_Actor.prototype.performMapDamage = function() {
	if ($gameParty.canMapDamagePopup()) {
		this.startDamagePopup();
	} else {
		KRD_Game_Actor_performMapDamage.apply(this, arguments);
	}
};

Game_Actor.prototype.performMapRecover = function() {
	if ($gameParty.canMapDamagePopup()) {
		this.startDamagePopup();
	}
};

Game_Enemy.prototype.turnEndOnMap = function() {
	if ($gameParty.steps() % $gameParty.leader().stepsForTurn() === 0) {
		this.onTurnEnd();
		if (this.result().hpDamage !== 0) {
			this.startDamagePopup();
		}
	}
};

// -------------------------------------
// ゲームオーバー処理

const KRD_Scene_Map_checkGameover = Scene_Map.prototype.checkGameover;
Scene_Map.prototype.checkGameover = function() {
	if (this.isMapGameOver()) {
		$gameMap._gameOver = true;
		$gameTemp.reserveCommonEvent(CMN_GAME_OVER);
	} else {
		KRD_Scene_Map_checkGameover.apply(this, arguments);
	}
};

Game_Party.prototype.isAlwaysMapGameover = function() {
	return (ALWAYS_MAP_GAMEOVER || !this.inBattle())
};

Scene_Map.prototype.isMapGameOver = function() {
	if (!$gameMap._gameOver) {
		if ($gameParty.inMapBattle() && $gameParty.leader().isDead()) {
			return true;
		}
		if ($gameParty.isAlwaysMapGameover() && $gameParty.isAllDead()) {
			return true;
		}
	}
	return false;
};

// -------------------------------------
// ダメージスプライトの表示位置をリセット

const KRD_Sprite_Battler_createDamageSprite = Sprite_Battler.prototype.createDamageSprite;
Sprite_Battler.prototype.createDamageSprite = function() {
	KRD_Sprite_Battler_createDamageSprite.apply(this, arguments);

	if ($gameParty.canMapDamagePopup()) {
		const sprite = this._damages[this._damages.length - 1];
		sprite.x = sprite.x < (8 * DAMAGE_POPUP_COUNT) ? sprite.x : 0;
		sprite.y = sprite.y > (-16 * DAMAGE_POPUP_COUNT) ? sprite.y : 0;
	}
};

// -------------------------------------
// ボス

Game_Temp.prototype.bossId = function() {
	const metaIdList = $gameMap.metaIdList(META_BOSS);
	return metaIdList[0];
};

Game_Temp.prototype.isDeadBoss = function() {
	return !!this.isDeadEnemy(this.bossId());
};

// -------------------------------------
// 敵イベントの強制一時消去

Game_Map.prototype.eraseMapEnemy = function() {
	this.eraseAllMetaEvent(META_ENEMY);
};

Game_Map.prototype.eraseAllMetaEvent = function(tag) {
	const metaIdList = this.metaIdList(tag);
	this.eraseAllListEvent(metaIdList);
};

Game_Map.prototype.eraseAllListEvent = function(idList) {
	for (const id of idList) {
		this.eraseEvent(id);
	}
};

// -------------------------------------
})();
