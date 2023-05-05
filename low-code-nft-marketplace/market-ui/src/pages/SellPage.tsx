import { Cis2ContractInfo } from 'common-ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { WalletApi } from '@concordium/browser-wallet-api-helpers';
import { ConcordiumGRPCClient, ContractAddress } from '@concordium/common-sdk';
import { CIS2Contract } from '@concordium/web-sdk';
import { Container, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';

import Cis2BalanceOf from '../components/Cis2BalanceOf';
import Cis2FindInstance from '../components/Cis2FindInstance';
import Cis2OperatorOf from '../components/Cis2OperatorOf';
import Cis2UpdateOperator from '../components/Cis2UpdateOperator';
import MarketplaceAdd from '../components/MarketplaceAdd';

enum Steps {
	FindCollection,
	CheckOperator,
	UpdateOperator,
	CheckTokenBalance,
	AddToken,
}
type StepType = { step: Steps; title: string };

function SellPage(props: {
	grpcClient: ConcordiumGRPCClient;
	provider: WalletApi;
	account: string;
	marketContractAddress: ContractAddress;
	contractInfo: Cis2ContractInfo;
}) {
	const steps = [
		{
			title: "NFT Collection Contract Index",
			step: Steps.FindCollection,
		},
		{ title: "Check Ownership", step: Steps.CheckOperator },
		{ title: "Update Ownership", step: Steps.UpdateOperator },
		{ title: "Check Token Balance", step: Steps.CheckTokenBalance },
		{ title: "Add Token", step: Steps.AddToken },
	];

	let [state, setState] = useState<{
		activeStep: StepType;
		nftContract?: ContractAddress;
		cis2Contract?: CIS2Contract;
		tokenId?: string;
		totalBalance?: bigint;
	}>({
		activeStep: steps[0],
	});

	async function onGetCollectionAddress(address: ContractAddress) {
		setState({
			...state,
			activeStep: steps[1],
			nftContract: address,
			cis2Contract: await CIS2Contract.create(props.grpcClient, address)
		});

	}

	function onCheckOperator(hasOwnership: boolean) {
		if (hasOwnership) {
			setState({
				...state,
				activeStep: steps[3],
			});
		} else {
			setState({
				...state,
				activeStep: steps[2],
			});
		}
	}

	function onUpdateOperator() {
		setState({
			...state,
			activeStep: steps[3],
		});
	}

	function onTokenBalance(tokenId: string, totalBalance: bigint) {
		setState({
			...state,
			activeStep: steps[4],
			tokenId: tokenId,
			totalBalance,
		});
	}

	let navigate = useNavigate();
	function onTokenListed() {
		navigate("/");
	}

	function StepContent() {
		switch (state.activeStep.step) {
			case Steps.FindCollection:
				return (
					<Cis2FindInstance
						grpcClient={props.grpcClient}
						contractInfo={props.contractInfo}
						onDone={(address) => onGetCollectionAddress(address)}
					/>
				);
			case Steps.CheckOperator:
				return (
					<Cis2OperatorOf
						account={props.account}
						marketContractAddress={props.marketContractAddress}
						cis2Contract={state.cis2Contract!}
						onDone={(isOperator) => onCheckOperator(isOperator)}
					/>
				);
			case Steps.UpdateOperator:
				return (
					<Cis2UpdateOperator
						provider={props.provider}
						account={props.account}
						marketContractAddress={props.marketContractAddress}
						cis2Contract={state.cis2Contract!}
						onDone={() => onUpdateOperator()}
					/>
				);
			case Steps.CheckTokenBalance:
				return (
					<Cis2BalanceOf
						provider={props.provider}
						account={props.account}
						cis2Contract={state.cis2Contract!}
						onDone={(id, balance) => onTokenBalance(id, balance)}
					/>
				);
			case Steps.AddToken:
				return (
					<MarketplaceAdd
						provider={props.provider}
						account={props.account}
						marketContractAddress={props.marketContractAddress}
						nftContractAddress={state.nftContract!}
						tokenId={state.tokenId!}
						maxQuantity={state.totalBalance!}
						onDone={() => onTokenListed()}
					/>
				);
			default:
				return <>Invalid Step</>;
		}
	}

	return (
		<Container sx={{ maxWidth: "xl", pt: "10px" }}>
			<Stepper
				activeStep={state.activeStep.step}
				alternativeLabel
				sx={{ padding: "20px" }}
			>
				{steps.map((step) => (
					<Step key={step.step}>
						<StepLabel>{step.title}</StepLabel>
					</Step>
				))}
			</Stepper>
			<Paper sx={{ padding: "20px" }} variant="outlined">
				<Typography
					variant="h4"
					gutterBottom
					sx={{ pt: "20px" }}
					textAlign="left"
				>
					{state.activeStep.title}
				</Typography>
				<StepContent />
			</Paper>
		</Container>
	);
}

export default SellPage;
