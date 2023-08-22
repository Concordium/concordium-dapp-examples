import React, { useState } from 'react';

import { Button, ButtonGroup, Grid, Typography } from '@mui/material';

import { ContractInfo } from '../../models/ConcordiumContractClient';
import { TokenInfo } from '../../models/ProjectNFTClient';
import Cis2BatchItemMetadataAdd from './Cis2BatchItemMetadataAdd';

interface Tokens {
  [tokenId: string]: TokenInfo;
}

function Cis2BatchMetadataAdd(props: {
  contractInfo: ContractInfo;
  onDone: (tokens: Tokens) => void;
  startingTokenId: number;
}) {
  const [state, setState] = useState<{
    error: string;
    tokens: { tokenId: string; tokenInfo?: TokenInfo }[];
  }>({
    error: "",
    tokens: [],
  });

  function onMetadataPrepared(index: number, tokenId: string, tokenInfo: TokenInfo) {
    const tokens = [...state.tokens];
    tokens[index] = { tokenId, tokenInfo };
    setState({ ...state, tokens });
  }

  function onAdd() {
    const tokens = [...state.tokens];
    tokens.push({
      tokenId: (tokens.length + 1 + props.startingTokenId).toString(),
    });

    setState({ ...state, tokens });
  }

  function onRemove(index: number) {
    const tokens = [...state.tokens];
    tokens.splice(index, 1);

    setState({ ...state, tokens });
  }

  function onDone() {
    setState({ ...state, error: "" });
    const anyInValidForm = state.tokens.findIndex((t) => !t.tokenInfo || !t.tokenId);

    if (anyInValidForm > -1) {
      setState({ ...state, error: "Invalid Values. Please check again" });
      return;
    }

    const ret: Tokens = {};
    state.tokens.filter((t) => t.tokenInfo).forEach((t) => (ret[t.tokenId] = t.tokenInfo!));

    props.onDone(ret);
  }

  return (
    <>
      {state.error && (
        <div>
          <Typography>{state.error}</Typography>
        </div>
      )}
      <ButtonGroup fullWidth>
        <Button onClick={() => onAdd()} variant="contained" size="large">
          Add new metadata URL
        </Button>
      </ButtonGroup>
      <Grid container spacing={2} padding="10px">
        {state.tokens.map((token, index) => (
          <Grid item xs={4} key={index.toString()}>
            <Cis2BatchItemMetadataAdd
              contractInfo={props.contractInfo}
              index={index}
              tokenId={token.tokenId}
              onDone={(data) => onMetadataPrepared(index, data.tokenId, data.tokenInfo)}
              onCancel={(index: number) => onRemove(index)}
            />
          </Grid>
        ))}
      </Grid>
      <ButtonGroup fullWidth>
        <Button onClick={() => onDone()} size="large">
          Done
        </Button>
      </ButtonGroup>
    </>
  );
}

export default Cis2BatchMetadataAdd;
