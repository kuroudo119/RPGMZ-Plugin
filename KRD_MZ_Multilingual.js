/*:
 * @target MZ
 * @plugindesc 多言語プラグイン
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 ***************************************
 * @param basicSection
 * @text 基本設定
 * 
 * @param argLanguage
 * @text 言語一覧
 * @desc 切り替え可能な言語の一覧を指定します。
 * デフォルト言語を最初に設定してください。
 * @default ["日本語"]
 * @type string[]
 * @parent basicSection
 * 
 * @param argOptionText
 * @text オプション表示名
 * @desc オプション画面に表示する項目名を指定します。
 * デフォルト言語を最初に設定してください。
 * @default ["言語"]
 * @type string[]
 * @parent basicSection
 * 
 ***************************************
 * @param dataSection
 * @text 用語系データ
 * 
 * @param argGameTitle
 * @text ゲームタイトル
 * @desc 言語一覧で設定した順に設定してください。
 * デフォルト言語は設定しないでください。
 * @type struct<gameTitle>[]
 * @parent dataSection
 * 
 * @param argCurrencyUnit
 * @text 通貨単位
 * @desc 言語一覧で設定した順に設定してください。
 * デフォルト言語は設定しないでください。
 * @type struct<currencyUnit>[]
 * @parent dataSection
 * 
 * @param argElements
 * @text 属性
 * @desc 言語一覧で設定した順に設定してください。
 * 対応したプラグインを使用する場合に設定してください。
 * @type struct<elements>[]
 * @parent dataSection
 * 
 * @param argSkillTypes
 * @text スキルタイプ
 * @desc 言語一覧で設定した順に設定してください。
 * デフォルト言語は設定しないでください。
 * @type struct<skillTypes>[]
 * @parent dataSection
 * 
 * @param argEquipTypes
 * @text 装備タイプ
 * @desc 言語一覧で設定した順に設定してください。
 * デフォルト言語は設定しないでください。
 * @type struct<equipTypes>[]
 * @parent dataSection
 * 
 * @param argBasic
 * @text 基本ステータス
 * @desc 言語一覧で設定した順に設定してください。
 * デフォルト言語は設定しないでください。
 * @type struct<basic>[]
 * @parent dataSection
 * 
 * @param argParams
 * @text 能力値
 * @desc 言語一覧で設定した順に設定してください。
 * デフォルト言語は設定しないでください。
 * @type struct<params>[]
 * @parent dataSection
 * 
 * @param argCommands
 * @text コマンド
 * @desc 言語一覧で設定した順に設定してください。
 * デフォルト言語は設定しないでください。
 * @type struct<commands>[]
 * @parent dataSection
 * 
 * @param argMessages
 * @text メッセージ
 * @desc 言語一覧で設定した順に設定してください。
 * デフォルト言語は設定しないでください。
 * @type struct<messages>[]
 * @parent dataSection
 * 
 ***************************************
 * @param fileSection
 * @text 外部ファイル読込設定
 * @desc UniqueDataLoaderプラグインを使用してjsonファイルを用意してください。制御文字は \LANGF[文章プロパティ] です。
 * 
 * @param globalName
 * @text グローバル変数名
 * @desc UniqueDataLoaderプラグインで指定したグローバル変数名です。
 * @default $dataUniques
 * @type string
 * @parent fileSection
 * 
 * @param propertyName
 * @text プロパティ名
 * @desc UniqueDataLoaderプラグインで指定したプロパティ名の前部分です。後ろに言語番号が追加されます。
 * @default msg_
 * @type string
 * @parent fileSection
 * 
 ***************************************
 * @command setLanguage
 * @text 言語切替コマンド
 * @desc 指定された番号の言語に切り替えます。
 * 
 * @arg varLanguage
 * @text 言語番号変数
 * @desc この変数の値の言語番号に変更します。
 * 言語番号の値は 0 始まりです。
 * @default 1
 * @type variable
 ***************************************
 * @command getLanguage
 * @text 現在言語取得コマンド
 * @desc 現在の言語番号を変数に入れます。
 * 
 * @arg varLanguage
 * @text 言語番号変数
 * @desc この変数に言語番号を入れます。
 * 言語番号の値は 0 始まりです。
 * @default 1
 * @type variable
 ***************************************
 * @help
# KRD_MZ_Multilingual.js

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0 (2021/01/26) 初版（希望者に期間限定配布）
- ver.0.0.1 (2021/03/17) 非公開版完成
- ver.1.0.0 (2021/06/02) 公開開始
- ver.1.1.0 (2021/06/04) 外部ファイル読込機能を追加
- ver.2.0.0 (2021/06/04) プロパティをゲッターに差し替え

## 使い方

### データベース項目（メモ欄に記述）

<name_1:名前>
<nickname_1:二つ名>
<profile_1:プロフィール>
<description_1:説明>
<message1_1:スキルのメッセージ1行目、ステートのメッセージ（アクター）>
<message2_1:スキルのメッセージ2行目、ステートのメッセージ（敵キャラ）>
<message3_1:ステートのメッセージ（継続）>
<message4_1:ステートのメッセージ（解除）>

「_1」の部分は言語番号の連番です。

### 用語

プラグインパラメータに記述します。

### イベント

プラグインコマンドで言語番号を取得し、条件分岐で切り替えます。

 * 
 * 
 */

/*~struct~gameTitle:
 * 
 * @param gameTitle
 * @text ゲームタイトル
 * @desc 「ゲームタイトル」の翻訳データを設定します。
 * @type string
 * 
 */

/*~struct~currencyUnit:
 * 
 * @param currencyUnit
 * @text 通貨単位
 * @desc 「通貨単位」の翻訳データを設定します。
 * @default Ｇ
 * @type string
 * 
 */

/*~struct~elements:
 * 
 * @param elements
 * @text 属性
 * @desc 「属性」の翻訳データを設定します。
 * データベースと同じ個数を設定してください。
 * @default ["物理","炎","氷","雷","水","土","風","光","闇"]
 * @type string[]
 * 
 */

/*~struct~skillTypes:
 * 
 * @param skillTypes
 * @text スキルタイプ
 * @desc 「スキルタイプ」の翻訳データを設定します。
 * データベースと同じ個数を設定してください。
 * @default ["魔法","必殺技"]
 * @type string[]
 * 
 */

/*~struct~equipTypes:
 * 
 * @param equipTypes
 * @text 装備タイプ
 * @desc 「装備タイプ」の翻訳データを設定します。
 * データベースと同じ個数を設定してください。
 * @default ["武器","盾","頭","身体","装飾品"]
 * @type string[]
 * 
 */

/*~struct~basic:
 * 
 * @param basic
 * @text 基本ステータス
 * @desc 「基本ステータス」の翻訳データを設定します。
 * @default ["レベル","Lv","ＨＰ","HP","ＭＰ","MP","ＴＰ","TP","経験値","EXP"]
 * @type string[]
 * 
 */

 /*~struct~params:
 * 
 * @param params
 * @text 能力値
 * @desc 「能力値」の翻訳データを設定します。
 * @default ["最大ＨＰ","最大ＭＰ","攻撃力","防御力","魔法力","魔法防御","敏捷性","運","命中率","回避率"]
 * @type string[]
 * 
 */

/*~struct~commands:
 * 
 * @param commands
 * @text コマンド
 * @desc 「コマンド」の翻訳データを設定します。
 * 「null」はそのままにしてください。
 * @default ["戦う","逃げる","攻撃","防御","アイテム","スキル","装備","ステータス","並び替え","セーブ","ゲーム終了","オプション","武器","防具","大事なもの","装備","最強装備","全て外す","ニューゲーム","コンティニュー",null,"タイトルへ","やめる",null,"購入する","売却する"]
 * @type string[]
 * 
 */

 /*~struct~messages:
 * 
 * @param alwaysDash
 * @text 常時ダッシュ
 * @desc 「常時ダッシュ」の翻訳データを設定します。
 * @default 常時ダッシュ
 * @type string
 * 
 * @param commandRemember
 * @text コマンド記憶
 * @desc 「コマンド記憶」の翻訳データを設定します。
 * @default コマンド記憶
 * @type string
 * 
 * @param touchUI
 * @text タッチUI
 * @desc タッチUI
 * @default タッチUI
 * @type string
 * 
 * @param bgmVolume
 * @text BGM 音量
 * @desc 「BGM 音量」の翻訳データを設定します。
 * @default BGM 音量
 * @type string
 * 
 * @param bgsVolume
 * @text BGS 音量
 * @desc 「BGS 音量」の翻訳データを設定します。
 * @default BGS 音量
 * @type string
 * 
 * @param meVolume
 * @text ME 音量
 * @desc 「ME 音量」の翻訳データを設定します。
 * @default ME 音量
 * @type string
 * 
 * @param seVolume
 * @text SE 音量
 * @desc 「SE 音量」の翻訳データを設定します。
 * @default SE 音量
 * @type string
 * 
 * @param possession
 * @text 持っている数
 * @desc 「持っている数」の翻訳データを設定します。
 * @default 持っている数
 * @type string
 * 
 * @param expTotal
 * @text 現在の経験値
 * @desc 「現在の経験値」の翻訳データを設定します。
 * 「%1」は「経験値」に変換されます。
 * @default 現在の%1
 * @type string
 * 
 * @param expNext
 * @text 次のレベルまで
 * @desc 「次のレベルまで」の翻訳データを設定します。
 * 「%1」は「レベル」に変換されます。
 * @default 次の%1まで
 * @type string
 * 
 * @param saveMessage
 * @text セーブメッセージ
 * @desc 「セーブメッセージ」の翻訳データを設定します。
 * @default どのファイルにセーブしますか？
 * @type string
 * 
 * @param loadMessage
 * @text ロードメッセージ
 * @desc 「ロードメッセージ」の翻訳データを設定します。
 * @default どのファイルをロードしますか？
 * @type string
 * 
 * @param file
 * @text ファイル
 * @desc 「ファイル」の翻訳データを設定します。
 * @default ファイル
 * @type string
 * 
 * @param autosave
 * @text オートセーブ
 * @desc 「オートセーブ」の翻訳データを設定します。
 * @default オートセーブ
 * @type string
 * 
 * @param partyName
 * @text パーティ名
 * @desc 「パーティ名」の翻訳データを設定します。
 * 「%1」は先頭のアクター名に変換されます。
 * @default %1たち
 * @type string
 * 
 * @param emerge
 * @text 出現
 * @desc 「出現」の翻訳データを設定します。
 * 「%1」は敵キャラ名に変換されます。
 * @default %1が出現！
 * @type string
 * 
 * @param preemptive
 * @text 先制攻撃
 * @desc 「先制攻撃」の翻訳データを設定します。
 * 「%1」はパーティ名または先頭アクター名に変換されます。
 * @default %1は先手を取った！
 * @type string
 * 
 * @param surprise
 * @text 不意打ち
 * @desc 「不意打ち」の翻訳データを設定します。
 * 「%1」はパーティ名または先頭アクター名に変換されます。
 * @default %1は不意をつかれた！
 * @type string
 * 
 * @param escapeStart
 * @text 逃走開始
 * @desc 「逃走開始」の翻訳データを設定します。
 * 「%1」はパーティ名または先頭アクター名に変換されます。
 * @default %1は逃げ出した！
 * @type string
 * 
 * @param escapeFailure
 * @text 逃走失敗
 * @desc 「逃走失敗」の翻訳データを設定します。
 * @default しかし逃げることはできなかった！
 * @type string
 * 
 * @param victory
 * @text 勝利
 * @desc 「勝利」の翻訳データを設定します。
 * 「%1」はパーティ名または先頭アクター名に変換されます。
 * @default %1の勝利！
 * @type string
 * 
 * @param defeat
 * @text 敗北
 * @desc 「敗北」の翻訳データを設定します。
 * 「%1」はパーティ名または先頭アクター名に変換されます。
 * @default %1は戦いに敗れた。
 * @type string
 * 
 * @param obtainExp
 * @text 経験値獲得
 * @desc 「%1」は経験値の値に変換されます。
 * 「%2」は経験値の名称に変換されます。
 * @default %1 の%2を獲得！
 * @type string
 * 
 * @param obtainGold
 * @text お金獲得
 * @desc 「%1」は入手金額に変換されます。
 * 「\\G」は通貨単位に変換されます。
 * @default お金を %1\\G 手に入れた！
 * @type string
 * 
 * @param obtainItem
 * @text アイテム獲得
 * @desc 「アイテム獲得」の翻訳データを設定します。
 * 「%1」はアイテム名に変換されます。
 * @default %1を手に入れた！
 * @type string
 * 
 * @param levelUp
 * @text レベルアップ
 * @desc 「%1」はアクター名、「%2」はレベルの名称、
 * 「%3」はレベル値に変換されます。
 * @default %1は%2 %3 に上がった！
 * @type string
 * 
 * @param obtainSkill
 * @text スキル習得
 * @desc 「スキル習得」の翻訳データを設定します。
 * 「%1」はスキル名に変換されます。
 * @default %1を覚えた！
 * @type string
 * 
 * @param useItem
 * @text アイテム使用
 * @desc 「%1」はアクター名に変換されます。
 * 「%2」はアイテム名に変換されます。
 * @default %1は%2を使った！
 * @type string
 * 
 * @param criticalToEnemy
 * @text 敵に会心
 * @desc 「敵に会心」の翻訳データを設定します。
 * @default 会心の一撃！！
 * @type string
 * 
 * @param criticalToActor
 * @text 味方に会心
 * @desc 「味方に会心」の翻訳データを設定します。
 * @default 痛恨の一撃！！
 * @type string
 * 
 * @param actorDamage
 * @text 味方ダメージ
 * @desc 「%1」はアクター名に変換されます。
 * 「%2」はダメージ量に変換されます。
 * @default %1は %2 のダメージを受けた！
 * @type string
 * 
 * @param actorRecovery
 * @text 味方回復
 * @desc 「%1」はアクター名、「%2」はポイント名、
 * 「%3」は回復量に変換されます。
 * @default %1の%2が %3 回復した！
 * @type string
 * 
 * @param actorGain
 * @text 味方ポイント増加
 * @desc 「%1」はアクター名、「%2」はポイント名、
 * 「%3」は増加量に変換されます。
 * @default %1の%2が %3 増えた！
 * @type string
 * 
 * @param actorLoss
 * @text 味方ポイント減少
 * @desc 「%1」はアクター名、「%2」はポイント名、
 * 「%3」は減少量に変換されます。
 * @default %1の%2が %3 減った！
 * @type string
 * 
 * @param actorDrain
 * @text 味方ポイント吸収
 * @desc 「%1」はアクター名、「%2」はポイント名、
 * 「%3」は吸収された量に変換されます。
 * @default %1は%2を %3 奪われた！
 * @type string
 * 
 * @param actorNoDamage
 * @text 味方ノーダメージ
 * @desc 「味方ノーダメージ」の翻訳データを設定します。
 * 「%1」はアクター名に変換されます。
 * @default %1はダメージを受けていない！
 * @type string
 * 
 * @param actorNoHit
 * @text 味方に命中せず
 * @desc 「味方に命中せず」の翻訳データを設定します。
 * 「%1」は対象名に変換されます。
 * @default ミス！　%1はダメージを受けていない！
 * @type string
 * 
 * @param enemyDamage
 * @text 敵ダメージ
 * @desc 「%1」は敵キャラ名に変換されます。
 * 「%2」はダメージ量に変換されます。
 * @default %1に %2 のダメージを与えた！
 * @type string
 * 
 * @param enemyRecovery
 * @text 敵回復
 * @desc 「%1」は敵キャラ名、「%2」はポイント名、
 * 「%3」は回復量に変換されます。
 * @default %1の%2が %3 回復した！
 * @type string
 * 
 * @param enemyGain
 * @text 敵ポイント増加
 * @desc 「%1」は敵キャラ名、「%2」はポイント名、
 * 「%3」は増加量に変換されます。
 * @default %1の%2が %3 増えた！
 * @type string
 * 
 * @param enemyLoss
 * @text 敵ポイント減少
 * @desc 「%1」は敵キャラ名、「%2」はポイント名、
 * 「%3」は減少量に変換されます。
 * @default %1の%2が %3 減った！
 * @type string
 * 
 * @param enemyDrain
 * @text 敵ポイント吸収
 * @desc 「%1」は敵キャラ名、「%2」はポイント名、
 * 「%3」は吸収された量に変換されます。
 * @default %1の%2を %3 奪った！
 * @type string
 * 
 * @param enemyNoDamage
 * @text 敵ノーダメージ
 * @desc 「敵ノーダメージ」の翻訳データを設定します。
 * 「%1」は敵キャラ名に変換されます。
 * @default %1にダメージを与えられない！
 * @type string
 * 
 * @param enemyNoHit
 * @text 敵に命中せず
 * @desc 「敵に命中せず」の翻訳データを設定します。
 * 「%1」は対象名に変換されます。
 * @default ミス！　%1にダメージを与えられない！
 * @type string
 * 
 * @param evasion
 * @text 回避
 * @desc 「回避」の翻訳データを設定します。
 * 「%1」は対象名に変換されます。
 * @default %1は攻撃をかわした！
 * @type string
 * 
 * @param magicEvasion
 * @text 魔法回避
 * @desc 「魔法回避」の翻訳データを設定します。
 * 「%1」は対象名に変換されます。
 * @default %1は魔法を打ち消した！
 * @type string
 * 
 * @param magicReflection
 * @text 魔法反射
 * @desc 「魔法反射」の翻訳データを設定します。
 * 「%1」は対象名に変換されます。
 * @default %1は魔法を跳ね返した！
 * @type string
 * 
 * @param counterAttack
 * @text 反撃
 * @desc 「反撃」の翻訳データを設定します。
 * 「%1」は対象名に変換されます。
 * @default %1の反撃！
 * @type string
 * 
 * @param substitute
 * @text 身代わり
 * @desc 「%1」はかばったキャラ名、
 * 「%2」は守られたキャラ名に変換されます。
 * @default %1が%2をかばった！
 * @type string
 * 
 * @param buffAdd
 * @text 強化
 * @desc 「%1」はキャラ名、
 * 「%2」は能力値名に変換されます。
 * @default %1の%2が上がった！
 * @type string
 * 
 * @param debuffAdd
 * @text 弱体
 * @desc 「%1」はキャラ名、
 * 「%2」は能力値名に変換されます。
 * @default %1の%2が下がった！
 * @type string
 * 
 * @param buffRemove
 * @text 強化・弱体の解除
 * @desc 「%1」はキャラ名、
 * 「%2」は能力値名に変換されます。
 * @default %1の%2が元に戻った！
 * @type string
 * 
 * @param actionFailure
 * @text 行動失敗
 * @desc 「行動失敗」の翻訳データを設定します。
 * 「%1」は対象名に変換されます。
 * @default %1には効かなかった！
 * @type string
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME	= document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM			= PluginManager.parameters(PLUGIN_NAME);

const argLanguage	= JSON.parse(PARAM["argLanguage"] || null);

let argOptionText	= null;
if (PARAM["argOptionText"]) {
	argOptionText = JSON.parse(PARAM["argOptionText"] || null);
}

const argGameTitle		= JSON.parse(PARAM["argGameTitle"] || null);
const argCurrencyUnit	= JSON.parse(PARAM["argCurrencyUnit"] || null);
const argElements		= JSON.parse(PARAM["argElements"] || null);
const argSkillTypes		= JSON.parse(PARAM["argSkillTypes"] || null);
const argEquipTypes		= JSON.parse(PARAM["argEquipTypes"] || null);
const argBasic			= JSON.parse(PARAM["argBasic"] || null);
const argParams			= JSON.parse(PARAM["argParams"] || null);
const argCommands		= JSON.parse(PARAM["argCommands"] || null);
const argMessages		= JSON.parse(PARAM["argMessages"] || null);

const globalName	= PARAM["globalName"] || "$dataUniques";
const propertyName	= PARAM["propertyName"] || "msg_";

const defaultValue = 0
ConfigManager.multilingual = defaultValue;

const simpleMsgSV_Plugin = $plugins.find(plugin => plugin.name === "SimpleMsgSideViewMZ") || {status:false};
const useSimpleMsgSV_Plugin = simpleMsgSV_Plugin.status === true;

//--------------------------------------
// Plugin Command for MZ

PluginManager.registerCommand(PLUGIN_NAME, "setLanguage", args => {
	const varLanguage = Number(args.varLanguage) || 1;
	const value = $gameVariables.value(varLanguage);
	if (value < 0 || value >= argLanguage.length) {
		return;
	}
	ConfigManager.multilingual = value;
	ConfigManager.save();
});

PluginManager.registerCommand(PLUGIN_NAME, "getLanguage", args => {
	const varLanguage = Number(args.varLanguage) || 1;
	const value = ConfigManager.multilingual;
	$gameVariables.setValue(varLanguage, value);
});

//--------------------------------------
// オプション画面

const KRD_Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
	if (argOptionText) {
		return KRD_Scene_Options_maxCommands.apply(this, arguments) + 1;
	} else {
		return KRD_Scene_Options_maxCommands.apply(this, arguments);
	}
};

const KRD_Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
	KRD_Window_Options_addGeneralOptions.apply(this, arguments);
	if (argOptionText) {
		this.addCommand(argOptionText[ConfigManager.multilingual], "multilingual");
	}
};

const KRD_ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = KRD_ConfigManager_makeData.apply(this, arguments);
	config.multilingual = this.multilingual;
	return config;
};

const KRD_ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	KRD_ConfigManager_applyData.apply(this, arguments);
	this.multilingual = this.readIndex(config, "multilingual");
};

ConfigManager.readIndex = function(config, name) {
	if (name in config) {
		return Number(config[name]).clamp(0, argLanguage.length - 1);
	} else {
		return defaultValue;
	}
};

const KRD_Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
	const symbol = this.commandSymbol(index);
	if (symbol !== "multilingual") {
		return KRD_Window_Options_statusText.apply(this, arguments);
	}
	const value = this.getConfigValue(symbol);
	return argLanguage[value];
};

const KRD_Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol !== "multilingual") {
		KRD_Window_Options_processOk.apply(this, arguments);
		return;
	}
	this.changeIndex(symbol, this.getConfigValue(symbol) + 1);
};

const KRD_Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol !== "multilingual") {
		KRD_Window_Options_cursorRight.apply(this, arguments);
		return;
	}
	const value = Math.min(this.getConfigValue(symbol) + 1, argLanguage.length - 1);
	this.changeIndex(symbol, value);
};

const KRD_Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol !== "multilingual") {
		KRD_Window_Options_cursorLeft.apply(this, arguments);
		return;
	}
	const value = Math.max(this.getConfigValue(symbol) - 1, 0);
	this.changeIndex(symbol, value);
};

Window_Options.prototype.changeIndex = function(symbol, value) {
	if (value >= argLanguage.length) {
		value = 0;
	} else if (value < 0) {
		value = argLanguage.length - 1;
	}
	const lastValue = this.getConfigValue(symbol);
	if (lastValue !== value) {
		this.setConfigValue(symbol, value);
		this.redrawItem(this.findSymbol(symbol));
		this.playCursorSound();
	}
};

//--------------------------------------
// 取得：アクター情報

const KRD_Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	KRD_Game_Actor_setup.apply(this, arguments);
	this._initName = this._name;
	this._initNickname = this._nickname;
	this._initProfile = this._profile;
};

const KRD_Game_Actor_name = Game_Actor.prototype.name;
Game_Actor.prototype.name = function() {
	if (this._name !== this._initName) {
		// イベントで変更した場合は変更を優先する。
		return KRD_Game_Actor_name.apply(this, arguments);
	}
	return getData($dataActors[this.actorId()]).name;
};

const KRD_Game_Actor_nickname = Game_Actor.prototype.nickname;
Game_Actor.prototype.nickname = function() {
	if (this._nickname !== this._initNickname) {
		// イベントで変更した場合は変更を優先する。
		return KRD_Game_Actor_nickname.apply(this, arguments);
	}
	return getData($dataActors[this.actorId()]).nickname;
};

const KRD_Game_Actor_profile = Game_Actor.prototype.profile;
Game_Actor.prototype.profile = function() {
	if (this._profile !== this._initProfile) {
		// イベントで変更した場合は変更を優先する。
		return KRD_Game_Actor_profile.apply(this, arguments);
	}
	return getData($dataActors[this.actorId()]).profile;
};

//--------------------------------------
// 取得：用語

const KRD_TextManager_basic = TextManager.basic;
TextManager.basic = function(id) {
	const language = ConfigManager.multilingual;
	if (language <= 0) {
		return KRD_TextManager_basic.apply(this, arguments);
	}
	const preData = JSON.parse(argBasic[language - 1]);
	const data = JSON.parse(preData.basic);
	return data[id] || KRD_TextManager_basic.apply(this, arguments);
};

const KRD_TextManager_param = TextManager.param;
TextManager.param = function(id) {
	const language = ConfigManager.multilingual;
	if (language <= 0) {
		return KRD_TextManager_param.apply(this, arguments);
	}
	const preData = JSON.parse(argParams[language - 1]);
	const data = JSON.parse(preData.params);
	return data[id] || KRD_TextManager_param.apply(this, arguments);
};

const KRD_TextManager_command = TextManager.command;
TextManager.command = function(id) {
	const language = ConfigManager.multilingual;
	if (language <= 0) {
		return KRD_TextManager_command.apply(this, arguments);
	}
	const preData = JSON.parse(argCommands[language - 1]);
	const data = JSON.parse(preData.commands);
	return data[id] || KRD_TextManager_command.apply(this, arguments);
};

const KRD_TextManager_message = TextManager.message;
TextManager.message = function(id) {
	const language = ConfigManager.multilingual;
	if (language <= 0) {
		return KRD_TextManager_message.apply(this, arguments);
	}
	const data = JSON.parse(argMessages[language - 1]);
	return data[id] || KRD_TextManager_message.apply(this, arguments);
};

Object.defineProperty(TextManager, "currencyUnit", {
	get: function() {
		const language = ConfigManager.multilingual;
		if (language <= 0) {
			return $dataSystem.currencyUnit;
		}
		const data = JSON.parse(argCurrencyUnit[language - 1]);
		return data.currencyUnit || $dataSystem.currencyUnit;
	},
	configurable: true
});

//--------------------------------------
// 取得：用語（追加関数）

TextManager.skillType = function(id) {
	const language = ConfigManager.multilingual;
	if (language <= 0) {
		return $dataSystem.skillTypes[id];
	}
	const preData = JSON.parse(argSkillTypes[language - 1]);
	const data = JSON.parse(preData.skillTypes);
	return data[id - 1] || $dataSystem.skillTypes[id];
};

Window_SkillType.prototype.makeCommandList = function() {
	if (this._actor) {
		const skillTypes = this._actor.skillTypes();
		for (const stypeId of skillTypes) {
			const name = TextManager.skillType(stypeId);
			this.addCommand(name, "skill", true, stypeId);
		}
	}
};

Window_ActorCommand.prototype.addSkillCommands = function() {
	const skillTypes = this._actor.skillTypes();
	for (const stypeId of skillTypes) {
		const name = TextManager.skillType(stypeId);
		this.addCommand(name, "skill", true, stypeId);
	}
};

TextManager.equipType = function(id) {
	const language = ConfigManager.multilingual;
	if (language <= 0) {
		return $dataSystem.equipTypes[id];
	}
	const preData = JSON.parse(argEquipTypes[language - 1]);
	const data = JSON.parse(preData.equipTypes);
	return data[id - 1] || $dataSystem.equipTypes[id];
};

Window_StatusBase.prototype.actorSlotName = function(actor, index) {
	const slots = actor.equipSlots();
	return TextManager.equipType(slots[index]);
};

TextManager.element = function(id) {
	const language = ConfigManager.multilingual;
	if (language <= 0) {
		return $dataSystem.elements[id];
	}
	const preData = JSON.parse(argElements[language - 1]);
	const data = JSON.parse(preData.elements);
	return data[id - 1] || $dataSystem.elements[id];
};

//--------------------------------------
// ゲームタイトル

const KRD_Scene_Title_drawGameTitle = Scene_Title.prototype.drawGameTitle;
Scene_Title.prototype.drawGameTitle = function() {
	const language = ConfigManager.multilingual;
	if (language <= 0) {
		KRD_Scene_Title_drawGameTitle.apply(this, arguments);
	} else {
		const x = 20;
		const y = Graphics.height / 4;
		const maxWidth = Graphics.width - x * 2;
		const data = JSON.parse(argGameTitle[language - 1]);
		const text = data.gameTitle || $dataSystem.gameTitle;
		const bitmap = this._gameTitleSprite.bitmap;
		bitmap.fontFace = $gameSystem.mainFontFace();
		bitmap.outlineColor = "black";
		bitmap.outlineWidth = 8;
		bitmap.fontSize = 72;
		bitmap.drawText(text, x, y, maxWidth, 48, "center");
	}
};

//--------------------------------------
// 制御文字追加

const KRD_Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
	switch (code) {
		case "LANG":
			this.processLanguage(textState);
			break;
		default:
			KRD_Window_Base_processEscapeCharacter.apply(this, arguments);
	}
};

Window_Base.prototype.getUseLanguage = function(text, language) {
	return getUseLanguage(text, language);
};

Window_Base.prototype.processLanguage = function(textState) {
	const language = ConfigManager.multilingual;
	textState.text = this.getUseLanguage(textState.text, language);
};

//--------------------------------------
// 外部ファイル読込：制御文字追加

const KRD_2_Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
	switch (code) {
		case "LANGF":
			this.changeText(code, textState);
			break;
		default:
			KRD_2_Window_Base_processEscapeCharacter.apply(this, arguments);
	}
};

Window_Base.prototype.changeText = function(code, textState) {
	const language = ConfigManager.multilingual;
	const start = textState.text.indexOf(`${code}[`);
	const end = textState.text.indexOf("]", start);
	const plus = `${code}[`.length;
	const name = textState.text.slice(start + plus, end);

	if (window[globalName] &&
		window[globalName][propertyName + language] &&
		window[globalName][propertyName + language][name]) {
			textState.text = window[globalName][propertyName + language][name];
			textState.text = this.convertEscapeCharacters(textState.text);
			textState.index = 0;
	} else {
		if (textState.text.match(`[${name}]`)) {
			textState.text = textState.text.slice(`[${name}]`.length);
		}
	}
};

//--------------------------------------
// プロパティをゲッターに差し替え

const KRD_Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
	KRD_Scene_Title_create.apply(this, arguments);
	$gameSystem.resetAllData();
};

Game_System.prototype.resetAllData = function() {
	$gameSystem.resetDataActors();
	$gameSystem.resetDataName($dataClasses);
	$gameSystem.resetDataName($dataEnemies);
	$gameSystem.resetDataSkills();
	$gameSystem.resetDatabase($dataItems);
	$gameSystem.resetDatabase($dataWeapons);
	$gameSystem.resetDatabase($dataArmors);
	$gameSystem.resetDataStates();
};

Game_System.prototype.resetDataActors = function() {
	$dataActors.forEach(data => {
		if (data) {
			data.meta.name_0 = data.meta.name_0 ? data.meta.name_0 : data.name;
			data.meta.nickname_0 = data.meta.nickname_0 ? data.meta.nickname_0 : data.nickname;
			data.meta.profile_0 = data.meta.profile_0 ? data.meta.profile_0 : data.profile;

			Object.defineProperties(data, {
				name: {
					get: function() {
						return getData(data).name;
					},
					configurable: true
				},
				nickname: {
					get: function() {
						return getData(data).nickname;
					},
					configurable: true
				},
				profile: {
					get: function() {
						return getData(data).profile;
					},
					configurable: true
				}
			});
		}
	});
};

Game_System.prototype.resetDataName = function(database) {
	database.forEach(data => {
		if (data) {
			data.meta.name_0 = data.meta.name_0 ? data.meta.name_0 : data.name;

			Object.defineProperties(data, {
				name: {
					get: function() {
						return getData(data).name;
					},
					configurable: true
				}
			});
		}
	});
};

Game_System.prototype.resetDataSkills = function() {
	$dataSkills.forEach(data => {
		if (data) {
			data.meta.name_0 = data.meta.name_0 ? data.meta.name_0 : data.name;
			data.meta.description_0 = data.meta.description_0 ? data.meta.description_0 : data.description;
			data.meta.message1_0 = data.meta.message1_0 ? data.meta.message1_0 : data.message1;
			data.meta.message2_0 = data.meta.message2_0 ? data.meta.message2_0 : data.message2;

			Object.defineProperties(data, {
				name: {
					get: function() {
						return getData(data).name;
					},
					configurable: true
				},
				description: {
					get: function() {
						return getData(data).description;
					},
					configurable: true
				},
				message1: {
					get: function() {
						return getData(data).message1;
					},
					configurable: true
				},
				message2: {
					get: function() {
						return getData(data).message2;
					},
					configurable: true
				}
			});
		}
	});
};

Game_System.prototype.resetDatabase = function(database) {
	database.forEach(data => {
		if (data) {
			data.meta.name_0 = data.meta.name_0 ? data.meta.name_0 : data.name;
			data.meta.description_0 = data.meta.description_0 ? data.meta.description_0 : data.description;

			Object.defineProperties(data, {
				name: {
					get: function() {
						return getData(data).name;
					},
					configurable: true
				},
				description: {
					get: function() {
						return getData(data).description;
					},
					configurable: true
				}
			});
		}
	});
};

Game_System.prototype.resetDataStates = function() {
	$dataStates.forEach(data => {
		if (data) {
			data.meta.name_0 = data.meta.name_0 ? data.meta.name_0 : data.name;
			data.meta.message1_0 = data.meta.message1_0 ? data.meta.message1_0 : data.message1;
			data.meta.message2_0 = data.meta.message2_0 ? data.meta.message2_0 : data.message2;
			data.meta.message3_0 = data.meta.message3_0 ? data.meta.message3_0 : data.message3;
			data.meta.message4_0 = data.meta.message4_0 ? data.meta.message4_0 : data.message4;

			Object.defineProperties(data, {
				name: {
					get: function() {
						return getData(data).name;
					},
					configurable: true
				},
				message1: {
					get: function() {
						return getData(data).message1;
					},
					configurable: true
				},
				message2: {
					get: function() {
						return getData(data).message2;
					},
					configurable: true
				},
				message3: {
					get: function() {
						return getData(data).message3;
					},
					configurable: true
				},
				message4: {
					get: function() {
						return getData(data).message4;
					},
					configurable: true
				}
			});
		}
	});
};

//--------------------------------------
})();

//--------------------------------------
// 共通関数

function getData(data) {
	return {
		get name() {
			return data.meta["name_" + ConfigManager.multilingual] || data.meta.name_0 || "";
		},
		get nickname() {
			return data.meta["nickname_" + ConfigManager.multilingual] || data.meta.nickname_0 || "";
		},
		get profile() {
			return data.meta["profile_" + ConfigManager.multilingual] || data.meta.profile_0 || "";
		},
		get description() {
			return data.meta["description_" + ConfigManager.multilingual] || data.meta.description_0 || "";
		},
		get message1() {
			return data.meta["message1_" + ConfigManager.multilingual] || data.meta.message1_0 || "";
		},
		get message2() {
			return data.meta["message2_" + ConfigManager.multilingual] || data.meta.message2_0 || "";
		},
		get message3() {
			return data.meta["message3_" + ConfigManager.multilingual] || data.meta.message3_0 || "";
		},
		get message4() {
			return data.meta["message4_" + ConfigManager.multilingual] || data.meta.message4_0 || "";
		},
		get iconIndex() {
			return data.iconIndex;
		},
		get id() {
			return data.id;
		}
	};
};

function getUseLanguage(text, language, escape) {
	escape = escape ? escape : "\x1b";
	const check = escape + "LANG[" + language + "]";
	const start = text.indexOf(check);
	if (language > 0 && start < 0) {
		// 再帰
		return getUseLanguage(text, 0, escape);
	}
	if (start < 0) {
		// 再帰の終端
		return text;
	}
	const end = text.indexOf(escape + "LANG[", start + check.length);
	// なぜか \x1b があると check.length だと長さがおかしい。
	const plus = escape === "\x1b" ? ("["+ language + "]").length : check.length;
	if (end >= 0) {
		return text.slice(start + plus, end);
	} else {
		return text.slice(start + plus);
	}
};
