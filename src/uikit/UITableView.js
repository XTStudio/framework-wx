"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIScrollView_1 = require("./UIScrollView");
const UIColor_1 = require("./UIColor");
const UIIndexPath_1 = require("./UIIndexPath");
const UIRect_1 = require("./UIRect");
const UIAnimator_1 = require("./UIAnimator");
const UITouch_1 = require("./UITouch");
// @Reference https://github.com/BigZaphod/Chameleon/blob/master/UIKit/Classes/UITableView.m
class UITableView extends UIScrollView_1.UIScrollView {
    constructor() {
        super();
        this.rowHeight = 44.0;
        this._tableHeaderView = undefined;
        this._tableFooterView = undefined;
        this.separatorColor = new UIColor_1.UIColor(0xbc / 255.0, 0xba / 255.0, 0xc1 / 255.0, 0.75);
        this.separatorInset = { top: 0, left: 15, bottom: 0, right: 0 };
        this.allowsSelection = true;
        this.allowsMultipleSelection = false;
        this._registeredCells = {};
        this._reusableCells = [];
        this._cachedCells = {};
        this._selectedRows = [];
        this._highlightedRow = undefined;
        this._sections = [];
        this.firstTouchPoint = undefined;
        this.firstTouchCell = undefined;
        this.alwaysBounceVertical = true;
    }
    get tableHeaderView() {
        return this._tableHeaderView;
    }
    set tableHeaderView(value) {
        if (this._tableHeaderView) {
            this._tableHeaderView.removeFromSuperview();
        }
        this._tableHeaderView = value;
        this._setContentSize();
        if (value) {
            this.addSubview(value);
        }
        this._layoutTableView();
    }
    get tableFooterView() {
        return this._tableFooterView;
    }
    set tableFooterView(value) {
        if (this._tableFooterView) {
            this._tableFooterView.removeFromSuperview();
        }
        this._tableFooterView = value;
        this._setContentSize();
        if (value) {
            this.addSubview(value);
        }
        this._layoutTableView();
    }
    register(initializer, reuseIdentifier) {
        this._registeredCells[reuseIdentifier] = initializer;
    }
    dequeueReusableCell(reuseIdentifier, indexPath) {
        for (let index = 0; index < this._reusableCells.length; index++) {
            if (this._reusableCells[index].reuseIdentifier == reuseIdentifier) {
                const cell = this._reusableCells[index];
                this._reusableCells.splice(index, 1);
                return cell;
            }
        }
        const cell = this._registeredCells[reuseIdentifier] ? this._registeredCells[reuseIdentifier]() : new UITableViewCell();
        cell.reuseIdentifier = reuseIdentifier;
        return cell;
    }
    reloadData() {
        if (this.fetchMoreControl && this.fetchMoreControl.fetching) {
            this._updateSectionsCache();
            this._setContentSize();
            this._layoutTableView();
            return;
        }
        Object.keys(this._cachedCells).forEach(it => {
            this._cachedCells[it].removeFromSuperview();
        });
        this._reusableCells.forEach(it => it.removeFromSuperview());
        this._reusableCells = [];
        this._cachedCells = {};
        this._updateSectionsCache();
        this._setContentSize();
        this._layoutTableView();
    }
    selectRow(indexPath, animated) {
        if (!this.allowsMultipleSelection) {
            this._selectedRows.forEach(indexPathKey => {
                const values = Object.keys(this._cachedCells).map(it => this._cachedCells[it]);
                for (let index = 0; index < values.length; index++) {
                    const element = values[index];
                    if (element.currentIndexPath && element.currentIndexPath.mapKey() === indexPathKey) {
                        element.selected = false;
                        element.emit("selected", element, false, false);
                        break;
                    }
                }
            });
            this._selectedRows = [];
        }
        this._selectedRows.push(indexPath.mapKey());
        const values = Object.keys(this._cachedCells).map(it => this._cachedCells[it]);
        for (let index = 0; index < values.length; index++) {
            const element = values[index];
            if (element.currentIndexPath && element.currentIndexPath.mapKey() === indexPath.mapKey()) {
                if (animated) {
                    UIAnimator_1.UIAnimator.linear(0.30, () => {
                        element.selected = true;
                    }, undefined);
                }
                else {
                    element.selected = true;
                }
                element.emit("selected", element, true, animated);
                break;
            }
        }
    }
    deselectRow(indexPath, animated) {
        const idx = this._selectedRows.indexOf(indexPath.mapKey());
        if (idx >= 0) {
            this._selectedRows.splice(idx, 1);
        }
        const values = Object.keys(this._cachedCells).map(it => this._cachedCells[it]);
        for (let index = 0; index < values.length; index++) {
            const element = values[index];
            if (element.currentIndexPath && element.currentIndexPath.mapKey() === indexPath.mapKey()) {
                if (animated) {
                    UIAnimator_1.UIAnimator.linear(0.30, () => {
                        element.selected = false;
                    }, undefined);
                }
                else {
                    element.selected = false;
                }
                element.emit("selected", element, false, false);
                break;
            }
        }
    }
    // DataSource & Delegate
    numberOfSections() {
        const value = this.val("numberOfSections");
        return typeof value === "number" ? value : 1;
    }
    numberOfRows(inSection) {
        const value = this.val("numberOfRows", inSection);
        return typeof value === "number" ? value : 0;
    }
    heightForRow(indexPath) {
        const value = this.val("heightForRow", indexPath);
        return typeof value === "number" ? value : this.rowHeight;
    }
    cellForRow(indexPath) {
        const value = this.val("cellForRow", indexPath);
        return value || new UITableViewCell();
    }
    viewForHeader(inSection) {
        return this.val("viewForHeader", inSection);
    }
    heightForHeader(inSection) {
        const value = this.val("heightForHeader", inSection);
        return typeof value === "number" ? value : 0.0;
    }
    viewForFooter(inSection) {
        return this.val("viewForFooter", inSection);
    }
    heightForFooter(inSection) {
        const value = this.val("heightForFooter", inSection);
        return typeof value === "number" ? value : 0.0;
    }
    didSelectRow(indexPath) {
    }
    didDeselectRow(indexPath) {
    }
    contentOffsetDidChanged() {
        this.touchesMoved([]);
    }
    layoutSubviews() {
        super.layoutSubviews();
        this._layoutTableView();
    }
    _updateSectionsCache() {
        this._sections.forEach((it) => {
            it.headerView && it.headerView.removeFromSuperview();
            it.footerView && it.footerView.removeFromSuperview();
        });
        this._sections = [];
        const numberOfSections = this.numberOfSections();
        for (let section = 0; section < numberOfSections; section++) {
            const numberOfRowsInSection = this.numberOfRows(section);
            const sectionRecord = new UITableViewSection();
            const rowHeights = Array(numberOfRowsInSection).fill(0).map((_, row) => {
                return this.heightForRow(new UIIndexPath_1.UIIndexPath(row, section));
            });
            const totalRowsHeight = rowHeights.length > 0 ? rowHeights.reduce((a, b) => a + b) : 0.0;
            const headerView = this.viewForHeader(section);
            if (headerView) {
                this.addSubview(headerView);
                sectionRecord.headerView = headerView;
                sectionRecord.headerHeight = this.heightForHeader(section);
            }
            else {
                sectionRecord.headerHeight = 0.0;
            }
            const footerView = this.viewForFooter(section);
            if (footerView) {
                this.addSubview(footerView);
                sectionRecord.footerView = footerView;
                sectionRecord.footerHeight = this.heightForFooter(section);
            }
            else {
                sectionRecord.footerHeight = 0.0;
            }
            sectionRecord.rowsHeight = totalRowsHeight;
            sectionRecord.setNumberOfRows(numberOfRowsInSection, rowHeights);
            this._sections.push(sectionRecord);
        }
    }
    _updateSectionsCacheIfNeeded() {
        if (this._sections.length == 0) {
            this._updateSectionsCache();
        }
    }
    _setContentSize() {
        this._updateSectionsCacheIfNeeded();
        const headerHeight = this.tableHeaderView ? this.tableHeaderView.frame.height : 0.0;
        const sectionsHeight = this._sections.length > 0 ? this._sections.map(it => it.sectionHeight()).reduce((a, b) => a + b) : 0.0;
        const footerHeight = this.tableFooterView ? this.tableFooterView.frame.height : 0.0;
        this.contentSize = {
            width: 0.0,
            height: headerHeight + sectionsHeight + footerHeight
        };
    }
    _layoutTableView() {
        const boundsSize = { width: this.bounds.width, height: this.bounds.height };
        let contentOffsetY = 0.0;
        let visibleBounds = { x: 0.0, y: contentOffsetY, width: boundsSize.width, height: this.contentSize.height };
        var tableHeight = 0.0;
        if (this.tableHeaderView) {
            this.tableHeaderView.frame = { x: 0.0, y: 0.0, width: boundsSize.width, height: this.tableHeaderView.frame.height };
            tableHeight += this.tableHeaderView.frame.height;
        }
        const numberOfSections = this._sections.length;
        for (let section = 0; section < numberOfSections; section++) {
            const sectionRect = this._rectForSection(section);
            tableHeight += sectionRect.height;
            if (UIRect_1.UIRectIntersectsRect(sectionRect, visibleBounds)) {
                const headerRect = this._rectForHeaderInSection(section);
                const footerRect = this._rectForFooterInSection(section);
                const sectionRecord = this._sections[section];
                const numberOfRows = sectionRecord.numberOfRows;
                if (sectionRecord.headerView) {
                    sectionRecord.headerView.frame = headerRect;
                }
                if (sectionRecord.footerView) {
                    sectionRecord.footerView.frame = footerRect;
                }
                var startIndex;
                var left = 0;
                var right = Math.max(0, sectionRecord.numberOfRows - 1);
                while (true) {
                    if (Math.abs(right - left) <= 1) {
                        startIndex = left;
                        break;
                    }
                    const mid = Math.ceil((right + left) / 2.0);
                    const indexPath = new UIIndexPath_1.UIIndexPath(mid, section);
                    const rowRect = this._rectForRowAtIndexPath(indexPath);
                    if (rowRect.y <= contentOffsetY && rowRect.y + rowRect.height >= contentOffsetY) {
                        startIndex = mid;
                        break;
                    }
                    else if (rowRect.y + rowRect.height < contentOffsetY) {
                        left = mid;
                    }
                    else if (rowRect.y > contentOffsetY) {
                        right = mid;
                    }
                }
                var renderCount = 0;
                for (let row = startIndex; row < numberOfRows; row++) {
                    renderCount++;
                    const indexPath = new UIIndexPath_1.UIIndexPath(row, section);
                    const rowRect = this._rectForRowAtIndexPath(indexPath);
                    if (UIRect_1.UIRectIntersectsRect(rowRect, visibleBounds) && rowRect.height > 0) {
                        var cell = this._cachedCells[indexPath.mapKey()] || this.cellForRow(indexPath);
                        if (this.fetchMoreControl &&
                            this.fetchMoreControl.fetching &&
                            cell.currentIndexPath &&
                            cell.currentIndexPath.mapKey() === indexPath.mapKey()) {
                            cell.setSeparator(row === numberOfRows - 1, this.separatorColor, this.separatorInset);
                            continue;
                        }
                        cell.currentIndexPath = indexPath;
                        cell.currentSectionRecord = sectionRecord;
                        this._cachedCells[indexPath.mapKey()] = cell;
                        cell.highlighted = this._highlightedRow == indexPath.mapKey();
                        cell.emit("highlighted", cell, cell.highlighted, false);
                        cell.selected = this._selectedRows.indexOf(indexPath.mapKey()) >= 0;
                        cell.emit("selected", cell, cell.selected, false);
                        cell.frame = rowRect;
                        cell.backgroundColor = this.backgroundColor;
                        if (cell.superview == undefined) {
                            this.addSubview(cell);
                        }
                        cell.setSeparator(row === numberOfRows - 1, this.separatorColor, this.separatorInset);
                    }
                    else if (renderCount > 100) {
                        break;
                    }
                }
            }
        }
        if (this.tableFooterView) {
            this.tableFooterView.frame = { x: 0.0, y: tableHeight, width: boundsSize.width, height: this.tableFooterView.frame.height };
        }
    }
    _rectForSection(section) {
        this._updateSectionsCacheIfNeeded();
        return this._UIRectFromVerticalOffset(this._offsetForSection(section), this._sections[section].sectionHeight());
    }
    _rectForHeaderInSection(section) {
        this._updateSectionsCacheIfNeeded();
        return this._UIRectFromVerticalOffset(this._offsetForSection(section), this._sections[section].headerHeight);
    }
    _rectForFooterInSection(section) {
        this._updateSectionsCacheIfNeeded();
        const sectionRecord = this._sections[section];
        var offset = this._offsetForSection(section);
        offset += sectionRecord.headerHeight;
        offset += sectionRecord.rowsHeight;
        return this._UIRectFromVerticalOffset(offset, this._sections[section].footerHeight);
    }
    _rectForRowAtIndexPath(indexPath) {
        this._updateSectionsCacheIfNeeded();
        if (indexPath.section < this._sections.length) {
            const sectionRecord = this._sections[indexPath.section];
            if (indexPath.row < sectionRecord.numberOfRows) {
                var offset = this._offsetForSection(indexPath.section);
                offset += sectionRecord.headerHeight;
                offset += sectionRecord.rowOriginYs[indexPath.row];
                return this._UIRectFromVerticalOffset(offset, sectionRecord.rowHeights[indexPath.row]);
            }
        }
        return UIRect_1.UIRectZero;
    }
    _offsetForSection(section) {
        let offset = this.tableHeaderView ? this.tableHeaderView.frame.height : 0.0;
        for (let it = 0; it < section; it++) {
            offset += this._sections[it].sectionHeight();
        }
        return offset;
    }
    _cellForRow(indexPath) {
        return this._cachedCells[indexPath.mapKey()];
    }
    _UIRectFromVerticalOffset(offset, height) {
        return { x: 0.0, y: offset, width: this.bounds.width, height: height };
    }
    // Touches
    touchesBegan(touches) {
        super.touchesBegan(touches);
        const firstTouch = touches[0];
        if (firstTouch === undefined) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.began, firstTouch);
    }
    touchesMoved(touches) {
        super.touchesMoved(touches);
        this.handleTouch(UITouch_1.UITouchPhase.moved, undefined);
    }
    touchesEnded(touches) {
        super.touchesEnded(touches);
        const firstTouch = touches[0];
        if (firstTouch === undefined) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.ended, firstTouch);
    }
    touchesCancelled(touches) {
        super.touchesCancelled(touches);
        const firstTouch = touches[0];
        if (firstTouch === undefined) {
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
                        if (hitTestView instanceof UITableViewCell) {
                            break;
                        }
                        if (hitTestView.gestureRecognizers.length > 0) {
                            cellShouldHighlighted = false;
                        }
                        hitTestView = hitTestView.superview;
                    }
                    if (cellShouldHighlighted) {
                        this.firstTouchPoint = currentTouch.windowPoint;
                        if (hitTestView instanceof UITableViewCell) {
                            this.firstTouchCell = hitTestView;
                            setTimeout(() => {
                                if (!(hitTestView instanceof UITableViewCell) || this.firstTouchPoint === undefined) {
                                    return;
                                }
                                if (hitTestView.currentIndexPath) {
                                    this._highlightedRow = hitTestView.currentIndexPath.mapKey();
                                }
                                hitTestView.highlighted = true;
                                hitTestView.emit("highlighted", hitTestView, true, false);
                            }, 150);
                        }
                    }
                }
                break;
            }
            case UITouch_1.UITouchPhase.moved: {
                if (this.firstTouchPoint !== undefined) {
                    this._highlightedRow = undefined;
                    Object.keys(this._cachedCells).map(it => this._cachedCells[it]).forEach((it) => {
                        it.highlighted = false;
                        it.emit("highlighted", it, true, false);
                    });
                    this.firstTouchPoint = undefined;
                    this.firstTouchCell = undefined;
                }
                break;
            }
            case UITouch_1.UITouchPhase.ended: {
                setTimeout(() => {
                    if (this.firstTouchCell) {
                        const cell = this.firstTouchCell;
                        this._highlightedRow = undefined;
                        if (!this.allowsMultipleSelection) {
                            this._selectedRows.forEach((indexPathKey) => {
                                Object.keys(this._cachedCells).map(it => this._cachedCells[it]).forEach((it) => {
                                    if (it.currentIndexPath && it.currentIndexPath.mapKey() === indexPathKey) {
                                        it.selected = false;
                                        it.emit("selected", it, false, false);
                                        this.emit("didDeselectRow", it.currentIndexPath, it);
                                    }
                                });
                            });
                            this._selectedRows = [];
                        }
                        this.firstTouchPoint = undefined;
                        this.firstTouchCell = undefined;
                        this._highlightedRow = undefined;
                        Object.keys(this._cachedCells).map(it => this._cachedCells[it]).forEach((it) => {
                            it.highlighted = false;
                            it.emit("highlighted", it, false, false);
                        });
                        if (cell.currentIndexPath) {
                            const it = cell.currentIndexPath.mapKey();
                            const idx = this._selectedRows.indexOf(it);
                            if (idx >= 0) {
                                this._selectedRows.splice(idx, 1);
                            }
                            else {
                                this._selectedRows.push(it);
                            }
                        }
                        cell.selected = !cell.selected;
                        cell.emit("selected", cell, cell.selected, false);
                        if (cell.selected) {
                            if (cell.currentIndexPath) {
                                this.didSelectRow(cell.currentIndexPath);
                            }
                            this.emit("didSelectRow", cell.currentIndexPath, cell);
                        }
                        else {
                            if (cell.currentIndexPath) {
                                this.didDeselectRow(cell.currentIndexPath);
                            }
                            this.emit("didDeselectRow", cell.currentIndexPath, cell);
                        }
                    }
                    else {
                        this.firstTouchPoint = undefined;
                        this.firstTouchCell = undefined;
                        this._highlightedRow = undefined;
                        Object.keys(this._cachedCells).map(it => this._cachedCells[it]).forEach((it) => {
                            it.highlighted = false;
                            it.emit("highlighted", it, false, false);
                        });
                    }
                }, 50);
                break;
            }
            case UITouch_1.UITouchPhase.cancelled: {
                this.firstTouchPoint = undefined;
                this.firstTouchCell = undefined;
                this._highlightedRow = undefined;
                Object.keys(this._cachedCells).map(it => this._cachedCells[it]).forEach((it) => {
                    it.highlighted = false;
                    it.emit("highlighted", it, false, false);
                });
                break;
            }
        }
    }
}
exports.UITableView = UITableView;
class UITableViewSection {
    constructor() {
        this.rowsHeight = 0.0;
        this.headerHeight = 0.0;
        this.footerHeight = 0.0;
        this.numberOfRows = 0;
        this.rowHeights = [];
        this.rowOriginYs = [];
        this.headerView = undefined;
        this.footerView = undefined;
    }
    sectionHeight() {
        return this.headerHeight + this.rowsHeight + this.footerHeight;
    }
    setNumberOfRows(rows, rowHeights) {
        this.numberOfRows = rows;
        this.rowHeights = rowHeights;
        this.rowOriginYs = [];
        let currentY = 0.0;
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            this.rowOriginYs.push(currentY);
            currentY += rowHeights[rowIndex];
        }
    }
}
class UITableViewCell extends UIView_1.UIView {
    constructor() {
        super();
        this.selectionView = new UIView_1.UIView();
        this.contentView = new UIView_1.UIView();
        this.reuseIdentifier = undefined;
        this.hasSelectionStyle = true;
        this._selected = false;
        this._highlighted = false;
        this.currentIndexPath = undefined;
        this.currentSectionRecord = undefined;
        this.restoringContentViewBackgroundColor = undefined;
        this.separatorStyle = undefined;
        this.selectionView.alpha = 0.0;
        this.selectionView.backgroundColor = new UIColor_1.UIColor(0xd0 / 255.0, 0xd0 / 255.0, 0xd0 / 255.0, 1.0);
        this.contentView.backgroundColor = UIColor_1.UIColor.white;
        this.addSubview(this.selectionView);
        this.addSubview(this.contentView);
        // this.domElement.appendChild(this.separatorElement)
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.onStateChanged();
    }
    get highlighted() {
        return this._highlighted;
    }
    set highlighted(value) {
        this._highlighted = value;
        this.onStateChanged();
    }
    onStateChanged() {
        if (this.hasSelectionStyle) {
            if (this.selected || this.highlighted) {
                if (this.restoringContentViewBackgroundColor == undefined) {
                    this.restoringContentViewBackgroundColor = this.contentView.backgroundColor;
                }
                this.selectionView.alpha = 1.0;
                this.contentView.backgroundColor = UIColor_1.UIColor.clear;
            }
            else {
                this.selectionView.alpha = 0.0;
                if (this.restoringContentViewBackgroundColor != undefined) {
                    this.contentView.backgroundColor = this.restoringContentViewBackgroundColor;
                    this.restoringContentViewBackgroundColor = undefined;
                }
            }
        }
    }
    setSeparator(hidden, color, insets) {
        if (hidden || color === undefined) {
            this.separatorStyle = undefined;
        }
        else {
            this.separatorStyle = `
            position: absolute;
            left: ${insets.left}px;
            right: ${insets.right}px;
            bottom: 0rpx;
            border-bottom-width: 1rpx;
            border-bottom-color: ${color.toStyle()};
            border-bottom-style: solid;
            `;
        }
        this.markFlagDirty("hasDecorView", "decorStyle");
    }
    buildData() {
        let data = super.buildData();
        data.hasDecorView = this.separatorStyle !== undefined;
        if (this.separatorStyle) {
            data.decorStyle = this.separatorStyle;
        }
        return data;
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.selectionView.frame = this.bounds;
        this.contentView.frame = this.bounds;
    }
}
exports.UITableViewCell = UITableViewCell;
