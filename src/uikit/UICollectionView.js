"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIScrollView_1 = require("./UIScrollView");
const UIRect_1 = require("./UIRect");
const UIIndexPath_1 = require("./UIIndexPath");
const UISize_1 = require("./UISize");
const UIAffineTransform_1 = require("./UIAffineTransform");
const UIPoint_1 = require("./UIPoint");
const UIAnimator_1 = require("./UIAnimator");
const EventEmitter_1 = require("../kimi/EventEmitter");
const UITouch_1 = require("./UITouch");
var ItemType;
(function (ItemType) {
    ItemType[ItemType["cell"] = 0] = "cell";
    ItemType[ItemType["supplementaryView"] = 1] = "supplementaryView";
    ItemType[ItemType["decorationView"] = 2] = "decorationView";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
exports.UICollectionElementKindCell = "UICollectionElementKindCell";
let itemKeyCache = {};
class UICollectionViewItemKey {
    constructor(type = ItemType.cell, indexPath, identifier) {
        this.type = type;
        this.indexPath = indexPath;
        this.identifier = identifier;
    }
    static collectionItemKeyForCellWithIndexPath(indexPath) {
        const hashKey = `${0},${indexPath.mapKey()},UICollectionElementKindCell`;
        if (itemKeyCache[hashKey] !== undefined) {
            return itemKeyCache[hashKey];
        }
        else {
            let value = new UICollectionViewItemKey(ItemType.cell, indexPath, exports.UICollectionElementKindCell);
            itemKeyCache[hashKey] = value;
            return value;
        }
    }
    static collectionItemKeyForLayoutAttributes(layoutAttributes) {
        const hashKey = `${layoutAttributes.representedElementCategory},${layoutAttributes.indexPath.mapKey()},${layoutAttributes.representedElementKind}`;
        if (itemKeyCache[hashKey] !== undefined) {
            return itemKeyCache[hashKey];
        }
        else {
            let value = new UICollectionViewItemKey(layoutAttributes.representedElementCategory, layoutAttributes.indexPath, layoutAttributes.representedElementKind);
            itemKeyCache[hashKey] = value;
            return value;
        }
    }
}
exports.UICollectionViewItemKey = UICollectionViewItemKey;
class UICollectionViewLayoutAttributes {
    constructor(indexPath, elementKind = "", representedElementCategory = ItemType.cell) {
        this.indexPath = indexPath;
        this.elementKind = elementKind;
        this.representedElementCategory = representedElementCategory;
        this.frame = UIRect_1.UIRectZero;
        this.center = UIPoint_1.UIPointZero;
        this.size = UISize_1.UISizeZero;
        this.transform = UIAffineTransform_1.UIAffineTransformIdentity;
        this.alpha = 1.0;
        this.zIndex = 0;
        this.hidden = false;
        this.representedElementKind = this.elementKind;
    }
    isDecorationView() {
        return this.representedElementCategory === ItemType.decorationView;
    }
    isSupplementaryView() {
        return this.representedElementCategory === ItemType.supplementaryView;
    }
    isCell() {
        return this.representedElementCategory === ItemType.cell;
    }
    static layoutAttributesForCellWithIndexPath(indexPath) {
        return new UICollectionViewLayoutAttributes(indexPath, exports.UICollectionElementKindCell, ItemType.cell);
    }
    static layoutAttributesForSupplementaryViewOfKind(elementKind, indexPath) {
        return new UICollectionViewLayoutAttributes(indexPath, elementKind, ItemType.supplementaryView);
    }
    static layoutAttributesForDecorationViewOfKind(elementKind, indexPath) {
        return new UICollectionViewLayoutAttributes(indexPath, elementKind, ItemType.decorationView);
    }
}
exports.UICollectionViewLayoutAttributes = UICollectionViewLayoutAttributes;
class UICollectionViewLayout extends EventEmitter_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.layoutAttributesClass = UICollectionViewLayoutAttributes;
        this.collectionView = undefined;
    }
    prepareLayout() { }
    invalidateLayout() {
        if (this.collectionView && this.collectionView._collectionViewData) {
            this.collectionView._collectionViewData.invalidate();
        }
        if (this.collectionView) {
            this.collectionView.setNeedsLayout(true);
        }
    }
    layoutAttributesForElementsInRect(rect) {
        return [];
    }
    layoutAttributesForItemAtIndexPath(indexPath) {
        return undefined;
    }
    layoutAttributesForSupplementaryViewOfKind(kind, indexPath) {
        return undefined;
    }
    layoutAttributesForDecorationViewOfKind(kind, indexPath) {
        return undefined;
    }
    collectionViewContentSize() {
        return UISize_1.UISizeZero;
    }
}
exports.UICollectionViewLayout = UICollectionViewLayout;
class UICollectionView extends UIScrollView_1.UIScrollView {
    constructor(collectionViewLayout) {
        super();
        this.collectionViewLayout = collectionViewLayout;
        this.allowsSelection = true;
        this.allowsMultipleSelection = false;
        // Implementations
        this._allVisibleViewsDict = new Map();
        this._indexPathsForSelectedItems = [];
        this._indexPathsForHighlightedItems = [];
        this._registeredCells = {};
        this._collectionViewData = new UICollectionViewData(this, this.collectionViewLayout);
        this._cellReuseQueues = {};
        this._supplementaryViewReuseQueues = {};
        this._decorationViewReuseQueues = {};
        this.firstTouchPoint = undefined;
        this.firstTouchCell = undefined;
        collectionViewLayout.collectionView = this;
    }
    register(initializer, reuseIdentifier) {
        this._registeredCells[reuseIdentifier] = initializer;
    }
    dequeueReusableCell(reuseIdentifier, indexPath) {
        if (this._cellReuseQueues[reuseIdentifier] && this._cellReuseQueues[reuseIdentifier].length > 0) {
            const cell = this._cellReuseQueues[reuseIdentifier][0];
            if (cell instanceof UICollectionViewCell) {
                this._cellReuseQueues[reuseIdentifier].splice(0, 1);
                return cell;
            }
        }
        const initializer = this._registeredCells[reuseIdentifier];
        if (!initializer) {
            return new UICollectionViewCell();
        }
        const cell = initializer(undefined);
        cell.reuseIdentifier = reuseIdentifier;
        cell.collectionView = this;
        return cell;
    }
    allCells() {
        let result = [];
        this._allVisibleViewsDict.forEach(it => {
            if (it instanceof UICollectionViewCell) {
                result.push(it);
            }
        });
        return result;
    }
    visibleCells() {
        return this.allCells().filter(it => UIRect_1.UIRectIntersectsRect(this.visibleBoundRects, it.frame));
    }
    reloadData() {
        this.invalidateLayout();
        this._allVisibleViewsDict.forEach(it => {
            it.hidden = true;
        });
        this._allVisibleViewsDict.clear();
        this._indexPathsForSelectedItems.forEach((it) => {
            const cell = this.cellForItemAtIndexPath(it);
            if (cell) {
                cell.selected = false;
                cell.highlighted = false;
            }
        });
        this._indexPathsForSelectedItems = [];
        this._indexPathsForHighlightedItems = [];
        this.setNeedsLayout(true);
    }
    selectItem(indexPath, animated) {
        if (!this.allowsMultipleSelection) {
            this._indexPathsForSelectedItems.forEach(indexPath => {
                this._allVisibleViewsDict.forEach(it => {
                    if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                        it.selected = false;
                        this.emit("didDeselectItem", it.currentIndexPath, it);
                    }
                });
            });
            this._indexPathsForSelectedItems = [];
        }
        this._indexPathsForSelectedItems.push(indexPath);
        if (animated) {
            UIAnimator_1.UIAnimator.linear(0.5, () => {
                this._allVisibleViewsDict.forEach(it => {
                    if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                        it.selected = true;
                    }
                });
            }, undefined);
        }
        else {
            this._allVisibleViewsDict.forEach(it => {
                if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                    it.selected = true;
                }
            });
        }
    }
    deselectItem(indexPath, animated) {
        {
            const idx = this._indexPathsForSelectedItems.map(it => it.mapKey()).indexOf(indexPath.mapKey());
            if (idx >= 0) {
                this._indexPathsForSelectedItems.splice(idx, 1);
            }
        }
        if (animated) {
            UIAnimator_1.UIAnimator.linear(0.5, () => {
                this._allVisibleViewsDict.forEach(it => {
                    if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                        it.selected = false;
                    }
                });
            }, undefined);
        }
        else {
            this._allVisibleViewsDict.forEach(it => {
                if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                    it.selected = false;
                }
            });
        }
    }
    // Query Grid
    numberOfSections() {
        return this._collectionViewData.numberOfSections();
    }
    numberOfItemsInSection(section) {
        return this._collectionViewData.numberOfItemsInSection(section);
    }
    layoutAttributesForItemAtIndexPath(indexPath) {
        return this.collectionViewLayout.layoutAttributesForItemAtIndexPath(indexPath);
    }
    layoutAttributesForSupplementaryElementOfKind(kind, indexPath) {
        return this.collectionViewLayout.layoutAttributesForSupplementaryViewOfKind(kind, indexPath);
    }
    indexPathForItemAtPoint(point) {
        const targets = this.collectionViewLayout.layoutAttributesForElementsInRect({ x: point.x, y: point.y, width: 1.0, height: 1.0 });
        return targets[targets.length - 1].indexPath;
    }
    indexPathForCell(cell) {
        const keys = this._allVisibleViewsDict.keys();
        while (true) {
            const element = keys.next();
            if (element.done) {
                break;
            }
            if (this._allVisibleViewsDict.get(element.value) === cell) {
                return element.value.indexPath;
            }
        }
        return undefined;
    }
    cellForItemAtIndexPath(indexPath) {
        const keys = this._allVisibleViewsDict.keys();
        while (true) {
            const element = keys.next();
            if (element.done) {
                break;
            }
            if (element.value.indexPath.mapKey() === indexPath.mapKey()) {
                const cell = this._allVisibleViewsDict.get(element.value);
                if (cell instanceof UICollectionViewCell) {
                    return cell;
                }
            }
        }
        return undefined;
    }
    indexPathsForVisibleItems() {
        return this.visibleCells().filter(it => it.layoutAttributes !== undefined).map(it => it.layoutAttributes.indexPath);
    }
    indexPathsForSelectedItems() {
        return this._indexPathsForSelectedItems;
    }
    get visibleBoundRects() {
        return { x: 0.0, y: 0.0, width: Math.max(this.bounds.width, this.contentSize.width), height: Math.max(this.bounds.height, this.contentSize.height) };
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.layoutCollectionViews();
    }
    // Private
    layoutCollectionViews() {
        this._collectionViewData.validateLayoutInRect(this.visibleBoundRects);
        const contentRect = this._collectionViewData.collectionViewContentRect();
        this.contentSize = contentRect;
        this._collectionViewData.validateLayoutInRect(this.visibleBoundRects);
        this.updateVisibleCellsNow(true);
    }
    invalidateLayout() {
        this.collectionViewLayout.invalidateLayout();
        this._collectionViewData.invalidate();
    }
    updateVisibleCellsNow(now = false) {
        const layoutAttributesArray = this._collectionViewData.layoutAttributesForElementsInRect(this.visibleBoundRects);
        if (layoutAttributesArray.length === 0) {
            return;
        }
        const itemKeysToAddDict = new Map();
        layoutAttributesArray.forEach(layoutAttributes => {
            const itemKey = UICollectionViewItemKey.collectionItemKeyForLayoutAttributes(layoutAttributes);
            itemKeysToAddDict.set(itemKey, layoutAttributes);
            var view = this._allVisibleViewsDict.get(itemKey);
            if (view instanceof UICollectionReusableView) {
                if (view instanceof UICollectionViewCell) {
                    view.currentIndexPath = itemKey.indexPath;
                    view.highlighted = this._indexPathsForHighlightedItems.map(it => it.mapKey()).indexOf(itemKey.indexPath.mapKey()) >= 0;
                    view.selected = this._indexPathsForSelectedItems.map(it => it.mapKey()).indexOf(itemKey.indexPath.mapKey()) >= 0;
                }
                view.applyLayoutAttributes(layoutAttributes);
            }
            else {
                switch (itemKey.type) {
                    case ItemType.cell: {
                        view = this.createPreparedCellForItemAtIndexPath(itemKey.indexPath, layoutAttributes);
                        if (view instanceof UICollectionViewCell) {
                            view.currentIndexPath = itemKey.indexPath;
                            view.highlighted = this._indexPathsForHighlightedItems.map(it => it.mapKey()).indexOf(itemKey.indexPath.mapKey()) >= 0;
                            view.selected = this._indexPathsForSelectedItems.map(it => it.mapKey()).indexOf(itemKey.indexPath.mapKey()) >= 0;
                        }
                        break;
                    }
                    case ItemType.supplementaryView: {
                        view = this.createPreparedSupplementaryViewForElementOfKind(layoutAttributes.representedElementKind, layoutAttributes.indexPath, layoutAttributes);
                        break;
                    }
                    case ItemType.decorationView: {
                        view = undefined;
                    }
                }
                if (view instanceof UICollectionReusableView) {
                    this._allVisibleViewsDict.set(itemKey, view);
                    this.addControlledSubview(view);
                    view.applyLayoutAttributes(layoutAttributes);
                }
            }
        });
        const allVisibleItemKeys = (() => {
            let keys = [];
            let keySet = this._allVisibleViewsDict.keys();
            while (true) {
                const key = keySet.next();
                if (key.done) {
                    break;
                }
                keys.push(key.value);
            }
            return keys;
        })();
        itemKeysToAddDict.forEach((_, it) => {
            const idx = allVisibleItemKeys.indexOf(it);
            if (idx >= 0) {
                allVisibleItemKeys.splice(idx, 1);
            }
        });
        allVisibleItemKeys.forEach(itemKey => {
            const reusableView = this._allVisibleViewsDict.get(itemKey);
            if (reusableView) {
                reusableView.hidden = true;
                this._allVisibleViewsDict.delete(itemKey);
                switch (itemKey.type) {
                    case ItemType.cell: {
                        this.reuseCell(reusableView);
                        break;
                    }
                    case ItemType.supplementaryView: {
                        this.reuseSupplementaryView(reusableView);
                        break;
                    }
                    case ItemType.decorationView: {
                        this.reuseDecorationView(reusableView);
                        break;
                    }
                }
            }
        });
    }
    createPreparedCellForItemAtIndexPath(indexPath, layoutAttributes) {
        const cell = this.__cellForItemAtIndexPath(this, indexPath);
        return cell;
    }
    createPreparedSupplementaryViewForElementOfKind(kind, indexPath, layoutAttributes) {
        const view = this.__viewForSupplementaryElementOfKind(this, kind, indexPath);
        if (view) {
            view.applyLayoutAttributes(layoutAttributes);
        }
        return view;
    }
    addControlledSubview(subview) {
        if (subview.superview === undefined) {
            this.addSubview(subview);
        }
        subview.hidden = false;
    }
    queueReusableView(reusableView, queue, identifier) {
        reusableView.hidden = true;
        reusableView.prepareForReuse();
        if (queue[identifier] === undefined) {
            queue[identifier] = [];
        }
        const reusableViews = queue[identifier] || [];
        reusableViews.push(reusableView);
    }
    reuseCell(cell) {
        const reuseIdentifier = cell.reuseIdentifier;
        if (reuseIdentifier === undefined) {
            return;
        }
        this.queueReusableView(cell, this._cellReuseQueues, reuseIdentifier);
    }
    reuseSupplementaryView(supplementaryView) {
        const layoutAttributes = supplementaryView.layoutAttributes;
        const reuseIdentifier = supplementaryView.reuseIdentifier;
        if (layoutAttributes === undefined || reuseIdentifier === undefined) {
            return;
        }
        const kindAndIdentifier = "${layoutAttributes.elementKind}/$reuseIdentifier";
        this.queueReusableView(supplementaryView, this._supplementaryViewReuseQueues, kindAndIdentifier);
    }
    reuseDecorationView(decorationView) {
        const reuseIdentifier = decorationView.reuseIdentifier;
        if (reuseIdentifier === undefined) {
            return;
        }
        this.queueReusableView(decorationView, this._decorationViewReuseQueues, reuseIdentifier);
    }
    // Touches
    touchesBegan(touches) {
        super.touchesBegan(touches);
        const firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.began, firstTouch);
    }
    touchesMoved(touches) {
        super.touchesMoved(touches);
        const firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.moved, firstTouch);
    }
    touchesEnded(touches) {
        super.touchesEnded(touches);
        const firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.ended, firstTouch);
    }
    touchesCancelled(touches) {
        super.touchesCancelled(touches);
        const firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.cancelled, firstTouch);
    }
    handleTouch(phase, currentTouch) {
        if (!this.allowsSelection) {
            return;
        }
        switch (phase) {
            case UITouch_1.UITouchPhase.began: {
                if (!this.tracking) {
                    var hitTestView = currentTouch.view;
                    var cellShouldHighlighted = true;
                    while (hitTestView !== undefined) {
                        if (hitTestView instanceof UICollectionViewCell) {
                            break;
                        }
                        if (hitTestView.gestureRecognizers.length > 0) {
                            cellShouldHighlighted = false;
                        }
                        hitTestView = hitTestView.superview;
                    }
                    if (cellShouldHighlighted) {
                        this.firstTouchPoint = currentTouch.windowPoint;
                        if (hitTestView instanceof UICollectionViewCell) {
                            this.firstTouchCell = hitTestView;
                            setTimeout(() => {
                                if (this.firstTouchPoint === undefined || !(hitTestView instanceof UICollectionViewCell)) {
                                    return;
                                }
                                if (hitTestView.currentIndexPath) {
                                    this._indexPathsForHighlightedItems.push(hitTestView.currentIndexPath);
                                }
                                hitTestView.highlighted = true;
                            }, 150);
                        }
                    }
                }
                break;
            }
            case UITouch_1.UITouchPhase.moved: {
                if (this.firstTouchPoint && currentTouch.windowPoint) {
                    if (UIView_1.UIView.recognizedGesture !== undefined || Math.abs(currentTouch.windowPoint.y - this.firstTouchPoint.y) > 8) {
                        this._indexPathsForHighlightedItems = [];
                        this._allVisibleViewsDict.forEach(it => {
                            if (it instanceof UICollectionViewCell) {
                                it.highlighted = false;
                            }
                        });
                        this.firstTouchPoint = undefined;
                        this.firstTouchCell = undefined;
                    }
                }
                break;
            }
            case UITouch_1.UITouchPhase.ended: {
                if (this.firstTouchCell) {
                    const cell = this.firstTouchCell;
                    this._indexPathsForHighlightedItems = [];
                    if (!this.allowsMultipleSelection) {
                        this._indexPathsForSelectedItems.forEach(indexPath => {
                            this._allVisibleViewsDict.forEach((it, key) => {
                                if (key.indexPath && key.indexPath.mapKey() === indexPath.mapKey()) {
                                    if (it instanceof UICollectionViewCell) {
                                        it.selected = false;
                                        this.emit("didDeselectItem", it.currentIndexPath, it);
                                    }
                                }
                            });
                        });
                        this._indexPathsForSelectedItems = [];
                    }
                    this.firstTouchPoint = undefined;
                    this.firstTouchCell = undefined;
                    this._indexPathsForHighlightedItems = [];
                    this._allVisibleViewsDict.forEach(it => {
                        if (it instanceof UICollectionViewCell) {
                            it.highlighted = false;
                        }
                    });
                    if (cell.currentIndexPath) {
                        const idx = this._indexPathsForSelectedItems.map(it => it.mapKey()).indexOf(cell.currentIndexPath.mapKey());
                        if (idx >= 0) {
                            this._indexPathsForSelectedItems.splice(idx, 1);
                        }
                        else {
                            this._indexPathsForSelectedItems.push(cell.currentIndexPath);
                        }
                    }
                    cell.selected = !cell.selected;
                    if (cell.selected) {
                        this.emit("didSelectItem", cell.currentIndexPath, cell);
                    }
                    else {
                        this.emit("didDeselectItem", cell.currentIndexPath, cell);
                    }
                }
                else {
                    this.firstTouchPoint = undefined;
                    this.firstTouchCell = undefined;
                    this._indexPathsForHighlightedItems = [];
                    this._allVisibleViewsDict.forEach(it => {
                        if (it instanceof UICollectionViewCell) {
                            it.highlighted = false;
                        }
                    });
                }
                break;
            }
            case UITouch_1.UITouchPhase.cancelled: {
                this.firstTouchPoint = undefined;
                this.firstTouchCell = undefined;
                this._indexPathsForHighlightedItems = [];
                this._allVisibleViewsDict.forEach(it => {
                    if (it instanceof UICollectionViewCell) {
                        it.highlighted = false;
                    }
                });
                break;
            }
        }
    }
    // DataSource & Delegate
    __cellForItemAtIndexPath(collectionView, indexPath) {
        return collectionView.val("cellForItem", indexPath) || new UICollectionViewCell();
    }
    __viewForSupplementaryElementOfKind(collectionView, kind, indexPath) {
        return undefined;
    }
    __numberOfSections(collectionView) {
        const value = collectionView.val("numberOfSections");
        return typeof value === "number" ? value : 1;
    }
    __numberOfItemsInSection(collectionView, inSection) {
        const value = collectionView.val("numberOfItems", inSection);
        return typeof value === "number" ? value : 0;
    }
}
exports.UICollectionView = UICollectionView;
class UICollectionReusableView extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.collectionView = undefined;
        this.layoutAttributes = undefined;
        this.reuseIdentifier = undefined;
    }
    prepareForReuse() {
        this.layoutAttributes = undefined;
    }
    applyLayoutAttributes(layoutAttributes) {
        if (layoutAttributes !== this.layoutAttributes) {
            this.layoutAttributes = layoutAttributes;
            this.frame = layoutAttributes.frame;
            this.transform = layoutAttributes.transform;
        }
    }
}
exports.UICollectionReusableView = UICollectionReusableView;
class UICollectionViewCell extends UICollectionReusableView {
    constructor() {
        super();
        this._selected = false;
        this._highlighted = false;
        this.contentView = new UIView_1.UIView;
        this.currentIndexPath = undefined;
        this.addSubview(this.contentView);
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.emit("selected", this, value);
    }
    get highlighted() {
        return this._highlighted;
    }
    set highlighted(value) {
        this._highlighted = value;
        this.emit("highlighted", this, value);
    }
    prepareForReuse() {
        super.prepareForReuse();
        this.selected = false;
        this.highlighted = false;
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.contentView.frame = this.bounds;
    }
}
exports.UICollectionViewCell = UICollectionViewCell;
class UICollectionViewData {
    constructor(collectionView, layout) {
        this.collectionView = collectionView;
        this.layout = layout;
        this.layoutIsPrepared = false;
        this.itemCountsAreValid = false;
        this._numSections = 0;
        this._numItems = 0;
        this._sectionItemCounts = [];
        this.validLayoutRect = undefined;
        this.contentSize = UISize_1.UISizeZero;
        this.cachedLayoutAttributes = [];
    }
    validateLayoutInRect(rect) {
        this.validateItemCounts();
        this.prepareToLoadData();
        if (this.validLayoutRect === undefined || !UIRect_1.UIRectEqualToRect(this.validLayoutRect, rect)) {
            this.validLayoutRect = rect;
            this.cachedLayoutAttributes = this.layout.layoutAttributesForElementsInRect(rect).filter(it => {
                return it.isCell() || it.isDecorationView() || it.isSupplementaryView();
            });
        }
    }
    rectForItemAtIndexPath(indexPath) {
        return UIRect_1.UIRectZero;
    }
    globalIndexForItemAtIndexPath(indexPath) {
        return this.numberOfItemsBeforeSection(indexPath.section) + indexPath.row;
    }
    indexPathForItemAtGlobalIndex(index) {
        this.validateItemCounts();
        var section = 0;
        var countItems = 0;
        for (let i = 0; i < this._numSections; i++) {
            const section = i;
            const countIncludingThisSection = countItems + this._sectionItemCounts[section];
            if (countIncludingThisSection > index) {
                break;
            }
            countItems = countIncludingThisSection;
        }
        const item = index - countItems;
        return new UIIndexPath_1.UIIndexPath(item, section);
    }
    layoutAttributesForElementsInRect(rect) {
        this.validateLayoutInRect(rect);
        return this.cachedLayoutAttributes;
    }
    invalidate() {
        this.itemCountsAreValid = false;
        this.layoutIsPrepared = false;
        this.validLayoutRect = undefined;
    }
    numberOfItemsBeforeSection(section) {
        this.validateItemCounts();
        var returnCount = 0;
        for (let i = 0; i < section; i++) {
            returnCount += this._sectionItemCounts[i];
        }
        return returnCount;
    }
    numberOfItemsInSection(section) {
        this.validateItemCounts();
        if (section >= this._numSections || section < 0) {
            return 0;
        }
        return this._sectionItemCounts[section];
    }
    numberOfItems() {
        this.validateItemCounts();
        return this._numItems;
    }
    numberOfSections() {
        this.validateItemCounts();
        return this._numSections;
    }
    collectionViewContentRect() {
        return { x: 0.0, y: 0.0, width: this.contentSize.width, height: this.contentSize.height };
    }
    updateItemCounts() {
        const collectionView = this.collectionView;
        this._numSections = collectionView.__numberOfSections(collectionView);
        if (this._numSections <= 0) {
            this._numItems = 0;
            this._sectionItemCounts = [];
            this.itemCountsAreValid = true;
            return;
        }
        this._numItems = 0;
        const sectionItemCounts = [];
        for (let index = 0; index < this._numSections; index++) {
            const cellCount = collectionView.__numberOfItemsInSection(collectionView, index);
            sectionItemCounts.push(cellCount);
            this._numItems += cellCount;
        }
        this._sectionItemCounts = sectionItemCounts;
        this.itemCountsAreValid = true;
    }
    validateItemCounts() {
        if (!this.itemCountsAreValid) {
            this.updateItemCounts();
        }
    }
    prepareToLoadData() {
        if (!this.layoutIsPrepared) {
            this.layout.prepareLayout();
            this.contentSize = this.layout.collectionViewContentSize();
            this.layoutIsPrepared = true;
        }
    }
}
exports.UICollectionViewData = UICollectionViewData;
