import React, { useState } from 'react';

import { CIS2 } from '@concordium/web-sdk';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

import { PinataClient } from '../../models/PinataClient';
import { TokenInfo } from '../../models/ProjectNFTClient';
import GetMaturityTimeCardStep from './metadata-prepare-steps/GetMaturityTimeCardStep';
import GetMintCardStep from './metadata-prepare-steps/GetMintCardStep';
import UploadArtifactIpfsCardStep from './metadata-prepare-steps/UploadArtifactIpfsCardStep';
import UploadImageIpfsCardStep from './metadata-prepare-steps/UploadImageIpfsCardStep';
import UploadMetadataIpfsCardStep from './metadata-prepare-steps/UploadMetadataIpfsCardStep';

const cardMediaSx: SxProps<Theme> = { maxHeight: "200px" };

enum Steps {
  UploadImage = 0,
  UploadArtifact = 1,
  CreateMetadata = 2,
  GetMaturityTime = 3,
  Mint = 4,
}

function Cis2BatchItemMetadataPrepare(props: {
  file: File;
  pinataJwtKey: string;
  tokenId: string;
  onDone: (data: { tokenId: string; tokenInfo: TokenInfo }) => void;
}) {
  const pinata = new PinataClient(props.pinataJwtKey);
  const [artifactUrl, setArtifactUrl] = useState("");
  const [step, setStep] = useState(Steps.UploadImage);
  const { tokenId } = props;
  const imageDisplayUrl = URL.createObjectURL(props.file);
  const [imageIpfsUrl, setImageIpfsUrl] = useState("");
  const [metadataUrl, setMetadataUrl] = useState<CIS2.MetadataUrl>();
  const [maturityTime, setMaturityTime] = useState<Date>();

  function goForward(skip = 1) {
    setStep(step + skip);
  }

  function imageUploaded(tokenId: string, imageIpfsUrl: string) {
    setImageIpfsUrl(imageIpfsUrl);
    goForward();
  }

  function artifactUploaded(_: string, ipfsUrl: string) {
    setArtifactUrl(ipfsUrl);
    goForward();
  }

  function metadataUploaded(_: string, metadataUrl: CIS2.MetadataUrl) {
    setMetadataUrl(metadataUrl);
    goForward();
  }

  function maturityTimeUpdated(tokenId: string, maturityTime: Date) {
    setMaturityTime(maturityTime);
    goForward();
    props.onDone({ tokenId, tokenInfo: { metadataUrl: metadataUrl!, maturityTime } });
  }

  switch (step) {
    case Steps.UploadImage:
      return (
        <UploadImageIpfsCardStep
          file={props.file}
          imageUrl={imageDisplayUrl}
          pinata={pinata}
          tokenId={tokenId}
          key={tokenId}
          onDone={(data) => imageUploaded(data.tokenId, data.imageIpfsUrl)}
          sx={cardMediaSx}
        />
      );
    case Steps.UploadArtifact:
      return (
        <UploadArtifactIpfsCardStep
          pinata={pinata}
          tokenId={tokenId}
          key={tokenId}
          onDone={({ tokenId, ipfsUrl }) => artifactUploaded(tokenId, ipfsUrl)}
          onSkipped={() => goForward()}
          sx={cardMediaSx}
        />
      );
    case Steps.CreateMetadata:
      return (
        <UploadMetadataIpfsCardStep
          pinata={pinata}
          tokenId={tokenId}
          imageUrl={imageDisplayUrl}
          imageIpfsUrl={imageIpfsUrl}
          key={tokenId}
          artifactIpfsUrl={artifactUrl}
          onDone={({ tokenId, metadataUrl }) => metadataUploaded(tokenId, metadataUrl)}
        />
      );
    case Steps.GetMaturityTime:
      return (
        <GetMaturityTimeCardStep
          imageUrl={imageDisplayUrl}
          tokenId={tokenId}
          key={tokenId}
          onDone={(data) => maturityTimeUpdated(data.tokenId, data.maturityTime)}
        />
      );
    case Steps.Mint:
      return (
        <GetMintCardStep
          imageUrl={imageDisplayUrl}
          imageIpfsUrl={imageIpfsUrl}
          tokenId={tokenId}
          metadataUrl={metadataUrl!}
          maturityTime={maturityTime!}
        />
      );
    default:
      return <></>;
  }
}

export default Cis2BatchItemMetadataPrepare;
