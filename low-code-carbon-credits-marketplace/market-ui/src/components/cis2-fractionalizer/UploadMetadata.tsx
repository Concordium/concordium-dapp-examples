import { useState } from 'react';

import { PinataClient } from '../../models/PinataClient';
import { Metadata } from '../../models/ProjectNFTClient';
import ConnectPinata from '../ConnectPinata';

export default function UploadMetadata(props: {
  jwt?: string;
  contents: Metadata;
  fileName: string;
  onMetadataUploaded: (metadataUrl: string, jwt:string) => void;
}) {
  const { contents } = props;
  const [jwt, setJwt] = useState<string>(props.jwt || "");
  const [state, setState] = useState({
    isProcessing: false,
    error: "",
  });

  async function onPinataConnected(jwt: string) {
    setJwt(jwt);
    setState({ ...state, isProcessing: true });
    new PinataClient(jwt)
      .uploadJson(contents, props.fileName)
      .then(url => props.onMetadataUploaded(url, jwt));
  }

  return (
    <>
      <ConnectPinata jwt={jwt} onDone={(jwt) => onPinataConnected(jwt)} disableSkip />
    </>
  );
}
