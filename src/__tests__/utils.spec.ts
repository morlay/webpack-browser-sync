import { test } from "ava";

import {
  getBaseDir,
} from "../utils";

test("#getBaseDir, by output.path", (t) => {
  t.is(getBaseDir("/a/b/c"), "/a/b/c");
});

test("#getBaseDir, by output.path and output.publicPath", (t) => {
  t.is(getBaseDir("/a/b/c", "/c/"), "/a/b");
  t.is(getBaseDir("/a/b/c", "/b/c/"), "/a");
});
