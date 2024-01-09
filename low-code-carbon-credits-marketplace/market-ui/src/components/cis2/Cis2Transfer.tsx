import { FormEvent, useState } from 'react';

import { SchemaWithContext, WalletApi } from '@concordium/browser-wallet-api-helpers';
import {
    CIS0, cis0Supports, CIS2, CIS2Contract, ConcordiumGRPCClient, ContractAddress,
    TransactionStatusEnum
} from '@concordium/web-sdk';
import { Button, Container, Stack, TextField } from '@mui/material';

import { connectToWallet, waitAndThrowError } from '../../models/ConcordiumContractClient';
import DisplayError from '../ui/DisplayError';
import TransactionProgress from '../ui/TransactionProgress';

export default function Cis2Transfer(props: {
  defaultQuantity?: string;
  quantityDisabled?: boolean;
  onDone: (address: ContractAddress, tokenId: string, contractName: string, quantity: string) => void;
  grpcClient: ConcordiumGRPCClient;
  to: CIS2.Receiver;
  defaultContractAddress: ContractAddress;
}) {
  const address = props.defaultContractAddress;
  const [state, setState] = useState({
    error: "",
    inProgress: false,
  });
  const [form, setForm] = useState({
    tokenId: "",
    quantity: props.defaultQuantity || "1",
  });
  const [txn, setTxn] = useState<{ hash?: string; status?: TransactionStatusEnum }>({});

  function setFormValue(key: string, value: string) {
    setState({ ...state, error: "" });
    setForm({ ...form, [key]: value });
  }

  function onSkipClicked() {
    setTxn({});
    if (!form.tokenId || !form.quantity) {
      setState({ ...state, error: "Please fill out all fields" });
      return;
    }

    if (typeof props.to === "string") {
      setState({ ...state, error: "To is an account address cannot be skipped" });
    }

    const address = props.defaultContractAddress;
    setState({ ...state, error: "", inProgress: true });
    getContractName(address)
      .then(async ({ contractName }) => {
        const cis2Contract = new CIS2Contract(props.grpcClient, address, contractName);
        const balance = await cis2Contract.balanceOf({
          tokenId: form.tokenId,
          address: (props.to as CIS2.ContractReceiver).address,
        });

        return { contractName, balance };
      })
      .then(({ contractName, balance }) => {
        if (balance < BigInt(form.quantity)) {
          setState({ ...state, error: "Insufficient balance" });
        } else {
          setState({ ...state, error: "", inProgress: false });
          props.onDone(address, form.tokenId, contractName, form.quantity);
        }
      })
      .catch((e: Error) => {
        setState({ ...state, error: e.message, inProgress: false });
      });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTxn({});

    setState({ ...state, error: "", inProgress: true });
    getContractName(address)
      .then(async ({ contractName }) => {
        const cis2Contract = new CIS2Contract(props.grpcClient, address, contractName);
        const wallet = await connectToWallet();
        const txnHash = await transfer(wallet.provider, wallet.account, cis2Contract);
        const res = await waitAndThrowError(wallet.provider, txnHash, (status, hash) => setTxn({ hash, status }));

        return { contractName, res };
      })
      .then(({ contractName }) => {
        setState({ ...state, error: "", inProgress: false });
        props.onDone(address, form.tokenId, contractName, form.quantity);
      })
      .catch((e: Error) => {
        console.error(e);
        setState({ ...state, inProgress: false, error: e.message });
      });
  }

  return (
    <Stack component={"form"} onSubmit={submit} spacing={2}>
      <TextField
        id="token-id"
        name="tokenId"
        label="Token Id"
        variant="standard"
        type={"text"}
        disabled={state.inProgress}
        value={form.tokenId.toString()}
        onChange={(e) => setFormValue("tokenId", e.target.value)}
      />
      <TextField
        id="quantity"
        name="quantity"
        label="Token Quantity"
        variant="standard"
        type={"number"}
        disabled={props.quantityDisabled || state.inProgress}
        value={form.quantity.toString()}
        onChange={(e) => setFormValue("quantity", e.target.value)}
      />
      <DisplayError error={state.error} />
      {txn.hash && txn.status && (
        <Container>
          <TransactionProgress hash={txn.hash} status={txn.status} />
        </Container>
      )}

      <Stack direction={"row"} spacing={2}>
        <Button type="submit" variant="contained" disabled={state.inProgress} fullWidth>
          Transfer
        </Button>
        <Button type="button" variant="outlined" disabled={state.inProgress} fullWidth onClick={onSkipClicked}>
          Skip
        </Button>
      </Stack>
    </Stack>
  );

  function getContractName(address: { index: bigint; subindex: bigint }) {
    return (
      props.grpcClient
        // Get Instance Information
        .getInstanceInfo(address)
        // Check CIS-2 support, and get contract name
        .then(async (instanceInfo) => {
          const supports = await cis0Supports(props.grpcClient, address, "CIS-2");
          validateSupportsCis2(supports);
          const contractName = instanceInfo.name.replace("init_", "");

          return { contractName };
        })
    );
  }

  function validateSupportsCis2(supports: CIS0.SupportResult | undefined) {
    if (!supports) {
      throw new Error("Could not check if contract supports CIS-2");
    }

    switch (supports?.type) {
      case CIS0.SupportType.SupportBy:
      case CIS0.SupportType.NoSupport:
        throw new Error("Contract does not support CIS-2");
    }
  }

  function transfer(provider: WalletApi, account: string, cis2Contract: CIS2Contract) {
    const transfer = {
      from: account,
      to: props.to,
      tokenAmount: BigInt(form.quantity),
      tokenId: form.tokenId,
    } as CIS2.Transfer;
    const {
      type,
      payload,
      parameter: { json },
      schema,
    } = cis2Contract.createTransfer({ energy: BigInt(20000) }, transfer);

    return provider.sendTransaction(account, type, payload, json, schema as SchemaWithContext);
  }
}
