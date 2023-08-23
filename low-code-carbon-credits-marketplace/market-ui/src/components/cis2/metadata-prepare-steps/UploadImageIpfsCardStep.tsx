import { useState } from 'react';

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { PinataClient } from '../../../models/PinataClient';
import { tokenIdToTokenImageFileName } from '../../../models/Utils';
import DisplayError from '../../ui/DisplayError';

export default function UploadImageIpfsCardStep(props: {
  tokenId: string;
  file: File;
  imageUrl: string;
  pinata: PinataClient;
  onDone: (input: { tokenId: string; imageIpfsUrl: string }) => void;
  sx?: any;
}) {
  const [state, setState] = useState({
    tokenId: props.tokenId,
    error: "",
    imageUrl: props.imageUrl,
    isUploadingImage: false,
    imageIpfsUrl: "",
  });

  function submit() {
    setState({ ...state, isUploadingImage: true });
    props.pinata
      .uploadFile(props.file, tokenIdToTokenImageFileName(props.file.name, props.tokenId))
      .then((imageIpfsUrl) => {
        setState({
          ...state,
          imageIpfsUrl: imageIpfsUrl,
          isUploadingImage: false,
          error: "",
        });

        props.onDone({ tokenId: props.tokenId, imageIpfsUrl });
      })
      .catch((error: Error) => setState({ ...state, error: error.message, isUploadingImage: false }));
  }

  return (
    <Card variant="outlined">
      <CardMedia component="img" image={props.imageUrl} alt="NFT" sx={props.sx} />
      <>
        <CardContent>
          <Typography>Upload File</Typography>
          <DisplayError error={state.error} />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={submit} type="button" disabled={state.isUploadingImage}>
            Upload Image
          </Button>
        </CardActions>
      </>
    </Card>
  );
}
