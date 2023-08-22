import React, { useEffect, useState } from "react";

import { CIS2Contract, ContractAddress } from "@concordium/web-sdk";
import { Button, Paper, Typography } from "@mui/material";

function Cis2OperatorOf(props: {
  account: string;
  marketContractAddress: ContractAddress;
  cis2Contract: CIS2Contract;
  onDone: (hasOwnership: boolean) => void;
}) {
  const [state, setState] = useState({ checking: false, error: "" });

  function checkOperator() {
    setState({ ...state, checking: true });
    props.cis2Contract
      .operatorOf({ address: props.marketContractAddress, owner: props.account })
      .then((isOperator) => {
        setState({ checking: false, error: "" });
        props.onDone(isOperator);
      })
      .catch((err: Error) => {
        setState({ checking: false, error: err.message });
      });
  }

  useEffect(() => {
    if (!state.checking) {
      checkOperator();
    }
  }, [props.cis2Contract]);

  return (
    <Paper>
      <h3>Checking Collection Ownership...</h3>
      <div>{state.error && <Typography>{state.error}</Typography>}</div>
      <Button variant="contained" disabled={state.checking} onClick={() => checkOperator()}>
        {state.checking ? "Checking..." : "Check"}
      </Button>
    </Paper>
  );
}

export default Cis2OperatorOf;
