import React from 'react';

import { CIS2 } from '@concordium/web-sdk';
import { Card, CardContent, CardMedia, Link, SxProps, Theme, Typography } from '@mui/material';

const cardMediaSx: SxProps<Theme> = { maxHeight: "200px" };

function GetMintCardStep(props: {
  imageUrl?: string;
  tokenId: string;
  imageIpfsUrl?: string;
  metadataUrl: CIS2.MetadataUrl;
  maturityTime: Date;
}) {
  return (
    <Card variant="outlined">
      <CardMedia component="img" image={props.imageUrl} alt="NFT" sx={cardMediaSx} />
      <CardContent>
        <Typography>Ready to be Minted</Typography>
        <Typography variant="caption" component="div">
          Maturity Time: {props.maturityTime.toLocaleString()}
        </Typography>
        <Link href={props.imageIpfsUrl} variant="caption" display="block">
          Image IPFS Url
        </Link>
        <Link href={props.metadataUrl.url} variant="caption" target="_blank">
          Metadata Url
        </Link>
      </CardContent>
    </Card>
  );
}

export default GetMintCardStep;
