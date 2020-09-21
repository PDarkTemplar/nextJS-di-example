import { inject, injectable } from 'inversify';

import FetchService from 'stores/services/Fetch';

import ListModel from 'common-components/List/model/ListModel';

import { IBook } from 'global-types/api';

import constants from '../constants';

@injectable()
class MainPageService {
    public static diKey = Symbol.for('MainPageServiceKey');

    private fetchService: FetchService;

    private bookListModel: ListModel<IBook>;

    public constructor(
        @inject(FetchService.diKey) fetchService: FetchService,
        @inject(constants.booksListModelName) bookListModel: ListModel<IBook>
    ) {
        this.fetchService = fetchService;
        this.bookListModel = bookListModel;
    }

    public async loadBooks() {
        this.bookListModel.setIsLoading(true);

        const books = await this.fetchService.getBooks({ page: 1 });

        this.bookListModel.setPageItems(books, 0);

        this.bookListModel.setIsLoading(false);
    }
}

export default MainPageService;
