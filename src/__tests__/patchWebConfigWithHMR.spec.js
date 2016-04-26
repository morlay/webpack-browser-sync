import { expect } from '@morlay/test-utils';
import _ from 'lodash';
import {
  patchEntry,
  patchPlugins,
  HMR_ENTRY,
  HMR_PLUGINS,
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

  describe('#patchPlugins', () => {
    it('plugins should be patched', () => {
      expect(patchPlugins([])).to.length(3);
      expect(patchPlugins(_.map(HMR_PLUGINS, (Plugin) => new Plugin()))).to.length(3);
    });
  });
});
