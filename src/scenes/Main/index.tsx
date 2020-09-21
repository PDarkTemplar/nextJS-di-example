import React, { useCallback } from 'react';

import { diInject, Dependence } from 'common-components/HOC';
import List from 'common-components/List';
import ListModel from 'common-components/List/model/ListModel';
import ListService from 'common-components/List/service/ListService';
import Loader from 'common-components/Loader';

import { IBook } from 'global-types/api';

import Book from './components/Book';
import { ListWrapper, Header } from './components/styled';

import constants from './constants';

import MainPageService from './service/MainPage';

type Props = {
    booksListModel: ListModel<IBook>;
    listService: ListService<IBook>;
    service: MainPageService;
};

function Main({ listService, booksListModel }: Props) {
    const handleClick = useCallback(() => {
        listService.loadPage(booksListModel, booksListModel.pagination.page + 1);
    }, [listService, booksListModel]);
    console.log(booksListModel.selectedItem);
    if (booksListModel.isLoading) return <Loader />;

    return (
        <div>
            <Header>Books</Header>
            <ListWrapper>
                <List
                    idKey="id"
                    model={booksListModel}
                    service={listService}
                    rowRenderComponent={Book}
                />
            </ListWrapper>
            <button onClick={handleClick}>Next Page</button>
        </div>
    );
}

const injected = diInject(Main, {
    booksListModel: new Dependence(constants.booksListModelName),
    listService: new Dependence(ListService),
    service: new Dependence(MainPageService),
});

export default injected;
