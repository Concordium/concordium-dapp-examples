import { waitAndThrowError } from 'common-ui';
import { useEffect, useState } from 'react';

import { SchemaWithContext, WalletApi } from '@concordium/browser-wallet-api-helpers';
import { CIS2Contract, ContractAddress } from '@concordium/web-sdk';
import { Button, Typography } from '@mui/material';

function Cis2UpdateOperator(props: {
	provider: WalletApi;
	account: string;
	marketContractAddress: ContractAddress;
	cis2Contract: CIS2Contract;
	onDone: () => void;
}) {
	const [state, setState] = useState({ updating: false, error: "" });

	function update() {
		setState({ ...state, updating: true, error: "" });
		const { type, payload, parameter: { json }, schema } = props.cis2Contract.createUpdateOperator(
			{ energy: BigInt(6000) },
			{
				address: props.marketContractAddress,
				type: 'add'
			});

		props.provider.sendTransaction(
			props.account,
			type,
			payload,
			json,
			schema as SchemaWithContext,
		)
			.then(txnHash => waitAndThrowError(props.provider, txnHash))
			.then((_) => {
				setState({ ...state, updating: false, error: "" });
				props.onDone();
			})
			.catch((err: Error) => {
				setState({ ...state, updating: false, error: err.message });
			});
	}

	useEffect(() => {
		if (!state.updating) {
			update();
		}
	}, [props.provider, props.cis2Contract]);

	return (
		<>
			<h3>Update Collection Ownership</h3>
			<div>{state.error && <Typography>{state.error}</Typography>}</div>
			<Button
				variant="contained"
				disabled={state.updating}
				onClick={() => update()}
			>
				{state.updating ? "Updating..." : "Update"}
			</Button>
		</>
	);
}

export default Cis2UpdateOperator;
