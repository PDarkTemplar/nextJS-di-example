import { Container, interfaces } from 'inversify';

import { IBook } from 'global-types/api';

import ListModel from 'common-components/List/model/ListModel';
import ListService, {
    ListServiceExternalServiceKey,
} from 'common-components/List/service/ListService';

import constants from './constants';

import MainPageService from './service/MainPage';
import LoadBooksService from './service/LoadBooks';

const container: interfaces.Container = new Container();

container.bind<ListModel<IBook>>(constants.booksListModelName).to(ListModel).inSingletonScope();
container.bind(ListService.diKey).to(ListService);

container.bind<LoadBooksService>(ListServiceExternalServiceKey).to(LoadBooksService);

container.bind<MainPageService>(MainPageService.diKey).to(MainPageService).inSingletonScope();

export default container;
