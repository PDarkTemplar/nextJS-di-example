import { inject, injectable } from 'inversify';

import { IExternalService } from 'common-components/List/types';

import FetchService from 'stores/services/Fetch';

import { IBook } from 'global-types/api';

@injectable()
class LoadBooksService implements IExternalService<IBook> {
    private fetchService: FetchService;

    public constructor(@inject(FetchService.diKey) fetchService: FetchService) {
        this.fetchService = fetchService;
    }

    public getItems(loadPageNumber: number) {
        const books = this.fetchService.getBooks({
            page: loadPageNumber,
        });

        return {
            promise: books,
        };
    }
}

export default LoadBooksService;
