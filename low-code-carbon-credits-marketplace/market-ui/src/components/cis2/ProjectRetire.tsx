import { useState } from 'react';

import { ConcordiumGRPCClient, ContractAddress, TransactionStatusEnum } from '@concordium/web-sdk';
import { Button, Stack, TextField } from '@mui/material';

import { connectToWallet, ContractInfo } from '../../models/ConcordiumContractClient';
import { retire } from '../../models/ProjectNFTClient';
import DisplayError from '../ui/DisplayError';
import TransactionProgress from '../ui/TransactionProgress';

export function ProjectRetire(props: {
  grpcClient: ConcordiumGRPCClient;
  contractInfo: ContractInfo;
  address: ContractAddress;
  onDone: (output: { tokenIds: string[] }) => void;
}) {
  const [form, setForm] = useState({
    tokenId: "",
  });
  const [txn, setTxn] = useState<{ hash: string; status: TransactionStatusEnum }>();

  const [state, setState] = useState({
    isProcessing: false,
    error: "",
  });

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({
      ...state,
      isProcessing: true,
      error: "",
    });
    setTxn(undefined);

    connectToWallet()
      .then((wallet) =>
        retire(
          wallet.provider,
          wallet.account,
          props.address,
          props.contractInfo,
          { owner: { Account: [wallet.account] }, tokens: [{ token_id: form.tokenId, amount: "1" }] },
          BigInt(9999),
          (status, hash) => setTxn({ status, hash }),
        ),
      )
      .then(() => {
        setState({ ...state, isProcessing: false });
        props.onDone({ tokenIds: [form.tokenId] });
      })
      .catch((e: Error) => {
        console.error(e);
        setState({ ...state, isProcessing: false, error: e.message });
      });
  };

  return (
    <>
      <Stack spacing={2} component={"form"} onSubmit={onsubmit}>
        <TextField
          name="tokenId"
          id="tokenId"
          label="Token ID"
          variant="standard"
          fullWidth
          onChange={(e) => setForm({ ...form, tokenId: e.target.value })}
        />
        <DisplayError error={state.error} />
        <Button type="submit" variant="contained" color="primary">
          Retire
        </Button>
        {txn && <TransactionProgress hash={txn.hash} status={txn.status} />}
      </Stack>
    </>
  );
}
