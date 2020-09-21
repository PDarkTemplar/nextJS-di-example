import React from 'react';

import 'reflect-metadata';

import { diInject, Dependence, withProvider } from 'common-components/HOC';
import ListModel from 'common-components/List/model/ListModel';

import Main from 'main-scene/index';
import container from 'main-scene/di.container';
import constants from 'main-scene/constants';

import defaultContainer from 'stores/default.container';
import FetchService from 'stores/services/Fetch';

import { IBook } from 'global-types/api';

type Props = {
    books: IBook[];
    booksListModel: ListModel<IBook>;
};

function Index({ books, booksListModel }: Props) {
    booksListModel.setPageItems(books, 0);

    return <Main />;
}

const injected = diInject(Index, {
    booksListModel: new Dependence(constants.booksListModelName),
});

const wrapped = withProvider(injected, container);

export const getStaticProps = async () => {
    const fetchService = defaultContainer.get<FetchService>(FetchService.diKey);

    const books: IBook[] = await fetchService.getBooks({ page: 0 });

    return {
        props: {
            books,
        },
    };
};

export default wrapped;
