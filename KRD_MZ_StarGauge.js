/*:
 * @target MZ
 * @plugindesc 星型ゲージ
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param STAR_CHARACTER
 * @text 星文字
 * @desc TPとして表示する文字です。
 * @default ★
 * @type string
 * 
 * @param STAR_COUNT
 * @text 星カウント
 * @desc 星を1つ表示するTPの値です。
 * @default 25
 * @type number
 * 
 * @param STAR_SIZE
 * @text 星サイズ
 * @desc 星の文字サイズです。
 * @default 20
 * @type number
 * 
 * @param STAR_MAX_COST
 * @text 星最大コスト数
 * @desc スキルコストを表示する際に確保する幅を決めるためのTPの値です。
 * @default 25
 * @type number
 * 
 * @param USE_INIT_TP
 * @text デフォルト初期TP処理
 * @desc ツクールデフォルトの初期TP処理を使用する：true ／「初期TP値」を使用する：false
 * @default false
 * @type boolean
 * 
 * @param INIT_TP_VALUE
 * @text 初期TP値
 * @desc 戦闘開始時に設定する初期TP値です。負数の場合この処理を行いません。
 * @type number
 * @default 25
 * @min -1
 * 
 * @help
# KRD_MZ_StarGauge.js

星型ゲージ

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2024/05/23) 作成開始
- ver.0.1.0 (2024/05/23) 非公開版完成
- ver.1.0.0 (2024/05/24) 公開
- ver.1.1.0 (2024/10/06) 他プラグインからstarSizeを変更可
- ver.1.2.0 (2025/04/05) drawItemを変更、initTp処理を追加
- ver.1.3.0 (2025/04/07) 初期TP値を追加

 * 
 * 
 */

let KRD_Sprite_StarGauge = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const STAR_CHARACTER = PARAM["STAR_CHARACTER"];
const STAR_COUNT = Number(PARAM["STAR_COUNT"]) || 1;
const STAR_SIZE = Number(PARAM["STAR_SIZE"]) || 1;
const STAR_MAX_COST = Number(PARAM["STAR_MAX_COST"]) || 1;

const USE_INIT_TP = PARAM["USE_INIT_TP"] === "true";
const INIT_TP_VALUE = Number(PARAM["INIT_TP_VALUE"]) || 0;

const PLUS_GAUGE_X = 4;

//--------------------------------------

KRD_Sprite_StarGauge = class extends Sprite_Gauge {
	initialize() {
		super.initialize(...arguments);
		this.setStarSize();
	}

	drawGauge() {
		// 使用しない
	}

	setStarSize(size = STAR_SIZE) {
		this._starSize = size;
	}

	starSize() {
		return this._starSize;
	}

	baseStarSize() {
		return STAR_SIZE;
	}

	gaugeX() {
		return super.gaugeX() + PLUS_GAUGE_X;
	}

	drawValue() {
		const x = this.gaugeX();
		const y = this.labelY();
		const width = this.bitmapWidth();
		const height = this.textHeight();
		const text = makeStar(this.currentValue());
		this.bitmap.fontSize = this.starSize();
		this.bitmap.textColor = ColorManager.normalColor();
		this.bitmap.drawText(text, x, y, width, height, "left");
	}
};

function makeStar(value) {
	let text = "";
	for (let i = 1; i * STAR_COUNT <= value; i++) {
		text += STAR_CHARACTER;
	}
	return text;
}

const _Window_StatusBase_placeGauge = Window_StatusBase.prototype.placeGauge;
Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
	if (type === "tp") {
		const key = "actor%1-gauge-%2".format(actor.actorId(), type);
		const sprite = this.createInnerSprite(key, KRD_Sprite_StarGauge);
		sprite.setup(actor, type);
		sprite.move(x, y);
		sprite.show();
	} else {
		_Window_StatusBase_placeGauge.call(this, ...arguments);
	}
};

// 上書き
Window_SkillList.prototype.drawItem = function(index) {
	const skill = this.itemAt(index);
	if (skill) {
		 const costWidth = this.costWidth();
		 const rect = this.itemLineRect(index);
		 const textWidth = rect.width - costWidth;
		 this.changePaintOpacity(this.isEnabled(skill));
		 this.drawItemName(skill, rect.x, rect.y, textWidth);
		 this.drawSkillCost(skill, rect.x + textWidth, rect.y, costWidth);
		 this.changePaintOpacity(1);
	}
};

// 上書き
Window_SkillList.prototype.costWidth = function() {
	return this.textWidth("000" + makeStar(STAR_MAX_COST));
};

// 上書き
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
	let text = "";
	if (this._actor.skillMpCost(skill) > 0) {
		text += this._actor.skillMpCost(skill).toString();
	}
	if (this._actor.skillTpCost(skill) > 0) {
		text += makeStar(this._actor.skillTpCost(skill));
	}
	this.changeTextColor(ColorManager.mpCostColor());
	this.drawText(text, x, y, width, "right");
};

//--------------------------------------

const _Game_Battler_initTp = Game_Battler.prototype.initTp;
Game_Battler.prototype.initTp = function() {
	if (USE_INIT_TP) {
		_Game_Battler_initTp.call(this, ...arguments);
	} else if (INIT_TP_VALUE >= 0) {
		this.setTp(INIT_TP_VALUE);
	}
};

//--------------------------------------
})();
