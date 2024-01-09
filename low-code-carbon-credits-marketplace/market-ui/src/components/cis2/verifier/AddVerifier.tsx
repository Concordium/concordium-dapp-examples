import { useState } from 'react';

import { ContractAddress, TransactionStatusEnum } from '@concordium/web-sdk';
import { Button, Stack, TextField } from '@mui/material';

import { connectToWallet, ContractInfo } from '../../../models/ConcordiumContractClient';
import { addVerifier } from '../../../models/ProjectNFTClient';
import DisplayError from '../../ui/DisplayError';
import TransactionProgress from '../../ui/TransactionProgress';

export default function AddVerifier(props: {
  contractInfo: ContractInfo,
  projectContract: ContractAddress,
}) {
  const [form, setForm] = useState({
    verifier: "",
  });
  const [state, setState] = useState({
    loading: false,
    error: "",
  });
  const [txn, setTxn] = useState<{
    status: TransactionStatusEnum;
    hash: string;
  }>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.verifier) {
      setState({ ...state, error: "Please fill out all fields." });
    }

    setState({ ...state, loading: true });
    connectToWallet()
      .then((wallet) =>
        addVerifier(
          wallet.provider,
          wallet.account,
          props.projectContract,
          props.contractInfo,
          form.verifier,
          BigInt(9999),
          (status, hash) => setTxn({ status, hash }),
        ),
      )
      .then(() => {
        setState({ ...state, loading: false, error: "" });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error: error.message });
      });
  };

  return (
    <Stack spacing={2} mt={1} component="form" onSubmit={onSubmit}>
      <TextField
        label="Verifier (Account Address)"
        variant="standard"
        value={form.verifier}
        id='verifier'
        name='verifier'
        onChange={(event) => setForm({ ...form, verifier: event.target.value })}
      />
      <DisplayError error={state.error} />
      {txn && <TransactionProgress status={txn.status} hash={txn.hash} />}
      <Button variant="contained" type="submit">
        Add Verifier
      </Button>
    </Stack>
  );
}
