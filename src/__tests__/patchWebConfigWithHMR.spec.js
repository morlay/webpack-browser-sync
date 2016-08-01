import { expect } from '@morlay/tests';
import _ from 'lodash';
import {
  patchEntry,
  patchPlugins,
  HMR_ENTRY,
  getHmrPluginsByVersion,
} from '../patchWebConfigWithHMR';

describe(__filename, () => {
  describe('#patchEntries', () => {
    it('simple entry should be patched', () => {
      const entry = 'a.js';

      expect(patchEntry(entry)).to.eql([HMR_ENTRY, entry]);
    });

    it('multi entries should be patched', () => {
      const entry = {
        a: 'a.js',
        b: 'b.js',
      };

      expect(patchEntry(entry)).to.eql({
        a: [HMR_ENTRY, entry.a],
        b: [HMR_ENTRY, entry.b],
      });
    });
  });
});
