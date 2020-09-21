import { Container, interfaces } from 'inversify';

import ListService from 'common-components/List/service/ListService';

import FetchService from './services/Fetch';

const container: interfaces.Container = new Container();

container.bind<FetchService>(FetchService.diKey).to(FetchService).inSingletonScope();
container.bind(ListService.diKey).to(ListService);

export default container;
