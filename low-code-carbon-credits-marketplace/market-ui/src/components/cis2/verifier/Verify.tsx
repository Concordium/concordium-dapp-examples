import { useState } from 'react';

import { ContractAddress, TransactionStatusEnum } from '@concordium/web-sdk';
import { Button, Stack, TextField } from '@mui/material';

import { connectToWallet, ContractInfo } from '../../../models/ConcordiumContractClient';
import { verify } from '../../../models/ProjectNFTClient';
import Alert from '../../ui/Alert';
import DisplayError from '../../ui/DisplayError';
import TransactionProgress from '../../ui/TransactionProgress';

export default function Verify(props: {
  contractInfo: ContractInfo,
  projectContract: ContractAddress
}) {
  const [form, setForm] = useState({
    tokenId: "",
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
    severity: "success",
    message: "",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.tokenId) {
      setState({ ...state, error: "Please fill out all fields." });
    }

    setState({ ...state, loading: true, error: "" });
    setTxn(undefined);
    setAlert({ ...alert, open: false, message: "" });

    connectToWallet()
      .then((wallet) =>
        verify(
          wallet.provider,
          wallet.account,
          props.projectContract,
          props.contractInfo,
          form.tokenId,
          BigInt(9999),
          (status, hash) => setTxn({ status, hash }),
        ),
      )
      .then(() => {
        setState({ ...state, loading: false, error: "" });
        setAlert({
          open: true,
          severity: "success",
          message: "Project verified successfully.",
        });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error: error.message });
      });
  };

  return (
    <Stack spacing={2} mt={1} component="form" onSubmit={onSubmit}>
      <TextField
        label="Token Id"
        variant="standard"
        name="tokenId"
        id="tokenId"
        value={form.tokenId}
        onChange={(event) => setForm({ ...form, tokenId: event.target.value })}
      />
      <DisplayError error={state.error} />
      {txn && <TransactionProgress status={txn.status} hash={txn.hash} />}
      {alert.open && (
        <Alert
          severity="success"
          message={alert.message}
          open={alert.open}
          onClose={() =>
            setAlert({
              ...alert,
              open: false,
              message: "",
            })
          }
        />
      )}
      <Button variant="contained" type="submit">
        Verify
      </Button>
    </Stack>
  );
}
