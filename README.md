# RPGツクールMZプラグイン

## KRD_MZ_Speech （音声入力）

ブラウザのマイク機能（Web Speech API）を使って音声入力（音声認識）します。  
以下の画像はイベントコマンドの設定例です。

[KRD_MZ_Speechをダウンロード](https://github.com/kuroudo119/RPGMZ-Plugin/raw/master/KRD_MZ_Speech.js)

![音声入力](img/speechEvent.png)

## KRD_MZ_Motion （スキルモーション変更）

サイドビュー戦闘時に、指定したスキル（[SV]魔法スキルを含む）のスキル使用アクターモーションを通常攻撃モーションに変更します。

[KRD_MZ_Motionをダウンロード](https://github.com/kuroudo119/RPGMZ-Plugin/raw/master/KRD_MZ_Motion.js)

![スキルモーション変更](img/changeSkillMotion.png)

## KRD_MZ_InputRange （音量調節スライダー）

設定画面に音量調節用のスライダーを追加します。
スマホ動作用に RangeTouch という外部ライブラリを使用しますので、index.html の修正が必要です。
尚、スマホでの操作感はイマイチです。

[KRD_MZ_InputRangeをダウンロード](https://github.com/kuroudo119/RPGMZ-Plugin/raw/master/KRD_MZ_InputRange.js)

次のように表示されます。見た目はブラウザ依存です。
![音量調節スライダー](slider.png)

## KRD_MZ_Dice （サイコロプラグイン）

サイコロを振るプラグインです。
画像の提供はありません。100ピクセル四方のサイコロ画像を想定しています。

[KRD_MZ_Diceをダウンロード](https://github.com/kuroudo119/RPGMZ-Plugin/raw/master/KRD_MZ_Dice.js)

次のようにイベントコマンドを設定します。
![サイコロ処理](Sugo_dice.png)

## KRD_MZ_Freeze （プレイヤー移動不可プラグイン）

プレイヤーを移動できなくするプラグインです。
すごろくなどにお使いください。

[KRD_MZ_Freezeをダウンロード](https://github.com/kuroudo119/RPGMZ-Plugin/raw/master/KRD_MZ_Freeze.js)

## KRD_MZ_Sugoroku （すごろくプラグイン）

すごろくプラグインです。
プレイヤーとライバル1人ですごろく出来ます。

[KRD_MZ_Sugorokuをダウンロード](https://github.com/kuroudo119/RPGMZ-Plugin/raw/master/KRD_MZ_Sugoroku.js)

次のようにイベントコマンドを設定します。
![すごろくプレイヤー移動処理](Sugo_move.png)

次のように地形タグを設定します。地形タグを設定したタイルの上に別のタイルを置く事も出来ます。
![すごろく地形タグ](Sugo_tag.png)

次のようにリージョンを設定します。
![すごろくマップとリージョン](Sugo_region.png)

## KRD_MZ_BattleStatus （バトルステータス透明化）

バトルステータスを透明化して、右側に移動させます。
カスタマイズ機能はありません。
敵キャラの縦位置（Y座標）を1.3倍していますので、ツクールMZのエディタよりも縦位置がズレて表示されます。

[KRD_MZ_BattleStatusをダウンロード](https://raw.githubusercontent.com/kuroudo119/RPGMZ-Plugin/master/KRD_MZ_BattleStatus.js)

![バトルステータス透明化](WS000092.jpg)

## KRD_MZ_EnemyTimeGauge （敵タイムゲージ）

バトル中に常時、敵キャラにタイムゲージを表示します。
カスタマイズ機能はありません。

[KRD_MZ_EnemyTimeGaugeをダウンロード](https://raw.githubusercontent.com/kuroudo119/RPGMZ-Plugin/master/KRD_MZ_EnemyTimeGauge.js)

![敵タイムゲージ](WS000083.jpg)

## KRD_MZ_TestTimeGauge

テストプレイ時に敵キャラにタイムゲージを表示します。
カスタマイズ機能はありません。
