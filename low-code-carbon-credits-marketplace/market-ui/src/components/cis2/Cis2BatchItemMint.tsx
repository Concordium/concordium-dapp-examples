import React from 'react';

import { CIS2 } from '@concordium/web-sdk';
import {
    Card, CardContent, CardMedia, Link, Skeleton, SxProps, Theme, Tooltip, Typography
} from '@mui/material';

import { ContractInfo } from '../../models/ConcordiumContractClient';
import LazyCis2Metadata from './LazyCis2Metadata';
import { toIpfsGatewayUrl } from '../../utils';

const cardMediaSx: SxProps<Theme> = { maxHeight: "200px" };

function Cis2BatchItemMint(props: {
  contractInfo: ContractInfo;
  token: { metadataUrl: CIS2.MetadataUrl; maturityTime: Date };
  minting: boolean;
  minted: boolean;
}) {
  const heading = props.minting ? "Minting" : props.minted ? "Minted" : "Ready to be Minted";
  return (
    <Card variant="outlined">
      <LazyCis2Metadata
        metadataUrl={props.token.metadataUrl}
        loadedTemplate={(metadata) => (
          <CardMedia component="img" image={toIpfsGatewayUrl(metadata.display?.url)} alt="NFT" sx={cardMediaSx} />
        )}
        loadingTemplate={() => (
          <Skeleton sx={{ ...cardMediaSx, height: "200px" }} animation="wave" variant="rectangular" />
        )}
        errorLoadingTemplate={(error) => <Typography>{error}</Typography>}
      />
      <CardContent>
        <Typography>{heading}</Typography>
        <Typography variant="caption" component="div">
          Maturity Time: {props.token.maturityTime.toLocaleString()}
        </Typography>
        <Tooltip title={props.token.metadataUrl.hash || "Hash Not Included"}>
          <Link href={props.token.metadataUrl.url} variant="caption" target="_blank">
            Metadata Url
          </Link>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

export default Cis2BatchItemMint;
