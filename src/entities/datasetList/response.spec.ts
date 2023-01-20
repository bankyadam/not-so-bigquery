import BaseEntityResponse from '../baseEntityResponse';
import DatasetListResponse from './response';
import DatasetResponse from '../dataset/response';
import { expect } from 'chai';

describe('DatasetListResponse', function() {
  it('extends BaseEntityResponse', function() {
    expect(new DatasetListResponse('p')).to.be.instanceof(BaseEntityResponse);
  });

  it('has proper TYPE set', function() {
    expect(new DatasetListResponse('p')).to.have.property('TYPE').that.eql('datasetList');
  });

  context('.compose()', function() {
    it('returns empty dataset', function() {
      const response = new DatasetListResponse('projectId', []);
      expect(response.compose()).to.have.property('datasets').that.is.an('array').and.lengthOf(0);
    });

    it('returns given dataset', function() {
      const response = new DatasetListResponse('projectId', ['d1']);
      const composite = response.compose();
      expect(composite).to.have.property('datasets').that.is.an('array').and.lengthOf(1);
      expect(composite.datasets[0]).to.be.eql(new DatasetResponse('projectId', 'd1'));
    });

    it('returns given datasets', function() {
      const response = new DatasetListResponse('projectId', ['d1', 'd2']);
      const composite = response.compose();
      expect(composite).to.have.property('datasets').that.is.an('array').and.lengthOf(2);
      expect(composite.datasets[0]).to.be.eql(new DatasetResponse('projectId', 'd1'));
      expect(composite.datasets[1]).to.be.eql(new DatasetResponse('projectId', 'd2'));
    });
  });
});
