"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UISize_1 = require("./UISize");
const UIRect_1 = require("./UIRect");
const UIEdgeInsets_1 = require("./UIEdgeInsets");
const UICollectionView_1 = require("./UICollectionView");
const UIIndexPath_1 = require("./UIIndexPath");
var UICollectionViewScrollDirection;
(function (UICollectionViewScrollDirection) {
    UICollectionViewScrollDirection[UICollectionViewScrollDirection["vertical"] = 0] = "vertical";
    UICollectionViewScrollDirection[UICollectionViewScrollDirection["horizontal"] = 1] = "horizontal";
})(UICollectionViewScrollDirection = exports.UICollectionViewScrollDirection || (exports.UICollectionViewScrollDirection = {}));
const UIFlowLayoutCommonRowHorizontalAlignmentKey = "UIFlowLayoutCommonRowHorizontalAlignmentKey";
const UIFlowLayoutLastRowHorizontalAlignmentKey = "UIFlowLayoutLastRowHorizontalAlignmentKey";
const UIFlowLayoutRowVerticalAlignmentKey = "UIFlowLayoutRowVerticalAlignmentKey";
const UICollectionElementKindSectionHeader = "UICollectionElementKindSectionHeader";
const UICollectionElementKindSectionFooter = "UICollectionElementKindSectionFooter";
var UIFlowLayoutHorizontalAlignment;
(function (UIFlowLayoutHorizontalAlignment) {
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["left"] = 0] = "left";
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["center"] = 1] = "center";
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["right"] = 2] = "right";
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["justify"] = 3] = "justify";
})(UIFlowLayoutHorizontalAlignment = exports.UIFlowLayoutHorizontalAlignment || (exports.UIFlowLayoutHorizontalAlignment = {}));
class UIGridLayoutInfo {
    constructor() {
        this.sections = [];
        this.rowAlignmentOptions = {};
        this.usesFloatingHeaderFooter = false;
        this.dimension = 0.0;
        this.horizontal = false;
        this.leftToRight = false;
        this.contentSize = UISize_1.UISizeZero;
        this._isValid = false;
    }
    frameForItemAtIndexPath(indexPath) {
        const section = this.sections[indexPath.section];
        let itemFrame;
        if (section.fixedItemSize) {
            itemFrame = { x: 0.0, y: 0.0, width: section.itemSize.width, height: section.itemSize.height };
        }
        else {
            itemFrame = section.items[indexPath.row].itemFrame;
        }
        return itemFrame;
    }
    addSection() {
        const section = new UIGridLayoutSection();
        section.rowAlignmentOptions = this.rowAlignmentOptions;
        section.layoutInfo = this;
        this.sections.push(section);
        this.invalidate(false);
        return section;
    }
    invalidate(arg) {
        this._isValid = false;
    }
    snapshot() {
        const layoutInfo = new UIGridLayoutInfo();
        layoutInfo.sections = this.sections.slice(0);
        layoutInfo.rowAlignmentOptions = this.rowAlignmentOptions;
        layoutInfo.usesFloatingHeaderFooter = this.usesFloatingHeaderFooter;
        layoutInfo.dimension = this.dimension;
        layoutInfo.horizontal = this.horizontal;
        layoutInfo.leftToRight = this.leftToRight;
        layoutInfo.contentSize = Object.assign({}, this.contentSize);
        return layoutInfo;
    }
}
class UIGridLayoutSection {
    constructor() {
        this.items = [];
        this.rows = [];
        this.fixedItemSize = false;
        this.itemSize = UISize_1.UISizeZero;
        this._itemsCount = 0;
        this.verticalInterstice = 0.0;
        this.horizontalInterstice = 0.0;
        this.sectionMargins = UIEdgeInsets_1.UIEdgeInsetsZero;
        this.frame = UIRect_1.UIRectZero;
        this.headerFrame = UIRect_1.UIRectZero;
        this.footerFrame = UIRect_1.UIRectZero;
        this.headerDimension = 0.0;
        this.footerDimension = 0.0;
        this.layoutInfo = undefined;
        this.rowAlignmentOptions = {};
        this.otherMargin = 0.0;
        this.beginMargin = 0.0;
        this.endMargin = 0.0;
        this.actualGap = 0.0;
        this.lastRowBeginMargin = 0.0;
        this.lastRowEndMargin = 0.0;
        this.lastRowActualGap = 0.0;
        this.lastRowIncomplete = false;
        this.itemsByRowCount = 0;
        this.indexOfImcompleteRow = 0;
        this._isValid = false;
    }
    get itemsCount() {
        return this.fixedItemSize ? this._itemsCount : this.items.length;
    }
    set itemsCount(value) {
        this._itemsCount = value;
    }
    recomputeFromIndex(index) {
        this.invalidate();
        this.computeLayout();
    }
    invalidate() {
        this._isValid = false;
        this.rows = [];
    }
    computeLayout() {
        if (!this._isValid) {
            const layoutInfo = this.layoutInfo;
            if (layoutInfo === undefined) {
                return;
            }
            const sectionSize = { width: 0.0, height: 0.0 };
            var rowIndex = 0;
            var itemIndex = 0;
            var itemsByRowCount = 0;
            var dimensionLeft = 0.0;
            var row = undefined;
            const headerFooterDimension = layoutInfo.dimension;
            var dimension = headerFooterDimension;
            if (layoutInfo.horizontal) {
                dimension -= this.sectionMargins.top + this.sectionMargins.bottom;
                this.headerFrame = { x: sectionSize.width, y: 0.0, width: this.headerDimension, height: headerFooterDimension };
                sectionSize.width += this.headerDimension + this.sectionMargins.right;
            }
            else {
                dimension -= this.sectionMargins.left + this.sectionMargins.right;
                this.headerFrame = { x: 0.0, y: sectionSize.height, width: headerFooterDimension, height: this.headerDimension };
                sectionSize.height += this.headerDimension + this.sectionMargins.top;
            }
            const spacing = layoutInfo.horizontal ? this.verticalInterstice : this.horizontalInterstice;
            while (itemIndex <= this.itemsCount) {
                const finishCycle = itemIndex >= this.itemsCount;
                var item = undefined;
                if (!finishCycle) {
                    item = this.fixedItemSize ? undefined : this.items[itemIndex];
                }
                const itemSize = this.fixedItemSize ? this.itemSize : (item && item.itemFrame ? { width: item.itemFrame.width, height: item.itemFrame.height } : { width: 0, height: 0 });
                var itemDimension = layoutInfo.horizontal ? itemSize.height : itemSize.width;
                if (itemsByRowCount > 0) {
                    itemDimension += spacing;
                }
                if (dimensionLeft < itemDimension || finishCycle) {
                    if (row) {
                        this.itemsByRowCount = Math.max(itemsByRowCount, this.itemsByRowCount);
                        row.itemCount = itemsByRowCount;
                        if (!finishCycle) {
                            this.indexOfImcompleteRow = rowIndex;
                        }
                        row.layoutRow();
                        if (layoutInfo.horizontal) {
                            row.rowFrame = { x: sectionSize.width, y: this.sectionMargins.top, width: row.rowSize.width, height: row.rowSize.height };
                            sectionSize.height = Math.max(row.rowSize.height, sectionSize.height);
                            sectionSize.width += row.rowSize.width + (finishCycle ? 0.0 : this.horizontalInterstice);
                        }
                        else {
                            row.rowFrame = { x: this.sectionMargins.left, y: sectionSize.height, width: row.rowSize.width, height: row.rowSize.height };
                            sectionSize.height += row.rowSize.height + (finishCycle ? 0.0 : this.verticalInterstice);
                            sectionSize.width = Math.max(row.rowSize.width, sectionSize.width);
                        }
                    }
                    if (!finishCycle) {
                        if (row) {
                            row.complete = true;
                        }
                        row = this.addRow();
                        row.fixedItemSize = this.fixedItemSize;
                        row.index = rowIndex;
                        this.indexOfImcompleteRow = rowIndex;
                        rowIndex++;
                        if (itemsByRowCount > 0) {
                            itemDimension -= spacing;
                        }
                        dimensionLeft = dimension - itemDimension;
                        itemsByRowCount = 0;
                    }
                }
                else {
                    dimensionLeft -= itemDimension;
                }
                if (item && row) {
                    row.addItem(item);
                }
                itemIndex++;
                itemsByRowCount++;
            }
            if (layoutInfo.horizontal) {
                sectionSize.width += this.sectionMargins.right;
                this.footerFrame = { x: sectionSize.width, y: 0.0, width: this.footerDimension, height: headerFooterDimension };
                sectionSize.width += this.footerDimension;
            }
            else {
                sectionSize.height += this.sectionMargins.bottom;
                this.footerFrame = { x: 0.0, y: sectionSize.height, width: headerFooterDimension, height: this.footerDimension };
                sectionSize.height += this.footerDimension;
            }
            this.frame = { x: 0.0, y: 0.0, width: sectionSize.width, height: sectionSize.height };
            this._isValid = true;
        }
    }
    addItem() {
        const item = new UIGridLayoutItem();
        item.section = this;
        this.items.push(item);
        return item;
    }
    addRow() {
        const item = new UIGridLayoutRow();
        item.section = this;
        this.rows.push(item);
        return item;
    }
    snapshot() {
        const snapshotSection = new UIGridLayoutSection();
        snapshotSection.items = this.items.slice(0);
        snapshotSection.rows = this.rows.slice(0);
        snapshotSection.verticalInterstice = this.verticalInterstice;
        snapshotSection.horizontalInterstice = this.horizontalInterstice;
        snapshotSection.sectionMargins = this.sectionMargins;
        snapshotSection.frame = this.frame;
        snapshotSection.headerFrame = this.headerFrame;
        snapshotSection.footerFrame = this.footerFrame;
        snapshotSection.headerDimension = this.headerDimension;
        snapshotSection.footerDimension = this.footerDimension;
        snapshotSection.layoutInfo = this.layoutInfo;
        snapshotSection.rowAlignmentOptions = this.rowAlignmentOptions;
        snapshotSection.fixedItemSize = this.fixedItemSize;
        snapshotSection.itemSize = this.itemSize;
        snapshotSection.itemsCount = this.itemsCount;
        snapshotSection.otherMargin = this.otherMargin;
        snapshotSection.beginMargin = this.beginMargin;
        snapshotSection.endMargin = this.endMargin;
        snapshotSection.actualGap = this.actualGap;
        snapshotSection.lastRowBeginMargin = this.lastRowBeginMargin;
        snapshotSection.lastRowEndMargin = this.lastRowEndMargin;
        snapshotSection.lastRowActualGap = this.lastRowActualGap;
        snapshotSection.lastRowIncomplete = this.lastRowIncomplete;
        snapshotSection.itemsByRowCount = this.itemsByRowCount;
        snapshotSection.indexOfImcompleteRow = this.indexOfImcompleteRow;
        return snapshotSection;
    }
}
class UIGridLayoutItem {
    constructor() {
        this.section = undefined;
        this.rowObject = undefined;
        this.itemFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
    }
}
class UIGridLayoutRow {
    constructor() {
        this.section = undefined;
        this.items = [];
        this.rowSize = UISize_1.UISizeZero;
        this.rowFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
        this.index = 0;
        this.complete = false;
        this.fixedItemSize = false;
        this._itemCount = 0;
        this._isValid = false;
    }
    get itemCount() {
        return this.fixedItemSize ? this._itemCount : this.items.length;
    }
    set itemCount(value) {
        this._itemCount = value;
    }
    addItem(item) {
        this.items.push(item);
        item.rowObject = this;
        this.invalidate();
    }
    layoutRow() {
        this.layoutRowAndGenerateRectArray(false);
    }
    itemRects() {
        return this.layoutRowAndGenerateRectArray(true) || [];
    }
    invalidate() {
        this._isValid = false;
        this.rowSize = UISize_1.UISizeZero;
        this.rowFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
    }
    snapshot() {
        const snapshotRow = new UIGridLayoutRow();
        snapshotRow.section = this.section;
        snapshotRow.items = this.items;
        snapshotRow.rowSize = Object.assign({}, this.rowSize);
        snapshotRow.rowFrame = Object.assign({}, this.rowFrame);
        snapshotRow.index = this.index;
        snapshotRow.complete = this.complete;
        snapshotRow.fixedItemSize = this.fixedItemSize;
        snapshotRow.itemCount = this.itemCount;
        return snapshotRow;
    }
    layoutRowAndGenerateRectArray(generateRectArray) {
        const rects = generateRectArray ? [] : undefined;
        if (!this._isValid || generateRectArray) {
            const section = this.section;
            if (section === undefined) {
                return undefined;
            }
            const isHorizontal = section.layoutInfo && section.layoutInfo.horizontal ? true : false;
            const isLastRow = section.indexOfImcompleteRow == this.index;
            const horizontalAlignment = section.rowAlignmentOptions[isLastRow ? UIFlowLayoutLastRowHorizontalAlignmentKey : UIFlowLayoutCommonRowHorizontalAlignmentKey];
            if (horizontalAlignment === undefined) {
                return undefined;
            }
            var leftOverSpace = section.layoutInfo && section.layoutInfo.dimension || 0.0;
            if (isHorizontal) {
                leftOverSpace -= section.sectionMargins.top + section.sectionMargins.bottom;
            }
            else {
                leftOverSpace -= section.sectionMargins.left + section.sectionMargins.right;
            }
            var usedItemCount = 0;
            var itemIndex = 0;
            const spacing = isHorizontal ? section.verticalInterstice : section.horizontalInterstice;
            while (itemIndex < this.itemCount || isLastRow) {
                var nextItemSize;
                if (!this.fixedItemSize) {
                    const item = this.items[Math.min(itemIndex, this.itemCount - 1)];
                    nextItemSize = isHorizontal ? item.itemFrame.height : item.itemFrame.width;
                }
                else {
                    nextItemSize = isHorizontal ? section.itemSize.height : section.itemSize.width;
                }
                if (itemIndex > 0) {
                    nextItemSize += spacing;
                }
                if (leftOverSpace < nextItemSize) {
                    break;
                }
                leftOverSpace -= nextItemSize;
                itemIndex++;
                usedItemCount = itemIndex;
            }
            var itemOffset = { x: 0, y: 0 };
            if (horizontalAlignment == UIFlowLayoutHorizontalAlignment.right) {
                itemOffset.x += leftOverSpace;
            }
            else if (horizontalAlignment == UIFlowLayoutHorizontalAlignment.center ||
                (horizontalAlignment == UIFlowLayoutHorizontalAlignment.justify && usedItemCount == 1)) {
                itemOffset.x += leftOverSpace / 2.0;
            }
            const interSpacing = usedItemCount <= 1 ? 0.0 : leftOverSpace / (usedItemCount - 1);
            var frame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
            var itemFrame = { x: 0.0, y: 0.0, width: section.itemSize.width, height: section.itemSize.height };
            for (let itemIndex = 0; itemIndex < this.itemCount; itemIndex++) {
                var item = undefined;
                if (!this.fixedItemSize) {
                    item = this.items[itemIndex];
                    itemFrame = Object.assign({}, item.itemFrame);
                }
                if (isHorizontal) {
                    itemFrame.y = itemOffset.y;
                    itemOffset.y += itemFrame.height + section.verticalInterstice;
                    if (horizontalAlignment == UIFlowLayoutHorizontalAlignment.justify) {
                        itemOffset.y += interSpacing;
                    }
                }
                else {
                    itemFrame.x = itemOffset.x;
                    itemOffset.x += itemFrame.width + section.horizontalInterstice;
                    if (horizontalAlignment == UIFlowLayoutHorizontalAlignment.justify) {
                        itemOffset.x += interSpacing;
                    }
                }
                const iFrame = { x: itemFrame.x, y: itemFrame.y, width: itemFrame.width, height: itemFrame.height };
                if (item) {
                    item.itemFrame = iFrame;
                }
                if (rects) {
                    rects.push(iFrame);
                }
                frame = UIRect_1.UIRectUnion(frame, iFrame);
            }
            this.rowSize = { width: frame.width, height: frame.height };
            this._isValid = true;
        }
        return rects;
    }
}
class UICollectionViewFlowLayout extends UICollectionView_1.UICollectionViewLayout {
    constructor() {
        super(...arguments);
        this._data = undefined;
        this.minimumLineSpacing = 10.0;
        this.minimumInteritemSpacing = 10.0;
        this.itemSize = { width: 50.0, height: 50.0 };
        this.headerReferenceSize = UISize_1.UISizeZero;
        this.footerReferenceSize = UISize_1.UISizeZero;
        this._sectionInset = UIEdgeInsets_1.UIEdgeInsetsZero;
        this.scrollDirection = UICollectionViewScrollDirection.vertical;
        this.rowAlignmentOptions = {
            [UIFlowLayoutCommonRowHorizontalAlignmentKey]: UIFlowLayoutHorizontalAlignment.justify,
            [UIFlowLayoutLastRowHorizontalAlignmentKey]: UIFlowLayoutHorizontalAlignment.justify,
            [UIFlowLayoutRowVerticalAlignmentKey]: 1,
        };
        this._visibleBounds = UIRect_1.UIRectZero;
        this.rectCache = [];
    }
    get sectionInset() {
        return this._sectionInset;
    }
    set sectionInset(value) {
        this._sectionInset = value;
        this.invalidateLayout();
    }
    prepareLayout() {
        super.prepareLayout();
        const data = new UIGridLayoutInfo();
        data.horizontal = this.scrollDirection == UICollectionViewScrollDirection.horizontal;
        this._visibleBounds = this.collectionView ? this.collectionView.visibleBoundRects : UIRect_1.UIRectZero;
        data.dimension = data.horizontal ? this._visibleBounds.height : this._visibleBounds.width;
        data.rowAlignmentOptions = this.rowAlignmentOptions;
        this._data = data;
        this.fetchItemsInfo();
    }
    layoutAttributesForElementsInRect(rect) {
        if (this._data == undefined) {
            this.prepareLayout();
        }
        const layoutAttributesArray = [];
        const _data = this._data;
        if (_data === undefined) {
            return [];
        }
        _data.sections.forEach((section, sectionIndex) => {
            if (true || UIRect_1.UIRectIntersectsRect(section.frame, rect)) {
                const rectCache = this.rectCache;
                const normalizedHeaderFrame = { x: section.headerFrame.x + section.frame.x, y: section.headerFrame.y + section.frame.y, width: section.headerFrame.width, height: section.headerFrame.height };
                if (!UIRect_1.UIRectIsEmpty(normalizedHeaderFrame) && UIRect_1.UIRectIntersectsRect(normalizedHeaderFrame, rect)) {
                    const layoutAttributes = new this.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(0, sectionIndex), UICollectionElementKindSectionHeader, UICollectionView_1.ItemType.supplementaryView);
                    layoutAttributes.frame = normalizedHeaderFrame;
                    layoutAttributesArray.push(layoutAttributes);
                }
                var itemRects = rectCache[sectionIndex];
                if (itemRects === undefined && section.fixedItemSize && section.rows.length > 0) {
                    itemRects = section.rows[0].itemRects();
                    if (itemRects != undefined) {
                        rectCache[sectionIndex] = itemRects;
                    }
                }
                section.rows.forEach(row => {
                    const normalizedRowFrame = { x: row.rowFrame.x + section.frame.x, y: row.rowFrame.y + section.frame.y, width: row.rowFrame.width, height: row.rowFrame.height };
                    if (UIRect_1.UIRectIntersectsRect(normalizedRowFrame, rect)) {
                        for (let itemIndex = 0; itemIndex < row.itemCount; itemIndex++) {
                            let layoutAttributes;
                            let sectionItemIndex;
                            let itemFrame;
                            if (row.fixedItemSize) {
                                itemFrame = itemRects[itemIndex] || UIRect_1.UIRectZero;
                                sectionItemIndex = row.index * section.itemsByRowCount + itemIndex;
                            }
                            else {
                                const item = row.items[itemIndex];
                                sectionItemIndex = section.items.indexOf(item);
                                itemFrame = item.itemFrame;
                            }
                            const normalizedItemFrame = { x: normalizedRowFrame.x + itemFrame.x, y: normalizedRowFrame.y + itemFrame.y, width: itemFrame.width, height: itemFrame.height };
                            if (UIRect_1.UIRectIntersectsRect(normalizedItemFrame, rect)) {
                                layoutAttributes = new this.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(sectionItemIndex, sectionIndex), UICollectionView_1.UICollectionElementKindCell, UICollectionView_1.ItemType.cell);
                                layoutAttributes.frame = normalizedItemFrame;
                                layoutAttributesArray.push(layoutAttributes);
                            }
                        }
                    }
                });
                const normalizedFooterFrame = { x: section.footerFrame.x + section.frame.x, y: section.footerFrame.y + section.frame.y, width: section.footerFrame.width, height: section.footerFrame.height };
                if (!UIRect_1.UIRectIsEmpty(normalizedFooterFrame) && UIRect_1.UIRectIntersectsRect(normalizedFooterFrame, rect)) {
                    const layoutAttributes = new this.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(0, sectionIndex), UICollectionElementKindSectionFooter, UICollectionView_1.ItemType.supplementaryView);
                    layoutAttributes.frame = normalizedFooterFrame;
                    layoutAttributesArray.push(layoutAttributes);
                }
            }
        });
        return layoutAttributesArray;
    }
    layoutAttributesForItemAtIndexPath(indexPath) {
        if (this._data === undefined) {
            this.prepareLayout();
        }
        const _data = this._data;
        if (_data === undefined) {
            return undefined;
        }
        const section = _data.sections[indexPath.section];
        var row = undefined;
        var itemFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
        if (section.fixedItemSize && section.itemsByRowCount > 0 && indexPath.row / section.itemsByRowCount < section.rows.length) {
            row = section.rows[(indexPath.row / section.itemsByRowCount)];
            const itemIndex = (indexPath.row % section.itemsByRowCount);
            const itemRects = row.itemRects();
            itemFrame = itemRects[itemIndex];
        }
        else if (indexPath.row < section.items.length) {
            const item = section.items[indexPath.row];
            row = item.rowObject;
            itemFrame = item.itemFrame;
        }
        const layoutAttributes = new this.layoutAttributesClass(indexPath, UICollectionView_1.UICollectionElementKindCell, UICollectionView_1.ItemType.cell);
        if (row) {
            const normalizedRowFrame = { x: row.rowFrame.x + section.frame.x, y: row.rowFrame.y + section.frame.y, width: row.rowFrame.width, height: row.rowFrame.height };
            layoutAttributes.frame = { x: normalizedRowFrame.x + itemFrame.x, y: normalizedRowFrame.y + itemFrame.y, width: itemFrame.width, height: itemFrame.height };
        }
        return layoutAttributes;
    }
    layoutAttributesForSupplementaryViewOfKind(kind, indexPath) {
        if (this._data === undefined) {
            this.prepareLayout();
        }
        const _data = this._data;
        if (_data === undefined) {
            return undefined;
        }
        const sectionIndex = indexPath.section;
        var layoutAttributes = undefined;
        if (sectionIndex < _data.sections.length) {
            const section = _data.sections[sectionIndex];
            var normalizedFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
            if (kind == UICollectionElementKindSectionHeader) {
                normalizedFrame = section.headerFrame;
            }
            else if (kind == UICollectionElementKindSectionFooter) {
                normalizedFrame = section.footerFrame;
            }
            if (!UIRect_1.UIRectIsEmpty(normalizedFrame)) {
                normalizedFrame = { x: normalizedFrame.x + section.frame.x, y: normalizedFrame.y + section.frame.y, width: normalizedFrame.width, height: normalizedFrame.height };
                layoutAttributes = new this.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(0, sectionIndex), kind, UICollectionView_1.ItemType.supplementaryView);
                layoutAttributes.frame = normalizedFrame;
            }
        }
        return layoutAttributes;
    }
    layoutAttributesForDecorationViewOfKind(kind, indexPath) {
        return undefined;
    }
    collectionViewContentSize() {
        if (this._data === undefined) {
            this.prepareLayout();
        }
        const _data = this._data;
        if (_data === undefined) {
            return super.collectionViewContentSize();
        }
        return _data.contentSize;
    }
    invalidateLayout() {
        super.invalidateLayout();
        this.rectCache = [];
        this._data = undefined;
    }
    __sizeForItem(indexPath) {
        return this.val("sizeForItem", indexPath) || this.itemSize;
    }
    __insetForSection(inSection) {
        return this.val("insetForSection", inSection) || this.sectionInset;
    }
    __minimumLineSpacing(inSection) {
        const value = this.val("minimumLineSpacing", inSection);
        return typeof value === "number" ? value : this.minimumLineSpacing;
    }
    __minimumInteritemSpacing(inSection) {
        const value = this.val("minimumInteritemSpacing", inSection);
        return typeof value === "number" ? value : this.minimumInteritemSpacing;
    }
    __referenceSizeForHeader(inSection) {
        return this.headerReferenceSize;
    }
    __referenceSizeForFooter(inSection) {
        return this.footerReferenceSize;
    }
    fetchItemsInfo() {
        this.getSizingInfos();
        this.updateItemsLayout();
    }
    getSizingInfos() {
        const _data = this._data;
        if (_data === undefined) {
            return;
        }
        const collectionView = this.collectionView;
        if (collectionView === undefined) {
            return;
        }
        const numberOfSections = collectionView.numberOfSections();
        for (let section = 0; section < numberOfSections; section++) {
            const layoutSection = _data.addSection();
            layoutSection.verticalInterstice = _data.horizontal ? this.__minimumInteritemSpacing(section) : this.__minimumLineSpacing(section);
            layoutSection.horizontalInterstice = !_data.horizontal ? this.__minimumInteritemSpacing(section) : this.__minimumLineSpacing(section);
            layoutSection.sectionMargins = this.__insetForSection(section);
            layoutSection.headerDimension = _data.horizontal ? this.__referenceSizeForHeader(section).width : this.__referenceSizeForHeader(section).height;
            layoutSection.footerDimension = _data.horizontal ? this.__referenceSizeForFooter(section).width : this.__referenceSizeForFooter(section).height;
            const numberOfItems = collectionView.numberOfItemsInSection(section);
            for (let item = 0; item < numberOfItems; item++) {
                const indexPath = new UIIndexPath_1.UIIndexPath(item, section);
                const itemSize = this.__sizeForItem(indexPath);
                const layoutItem = layoutSection.addItem();
                layoutItem.itemFrame = { x: 0.0, y: 0.0, width: itemSize.width, height: itemSize.height };
            }
        }
    }
    updateItemsLayout() {
        const _data = this._data;
        if (_data === undefined) {
            return;
        }
        var contentSize = { width: 0, height: 0 };
        _data.sections.forEach((section) => {
            section.computeLayout();
            const sectionFrame = Object.assign({}, section.frame);
            if (_data.horizontal) {
                sectionFrame.x += contentSize.width;
                contentSize.width += section.frame.width + section.frame.x;
                contentSize.height = Math.max(contentSize.height, sectionFrame.height + section.frame.y + section.sectionMargins.top + section.sectionMargins.bottom);
            }
            else {
                sectionFrame.y += contentSize.height;
                contentSize.height += sectionFrame.height + section.frame.y;
                contentSize.width = Math.max(contentSize.width, sectionFrame.width + section.frame.x + section.sectionMargins.left + section.sectionMargins.right);
            }
            section.frame = { x: sectionFrame.x, y: sectionFrame.y, width: sectionFrame.width, height: sectionFrame.height };
        });
        _data.contentSize = { width: contentSize.width, height: contentSize.height };
    }
}
exports.UICollectionViewFlowLayout = UICollectionViewFlowLayout;
