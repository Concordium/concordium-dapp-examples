import React, { useState } from 'react';

import { ContractAddress, TransactionStatusEnum } from '@concordium/web-sdk';
import { Alert, Button, Grid, Stack, Typography } from '@mui/material';

import { connectToWallet, ContractInfo } from '../../models/ConcordiumContractClient';
import { mint, TokenInfo } from '../../models/ProjectNFTClient';
import { ModuleEvent } from '../../models/web/Events';
import DisplayError from '../ui/DisplayError';
import TransactionProgress from '../ui/TransactionProgress';
import Cis2BatchItemMint from './Cis2BatchItemMint';

function Cis2BatchMint(props: {
  contractInfo: ContractInfo;
  tokenContractAddress: ContractAddress;
  tokenMetadataMap: TokenInfo[];
  /**
   * Called by the component on successfull minting with an array of generated token ids.
   * @param data Token Ids
   * @returns
   */
  onDone: (data: ModuleEvent[]) => void;
}) {
  const [state, setState] = useState({
    minted: false,
    minting: false,
    error: "",
  });
  const [txn, setTxn] = useState<{ hash: string; status: TransactionStatusEnum }>();

  function onMintClicked() {
    setState({ ...state, minting: true, error: "" });
    setTxn(undefined);
    connectToWallet()
      .then((wallet) =>
        mint(
          wallet.provider,
          wallet.account,
          props.tokenMetadataMap,
          props.tokenContractAddress,
          props.contractInfo,
          BigInt(9999),
          (status, hash) => setTxn({ status, hash }),
        ),
      )
      .then((tokens) => {
        setState({ ...state, minting: false, minted: true });
        props.onDone(tokens);
      })
      .catch((e: Error) => {
        console.error(e);
        setState({ ...state, minting: false, minted: false, error: e.message });
      });
  }

  return (
    <Stack spacing={2}>
      <Alert severity="info">
        <Typography variant="button" color={"InfoText"}>
          <>
            Contract : {props.tokenContractAddress.index.toString()}/{props.tokenContractAddress.subindex.toString()} (
            {props.contractInfo.contractName})
          </>
        </Typography>
      </Alert>
      <Grid container spacing={2}>
        {props.tokenMetadataMap.map((token) => (
          <Grid item xs={4} key={token.metadataUrl.url}>
            <Cis2BatchItemMint
              contractInfo={props.contractInfo}
              key={token.metadataUrl.url}
              token={token}
              minted={state.minted}
              minting={state.minting}
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={() => onMintClicked()}>
        Mint
      </Button>
      {txn && <TransactionProgress hash={txn.hash} status={txn.status} />}
      <DisplayError error={state.error} />
    </Stack>
  );
}

export default Cis2BatchMint;
