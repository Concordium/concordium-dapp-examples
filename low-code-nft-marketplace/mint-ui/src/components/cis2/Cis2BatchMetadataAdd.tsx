import { Cis2ContractInfo, toTokenId } from 'common-ui';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';

import { CIS2 } from '@concordium/web-sdk';
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';

import Cis2BatchItemMetadataAdd from './Cis2BatchItemMetadataAdd';

function Cis2BatchMetadataAdd(props: {
    contractInfo: Cis2ContractInfo;
    onDone: (tokens: Record<string, [CIS2.MetadataUrl, string]>) => void;
    startingTokenId: number;
}) {
    const [state, setState] = useState<{
        error: string;
        tokens: { tokenId: string; tokenInfo?: [CIS2.MetadataUrl, string] }[];
    }>({
        error: '',
        tokens: [],
    });

    function onMetadataPrepared(index: number, tokenId: string, tokenInfo: [CIS2.MetadataUrl, string]) {
        const tokens = [...state.tokens];
        tokens[index] = { tokenId, tokenInfo };
        setState({ ...state, tokens });
    }

    function onAdd() {
        const tokens = [...state.tokens];
        tokens.push({
            tokenId: toTokenId(tokens.length + 1 + props.startingTokenId, props.contractInfo),
        });

        setState({ ...state, tokens });
    }

    function onRemove(index: number) {
        const tokens = [...state.tokens];
        tokens.splice(index, 1);

        setState({ ...state, tokens });
    }

    function onDone() {
        setState({ ...state, error: '' });
        const anyInValidForm = state.tokens.findIndex((t) => !t.tokenInfo || !t.tokenId);

        if (anyInValidForm > -1) {
            setState({ ...state, error: 'Invalid Values. Please check again' });
            return;
        }

        const ret: Record<string, [CIS2.MetadataUrl, string]> = {};
        state.tokens.filter((t) => t.tokenInfo).forEach((t) => (ret[t.tokenId] = t.tokenInfo!));

        props.onDone(ret);
    }

    return (
        <>
            {state.error && (
                <div>
                    <Typography>{state.error}</Typography>
                </div>
            )}
            <ButtonGroup fullWidth>
                <Button onClick={() => onAdd()} variant="contained" size="large">
                    Add new metadata URL
                </Button>
            </ButtonGroup>
            <Grid container spacing={2} padding="10px">
                {state.tokens.map((token, index) => (
                    <Grid item xs={4} key={index.toString()}>
                        <Cis2BatchItemMetadataAdd
                            contractInfo={props.contractInfo}
                            index={index}
                            tokenId={token.tokenId}
                            onDone={(data) => onMetadataPrepared(index, data.tokenId, data.tokenInfo)}
                            onCancel={(index: number) => onRemove(index)}
                        />
                    </Grid>
                ))}
            </Grid>
            <ButtonGroup fullWidth>
                <Button onClick={() => onDone()} size="large">
                    Done
                </Button>
            </ButtonGroup>
        </>
    );
}

export default Cis2BatchMetadataAdd;
