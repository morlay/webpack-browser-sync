import { expect } from '@morlay/test-utils';
import getBaseDir from '../getBaseDir';

describe(__filename, () => {
  context('getBaseDir should return the baseDir', () => {
    it('by output.path', () => {
      expect(getBaseDir({
        path: '/a/b/c',
      })).to.eql('/a/b/c');
    });

    it('by output.path and output.publicPath', () => {
      expect(getBaseDir({
        path: '/a/b/c',
        publicPath: '/c/',
      })).to.eql('/a/b');
      expect(getBaseDir({
        path: '/a/b/c',
        publicPath: '/b/c/',
      })).to.eql('/a');
    });
  });
});
