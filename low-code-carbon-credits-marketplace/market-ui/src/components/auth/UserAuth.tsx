import { useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

import { detectConcordiumProvider, EventType } from '@concordium/browser-wallet-api-helpers';
import {
    AccountBalanceWallet, AccountBoxOutlined, AccountBoxSharp, EmailSharp
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { User } from '../../types/user';
import LoginDialog from './LoginDialog';

export default function UserAuth(props: { user?: User; onLogin: (user: User) => void; onLogout: () => void }) {
  const { onLogout } = props;
  const [user, setUser] = useState(props.user);
  const [loginOpen, setLoginOpen] = useState(false);
  const logout = () => {
    if (user && user.accountType === "wallet" && user.account) {
      alert("Also disconnect the website from the wallet");
    }
    
    setUser(undefined);
    onLogout();
  };

  const login = (user: User) => {
    setLoginOpen(false);
    setUser(user);
    props.onLogin(user);
  };

  const [hasWalletInstalled, setHasWalletInstalled] = useState(false);
  useEffectOnce(() => {
    detectConcordiumProvider()
      .then((provider) => {
        setHasWalletInstalled(true);
        console.log("wallet is installed", provider);
        provider.on(EventType.AccountChanged, (account) => login({ account, accountType: "wallet", email: "" }));
        provider.on(EventType.AccountDisconnected, logout);
        provider.on(EventType.ChainChanged, logout);

        return { provider };
      })
      .then(({ provider }) => provider.getMostRecentlySelectedAccount())
      .then((account) => {
        if (account) {
          login({ account, accountType: "wallet", email: "" });
        }
      })
      .catch((error) => {
        setHasWalletInstalled(false);
        console.log("wallet is NOT installed", error);
      });
  });

  if (!user || !user.account) {
    return (
      <>
        <Tooltip title="login">
          <IconButton onClick={() => setLoginOpen(true)} color="secondary" size="large">
            <AccountBoxOutlined />
          </IconButton>
        </Tooltip>
        <LoginDialog
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onLogin={login}
          hasWalletInstalled={hasWalletInstalled}
        />
      </>
    );
  }

  return (
    <Tooltip title={user.account}>
      <IconButton onClick={() => logout()} color="secondary" size="large">
        <AccountBoxSharp color="secondary" />
        {user.accountType === "wallet" && <AccountBalanceWallet />}
        {user.accountType === "email" && <EmailSharp />}
      </IconButton>
    </Tooltip>
  );
}
