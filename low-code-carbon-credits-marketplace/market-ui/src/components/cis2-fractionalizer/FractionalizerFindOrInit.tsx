import React from 'react';

import { ConcordiumGRPCClient, ContractAddress } from '@concordium/web-sdk';
import { Container, Paper, Stack, Typography } from '@mui/material';

import { ContractInfo } from '../../models/ConcordiumContractClient';
import ContractFindInstance from '../ContractFindInstance';
import FractionalizerContractInit from './FractionalizerContractInit';

function FractionalizerFindOrInit(props: {
  grpcClient: ConcordiumGRPCClient;
  contractInfo: ContractInfo;
  tokenContract: ContractAddress;
  defaultContractAddress?: ContractAddress;
  onDone: (address: ContractAddress) => void;
}) {
  return (
    <Container sx={{ maxWidth: "xl", pt: "10px" }}>
      <Paper sx={{ padding: "20px" }} variant="outlined">
        <Stack spacing={2}>
          <ContractFindInstance
            grpcClient={props.grpcClient}
            onDone={props.onDone}
            defaultContractAddress={props.defaultContractAddress}
          />
          <Typography variant="overline">Or</Typography>
          <FractionalizerContractInit {...props} />
        </Stack>
      </Paper>
    </Container>
  );
}

export default FractionalizerFindOrInit;
