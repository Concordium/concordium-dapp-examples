import { ContractInfo, mint } from 'common-ui';

import React, { useState } from 'react';

import { WalletApi } from '@concordium/browser-wallet-api-helpers';
import { CIS2, ContractAddress } from '@concordium/web-sdk';
import { Button, Grid, Stack, Typography } from '@mui/material';

import Cis2BatchItemMint from './Cis2BatchItemMint';

interface TokenState {
    tokenInfo: [CIS2.MetadataUrl, string];
    minting: boolean;
    minted: boolean;
    error: string;
}

function Cis2BatchMint(props: {
    contractInfo: ContractInfo;
    provider: WalletApi;
    account: string;
    nftContractAddress: ContractAddress;
    tokenMetadataMap: Record<string, [CIS2.MetadataUrl, string]>;
    onDone: (data: Record<string, [CIS2.MetadataUrl, string]>) => void;
}) {
    const tokens: Record<string, TokenState> = {};

    Object.keys(props.tokenMetadataMap).forEach(
        (tokenId) =>
            (tokens[tokenId] = {
                tokenInfo: props.tokenMetadataMap[tokenId],
                minting: false,
                minted: false,
                error: '',
            }),
    );

    const [state, setState] = useState({
        tokens,
        mintingCount: 0,
        minted: false,
    });

    function onMintClicked() {
        const tokens = state.tokens;
        const mintingCount = Object.keys(tokens).length;
        setTokensState(tokens, true, false);
        setState({
            ...state,
            tokens,
            mintingCount: state.mintingCount + mintingCount,
        });
        mint(props.provider, props.account, props.tokenMetadataMap, props.nftContractAddress, props.contractInfo)
            .then(() => {
                setTokensState(tokens, false, true);
                const mintingCount = Object.keys(tokens).length;
                setState({
                    ...state,
                    tokens,
                    mintingCount: state.mintingCount + mintingCount,
                    minted: true,
                });
                props.onDone(props.tokenMetadataMap);
            })
            .catch((e: Error) => {
                setTokensState(tokens, false, false, e.message);
                const mintingCount = Object.keys(tokens).length;
                setState({
                    ...state,
                    tokens,
                    mintingCount: state.mintingCount - mintingCount,
                    minted: false,
                });
            });
    }

    return (
        <Stack>
            <Typography variant="button" color={'InfoText'}>
                <>
                    Contract : {props.nftContractAddress.index.toString()}/
                    {props.nftContractAddress.subindex.toString()} ({props.contractInfo.contractName})
                </>
            </Typography>
            <Grid container spacing={2}>
                {Object.keys(state.tokens).map((tokenId) => (
                    <Grid item xs={4} key={tokenId}>
                        <Cis2BatchItemMint
                            contractInfo={props.contractInfo}
                            error={state.tokens[tokenId].error}
                            key={tokenId}
                            tokenInfo={state.tokens[tokenId].tokenInfo}
                            minted={state.tokens[tokenId].minted}
                            minting={state.tokens[tokenId].minting}
                            tokenId={tokenId}
                        />
                    </Grid>
                ))}
            </Grid>
            <br />
            <Button
                variant="contained"
                disabled={state.mintingCount > 0 || state.minted}
                onClick={() => onMintClicked()}
            >
                Mint
            </Button>
        </Stack>
    );

    function setTokensState(tokens: Record<string, TokenState>, isMinting: boolean, isMinted: boolean, error?: string) {
        Object.keys(tokens).forEach((tokenId) => {
            tokens[tokenId].error = error ?? '';
            tokens[tokenId].minting = isMinting;

            if (isMinting) {
                tokens[tokenId].minted = false;
            } else {
                tokens[tokenId].minted = isMinted;
                // onTokenListed()
            }
        });
    }
}

export default Cis2BatchMint;
