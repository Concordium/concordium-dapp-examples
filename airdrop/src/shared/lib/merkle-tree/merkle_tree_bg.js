let wasm;
export function __wbg_set_wasm(val) {
	wasm = val;
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) {
	return heap[idx];
}

let heap_next = heap.length;

function dropObject(idx) {
	if (idx < 132) return;
	heap[idx] = heap_next;
	heap_next = idx;
}

function takeObject(idx) {
	const ret = getObject(idx);
	dropObject(idx);
	return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = null;

function getUint8Memory0() {
	if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
		cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
	}
	return cachedUint8Memory0;
}

const lTextEncoder =
	typeof TextEncoder === 'undefined'
		? (0, module.require)('util').TextEncoder
		: TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString =
	typeof cachedTextEncoder.encodeInto === 'function'
		? function (arg, view) {
				return cachedTextEncoder.encodeInto(arg, view);
		  }
		: function (arg, view) {
				const buf = cachedTextEncoder.encode(arg);
				view.set(buf);
				return {
					read: arg.length,
					written: buf.length,
				};
		  };

function passStringToWasm0(arg, malloc, realloc) {
	if (realloc === undefined) {
		const buf = cachedTextEncoder.encode(arg);
		const ptr = malloc(buf.length) >>> 0;
		getUint8Memory0()
			.subarray(ptr, ptr + buf.length)
			.set(buf);
		WASM_VECTOR_LEN = buf.length;
		return ptr;
	}

	let len = arg.length;
	let ptr = malloc(len) >>> 0;

	const mem = getUint8Memory0();

	let offset = 0;

	for (; offset < len; offset++) {
		const code = arg.charCodeAt(offset);
		if (code > 0x7f) break;
		mem[ptr + offset] = code;
	}

	if (offset !== len) {
		if (offset !== 0) {
			arg = arg.slice(offset);
		}
		ptr = realloc(ptr, len, (len = offset + arg.length * 3)) >>> 0;
		const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
		const ret = encodeString(arg, view);

		offset += ret.written;
	}

	WASM_VECTOR_LEN = offset;
	return ptr;
}

function isLikeNone(x) {
	return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
	if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
		cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
	}
	return cachedInt32Memory0;
}

const lTextDecoder =
	typeof TextDecoder === 'undefined'
		? (0, module.require)('util').TextDecoder
		: TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', {
	ignoreBOM: true,
	fatal: true,
});

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
	ptr = ptr >>> 0;
	return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
	if (heap_next === heap.length) heap.push(heap.length + 1);
	const idx = heap_next;
	heap_next = heap[idx];

	heap[idx] = obj;
	return idx;
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
	if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
		cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
	}
	return cachedUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
	const ptr = malloc(array.length * 4) >>> 0;
	const mem = getUint32Memory0();
	for (let i = 0; i < array.length; i++) {
		mem[ptr / 4 + i] = addHeapObject(array[i]);
	}
	WASM_VECTOR_LEN = array.length;
	return ptr;
}
/**
 * @param {(string)[]} nodes
 * @returns {MerkleTree | undefined}
 */
export function create_hash_tree(nodes) {
	const ptr0 = passArrayJsValueToWasm0(nodes, wasm.__wbindgen_malloc);
	const len0 = WASM_VECTOR_LEN;
	const ret = wasm.create_hash_tree(ptr0, len0);
	return ret === 0 ? undefined : MerkleTree.__wrap(ret);
}

function _assertClass(instance, klass) {
	if (!(instance instanceof klass)) {
		throw new Error(`expected instance of ${klass.name}`);
	}
	return instance.ptr;
}

function getArrayJsValueFromWasm0(ptr, len) {
	ptr = ptr >>> 0;
	const mem = getUint32Memory0();
	const slice = mem.subarray(ptr / 4, ptr / 4 + len);
	const result = [];
	for (let i = 0; i < slice.length; i++) {
		result.push(takeObject(slice[i]));
	}
	return result;
}
/**
 * @param {string} test
 * @param {MerkleTree} merkle_tree
 * @returns {(string)[] | undefined}
 */
export function get_hash_proof(test, merkle_tree) {
	try {
		const returnPtr = wasm.__wbindgen_add_to_stack_pointer(-16);
		_assertClass(merkle_tree, MerkleTree);
		const ptr0 = merkle_tree.__destroy_into_raw();

		wasm.get_hash_proof(returnPtr, addHeapObject(test), ptr0);

		const r0 = getInt32Memory0()[returnPtr / 4];
		const r1 = getInt32Memory0()[returnPtr / 4 + 1];
		let v2;
		if (r0 !== 0) {
			v2 = getArrayJsValueFromWasm0(r0, r1).slice();
			wasm.__wbindgen_free(r0, r1 * 4);
		}
		return v2;
	} finally {
		wasm.__wbindgen_add_to_stack_pointer(16);
	}
}

/**
 * @param {ClaimNFTParams} test
 * @param {MerkleTree} merkle_tree
 * @returns {boolean}
 */
export function check_proof(test, merkle_tree) {
	_assertClass(test, ClaimNFTParams);
	_assertClass(merkle_tree, MerkleTree);
	var ptr0 = merkle_tree.__destroy_into_raw();
	const ret = wasm.check_proof(test.__wbg_ptr, ptr0);
	return ret !== 0;
}

/**
 * @param {MerkleTree} tree
 * @param {string} test_address
 * @returns {boolean}
 */
export function check_hash_value(tree, test_address) {
	_assertClass(tree, MerkleTree);
	var ptr0 = tree.__destroy_into_raw();
	const ptr1 = passStringToWasm0(
		test_address,
		wasm.__wbindgen_malloc,
		wasm.__wbindgen_realloc,
	);
	const len1 = WASM_VECTOR_LEN;
	const ret = wasm.check_hash_value(ptr0, ptr1, len1);
	return ret !== 0;
}

/**
 */
export class ClaimNFTParams {
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;

		return ptr;
	}

	free() {
		const ptr = this.__destroy_into_raw();
		wasm.__wbg_claimnftparams_free(ptr);
	}
}
/**
 */
export class MerkleTree {
	static __wrap(ptr) {
		ptr = ptr >>> 0;
		const obj = Object.create(MerkleTree.prototype);
		obj.__wbg_ptr = ptr;

		return obj;
	}

	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;

		return ptr;
	}

	free() {
		const ptr = this.__destroy_into_raw();
		wasm.__wbg_merkletree_free(ptr);
	}
}

export function __wbindgen_object_drop_ref(arg0) {
	takeObject(arg0);
}

export function __wbindgen_string_get(arg0, arg1) {
	const obj = getObject(arg1);
	const ret = typeof obj === 'string' ? obj : undefined;
	var ptr1 = isLikeNone(ret)
		? 0
		: passStringToWasm0(
				ret,
				wasm.__wbindgen_malloc,
				wasm.__wbindgen_realloc,
		  );
	var len1 = WASM_VECTOR_LEN;
	getInt32Memory0()[arg0 / 4 + 1] = len1;
	getInt32Memory0()[arg0 / 4 + 0] = ptr1;
}

export function __wbindgen_string_new(arg0, arg1) {
	const ret = getStringFromWasm0(arg0, arg1);
	return addHeapObject(ret);
}

export function __wbindgen_throw(arg0, arg1) {
	throw new Error(getStringFromWasm0(arg0, arg1));
}
