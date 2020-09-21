import { injectable } from 'inversify';

import { IBook } from 'global-types/api';

import { allBooks } from './mocks';

@injectable()
class FetchService {
    public static diKey = Symbol.for('FetchServiceKey');

    public async getBooks({ page }: { page: number }) {
        const books: IBook[] = await new Promise((resolve) => {
            setTimeout(() => {
                const result = allBooks.length > page ? allBooks[page] : [];
                resolve(result);
            }, 1000);
        });

        return books;
    }
}

export default FetchService;
