import React, { useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { ContractInfo } from '../../models/ConcordiumContractClient';
import { TokenInfo } from '../../models/ProjectNFTClient';
import Cis2BatchMetadataAdd from './Cis2BatchMetadataAdd';
import Cis2BatchMetadataPrepare from './Cis2BatchMetadataPrepare';

interface Tokens {
  [tokenId: string]: TokenInfo;
}

function Cis2BatchMetadataPrepareOrAdd(props: {
  contractInfo: ContractInfo;
  files?: File[];
  pinataJwt?: string;
  onDone: (tokens: TokenInfo[]) => void;
}) {
  const [state, setState] = useState({
    isPrepDone: props.files && props.files.length ? false : true,
    isAddDone: false,
    tokens: [] as TokenInfo[],
  });

  function onPrepDone(tokens: Tokens) {
    const tokensCombined = [ ...state.tokens, ...Object.values(tokens) ];

    setState({
      ...state,
      isPrepDone: true,
      tokens: tokensCombined,
    });

    if (state.isAddDone) {
      props.onDone(tokensCombined);
    }
  }

  function onAddDone(tokens: Tokens) {
    const tokensCombined = [ ...state.tokens, ...Object.values(tokens) ];
    setState({
      ...state,
      isAddDone: true,
      tokens: tokensCombined,
    });

    if (state.isPrepDone) {
      props.onDone(tokensCombined);
    }
  }

  return (
    <Stack>
      {props.files && props.files.length && props.pinataJwt ? (
        <Cis2BatchMetadataPrepare
          contractInfo={props.contractInfo}
          files={props.files}
          pinataJwt={props.pinataJwt}
          onDone={onPrepDone}
        />
      ) : (
        <Typography variant="body1" component="div" gutterBottom>
          No uploaded Files
        </Typography>
      )}

      <Cis2BatchMetadataAdd
        contractInfo={props.contractInfo}
        onDone={onAddDone}
        startingTokenId={props.files?.length || 0}
      />
    </Stack>
  );
}

export default Cis2BatchMetadataPrepareOrAdd;
