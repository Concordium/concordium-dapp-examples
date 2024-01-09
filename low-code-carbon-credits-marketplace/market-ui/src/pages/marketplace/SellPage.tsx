import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConcordiumGRPCClient, ContractAddress } from '@concordium/common-sdk';
import { CIS2Contract } from '@concordium/web-sdk';
import {
    List, ListItem, ListItemButton, Paper, Step, StepLabel, Stepper, Typography
} from '@mui/material';

import Cis2Transfer from '../../components/cis2/Cis2Transfer';
import MarketplaceAdd from '../../components/MarketplaceAdd';
import { ContractInfo } from '../../models/ConcordiumContractClient';

enum Steps {
  SelectTokenType,
  TransferToken,
  AddToken,
}
type StepType = { step: Steps; title: string };
const steps = [
  {
    title: "What token do you want to sell?",
    step: Steps.SelectTokenType,
  },
  {
    title: "Transfer Token",
    step: Steps.TransferToken,
  },
  { title: "Add Token", step: Steps.AddToken },
];

function SellPage(props: {
  grpcClient: ConcordiumGRPCClient;
  contractInfo: ContractInfo;
  marketContract: ContractAddress;
  projectContract: ContractAddress;
  fracContract: ContractAddress;
}) {
  const { marketContract, projectContract, fracContract } = props;
  const [fromContract, setFromContract] = useState<ContractAddress | undefined>();
  const [step, setStep] = useState<StepType>(steps[0]);

  const [state, setState] = useState<{
    contractAddress?: ContractAddress;
    cis2Contract?: CIS2Contract;
    tokenId?: string;
    quantity?: string;
  }>({});

  async function onFromContractSelected(address: ContractAddress) {
    setFromContract(address);
    setStep(steps[1]);
  }

  async function onTransferred(address: ContractAddress, tokenId: string, quantity: string) {
    setState({
      ...state,
      contractAddress: address,
      cis2Contract: await CIS2Contract.create(props.grpcClient, address),
      tokenId,
      quantity,
    });
    setStep(steps[2]);
  }

  const navigate = useNavigate();
  function onTokenListed() {
    navigate("/");
  }

  function StepContent() {
    switch (step.step) {
      case Steps.SelectTokenType:
        return (
          <>
            <List>
              <ListItem value="project" onClick={() => onFromContractSelected(projectContract)}>
                <ListItemButton>Project</ListItemButton>
              </ListItem>
              <ListItem value="carbonCredits" onClick={() => onFromContractSelected(fracContract)}>
                <ListItemButton>Carbon Credits</ListItemButton>
              </ListItem>
            </List>
          </>
        );
      case Steps.TransferToken:
        return (
          <>
            <Cis2Transfer
              grpcClient={props.grpcClient}
              to={{
                address: marketContract,
                hookName: "onCis2Recieved",
              }}
              onDone={(address, tokenId, quantity) => onTransferred(address, tokenId, quantity)}
              defaultContractAddress={fromContract!}
            />
          </>
        );
      case Steps.AddToken:
        return (
          <MarketplaceAdd
            grpcClient={props.grpcClient}
            marketContractAddress={marketContract}
            nftContractAddress={state.contractAddress!}
            tokenId={state.tokenId!}
            cis2Contract={state.cis2Contract!}
            onDone={() => onTokenListed()}
          />
        );
      default:
        return <>Invalid Step</>;
    }
  }

  return (
    <>
      <Stepper activeStep={step.step} alternativeLabel sx={{ padding: "20px" }}>
        {steps.map((step) => (
          <Step key={step.step}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Paper sx={{ padding: "20px" }} variant="outlined">
        <Typography variant="h4" gutterBottom sx={{ pt: "20px" }} textAlign="left">
          {step.title}
        </Typography>
        <StepContent />
      </Paper>
    </>
  );
}

export default SellPage;
