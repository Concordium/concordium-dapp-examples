import { ContractAddress } from '@concordium/node-sdk';
import { IListenerPlugin } from '../listener-plugin';
import { PluginBlockItem } from '../plugin-types';
import { ICis2Db } from './cis2-db';

export class CarbonCreditModulePlugin implements IListenerPlugin {
    db: ICis2Db;
    moduleRef: string;
    moduleSchema: string;

    constructor(db: ICis2Db, moduleRef: string, moduleSchema: string) {
        this.db = db;
        this.moduleRef = moduleRef;
        this.moduleSchema = moduleSchema;
    }

    getName(): string {
        return 'carbon-credit-module-events';
    }

    async insertBlockItems(blockHash: string, blockHeight: bigint, items: PluginBlockItem[]): Promise<void> {
        const events = items.flatMap((i) =>
            i.events
                .map((i2) => ({
                    block: {
                        blockHash,
                        blockHeight: parseInt(blockHeight.toString()),
                    },
                    transaction: {
                        hash: i.hash,
                        blockItemType: i.type,
                        transactionType: i.transactionType,
                        transactionIndex: i.transactionIndex.toString(),
                    },
                    eventType: i.transactionEventType,
                    address: {
                        index: i.contractAddress.index.toString(),
                        subindex: i.contractAddress.subindex.toString(),
                    },
                    sender: i.sender,
                    method: i.methodName.split('.'),
                    event: i2,
                }))
                .map((e) => new this.db.contractEvents(e))
        );

        await this.db.contractEvents.bulkSave(events);
    }

    shouldProcessContractAddress(_address: ContractAddress): boolean {
        return true;
    }

    getModuleSchema(ref: string): string {
        if (ref === this.moduleRef) {
            return this.moduleSchema;
        }

        throw new Error('unsupported module reference');
    }

    shouldProcessBlock(_blockHash: string): boolean {
        return true;
    }

    shouldProcessModule(moduleRef: string): boolean {
        return moduleRef === this.moduleRef;
    }
}
