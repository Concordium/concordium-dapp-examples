import {
    Card, CardContent, CardMedia, Grid, Link, Skeleton, SxProps, Theme, Tooltip, Typography
} from '@mui/material';

import { Cis2MintEvent, Cis2TokenMetadataEvent } from '../../models/web/Events';
import LazyCis2Metadata from './LazyCis2Metadata';
import { toIpfsGatewayUrl } from '../../utils';

const cardMediaSx: SxProps<Theme> = { maxHeight: "200px" };

function Cis2TokenDisplay(props: {
  token: {
    mint: Cis2MintEvent;
    tokenMetadata: Cis2TokenMetadataEvent;
  };
}) {
  const {
    token: { mint, tokenMetadata },
  } = props;

  return (
    <Card variant="outlined">
      <LazyCis2Metadata
        metadataUrl={{ url: tokenMetadata.metadata_url.url, hash: "" }}
        loadedTemplate={(metadata) => (
          <CardMedia component="img" image={toIpfsGatewayUrl(metadata.display?.url)} alt="NFT" sx={cardMediaSx} />
        )}
        loadingTemplate={() => (
          <Skeleton sx={{ ...cardMediaSx, height: "200px" }} animation="wave" variant="rectangular" />
        )}
        errorLoadingTemplate={(error) => <Typography>{error}</Typography>}
      />
      <CardContent>
        <Typography>Token Id: {mint.token_id}</Typography>
        {mint.owner.Account && (
          <Tooltip title={mint.owner.Account[0]}>
            <Typography>Owner: {mint.owner.Account[0].substring(0, 6)}...</Typography>
          </Tooltip>
        )}
        {mint.owner.Contract && (
          <Typography>
            Owner: {mint.owner.Contract[0].index} / {mint.owner.Contract[0].subindex}
          </Typography>
        )}
        <Tooltip title={tokenMetadata.metadata_url.url}>
          <Typography>
            <Link href={tokenMetadata.metadata_url.url} target="_blank" rel="noreferrer">
              Metadata Url
            </Link>
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

export default function Cis2TokensDisplay(props: {
  tokens: {
    mint: Cis2MintEvent;
    tokenMetadata: Cis2TokenMetadataEvent;
  }[];
}) {
  const { tokens } = props;

  return (
    <Grid container spacing={2}>
      {tokens.map((token) => (
        <Grid item xs={4} key={token.mint.token_id}>
          <Cis2TokenDisplay token={token} />
        </Grid>
      ))}
    </Grid>
  );
}
