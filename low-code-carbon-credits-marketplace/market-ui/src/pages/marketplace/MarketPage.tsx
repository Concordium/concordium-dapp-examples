import { NavLink, Outlet } from 'react-router-dom';

import { ContractAddress } from '@concordium/web-sdk';
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';

import { User } from '../../types/user';

export default function MarketPage(props: { user: User; marketContract: ContractAddress }) {
  const { user, marketContract } = props;
  const isWalletUser = () => {
    return user && user.accountType === "wallet" && user.account;
  };
  return (
    <Stack spacing={1} mt={1}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography textAlign={"left"} variant="h5" component={"div"} sx={{ flexGrow: 1 }}>
            Market ({marketContract.index.toString()}/{marketContract.subindex.toString()})
          </Typography>
          <Button color="inherit" component={NavLink} className="subnav-link" to="buy">
            Buy
          </Button>
          <Button color="inherit" component={NavLink} to="sell" disabled={!isWalletUser()} className="subnav-link">
            Sell
          </Button>
          <Button color="inherit" component={NavLink} to="events" disabled={!isWalletUser()} className="subnav-link">
            Events
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Stack>
  );
}
