import { TokenListItem, transfer } from 'common-ui';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FormEvent, useState } from 'react';

import { WalletApi } from '@concordium/browser-wallet-api-helpers';
import { ContractAddress } from '@concordium/web-sdk';
import { AlertColor, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';

import Alert from '../components/ui/Alert';
import { MARKETPLACE_CONTRACT_INFO } from '../Constants';

export default function MarketplaceTransferDialog(props: {
    isOpen: boolean;
    token: TokenListItem;
    provider: WalletApi;
    account: string;
    marketContractAddress: ContractAddress;
    onClose: () => void;
}) {
    const [open, setOpen] = useState(props.isOpen);
    const [state, setState] = useState<{
        isBought?: boolean;
        isBeingBought?: boolean;
        error?: string;
        totalAmount?: bigint;
    }>({
        totalAmount: props.token.quantity * props.token.price,
    });

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    const { token: item, provider, account, marketContractAddress } = props;

    const [alertState, setAlertState] = useState<{
        open: boolean;
        message: string;
        severity?: AlertColor;
    }>({
        open: false,
        message: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const quantity = BigInt(formData.get('quantity')?.toString() ?? '0');

        if (!quantity || quantity > item.quantity || quantity <= 0) {
            setState({ ...state, error: 'Invalid Quantity' });
            return;
        }

        setState({
            ...state,
            isBought: false,
            isBeingBought: true,
            error: '',
        });

        transfer(
            provider,
            account,
            marketContractAddress,
            item.contract,
            item.tokenId,
            item.price,
            item.owner,
            quantity,
            MARKETPLACE_CONTRACT_INFO,
        )
            .then(() => {
                setState({
                    ...state,
                    isBought: true,
                    isBeingBought: false,
                    error: '',
                });
                // alert("Bought");
                setAlertState({
                    open: true,
                    message: 'Purchase succesful',
                    severity: 'success',
                });
                // handleClose();
            })
            .catch((err: Error) => {
                setState({
                    ...state,
                    isBought: false,
                    isBeingBought: false,
                    error: err.message,
                });
                setAlertState({
                    open: true,
                    message: 'Purchasing failed',
                    severity: 'error',
                });
            });
    }

    const handleQuantityChanged = (value: bigint) => {
        if (value && value > 0 && value <= props.token.quantity) {
            setState({ ...state, totalAmount: value * item.price });
        } else {
            setState({ ...state, totalAmount: BigInt(0) });
        }
    };

    return (
        <Container>
            <Paper>
                <Alert
                    open={alertState.open}
                    message={alertState.message}
                    onClose={() => handleClose}
                    severity={alertState.severity}
                    // anchorOrigin={{ vertical: "top", horizontal: "center" }}
                />
            </Paper>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Buy Token: {props.token.tokenId}</DialogTitle>
                <form onSubmit={(e) => submit(e)}>
                    <DialogContent>
                        <TextField
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            autoFocus
                            margin="dense"
                            id="quantity"
                            label={`Quantity (Max ${props.token.quantity})`}
                            type="number"
                            name="quantity"
                            fullWidth
                            variant="standard"
                            defaultValue={props.token.quantity.toString()}
                            onChange={(e) => handleQuantityChanged(BigInt(e.target.value))}
                        />
                        {state.error && (
                            <Typography component="div" color="error">
                                {state.error}
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>{state.isBought ? 'Ok' : 'Cancel'}</Button>
                        <Button type="submit" disabled={(state.isBought ?? false) || state.isBeingBought}>
                            Buy {state.totalAmount ? `(${state.totalAmount?.toString()} CCD)` : ''}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
}
