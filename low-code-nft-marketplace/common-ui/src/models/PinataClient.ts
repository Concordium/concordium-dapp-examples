import { default as axios } from 'axios';

export class PinataClient {
    constructor(private pinataJwt: string) { }

    async isJwtValid(): Promise<boolean> {
        const response = await axios({
            method: 'get',
            url: 'https://api.pinata.cloud/data/testAuthentication',
            headers: {
                Authorization: `Bearer ${this.pinataJwt}`,
            },
        });

        return response.status === 200;
    }

    async uploadFile(file: File, fileName: string): Promise<string> {
        const data = new FormData();
        data.append('file', file);
        data.append('pinataMetadata', JSON.stringify({ name: fileName }));

        const response = await axios({
            method: 'post',
            url: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
            headers: {
                Authorization: `Bearer ${this.pinataJwt}`,
            },
            data: data,
        });
        if (response.status !== 200) {
            throw new Error('Failed to upload file');
        }

        const responseData = response.data as PinFileToIPFSResponse;
        // usually platforms should handle the gateway OR prefix usage but wallet doesnt at the moment.
        // since this is an example, we can use it like below.
        return `https://ipfs.io/ipfs/${responseData.IpfsHash}`
        // return `ipfs://${responseData.IpfsHash}`;
    }

    async uploadJson(json: object, fileName: string): Promise<string> {
        const data = JSON.stringify({
            pinataMetadata: {
                name: fileName,
                keyvalues: {
                    imageFilename: fileName,
                },
            },
            pinataContent: json,
        });
        const response = await axios({
            method: 'post',
            url: `https://api.pinata.cloud/pinning/pinJSONToIPFS`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.pinataJwt}`,
            },
            data: data,
        });
        if (response.status !== 200) {
            throw new Error('Failed to upload JSON');
        }

        const responseData = response.data as PinFileToIPFSResponse;
        // usually platforms should handle the gateway OR prefix usage but wallet doesnt at the moment.
        // since this is an example, we can use it like below.
        return `https://ipfs.io/ipfs/${responseData.IpfsHash}`
        // return `ipfs://${responseData.IpfsHash}`;
    }
}

interface PinFileToIPFSResponse {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
    isDuplicate: boolean;
}
