import * as wasm from './merkle_tree_bg.wasm';
import { __wbg_set_wasm } from './merkle_tree_bg.js';
__wbg_set_wasm(wasm);
export * from './merkle_tree_bg.js';
