/*:
 * @target MZ
 * @plugindesc 情報コマンド (用語集と図鑑)
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @noteParam KRD_picture
 * 
 * @param infoCommand
 * @text 起動コマンド
 * 
 * @param nameInfo
 * @text 情報コマンド名
 * @desc タイトル画面とメニュー画面に表示するコマンド名です。デフォルトは「情報」です。
 * @default 情報
 * @type string
 * @parent infoCommand
 * 
 * @param titleCommand
 * @text タイトル画面表示
 * @desc タイトル画面に表示する：ON(true)、表示しない：OFF(false)
 * @default true
 * @type boolean
 * @parent infoCommand
 * 
 * @param menuCommand
 * @text メニュー画面表示
 * @desc メニュー画面に表示する：ON(true)、表示しない：OFF(false)
 * @default true
 * @type boolean
 * @parent infoCommand
 * 
 * @param infoSection
 * @text 情報項目
 * 
 * @param nameGameInfo
 * @text ゲーム情報コマンド名
 * @desc ゲーム情報の表示名です。デフォルトは「ゲーム情報」です。
 * @default ゲーム情報
 * @type string
 * @parent infoSection
 * 
 * @param dataGameInfo
 * @text ゲーム情報データ
 * @desc ゲーム情報のデータです。
 * @type struct<infoData>[]
 * @parent infoSection
 * 
 * @param nameHelp
 * @text ヘルプコマンド名
 * @desc ヘルプの表示名です。デフォルトは「ヘルプ」です。
 * @default ヘルプ
 * @type string
 * @parent infoSection
 * 
 * @param dataHelp
 * @text ヘルプデータ
 * @desc ヘルプのデータです。
 * @type struct<infoData>[]
 * @parent infoSection
 * 
 * @param nameGlossary
 * @text 用語コマンド名
 * @desc 用語の表示名です。デフォルトは「用語」です。
 * @default 用語
 * @type string
 * @parent infoSection
 * 
 * @param dataGlossary
 * @text 用語データ
 * @desc 用語のデータです。
 * @type struct<infoData>[]
 * @parent infoSection
 * 
 * @param nameQuest
 * @text クエストコマンド名
 * @desc クエストの表示名です。デフォルトは「クエスト」です。
 * @default クエスト
 * @type string
 * @parent infoSection
 * 
 * @param dataQuest
 * @text クエストデータ
 * @desc クエストのデータです。
 * @type struct<infoData>[]
 * @parent infoSection
 * 
 * @param databaseSection
 * @text DB項目
 * 
 * @param nameActors
 * @text アクターコマンド名
 * @desc アクターの表示名です。デフォルトは「アクター」です。
 * @default アクター
 * @type string
 * @parent databaseSection
 * 
 * @param autoActors
 * @text アクター自動登録
 * @desc アクターの自動登録する：ON(true)、しない：OFF(false)
 * @default true
 * @type boolean
 * @parent databaseSection
 * 
 * @param nameClasses
 * @text 職業コマンド名
 * @desc 職業の表示名です。デフォルトは「職業」です。
 * @default 職業
 * @type string
 * @parent databaseSection
 * 
 * @param autoClasses
 * @text 職業自動登録
 * @desc 職業の自動登録する：ON(true)、しない：OFF(false)
 * @default true
 * @type boolean
 * @parent databaseSection
 * 
 * @param nameSkills
 * @text スキルコマンド名
 * @desc スキルの表示名です。デフォルトは「スキル」です。
 * @default スキル
 * @type string
 * @parent databaseSection
 * 
 * @param autoSkills
 * @text スキル自動登録
 * @desc スキルの自動登録する：ON(true)、しない：OFF(false)
 * @default true
 * @type boolean
 * @parent databaseSection
 * 
 * @param AUTO_USE_SKILLS
 * @text スキル使用時自動登録
 * @desc スキルが使用された時に自動登録する：ON(true)、しない：OFF(false)
 * @default true
 * @type boolean
 * @parent databaseSection
 * 
 * @param nameItems
 * @text アイテムコマンド名
 * @desc アイテムの表示名です。デフォルトは「アイテム」です。
 * @default アイテム
 * @type string
 * @parent databaseSection
 * 
 * @param autoItems
 * @text アイテム自動登録
 * @desc アイテムの自動登録する：ON(true)、しない：OFF(false)
 * @default true
 * @type boolean
 * @parent databaseSection
 * 
 * @param nameWeapons
 * @text 武器コマンド名
 * @desc 武器の表示名です。デフォルトは「武器」です。
 * @default 武器
 * @type string
 * @parent databaseSection
 * 
 * @param autoWeapons
 * @text 武器自動登録
 * @desc 武器の自動登録する：ON(true)、しない：OFF(false)
 * @default true
 * @type boolean
 * @parent databaseSection
 * 
 * @param nameArmors
 * @text 防具コマンド名
 * @desc 防具の表示名です。デフォルトは「防具」です。
 * @default 防具
 * @type string
 * @parent databaseSection
 * 
 * @param autoArmors
 * @text 防具自動登録
 * @desc 防具の自動登録する：ON(true)、しない：OFF(false)
 * @default true
 * @type boolean
 * @parent databaseSection
 * 
 * @param nameEnemies
 * @text 敵キャラコマンド名
 * @desc 敵キャラの表示名です。デフォルトは「敵キャラ」です。
 * @default 敵キャラ
 * @type string
 * @parent databaseSection
 * 
 * @param autoEnemies
 * @text 敵キャラ自動登録
 * @desc 敵キャラの自動登録する：ON(true)、しない：OFF(false)
 * @default true
 * @type boolean
 * @parent databaseSection
 * 
 * @param enemySection
 * @text 敵キャラ追加項目
 * 
 * @param paramsCols
 * @text 敵キャラ能力値２列表示
 * @desc 能力値表示を２列にする：ON(true)、１列にする：OFF(false)
 * @default true
 * @type boolean
 * @parent enemySection
 * 
 * @param enemyParams
 * @text 敵キャラ能力値
 * @desc 表示する能力値の番号をカンマ区切りで指定します。
 * @default 0, 1, 2, 3, 4, 5, 6, 7
 * @type string
 * @parent enemySection
 * 
 * @param enemyElements
 * @text 敵キャラ属性有効度
 * @desc 表示する属性の番号をカンマ区切りで指定します。
 * @default 5, 6, 7
 * @type string
 * @parent enemySection
 * 
 * @param ENEMY_HIT_RATE
 * @text 敵キャラ命中率
 * @desc (2列表示のみ) 敵キャラの命中率を表示する: ture ／ 表示しない: false
 * @default false
 * @type boolean
 * @parent enemySection
 * 
 * @param ENEMY_EVASION_RATE
 * @text 敵キャラ回避率
 * @desc (2列表示のみ) 敵キャラの回避率を表示する: ture ／ 表示しない: false
 * @default false
 * @type boolean
 * @parent enemySection
 * 
 * @param layoutSection
 * @text レイアウトなど
 * 
 * @param titleRows
 * @text タイトルコマンド数
 * @desc 情報コマンドを含むタイトルコマンドの数です。
 * @default 4
 * @type number
 * @parent layoutSection
 * 
 * @param titleHeight
 * @text タイトルWindow高さ（割合）
 * @desc タイトルWindowの高さの割合（パーセント）です。デフォルトは 400（タイトルコマンド数×100）です。
 * @default 400
 * @type number
 * @parent layoutSection
 * 
 * @param commandRight
 * @text コマンド右側表示
 * @desc コマンド枠を右側に表示します。デフォルトは ON(true) です。
 * @default true
 * @type boolean
 * @parent layoutSection
 * 
 * @param commandHorizon
 * @text コマンド上部表示
 * @desc コマンド枠を上部に横長に表示します。デフォルトは OFF(false) です。
 * @default false
 * @type boolean
 * @parent layoutSection
 * 
 * @param lineHeight
 * @text 行の高さ
 * @desc 説明文の行の高さです。デフォルトは 36 です。
 * @default 36
 * @type number
 * @parent layoutSection
 * 
 * @param descFontSize
 * @text 説明文フォントサイズ
 * @desc 説明文のフォントサイズです。0 の場合システム値 -2 となります。
 * @default 0
 * @type number
 * @parent layoutSection
 * 
 * @param BETWEEM_TITLE_TO_TEXT
 * @text タイトルと本文の間
 * @desc タイトルと本文の間に空白を作ります。
 * @default 26
 * @type number
 * @parent layoutSection
 * 
 * @param textOver
 * @text 画像に説明文をかぶせる
 * @desc 画像に説明文をかぶせます。デフォルトは OFF(false) です。敵キャラ画像が対象です。
 * @default false
 * @type boolean
 * @parent layoutSection
 * 
 * @param commandRows
 * @text コマンド行数
 * @desc 選択肢の行数です。デフォルトの 0 の場合「コマンド上部表示」により値が変わります。
 * @default 0
 * @type number
 * @parent layoutSection
 * 
 * @param commandCols
 * @text コマンド列数
 * @desc 選択肢の列数です。デフォルトの 0 の場合「コマンド上部表示」により値が変わります。
 * @default 0
 * @type number
 * @parent layoutSection
 * 
 * @param subCommandCols
 * @text サブコマンド列数
 * @desc 選択肢の列数です。デフォルトの 0 の場合「コマンド上部表示」により値が変わります。
 * @default 0
 * @type number
 * @parent layoutSection
 * 
 * @param useJson
 * @text 外部jsonファイル使用
 * 
 * @param globalName
 * @text グローバル変数名
 * @desc UniqueDataLoaderプラグインで指定したグローバル変数名です。
 * @default $dataUniques
 * @type string
 * @parent useJson
 * 
 * @param jsonName
 * @text 情報項目 jsonプロパティ名
 * @desc UniqueDataLoaderプラグインで指定したプロパティ名です。
 * @default info
 * @type string
 * @parent useJson
 * 
 * @param DB_JSON_NAME
 * @text DB項目 jsonプロパティ名
 * @desc DB用として、UniqueDataLoaderプラグインで指定したプロパティ名です。後ろに言語番号が付与されます。
 * @default db_
 * @type string
 * @parent useJson
 * 
 * @command setShowListNew
 * @text 表示初期化
 * @desc 指定されたデータベースの表示を初期状態に戻します。
 * 
 * @arg name
 * @text データベース名
 * @desc 初期化するデータベース名を指定します。
 * @default 
 * @type select
 * @option gameInfo
 * @option help
 * @option glossary
 * @option quest
 * @option actors
 * @option classes
 * @option skills
 * @option items
 * @option weapons
 * @option armors
 * @option enemies
 * 
 * @command setShowListAll
 * @text 一括表示変更
 * @desc 指定されたデータベースの表示有無を一括変更します。
 * 
 * @arg name
 * @text データベース名
 * @desc 初期化するデータベース名を指定します。
 * @default 
 * @type select
 * @option gameInfo
 * @option help
 * @option glossary
 * @option quest
 * @option actors
 * @option classes
 * @option skills
 * @option items
 * @option weapons
 * @option armors
 * @option enemies
 * 
 * @arg flag
 * @text 表示
 * @desc 表示する：true、表示しない：false を設定します。
 * @default false
 * @type boolean
 * 
 * @command setShowListOne
 * @text １件表示変更
 * @desc 指定されたデータベースの項目１つの表示有無を変更します。
 * 
 * @arg name
 * @text データベース名
 * @desc 初期化するデータベース名を指定します。
 * @default 
 * @type select
 * @option gameInfo
 * @option help
 * @option glossary
 * @option quest
 * @option actors
 * @option classes
 * @option skills
 * @option items
 * @option weapons
 * @option armors
 * @option enemies
 * 
 * @arg flag
 * @text 表示
 * @desc 表示する：true、表示しない：false を設定します。
 * @default false
 * @type boolean
 * 
 * @arg index
 * @text 対象番号
 * @desc 対象の番号を指定します。
 * @default 0
 * @type number
 * 
 * @command startSceneInfo
 * @text 情報シーン開始
 * @desc イベントコマンド内で情報シーンを開始します。
 * 
 * @help
# KRD_MZ_Info.js

情報コマンド (用語集と図鑑)

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## メモ欄タグ (meta)

- <KRD_notData> 非表示
- <KRD_showData> 必ず表示
- <KRD_picture:画像ファイル名> 画像を表示
- <KRD_text:追加テキスト> 追加テキストを表示
- <KRD_text_9:Message> 追加テキストを表示(9は言語番号)

- <KRD_alphabet> アルファベットモードにする。
- <KRD_fontSize:フォントサイズ> アルファベットモード時のフォントサイズ。
- <KRD_lineHeight:行の高さ> アルファベットモード時の行の高さ。

## 更新履歴

- ver.0.0.1 (2021/05/24) 非公開版完成
- ver.0.1.0 (2021/09/17) 修正版完成
- ver.0.1.1 (2021/09/27) 内部的に字下げ処理を追加
- ver.1.0.0 (2021/09/27) 公開
- ver.1.1.0 (2021/11/19) 実績をクエストに変更
- ver.1.2.0 (2022/01/02) リファクタリング
- ver.1.2.1 (2022/01/04) 説明文フォントサイズ設定追加
- ver.1.3.0 (2022/03/15) コマンド名の制御文字対応
- ver.1.3.1 (2022/04/02) 説明文フォントサイズ既定値変更
- ver.1.4.0 (2022/04/24) プロフィールの改行対応
- ver.1.5.0 (2022/06/10) 敵キャラ能力値の取得方法を変更
- ver.1.6.0 (2022/06/15) 敵キャラ画像に色調を反映
- ver.1.6.1 (2022/06/17) 多言語プラグインでやるべき処理をそちらに移動
- ver.1.7.0 (2022/06/29) 敵キャラ画像の内部処理を修正
- ver.1.8.0 (2022/07/19) 外部jsonファイル使用を追加
- ver.1.9.0 (2022/08/18) 敵キャラ表示データを追加
- ver.1.10.0 (2023/02/28) 制御文字なし text を width に対応
- ver.1.11.0 (2023/04/04) USE_JSON フラグを追加
- ver.1.12.0 (2023/06/10) 多言語プラグイン処理を修正
- ver.1.13.0 (2023/06/16) 多言語プラグイン処理を修正
- ver.1.14.0 (2023/06/19) タイトルと本文の間パラメータを追加
- ver.1.14.1 (2023/06/23) 表示のフォントサイズを修正
- ver.1.14.2 (2023/07/07) ドロップアイテム名の変換対応
- ver.1.15.0 (2023/07/18) 一部 Window_Selectable の継承に変更
- ver.1.16.0 (2023/08/19) 敵キャラの命中率と回避率を非表示
- ver.1.17.0 (2023/08/20) 画像を枠内に表示
- ver.1.18.0 (2023/09/07) 敵キャラの命中率と回避率のパラメータ追加
- ver.1.19.0 (2023/10/31) 敵キャラで長い能力値名に対応
- ver.1.20.0 (2023/11/12) processSkillDesc を追加
- ver.1.21.0 (2024/02/22) サブコマンド部の表示修正
- ver.2.0.0 (2024/02/22) DB用外部ファイル処理を追加
- ver.2.1.0 (2024/02/26) DB用外部ファイルのキーpicture対応
- ver.2.2.0 (2024/03/05) スキル自動登録を修正

 * 
 * 
 */

/*~struct~infoData:
 * 
 * @param name
 * @text データ名
 * @desc データ１件の表示名です。
 * @default 
 * @type string
 * 
 * @param description
 * @text 説明
 * @desc データ１件の説明文です。
 * @default 
 * @type multiline_string
 * 
 * @param picture
 * @text 画像ファイル名
 * @desc 画像ファイルを表示する場合に指定します。
 * @default 
 * @type file
 * @dir img/pictures
 * 
 * @param showData
 * @text 初期表示
 * @desc 初期状態で表示する：true、表示しない：false
 * @default true
 * @type boolean
 * 
 * @param alphabet
 * @text 横幅調整
 * @desc 横幅調整する：true、横幅調整しない：false
 * @default false
 * @type boolean
 * 
 * @param fontSize
 * @text フォントサイズ
 * @desc 横幅調整する時の表示フォントサイズ。
 * @default 0
 * @type number
 * @parent alphabet
 * 
 * @param lineHeight
 * @text 行の高さ
 * @desc 横幅調整する時の1行の高さ。
 * @default 0
 * @type number
 * @parent alphabet
 * 
 */

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const PORTRAIT_PLUGIN = typeof KRD_MZ_UI_Portrait !== "undefined" ? KRD_MZ_UI_Portrait : false;
const RUBY_PLUGIN = typeof KRD_RUBY !== "undefined";

// 外部ファイル
const GLOBAL_NAME = PARAM["globalName"];
const INFO_JSON_NAME = PARAM["jsonName"];
const DB_JSON_NAME = PARAM["DB_JSON_NAME"] || null;

const TAG_TEXT = "text";
const TAG_PICTURE = "picture";
const TAG_SHOW_DATA = "showData";
const TAG_NOT_DATA = "notData";

// 内部データ
const INFO_NAME = PARAM["nameInfo"] || "";

const GAME_INFO = PARAM["nameGameInfo"];
const HELP = PARAM["nameHelp"];
const GLOSSARY = PARAM["nameGlossary"];
const QUEST = PARAM["nameQuest"];
const ACTORS = PARAM["nameActors"];
const CLASSES = PARAM["nameClasses"];
const SKILLS = PARAM["nameSkills"];
const ITEMS = PARAM["nameItems"];
const WEAPONS = PARAM["nameWeapons"];
const ARMORS = PARAM["nameArmors"];
const ENEMIES = PARAM["nameEnemies"];

const AUTO_ACTORS = PARAM["autoActors"] === "true";
const AUTO_CLASSES = PARAM["autoClasses"] === "true";
const AUTO_SKILLS = PARAM["autoSkills"] === "true";
const AUTO_ITEMS = PARAM["autoItems"] === "true";
const AUTO_WEAPONS = PARAM["autoWeapons"] === "true";
const AUTO_ARMORS = PARAM["autoArmors"] === "true";
const AUTO_ENEMIES = PARAM["autoEnemies"] === "true";

const AUTO_USE_SKILLS = PARAM["AUTO_USE_SKILLS"] === "true";

const INFO_SYMBOL = "information";
const CMD_SYMBOL = "command";

const GAME_INFO_BASE = {
	subSymbol: "gameInfo",
	name: GAME_INFO,
	data: null,
};

const HELP_BASE = {
	subSymbol: "help",
	name: HELP,
	data: null,
};

const GLOSSARY_BASE = {
	subSymbol: "glossary",
	name: GLOSSARY,
	data: null,
};

const QUEST_BASE = {
	subSymbol: "quest",
	name: QUEST,
	data: null,
};

const TITLE_COMMAND = PARAM["titleCommand"] === "true";
const MENU_COMMAND = PARAM["menuCommand"] === "true";

const TITLE_ROWS = Number(PARAM["titleRows"]) || 4;
const TITLE_HEIGTH = (Number(PARAM["titleHeight"]) || 400) / 100;
const LINE_HEIGHT = Number(PARAM["lineHeight"]);
const TEXT_OVER = PARAM["textOver"] === "true";

const CMD_RIGHT = PARAM["commandRight"] === "true";

const CMD_HORIZON = PARAM["commandHorizon"] === "true";
const CMD_ROWS_BASE = CMD_HORIZON ? 3 : 11;
const CMD_COLS_BASE = CMD_HORIZON ? 4 : 1;
const CMD_ROWS = PORTRAIT_PLUGIN ? 11 : (Number(PARAM["commandRows"]) || CMD_ROWS_BASE);
const CMD_COLS = Number(PARAM["commandCols"]) || CMD_COLS_BASE;
const CMD_HEIGHT = CMD_ROWS * 2;
const SUB_CMD_COLS_BASE = CMD_HORIZON ? 3 : 1;
const SUB_CMD_COLS = Number(PARAM["subCommandCols"]) || SUB_CMD_COLS_BASE;

const PARAMS_COLS = PARAM["paramsCols"] === "true";
const ENEMY_PARAMS = JSON.parse(`[${PARAM["enemyParams"]}]`) || [];

const ENEMY_HIT_RATE = PARAM["ENEMY_HIT_RATE"] === "true";
const ENEMY_EVASION_RATE = PARAM["ENEMY_EVASION_RATE"] === "true";
const ENEMY_ELEMENTS = JSON.parse(`[${PARAM["enemyElements"]}]`) || [];

const DOWN_LETTER = 8;
const DESC_FONT_SIZE = Number(PARAM["descFontSize"]) || 0;

const BETWEEM_TITLE_TO_TEXT = Number(PARAM["BETWEEM_TITLE_TO_TEXT"]) || 0;

const KRD_INFO = {};
KRD_INFO.command = [];

const _Window_Base_drawText = Window_Base.prototype.drawText;

//--------------------------------------
// プラグインコマンド

PluginManager.registerCommand(PLUGIN_NAME, "setShowListNew", args => {
	$gameSystem.setShowListNew(args.name);
});

PluginManager.registerCommand(PLUGIN_NAME, "setShowListAll", args => {
	$gameSystem.setShowListAll(args.name, args.flag === "true");
});

PluginManager.registerCommand(PLUGIN_NAME, "setShowListOne", args => {
	$gameSystem.setShowListOne(args.name, args.flag === "true", Number(args.index));
});

PluginManager.registerCommand(PLUGIN_NAME, "startSceneInfo", () => {
	SceneManager.push(Scene_Info);
});

//--------------------------------------
// タイトルコマンド

const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
	_Window_TitleCommand_makeCommandList.call(this, ...arguments);
	if (TITLE_COMMAND) {
		const commandName = INFO_NAME;
		const name = this.convertEscapeCharacters(commandName) || "";
		this.addCommand(name, INFO_SYMBOL);
	}
};

const _Window_TitleCommand_itemHeight = Window_TitleCommand.prototype.itemHeight;
Window_TitleCommand.prototype.itemHeight = function() {
	if (TITLE_COMMAND) {
		return Math.floor(this.innerHeight / TITLE_ROWS);
	} else {
		return _Window_TitleCommand_itemHeight.call(this, ...arguments);
	}
};

const _Scene_Title_commandWindowRect = Scene_Title.prototype.commandWindowRect;
Scene_Title.prototype.commandWindowRect = function() {
	if (TITLE_COMMAND) {
		const plusY = PORTRAIT_PLUGIN ? -50 : -40;

		const offsetX = $dataSystem.titleCommandWindow.offsetX;
		const offsetY = $dataSystem.titleCommandWindow.offsetY;
		const ww = this.mainCommandWidth();
		const wh = this.calcWindowHeight(TITLE_HEIGTH, true);
		const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
		const wy = Graphics.boxHeight - wh - 96 + offsetY + plusY;
		return new Rectangle(wx, wy, ww, wh);
	} else {
		return _Scene_Title_commandWindowRect.call(this, ...arguments);
	}
};

//--------------------------------------
// タイトル画面シーン

const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	_Scene_Title_createCommandWindow.call(this, ...arguments);
	this._commandWindow.setHandler(INFO_SYMBOL, this.infoOptions.bind(this));
};

Scene_Title.prototype.infoOptions = function() {
	this._commandWindow.close();
	SceneManager.push(Scene_Info);
};

//--------------------------------------
// メニューコマンド

const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_Window_MenuCommand_addOriginalCommands.call(this, ...arguments);
	if (MENU_COMMAND) {
		const commandName = INFO_NAME;
		const name = this.convertEscapeCharacters(commandName) || "";
		this.addCommand(name, INFO_SYMBOL);
	}
};

//--------------------------------------
// メニュー画面シーン

const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_Scene_Menu_createCommandWindow.call(this, ...arguments);
	this._commandWindow.setHandler(INFO_SYMBOL, this.commandInfo.bind(this));
};

Scene_Menu.prototype.commandInfo = function() {
	SceneManager.push(Scene_Info);
};

//--------------------------------------
// Game_System：セーブデータに含める

const _Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_Game_System_initialize.call(this, ...arguments);
	this._showList = this.makeShowList();
};

const _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
Game_System.prototype.onAfterLoad = function() {
	_Game_System_onAfterLoad.call(this, ...arguments);
	this._showList = this.makeShowList();
};

Game_System.prototype.makeShowList = function() {
	if (this.useJson()) {
		this.makeInfoDataFromJson();
		return this.makeShowListPluginParam();
	} else {
		this.makeInfoDataFromParam();
		return this.makeShowListPluginParam();
	}
};

Game_System.prototype.makeShowListPluginParam = function() {
	this._showList = this._showList ? this._showList : {};
	return {
		gameInfo: this.makeShowListDetail(GAME_INFO_BASE.data, this._showList.gameInfo),
		help: this.makeShowListDetail(HELP_BASE.data, this._showList.help),
		glossary: this.makeShowListDetail(GLOSSARY_BASE.data, this._showList.glossary),
		quest: this.makeShowListDetail(QUEST_BASE.data, this._showList.quest),
		actors: this.makeShowListDetailDb($dataActors, this._showList.actors, "actor"),
		classes: this.makeShowListDetailDb($dataClasses, this._showList.classes, "class"),
		skills: this.makeShowListDetailDb($dataSkills, this._showList.skills, "skill"),
		items: this.makeShowListDetailDb($dataItems, this._showList.items, "item"),
		weapons: this.makeShowListDetailDb($dataWeapons, this._showList.weapons, "weapon"),
		armors: this.makeShowListDetailDb($dataArmors, this._showList.armors, "armor"),
		enemies: this.makeShowListDetailDb($dataEnemies, this._showList.enemies, "enemy"),
	};
};

Game_System.prototype.makeInfoDataFromParam = function() {
	GAME_INFO_BASE.data = parseJson2Data(PARAM["dataGameInfo"] || "[]");
	HELP_BASE.data = parseJson2Data(PARAM["dataHelp"] || "[]");
	GLOSSARY_BASE.data = parseJson2Data(PARAM["dataGlossary"] || "[]");
	QUEST_BASE.data = parseJson2Data(PARAM["dataQuest"] || "[]");
};

Game_System.prototype.makeInfoDataFromJson = function() {
	GAME_INFO_BASE.data = this.getJsonData("gameInfo");
	HELP_BASE.data = this.getJsonData("help");
	GLOSSARY_BASE.data = this.getJsonData("glossary");
	QUEST_BASE.data = this.getJsonData("quest");
};

Game_System.prototype.makeShowListDetail = function(database, showList) {
	if (showList) {
		return this.addShowList(database, showList);
	} else {
		return this.newShowList(database);
	}
};

Game_System.prototype.makeShowListDetailDb = function(database, showList, key) {
	const baseResult = this.makeShowListDetail(database, showList);

	if (DB_JSON_NAME) {
		const dbJson = this.getDbJsonData(key);
		if (dbJson) {
			return this.mergeShowList(baseResult, dbJson);
		}
	}

	return baseResult;
};

Game_System.prototype.mergeShowList = function(list, objList) {
	if (list && objList) {
		for (let i = 0; i < objList.length; i++) {
			if (objList[i].showData === true) {
				list[objList[i].id] = true;
			}
		}
	}
	return list;
};

Game_System.prototype.addShowList = function(database, showList) {
	let active = showList;
	for (let i = showList.length; i < database.length; i++) {
		this.addData(active, database[i]);
	}
	return active;
};

Game_System.prototype.addData = function(active, data) {
	if (this.checkShowData(data)) {
		active.push(true);
	} else {
		active.push(false);
	}
};

Game_System.prototype.newShowList = function(database) {
	return database.map(data => this.checkShowData(data));
};

Game_System.prototype.checkShowData = function(data) {
	const case1 = data && data.meta && data.meta.KRD_showData;
	const case2 = data && data.showData === "true";
	const case3 = data && data[TAG_SHOW_DATA];
	return case1 || case2 || case3;
};

//--------------------------------------
// Game_System：プラグインコマンド用

Game_System.prototype.setShowListNew = function(name) {
	const database = this.getDbByName(name);
	if (database) {
		this._showList[name] = this.newShowList(database);
	}
};

Game_System.prototype.setShowListAll = function(name, flag) {
	const database = this.getDbByName(name);
	if (database) {
		this._showList[name] = database.map(() => !!flag);
	}
};

Game_System.prototype.setShowListOne = function(name, flag, index) {
	const database = this.getDbByName(name);
	if (database && index < this._showList[name].length) {
		this._showList[name][index] = !!flag;
	}
};

Game_System.prototype.getDbByName = function(name) {
	switch (name) {
		case "gameInfo":
			return GAME_INFO_BASE.data;
		case "help":
			return HELP_BASE.data;
		case "glossary":
			return GLOSSARY_BASE.data;
		case "quest":
			return QUEST_BASE.data;
		case "actors":
			return $dataActors;
		case "classes":
			return $dataClasses;
		case "skills":
			return $dataSkills;
		case "items":
			return $dataItems;
		case "weapons":
			return $dataWeapons;
		case "armors":
			return $dataArmors;
		case "enemies":
			return $dataEnemies;
		default:
			return null;
	}
};

//--------------------------------------
// JSON データ使用

Game_System.prototype.useJson = function() {
	return INFO_JSON_NAME;
};

Game_System.prototype.getJsonData = function(dataName) {
	return window[GLOBAL_NAME][INFO_JSON_NAME][dataName];
};

Game_System.prototype.getDbJsonData = function(key) {
	const exBaseData = window[GLOBAL_NAME];
	if (exBaseData) {
		const language = multilingual();
		const exData = exBaseData[DB_JSON_NAME + language];
		if (exData) {
			return exData[key];
		}
	}
	return null;
};

Game_System.prototype.getDbJsonOneData = function(baseKey, id, key) {
	if (DB_JSON_NAME) {
		const dataList = this.getDbJsonData(baseKey);
		if (dataList) {
			const found = dataList.find(data => data.id === id);
			if (found) {
				return found[key];
			}
		}
		return null;
	}
};

//--------------------------------------
// 自動登録

const _Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	_Game_Party_gainItem.call(this, ...arguments);
	if (AUTO_ITEMS) {
		if (item && item.itypeId > 0) {
			$gameSystem.setShowListOne("items", true, item.id);
		}
	}
	if (AUTO_WEAPONS) {
		if (item && item.wtypeId > 0) {
			$gameSystem.setShowListOne("weapons", true, item.id);
		}
	}
	if (AUTO_ARMORS) {
		if (item && item.atypeId > 0) {
			$gameSystem.setShowListOne("armors", true, item.id);
		}
	}
};

const _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
	_Game_Actor_learnSkill.call(this, ...arguments);
	if (AUTO_SKILLS && this.isMember()) {
		$gameSystem.setShowListOne("skills", true, skillId);
	}
};

Game_Actor.prototype.isMember = function() {
	return $gameParty.members().includes(this);
};

const _Game_Actor_skills = Game_Actor.prototype.skills;
Game_Actor.prototype.skills = function() {
	const list = _Game_Actor_skills.call(this, ...arguments);
	if (AUTO_SKILLS) {
		list.forEach(skill => {
			$gameSystem.setShowListOne("skills", true, skill.id);
		});
	}
	return list;
};

const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
	const subject = this._subject;
	const action = subject.currentAction();
	if (AUTO_USE_SKILLS) {
		$gameSystem.setShowListOne("skills", true, action.item().id);
	}
	_BattleManager_startAction.call(this, ...arguments);
};

const _Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
	_Game_Party_addActor.call(this, ...arguments);
	this.addActorData(actorId);
};

const _Game_Party_setupStartingMembers = Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function() {
	_Game_Party_setupStartingMembers.call(this, ...arguments);
	if (this._actors) {
		this._actors.forEach(actorId => {
			this.addActorData(actorId);
		}, this);
	}
};

Game_Party.prototype.addActorData = function(actorId) {
	const actor = $gameActors._data[actorId];
	if (actor) {
		if (AUTO_ACTORS) {
			$gameSystem.setShowListOne("actors", true, actor._actorId);
		}
		if (AUTO_CLASSES) {
			$gameSystem.setShowListOne("classes", true, actor._classId);
		}
		this.initEquip4List(actor._equips);
		actor.skills();
	}
};

Game_Party.prototype.initEquip4List = function(items) {
	items.forEach(item => {
		if (AUTO_WEAPONS) {
			if (item.isWeapon()) {
				$gameSystem.setShowListOne("weapons", true, item._itemId);
			}
		}
		if (AUTO_ARMORS) {
			if (item.isArmor()) {
				$gameSystem.setShowListOne("armors", true, item._itemId);
			}
		}
	});
};

const _Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
	_Game_Actor_changeClass.call(this, ...arguments);
	if (AUTO_CLASSES) {
		$gameSystem.setShowListOne("classes", true, classId);
	}
};

const _BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
	_BattleManager_setup.call(this, ...arguments);
	if (AUTO_ENEMIES) {
		const troop = $gameTroop.members();
		troop.forEach(enemy => {
			$gameSystem.setShowListOne("enemies", true, enemy._enemyId);
		});
	}
};

//--------------------------------------
// 情報シーン基礎（新規）

class Scene_InfoBase extends Scene_MenuBase {
	setShowList() {
		if (AUTO_SKILLS) {
			$gameParty.members().forEach(actor => {
				actor.skills();
			});
		}
	}

	createInfo(database, subSymbol, name, showList) {
		const info = database.filter((item, index) => this.canInfo(item, showList[index], subSymbol));
		const command = {
			subSymbol: subSymbol,
			name: name,
			data: info,
		};
		KRD_INFO.command.push(command);
	}

	canInfo(item, show, subSymbol) {
		return show && item && !item.meta?.KRD_notData && item.name !== "" && !this.getDbJsonOneData(subSymbol, item.id, TAG_NOT_DATA);
	}

	getDbJsonOneData(subSymbol, id, key) {
		return $gameSystem.getDbJsonOneData(subSymbol, id, key);
	}

	command(index) {
		this._i = index;
		this._commandWindow.hide();
		this._commandWindow.deactivate();
		this._subCommandWindow[index].show()
		this._subCommandWindow[index].activate();
		this._subCommandWindow[index].refresh();
		this._subCommandWindow[index].select(0);
	}

	backToCommand() {
		this._subCommandWindow.forEach(sub => {
			sub.deactivate();
			sub.hide();
		});
		this._helpWindow.clear();
		this._commandWindow.show();
		this._commandWindow.activate();
	}
}

//--------------------------------------
// 情報シーン（新規）

class Scene_Info extends Scene_InfoBase {
	create() {
		super.create(...arguments);
		this._i = 0;

		this.setShowList();

		KRD_INFO.command = [];
		this.createAllInfo();

		this.createHelpWindow();
		this.createCommandWindow();
		this._subCommandWindow = [];
		this.createSubCommandWindow();
	}

	createAllInfo() {
		if (!$gameSystem._showList) {
			$gameSystem._showList = $gameSystem.makeShowList();
		}
		if (GAME_INFO) {
			this.createInfo(GAME_INFO_BASE.data, "gameInfo", GAME_INFO, $gameSystem._showList.gameInfo);
		}
		if (HELP) {
			this.createInfo(HELP_BASE.data, "help", HELP, $gameSystem._showList.help);
		}
		if (GLOSSARY) {
			this.createInfo(GLOSSARY_BASE.data, "glossary", GLOSSARY, $gameSystem._showList.glossary);
		}
		if (QUEST) {
			this.createInfo(QUEST_BASE.data, "quest", QUEST, $gameSystem._showList.quest);
		}
		if (ACTORS) {
			this.createInfo($dataActors, "actor", ACTORS, $gameSystem._showList.actors);
		}
		if (CLASSES) {
			this.createInfo($dataClasses, "class", CLASSES, $gameSystem._showList.classes);
		}
		if (SKILLS) {
			this.createInfo($dataSkills, "skill", SKILLS, $gameSystem._showList.skills);
		}
		if (ITEMS) {
			this.createInfo($dataItems, "item", ITEMS, $gameSystem._showList.items);
		}
		if (WEAPONS) {
			this.createInfo($dataWeapons, "weapon", WEAPONS, $gameSystem._showList.weapons);
		}
		if (ARMORS) {
			this.createInfo($dataArmors, "armor", ARMORS, $gameSystem._showList.armors);
		}
		if (ENEMIES) {
			this.createInfo($dataEnemies, "enemy", ENEMIES, $gameSystem._showList.enemies);
		}
	}

	createCommandWindow() {
		const rect = this.commandWindowRect();
		const commandWindow = new Window_InfoCommand(rect);
		KRD_INFO.command.forEach((command, index) => {
			commandWindow.setHandler(CMD_SYMBOL + index, this.command.bind(this, index));
		}, this);
		commandWindow.setHandler("cancel", this.popScene.bind(this));
		this.addWindow(commandWindow);
		this._commandWindow = commandWindow;
		this._commandWindow.show();
		this._commandWindow.activate();
	}

	commandWindowRect() {
		if (CMD_HORIZON) {
			return this.commandWindowRectHorizontal();
		} else {
			return this.commandWindowRectVertical();
		}
	}

	commandWindowRectVertical() {
		const wx = CMD_RIGHT ? Math.floor(Graphics.boxWidth / 3 * 2) : 0;
		const wy = this.mainAreaTop();
		const ww = Math.floor(Graphics.boxWidth / 3);
		const wh = Graphics.boxHeight - wy;
		return new Rectangle(wx, wy, ww, wh);
	}

	commandWindowRectHorizontal() {
		const wx = 0;
		const wy = this.mainAreaTop();
		const ww = Graphics.boxWidth;
		const wh = this.calcWindowHeight(CMD_HEIGHT, false);
		return new Rectangle(wx, wy, ww, wh);
	}

	createHelpWindow() {
		const rect = this.helpWindowRect();
		this._helpWindow = new Window_InfoText(rect);
		this.addWindow(this._helpWindow);
	}

	helpWindowRect() {
		if (CMD_HORIZON) {
			return this.infoWindowRectHorizontal();
		} else {
			return this.infoWindowRectVertical();
		}
	}

	infoWindowRectVertical() {
		const wx = CMD_RIGHT ? 0 : Math.floor(Graphics.boxWidth / 3);
		const wy = this.mainAreaTop();
		const ww = Math.floor(Graphics.boxWidth / 3 * 2);
		const wh = Graphics.boxHeight - wy;
		return new Rectangle(wx, wy, ww, wh);
	}

	infoWindowRectHorizontal() {
		const wx = 0;
		const wy = this.mainAreaTop() + this._commandWindow.height;
		const ww = Graphics.boxWidth;
		const wh = Graphics.boxHeight - wy;
		return new Rectangle(wx, wy, ww, wh);
	}

	createSubCommandWindow() {
		KRD_INFO.command.forEach((sub, i) => {
			this.createSubCommandWindowIn(sub, i);
		}, this);
		this._subCommandWindow.forEach(sub => {
			sub.deactivate();
			sub.hide();
		});
	}

	createSubCommandWindowIn(sub, i) {
		const rect = this.subCommandWindowRect();
		const subCommandWindow = new Window_InfoSubCommand(rect, i);
		subCommandWindow.setHandler("cancel", this.backToCommand.bind(this));
		subCommandWindow.setHelpWindow(this._helpWindow);
		this.addWindow(subCommandWindow);
		this._subCommandWindow.push(subCommandWindow);
	}

	subCommandWindowRect() {
		return this.commandWindowRect();
	}
}

//--------------------------------------
// 情報ウィンドウ：共通部

Window_Base.prototype.getName = function(data, language) {
	if (language > 0) {
		const tmp = data[`name_${language}`] || data.name || "";
		return this.convertEscapeCharacters(tmp);
	} else {
		const tmp = data.name || "";
		return this.convertEscapeCharacters(tmp);
	}
};

//--------------------------------------
// 情報ウィンドウ：コマンド部（新規）

class Window_InfoCommand extends Window_Command {
	initialize(rect) {
		super.initialize(...arguments);
		this.makeCommandList();
	}

	makeCommandList() {
		KRD_INFO.command.forEach((command, index) => {
			const commandName = command.name;
			const name = this.convertEscapeCharacters(commandName) || "";
			this.addCommand(name, CMD_SYMBOL + index);
		}, this);
	}

	maxCols() {
		return CMD_COLS;
	}

	maxItems() {
		return KRD_INFO.command.length;
	}

	itemHeight() {
		return Math.floor(this.innerHeight / CMD_ROWS);
	}
}

//--------------------------------------
// 情報ウィンドウ：サブコマンド部（新規）

class Window_InfoSubCommand extends Window_Selectable {
	initialize(rect, index) {
		super.initialize(...arguments);
		this._i = index;
		this._symbol = "";
		this.setSubSymbol(index);
	}

	drawItem(index) {
		const rect = this.itemLineRect(index);
		const language = multilingual();
		const data = KRD_INFO.command[this._i].data[index];
		const name = this.getName(data, language);
		this.changePaintOpacity(true);
		this.drawText(name, rect.x, rect.y, rect.width, "center");
	}

	setSubSymbol(index) {
		this._symbol = KRD_INFO.command[index].subSymbol;
	}

	updateHelp() {
		if (this._helpWindow) {
			this._helpWindow.drawInfo(this._symbol, this._index, this._i);
		}
	}

	maxCols() {
		return SUB_CMD_COLS;
	}

	maxItems() {
		if (this._i >= 0) {
			return KRD_INFO.command[this._i].data.length;
		} else {
			return 0;
		}
	}

	itemHeight() {
		return Math.floor(this.innerHeight / CMD_ROWS);
	}
}

//--------------------------------------
// 情報ウィンドウ基礎：メッセージ部（新規）

class Window_InfoTextBase extends Window_Help {
	initialize(rect, index) {
		super.initialize(...arguments);

		this._sprite = new Sprite();
		this._container.addChild(this._sprite);
		this._symbol = "";
	}

	drawInfo(symbol) {
		this.setSymbol(symbol);
	}

	setSymbol(symbol) {
		this._symbol = symbol;
	}

	symbol() {
		return this._symbol;
	}

	lineHeight() {
		return LINE_HEIGHT || super.lineHeight();
	}

	havePicture(found) {
		const json = $gameSystem.getDbJsonOneData(this.symbol(), found.id, TAG_PICTURE);
		return !!json || !!found.meta?.KRD_picture || !!found.picture;
	}

	isActor(found) {
		return !!found.classId;
	}

	isEnemy(found) {
		return found.battlerName && !found.classId;
	}

	is2Text(text) {
		return text.toString().match("\\n");
	}

	getData(kind) {
		switch(kind) {
			case 1:
				return $dataItems;
			case 2:
				return $dataWeapons;
			case 3:
				return $dataArmors;
			default:
				return null;
		}
	}

	text(found) {
		const language = multilingual();
		const textJson = $gameSystem.getDbJsonOneData(this.symbol(), found.id, TAG_TEXT);
		if (textJson) {
			const retText = this.convertEscapeCharacters(textJson);
			return retText;
		} else {
			const textLang = found.meta ? found.meta[`_text_${language}`] : "";
			const tmpText = found.meta?.KRD_text || "";
			const useText = textLang ? textLang : tmpText;
			const retText = this.convertEscapeCharacters(useText);
			return retText;
		}
	}

	alphabet(found) {
		if (found.meta?.KRD_alphabet) {
			const fontSize = Number(found.meta?.KRD_fontSize) || 0;
			const lineHeight = Number(found.meta?.KRD_lineHeight) || 0;
			return [fontSize, lineHeight];
		} else if (found.alphabet === true || found.alphabet === "true") {
			const fontSize = Number(found.fontSize) || 0;
			const lineHeight = Number(found.lineHeight) || 0;
			return [fontSize, lineHeight];
		} else {
			return null;
		}
	}

	drawPicture(found) {
		const json = $gameSystem.getDbJsonOneData(this.symbol(), found.id, TAG_PICTURE);
		const filename = json || found.meta?.KRD_picture || found.picture;
		if (filename) {
			this._bitmap = ImageManager.loadPicture(filename);
			this._bitmap.addLoadListener(this.drawTextWithImage.bind(this, found));
		}
	}

	drawTextExFontSize(text, x, y, width) {
		width = width ? width : this.innerWidth;
		if (this.is2Text(text) || (RUBY_PLUGIN && KRD_RUBY.isRuby(text))) {
			const fontSize = DESC_FONT_SIZE ? DESC_FONT_SIZE : $gameSystem.mainFontSize() - 2;
			this.drawTextEx("\\FS[" + fontSize +"]" + text, x, y);
		} else {
			const fontSize = DESC_FONT_SIZE ? DESC_FONT_SIZE : $gameSystem.mainFontSize() - 2;
			const baseFontSize = this.contents.fontSize;
			this.contents.fontSize = fontSize;
			this.drawText(text, x, y, width);
			this.contents.fontSize = baseFontSize;
		}
	}
}

//--------------------------------------
// 情報ウィンドウ：メッセージ部（新規）

class Window_InfoText extends Window_InfoTextBase {
	drawInfo(symbol, index, i) {
		super.drawInfo(symbol);

		const symbolIndex = symbol + index;
		if (symbolIndex !== "" && i >= 0) {
			const subSymbol = KRD_INFO.command[i].subSymbol;
			const found = KRD_INFO.command[i].data.find((data, index) => symbolIndex === subSymbol + index);
	
			this.clear();
			if (found) {
				if (this.havePicture(found)) {
					this.drawPicture(found);
				} else if (this.isActor(found)) {
					this.drawActorStart(found);
				} else if (this.isEnemy(found)) {
					this.drawEnemy(found);
				} else {
					this.drawInfoText(found);
				}
			}
		}
	}

	clear() {
		this._bitmap = null;
		this._sprite?.hide();
		this.contents.clear();
	}

	drawInfoText(found, x = 0, y = DOWN_LETTER) {
		if (found) {
			const language = multilingual();

			const name = this.getName(found, language);
			const desc = this.getDesc(found, language);

			const icon = found.iconIndex ? "\\I[" + found.iconIndex + "]" : "";
			const name4draw = icon + name;
			const text = this.text(found);
			const text4draw = desc ? desc + "\n" + text : text;

			const alphabet = this.alphabet(found);

			if (name4draw && alphabet) {
				this.drawTextEx(name4draw, x, y);
				this.drawTextSeparate(text4draw, x, y + BETWEEM_TITLE_TO_TEXT, this.innerWidth, alphabet[0], alphabet[1]);
			} else if (name4draw) {
				this.drawTextEx(name4draw, x, y);
				this.drawTextSeparateAuto(text4draw, x, y + BETWEEM_TITLE_TO_TEXT, this.innerWidth);
			} else {
				this.drawTextSeparateAuto(text4draw, x, y, this.innerWidth);
			}
		}
	}

	getDesc(found, language) {
		const tmp = found[`description_${language}`] || found.description || "";
		const langDesc = canLang() ? KRD_MULTILINGUAL.getLangText(tmp) : tmp;
		const skillDesc = this.processSkillDesc ? this.processSkillDesc(langDesc) : langDesc;
		const description = this.convertEscapeCharacters(skillDesc);
		const tmpDescLF = description.replace(/\x1bn/g, "\n");
		const descLF = tmpDescLF.replace(/\\n/g, "\n");
		return descLF;
	}
	
	drawTextSeparate(text, x, y, width, fontSize, lineHeight) {
		const strList = text.split("\n");
		this.contents.fontSize = fontSize || this.contents.fontSize;
		lineHeight = lineHeight || this.lineHeight();

		strList.forEach(str => {
			y = y + lineHeight;
			_Window_Base_drawText.call(this, str, x, y, width);
		}, this);
	}

	drawTextSeparateAuto(text, x, y, width) {
		const strList = text.split("\n");
		const lineHeight = this.lineHeight();

		strList.forEach(str => {
			y = y + lineHeight;
			if (this.hasEscape(str)) {
				this.drawTextExFontSize(str, x, y, width);
			} else {
				this.contents.fontSize = DESC_FONT_SIZE || this.contents.fontSize;
				_Window_Base_drawText.call(this, str, x, y, width);
			}
		}, this);
	}

	hasEscape(text) {
		const result = text.match(/\\/);
		const result2 = text.match(/\x1b/);
		return result || result2;
	}

	drawEnemy(found) {
		if (found.battlerName) {
			this._bitmap = this.loadEnemyBitmap(found.battlerName);
			this._bitmap.addLoadListener(this.drawTextWithImage.bind(this, found));
		}
	}

	loadEnemyBitmap(name) {
		if ($gameSystem.isSideView()) {
			return ImageManager.loadSvEnemy(name);
		} else {
			return ImageManager.loadEnemy(name);
		}
	};

	drawImage() {
		if (this._bitmap) {
			const pw = this._bitmap.width;
			const ph = this._bitmap.height;
			const sx = 0;
			const sy = 0;

			const rate = this.scaleRate();
			const dw = pw * rate;
			const dh = ph * rate;

			const x = this.innerWidth - dw;
			const y = 0;
			this.contents.blt(this._bitmap, sx, sy, pw, ph, x, y, dw, dh);
		}
	}

	drawSprite(found) {
		if (this._bitmap) {
			this._sprite.bitmap = this._bitmap;

			const pw = this._bitmap.width;
			const ph = this._bitmap.height;
			const larger = pw > this.innerWidth;

			const rate = this.scaleRate();
			this._sprite.scale.x = rate;
			this._sprite.scale.y = rate;

			const margin = 8;
			const x = larger ? margin : Math.floor((this.innerWidth - (pw * rate)) / 2);
			const y = margin;
			
			this._sprite.setFrame(0, 0, pw, ph);
			this._sprite.move(x, y);
			this._sprite.setHue(found.battlerHue);

			this._sprite.show();
		}
	}

	scaleRate() {
		if (this._bitmap) {
			const pw = this.innerWidth / this._bitmap.width;
			const ph = this.innerHeight / this._bitmap.height;
			return Math.min(1, pw, ph);
		}
		return 1;
	}

	drawTextWithImage(found) {
		if (this.isActor(found)) {
			this.drawImage();
			this.drawActorText(found);
		} else if (this.isEnemy(found)) {
			this.drawSprite(found);
			this.drawEnemyText(found);
		} else {
			this.drawImage();
			this.drawInfoText(found);
		}
	}

	drawEnemyText(found) {
		if (this._bitmap) {
			const pw = this._bitmap.width;
			const ph = this._bitmap.height;
			const dh = pw > this.innerWidth ? ph * (this.innerWidth / pw) : ph;
			const y1 = (TEXT_OVER ? 0 : dh) + DOWN_LETTER;
			const rate = this._sprite.scale.y;
			const y2 = Math.floor(ph * rate);
			const y = Math.min(y1, y2);
			this.drawEnemyText2(found, 0, y);
		} else {
			this.drawEnemyText2(found);
		}
	}

	drawEnemyText2(found, x = 0, y = DOWN_LETTER) {
		if (found) {
			const name = found.name || "";
			const text = this.text(found);

			if (name) {
				this.drawTextEx(name, x, y);
				y += this.lineHeight();
			}
			const yy = this.drawEnemyData(found, x, y + BETWEEM_TITLE_TO_TEXT);
			this.drawTextExFontSize(text, x, yy);
		}
	}

	drawEnemyData(found, x = 0, y = DOWN_LETTER) {
		if (PARAMS_COLS) {
			return this.drawEnemyData2Cols(...arguments);
		} else {
			return this.drawEnemyData1Col(...arguments);
		}
	}

	drawEnemyData1Col(found, x = 0, y = DOWN_LETTER) {
		const enemy = new Game_Enemy(found.id, 0, 0);
		const lineHeight = this.lineHeight();

		ENEMY_PARAMS.forEach(paramIndex => {
			this.drawTextExFontSize(TextManager.param(paramIndex) + " " + enemy.param(paramIndex), x, y);
			y += lineHeight;
		}, this);

		const xx = PARAMS_COLS ? Math.floor(this.innerWidth / 2) : 0;
		this.drawTextExFontSize(TextManager.exp + " " + found.exp, x, y);
		y += PARAMS_COLS ? 0 : lineHeight;
		this.drawTextExFontSize(TextManager.currencyUnit + " " + found.gold, x + xx, y);
		y += lineHeight;

		found.dropItems.forEach(drop => {
			if (drop.kind > 0 && drop.dataId > 0) {
				const data = this.getData(drop.kind);
				if (data) {
					if (data[drop.dataId].iconIndex > 0) {
						this.drawIcon(data[drop.dataId].iconIndex, x, y);
						const itemName = this.convertEscapeCharacters(data[drop.dataId].name);
						this.drawTextExFontSize(itemName, x + ImageManager.iconWidth, y);
					} else {
						this.drawTextExFontSize(data[drop.dataId].name, x, y);
					}
					y += lineHeight;
				}
			}
		}, this);
		return y;
	}

	drawEnemyData2Cols(found, x = 0, y = DOWN_LETTER) {
		const enemy = new Game_Enemy(found.id, 0, 0);
		const lineHeight = this.lineHeight();

		// 能力値の表示を2列にする場合
		const xx = Math.floor(this.innerWidth / 2);
		const width = Math.floor(this.innerWidth / 2) - 8;
		ENEMY_PARAMS.forEach((paramIndex, i) => {
			if (i % 2 === 0) {
				this.drawTextExFontSize(TextManager.param(paramIndex) + " " + enemy.param(paramIndex), x, y, width);
			} else {
				this.drawTextExFontSize(TextManager.param(paramIndex) + " " + enemy.param(paramIndex), x + xx, y, width);
				y += lineHeight;
			}
		}, this);
		if (ENEMY_PARAMS.length % 2 === 1) {
			y += lineHeight;
		}

		// 命中率
		if (ENEMY_HIT_RATE) {
			const param = Math.round(enemy.hit * 100);
			this.drawTextExFontSize(TextManager.param(8) + " " + param + "%", x, y, width);
			if (!ENEMY_EVASION_RATE) {
				y += lineHeight;
			}
		}

		// 回避率
		if (ENEMY_EVASION_RATE) {
			const param = Math.round(enemy.eva * 100);
			const evaX = ENEMY_HIT_RATE ? x + xx : x;
			this.drawTextExFontSize(TextManager.param(9) + " " + param + "%", evaX, y, width);
			y += lineHeight;
		}

		// 属性有効度
		ENEMY_ELEMENTS.forEach((elementId, index, array) => {
			const x2 = index % 2 === 0 ? 0 : xx;
			const param = Math.round(enemy.elementRate(elementId) * 100);
			this.drawTextExFontSize(this.elementName(elementId) + " " + param + "%", x + x2, y, width);
			if (array.length !== index - 1) {
				y += index % 2 === 0 ? 0 : lineHeight;
			}
		}, this);

		if (ENEMY_ELEMENTS.length % 2 === 1) {
			y += lineHeight;
		}
		this.drawTextExFontSize(TextManager.exp + " " + found.exp, x, y, width);
		this.drawTextExFontSize(TextManager.currencyUnit + " " + found.gold, x + xx, y, width);
		y += lineHeight + 4;

		const dropItems = found.dropItems.filter(drop => drop.kind > 0 && drop.dataId > 0);
		dropItems.forEach((drop, i) => {
			if (drop.kind > 0 && drop.dataId > 0) {
				const data = this.getData(drop.kind);
				if (data) {
					const iconPlusX = 2;
					const iconPlusY = 4;
					if (i % 2 === 0) {
						if (data[drop.dataId].iconIndex > 0) {
							this.drawIcon(data[drop.dataId].iconIndex, x + iconPlusX, y + iconPlusY);
							const itemName = this.convertEscapeCharacters(data[drop.dataId].name);
							this.drawTextExFontSize(itemName, x + iconPlusX + ImageManager.iconWidth, y, width);
						} else {
							this.drawTextExFontSize(data[drop.dataId].name, x, y, width);
						}
					} else {
						if (data[drop.dataId].iconIndex > 0) {
							this.drawIcon(data[drop.dataId].iconIndex, x + xx + iconPlusX, y + iconPlusY);
							const itemName = this.convertEscapeCharacters(data[drop.dataId].name);
							this.drawTextExFontSize(itemName, x + xx + iconPlusX + ImageManager.iconWidth, y, width);
						} else {
							this.drawTextExFontSize(data[drop.dataId].name, x + xx, y, width);
						}
						y += lineHeight;
					}
				}
			}
		}, this);
		if (dropItems.length % 2 === 1) {
			y += lineHeight;
		}

		return y;
	}

	elementName(index) {
		return TextManager.element ? TextManager.element(index) : $dataSystem.elements[index] ;
	}

	drawActorStart(found) {
		const data = $gameActors._data[found.id];
		const faceName = data ? data.faceName() : found.faceName;
		if (faceName) {
			this._bitmap = ImageManager.loadFace(faceName);
			this._bitmap.addLoadListener(this.drawActorWithFace.bind(this, found));
		} else {
			this.drawActorText(found);
		}
	}

	drawActorText(found, x = 0, y = DOWN_LETTER) {
		if (found) {
			const data = $gameActors._data[found.id];
			if (data) {
				const name = data.name() ? data.name() + "\n" : "";
				const nickname = data.nickname() ? data.nickname() + "\n" : "";
				const profile = data.profile() ? data.profile().replace(/\\n/g, "\n") + "\n" : "";
				const description = nickname + profile;

				const text = this.text(found);
				const text4draw = description ? description + text: text;

				this.drawTextEx(name, x, y);
				this.drawTextExFontSize(text4draw, x, y + this.lineHeight() + BETWEEM_TITLE_TO_TEXT, this.innerWidth);
			}
		}
	}

	drawActorWithFace(found) {
		const data = $gameActors._data[found.id];
		if (data) {
			this.drawActorWithFace2(found, data.faceName(), data.faceIndex());
		} else {
			this.drawActorWithFace2(found, found.faceName, found.faceIndex);
		}
	}

	drawActorWithFace2(found, name, faceIndex) {
		this.drawFace(name, faceIndex, 0, 0, ImageManager.faceWidth, ImageManager.faceHeight);
		this.drawActorText(found, 0, ImageManager.faceHeight + DOWN_LETTER);
	}
}

//--------------------------------------
// 関数（新規）

function parseJson2Data(text) {
	const parsed = JSON.parse(text);
	const info = [];
	parsed.forEach((data, index) => {
		info.push(JSON.parse(data));
		info[index].meta = {};
		info[index].meta.KRD_showData = info[index].showData === "true";
		delete info[index].showData;
	});
	return info;
}

function multilingual() {
	if (typeof KRD_MULTILINGUAL !== "undefined") {
		return KRD_MULTILINGUAL.multilingual();
	} else {
		return 0;
	}
}

function canLang() {
	return typeof KRD_MULTILINGUAL !== "undefined";
}

//--------------------------------------
})();
