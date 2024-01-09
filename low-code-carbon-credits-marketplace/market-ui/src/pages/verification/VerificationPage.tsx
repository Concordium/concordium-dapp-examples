import { NavLink, Outlet } from 'react-router-dom';

import { ContractAddress } from '@concordium/web-sdk';
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';

export default function VerifyPage(props: { tokenContract: ContractAddress }) {
  return (
    <Stack spacing={2} mt={1}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography textAlign={"left"} variant="h5" component={"div"} sx={{ flexGrow: 1 }}>
            Project Verification ({props.tokenContract.index.toString()}/{props.tokenContract.subindex.toString()})
          </Typography>
          <Button color="inherit" component={NavLink} className="subnav-link" to="verify">
            Verify
          </Button>
          <Button color="inherit" component={NavLink} className="subnav-link" to="retract">
            Retract
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Stack>
  );
}
