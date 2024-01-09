import { useState } from 'react';

import { ConcordiumGRPCClient, ContractAddress } from '@concordium/web-sdk';
import {
    Alert, Button, Paper, Stack, Step, StepContent, StepLabel, Stepper, Typography
} from '@mui/material';

import { ContractInfo } from '../../models/ConcordiumContractClient';
import FractionalizerFindOrInit from '../cis2-fractionalizer/FractionalizerFindOrInit';
import MarketFindOrInit from '../cis2-market/MarketFindOrInit';
import Cis2FindInstanceOrInit from '../cis2/Cis2FindInstanceOrInit';

const enum Steps {
  TokenContract,
  FracContract,
  MarketContract,
  Complete,
}
export default function ContractsSetup(props: {
  fracContractInfo: ContractInfo;
  marketContractInfo: ContractInfo;
  grpcClient: ConcordiumGRPCClient;
  tokenContract?: ContractAddress;
  marketContract?: ContractAddress;
  fracContract?: ContractAddress;
  tokenContractInfo: ContractInfo;
  onDone: (contracts: {
    marketContract: ContractAddress;
    tokenContract: ContractAddress;
    fracContract: ContractAddress;
  }) => void;
}) {
  const [step, setStep] = useState<Steps>(Steps.TokenContract);
  const [tokenContract, setTokenContract] = useState<ContractAddress | undefined>(props.tokenContract);
  const [marketContract, setMarketContract] = useState<ContractAddress | undefined>(props.marketContract);
  const [fracContract, setFracContract] = useState<ContractAddress | undefined>(props.fracContract);

  return (
    <Stack>
      <Stepper activeStep={step} orientation="vertical">
        <Step key={Steps.TokenContract}>
          <StepLabel>Token Contract</StepLabel>
          <StepContent>
            <Cis2FindInstanceOrInit
              grpcClient={props.grpcClient}
              contractInfo={props.tokenContractInfo}
              defaultContract={props.tokenContract}
                          onDone={(address) => {
                setTokenContract(address);
                setStep(Steps.FracContract);
              }}
            />
          </StepContent>
        </Step>
        <Step key={Steps.FracContract}>
          <StepLabel>Frac Contract</StepLabel>
          <StepContent>
            <FractionalizerFindOrInit
              grpcClient={props.grpcClient}
              contractInfo={props.fracContractInfo}
              defaultContractAddress={props.fracContract}
              tokenContract={tokenContract!}
              onDone={(address) => {
                setFracContract(address);
                setStep(Steps.MarketContract);
              }}
            />
          </StepContent>
        </Step>
        <Step key={Steps.MarketContract}>
          <StepLabel>Market Contract</StepLabel>
          <StepContent>
            <MarketFindOrInit
              grpcClient={props.grpcClient}
              contractInfo={props.marketContractInfo}
              defaultContractAddress={props.marketContract}
              tokenContract={tokenContract!}
              fracContract={fracContract!}
              onDone={(address) => {
                setMarketContract(address);
                setStep(Steps.Complete);
              }}
            />
          </StepContent>
        </Step>
        <Step key={Steps.Complete}>
          <StepLabel>Complete</StepLabel>
          <StepContent>
            <Paper variant="outlined">
              <Alert severity="info">
                <Typography variant="body1"> Contracts have been deployed. </Typography>
                <Typography variant="body1">
                  Token Contract: {tokenContract?.index.toString()} / {tokenContract?.subindex.toString()}
                </Typography>
                <Typography variant="body1">
                  Frac Contract: {fracContract?.index.toString()} / {fracContract?.subindex.toString()}
                </Typography>
                <Typography variant="body1">
                  Market Contract: {marketContract?.index.toString()} / {marketContract?.subindex.toString()}
                </Typography>
              </Alert>
            </Paper>
            <Button
              variant="contained"
              onClick={() =>
                props.onDone({
                  marketContract: marketContract!,
                  tokenContract: tokenContract!,
                  fracContract: fracContract!,
                })
              }
            >
              Continue
            </Button>
          </StepContent>
        </Step>
      </Stepper>
    </Stack>
  );
}
