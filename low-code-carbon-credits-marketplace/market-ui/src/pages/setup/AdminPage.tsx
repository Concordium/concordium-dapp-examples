import { NavLink, Outlet } from 'react-router-dom';

import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';

export default function AdminPage() {
  return (
    <Stack spacing={2} mt={1}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography textAlign={"left"} variant="h5" component={"div"} sx={{ flexGrow: 1 }}>
            Admin
          </Typography>
          <Button color="inherit" component={NavLink} className="subnav-link" to="contracts-setup">
            Contracts Setup
          </Button>
          <Button color="inherit" component={NavLink} className="subnav-link" to="add-verifier">
            Add Verifier
          </Button>
          <Button color="inherit" component={NavLink} className="subnav-link" to="remove-verifier">
            Remove Verifier
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Stack>
  );
}
