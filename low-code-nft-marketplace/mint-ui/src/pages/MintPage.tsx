import { Cis2ContractInfo } from "common-ui";
import React, { useState } from "react";

import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { CIS2, ConcordiumGRPCClient, ContractAddress } from "@concordium/web-sdk";
import { ArrowBackRounded } from "@mui/icons-material";
import { AlertColor, Grid, IconButton, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Container } from "@mui/system";

import Cis2BatchMetadataPrepareOrAdd from "../components/cis2/Cis2BatchMetadataPrepareOrAdd";
import Cis2BatchMint from "../components/cis2/Cis2BatchMint";
import Cis2FindInstanceOrInit from "../components/cis2/Cis2FindInstanceOrInit";
import ConnectPinata from "../components/ConnectPinata";
import Alert from "../components/ui/Alert";
import UploadFiles from "../components/ui/UploadFiles";

enum Steps {
  GetOrInitCis2,
  ConnectPinata,
  UploadFiles,
  PrepareMetadata,
  Mint,
}

type StepType = { step: Steps; title: string };

function MintPage(props: {
  grpcClient: ConcordiumGRPCClient;
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

  const [state, setState] = useState<{
    activeStep: StepType;
    nftContract?: ContractAddress;
    tokenMetadataMap?: {
      [tokenId: string]: [CIS2.MetadataUrl, string];
    };
    pinataJwt: string;
    files: File[];
  }>({
    activeStep: steps[0],
    pinataJwt: "",
    files: [],
  });

  function onGetCollectionAddress(address: ContractAddress) {
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
      severity: "success",
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

  function onMetadataPrepared(tokenMetadataMap: { [tokenId: string]: [CIS2.MetadataUrl, string] }) {
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
  }>({ open: false, message: "" });

  function onNftsMinted() {
    setAlertState({ open: true, message: "Minted", severity: "success" });
  }

  function StepContent() {
    switch (state.activeStep.step) {
      case Steps.GetOrInitCis2:
        return (
          <Cis2FindInstanceOrInit
            provider={props.provider}
            grpcClient={props.grpcClient}
            account={props.account}
            contractInfo={props.contractInfo}
            address={state.nftContract}
            onDone={(address) => onGetCollectionAddress(address)}
          />
        );
      case Steps.ConnectPinata:
        return <ConnectPinata onDone={onPinataConnected} onSkip={onPinataSkipped} jwt={state.pinataJwt} />;
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
            onDone={() => onNftsMinted()}
          />
        );
      default:
        return <>Invalid Step</>;
    }
  }

  function goBack(): void {
    const activeStepIndex = steps.findIndex((s) => s.step === state.activeStep.step);
    const previousStepIndex = Math.max(activeStepIndex - 1, 0);

    setState({ ...state, activeStep: steps[previousStepIndex] });
  }

  return (
    <Container sx={{ maxWidth: "xl", pt: "10px" }}>
      <Stepper activeStep={state.activeStep.step} alternativeLabel sx={{ padding: "20px" }}>
        {steps.map((step) => (
          <Step key={step.step}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Paper sx={{ padding: "20px" }} variant="outlined">
        <Grid container>
          <Grid item xs={1}>
            <IconButton sx={{ border: "1px solid black", borderRadius: "100px" }} onClick={() => goBack()}>
              <ArrowBackRounded></ArrowBackRounded>
            </IconButton>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h4" gutterBottom sx={{ pt: "20px", width: "100%" }} textAlign="center">
              {state.activeStep.title}
            </Typography>
          </Grid>
        </Grid>
        <StepContent />
        <Alert
          open={alertState.open}
          message={alertState.message}
          onClose={() => setAlertState({ open: false, message: "" })}
          severity={alertState.severity}
        />
      </Paper>
    </Container>
  );
}

export default MintPage;
