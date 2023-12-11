import { Buffer } from "buffer/";
import { Cis2ContractInfo, Metadata } from "common-ui";
import React, { FormEvent, useState } from "react";

import { CIS2, sha256 } from "@concordium/web-sdk";
import { Theme } from "@emotion/react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";

import GetMintCardStep from "./GetMintCardStep";
import GetQuantityCardStep from "./GetQuantityCardStep";
import GetTokenIdCardStep from "./GetTokenIdCardStep";
import LazyCis2Metadata from "./LazyCis2Metadata";
import DisplayError from "../ui/DisplayError";

const cardMediaSx: SxProps<Theme> = { maxHeight: "200px" };

enum Steps {
  GetMetadataUrl,
  GetTokenId,
  GetQuantity,
  Mint,
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
  contractInfo: Cis2ContractInfo;
  index: number;
  tokenId: string;
  onDone: (data: { tokenId: string; tokenInfo: [CIS2.MetadataUrl, string] }) => void;
  onCancel: (index: number) => void;
}) {
  const [state, setState] = useState<{
    step: Steps;
    tokenId: string;
    metadata?: Metadata;
    metadataUrl?: CIS2.MetadataUrl;
    quantity?: string;
  }>({ step: Steps.GetMetadataUrl, tokenId: props.tokenId });

  function metadataUrlUpdated(metadataUrl: CIS2.MetadataUrl, metadata: Metadata) {
    setState({
      ...state,
      metadataUrl: metadataUrl,
      metadata,
      step: Steps.GetTokenId,
    });
  }

  function tokenIdUpdated(tokenId: string) {
    setState({ ...state, tokenId, step: Steps.GetQuantity });
  }

  function quantityUpdated(tokenId: string, quantity: string) {
    setState({ ...state, step: Steps.Mint, tokenId, quantity });
    props.onDone({ tokenId, tokenInfo: [state.metadataUrl!, quantity] });
  }

  switch (state.step) {
    case Steps.GetMetadataUrl:
      return (
        <GetMetadataUrlCardStep
          key={props.index}
          onDone={metadataUrlUpdated}
          onCancel={() => props.onCancel(props.index)}
        />
      );
    case Steps.GetTokenId:
      return (
        <GetTokenIdCardStep
          tokenId={props.tokenId}
          key={props.index}
          imageUrl={state.metadata?.display?.url}
          onDone={(data) => tokenIdUpdated(data.tokenId)}
        />
      );
    case Steps.GetQuantity:
      return (
        <GetQuantityCardStep
          imageUrl={state.metadata?.display?.url}
          tokenId={state.tokenId}
          key={state.tokenId}
          onDone={(data) => quantityUpdated(data.tokenId, data.quantity)}
        />
      );
    case Steps.Mint:
      return (
        <GetMintCardStep
          imageUrl={state.metadata?.display?.url}
          imageIpfsUrl={state.metadata?.display?.url}
          tokenId={state.tokenId}
          metadataUrl={state.metadataUrl!}
          quantity={state.quantity}
        />
      );
    default:
      return <></>;
  }
}

export default Cis2BatchItemMetadataAdd;
