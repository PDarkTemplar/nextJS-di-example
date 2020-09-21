import { observable, action, computed } from 'mobx';

class Pagination {
    @observable
    public totalCount?: number;

    @observable
    public page = 0;

    @computed
    public get visible() {
        return !!this.normalizedCount && this.normalizedCount > this.itemsPerPage;
    }

    @computed
    public get pagesCount() {
        if (this.normalizedCount) {
            const pages = this.normalizedCount / this.itemsPerPage;
            return pages < 1 ? 1 : Math.ceil(pages);
        }
        return 1;
    }

    @computed
    public get normalizedCount() {
        if (this.totalCount) {
            const itemsLength = this.itemsLengthGetter();

            if (itemsLength < this.itemsPerPage) {
                return itemsLength;
            }

            return this.totalCount;
        }

        return this.totalCount;
    }

    public padding = 1;

    public itemsPerPage = 3;

    public tableCountRequestId?: number;

    public itemsLengthGetter: () => number;

    @observable
    public isExactCount = false;

    public constructor(itemsLengthGetter: () => number) {
        this.itemsLengthGetter = itemsLengthGetter;
    }

    @action
    public changeTotalCount(value: number) {
        this.totalCount = value;
    }

    @action
    public setPage(value: number) {
        this.page = value;
    }

    @action.bound
    public clear() {
        this.page = 1;
        this.totalCount = undefined;
        this.tableCountRequestId = undefined;
        this.isExactCount = false;
    }
}

export default Pagination;
