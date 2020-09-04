/*:
 * @target MZ
 * @plugindesc Set enemy time gauge.
 * @author kuroudo119
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 *
 * @help
 * KRD_MZ_EnemyTimeGauge.js
 * (c) 2020 kuroudo119
 * 
 * This is under the MIT License.
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * ver.1 (2020/09/04) 1st Release.
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 敵キャラにタイムゲージを表示します。
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 *
 * @help
 * KRD_MZ_EnemyTimeGauge.js
 * (c) 2020 kuroudo119
 * 
 * このプラグインはMITライセンスです。
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * ver.1 (2020/09/04) 新規作成
 * 
 * 敵キャラにタイムゲージを表示します。
 * このプラグインにはカスタマイズ機能はありません。
 * 
 */

(() => {

'use strict';

//--------------------------------------
// 敵タイムゲージ表示

const KRD_Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
	KRD_Sprite_Enemy_setBattler.apply(this, arguments);
	if (BattleManager.isTpb()) {
			this.setTimeGauge(battler);
	}
};

Sprite_Enemy.prototype.setTimeGauge = function(battler) {
	this._timeGauge = new Sprite_Gauge();
	this._timeGauge.setup(battler, "time");
	const x = this._timeGauge.x - this._timeGauge.width / 2;
	const y = this._timeGauge.y - 12;
	this._timeGauge.move(x, y);
	this._timeGauge.show();
	this.addChild(this._timeGauge);
};

//--------------------------------------
})();
