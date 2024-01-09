import { FormEvent, useState } from 'react';

import { CIS2, sha256 } from '@concordium/web-sdk';
import {
    Button, Card, CardActions, CardContent, CardMedia, Checkbox, FormControlLabel, FormGroup, Link,
    Stack, TextField, Typography
} from '@mui/material';

import { PinataClient } from '../../../models/PinataClient';
import { Metadata } from '../../../models/ProjectNFTClient';
import { tokenIdToTokenMetadataFileName } from '../../../models/Utils';
import DisplayError from '../../ui/DisplayError';

export default function UploadMetadataIpfsCardStep(props: {
  tokenId: string;
  imageUrl: string;
  pinata: PinataClient;
  imageIpfsUrl: string;
  onDone: (data: { tokenId: string; metadataUrl: CIS2.MetadataUrl; metadata: Metadata }) => void;
  artifactIpfsUrl?: string;
  sx?: any;
}) {
  const [state, setState] = useState({
    isUploadingMetadata: false,
    metadataUrl: { url: "", hash: "" } as CIS2.MetadataUrl,
    error: "",
  });

  const attributes = [
    {
      type: "string",
      name: "Registry",
      value: "",
    },
    {
      type: "string",
      name: "Serial Key",
      value: "",
    },
    {
      type: "number",
      name: "Number of Credits",
      value: "",
    },
    {
      type: "string",
      name: "Project Name",
      value: "",
    },
    {
      type: "string",
      name: "Project Description",
      value: "",
    },
    {
      type: "string",
      name: "Methodology",
      value: "",
    },
    {
      type: "string",
      name: "Vintage",
      value: "",
    },
    {
      type: "string",
      name: "Country",
      value: "",
    },
    {
      type: "string",
      name: "Latitude",
      value: "",
    },
    {
      type: "string",
      name: "Longitude",
      value: "",
    },
    {
      type: "string",
      name: "Token Type",
      value: "Register",
    },
  ];

  function uploadMetadataClicked(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const metadata: Metadata = {
      name: formData.get("name")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      display: { url: props.imageIpfsUrl },
      artifact: props.artifactIpfsUrl ? { url: props.artifactIpfsUrl } : undefined,
      unique: !!formData.get("unique")?.toString(),
      attributes: attributes
        .map((a) => ({
          type: a.type,
          name: a.name,
          value: formData.get(a.name)?.toString() || "",
        }))
        .filter((a) => !!a.value),
    };
    const includeHash = formData.get("includeHash")?.toString();
    setState({ ...state, isUploadingMetadata: true });
    props.pinata
      .uploadJson(metadata, tokenIdToTokenMetadataFileName(props.tokenId))
      .then((metadataIpfsUrl) => {
        const metadataUrl = {
          url: metadataIpfsUrl,
          hash: includeHash ? sha256([Buffer.from(JSON.stringify(metadata))]).toString("hex") : "",
        };
        setState({
          ...state,
          metadataUrl,
          isUploadingMetadata: false,
          error: "",
        });
        props.onDone({ tokenId: props.tokenId, metadataUrl, metadata });
      })
      .catch((error: Error) => setState({ ...state, error: error.message, isUploadingMetadata: false }));
  }

  return (
    <Card variant="outlined">
      <CardMedia component="img" image={props.imageUrl} alt="NFT" sx={props.sx} />
      <>
        <form onSubmit={(e) => uploadMetadataClicked(e)}>
          <CardContent>
            <Typography>Create Metadata</Typography>
            <Link href={props.imageIpfsUrl} variant="caption">
              Image IPFS Url
            </Link>
            <Stack spacing={2}>
              <FormGroup>
                <TextField
                  name="name"
                  id="name"
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  required={true}
                  defaultValue={`Token ${props.tokenId}`}
                />
                <TextField
                  multiline={true}
                  name="description"
                  id="description"
                  label="Description"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  required={true}
                  defaultValue={`Image for token: ${props.tokenId}`}
                />
                <TextField
                  multiline={true}
                  name="artifactUrl"
                  id="artifact-url"
                  label="Artifact Url"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  defaultValue={props.artifactIpfsUrl}
                  disabled={!!props.artifactIpfsUrl}
                />
              </FormGroup>
              <FormGroup>
                <Stack spacing={1}>
                  {attributes.map((a) => (
                    <TextField
                      key={a.name}
                      name={a.name}
                      id={a.name}
                      label={a.name}
                      variant="outlined"
                      size="small"
                      fullWidth={true}
                      required={true}
                      defaultValue={a.value}
                      disabled={!!a.value}
                    />
                  ))}
                </Stack>
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked name="includeHash" id="include-hash" />}
                  label="Include Hash"
                />
                <FormControlLabel control={<Checkbox defaultChecked name="unique" id="unique" />} label="Unique" />
              </FormGroup>
            </Stack>
            <DisplayError error={state.error} />
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" disabled={state.isUploadingMetadata} type="submit">
              Create
            </Button>
          </CardActions>
        </form>
      </>
    </Card>
  );
}
