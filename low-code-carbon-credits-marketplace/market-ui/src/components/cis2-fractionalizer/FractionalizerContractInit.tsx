import React, { FormEvent, useState } from 'react';

import { SmartContractParameters } from '@concordium/browser-wallet-api-helpers';
import { ContractAddress, TransactionStatusEnum } from '@concordium/web-sdk';
import { Button, FormGroup, Stack, TextField } from '@mui/material';

import { connectToWallet, ContractInfo, initContract } from '../../models/ConcordiumContractClient';
import DisplayError from '../ui/DisplayError';
import TransactionProgress from '../ui/TransactionProgress';

export default function FractionalizerContractInit(props: {
  contractInfo: ContractInfo;
  tokenContract: ContractAddress;
  onDone: (address: ContractAddress) => void;
}) {
  const [state, setState] = useState({
    error: "",
    processing: false,
  });
  const [txn, setTxn] = useState<{ status: TransactionStatusEnum; hash: string }>();
  const [form, setForm] = useState({
    index: props.tokenContract.index.toString(),
    subindex: props.tokenContract.subindex.toString(),
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ ...state, processing: true });
    setTxn(undefined);

    connectToWallet()
      .then((wallet) =>
        initContract(
          wallet.provider,
          props.contractInfo,
          wallet.account,
          {
            verifier_contracts: [{ index: Number(form.index), subindex: Number(form.subindex) }],
          } as unknown as SmartContractParameters,
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
      <FormGroup>
        <TextField
          name="index"
          id="index"
          type="number"
          value={form.index}
          variant="standard"
          label="Token Contract Index"
          onChange={(e) => setForm({ ...form, index: e.target.value })}
        />
        <TextField
          name="subindex"
          id="subindex"
          type="number"
          value={form.subindex}
          variant="standard"
          label="Token Contract Subindex"
          onChange={(e) => setForm({ ...form, subindex: e.target.value })}
        />
      </FormGroup>

      <DisplayError error={state.error} />
      {txn && <TransactionProgress hash={txn.hash} status={txn.status} />}
      <Button variant="contained" disabled={state.processing} type="submit">
        Deploy New
      </Button>
    </Stack>
  );
}
