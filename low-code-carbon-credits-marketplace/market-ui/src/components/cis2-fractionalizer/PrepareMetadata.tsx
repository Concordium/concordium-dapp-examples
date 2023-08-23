import { useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

import { CIS2Contract } from '@concordium/web-sdk';

import { getDefaultAttributes } from '../../models/ProjectFractionalizerClient';
import { Metadata } from '../../models/ProjectNFTClient';
import { fetchJson } from '../../models/Utils';
import Cis2TokenMetadataForm from '../cis2/Cis2TokenMetadataForm';
import Alert from '../ui/Alert';
import { toIpfsGatewayUrl } from '../../utils';

export default function PrepareMetadata(props: {
  collateralTokenContract: CIS2Contract;
  collateralTokenId: string;
  onMetadataPrepared: (metadata: Metadata) => void;
}) {
  const { collateralTokenContract: cis2Contract, collateralTokenId: cis2TokenId, onMetadataPrepared } = props;
  const [cis2TokenMetadata, setCis2TokenMetadata] = useState<Metadata>({});
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [state, setState] = useState({
    isProcessing: false,
    error: "",
  });

  const mergeMetadata = (defaultMetadata: Metadata, metadata: Metadata): Metadata => {
    const metadataRes = {
      ...metadata,
      attributes: metadata.attributes || defaultMetadata.attributes,
      name: metadata.name || defaultMetadata.name,
      description: metadata.description || defaultMetadata.description,
      display: metadata.display || defaultMetadata.display,
      artifact: metadata.artifact || defaultMetadata.artifact,
      unique: true
    };

    return metadataRes;
  };

  useEffectOnce(() => {
    setIsLoadingMetadata(true);
    cis2Contract
      .tokenMetadata(cis2TokenId)
      .then((m) => fetchJson<Metadata>(toIpfsGatewayUrl(m.url)))
      .then((metadata) => {
        const mergedMetadata = mergeMetadata({ attributes: getDefaultAttributes(metadata.attributes) }, metadata);
        setCis2TokenMetadata(mergedMetadata);
        setIsLoadingMetadata(false);
      })
      .catch((e) => {
        console.error(e);
        setState({ ...state, error: e.message });
        setIsLoadingMetadata(false);
      });
  });

  if (isLoadingMetadata) {
    return <Alert severity="info" message={"Loading Metadata"} />;
  }

  return (
    <>
      <Cis2TokenMetadataForm defaultFormData={cis2TokenMetadata} onSubmit={onMetadataPrepared} />
    </>
  );
}
