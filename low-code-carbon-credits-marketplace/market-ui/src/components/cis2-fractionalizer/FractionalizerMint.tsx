import { FormEvent, useState } from 'react';

import { ContractAddress, TransactionStatusEnum } from '@concordium/web-sdk';
import { Alert, AlertColor, Button, Container, Stack, TextField, Typography } from '@mui/material';

import { CARBON_CREDIT_CONTRACT_INFO } from '../../Constants';
import { connectToWallet } from '../../models/ConcordiumContractClient';
import { mint, MintParams } from '../../models/ProjectFractionalizerClient';
import { ModuleEvent } from '../../models/web/Events';
import { default as SnackbarAlert } from '../ui/Alert';
import DisplayError from '../ui/DisplayError';
import TransactionProgress from '../ui/TransactionProgress';

export default function FractionalizerMint(props: {
  defaultMetadataUrl: string;
  defaultMetadataHash: string;
  defaultTokenQuantity: string;
  collateralContractAddress: ContractAddress;
  collateralTokenId: string;
  fracContractAddress: ContractAddress;
  defaultTokenId?: string;
  disableMetadataUrlUpdate?: boolean;
  disableQuantityUpdate?: boolean;
  disableMetadataHashUpdate?: boolean;
  onDone: (events: ModuleEvent[]) => void;
}) {
  const [txn, setTxn] = useState<{ hash?: string; status?: TransactionStatusEnum }>({});
  const [state, setState] = useState({
    error: "",
    inProgress: false,
  });
  const [form, setForm] = useState({
    quantity: props.defaultTokenQuantity,
    metadataUrl: props.defaultMetadataUrl,
    metadataHash: props.defaultMetadataHash,
  });
  const [alertState, setAlertState] = useState<{
    open: boolean;
    message: string;
    severity?: AlertColor;
  }>({ open: false, message: "" });
  function setFormValue(key: string, value: string) {
    setForm({ ...form, [key]: value });
    setState({ ...state, error: "" });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ ...state, inProgress: true, error: "" });
    connectToWallet()
      .then(async (wallet) => {
        const paramsJson = {
          owner: { Account: [wallet.account] },
          tokens: [
            {
              amount: form.quantity,
              contract: {
                index: Number(props.collateralContractAddress.index),
                subindex: Number(props.collateralContractAddress.subindex),
              },
              token_id: props.collateralTokenId,
              metadata: {
                url: form.metadataUrl,
                hash: form.metadataHash ? { Some: [form.metadataHash] } : { None: [] },
              },
            },
          ],
        } as MintParams;

        return mint(
          wallet.provider,
          wallet.account,
          props.fracContractAddress,
          paramsJson,
          CARBON_CREDIT_CONTRACT_INFO,
          BigInt(9999),
          (status, hash) => setTxn({ hash, status }),
        );
      })
      .then((mintEvents) => {
        setState({ ...state, inProgress: false });
        props.onDone(mintEvents);
      })
      .catch((e: Error) => {
        console.error(e);
        setState({ ...state, inProgress: false, error: e.message });
      });
  }

  return (
    <Stack component={"form"} onSubmit={submit} spacing={2}>
      <Alert severity="info">
        <Typography variant="body2">
          You are about to Fractionalize {props.collateralTokenId} from{" "}
          {props.collateralContractAddress.index.toString()}/{props.collateralContractAddress.subindex.toString()}.
        </Typography>
      </Alert>
      <TextField
        id="quantity"
        name="quantity"
        label="Token Quantity"
        variant="standard"
        type={"number"}
        disabled={props.disableQuantityUpdate || state.inProgress}
        value={form.quantity}
        onChange={(e) => setFormValue("quantity", e.target.value)}
      />
      <TextField
        id="metadata-url"
        name="metadataUrl"
        label="Metadata URL"
        variant="standard"
        type={"text"}
        disabled={props.disableMetadataUrlUpdate || state.inProgress}
        value={form.metadataUrl}
        onChange={(e) => setFormValue("metadataUrl", e.target.value)}
      />
      <TextField
        id="metadata-hash"
        name="metadataHash"
        label="Metadata Hash"
        variant="standard"
        type={"text"}
        disabled={props.disableMetadataHashUpdate || state.inProgress}
        value={form.metadataHash}
        onChange={(e) => setFormValue("metadataHash", e.target.value)}
      />
      <DisplayError error={state.error} />
      {txn.hash && txn.status && (
        <Container>
          <TransactionProgress hash={txn.hash} status={txn.status} />
        </Container>
      )}
      <Button type="submit" variant="contained" disabled={state.inProgress}>
        Mint
      </Button>
      <SnackbarAlert
        open={alertState.open}
        message={alertState.message}
        onClose={() => setAlertState({ open: false, message: "" })}
        severity={alertState.severity}
      />
    </Stack>
  );
}
