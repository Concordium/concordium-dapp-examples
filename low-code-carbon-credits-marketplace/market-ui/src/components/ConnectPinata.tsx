import React, { useState } from 'react';

import { Button, ButtonGroup, Stack, TextField, Typography } from '@mui/material';

import { PinataClient } from '../models/PinataClient';

export default function ConnectPinata(props: {
  jwt: string;
  onDone: (jwt: string) => void;
  onSkip?: () => void;
  disableSkip?: boolean;
}) {
  const [state, setState] = useState({
    error: "",
    processing: false,
    pinataJwt: props.jwt,
  });

  function onOkClicked() {
    const pinata = new PinataClient(state.pinataJwt);
    setState({ ...state, processing: true });
    pinata
      .isJwtValid()
      .then((isValid) => {
        if (!isValid) {
          setState({ ...state, processing: false, error: "Invalid JWT" });
          return;
        }

        props.onDone(state.pinataJwt);
      })
      .catch((error: Error) => {
        setState({ ...state, processing: false, error: error.message });
      });
  }

  return (
    <Stack component={"form"} spacing={2}>
      <TextField
        name="pinataJwt"
        id="pinata-jwt"
        label="Pinata JWT"
        required={true}
        error={!!state.error}
        onChange={(e) => setState({ ...state, pinataJwt: e.target.value })}
        value={state.pinataJwt}
        helperText="Enter your Pinata JWT"
        variant='standard'
      />
      {state.error && <Typography component="div">{state.error}</Typography>}
      {state.processing && <Typography component="div">Connecting..</Typography>}
      <ButtonGroup fullWidth disabled={state.processing}>
        <Button variant="contained" onClick={() => onOkClicked()}>
          Connect
        </Button>
        {!props.disableSkip && (
          <Button variant="outlined" onClick={() => props.onSkip && props.onSkip()}>
            Skip
          </Button>
        )}
      </ButtonGroup>
    </Stack>
  );
}
