import { fetchJson, Metadata } from 'common-ui';
import React, { useEffect, useState } from 'react';

import { CIS2Contract } from '@concordium/web-sdk';
import { Paper, Skeleton, Typography } from '@mui/material';
import { toIpfsGatewayUrl } from '../../utils';

function Cis2MetadataImageLazy(props: { account: string; tokenId: string; cis2Contract: CIS2Contract }) {
    const [state, setState] = useState<{
        metadata?: Metadata;
        error?: string;
        loading: boolean;
    }>({ loading: false });

    useEffect(() => {
        if (state.metadata) {
            return;
        }

        setState({ ...state, loading: true });
        props.cis2Contract
            .tokenMetadata(props.tokenId)
            .then((m) => fetchJson<Metadata>(toIpfsGatewayUrl(m.url)))
            .then((metadata) => {
                setState({ ...state, loading: false, metadata });
            })
            .catch((_) => setState({ ...state, loading: false, error: 'Failed to load metadata' }));
    }, [props.tokenId, props.cis2Contract]);

    if (state.error) {
        return (
            <Paper variant="elevation" sx={{ width: '100%', height: '100px' }}>
                <Typography variant="h6" component="div">
                    {state.error}
                </Typography>
            </Paper>
        );
    }

    if (state.loading) {
        return <Skeleton variant="rectangular" width={'100%'} height={'200px'} />;
    }

    return (
        <img
            src={toIpfsGatewayUrl(state.metadata?.display?.url)}
            alt="Failed to load image"
            loading="lazy"
            width="100%"
        />
    );
}

export default Cis2MetadataImageLazy;
