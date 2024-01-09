import mongoose, { Model, Schema } from 'mongoose';
import { IContractEvent } from '../../db/db-types';

export interface ICis2Db {
    contractEvents: Model<IContractEvent>;
}
export const getDb = async (connString: string): Promise<ICis2Db> => {
    const client = await mongoose.connect(connString, {
        dbName: 'db',
    });

    return {
        contractEvents:
            client.models['contractEvents'] ||
            client.model('contractEvents', new Schema<IContractEvent>({}, { strict: false })),
    };
};
