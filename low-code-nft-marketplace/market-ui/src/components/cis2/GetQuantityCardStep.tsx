// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FormEvent, useState } from 'react';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    SxProps,
    TextField,
    Theme,
    Typography,
} from '@mui/material';
import DisplayError from '../ui/DisplayError';

const cardMediaSx: SxProps<Theme> = { maxHeight: '200px' };

export default function GetQuantityCardStep(props: {
    imageUrl?: string;
    tokenId: string;
    onDone: (data: { tokenId: string; quantity: string }) => void;
}) {
    const [state, setState] = useState({
        tokenId: props.tokenId.toString(),
        error: '',
        imageUrl: props.imageUrl,
        quantity: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const quantity = formData.get('quantity')?.toString() ?? '';

        if (!quantity || !parseInt(quantity)) {
            setState({ ...state, error: 'Invalid Quantity' });
            return;
        }

        setState({ ...state, quantity, error: '' });
        props.onDone({ tokenId: props.tokenId, quantity });
    }

    return (
        <Card variant="outlined">
            <CardMedia component="img" image={state.imageUrl} alt="NFT" sx={cardMediaSx} />
            <form noValidate autoComplete="off" onSubmit={(e) => submit(e)}>
                <CardContent>
                    <Typography gutterBottom component="div">
                        Set Quantity
                    </Typography>
                    <TextField
                        defaultValue={0}
                        name="quantity"
                        id="quantity"
                        label="Token Quantity"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        required={true}
                    />
                    <DisplayError error={state.error} />
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" type="submit">
                        Set Quantity
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
}
