export function getErrorMessage(error: number) {
	return `error: (${error}) ${getErrorMessageWithoutCode(error)}`;
}

function getErrorMessageWithoutCode(error: number) {
	switch (error) {
		case 0:
			return 'Success';
		case -1:
			return 'NFT Limit Reached';
		case -2:
			return 'Address Not On Whitelist';
		case -3:
			return 'Airdrop Now Closed';
		case -4:
			return 'Minting Log Mal formed';
		case -5:
			return 'Minting Log Full';
		case -6:
			return 'Metadata Log Mal formed';
		case -7:
			return 'Metadata Log Full';
		case -8:
			return 'Index Already Claimed';
		default:
			return 'Unknown Error';
	}
}
