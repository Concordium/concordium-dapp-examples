import { Cis2ContractInfo, toTokenId } from 'common-ui';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';

import { CIS2 } from '@concordium/web-sdk';
import { Grid, Typography } from '@mui/material';

import Cis2BatchItemMetadataPrepare from './Cis2BatchItemMetadataPrepare';

function Cis2BatchMetadataPrepare(props: {
    files: File[];
    pinataJwt: string;
    contractInfo: Cis2ContractInfo;
    onDone: (tokens: Record<string, [CIS2.MetadataUrl, string]>) => void;
}) {
    const filesMap: Record<
        string,
        {
            file: File;
            tokenId?: string;
            tokenInfo?: [CIS2.MetadataUrl, string];
        }
    > = {};
    props.files.forEach((file) => (filesMap[file.name] = { file }));

    const [state, setState] = useState({
        files: filesMap,
        error: '',
        filesCount: props.files.length,
        preparedFilesCount: 0,
    });

    function onMetadataPrepared(filename: string, tokenId: string, tokenInfo: [CIS2.MetadataUrl, string]) {
        const newState = {
            files: {
                ...state.files,
                [filename]: {
                    ...state.files[filename],
                    tokenId,
                    tokenInfo,
                },
            },
        };

        const preparedFilesCount = Object.values(newState.files).filter((f) => f.tokenId && f.tokenInfo).length;

        setState({ ...state, ...newState, preparedFilesCount });

        if (preparedFilesCount === props.files.length) {
            const ret: Record<string, [CIS2.MetadataUrl, string]> = {};
            Object.values(newState.files).forEach((f) => (ret[f.tokenId!] = f.tokenInfo!));

            props.onDone(ret);
        }
    }

    return (
        <>
            {state.error && (
                <div>
                    <Typography>{state.error}</Typography>
                </div>
            )}
            <Typography>
                Total no of files : {state.preparedFilesCount} / {props.files.length}
            </Typography>
            <Grid container spacing={2} padding="10px">
                {props.files.map((file, index) => (
                    <Grid item xs={4} key={file.name}>
                        <Cis2BatchItemMetadataPrepare
                            file={file}
                            tokenId={toTokenId(index + 1, props.contractInfo)}
                            pinataJwtKey={props.pinataJwt}
                            onDone={(data) => onMetadataPrepared(file.name, data.tokenId, data.tokenInfo)}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Cis2BatchMetadataPrepare;
