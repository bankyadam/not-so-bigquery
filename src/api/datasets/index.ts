import { ApiRouterFactory } from '../types/apiRouterFactory';
import { Router } from 'express';

import routerFactory from '../../lib/router-factory';
import tables from '../tables';
import DatasetsListAction from './list';
import DatasetsInsertAction from './insert';
import DatasetsGetAction from './get';
import DatasetsDeleteAction from './delete';
import DatasetsPatchAction from './patch';
import DatasetsUpdateAction from './update';

const apiFactory: ApiRouterFactory = (router: Router) => {
  router.use('/:datasetId/tables', tables);

  router.get('/', DatasetsListAction.createHandler());
  router.post('/', DatasetsInsertAction.createHandler());
  router.get('/:datasetId', DatasetsGetAction.createHandler());
  router.delete('/:datasetId', DatasetsDeleteAction.createHandler());

  // Not implemented
  router.patch('/:datasetId', DatasetsPatchAction.createHandler());
  router.put('/:datasetId', DatasetsUpdateAction.createHandler());
};

export default routerFactory(apiFactory);

