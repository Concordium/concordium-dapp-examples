import { useState } from "react";
import {
	Stepper,
	Step,
	StepLabel,
	Typography,
	Paper,
	Container
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress } from "@concordium/common-sdk";

import Cis2BalanceOf from "../components/Cis2BalanceOf";
import Cis2OperatorOf from "../components/Cis2OperatorOf";
import Cis2UpdateOperator from "../components/Cis2UpdateOperator";
import Cis2FindInstance from "../components/Cis2FindInstance";
import MarketplaceAdd from "../components/MarketplaceAdd";
import { Cis2ContractInfo } from "../models/ConcordiumContractClient";
enum Steps {
	FindCollection,
	CheckOperator,
	UpdateOperator,
	CheckTokenBalance,
	AddToken,
}
type StepType = { step: Steps; title: string };

function SellPage(props: {
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
		tokenId?: string;
		totalBalance?: bigint;
	}>({
		activeStep: steps[0],
	});

	function onGetCollectionAddress(
		address: ContractAddress,
		_contractInfo: Cis2ContractInfo
	) {
		setState({
			...state,
			activeStep: steps[1],
			nftContract: address,
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
						provider={props.provider}
						contractInfo={props.contractInfo}
						onDone={(address, contractInfo) =>
							onGetCollectionAddress(address, contractInfo)
						}
					/>
				);
			case Steps.CheckOperator:
				return (
					<Cis2OperatorOf
						provider={props.provider}
						account={props.account}
						marketContractAddress={props.marketContractAddress}
						nftContractAddress={state.nftContract as ContractAddress}
						contractInfo={props.contractInfo}
						onDone={(isOperator) => onCheckOperator(isOperator)}
					/>
				);
			case Steps.UpdateOperator:
				return (
					<Cis2UpdateOperator
						provider={props.provider}
						account={props.account}
						marketContractAddress={props.marketContractAddress}
						nftContractAddress={state.nftContract as ContractAddress}
						contractInfo={props.contractInfo}
						onDone={() => onUpdateOperator()}
					/>
				);
			case Steps.CheckTokenBalance:
				return (
					<Cis2BalanceOf
						provider={props.provider}
						account={props.account}
						cis2ContractAddress={state.nftContract as ContractAddress}
						contractInfo={props.contractInfo}
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
