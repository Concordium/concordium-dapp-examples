import mongoose, { Schema } from 'mongoose';
import { type IDb, type IBlock, type IContractEvent, InitializedContract, IUser } from './db-types';

export default async function getDb(connString: string): Promise<IDb> {
    const client = await mongoose.connect(connString, {
        dbName: 'db',
    });

    return {
        blocks:
            client.models['blocks'] ||
            client.model(
                'blocks',
                new Schema<IBlock>(
                    {
                        blockHeight: { type: Number, required: true },
                        blockHash: { type: String, required: true },
                    },
                    { strict: false }
                )
            ),
        contractEvents:
            client.models['contractEvents'] ||
            client.model('contractEvents', new Schema<IContractEvent>({}, { strict: false })),
        users: client.models['users'] || client.model('users', new Schema<IUser>({
            email: { type: String, required: true },
            account: { type: String, required: true },
        })),
    };
}

export const getHighestBlockHeight = async (db: IDb): Promise<bigint> => {
    const highestBlock = await db.blocks.find({}).sort({ blockHeight: 'desc' }).limit(1);

    if (!highestBlock.length) {
        return BigInt(1);
    }

    return BigInt(highestBlock[0].blockHeight);
};

export const insertBlock = async (db: IDb, block: IBlock): Promise<IBlock> => {
    return await new db.blocks(block).save();
};
