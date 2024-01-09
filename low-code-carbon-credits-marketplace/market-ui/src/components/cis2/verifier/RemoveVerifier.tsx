import { useState } from 'react';

import { ContractAddress, TransactionStatusEnum } from '@concordium/web-sdk';
import { AlertColor, Button, Stack, TextField } from '@mui/material';

import { connectToWallet, ContractInfo } from '../../../models/ConcordiumContractClient';
import { removeVerifier } from '../../../models/ProjectNFTClient';
import Alert from '../../ui/Alert';
import DisplayError from '../../ui/DisplayError';
import TransactionProgress from '../../ui/TransactionProgress';

export default function RemoveVerifier(props: {
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
  const [alert, setAlert] = useState({
    open: false,
    severity: "success" as AlertColor,
    message: "",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.verifier) {
      setState({ ...state, error: "Please fill out all fields." });
    }

    setState({ ...state, loading: true });
    connectToWallet()
      .then((wallet) =>
        removeVerifier(
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
        setAlert({
          open: true,
          severity: "success",
          message: "Verifier removed successfully.",
        });
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
        id='verifier'
        name='verifier'
        value={form.verifier}
        onChange={(event) => setForm({ ...form, verifier: event.target.value })}
      />
      <DisplayError error={state.error} />
      {txn && <TransactionProgress status={txn.status} hash={txn.hash} />}
      {alert.open && (
        <Alert
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert({ ...alert, open: false })}
        ></Alert>
      )}
      <Button variant="contained" type="submit">
        Remove Verifier
      </Button>
    </Stack>
  );
}
