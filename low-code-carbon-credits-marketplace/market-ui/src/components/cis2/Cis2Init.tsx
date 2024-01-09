import React, { FormEvent, useState } from 'react';

import { ConcordiumGRPCClient, ContractAddress, TransactionStatusEnum } from '@concordium/web-sdk';
import { Button, Stack, Typography } from '@mui/material';

import { connectToWallet, ContractInfo, initContract } from '../../models/ConcordiumContractClient';
import TransactionProgress from '../ui/TransactionProgress';

function Cis2Init(props: {
  grpcClient: ConcordiumGRPCClient;
  contractInfo: ContractInfo;
  onDone: (address: ContractAddress) => void;
}) {
  const [state, setState] = useState({
    error: "",
    processing: false,
  });
  const [txn, setTxn] = useState<{ status: TransactionStatusEnum; hash: string }>();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ ...state, processing: true, error: "" });
    setTxn(undefined);

    connectToWallet()
      .then((wallet) =>
        initContract(
          wallet.provider,
          props.contractInfo,
          wallet.account,
          undefined,
          BigInt(9999),
          BigInt(0),
          (status, hash) => setTxn({ status, hash }),
        ),
      )
      .then((address) => {
        setState({ ...state, processing: false });
        props.onDone(address);
      })
      .catch((err: Error) => {
        setState({ ...state, processing: false, error: err.message });
      });
  }

  return (
    <Stack component={"form"} spacing={2} onSubmit={submit}>
      {state.error && (
        <Typography component="div" color="error" variant="body1">
          {state.error}
        </Typography>
      )}
      {state.processing && txn && <TransactionProgress {...txn} />}
      <Button variant="contained" disabled={state.processing} type="submit">
        Deploy New
      </Button>
    </Stack>
  );
}

export default Cis2Init;
