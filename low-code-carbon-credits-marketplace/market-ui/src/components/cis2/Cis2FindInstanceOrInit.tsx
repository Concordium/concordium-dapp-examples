import React from 'react';

import { ConcordiumGRPCClient, ContractAddress } from '@concordium/web-sdk';
import { Stack, Typography } from '@mui/material';

import { ContractInfo } from '../../models/ConcordiumContractClient';
import Cis2FindInstance from './Cis2FindInstance';
import Cis2Init from './Cis2Init';

function Cis2FindInstanceOrInit(props: {
  grpcClient: ConcordiumGRPCClient;
  contractInfo: ContractInfo;
  defaultContract?: ContractAddress;
  onDone: (address: ContractAddress) => void;
}) {
  return (
    <Stack spacing={2}>
      <Cis2FindInstance
        grpcClient={props.grpcClient}
        defaultContract={props.defaultContract}
        onDone={props.onDone}
      />
      <Typography variant="overline">Or</Typography>
      <Cis2Init {...props} />
    </Stack>
  );
}

export default Cis2FindInstanceOrInit;
