import { useState } from 'react';

import {
    Dialog, DialogContent, DialogProps, DialogTitle, FormControl, FormControlLabel, FormGroup,
    FormLabel, Radio, RadioGroup, Stack
} from '@mui/material';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { GOOGLE_CLIENT_ID } from '../../Constants';
import { connectToWallet } from '../../models/ConcordiumContractClient';
import { getAccount } from '../../models/web/WebClient';
import { AccountType, User } from '../../types/user';
import DisplayError from '../ui/DisplayError';

export default function LoginDialog(
  props: DialogProps & {
    onLogin: (user: User) => void;
    onClose: () => void;
    hasWalletInstalled: boolean;
  },
) {
  const { onLogin, hasWalletInstalled } = props;
  const [form, setForm] = useState<User>({
    accountType: "",
    account: "",
    email: "",
  });

  const [state, setState] = useState({
    isProcessing: false,
    error: "",
  });

  const login = (user: User) => {
    setForm({ ...form, ...user });
    onLogin(user);
  };

  async function onAccountTypeChanged(accountType: AccountType) {
    switch (accountType) {
      case "wallet":
        setState({ isProcessing: true, error: "" });
        await connectToWallet()
          .then((wallet) => {
            setState({ isProcessing: false, error: "" });
            login({ account: wallet.account, email: "", accountType });
          })
          .catch((error) => {
            setForm({ account: "", email: "", accountType: "" });
            setState({ isProcessing: false, error: error.message });
          });
        break;
      case "email":
        setForm({ account: "", email: "", accountType });
        setState({ isProcessing: false, error: "" });
        break;
      default:
        setState({ ...state, error: "Invalid account type" });
        break;
    }
  }

  async function onGooleLoginSuccess(credentialResponse: CredentialResponse) {
    if (!credentialResponse.credential) {
      setState({ ...state, error: "Login Failed" });
      return;
    }

    const user = await getAccount(credentialResponse.credential);
    if (!user || !user.email || !user.account) {
      setState({ ...state, error: "Login Failed" });
      return;
    }

    login({ ...form, email: user.email, account: user.account });
  }

  function onClose() {
    props.onClose();
    setState({ isProcessing: false, error: "" });
    setForm({ account: "", email: "", accountType: "" });
  }

  return (
    <Dialog open={props.open} onClose={() => onClose()} maxWidth={"md"}>
      <DialogTitle minWidth={"300px"}>Login</DialogTitle>
      <DialogContent>
        <Stack spacing={2} component={"form"} marginBottom={"2em"}>
          <FormGroup>
            <FormControl fullWidth variant="outlined">
              <FormLabel id="account-type-radio-buttons-group-label">Account Type?</FormLabel>
              <RadioGroup>
                {hasWalletInstalled && (
                  <FormControlLabel
                    value="wallet"
                    control={
                      <Radio
                        onChange={() => onAccountTypeChanged("wallet")}
                        disabled={state.isProcessing}
                        checked={form.accountType === "wallet"}
                      />
                    }
                    label="Wallet Account"
                  />
                )}
                <FormControlLabel
                  value="email"
                  control={
                    <Radio
                      onChange={() => onAccountTypeChanged("email")}
                      disabled={state.isProcessing || !GOOGLE_CLIENT_ID}
                      checked={form.accountType === "email"}
                    />
                  }
                  label="Email Account"
                />
              </RadioGroup>
            </FormControl>
          </FormGroup>
          {form.accountType === "email" && GOOGLE_CLIENT_ID && (
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
              <GoogleLogin
                onSuccess={onGooleLoginSuccess}
                onError={() => {
                  setState({ ...state, error: "Login Failed" });
                }}
                shape="rectangular"
                size="large"
              />
            </GoogleOAuthProvider>
          )}
        </Stack>
        <DisplayError error={state.error} />
      </DialogContent>
    </Dialog>
  );
}
