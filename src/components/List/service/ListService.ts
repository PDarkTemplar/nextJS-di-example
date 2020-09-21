import { inject, injectable } from 'inversify';

import ListModel from '../model/ListModel';

import { IExternalService } from '../types';

export const ListServiceExternalServiceKey = Symbol.for('ListServiceExternalServiceKey');

@injectable()
class ListService<T> {
    public static diKey = Symbol.for('ListServiceKey');

    private externalService: IExternalService<T>;

    public constructor(
        @inject(ListServiceExternalServiceKey) externalService: IExternalService<T>
    ) {
        this.externalService = externalService;
    }

    public async loadPage(model: ListModel<T>, loadPage: number) {
        const { pagination } = model;

        model.clearIndexes();

        if (model.getPageItems(loadPage).length) {
            pagination.setPage(loadPage);

            return;
        }

        model.setIsLoading(true);

        const wrap = this.externalService.getItems(loadPage);

        if (!wrap) return;

        const promise = await wrap.promise;

        model.tableRequestId = undefined;
        pagination.setPage(loadPage);
        model.setPageItems(promise, loadPage);
        model.setIsLoading(false);
    }
}

export default ListService;
