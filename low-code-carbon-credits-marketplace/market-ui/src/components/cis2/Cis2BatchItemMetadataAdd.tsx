import { Buffer } from 'buffer/';
import React, { FormEvent, useState } from 'react';

import { CIS2, sha256 } from '@concordium/web-sdk';
import { Theme } from '@emotion/react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
    Button, Card, CardActions, CardContent, CardMedia, Checkbox, FormControlLabel, Skeleton, Stack,
    SxProps, TextField, Typography
} from '@mui/material';

import { ContractInfo } from '../../models/ConcordiumContractClient';
import { Metadata, TokenInfo } from '../../models/ProjectNFTClient';
import DisplayError from '../ui/DisplayError';
import LazyCis2Metadata from './LazyCis2Metadata';
import GetMaturityTimeCardStep from './metadata-prepare-steps/GetMaturityTimeCardStep';
import GetMintCardStep from './metadata-prepare-steps/GetMintCardStep';

const cardMediaSx: SxProps<Theme> = { maxHeight: "200px" };

enum Steps {
  GetMetadataUrl = 0,
  GetMaturityTime = 2,
  Mint = 3,
}

function TokenImage(props: { metadataUrl?: CIS2.MetadataUrl; onMetadataLoaded?: (metadata: string) => void }) {
  const loadingTemplate = <Skeleton sx={{ ...cardMediaSx, height: "200px" }} animation="wave" variant="rectangular" />;

  if (!props.metadataUrl || !props.metadataUrl.url) {
    return <></>;
  }

  return (
    <LazyCis2Metadata
      metadataUrl={props.metadataUrl}
      loadedTemplate={(metadata) => {
        return <CardMedia component="img" image={metadata.display?.url} alt="NFT" sx={cardMediaSx} />;
      }}
      loadingTemplate={() => loadingTemplate}
      errorLoadingTemplate={(error) => (
        <Stack spacing={2}>
          <ErrorOutlineIcon sx={{ ...cardMediaSx, width: "100%", mt: "10px" }} color="error" fontSize="large" />
          <Typography variant="caption">{error}</Typography>
        </Stack>
      )}
      onMetadataLoaded={props.onMetadataLoaded}
    />
  );
}

function GetMetadataUrlCardStep(props: {
  onDone: (metadataUrl: CIS2.MetadataUrl, metadata: Metadata) => void;
  onCancel: () => void;
}) {
  const [state, setState] = useState<{
    error?: string;
    metadataUrl?: CIS2.MetadataUrl;
    metadata?: Metadata;
    includeHash?: boolean;
  }>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url")?.toString() || "";
    const includeHash = formData.get("includeHash")?.toString();

    if (!url) {
      setState({ ...state, error: "Invalid Metadata Url" });
      return;
    }

    const metadataUrl = { url, hash: "" };
    setState({ ...state, metadataUrl, error: "", includeHash: !!includeHash });
  }

  function onMetadataLoaded(metadata: string) {
    const metadataUrl = {
      url: state.metadataUrl?.url || "",
      hash: state.includeHash ? sha256([Buffer.from(metadata)]).toString("hex") : "",
    };

    const parsedMetadata = JSON.parse(metadata);
    setState({ ...state, metadata: parsedMetadata, metadataUrl });
    props.onDone(metadataUrl, parsedMetadata);
  }

  return (
    <Card variant="outlined">
      <TokenImage metadataUrl={state.metadataUrl} onMetadataLoaded={onMetadataLoaded} />
      <form onSubmit={(e) => submit(e)}>
        <CardContent>
          <Typography gutterBottom component="div">
            Set Metadata Url
          </Typography>
          <TextField
            name="url"
            id="url"
            label="Metadata Url"
            variant="outlined"
            size="small"
            fullWidth={true}
            required={true}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked name="includeHash" id="include-hash" />}
            label="Include Hash"
          />
          <DisplayError error={state.error} />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" type="submit">
            Ok
          </Button>
          <Button size="small" color="primary" type="button" onClick={() => props.onCancel()}>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

function Cis2BatchItemMetadataAdd(props: {
  contractInfo: ContractInfo;
  index: number;
  tokenId: string;
  onDone: (data: { tokenId: string; tokenInfo: TokenInfo }) => void;
  onCancel: (index: number) => void;
}) {
  const { tokenId } = props;
  const [metadataUrl, setMetadataUrl] = useState<CIS2.MetadataUrl>();
  const [maturityTime, setMaturityTime] = useState<Date>();
  const [metadata, setMetadata] = useState<Metadata>();
  const [step, setStep] = useState<Steps>(Steps.GetMetadataUrl);

  function metadataUrlUpdated(metadataUrl: CIS2.MetadataUrl, metadata: Metadata) {
    setMetadataUrl(metadataUrl);
    setMetadata(metadata);
    setStep(Steps.GetMaturityTime);
  }

  function maturityTimeUpdated(maturityTime: Date) {
    setMaturityTime(maturityTime);
    setStep(Steps.Mint);
    props.onDone({ tokenId, tokenInfo: { metadataUrl: metadataUrl!, maturityTime } });
  }

  switch (step) {
    case Steps.GetMetadataUrl:
      return (
        <GetMetadataUrlCardStep
          key={props.index}
          onDone={metadataUrlUpdated}
          onCancel={() => props.onCancel(props.index)}
        />
      );
    case Steps.GetMaturityTime:
      return (
        <GetMaturityTimeCardStep
          tokenId={tokenId}
          imageUrl={metadata?.display?.url}
          onDone={({ maturityTime }) => maturityTimeUpdated(maturityTime)}
        />
      );
    case Steps.Mint:
      return (
        <GetMintCardStep
          imageUrl={metadata?.display?.url}
          imageIpfsUrl={metadata?.display?.url}
          tokenId={tokenId}
          metadataUrl={metadataUrl!}
          maturityTime={maturityTime!}
        />
      );
    default:
      return <></>;
  }
}

export default Cis2BatchItemMetadataAdd;
