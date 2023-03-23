import { useState } from "react";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress } from "@concordium/web-sdk";
import {
	AlertColor,
	Stepper,
	Step,
	StepLabel,
	Typography,
	Paper,
	Grid,
	IconButton,
	Button,
} from "@mui/material";
import { Container } from "@mui/system";
import { TokenInfo } from "../models/Cis2Types";
import Cis2FindInstanceOrInit from "../components/Cis2FindInstanceOrInit";
import ConnectPinata from "../components/ConnectPinata";
import UploadFiles from "../components/ui/UploadFiles";
import Cis2BatchMint from "../components/Cis2BatchMint";
import Cis2BatchMetadataPrepareOrAdd from "../components/Cis2BatchMetadataPrepareOrAdd";
import { Cis2ContractInfo } from "../models/ConcordiumContractClient";

import Alert from "../components/ui/Alert";
import { ArrowBackRounded } from "@mui/icons-material";

enum Steps {
	GetOrInitCis2,
	ConnectPinata,
	UploadFiles,
	PrepareMetadata,
	Mint,
}

type StepType = { step: Steps; title: string };

function MintPage(props: {
	provider: WalletApi;
	account: string;
	contractInfo: Cis2ContractInfo;
}) {
	const steps: StepType[] = [
		{
			step: Steps.GetOrInitCis2,
			title: "Create New or Find Existing NFT Collection",
		},
		{
			step: Steps.ConnectPinata,
			title: "Connect Pinata",
		},
		{
			step: Steps.UploadFiles,
			title: "Upload Image Files",
		},
		{
			step: Steps.PrepareMetadata,
			title: "Prepare Metadata",
		},
		{ step: Steps.Mint, title: "Mint" },
	];

	let [state, setState] = useState<{
		activeStep: StepType;
		nftContract?: ContractAddress;
		tokenMetadataMap?: {
			[tokenId: string]: TokenInfo;
		};
		pinataJwt: string;
		files: File[];
	}>({
		activeStep: steps[0],
		pinataJwt: "",
		files: [],
	});


	function onGetCollectionAddress(
		address: ContractAddress,
		contractInfo: Cis2ContractInfo
	) {
		setState({
			...state,
			activeStep: steps[1],
			nftContract: address,
		});
	}

	function onPinataConnected(pinataJwt: string) {
		setState({
			...state,
			pinataJwt,
			activeStep: steps[2],
		});
		setAlertState({
			open: true,
			message: "Connected to Pinata",
			severity: "success"
		});
	}

	function onPinataSkipped() {
		setState({
			...state,
			pinataJwt: "",
			activeStep: steps[3],
		});
	}

	function onFilesUploaded(files: File[]) {
		setState({
			...state,
			files,
			activeStep: steps[3],
		});
		
	}

	function onMetadataPrepared(tokenMetadataMap: {
		[tokenId: string]: TokenInfo;
	}) {
		setState({
			...state,
			activeStep: steps[4],
			tokenMetadataMap,
		});
	}

	const [alertState, setAlertState] = useState<{
		open: boolean;
		message: string;
		severity?: AlertColor;
	}>({
		open: false,
		message: "",
	});

	function onNftsMinted() {
		setAlertState({
			open: true,
			message: "Minted",
			severity: "success"
		});
		
	}

	function StepContent() {
		switch (state.activeStep.step) {
			case Steps.GetOrInitCis2:
				return (
					<Cis2FindInstanceOrInit
						provider={props.provider}
						account={props.account}
						contractInfo={props.contractInfo}
						address={state.nftContract}
						onDone={(address, contractInfo) =>
							onGetCollectionAddress(address, contractInfo)
						}
					/>
				);
			case Steps.ConnectPinata:
				return (
					<ConnectPinata onDone={onPinataConnected} onSkip={onPinataSkipped} jwt={state.pinataJwt} />
				);
			case Steps.UploadFiles:
				return <UploadFiles onDone={onFilesUploaded} files={state.files} />;
			case Steps.PrepareMetadata:
				return (
					<Cis2BatchMetadataPrepareOrAdd
						contractInfo={props.contractInfo}
						pinataJwt={state.pinataJwt}
						files={state.files}
						onDone={onMetadataPrepared}
					/>
				);
			case Steps.Mint:
				return (
					<Cis2BatchMint
						contractInfo={props.contractInfo}
						provider={props.provider}
						account={props.account}
						nftContractAddress={state.nftContract as ContractAddress}
						tokenMetadataMap={state.tokenMetadataMap!}
						onDone={(_) => onNftsMinted()}
					/>
				);
			default:
				return <>Invalid Step</>;
		}
	}

	function goBack(): void {
		var activeStepIndex = steps.findIndex(s=>s.step === state.activeStep.step);
		var previousStepIndex = Math.max(activeStepIndex - 1, 0);
		if (state.activeStep.step == Steps.PrepareMetadata)
			setState({...state, activeStep: steps[previousStepIndex-1]});	
		
		else
			setState({...state, activeStep: steps[previousStepIndex]});
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
			
			<Grid container>
			{/* <Grid>
				<Alert
			open={alertState.open}
		 		message={alertState.message}
				onClose={() => setAlertState({ open: false, message: "" })}
		 		severity={alertState.severity}
		 		// anchorOrigin={{ vertical: "top", horizontal: "center" }}
		 	/>
				</Grid> */}
				<Grid item xs={1}>
					<IconButton sx={{border: "1px solid black", borderRadius: "100px"}} onClick={()=>goBack()}>
						<ArrowBackRounded></ArrowBackRounded>
					</IconButton>
				</Grid>
				<Grid item xs={11}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{ pt: "20px", width: "100%" }}
						textAlign="center"
					>
						{state.activeStep.title}
					</Typography>
				</Grid>
		
			</Grid>
			<StepContent />
		</Paper>

	</Container>

	);
}

export default MintPage;
