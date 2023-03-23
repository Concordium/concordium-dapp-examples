//@ts-ignore
import * as leb from "leb128";
import { Buffer } from "buffer/";
import { ConcordiumDeserializer } from "./ConcordiumDeserializer";
import { BalanceOfQueryResponse } from "./Cis2Types";
import {
	OperatorOfQueryResponse,
	SupportResult,
	SupportsQueryResponse,
	MetadataUrl,
} from "./Cis2Types";
const MAX_LEB_BYTE_VALUE = Math.pow(2, 7);

/**
 * Handles Deserialization of CIS2 types from underlying Buffer.
 */
export class Cis2Deserializer extends ConcordiumDeserializer {
	readTokenId(): string {
		let tokenByteSize = this.readUInt8();
		const tokenId = this.readBytes(tokenByteSize).toString("hex");

		return tokenId;
	}

	readTokenMetadata(): MetadataUrl {
		this.readBytes(2);
		let url = this.readString(2);
		let hash = this.readString(1);

		return { url, hash };
	}

	readSupportsQueryResponse(): SupportsQueryResponse {
		const results = this.readVector(this.readSupportResult, 2);

		return {
			results,
		};
	}

	readSupportResult(): SupportResult {
		let type = this.readEnumType();

		switch (type) {
			case 0:
				return { type: "NoSupport" };
			case 1:
				return { type: "Support" };
			case 2:
				return {
					type: "SupportBy",
					supportBy: this.readVector(this.readContractAddress),
				};
			default:
				throw new Error("invalid support result type");
		}
	}

	readOperatorOfQueryResponse(): OperatorOfQueryResponse {
		return this.readVector(this.readBool, 2);
	}

	readBalanceOfQueryResponse(): BalanceOfQueryResponse<number | bigint> {
		return this.readVector(this.readTokenAmount, 2);
	}

	readTokenAmount(): bigint {
		let buff = new Buffer(37);

		for (let index = 0; index <= 37; index++) {
			let byte = this.readUInt8();
			buff[index] = byte;

			if (byte <= MAX_LEB_BYTE_VALUE) {
				break;
			}
		}

		return BigInt(leb.unsigned.decode(buff));
	}
}
