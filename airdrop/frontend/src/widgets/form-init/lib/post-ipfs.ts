import axios from 'axios';
import { IPFS_URL } from 'shared/config/urls.ts';
import {
	PINATA_API_KEY,
	PINATA_SECRET_API_KEY,
} from '../../../shared/config/api.ts';

export async function postIpfs(file: File): Promise<string> {
	const formData = new FormData();
	formData.append('file', file);

	try {
		const resFile = await axios({
			method: 'post',
			url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
			data: formData,
			headers: {
				pinata_api_key: PINATA_API_KEY,
				pinata_secret_api_key: PINATA_SECRET_API_KEY,
				'Content-Type': 'multipart/form-data',
			},
		});

		return `${IPFS_URL}/${resFile.data.IpfsHash}`;
	} catch (error) {
		console.log('Error sending File to IPFS: ');
		console.log(error);
		throw new Error('Error sending File to IPFS: ');
	}
}
