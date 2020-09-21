import React from 'react';
import { observer } from 'mobx-react';

import ListModel from './model/ListModel';
import ListService from './service/ListService';

import { ItemIndexer, RowRenderComponentType } from './types';

type Props<T> = {
    idKey: string;
    model: ListModel<T>;
    service: ListService<T>;
    rowRenderComponent: RowRenderComponentType<T>;
};

function List<T extends ItemIndexer>({ idKey, model, rowRenderComponent }: Props<T>) {
    const RowComponent = rowRenderComponent;

    return (
        <>
            {model.pageItems.map((item, index) => (
                <RowComponent key={item[idKey] || index} index={index} item={item} />
            ))}
        </>
    );
}

export default observer(List);
