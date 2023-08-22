import { useState } from 'react';
import FileUpload from 'react-material-file-upload';

import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

import { IPFS_GATEWAY_URL } from '../../../Constants';
import { PinataClient } from '../../../models/PinataClient';
import { tokenIdToArtifactFileName } from '../../../models/Utils';
import DisplayError from '../../ui/DisplayError';

export default function UploadArtifactIpfsCardStep(props: {
  tokenId: string;
  pinata: PinataClient;
  onDone: (input: { tokenId: string; ipfsUrl: string }) => void;
  onSkipped: () => void;
  sx?: any;
}) {
  const [file, setFile] = useState<File>();
  const [state, setState] = useState({
    tokenId: props.tokenId,
    error: "",
    isProcessing: false,
    imageIpfsUrl: "",
  });

  function onFilesChanged(files: File[]) {
    setFile(files[0]);
  }

  function submit() {
    setState({ ...state, isProcessing: true });
    props.pinata
      .uploadFile(IPFS_GATEWAY_URL, file!, tokenIdToArtifactFileName(file!.name, props.tokenId))
      .then((imageIpfsUrl) => {
        setState({
          ...state,
          imageIpfsUrl: imageIpfsUrl,
          isProcessing: false,
          error: "",
        });

        props.onDone({ tokenId: props.tokenId, ipfsUrl: imageIpfsUrl });
      })
      .catch((error: Error) => setState({ ...state, error: error.message, isProcessing: false }));
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>Upload Artifact PDF File</Typography>
        <FileUpload
          value={file ? [file] : []}
          onChange={onFilesChanged}
          multiple={false}
          title={""}
          accept={[".pdf"]}
        />
        <DisplayError error={state.error} />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={submit} type="button" disabled={state.isProcessing || !file}>
          Upload
        </Button>
        <Button size="small" onClick={() => props.onSkipped()} type="button" disabled={state.isProcessing}>
          Skip
        </Button>
      </CardActions>
    </Card>
  );
}
