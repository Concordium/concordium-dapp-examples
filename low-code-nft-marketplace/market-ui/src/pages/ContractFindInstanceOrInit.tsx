import { Container, Paper, Stack, Typography } from "@mui/material";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress } from "@concordium/web-sdk";

import ContractFindInstance from "../components/ContractFindInstance";
import MarketplaceContractInit from "../components/MarketplaceContractInit";
import { ContractInfo } from "../models/ConcordiumContractClient";

function ContractFindInstanceOrInit(props: {
	provider: WalletApi;
	account: string;
	contractInfo: ContractInfo;
	onDone: (address: ContractAddress) => void;
}) {
	return (
		<Container sx={{ maxWidth: "xl", pt: "10px" }}>
			<Paper sx={{ padding: "20px" }} variant="outlined">
				<Stack spacing={2}>
					<ContractFindInstance
						provider={props.provider}
						onDone={props.onDone}
					/>
					<Typography variant="overline">Or</Typography>
					<MarketplaceContractInit {...props} />
				</Stack>
			</Paper>
		</Container>
	);
}

export default ContractFindInstanceOrInit;
