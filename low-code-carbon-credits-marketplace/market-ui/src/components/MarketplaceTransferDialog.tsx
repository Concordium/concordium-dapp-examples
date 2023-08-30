import { FormEvent, useEffect, useState } from 'react';

import { ContractAddress, TransactionStatusEnum } from '@concordium/web-sdk';
import { Container, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { MARKETPLACE_CONTRACT_INFO } from '../Constants';
import { TokenListItem, transfer as transferWallet } from '../models/CarbonCreditMarketClient';
import { connectToWallet } from '../models/ConcordiumContractClient';
import { transfer as transferWert } from '../models/WertClient';
import { User } from '../types/user';
import DisplayError from './ui/DisplayError';
import TransactionProgress from './ui/TransactionProgress';

export default function MarketplaceTransferDialog(props: {
  isOpen: boolean;
  token: TokenListItem;
  marketContractAddress: ContractAddress;
  onClose: () => void;
  user: User;
}) {
  const { user } = props;
  const [open, setOpen] = useState(props.isOpen);
  const [form, setForm] = useState({
    quantity: props.token.quantity.toString(),
    medium: user.accountType === "wallet" ? "wallet" : "creditcard",
  });
  const [txn, setTxn] = useState<{ status: TransactionStatusEnum; hash: string }>();

  const [totalAmount, setTotalAmount] = useState<bigint>(props.token.quantity * props.token.price);

  const [state, setState] = useState<{
    isBought?: boolean;
    isProcessing?: boolean;
    error?: string;
  }>({});
  
  const setFormField = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setState({ ...state, error: "" });
  };

  const handleClose = () => {
    setOpen(false);
    setTxn(undefined);
    props.onClose();
  };

  const { token: item, marketContractAddress } = props;
  const transfer = (quantity: bigint, medium: "wallet" | "creditcard") => {
    switch (medium) {
      case "wallet":
        return connectToWallet().then((wallet) =>
          transferWallet({
            provider: wallet.provider,
            payerAccount: user.account,
            to: user.account,
            marketContractAddress,
            nftContractAddress: item.contract,
            tokenId: item.tokenId,
            priceCcd: item.price,
            owner: item.owner,
            quantity,
            contractInfo: MARKETPLACE_CONTRACT_INFO,
            onStatusUpdate: (status, hash) => setTxn({ status, hash }),
          }),
        );
      case "creditcard":
        return transferWert(
          user.account,
          marketContractAddress,
          item.contract,
          item.tokenId,
          item.owner,
          quantity,
          totalAmount,
          "widget",
        );
    }

    return Promise.reject({ message: "Invalid Payment Type" });
  };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setState({
      ...state,
      isBought: false,
      isProcessing: true,
      error: "",
    });

    // validate form
    if (!form.quantity || BigInt(form.quantity) <= 0 || BigInt(form.quantity) > props.token.quantity) {
      setState({
        ...state,
        isBought: false,
        isProcessing: false,
        error: "Invalid quantity",
      });
      return false;
    }

    if (totalAmount <= 0) {
      setState({
        ...state,
        isBought: false,
        isProcessing: false,
        error: "Invalid amount",
      });
      return false;
    }

    if (state.isBought) {
      setState({
        ...state,
        isBought: false,
        isProcessing: false,
        error: "Already bought",
      });
      return false;
    }

    if (user.accountType === "email" && form.medium === "wallet") {
      setState({
        ...state,
        isBought: false,
        isProcessing: false,
        error: "Invalid payment medium",
      });
      return false;
    }

    transfer(BigInt(form.quantity), form.medium as "wallet" | "creditcard")
      .then(() => {
        setState({
          ...state,
          isBought: true,
          isProcessing: false,
          error: "",
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isBought: false,
          isProcessing: false,
          error: err.message,
        });
      });
  }

  useEffect(() => setTotalAmount(BigInt(form.quantity) * props.token.price), [form.quantity]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
      <DialogTitle width={"500px"}>Buy Token: {props.token.tokenId}</DialogTitle>

      <form onSubmit={(e) => submit(e)}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              autoFocus
              margin="dense"
              id="quantity"
              label={`Quantity (Max ${props.token.quantity})`}
              type="number"
              name="quantity"
              fullWidth
              variant="standard"
              onChange={(e) => setFormField("quantity", e.target.value)}
              disabled={state.isBought || state.isProcessing}
              value={form.quantity}
            />
            <FormControl fullWidth>
              <InputLabel id="medium-label">Payment Medium</InputLabel>
              <Select value={form.medium} onChange={(e) => setFormField("medium", e.target.value)}>
                <MenuItem value={"wallet"} disabled={user.accountType !== "wallet"}>
                  Wallet
                </MenuItem>
                <MenuItem value={"creditcard"}>Credit Card</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{state.isBought ? "Ok" : "Cancel"}</Button>
          <Button type="submit" disabled={state.isBought || state.isProcessing}>
            Buy ({totalAmount.toString()} CCD)
          </Button>
        </DialogActions>
      </form>
      <DisplayError error={state.error} />
      {txn && <TransactionProgress {...txn} />}
      <Container>
        <div id="widget" style={{ textAlign: "center" }}></div>
      </Container>
    </Dialog>
  );
}
