import { AccountAddress, ContractAddress } from "@concordium/web-sdk";

import { Address } from "./Cis2Types";
import { BufferStream } from "./BufferStream";

/**
 * Handles reading General Concordium Smart Contract types from Underlying Schema.
 */
export class ConcordiumDeserializer extends BufferStream {
	readAddress(): Address {
		let addressType = this.readEnumType();

		let ret: Address;
		switch (addressType) {
			case 0:
				ret = this.readAccountAddress();
				break;
			case 1:
				ret = this.readContractAddress();
				break;
			default:
				throw Error("invalid address type:" + addressType);
		}

		return ret;
	}

	readContractAddress(): ContractAddress {
		let index = this.readUBigInt();
		let subindex = this.readUBigInt();

		return { index, subindex };
	}

	readAccountAddress(): string {
		let ret = this.readBytes(32);

		return AccountAddress.fromBytes(ret as any).address;
	}

	readVector<T>(itemDeserialFn: () => T, sizeLength: number = 4): T[] {
		let ret: T[] = [];
		const vectorLength = this.readNumberByByteSize(sizeLength);

		for (let i = 0; i < vectorLength; i++) {
			const item = itemDeserialFn.apply(this);
			ret.push(item);
		}

		return ret;
	}

	readEnumType(): number {
		return this.readUInt8();
	}

	readString(sizeLength = 2): string {
		const size = this.readNumberByByteSize(sizeLength);
		return this.readBytes(size).toString("utf8");
	}

	private readNumberByByteSize(sizeLength: number): number {
		switch (sizeLength) {
			case 1:
				return this.readUInt8();
			case 2:
				return this.readUInt16();
			case 4:
				return this.readUInt32();
			default:
				throw new Error(`Invalid vector size length: ${sizeLength}`);
		}
	}
}
