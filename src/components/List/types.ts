import { ComponentClass, FunctionComponent } from 'react';

export type ItemsWrap<T> = {
    promise: Promise<T>;
};

export type ItemIndexer = {
    [index: string]: any;
};

export interface IExternalService<T> {
    getItems(loadPageNumber: number): ItemsWrap<T[]> | null;
}

export type RowRenderComponentProps<T> = {
    item: T;
    index: number;
};

export type RowRenderComponentType<T> =
    | ComponentClass<RowRenderComponentProps<T>>
    | FunctionComponent<RowRenderComponentProps<T>>;
