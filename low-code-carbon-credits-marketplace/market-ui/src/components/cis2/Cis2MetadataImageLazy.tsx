import React, { useEffect, useState } from 'react';

import { CIS2Contract } from '@concordium/web-sdk';
import { Skeleton } from '@mui/material';

import { Metadata } from '../../models/ProjectNFTClient';
import { fetchJson } from '../../models/Utils';
import { toIpfsGatewayUrl } from '../../utils';

function Cis2MetadataImageLazy(props: { tokenId: string; cis2Contract: CIS2Contract }) {
  const [state, setState] = useState<{
    metadata?: Metadata;
    error?: string;
    loading: boolean;
  }>({ loading: false });

  useEffect(() => {
    if (state.metadata) {
      return;
    }

    setState({ ...state, loading: true });
    props.cis2Contract
      .tokenMetadata(props.tokenId)
      .then((m) => fetchJson<Metadata>(toIpfsGatewayUrl(m.url)))
      .then((metadata) => {
        setState({ ...state, loading: false, metadata });
      })
      .catch((e) => {
        console.error(e);
        setState({ ...state, loading: false, metadata: undefined });
      });
  }, [props.tokenId, props.cis2Contract]);

  return state.loading ? (
    <Skeleton variant="rectangular" width={"100%"} height={"200px"} />
  ) : (
    <img
      src={toIpfsGatewayUrl(state.metadata?.display?.url)}
      alt={state.metadata?.name}
      loading="lazy"
      style={{ width: "100%", height: "200px", objectFit: "cover" }}
    />
  );
}

export default Cis2MetadataImageLazy;
