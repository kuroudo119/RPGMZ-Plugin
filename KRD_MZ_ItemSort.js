/*:
 * @target MZ
 * @plugindesc アイテム・スキル一覧ソート
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * 
 * @help
# KRD_MZ_ItemSort.js

アイテム・スキル一覧ソート

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 仕様

### アイテムの並び順

使用可能時、ダメージタイプ、範囲の順。

### 武器の並び順

武器タイプ順。

### 防具の並び順

装備タイプ、防具タイプの順。

### スキルの並び順

使用可能時、ダメージタイプ、範囲の順。
同じアイコン、スキル番号の順。

## 更新履歴

- ver.0.0.1 (2021/02/23) 非公開版完成
- ver.0.1.0 (2022/03/08) 武器防具タイプソートに変更
- ver.0.2.0 (2022/03/10) 範囲・使用可能時でのソートに変更
- ver.1.0.0 (2022/03/17) 公開
- ver.1.1.0 (2022/05/27) 関数をクラスメソッドに変更
- ver.1.2.0 (2023/04/04) 特徴での追加スキルのソートに対応

 * 
 * 
 */

(() => {

"use strict";

//--------------------------------------
// アイテムリストのソート

const KRD_Window_ItemList_makeItemList = Window_ItemList.prototype.makeItemList;
Window_ItemList.prototype.makeItemList = function() {
	KRD_Window_ItemList_makeItemList.apply(this, arguments);
	this.sortList();
};

Window_ItemList.prototype.sortList = function() {
	if (this._data && this._data.length > 0) {
		if (DataManager.isItem(this._data[0])) {
			this._data.sort(compareItems);
		} else if (DataManager.isWeapon(this._data[0])) {
			this._data.sort(compareWeapons);
		} else if (DataManager.isArmor(this._data[0])) {
			this._data.sort(compareArmors);
		}
	}
};

const compareItems = function(a, b) {
	if (!a || !b) {
		return 0;
	}
	if (a.occasion === b.occasion) {
		if (a.damage.type === b.damage.type) {
			return forSortScope(a.scope) - forSortScope(b.scope);
		} else {
			return forSortDamageType(a.damage.type) - forSortDamageType(b.damage.type);
		}
	} else {
		return forSortOccasion(a.occasion) - forSortOccasion(b.occasion);
	}
};

const forSortOccasion = function(base) {
	return base === 1 || base === 3 ? base + 100 : base;
}

const forSortScope = function(base) {
	const isForOpponent = [1, 2, 3, 4, 5, 6, 14];
	const isForFriend = [7, 8, 9, 10, 11, 12, 13, 14];

	if (isForFriend.includes(base)) {
		return base;
	} else if (isForOpponent.includes(base)) {
		return base + 100;
	}
	return base;
}

const forSortDamageType = function(base) {
	return base === 3 || base === 4 ? base : base + 100;
};

const compareWeapons = function(a, b) {
	if (!a || !b) {
		return 0;
	}
	return a.wtypeId - b.wtypeId;
};

const compareArmors = function(a, b) {
	if (!a || !b) {
		return 0;
	}
	if (a.etypeId === b.etypeId) {
		return a.atypeId - b.atypeId;
	} else {
		return a.etypeId - b.etypeId;
	}
};

//--------------------------------------
// 基本項目ソート

const compareItemId = function(a, b) {
	return a.id - b.id;
};

const compareItemName = function(a, b) {
	return a.name - b.name;
};

const compareItemIconIndex = function(a, b) {
	return a.iconIndex - b.iconIndex;
};

const compareSkillCost = function(a, b) {
	return a.mpCost - b.mpCost;
};

//--------------------------------------
// スキルリストのソート

const KRD_Window_SkillList_makeItemList = Window_SkillList.prototype.makeItemList;
Window_SkillList.prototype.makeItemList = function() {
	KRD_Window_SkillList_makeItemList.apply(this, arguments);
	this.sortList();
};

Window_SkillList.prototype.sortList = function() {
	if (this._data && this._data.length > 0) {
		this._data.sort(compareSkills);
	}
};

const compareSkills = function(a, b) {
	if (!a || !b) {
		return 0;
	}
	
	const sortItem = compareItems(a, b);
	if (sortItem === 0) {
		const sortIcon = compareItemIconIndex(a, b);
		if (sortIcon === 0) {
			return compareItemId(a, b);
		}
	} else {
		return sortItem;
	}
};

//--------------------------------------
})();
