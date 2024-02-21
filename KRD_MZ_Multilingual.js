/*:
 * @target MZ
 * @plugindesc 多言語プラグイン
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param FORCE_LANGUAGE
 * @text 強制言語指定
 * @desc 本プラグイン用データを残して特定の言語を使う場合の言語番号。言語切替する場合は -1 にしてください。
 * @type number
 * @default -1
 * @min -1
 * 
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
 * @param fileSection
 * @text 外部ファイル読込設定
 * @desc UniqueDataLoaderプラグインを使用してjsonファイルを用意してください。
 * 
 * @param globalName
 * @text グローバル変数名
 * @desc UniqueDataLoaderプラグインで指定したグローバル変数名です。
 * @default $dataUniques
 * @type string
 * @parent fileSection
 * 
 * @param USE_LANGF
 * @text 制御文字LANGF使用
 * @desc 制御文字LANGFを使用可能にし、文字列をjsonファイル（msg_99）から取得します。
 * @default false
 * @type boolean
 * @parent fileSection
 * 
 * @param useExternal
 * @text 外部DB取得機能
 * @desc DBの文字列をjsonファイル（db_99）から取得します。
 * @default false
 * @type boolean
 * @parent fileSection
 * 
 * @param USE_EX_WORD
 * @text 外部用語取得機能
 * @desc 用語の文字列をjsonファイル（word_99）から取得します。
 * @default false
 * @type boolean
 * @parent fileSection
 * 
 * @command setLanguage
 * @text 言語切替コマンド
 * @desc 指定された番号の言語に切り替えます。
 * 
 * @arg varLanguage
 * @text 言語番号変数
 * @desc この変数の値の言語番号に変更します。
 * 言語番号の値は 0 始まりです。
 * @default 0
 * @type variable
 * 
 * @command getLanguage
 * @text 現在言語取得コマンド
 * @desc 現在の言語番号を変数に入れます。
 * 
 * @arg varLanguage
 * @text 言語番号変数
 * @desc この変数に言語番号を入れます。
 * 言語番号の値は 0 始まりです。
 * @default 0
 * @type variable
 * 
 * @help
# KRD_MZ_Multilingual.js

多言語プラグイン

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 使い方

### 用語

- 言語番号 : 言語を指定する時に使う番号です。デフォルト言語は 0 です。

以下、99 の部分は言語番号です。
ケタが少ない場合に前ゼロは付けないでください。

### プラグインコマンド

- setLanguage : 言語切替コマンド 言語を変更します。
- getLanguage : 現在言語取得コマンド 言語番号を変数に取得します。

### データベース項目（メモ欄に記述）

<name_99:名前>
<nickname_99:二つ名>
<profile_99:プロフィール>
<desc_99:説明>
<message1_99:スキルのメッセージ1行目、ステートのメッセージ（アクター）>
<message2_99:スキルのメッセージ2行目、ステートのメッセージ（敵キャラ）>
<message3_99:ステートのメッセージ（継続）>
<message4_99:ステートのメッセージ（解除）>

### 用語系データ

プラグインパラメータに記述します。

### イベント

プラグインコマンド getLanguage で言語番号を取得し、
条件分岐コマンドで切り替えます。

または、制御文字 LANG & LANGEND および LANGF を使います。

### 制御文字

#### LANG & LANGEND

制御文字 \LANG[99] が使えます。
\LANG[99] から \LANGEND までを言語番号 99 の文字列として使用します。
\LANG[0] はデフォルト値として使用されます。

#### 【例】LANG & LANGEND 使い方

以下のように LANG と LANGEND をセットで設定します。

\LANG[0]はい\LANGEND\LANG[1]Yes\LANGEND\LANG[2]ええで\LANGEND

#### LANGF & LANGFEND

制御文字 \LANGF[データ名] が使えます。
公式プラグイン UniqueDataLoader を使用し、
文章を外部jsonファイルに記述できます。

言語番号ごとにjsonファイルを用意し、
UniqueDataLoader のプロパティ名は「msg_99」とします。

#### 【例】LANGF & LANGFEND 使い方

- 文章の表示コマンドなどで以下のように使用します。
- \LANGF[battle_1_01] の後ろは、
jsonファイルにデータがない場合に使用するデフォルト文字列です。
- デフォルト文字列の最後に /LANGFEND を書いてください。
- 言語番号を指定する必要はありません。

◆文章：\N[2], Actor1(1), ウィンドウ, 下
：　　：\LANGF[battle_1_01]テストです。/LANGFEND
◆文章：\N[2], Actor1(1), ウィンドウ, 下
：　　：\LANGF[battle_1_02]これがバトルです。/LANGFEND

#### 【例】LANGF用 jsonファイル

- 下記 { から } をjsonファイルに記述します。
- キー（battle_1_01 など）は自由です。
- 値に改行を使う場合は「\\n」と記述します。

```json
{
	"battle_1_01": "Test.",
	"battle_1_02": "This is battle.",
	"battle_1_03": "This is test.\\nThis is test2.",
	"message_3_01": "This is message.",
	"message_3_02": "This is test.\\nThis is test2."
}
```

### 外部DB取得機能

外部DB取得機能を有効(true) にすると、
jsonファイルからDB項目の値を取得できます。

公式プラグイン UniqueDataLoader を使用します。
言語番号ごとにjsonファイルを用意し、
UniqueDataLoader のプロパティ名は「db_99」とします。

#### 【例】外部DB取得機能 jsonファイル

- 全体 を { から } で囲みます。
- 下記 type をキーとした [ から ] を記述します。
- type : actor, class, item, skill, weapon, armor, enemy, state
- ひとつのデータは { から } で挟みます。

- 下記の中から必要なキーを設定します。
- id : アクターやアイテムなどの番号
- name : アクターやアイテムなどの名前
- nickname : 二つ名
- profile_1st : プロフィールの1行目
- profile_2nd : プロフィールの2行目
- description_1st : 説明の1行目
- description_2nd : 説明の2行目
- message1 : スキルのメッセージ1行目、ステートのメッセージ（アクター）
- message2 : スキルのメッセージ2行目、ステートのメッセージ（敵キャラ）
- message3 : ステートのメッセージ（継続）
- message4 : ステートのメッセージ（解除）

```json
{
	"actor": [
		{
			"id": 1,
			"name": "John Doe",
			"nickname": "Test Nickname",
			"profile_1st": "Test text 1-1.",
			"profile_2nd": "Test text 1-2."
		},
		{
			"id": 2,
			"name": "John Doe 2",
			"nickname": "Test Nickname 2",
			"profile_1st": "Test text 2-1.",
			"profile_2nd": "Test text 2-2."
		}
	],
	"class": [
		{
			"id": 1,
			"name": "Hero",
		}
	]
}
```

### 外部用語取得機能

外部用語取得機能を有効(true) にすると、
jsonファイルから用語系データの値を取得できます。

公式プラグイン UniqueDataLoader を使用します。
言語番号ごとにjsonファイルを用意し、
UniqueDataLoader のプロパティ名は「word_99」とします。

#### 【例】外部用語取得機能 jsonファイル

System.jsonをコピーして、
（テキストエディタ機能で整形後）、
不要な項目を削除すると簡単にjsonファイルを用意できます。

```json
{
	"currencyUnit": "G",
	"equipTypes": [
		"",
		"Weapon",
		"Shield",
		"Armor",
		"Accessory"
	],
	"gameTitle": "Test",
	"skillTypes": [
		"",
		"Magic",
		"Special"
	],
	"terms": {
		"basic": [
			"Level",
			"Lv"
		],
		"commands": [
			"Fight",
			"Escape",
			"Attack",
			"Guard"
		],
		"params": [
			"Max HP",
			"Max MP"
		],
		"messages": {
			"alwaysDash": "Always Dash",
			"commandRemember": "Command Remember"
		}
	}
}
```

## 更新履歴

- ver.0 (2021/01/26) 初版（希望者に期間限定配布）
- ver.0.0.1 (2021/03/17) 非公開版完成
- ver.1.0.0 (2021/06/02) 公開開始
- ver.1.1.0 (2021/06/04) 外部ファイル読込機能を追加
- ver.2.0.0 (2021/06/04) プロパティをゲッターに差し替え
- ver.2.0.1 (2021/06/18) コメント部分修正
- ver.2.1.0 (2021/08/25) 内部データ修正、useId 追加
- ver.2.1.1 (2021/09/28) KRD_MULTILINGUAL の宣言を即時関数外に移動
- ver.2.1.2 (2021/12/05) 使い方に追記
- ver.2.1.3 (2021/12/07) 使い方に追記
- ver.2.1.4 (2022/02/09) テストプレイ用の処理を追加
- ver.2.2.0 (2022/03/06) getUseLanguage を languageText に変更
- ver.2.2.1 (2022/03/07) LANG[0]をデフォルト値になるようにした
- ver.3.0.0 (2022/03/11) useId を廃止して useExternal 処理を追加
- ver.3.1.0 (2022/03/12) 全ての getData の外部データ対応した
- ver.3.1.1 (2022/03/15) 一部関数名を変更した
- ver.3.1.2 (2022/03/25) LANG の処理変更
- ver.3.1.3 (2022/06/04) F9時にエラー出たので修正
- ver.3.1.4 (2022/06/10) LANGENDがない場合の無限ループを防止
- ver.3.2.0 (2022/06/17) drawText に制御文字 LANG の処理を入れた
- ver.3.2.1 (2022/06/21) 制御文字 LANG を修正
- ver.3.2.2 (2022/07/15) 制御文字 LANGF を修正
- ver.3.2.3 (2023/02/13) ヘルプ修正
- ver.3.3.0 (2023/05/02) 制御文字 LANG を改行文字に対応
- ver.3.4.0 (2023/05/03) 制御文字 LANG を改行文字に対応
- ver.3.5.0 (2023/06/10) FORCE_LANGUAGE パラメータを追加
- ver.3.5.1 (2023/06/19) FORCE_LANGUAGE パラメータを修正
- ver.4.0.0 (2023/07/05) 制御文字 LANG の元関数を変更
- ver.4.1.0 (2023/07/06) 制御文字 LANGF の仕様変更
- ver.4.1.1 (2023/07/07) 数値 0 が空文字になるのを修正
- ver.4.1.2 (2023/07/09) 文字列 undefined 対応
- ver.4.1.3 (2023/09/23) Window_Baseに追加した制御文字処理を削除
- ver.4.1.4 (2023/11/03) デバッグモードスクロール対応
- ver.5.0.0 (2024/02/20) 外部ファイル機能を修正
- ver.5.1.0 (2024/02/21) 外部用語ファイルを System.json 準拠にした
- ver.5.1.1 (2024/02/22) ヘルプに追記

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

const KRD_MULTILINGUAL = {};

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const FORCE_LANGUAGE = Number(PARAM["FORCE_LANGUAGE"]) || 0;

const LANGUAGE = JSON.parse(PARAM["argLanguage"] || null);

let OPTION_TEXT = null;
if (PARAM["argOptionText"]) {
	OPTION_TEXT = JSON.parse(PARAM["argOptionText"] || null);
}

const GAME_TITLE = JSON.parse(PARAM["argGameTitle"] || null);
const CURRENCY_UNIT = JSON.parse(PARAM["argCurrencyUnit"] || null);
const ELEMENTS = JSON.parse(PARAM["argElements"] || null);
const SKILL_TYPES = JSON.parse(PARAM["argSkillTypes"] || null);
const EQUIP_TYPES = JSON.parse(PARAM["argEquipTypes"] || null);
const BASIC = JSON.parse(PARAM["argBasic"] || null);
const PARAMS = JSON.parse(PARAM["argParams"] || null);
const COMMANDS = JSON.parse(PARAM["argCommands"] || null);
const MESSAGES = JSON.parse(PARAM["argMessages"] || null);

const GLOBAL_NAME = PARAM["globalName"] || "$dataUniques";
const USE_LANGF = PARAM["USE_LANGF"] === "true";
const MSG_NAME = "msg_";

const USE_EXTERNAL = PARAM["useExternal"] === "true";
const EXTERNAL_NAME = "db_";

const USE_EX_WORD = PARAM["USE_EX_WORD"] === "true";
const EX_WORD_NAME = "word_";

const OPTION_DEFAULT = 0;
ConfigManager.multilingual = OPTION_DEFAULT;

const START_WORD = "LANG";
const END_WORD = "LANGEND";

const FILE_START_WORD = "LANGF";
const FILE_END_WORD = "LANGFEND";

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "setLanguage", args => {
	const varLanguage = Number(args.varLanguage);
	if (isNaN(varLanguage)) {
		return;
	}
	const value = $gameVariables.value(varLanguage);
	if (value < 0 || value >= LANGUAGE.length) {
		return;
	}
	ConfigManager.multilingual = value;
	ConfigManager.save();
});

PluginManager.registerCommand(PLUGIN_NAME, "getLanguage", args => {
	const varLanguage = Number(args.varLanguage);
	if (isNaN(varLanguage)) {
		return;
	}
	const value = KRD_MULTILINGUAL.multilingual();
	$gameVariables.setValue(varLanguage, value);
});

//--------------------------------------
// オプション画面

const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
	if (OPTION_TEXT && KRD_MULTILINGUAL.canConfig()) {
		return _Scene_Options_maxCommands.call(this, ...arguments) + 1;
	} else {
		return _Scene_Options_maxCommands.call(this, ...arguments);
	}
};

const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
	_Window_Options_addGeneralOptions.call(this, ...arguments);
	if (OPTION_TEXT && KRD_MULTILINGUAL.canConfig()) {
		this.addCommand(OPTION_TEXT[ConfigManager.multilingual], "multilingual");
	}
};

const _ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = _ConfigManager_makeData.call(this, ...arguments);
	config.multilingual = this.multilingual;
	return config;
};

const _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	_ConfigManager_applyData.call(this, ...arguments);
	this.multilingual = this.readIndex(config, "multilingual");
};

ConfigManager.readIndex = function(config, name) {
	if (name in config) {
		return Number(config[name]).clamp(0, LANGUAGE.length - 1);
	} else {
		return OPTION_DEFAULT;
	}
};

const _Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
	const symbol = this.commandSymbol(index);
	if (symbol !== "multilingual") {
		return _Window_Options_statusText.call(this, ...arguments);
	}
	const value = this.getConfigValue(symbol);
	return LANGUAGE[value];
};

const _Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol !== "multilingual") {
		_Window_Options_processOk.call(this, ...arguments);
		return;
	}
	this.changeIndex(symbol, this.getConfigValue(symbol) + 1);
};

const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol !== "multilingual") {
		_Window_Options_cursorRight.call(this, ...arguments);
		return;
	}
	const value = Math.min(this.getConfigValue(symbol) + 1, LANGUAGE.length - 1);
	this.changeIndex(symbol, value);
};

const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol !== "multilingual") {
		_Window_Options_cursorLeft.call(this, ...arguments);
		return;
	}
	const value = Math.max(this.getConfigValue(symbol) - 1, 0);
	this.changeIndex(symbol, value);
};

Window_Options.prototype.changeIndex = function(symbol, value) {
	if (value >= LANGUAGE.length) {
		value = 0;
	} else if (value < 0) {
		value = LANGUAGE.length - 1;
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

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	_Game_Actor_setup.call(this, ...arguments);
	this._initName = this._name;
	this._initNickname = this._nickname;
	this._initProfile = this._profile;
};

const _Game_Actor_name = Game_Actor.prototype.name;
Game_Actor.prototype.name = function() {
	if (this._name !== this._initName) {
		// イベントで変更した場合は変更を優先する。
		return _Game_Actor_name.call(this, ...arguments);
	}
	return KRD_MULTILINGUAL.getData($dataActors[this.actorId()]).name;
};

const _Game_Actor_nickname = Game_Actor.prototype.nickname;
Game_Actor.prototype.nickname = function() {
	if (this._nickname !== this._initNickname) {
		// イベントで変更した場合は変更を優先する。
		return _Game_Actor_nickname.call(this, ...arguments);
	}
	return KRD_MULTILINGUAL.getData($dataActors[this.actorId()]).nickname;
};

const _Game_Actor_profile = Game_Actor.prototype.profile;
Game_Actor.prototype.profile = function() {
	if (this._profile !== this._initProfile) {
		// イベントで変更した場合は変更を優先する。
		return _Game_Actor_profile.call(this, ...arguments);
	}
	return KRD_MULTILINGUAL.getData($dataActors[this.actorId()]).profile;
};

//--------------------------------------
// 取得：用語

const _TextManager_basic = TextManager.basic;
TextManager.basic = function(id) {
	const language = KRD_MULTILINGUAL.multilingual();
	if (language <= 0) {
		return _TextManager_basic.call(this, ...arguments);
	}

	const exWord = this.getExWordTerms("basic", id);
	if (exWord) {
		return exWord;
	}

	if (BASIC) {
		const preData = BASIC[language - 1] ? JSON.parse(BASIC[language - 1]) : null;
		if (preData && preData.basic) {
			const data = JSON.parse(preData.basic);
			return data[id] || _TextManager_basic.call(this, ...arguments);
		} else {
			return _TextManager_basic.call(this, ...arguments);
		}
	} else {
		return _TextManager_basic.call(this, ...arguments);
	}
};

const _TextManager_param = TextManager.param;
TextManager.param = function(id) {
	const language = KRD_MULTILINGUAL.multilingual();
	if (language <= 0) {
		return _TextManager_param.call(this, ...arguments);
	}

	const exWord = this.getExWordTerms("params", id);
	if (exWord) {
		return exWord;
	}

	if (PARAMS) {
		const preData = PARAMS[language - 1] ? JSON.parse(PARAMS[language - 1]) : null;
		if (preData && preData.params) {
			const data = JSON.parse(preData.params);
			return data[id] || _TextManager_param.call(this, ...arguments);
		} else {
			return _TextManager_param.call(this, ...arguments);
		}
	} else {
		return _TextManager_param.call(this, ...arguments);
	}
};

const _TextManager_command = TextManager.command;
TextManager.command = function(id) {
	const language = KRD_MULTILINGUAL.multilingual();
	if (language <= 0) {
		return _TextManager_command.call(this, ...arguments);
	}

	const exWord = this.getExWordTerms("commands", id);
	if (exWord) {
		return exWord;
	}

	if (COMMANDS) {
		const preData = COMMANDS[language - 1] ? JSON.parse(COMMANDS[language - 1]) : null;
		if (preData && preData.commands) {
			const data = JSON.parse(preData.commands);
			return data[id] || _TextManager_command.call(this, ...arguments);
		} else {
			return _TextManager_command.call(this, ...arguments);
		}
	} else {
		return _TextManager_command.call(this, ...arguments);
	}
};

const _TextManager_message = TextManager.message;
TextManager.message = function(id) {
	const language = KRD_MULTILINGUAL.multilingual();
	if (language <= 0) {
		return _TextManager_message.call(this, ...arguments);
	}

	const exWord = this.getExWordTerms("messages", id);
	if (exWord) {
		return exWord;
	}

	if (MESSAGES) {
		const data = MESSAGES[language - 1] ? JSON.parse(MESSAGES[language - 1]) : null;
		return data ? data[id] : _TextManager_message.call(this, ...arguments);
	} else {
		return _TextManager_message.call(this, ...arguments);
	}
};

Object.defineProperty(TextManager, "currencyUnit", {
	get: function() {
		const language = KRD_MULTILINGUAL.multilingual();
		if (language <= 0) {
			return $dataSystem.currencyUnit;
		}

		const exWord = this.getExWord("currencyUnit");
		if (exWord) {
			return exWord;
		}
	
		if (CURRENCY_UNIT) {
			const data = CURRENCY_UNIT[language - 1] ? JSON.parse(CURRENCY_UNIT[language - 1]) : null;
			return data && data.currencyUnit ? data.currencyUnit : $dataSystem.currencyUnit;
		} else {
			return $dataSystem.currencyUnit;
		}
	},
	configurable: true
});

//--------------------------------------
// 用語を外部ファイルから取得

TextManager.getExWord = function(type){
	if (USE_EX_WORD) {
		const exFileData = window[GLOBAL_NAME][EX_WORD_NAME + KRD_MULTILINGUAL.multilingual()];
		if (exFileData) {
			return exFileData[type];
		}
	}
	return null;
};

TextManager.getExWordTerms = function(type, id){
	if (USE_EX_WORD) {
		const exFileData = window[GLOBAL_NAME][EX_WORD_NAME + KRD_MULTILINGUAL.multilingual()];
		if (exFileData) {
			return exFileData["terms"][type][id];
		}
	}
	return null;
};

TextManager.getExWordList = function(type, id){
	if (USE_EX_WORD) {
		const exFileData = window[GLOBAL_NAME][EX_WORD_NAME + KRD_MULTILINGUAL.multilingual()];
		if (exFileData) {
			return exFileData[type][id];
		}
	}
	return null;
};

//--------------------------------------
// 取得：用語（追加関数）

TextManager.skillType = function(id) {
	const language = KRD_MULTILINGUAL.multilingual();
	if (language <= 0) {
		return $dataSystem.skillTypes[id];
	}

	const exWord = this.getExWordList("skillTypes", id);
	if (exWord) {
		return exWord;
	}

	if (SKILL_TYPES) {
		const preData = SKILL_TYPES[language - 1] ? JSON.parse(SKILL_TYPES[language - 1]) : null;
		if (preData && preData.skillTypes) {
			const data = JSON.parse(preData.skillTypes);
			return data[id - 1] || $dataSystem.skillTypes[id];
		} else {
			return $dataSystem.skillTypes[id];
		}
	} else {
		return $dataSystem.skillTypes[id];
	}
};

// 上書き
Window_SkillType.prototype.makeCommandList = function() {
	if (this._actor) {
		const skillTypes = this._actor.skillTypes();
		for (const stypeId of skillTypes) {
			const name = TextManager.skillType(stypeId);
			this.addCommand(name, "skill", true, stypeId);
		}
	}
};

// 上書き
Window_ActorCommand.prototype.addSkillCommands = function() {
	const skillTypes = this._actor.skillTypes();
	for (const stypeId of skillTypes) {
		const name = TextManager.skillType(stypeId);
		this.addCommand(name, "skill", true, stypeId);
	}
};

TextManager.equipType = function(id) {
	const language = KRD_MULTILINGUAL.multilingual();
	if (language <= 0) {
		return $dataSystem.equipTypes[id];
	}

	const exWord = this.getExWordList("equipTypes", id);
	if (exWord) {
		return exWord;
	}

	if (EQUIP_TYPES) {
		const preData = EQUIP_TYPES[language - 1] ? JSON.parse(EQUIP_TYPES[language - 1]) : null;
		if (preData && preData.equipTypes) {
			const data = JSON.parse(preData.equipTypes);
			return data[id - 1] || $dataSystem.equipTypes[id];
		} else {
			return $dataSystem.equipTypes[id];
		}
	} else {
		return $dataSystem.equipTypes[id];
	}
};

// 上書き
Window_StatusBase.prototype.actorSlotName = function(actor, index) {
	const slots = actor.equipSlots();
	return TextManager.equipType(slots[index]);
};

TextManager.element = function(id) {
	const language = KRD_MULTILINGUAL.multilingual();
	if (language <= 0) {
		return $dataSystem.elements[id];
	}

	const exWord = this.getExWordList("elements", id);
	if (exWord) {
		return exWord;
	}

	if (ELEMENTS) {
		const preData = ELEMENTS[language - 1] ? JSON.parse(ELEMENTS[language - 1]) : null;
		if (preData && preData.elements) {
			const data = JSON.parse(preData.elements);
			return data[id - 1] || $dataSystem.elements[id];
		} else {
			return $dataSystem.elements[id];
		}
	} else {
		return $dataSystem.elements[id];
	}
};

//--------------------------------------
// ゲームタイトル

const _Scene_Title_drawGameTitle = Scene_Title.prototype.drawGameTitle;
Scene_Title.prototype.drawGameTitle = function() {
	const language = KRD_MULTILINGUAL.multilingual();
	if (language <= 0) {
		_Scene_Title_drawGameTitle.call(this, ...arguments);
	} else {
		const text = this.getGameTitle();
		if (text) {
			const x = 20;
			const y = Graphics.height / 4;
			const maxWidth = Graphics.width - x * 2;
			const bitmap = this._gameTitleSprite.bitmap;
			bitmap.fontFace = $gameSystem.mainFontFace();
			bitmap.outlineColor = "black";
			bitmap.outlineWidth = 8;
			bitmap.fontSize = 72;
			bitmap.drawText(text, x, y, maxWidth, 48, "center");
		} else {
			_Scene_Title_drawGameTitle.call(this, ...arguments);
		}
	}
};

Scene_Title.prototype.getGameTitle = function() {
	const exData = TextManager.getExWord("gameTitle");
	if (exData) {
		return exData;
	} else {
		if (GAME_TITLE) {
			const language = KRD_MULTILINGUAL.multilingual();
			const data = GAME_TITLE[language - 1] ? JSON.parse(GAME_TITLE[language - 1]) : null;
			return data && data.gameTitle ? data.gameTitle : null;
		}
	}
	return null;
};

//--------------------------------------
// 制御文字 LANG

const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
	text = KRD_MULTILINGUAL.getFileText(text);
	text = KRD_MULTILINGUAL.getFileText(text, true);

	text = KRD_MULTILINGUAL.getLangText(text);
	text = KRD_MULTILINGUAL.getLangText(text, true);
	text = _Window_Base_convertEscapeCharacters.call(this, text);
	return text;
};

const _Window_Base_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
	text = KRD_MULTILINGUAL.getLangText(text);
	text = KRD_MULTILINGUAL.getLangText(text, true);
	_Window_Base_drawText.call(this, text, x, y, maxWidth, align);
};

const _Window_Command_commandName = Window_Command.prototype.commandName;
Window_Command.prototype.commandName = function(index) {
	const base = _Window_Command_commandName.call(this, ...arguments);

	if (base !== undefined) {
		const result = KRD_MULTILINGUAL.getLangText(base);
		const result2 = KRD_MULTILINGUAL.getLangText(result, true);
		return result2;
	} else {
		return "";
	}
};

// 上書き
// this._name を this.name() に修正
Game_Actor.prototype.displayLevelUp = function(newSkills) {
	const text = TextManager.levelUp.format(
		 this.name(),
		 TextManager.level,
		 this._level
	);
	$gameMessage.newPage();
	$gameMessage.add(text);
	for (const skill of newSkills) {
		 $gameMessage.add(TextManager.obtainSkill.format(skill.name));
	}
};

// 上書き
// this._name を this.name() に修正
Game_Actor.prototype.showAddedStates = function() {
	for (const state of this.result().addedStateObjects()) {
		 if (state.message1) {
			  $gameMessage.add(state.message1.format(this.name()));
		 }
	}
};

// 上書き
// this._name を this.name() に修正
Game_Actor.prototype.showRemovedStates = function() {
	for (const state of this.result().removedStateObjects()) {
		 if (state.message4) {
			  $gameMessage.add(state.message4.format(this.name()));
		 }
	}
};

//--------------------------------------
// プロパティをゲッターに差し替え

const _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_Scene_Boot_start.call(this, ...arguments);
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
			data.name_0 = data.name_0 ? data.name_0 : data.name;
			data.nickname_0 = data.nickname_0 ? data.nickname_0 : data.nickname;
			data.profile_0 = data.profile_0 ? data.profile_0 : data.profile;

			Object.defineProperties(data, {
				name: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).name;
					},
					configurable: true
				},
				nickname: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).nickname;
					},
					configurable: true
				},
				profile: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).profile;
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
			data.name_0 = data.name_0 ? data.name_0 : data.name;

			Object.defineProperties(data, {
				name: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).name;
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
			data.name_0 = data.name_0 ? data.name_0 : data.name;
			data.description_0 = data.description_0 ? data.description_0 : data.description;
			data.message1_0 = data.message1_0 ? data.message1_0 : data.message1;
			data.message2_0 = data.message2_0 ? data.message2_0 : data.message2;

			Object.defineProperties(data, {
				name: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).name;
					},
					configurable: true
				},
				description: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).description;
					},
					configurable: true
				},
				message1: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).message1;
					},
					configurable: true
				},
				message2: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).message2;
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
			data.name_0 = data.name_0 ? data.name_0 : data.name;
			data.description_0 = data.description_0 ? data.description_0 : data.description;

			Object.defineProperties(data, {
				name: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).name;
					},
					configurable: true
				},
				description: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).description;
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
			data.name_0 = data.name_0 ? data.name_0 : data.name;
			data.message1_0 = data.message1_0 ? data.message1_0 : data.message1;
			data.message2_0 = data.message2_0 ? data.message2_0 : data.message2;
			data.message3_0 = data.message3_0 ? data.message3_0 : data.message3;
			data.message4_0 = data.message4_0 ? data.message4_0 : data.message4;

			Object.defineProperties(data, {
				name: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).name;
					},
					configurable: true
				},
				message1: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).message1;
					},
					configurable: true
				},
				message2: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).message2;
					},
					configurable: true
				},
				message3: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).message3;
					},
					configurable: true
				},
				message4: {
					get: function() {
						return KRD_MULTILINGUAL.getData(data).message4;
					},
					configurable: true
				}
			});
		}
	});
};

//--------------------------------------
// テストプレイ用の処理

const _Test_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_Test_Scene_Boot_start.call(this, ...arguments);
	if (DataManager.isBattleTest() || DataManager.isEventTest()) {
		$gameSystem.resetDataActors();
	}
};

//--------------------------------------
// 共通関数 : 他のプラグインから使用可能

KRD_MULTILINGUAL.getData = function(data) {
	return {
		get name() {
			return KRD_MULTILINGUAL.getReturnData(data, "name");
		},
		get nickname() {
			return KRD_MULTILINGUAL.getReturnData(data, "nickname");
		},
		get profile() {
			return KRD_MULTILINGUAL.getReturnData(data, "profile");
		},
		get description() {
			return KRD_MULTILINGUAL.getReturnData(data, "description");
		},
		get message1() {
			return KRD_MULTILINGUAL.getReturnData(data, "message1");
		},
		get message2() {
			return KRD_MULTILINGUAL.getReturnData(data, "message2");
		},
		get message3() {
			return KRD_MULTILINGUAL.getReturnData(data, "message3");
		},
		get message4() {
			return KRD_MULTILINGUAL.getReturnData(data, "message4");
		},
		get iconIndex() {
			return data.iconIndex;
		},
		get id() {
			return data.id;
		}
	};
};

KRD_MULTILINGUAL.getReturnData = function(data, key) {
	if (KRD_MULTILINGUAL.multilingual() > 0) {
		if (USE_EXTERNAL) {
			const found = KRD_MULTILINGUAL.getExternalData(data, key);
			if (found) {
				return found;
			}
		}
		return KRD_MULTILINGUAL.getNoteData(data, key);
	} else {
		return data[key + "_0"] || "";
	}
};

KRD_MULTILINGUAL.getNoteData = function(data, key) {
	const noteData = data.meta[key + "_" + KRD_MULTILINGUAL.multilingual()];
	if (noteData) {
		return noteData;
	} else {
		return data[key + "_0"] || "";
	}
};

KRD_MULTILINGUAL.getExternalData = function(data, key) {
	const type = KRD_MULTILINGUAL.getType(data);
	if (!type) {
		return null;
	}

	const exFileData = window[GLOBAL_NAME][EXTERNAL_NAME + KRD_MULTILINGUAL.multilingual()];
	if (exFileData) {
		const exData = exFileData[type];
		if (exData) {
			const found = exData.find(ex => ex.id === data.id);
			if (found) {
				if (key === "profile" || key === "description") {
					const text1 = found[key + "_1st"] || "";
					const text2 = found[key + "_2nd"] || "";
					return text1 + "\n" + text2;
				} else {
					return found[key] || "";
				}
			} 
		}
	}
	return null;
};

KRD_MULTILINGUAL.getType = function(data) {
	if (data) {
		if (data.itypeId !== undefined) {
			return "item";
		} else if (data.wtypeId !== undefined) {
			return "weapon";
		} else if (data.atypeId !== undefined) {
			return "armor";
		} else if (data.stypeId !== undefined) {
			return "skill";
		} else if (data.initialLevel !== undefined) {
			return "actor";
		} else if (data.expParams !== undefined) {
			return "class"
		} else if (data.exp !== undefined) {
			return "enemy";
		} else if (data.stepsToRemove !== undefined) {
			return "state";
		}
	}
	return null;
};

//--------------------------------------

KRD_MULTILINGUAL.multilingual = function() {
	if (this.canConfig()) {
		return ConfigManager.multilingual;
	} else {
		return FORCE_LANGUAGE;
	}
};

KRD_MULTILINGUAL.canConfig = function() {
	return FORCE_LANGUAGE < 0;
};

//--------------------------------------
// 制御文字 LANG

// デバッグモード(F9)で undefined が入ることがあるので初期値を入れてる。
KRD_MULTILINGUAL.getLangText = function(baseText = "", flag) {
	if (!this.checkLangZero(baseText, flag)) {
		return baseText;
	}

	const language = this.multilingual();
	const matched = this.isLangText(baseText, flag, language);
	const result = this.getLangTextMain(baseText, flag, matched);
	return result;
};

KRD_MULTILINGUAL.checkLangZero = function(baseText, flag) {
	const escape = escapeText(flag);
	const langText = "0";
	const string = escape + START_WORD + "\\[" + langText + "\\]";
	const regex = new RegExp(string);
	const matched = baseText.toString().match(regex);
	return matched;
};

KRD_MULTILINGUAL.isLangText = function(baseText, flag, language) {
	const escape = escapeText(flag);
	const langText = language >= 0 ? language : "\\d+?";
	const string = escape + START_WORD + "\\[" + langText + "\\]";
	const regex = new RegExp(string, "gs");
	const matched = baseText.toString().match(regex);
	return matched;
};

KRD_MULTILINGUAL.getLangTextMain = function(baseText, flag, matched) {
	const escape = escapeText(flag);
	const langText = matched ? "(?<language>\\d+?)" : "0";
	const useFunction = matched ? languageReplacer : defaultReplacer;
	const string = escape + START_WORD + "\\[" + langText + "\\](?<text>.*?)" + escape + END_WORD;
	const regex = new RegExp(string, "gs");
	const result1 = baseText.toString().replace(regex, useFunction);
	const result2 = this.cutHeadReturn(result1);
	const result3 = this.cutEscapeLang(result2, flag);
	return result3;
};

function languageReplacer(match, p1, p2, offset, string, groups) {
	const language = KRD_MULTILINGUAL.multilingual();
	if (Number(groups.language) === language) {
		return groups.text;
	} else {
		return "";
	}
}

function defaultReplacer(match, p1, offset, string, groups) {
	return groups.text;
}

function escapeText(flag) {
	return flag ? "\\x1b" : "\\\\";
}

KRD_MULTILINGUAL.cutEscapeLang = function(baseText, flag) {
	const escape = escapeText(flag);
	const string = escape + START_WORD + "\\[(?<language>\\d+?)\\](?<text>.*?)" + escape + END_WORD;
	const regex = new RegExp(string, "gs");
	const result = baseText.toString().replace(regex, "");
	return result;
};

KRD_MULTILINGUAL.cutHeadReturn = function(text) {
	return text?.replace(/^\n\n*/, "");
};

//--------------------------------------
// 制御文字 LANGF

KRD_MULTILINGUAL.getFileText = function(baseText, flag) {
	if (USE_LANGF) {
		if (baseText) {
			const escape = escapeText(flag);
			const string = escape + FILE_START_WORD + "\\[(?<key>.+?)\\](?<default>.*?)" + escape + FILE_END_WORD;
			const regex = new RegExp(string, "gs");
			const result = baseText.toString().replace(regex, fileReplacer);
			return result;
		} else {
			return "";
		}
	} else {
		return baseText;
	}
};

function fileReplacer(match, p1, p2, offset, string, groups) {
	const language = KRD_MULTILINGUAL.multilingual();
	if (window[GLOBAL_NAME]
	&& window[GLOBAL_NAME][MSG_NAME + language]
	&& window[GLOBAL_NAME][MSG_NAME + language][groups.key]) {
		const result1 = window[GLOBAL_NAME][MSG_NAME + language][groups.key];
		const result2 = result1.toString().replace("\\n", "\n");
		return result2;
	}
	return groups.default;
}

//--------------------------------------
})();
