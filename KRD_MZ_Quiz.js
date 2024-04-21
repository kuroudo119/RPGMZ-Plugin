/*:
 * @target MZ
 * @plugindesc クイズ
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @param GLOBAL_NAME
 * @text グローバル変数名
 * @desc UniqueDataLoaderプラグインで設定した文字列です。
 * @default $dataUniques
 * 
 * @param PROPERTY_NAME
 * @text プロパティ名
 * @desc UniqueDataLoaderプラグインで設定した文字列です。
 * @default quiz
 * 
 * @help
# KRD_MZ_Quiz.js

クイズ

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## データ

1. クイズの問題と答えを記述したjsonファイルを用意しdataフォルダに入れます。
2. UniqueDataLoaderプラグインを使用し、jsonファイルを使用可能にします。
3. プラグインパラメータにUniqueDataLoaderプラグインと同じ値を設定します。

### jsonファイル

- id 問題の番号です。
- group 問題のグループです。同じグループのクイズデータを作れます。
- name 問題の名前です。
- question 問題文です。制御文字で表示します。
- answer_1 答えの文です。1～6まで作成できます。制御文字で表示します。
- correct 正解となる答えの番号です。正解は1個です。

```json
[
  {
    "id": 1,
    "group": "基本問題",
    "name": "問題1",
    "question": "RPGツクールMZのマップ編集には\nレイヤー機能がある？",
    "answer_1": "あるよ",
    "answer_2": "ないかな",
    "correct": 1
  },
  {
    "id": 2,
    "group": "基本問題",
    "name": "問題2",
    "question": "RPGツクールMZってなんて読む？",
    "answer_1": "ろーぷれつくーるえむぜっと",
    "answer_2": "ろーぷれつくーるえむじぃ",
    "answer_3": "あーるぴーじーつくーるえむぜっと",
    "answer_4": "あーるぴーじーつくーるえむずぅいぃぃ",
    "correct": 3
  }
]
```

## スクリプト

本プラグインではプラグインコマンドを用意していないため、
スクリプトを記述して使用します。

想定する処理の流れは以下です。

1. 新規クイズデータ作成 newQuiz
2. クイズ一覧シャッフル shuffleQuizList
3. 次の問題に進む nextQuiz
4. 問題の答えをシャッフル shuffleAnswer
5. 問題文を取得 setQuestionText
6. 答えの文を取得 setAnswerText
7. 正否確認 checkAnswer
※3～7をループの中に入れ、
3で次の問題がない場合にループの中断する。

### 新規クイズデータ作成 newQuiz

本プラグインでは最初にクイズデータを作成する必要があります。
スクリプトコマンドで以下を記述します。

$gameSystem.newQuiz();

引数にはクイズのグループ名を指定できます。
章立てになっている場合にお使いください。

$gameSystem.newQuiz("グループ名");

### 最新クイズデータ取得 latestQuiz

クイズデータの中から最新のクイズデータを取得します。
以降、このスクリプトを使って関数を使用します。

$gameSystem.latestQuiz();

### クイズデータ削除 clearQuiz

クイズデータは累積し、セーブデータに含まれますので、
セーブデータが大きい場合などの
必要に応じて以下のスクリプトで削除してください。

$gameSystem.clearQuiz();

### クイズ一覧シャッフル shuffleQuizList

クイズ一覧の順番をシャッフルする場合に以下を記述します。

$gameSystem.latestQuiz().shuffleQuizList();

### 次の問題に進む nextQuiz

次の問題を取得します。
条件分岐コマンドのスクリプト欄で以下を記述します。
問題がなくなった場合、条件を満たさないときの分岐に進みます。

$gameSystem.latestQuiz().nextQuiz();

### 問題の答えをシャッフル shuffleAnswer

問題の順番をシャッフルする場合に、
スクリプトコマンドで以下を記述します。

$gameSystem.latestQuiz().shuffleAnswer();

### 問題文を取得 setQuestionText

問題文を指定した変数に格納します。
文章の表示コマンドで制御文字を使うと表示できます。
スクリプトコマンドで以下を記述します。

$gameSystem.latestQuiz().setQuestionText(100);
※100は変数番号。

### 答えの文を取得 setAnswerText

答えの文を指定した変数から最大6個の連続した変数に格納します。
選択肢の表示コマンドで制御文字を使うと表示できます。
スクリプトコマンドで以下を記述します。

$gameSystem.latestQuiz().setAnswerText(101);
※101は変数番号。

答えの数は固定にすること（4択など）をオススメします。

### 正否確認 checkAnswer

選択肢コマンドで選択した回答か正解かどうかチェックします。
選択肢の表示コマンドの選択肢内で、
スクリプトコマンドで以下を記述します。

$gameSystem.latestQuiz().checkAnswer(index);
※indexは、選択肢の上から順に 0 ～ 5 に変えてください。

## 更新履歴

- ver.0.0.1 (2024/04/20) 作成開始
- ver.0.1.0 (2024/04/21) 非公開版完成
- ver.1.0.0 (2024/04/21) 公開

 * 
 * 
 */

let KRD_QuizBase = null;
let KRD_Quiz = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const GLOBAL_NAME = PARAM["GLOBAL_NAME"];
const PROPERTY_NAME = PARAM["PROPERTY_NAME"];

const KEY_ANSWER = "answer_";
const MAX_ANSWER = 6;

const ERROR_1 = "エラー 1: 範囲外の選択肢が選択されました。";

//--------------------------------------
// 基本クイズクラス

KRD_QuizBase = class {
	constructor(group, name) {
		this.makeQuizList(group, name);

		this._quiz = {};
		this._finishQuizList = [];
	}

	makeQuizList(group, name) {
		this._quizList = [];
		if (name) {
			this._quizList.push(this.deepCopy(this.nameQuiz(name)));
		} else {
			if (group) {
				this._quizList = this.deepCopy(this.groupList(group));
			} else {
				this._quizList = this.deepCopy(this.getJsonData());
			}
		}
	}

	getJsonData() {
		return window[GLOBAL_NAME][PROPERTY_NAME];
	}

	groupList(group, baseList) {
		const list = baseList ? baseList : this.getJsonData();
		return list.filter(data => data.group === group);
	}

	nameQuiz(name, baseList) {
		const list = baseList ? baseList : this.getJsonData();
		return list.find(data => data.name === name);
	}

	quizList() {
		return this._quizList;
	}

	quiz() {
		return this._quiz;
	}

	question() {
		return this._quiz.question;
	}

	answer(number) {
		return this._quiz[KEY_ANSWER + number];
	}

	correct() {
		return this._quiz.correct;
	}

	answerList() {
		return this._quiz._answerList;
	}

	answerCount() {
		return this._quiz._answerList.length;
	}

	answerTextList() {
		return this._quiz._answerList.map(answer => answer.data);
	}

	checkQuizList() {
		return this._quizList.length > 0;
	}

	nextQuiz() {
		const quiz = this._quizList.shift();
		this.setAnswerList(quiz);
		this._quiz = quiz;
		return this._quiz;
	}

	setAnswerList(quiz) {
		if (quiz) {
			quiz._answerList = [];
			for (let i = 1; i <= MAX_ANSWER; i++) {
				const key = KEY_ANSWER + i;
				const answer = quiz[key];
				if (answer) {
					const answerData = {
						key: key,
						data: answer
					}
					quiz._answerList.push(answerData);
				}
			}
		}
	}

	shuffleQuizList() {
		if (this._quizList) {
			this.shuffle(this._quizList);
		}
	}

	shuffleAnswer() {
		if (this._quiz && this._quiz._answerList) {
			this.shuffle(this._quiz._answerList);
		}
	}

	checkAnswer(index) {
		try {
			const result = this.checkAnswerMain(index);
			this.afterCheckAnswer();
			return result;
		} catch(e) {
			// console.log(e);
			this.afterCheckAnswer();
			return false;
		}
	}

	checkAnswerMain(index) {
		if (index < this._quiz._answerList.length) {
			const key = this._quiz._answerList[index].key;
			const correct = KEY_ANSWER + this._quiz.correct;
			this._quiz._result = (key === correct);
			return this._quiz._result;
		} else {
			throw ERROR_1;
		}
	}

	afterCheckAnswer() {
		if (this._quiz) {
			this._finishQuizList.push(this._quiz);
		}
	}

	finishQuizList() {
		return this._finishQuizList;
	}

	correctCount() {
		return this._finishQuizList.reduce((r, quiz) => r + (quiz._result ? 1 : 0), 0);
	}

	finishQuizCount() {
		return this._finishQuizList.length;
	}

	// Deep Copy
	// JSON を使うのは問題があるらしいが許容範囲なのでコレを使う。
	deepCopy(list) {
		return JSON.parse(JSON.stringify(list));
	}

	// Fisher–Yates shuffle
	shuffle(list) {
		for (let i = list.length - 1; i > 0; i--) {
			const random = Math.floor(Math.random() * (i + 1));

			// 分割代入による値の交換
			[list[i], list[random]] = [list[random], list[i]];
		}
	}
};

//--------------------------------------
// 表示系クイズクラス

KRD_Quiz = class extends KRD_QuizBase {
	setQuestionText(start) {
		$gameVariables.setValue(start, this.question());
	}

	setAnswerText(start) {
		const answerList = this.answerTextList();
		const len = answerList.length;
		for (let i = 0; i < len; i++) {
			$gameVariables.setValue(start + i, answerList[i]);
		}
	}
};

// セーブデータに含めるためのおまじない。
window[KRD_Quiz.name] = KRD_Quiz;

//--------------------------------------

Game_System.prototype.newQuiz = function(group, name) {
	this._quiz = this._quiz ? this._quiz : [];
	this._quiz.push(new KRD_Quiz(group, name));
};

Game_System.prototype.latestQuiz = function() {
	const len = this._quiz.length;
	return this._quiz[len - 1];
};

Game_System.prototype.clearQuiz = function() {
	this._quiz = [];
};

//--------------------------------------
})();
