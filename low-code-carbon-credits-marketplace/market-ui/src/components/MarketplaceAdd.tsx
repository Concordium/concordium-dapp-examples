import React, { FormEvent, useState } from 'react';

import {
    CIS2Contract, ConcordiumGRPCClient, ContractAddress, TransactionStatusEnum
} from '@concordium/web-sdk';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';

import { MARKETPLACE_CONTRACT_INFO } from '../Constants';
import { add, AddParams } from '../models/CarbonCreditMarketClient';
import { connectToWallet, toParamContractAddress } from '../models/ConcordiumContractClient';
import TransactionProgress from './ui/TransactionProgress';

interface MarketplaceAddProps {
  grpcClient: ConcordiumGRPCClient;
  marketContractAddress: ContractAddress;
  nftContractAddress: ContractAddress;
  cis2Contract: CIS2Contract;
  tokenId: string;
  onDone: () => void;
}

/**
 * Displays UI to add a token to the list of buyable tokens on Marketplace.
 */
function MarketplaceAdd(props: MarketplaceAddProps) {
  const [state, setState] = useState({
    inProgress: false,
    error: "",
  });
  const [txn, setTxn] = useState<{ hash?: string; status?: TransactionStatusEnum }>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const price = formData.get("price")?.toString() || "";
    const royalty = formData.get("royalty")?.toString() || "0";

    if (!price || BigInt(price) <= 0) {
      setState({ ...state, error: "Invalid Price" });
      return;
    }

    if (!royalty || parseInt(royalty) < 0) {
      setState({ ...state, error: "Invalid Royalty" });
      return;
    }

    setState({ ...state, inProgress: true, error: "" });

    const paramJson: AddParams = {
      price,
      royalty: parseInt(royalty) * 100, //conversion to basis points
      cis_contract_address: toParamContractAddress(props.nftContractAddress),
      token_id: props.tokenId,
    };

    connectToWallet()
      .then((wallet) =>
        add(
          wallet.provider,
          wallet.account,
          props.marketContractAddress,
          paramJson,
          MARKETPLACE_CONTRACT_INFO,
          BigInt(9999),
          (status, hash) => setTxn({ hash, status }),
        ),
      )
      .then(() => {
        setState({ ...state, error: "", inProgress: false });
        props.onDone();
      })
      .catch((err: Error) => {
        setState({ ...state, error: err.message, inProgress: false });
      });
  }

  return (
    <Stack component={"form"} onSubmit={submit} spacing={2}>
      <TextField
        id="nft-contract-address-index"
        label="NFT Contract Address Index"
        variant="standard"
        value={props.nftContractAddress.index.toString()}
        disabled
        fullWidth
      />
      <TextField
        id="nft-contract-address-subindex"
        label="NFT Contract Address Subindex"
        variant="standard"
        value={props.nftContractAddress.subindex.toString()}
        disabled
        fullWidth
      />
      <TextField id="token-id" label="Token Id" variant="standard" value={props.tokenId} disabled fullWidth />
      <TextField
        name="price"
        id="price"
        type="number"
        label="Token Price in CCD"
        variant="standard"
        fullWidth
        disabled={state.inProgress}
        required
      />
      <TextField
        name="royalty"
        id="royalty"
        type="number"
        label="Primary Seller Royalty %"
        variant="standard"
        fullWidth
        disabled={state.inProgress}
        required
        defaultValue="0"
      />
      {state.error && (
        <Typography color={"error"} variant={"body1"} component="div" gutterBottom>
          {state.error}
        </Typography>
      )}
      {txn.hash && txn.status && (
        <Container>
          <TransactionProgress hash={txn.hash} status={txn.status} />
        </Container>
      )}
      <Button variant="contained" disabled={state.inProgress} type="submit">
        Add
      </Button>
    </Stack>
  );
}

export default MarketplaceAdd;
