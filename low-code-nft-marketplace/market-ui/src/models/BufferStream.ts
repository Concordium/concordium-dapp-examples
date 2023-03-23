import { Buffer } from "buffer/";

/**
 * Handles deserialization from the underlying buffer.
 */
export class BufferStream {
	private buffer: Buffer;

	/**
	 * Counter of how many bytes have been read from the input buffer.
	 */
	private counter: number;

	constructor(buffer: Buffer) {
		this.buffer = buffer;
		this.counter = 0;
	}

	readUInt8(): number {
		let ret = this.buffer.readUInt8(this.counter);
		this.counter++;

		return ret;
	}

	readUInt16(): number {
		const ret = this.buffer.readUInt16LE(this.counter);
		this.counter += 2;

		return ret;
	}

	readUInt32(): number {
		const ret = this.buffer.readUInt32LE(this.counter);
		this.counter += 4;

		return ret;
	}

	readUBigInt(): bigint {
		const ret = this.buffer.readBigUInt64LE(this.counter) as bigint;
		this.counter += 8;

		return ret;
	}

	readBool(): boolean {
		return this.readByte() === 1;
	}

	readByte(): number {
		return this.readBytes(1)[0];
	}

	readBytes(bytesLength: number): Buffer {
		let ret = this.buffer.subarray(this.counter, this.counter + bytesLength);
		this.counter += bytesLength;

		return Buffer.from(ret);
	}
}
