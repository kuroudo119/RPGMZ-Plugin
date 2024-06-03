/*:
 * @target MZ
 * @plugindesc トランプ基本クラス
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_Cards.js

トランプ基本クラス

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/10/13) 修正開始
- ver.0.1.0 (2021/10/15) 非公開版完成
- ver.0.1.1 (2022/01/04) CardsからCardDeckにクラス名変更
- ver.0.1.2 (2022/11/10) 定数の持ち方を変更
- ver.0.1.3 (2022/11/11) メソッド追加
- ver.0.2.0 (2022/11/12) トランプすごろく用の処理を追加
- ver.0.2.1 (2022/11/12) スートの値を変更
- ver.0.3.0 (2022/11/15) カードを調べる関数を追加
- ver.1.0.0 (2024/06/03) 公開

 * 
 * 
 */

let KRD_Card = null;
let KRD_CardDeck = null;
let KRD_CardSugoroku = null;

(() => {

"use strict";

//================================================
KRD_Card = class {
	constructor(suit, rank) {
		this._suit = suit;
		this._rank = rank;
	}

	suit() {
		return this._suit;
	}

	isSuitRed() {
		return this._suit === KRD_Card.SUIT_DIAMOND || this._suit === KRD_Card.SUIT_HEART;
	}

	isSuitBlack() {
		return this._suit === KRD_Card.SUIT_CLUB || this._suit === KRD_Card.SUIT_SPADE;
	}

	rank() {
		return this._rank;
	}

	rankAceTop() {
		if (this._rank === KRD_Card.RANK_ACE) {
			return KRD_Card.RANK_HIGH_ACE;
		} else {
			return this._rank;
		}
	}

	rankFaceCard() {
		if (this._rank >= KRD_Card.RANK_JACK && this._rank <= KRD_Card.RANK_KING) {
			return KRD_Card.RANK_FACE_CARD;
		} else {
			return this._rank;
		}
	}

	rankBlackjack() {
		if (this._rank >= KRD_Card.RANK_JACK && this._rank <= KRD_Card.RANK_KING) {
			return KRD_Card.RANK_FACE_CARD;
		} else if (this.rank === KRD_Card.RANK_ACE) {
			return KRD_Card.RANK_ACE_BLACKJACK;
		} else {
			return this._rank;
		}
	}

	rankDaiFugo() {
		if (this._rank === KRD_Card.RANK_ACE) {
			return KRD_Card.RANK_HIGH_ACE;
		} else if (this._rank === KRD_Card.RANK_2) {
			return KRD_Card.RANK_HIGH_2;
		} else {
			return this._rank;
		}
	}
};

KRD_Card.SUIT_BACK = 0;
KRD_Card.SUIT_CLUB = 1;
KRD_Card.SUIT_DIAMOND = 2;
KRD_Card.SUIT_HEART = 3;
KRD_Card.SUIT_SPADE = 4;
KRD_Card.SUIT_JOKER = 5;

KRD_Card.RANK_BACK = 0;
KRD_Card.RANK_ACE = 1;
KRD_Card.RANK_2 = 2;
KRD_Card.RANK_3 = 3;
KRD_Card.RANK_4 = 4;
KRD_Card.RANK_5 = 5;
KRD_Card.RANK_6 = 6;
KRD_Card.RANK_7 = 7;
KRD_Card.RANK_8 = 8;
KRD_Card.RANK_9 = 9;
KRD_Card.RANK_10 = 10;
KRD_Card.RANK_FACE_CARD = 10;
KRD_Card.RANK_ACE_BLACKJACK = 11;
KRD_Card.RANK_JACK = 11;
KRD_Card.RANK_QUEEN = 12;
KRD_Card.RANK_KING = 13;
KRD_Card.RANK_HIGH_ACE = 14;
KRD_Card.RANK_HIGH_2 = 15;
KRD_Card.RANK_JOKER = 30;
KRD_Card.RANK_JOKER_BLACK = 30;
KRD_Card.RANK_JOKER_RED = 31;

//================================================
KRD_CardDeck = class {
	constructor() {
		this._deck = null;
	}

	deck() {
		return this._deck;
	}

	clearDeck() {
		this._deck = null;
	}

	newDeck(startRank = KRD_Card.RANK_ACE, endRank = KRD_Card.RANK_KING, startSuit = KRD_Card.SUIT_CLUB, endSuit = KRD_Card.SUIT_SPADE, deck = 1) {
		this._deck = [];
		for (let k = 0; k < deck; k++) {
			for (let i = startSuit; i <= endSuit; i++) {
				for (let j = startRank; j <= endRank; j++) {
					this._deck.push(new KRD_Card(i, j));
				}
			}
		}
	}

	// Fisher–Yates shuffle
	shuffle() {
		for (let i = this._deck.length - 1; i > 0; i--) {
			const random = Math.floor(Math.random() * (i + 1));

			// 分割代入による値の交換
			[this._deck[i], this._deck[random]] = [this._deck[random], this._deck[i]];
		}
	}

	draw() {
		// Get a card from array head.
		const card = this._deck.shift();
		if (card) {
			return card;
		} else {
			throw {code: 401, text: "Deck out!!"};
		}
	}

	backCard() {
		return new KRD_Card(KRD_Card.SUIT_BACK, KRD_Card.RANK_BACK);
	}
};

//================================================
KRD_CardSugoroku = class extends KRD_CardDeck {
	constructor() {
		super();
		this._sugoroku = null;
	}

	sugoroku() {
		return this._sugoroku;
	}

	clearSugoroku() {
		this._sugoroku = null;
	}

	newSugoroku(div = 13) {
		this._sugoroku = [];
		for (let i = 0; i < div; i++) {
			this._sugoroku.push([]);
			this._sugoroku[i].push(this.backCard());
		}
		for (let i = 0; i < this._deck.length; i++) {
			const j = i % div;
			this._sugoroku[j].push(this._deck[i]);
		}
	}

	drawCard(index) {
		const card = this._sugoroku[index].shift();
		if (card) {
			return card;
		} else {
			throw {code: 402, text: "No Card!!"};
		}
	}

	lookCard(index) {
		const card = this._sugoroku[index][0];
		if (card) {
			return card;
		} else {
			throw {code: 403, text: "No Card!!"};
		}
	}
};

//================================================
// セーブデータにインスタンスを含める処理
//
// グローバルで let で宣言した時、
// windowオブジェクトのプロパティを生成しない事への対処。

window[KRD_Card.name] = KRD_Card;
window[KRD_CardDeck.name] = KRD_CardDeck;
window[KRD_CardSugoroku.name] = KRD_CardSugoroku;

//================================================
})();
