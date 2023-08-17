import * as dotenv from 'dotenv';
import getDb, * as dbClient from './db/db';
import * as concordiumClient from './concordium/client';
import { max } from './utils';
import { IBlock } from './db/db-types';
import sleep from 'sleep-promise';
import { TransactionEventTag, TransactionKindString, TransactionSummaryType } from '@concordium/node-sdk';
import { IListenerPlugin } from './listener/listener-plugin';
import { deserializeInitContractEvents, deserializeUpdateContractEvents } from './listener/events-deserializer';
import { PluginBlockItem } from './listener/plugin-types';
import { CarbonCreditModulePlugin } from './listener/plugins/carbon-credit-module-plugin';
dotenv.config();

const nodeEndpoint = process.env.NODE_ENDPOINT || '';
const nodePort = parseInt(process.env.NODE_PORT || '');
const mongodbConnString = process.env.DB_CONN_STRING || '';
const startingBlockHash = process.env.STARTING_BLOCK_HASH;
const moduleRef = process.env.MODULE_REF || '';
const moduleSchema = process.env.MODULE_SCHEMA || '';
const client = concordiumClient.getConcordiumClient(nodeEndpoint, nodePort);
const plugins: IListenerPlugin[] = [];

(async () => {
    const db = await getDb(mongodbConnString);
    plugins.push(new CarbonCreditModulePlugin(db, moduleRef, moduleSchema));

    while (true) {
        const startingBlockHeight = !!startingBlockHash
            ? await concordiumClient.getBlockHeight(client, startingBlockHash)
            : BigInt(1);
        const lastFinalizedBlockHeight = await concordiumClient.getMaxBlockHeight(client);
        const highestSyncedBlockHeight = await dbClient.getHighestBlockHeight(db);
        const highestBlockHeight = max(startingBlockHeight, highestSyncedBlockHeight + BigInt(1));
        console.log(`highest block saved: ${highestBlockHeight}`);
        console.log(`consensus status block: ${lastFinalizedBlockHeight}`);

        for (let blockHeight = highestBlockHeight; blockHeight <= lastFinalizedBlockHeight; blockHeight++) {
            console.log(`processing block at height: ${blockHeight}`);
            const blockHash = await concordiumClient.getFinalizedBlockAtHeight(client, blockHeight);

            const block: IBlock = {
                blockHeight: parseInt(blockHeight.toString()),
                blockHash,
            };

            for (const plugin of plugins) {
                if (!plugin.shouldProcessBlock(blockHash)) {
                    continue;
                }

                const blockItems = await client.getBlockTransactionEvents(blockHash);

                const pluginBlockItems: PluginBlockItem[] = [];

                for await (const blockItem of blockItems) {
                    switch (blockItem.type) {
                        case TransactionSummaryType.AccountTransaction:
                            switch (blockItem.transactionType) {
                                case TransactionKindString.InitContract:
                                    if (!plugin.shouldProcessModule(blockItem.contractInitialized.ref)) {
                                        console.log(`Skipping Module Ref: ${blockItem.contractInitialized.ref}`);
                                        continue;
                                    }
                                    const moduleSchema = plugin.getModuleSchema(blockItem.contractInitialized.ref);
                                    const initContractEvents = deserializeInitContractEvents(
                                        blockItem.contractInitialized.events,
                                        moduleSchema,
                                        blockItem.contractInitialized.initName
                                    );
                                    pluginBlockItems.push({
                                        hash: blockItem.hash,
                                        contractAddress: blockItem.contractInitialized.address,
                                        methodName: blockItem.contractInitialized.initName,
                                        type: blockItem.type,
                                        transactionType: blockItem.transactionType,
                                        events: initContractEvents.length ? initContractEvents : [undefined],
                                        transactionEventType: TransactionEventTag.ContractInitialized,
                                        transactionIndex: blockItem.index,
                                        sender: blockItem.sender
                                    });
                                    break;
                                case TransactionKindString.Update:
                                    for await (const e of blockItem.events) {
                                        switch (e.tag) {
                                            case TransactionEventTag.Updated:
                                                if (!plugin.shouldProcessContractAddress(e.address)) {
                                                    console.log(`Skipping Contract Address: ${e.address}`);
                                                    continue;
                                                }

                                                const moduleRef = await concordiumClient.getContractModule(
                                                    client,
                                                    e.address,
                                                    blockHash
                                                );
                                                if (!plugin.shouldProcessModule(moduleRef)) {
                                                    console.log(`Skipping Module Ref: ${moduleRef}`);
                                                    continue;
                                                }

                                                const moduleSchema = plugin.getModuleSchema(moduleRef);

                                                const updatedEvents = deserializeUpdateContractEvents(
                                                    e.events,
                                                    moduleSchema,
                                                    e.receiveName
                                                );
                                                pluginBlockItems.push({
                                                    contractAddress: e.address,
                                                    hash: blockItem.hash,
                                                    methodName: e.receiveName,
                                                    type: blockItem.type,
                                                    transactionType: blockItem.transactionType,
                                                    events: updatedEvents,
                                                    transactionEventType: e.tag,
                                                    transactionIndex: blockItem.index,
                                                    sender: blockItem.sender
                                                });
                                                break;
                                            default:
                                                console.log(`Skipping Event Tag: ${e.tag}`);
                                                continue;
                                        }
                                    }
                                    break;
                                default:
                                    continue;
                            }
                            break;
                        default:
                            continue;
                    }
                }

                console.log(`sending ${pluginBlockItems.length} block items to plugin: ${plugin.getName()}`);
                await plugin.insertBlockItems(blockHash, blockHeight, pluginBlockItems);
            }

            console.log(`processed block: ${block.blockHeight}, hash: ${block.blockHash}`);
            await dbClient.insertBlock(db, block);
        }

        await sleep(5000);
        console.debug('checking for new block');
    }
})()
    .then(() => console.log('complete'))
    .catch((err) => console.error(`error: ${err.message}`));
