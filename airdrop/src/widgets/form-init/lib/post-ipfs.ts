import axios from 'axios';
import { IPFS_URL } from 'shared/config/urls.ts';

export async function postIpfs(file: File): Promise<string> {
	const formData = new FormData();
	formData.append('file', file);

	try {
		const resFile = await axios({
			method: 'post',
			url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
			data: formData,
			headers: {
				pinata_api_key: `25961eb67d1f33c6d03a`,
				pinata_secret_api_key: `65a555538d3a0de8bd08bfdbb1f6363743b4480f86435547de4a255fdf1d39a8`,
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
