import React, { FormEvent, useState } from 'react';

import { ContractAddress, TransactionStatusEnum } from '@concordium/web-sdk';
import { Button, FormGroup, Stack, TextField } from '@mui/material';

import { connectToWallet, ContractInfo, initContract } from '../models/ConcordiumContractClient';
import DisplayError from './ui/DisplayError';
import TransactionProgress from './ui/TransactionProgress';

function MarketplaceContractInit(props: {
  contractInfo: ContractInfo;
  tokenContract: ContractAddress;
  fracContract: ContractAddress;
  onDone: (address: ContractAddress) => void;
}) {
  const [state, setState] = useState({
    error: "",
    processing: false,
  });
  const [txn, setTxn] = useState<{ status: TransactionStatusEnum; hash: string }>();
  const [form, setForm] = useState({
    commission: "0",
    tokenContractIndex: props.tokenContract.index.toString(),
    tokenContractSubindex: props.tokenContract.subindex.toString(),
    fracContractIndex: props.fracContract.index.toString(),
    fracContractSubindex: props.fracContract.subindex.toString(),
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const commission = parseInt(formData.get("commission")?.toString() || "0");
    setState({ ...state, processing: true, error: "" });

    const params = {
      commission: commission * 100,
      verifier_contracts: [
        { index: Number(form.tokenContractIndex), subindex: Number(form.tokenContractSubindex) },
        { index: Number(form.fracContractIndex), subindex: Number(form.fracContractSubindex) },
      ],
    };
    connectToWallet()
      .then((wallet) =>
        initContract(
          wallet.provider,
          props.contractInfo,
          wallet.account,
          params,
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
        console.error(err);
        setState({ ...state, processing: false, error: err.message });
      });
  }

  return (
    <Stack component={"form"} spacing={2} onSubmit={submit}>
      <TextField
        name="commission"
        id="commission"
        type="number"
        label="Commission %"
        variant="standard"
        fullWidth
        disabled={state.processing}
        required
        value={form.commission}
        onChange={(e) => setForm({ ...form, commission: e.target.value })}
      />
      <FormGroup>
        <TextField
          name="index"
          id="index"
          type="number"
          value={form.tokenContractIndex}
          variant="standard"
          label="Token Contract Index"
          onChange={(e) => setForm({ ...form, tokenContractIndex: e.target.value })}
        />
        <TextField
          name="subindex"
          id="subindex"
          type="number"
          value={form.tokenContractSubindex}
          variant="standard"
          label="Token Contract Subindex"
          onChange={(e) => setForm({ ...form, tokenContractSubindex: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          name="index"
          id="index"
          type="number"
          value={form.fracContractIndex}
          variant="standard"
          label="Fractionalizer Contract Index"
          onChange={(e) => setForm({ ...form, fracContractIndex: e.target.value })}
        />
        <TextField
          name="subindex"
          id="subindex"
          type="number"
          value={form.fracContractSubindex}
          variant="standard"
          label="Fractionalizer Contract Subindex"
          onChange={(e) => setForm({ ...form, fracContractSubindex: e.target.value })}
        />
      </FormGroup>
      <DisplayError error={state.error} />
      {txn && <TransactionProgress {...txn} />}
      <Button variant="contained" disabled={state.processing} type="submit">
        Deploy New
      </Button>
    </Stack>
  );
}

export default MarketplaceContractInit;
