import { ContractAddress } from '@concordium/node-sdk';
import { PluginBlockItem } from './plugin-types';

/**
 * Interface for Listener Plugin
 */
export interface IListenerPlugin {
    /**
     * Gets the name of the plugin
     */
    getName(): unknown;

    /**
     *Insert inpur block items with deserialized events into the database.
     * @param blockHash Block Hash.
     * @param blockHeight Block Height.
     * @param pluginBlockItems Block Items.
     */
    insertBlockItems(
        blockHash: string,
        blockHeight: bigint,
        pluginBlockItems: PluginBlockItem[]
    ): Promise<void>;

    /**
     * Should process the input contract address.
     * Events of all the contract addresses for which this function returns false will be ignored.
     * @param address Contract Address.
     */
    shouldProcessContractAddress(address: ContractAddress): boolean;

    /**
     * Get the module schema for the provided module reference.
     * @param ref Module Ref.
     */
    getModuleSchema(ref: string): string;

    /**
     * All the blocks for which function returns false will be ignored.
     * @param blockHash Block Hash.
     */
    shouldProcessBlock(blockHash: string): boolean;

    /**
     * All the modules for which this function returns false will be ignotred.
     * @param moduleRef Module Reference.
     */
    shouldProcessModule(moduleRef: string): boolean;
}
