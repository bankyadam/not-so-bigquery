# Not-So-BigQuery

### API Endpoints

Currently implemented REST API endpoints:

#### Projects
|     | METHOD | URI | Comment |
| --- | ------ | --- | ------- |
|     | GET    | /bigquery/v2/projects/{projectId}/serviceAccount |         |
|     | GET    | /bigquery/v2/projects |         |


#### Datasets
|     | METHOD | URI | Comment |
| --- | ------ | --- | ------- |
| ✅ | DELETE | /bigquery/v2/projects/{projectId}/datasets/{datasetId} |         |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/datasets/{datasetId} |         |
| ✅ | POST   | /bigquery/v2/projects/{projectId}/datasets |         |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/datasets |         |
|     | PATCH  | /bigquery/v2/projects/{projectId}/datasets/{datasetId} |         |
|     | PUT    | /bigquery/v2/projects/{projectId}/datasets/{datasetId} |         |


#### Tables
|     | METHOD | URI | Comment |
| --- | ------ | --- | ------- |
| ✅ | DELETE | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId} |         |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId} |         |
|     | POST   | /bigquery/v2/{resource=projects/*/datasets/*/tables/*}:getIamPolicy |         |
| ✅ | POST   | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables |         |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables |         |
|     | PATCH  | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId} |         |
|     | POST   | /bigquery/v2/{resource=projects/*/datasets/*/tables/*}:setIamPolicy |         |
|     | POST   | /bigquery/v2/{resource=projects/*/datasets/*/tables/*}:testIamPermissions |         |
|     | PUT    | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId} |         |


#### Jobs
|     | METHOD | URI | Comment |
| --- | ------ | --- | ------- |
|     | POST   | /bigquery/v2/projects/{projectId}/jobs/{jobId}/cancel |         |
|     | GET    | /bigquery/v2/projects/{projectId}/jobs/{jobId} |         |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/queries/{jobId} |         |
| ✅ | POST   | /bigquery/v2/projects/{projectId}/jobs |         |
|     | GET    | /bigquery/v2/projects/{projectId}/jobs |         |
|     | POST   | /bigquery/v2/projects/{projectId}/queries |         |


#### Tabledata
|     | METHOD | URI | Comment |
| --- | ------ | --- | ------- |
| ✅ | POST   | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId}/insertAll | Unsupported feature are listed in the [source](src/api/tables/insertAll/index.js) |
| ✅ | GET    | /bigquery/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId}/data | Unsupported feature are listed in the [source](src/api/tables/data/index.js) |

Models and Routines REST APIs to be implemented are not planned.
