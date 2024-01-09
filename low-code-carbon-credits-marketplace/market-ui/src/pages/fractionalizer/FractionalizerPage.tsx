import { NavLink, Outlet } from 'react-router-dom';

import { ContractAddress } from '@concordium/web-sdk';
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';

export default function FractionalizerPage(props: { fracContract: ContractAddress }) {
  const { fracContract } = props;

  return (
    <Stack spacing={2} mt={1}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography textAlign={"left"} variant="h5" component={"div"} sx={{ flexGrow: 1 }}>
            Fractionalizer ({fracContract.index.toString()}/{fracContract.subindex.toString()})
          </Typography>
          <Button color="inherit" component={NavLink} className="subnav-link" to="fractionalize">
            Fractionalize
          </Button>
          <Button color="inherit" component={NavLink} className="subnav-link" to="retire">
            Retire
          </Button>
          <Button color="inherit" component={NavLink} className="subnav-link" to="retract">
            Retract
          </Button>
          <Button color="inherit" component={NavLink} className="subnav-link" to="events">
            Events
          </Button>
          <Button color="inherit" component={NavLink} className="subnav-link" to="balanceOf">
            Balance
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Stack>
  );
}
