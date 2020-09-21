import { injectable } from 'inversify';
import { observable, action, computed } from 'mobx';

import Pagination from './Pagination';

@injectable()
class ListModel<T> {
    public static diKey = Symbol.for('ListModelKey');

    @observable
    public items: {
        [index: number]: T[];
    } = {};

    @observable
    public hoveredIndex = -1;

    @observable
    public highlightIndexes: number[] = [];

    @observable
    public selectedIndex: number | null = null;

    @observable
    public isLoading = false;

    public tableRequestId?: number;

    public pagination: Pagination;

    @computed
    public get pageItems() {
        return this.getPageItems(this.pagination.page);
    }

    @computed
    public get selectedItem() {
        const items = this.pageItems;

        return this.selectedIndex != null ? items[this.selectedIndex] : null;
    }

    @computed
    public get itemsLength() {
        let length = 0;

        Object.values(this.items).forEach((k) => {
            length += k.length;
        });

        return length;
    }

    @computed
    public get notFound() {
        return !this.pageItems.length && !this.isLoading;
    }

    public constructor() {
        this.pagination = new Pagination(() => this.itemsLength);
    }

    @action
    public setIsLoading(value: boolean) {
        this.isLoading = value;
    }

    public getPageItems(page: number) {
        return this.items[page] || [];
    }

    @action
    public setPageItems(items: T[], pageIndex: number) {
        this.items[pageIndex] = items;
    }

    @action
    public addHighlightIndex(index: number) {
        if (this.highlightIndexes.some((x) => x === index)) return;

        this.highlightIndexes.push(index);
    }

    @action
    public removeHighlightIndex(index: number) {
        const arrayIndex = this.highlightIndexes.findIndex((x) => x === index);

        if (arrayIndex > -1) {
            this.highlightIndexes.splice(arrayIndex, 1);
        }
    }

    @action
    public setSelectedIndex(index: number | null) {
        this.selectedIndex = index;
    }

    @action
    public setHoveredIndex(index: number) {
        this.hoveredIndex = index;
    }

    @action
    public clearIndexes() {
        this.highlightIndexes = [];
        this.selectedIndex = null;
        this.hoveredIndex = -1;
    }

    @action
    public clear() {
        this.items = {};
        this.hoveredIndex = -1;
        this.highlightIndexes = [];
        this.selectedIndex = null;
        this.isLoading = false;

        this.pagination.clear();
    }
}

export default ListModel;
