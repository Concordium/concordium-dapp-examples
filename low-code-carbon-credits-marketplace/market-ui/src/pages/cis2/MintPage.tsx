import React, { useState } from 'react';

import { ConcordiumGRPCClient, ContractAddress } from '@concordium/web-sdk';
import { ArrowBackOutlined } from '@mui/icons-material';
import { Grid, IconButton, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Container } from '@mui/system';

import Cis2BatchMetadataPrepareOrAdd from '../../components/cis2/Cis2BatchMetadataPrepareOrAdd';
import Cis2BatchMint from '../../components/cis2/Cis2BatchMint';
import Cis2TokensDisplay from '../../components/cis2/Cis2TokensDisplay';
import ConnectPinata from '../../components/ConnectPinata';
import UploadFiles from '../../components/ui/UploadFiles';
import { ContractInfo } from '../../models/ConcordiumContractClient';
import { TokenInfo } from '../../models/ProjectNFTClient';
import {
    Cis2MintEvent, Cis2TokenMetadataEvent, ModuleEvent, ProjectNftEvent, ProjectNftMaturityTimeEvent
} from '../../models/web/Events';

enum Steps {
  ConnectPinata,
  UploadFiles,
  PrepareMetadata,
  Mint,
  Minted,
}

type StepType = { step: Steps; title: string };
type MintMethodEvents = {
  mint: Cis2MintEvent;
  tokenMetadata: Cis2TokenMetadataEvent;
  maturityTime: ProjectNftMaturityTimeEvent;
};

function MintPage(props: {
  grpcClient: ConcordiumGRPCClient;
  contractInfo: ContractInfo;
  tokenContract: ContractAddress;
}) {
  const { tokenContract } = props;
  const steps: StepType[] = [
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
    { step: Steps.Minted, title: "Minted" },
  ];

  const [step, setStep] = useState<Steps>(Steps.ConnectPinata);
  const [state, setState] = useState<{
    tokens: TokenInfo[];
    pinataJwt: string;
    files: File[];
  }>({
    pinataJwt: "",
    files: [],
    tokens: [],
  });

  const [mintedTokens, setMintedTokens] = useState<MintMethodEvents[]>([]);

  function onPinataConnected(pinataJwt: string) {
    setState({
      ...state,
      pinataJwt,
    });
    goForward();
  }

  function onPinataSkipped() {
    setState({
      ...state,
      pinataJwt: "",
    });
    goForward(2);
  }

  function onFilesUploaded(files: File[]) {
    setState({
      ...state,
      files,
    });
    goForward();
  }

  function onMetadataPrepared(tokens: TokenInfo[]) {
    setState({
      ...state,
      tokens,
    });
    goForward();
  }

  function onTokensMinted(mintedEvents: ModuleEvent[]) {
    const mintedTokens: { [tokenId: string]: MintMethodEvents } = {};
    (mintedEvents as ProjectNftEvent[]).forEach((event) => {
      if (event.Mint) {
        const token = mintedTokens[event.Mint.token_id] || {};
        token.mint = event.Mint;
        mintedTokens[event.Mint.token_id] = token;
      } else if (event.TokenMetadata) {
        const token = mintedTokens[event.TokenMetadata.token_id] || {};
        token.tokenMetadata = event.TokenMetadata;
        mintedTokens[event.TokenMetadata.token_id] = token;
      } else if (event.MaturityTime) {
        const token = mintedTokens[event.MaturityTime.token_id] || {};
        token.maturityTime = event.MaturityTime;
        mintedTokens[event.MaturityTime.token_id] = token;
      }
    });

    setMintedTokens(Object.values(mintedTokens));
    goForward();
  }

  function StepContent() {
    switch (step) {
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
            tokenContractAddress={tokenContract!}
            tokenMetadataMap={state.tokens}
            onDone={onTokensMinted}
          />
        );
      case Steps.Minted:
        return <Cis2TokensDisplay tokens={mintedTokens} />;
      default:
        return <>Invalid Step</>;
    }
  }

  function goBack(): void {
    let previousStepIndex = Math.max(step - 1, 0);
    if (previousStepIndex == Steps.UploadFiles && !state.pinataJwt) { 
      previousStepIndex = Steps.ConnectPinata;
    }
    setStep(previousStepIndex);
  }

  function goForward(skip = 1): void {
    const nextStepIndex = Math.min(step + skip, steps.length - 1);
    setStep(nextStepIndex);
  }

  return (
    <Container sx={{ maxWidth: "xl", pt: "10px" }}>
      <Stepper activeStep={step} alternativeLabel sx={{ padding: "20px" }}>
        {steps.map((step) => (
          <Step key={step.step}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Paper sx={{ padding: "20px" }} variant="outlined">
        <Grid container justifyContent="center">
          <Grid item xs={1}>
            <IconButton
              onClick={() => goBack()}
              disabled={step == 0}
              size="large"
              sx={{ display: "flex", alignItems: "center", margin: "auto", padding: "auto" }}
            >
              <ArrowBackOutlined sx={{padding: "auto", margin: "auto"}} />
            </IconButton>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h4" gutterBottom sx={{ pt: "20px", width: "100%" }} textAlign="center">
              {steps[step].title}
            </Typography>
          </Grid>
        </Grid>
        <StepContent />
      </Paper>
    </Container>
  );
}

export default MintPage;
