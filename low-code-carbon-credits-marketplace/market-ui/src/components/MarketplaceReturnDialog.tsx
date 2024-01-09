import React, { FormEvent, useState } from 'react';

import { ContractAddress } from '@concordium/web-sdk';
import { Alert, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { MARKETPLACE_CONTRACT_INFO } from '../Constants';
import { TokenListItem, transfer } from '../models/CarbonCreditMarketClient';
import { connectToWallet } from '../models/ConcordiumContractClient';

export default function MarketplaceReturnDialog(props: {
  isOpen: boolean;
  token: TokenListItem;
  marketContractAddress: ContractAddress;
  onClose: (res: "success" | "cancel") => void;
}) {
  const [state, setState] = useState<{
    isBought?: boolean;
    isProcessing?: boolean;
    error?: string;
  }>({});

  const handleClose = (res: "success" | "cancel") => {
    props.onClose(res);
  };

  const { token: item, marketContractAddress } = props;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const quantity = BigInt(formData.get("quantity")?.toString() || "0");

    if (!quantity || quantity > item.quantity || quantity <= 0) {
      setState({ ...state, error: "Invalid Quantity" });
      return;
    }

    setState({
      ...state,
      isBought: false,
      isProcessing: true,
      error: "",
    });

    connectToWallet()
      .then((wallet) =>
        transfer({
          provider: wallet.provider,
          payerAccount: wallet.account,
          to: wallet.account,
          marketContractAddress,
          nftContractAddress: item.contract,
          tokenId: item.tokenId,
          // When transferring / returning back to the owner. The price is 0.
          priceCcd: BigInt(0),
          owner: item.owner,
          quantity,
          contractInfo: MARKETPLACE_CONTRACT_INFO,
        }),
      )
      .then(() => {
        setState({
          ...state,
          isBought: true,
          isProcessing: false,
          error: "",
        });
        handleClose("success");
      })
      .catch((err: any) => {
        setState({
          ...state,
          isBought: false,
          isProcessing: false,
          error: err.message,
        });
      });
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Return Token: {props.token.tokenId}</DialogTitle>
      <Alert severity="info" sx={{ ml: "1em", mr: "1em" }}>
        You are returning the token to the owner.
      </Alert>
      <form onSubmit={(e) => submit(e)}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label={`Quantity (Max ${props.token.quantity})`}
            type="number"
            name="quantity"
            fullWidth
            variant="standard"
            defaultValue={props.token.quantity.toString()}
          />
          {state.error && (
            <Typography component="div" color="error">
              {state.error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={state.isProcessing}>
            Return
          </Button>
          <Button onClick={() => handleClose("cancel")} disabled={state.isProcessing}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
