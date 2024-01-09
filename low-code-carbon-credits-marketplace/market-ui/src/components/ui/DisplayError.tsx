import React from 'react';

import { Alert, Typography } from '@mui/material';

function DisplayError(props: { error?: string }) {
  const { error } = props;
  if (!error) {
    return <></>;
  }

  return (
    <Alert severity="error" closeText='close'>
      <Typography variant="body1">{error}</Typography>
    </Alert>
  );
}

export default DisplayError;
