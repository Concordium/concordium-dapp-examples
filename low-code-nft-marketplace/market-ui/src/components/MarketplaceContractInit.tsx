import { ContractInfo, initContract } from "common-ui";
import React, { FormEvent, useState } from "react";

import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress } from "@concordium/web-sdk";
import { Button, Stack, TextField, Typography } from "@mui/material";

function MarketplaceContractInit(props: {
  provider: WalletApi;
  account: string;
  contractInfo: ContractInfo;
  onDone: (address: ContractAddress) => void;
}) {
  const [state, setState] = useState({
    error: "",
    processing: false,
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const commission = parseInt(formData.get("commission")?.toString() || "0");
    setState({ ...state, processing: true, error: "" });

    const params = { commission: commission * 100 };
    initContract(props.provider, props.contractInfo, props.account, params)
      .then((address) => {
        setState({ ...state, processing: false, error: "" });
        alert("Contract Initialized. You will now be redirected to the buy page for the new contract")
        props.onDone(address);
      })
      .catch((err: Error) => {
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
        defaultValue={0}
      />
      {state.error && (
        <Typography component="div" color="error" variant="body1">
          {state.error}
        </Typography>
      )}
      {state.processing && (
        <Typography component="div" variant="body1">
          Deploying..
        </Typography>
      )}
      <Button variant="contained" disabled={state.processing} type="submit">
        Deploy New
      </Button>
    </Stack>
  );
}

export default MarketplaceContractInit;
