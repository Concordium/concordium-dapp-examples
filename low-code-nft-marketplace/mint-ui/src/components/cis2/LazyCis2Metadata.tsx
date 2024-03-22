import { fetchJsonString, Metadata } from 'common-ui';
import React, { useEffect, useState } from 'react';

import { CIS2 } from '@concordium/web-sdk';
import { toIpfsGatewayUrl } from '../../utils';

function LazyCis2Metadata(props: {
    metadataUrl: CIS2.MetadataUrl;
    loadingTemplate: () => React.ReactElement;
    loadedTemplate: (metadata: Metadata) => React.ReactElement;
    errorLoadingTemplate: (error: string) => React.ReactElement;
    onMetadataLoaded?: (metadata: string) => void;
}) {
    const [state, setState] = useState<{
        metadata?: Metadata;
        loadingMetadata: boolean;
        error: string;
    }>({ loadingMetadata: false, error: '' });

    useEffect(() => {
        setState((state) => ({ ...state, loadingMetadata: true }));
        fetchJsonString(toIpfsGatewayUrl(props.metadataUrl.url))
            .then((metadata) => {
                setState((state) => ({ ...state, metadata: JSON.parse(metadata) as Metadata, loadingMetadata: false }));
                props.onMetadataLoaded && props.onMetadataLoaded(metadata);
            })
            .catch((err: Error) => {
                setState((state) => ({
                    ...state,
                    loadingMetadata: false,
                    error: err.message,
                }));
            });
    }, [props]);

    if (state.error) {
        return props.errorLoadingTemplate(state.error.toString());
    } else if (state.loadingMetadata) {
        return props.loadingTemplate();
    } else if (state.metadata) {
        return props.loadedTemplate(state.metadata);
    } else {
        return <></>;
    }
}

export default LazyCis2Metadata;
