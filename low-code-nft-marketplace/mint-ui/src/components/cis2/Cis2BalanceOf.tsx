import React, { useState } from "react";

import { CIS2Contract, InvokeContractFailedResult, RejectReasonTag } from "@concordium/web-sdk";
import { Button, ButtonGroup, Stack, TextField, Typography } from "@mui/material";

function Cis2BalanceOf(props: {
  account: string;
  cis2Contract: CIS2Contract;
  onDone: (tokenId: string, balance: bigint) => void;
}) {
  const [state, setState] = useState({
    checking: false,
    error: "",
    tokenId: "",
  });

  function checkBalance() {
    setState({ ...state, checking: true, error: "" });
    props.cis2Contract
      .balanceOf({ tokenId: state.tokenId, address: props.account })
      .then((balance) => {
        if (balance > 0) {
          setState({ ...state, checking: false, error: "" });
          props.onDone(state.tokenId, balance);
        } else {
          setState({ ...state, checking: false, error: "Not enough balance" });
        }
      })
      .catch((err: Error) => {
        if (err.cause) {
          const cause = err.cause as InvokeContractFailedResult;
          if (cause.reason.tag === RejectReasonTag.RejectedReceive) {
            switch (cause.reason.rejectReason) {
              case -42000001:
                setState({
                  ...state,
                  checking: false,
                  error: "Token not found",
                });
                return;
              case -42000002:
                setState({
                  ...state,
                  checking: false,
                  error: "Insufficient Funds",
                });
                return;
              case -42000003:
                setState({ ...state, checking: false, error: "Unauthorized" });
                return;
            }
          }
        }
        setState({ ...state, checking: false, error: err.message });
      });
  }

  function onOkClicked() {
    checkBalance();
  }

  return (
    <Stack component={"form"} spacing={2}>
      <TextField
        id="token-id"
        label="Token Id"
        variant="standard"
        value={state.tokenId}
        onChange={(v) => setState({ ...state, tokenId: v.target.value })}
        disabled={state.checking}
      />
      {state.error && (
        <Typography component="div" color="error" variant="button">
          {state.error}
        </Typography>
      )}
      {state.checking && <Typography component="div">Checking..</Typography>}
      <ButtonGroup fullWidth size="large" disabled={state.checking}>
        <Button variant="contained" onClick={() => onOkClicked()}>
          Ok
        </Button>
      </ButtonGroup>
    </Stack>
  );
}

export default Cis2BalanceOf;
