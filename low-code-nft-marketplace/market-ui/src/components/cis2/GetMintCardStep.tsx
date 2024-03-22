// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { CIS2 } from '@concordium/web-sdk';
import { Card, CardContent, CardMedia, Link, SxProps, Theme, Typography } from '@mui/material';

const cardMediaSx: SxProps<Theme> = { maxHeight: '200px' };

function GetMintCardStep(props: {
    imageUrl?: string;
    tokenId: string;
    imageIpfsUrl?: string;
    metadataUrl: CIS2.MetadataUrl;
    quantity?: string;
}) {
    return (
        <Card variant="outlined">
            <CardMedia component="img" image={props.imageUrl} alt="NFT" sx={cardMediaSx} />
            <CardContent>
                <Typography>Ready to be Minted</Typography>
                <Typography variant="caption" component="div">
                    Token Id: {props.tokenId}
                </Typography>
                {props.quantity && (
                    <Typography variant="caption" component="div">
                        Quantity: {props.quantity}
                    </Typography>
                )}
                <Link href={props.imageIpfsUrl} variant="caption" display="block">
                    Image IPFS Url
                </Link>
                <Link href={props.metadataUrl.url} variant="caption" target="_blank">
                    Metadata Url
                </Link>
            </CardContent>
        </Card>
    );
}

export default GetMintCardStep;
