import React from 'react';

import { RowRenderComponentProps } from 'common-components/List/types';
import { diInject, Dependence } from 'common-components/HOC';

import ListModel from 'common-components/List/model/ListModel';

import constants from 'main-scene/constants';

import { IBook } from 'global-types/api';

import { BookWrapper, Info, Author, Name } from './styled';

type Props = {
    model: ListModel<IBook>;
} & RowRenderComponentProps<IBook>;

function Book({ item }: Props) {
    return (
        <BookWrapper>
            <Info>
                <Name>{item.name}</Name>
                <Author>{item.author}</Author>
            </Info>
        </BookWrapper>
    );
}

const injected = diInject(Book, {
    model: new Dependence(constants.booksListModelName),
});

export default injected;
