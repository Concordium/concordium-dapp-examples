import React, { FormEvent, useState } from 'react';

import { ConcordiumGRPCClient, ContractAddress } from '@concordium/web-sdk';
import { Button, Stack, TextField, Typography } from '@mui/material';

function ContractFindInstance(props: {
  grpcClient: ConcordiumGRPCClient;
  defaultContractAddress?: ContractAddress;
  onDone: (address: ContractAddress) => void
}) {
  const [form, setForm] = useState({
    index: props.defaultContractAddress?.index.toString(),
    subindex: props.defaultContractAddress?.subindex.toString(),
  });

  const [state, setState] = useState({
    error: "",
    checking: false,
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ ...state, error: "", checking: true });
    if (!form.index || !form.subindex) { 
      setState({ ...state, error: "Invalid Contract Address" });
      return;
    }

    const index = BigInt(form.index);
    const subindex = BigInt(form.subindex);

    if (!(index >= 0)) {
      setState({ ...state, error: "Invalid Contract Index" });
      return;
    }

    if (!(subindex >= 0)) {
      setState({ ...state, error: "Invalid Contract Subindex" });
      return;
    }

    const address = { index, subindex };
    props.grpcClient
      .getInstanceInfo(address)
      .then(() => {
        setState({ ...state, checking: false, error: "" });
        props.onDone(address);
      })
      .catch((e: Error) => {
        setState({ ...state, checking: false, error: e.message });
      });
  }

  return (
    <Stack component={"form"} spacing={2} onSubmit={submit} autoComplete={"true"}>
      <TextField
        id="contract-index"
        name="contractIndex"
        label="Contract Index"
        variant="standard"
        type={"number"}
        disabled={state.checking}
        value={form.index}
        onChange={(e) => setForm({ ...form, index: e.target.value })}
      />
      <TextField
        id="contract-subindex"
        name="contractSubindex"
        label="Contract Sub Index"
        variant="standard"
        type={"number"}
        disabled={state.checking}
        value={form.subindex}
        onChange={(e) => setForm({ ...form, subindex: e.target.value })}
      />
      {state.error && (
        <Typography component="div" color="error">
          {state.error}
        </Typography>
      )}
      {state.checking && <Typography component="div">Checking..</Typography>}
      <Button
        type="submit"
        variant="contained"
        disabled={state.checking}
        fullWidth
        size="large"
        sx={{ maxWidth: "100px" }}
      >
        Find
      </Button>
    </Stack>
  );
}

export default ContractFindInstance;
