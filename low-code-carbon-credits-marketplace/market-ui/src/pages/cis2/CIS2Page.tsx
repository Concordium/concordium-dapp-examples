import { NavLink, Outlet } from 'react-router-dom';

import { ContractAddress } from '@concordium/web-sdk';
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';

export default function CIS2Page(props: { tokenContract: ContractAddress }) {
  const { tokenContract } = props;

  return (
    <Stack spacing={2} mt={1}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography textAlign={"left"} variant="h5" component={"div"} sx={{ flexGrow: 1 }}>
            Project Token ({tokenContract.index.toString()}/{tokenContract.subindex.toString()})
          </Typography>
          <Button color="inherit" component={NavLink} className="subnav-link" to="mint">
            Mint
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
