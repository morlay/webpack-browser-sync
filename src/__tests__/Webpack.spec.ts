import { test } from "ava";

import {
  patchEntryWithHMR,
  HMR_ENTRY,
} from "../Webpack";

test("#patchEntries, simple entry should be patched", (t) => {
  const entry = "a.js";

  t.deepEqual(patchEntryWithHMR(entry), [HMR_ENTRY, entry]);
});

test("#patchEntry, multi entries should be patched", (t) => {
  const entry = {
    a: "a.js",
    b: "b.js",
  };

  t.deepEqual(patchEntryWithHMR(entry), {
    a: [HMR_ENTRY, entry.a],
    b: [HMR_ENTRY, entry.b],
  });
});
