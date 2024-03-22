import { Cis2ContractInfo } from 'common-ui';

import React, { useState } from 'react';

import { CIS2 } from '@concordium/web-sdk';
import { Stack, Typography } from '@mui/material';

import Cis2BatchMetadataAdd from './Cis2BatchMetadataAdd';
import Cis2BatchMetadataPrepare from './Cis2BatchMetadataPrepare';

function Cis2BatchMetadataPrepareOrAdd(props: {
    contractInfo: Cis2ContractInfo;
    files?: File[];
    pinataJwt?: string;
    onDone: (tokens: Record<string, [CIS2.MetadataUrl, string]>) => void;
}) {
    const [state, setState] = useState({
        isPrepDone: props.files?.length ? false : true,
        isAddDone: false,
        tokens: {},
    });

    function onPrepDone(tokens: Record<string, [CIS2.MetadataUrl, string]>) {
        const tokensCombined = { ...state.tokens, ...tokens };

        setState({
            ...state,
            isPrepDone: true,
            tokens: tokensCombined,
        });

        if (state.isAddDone) {
            props.onDone(tokensCombined);
        }
    }

    function onAddDone(tokens: Record<string, [CIS2.MetadataUrl, string]>) {
        const tokensCombined = { ...state.tokens, ...tokens };
        setState({
            ...state,
            isAddDone: true,
            tokens: tokensCombined,
        });

        if (state.isPrepDone) {
            props.onDone(tokensCombined);
        }
    }

    return (
        <Stack>
            {props.files?.length && props.pinataJwt ? (
                <Cis2BatchMetadataPrepare
                    contractInfo={props.contractInfo}
                    files={props.files}
                    pinataJwt={props.pinataJwt}
                    onDone={onPrepDone}
                />
            ) : (
                <Typography variant="body1" component="div" gutterBottom>
                    {/* No uploaded Files */}
                </Typography>
            )}

            <Cis2BatchMetadataAdd
                contractInfo={props.contractInfo}
                onDone={onAddDone}
                startingTokenId={props.files?.length ?? 0}
            />
        </Stack>
    );
}

export default Cis2BatchMetadataPrepareOrAdd;
