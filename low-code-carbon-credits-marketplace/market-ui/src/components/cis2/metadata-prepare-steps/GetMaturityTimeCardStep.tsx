import moment from 'moment';
import React, { FormEvent, useState } from 'react';

import {
    Button, Card, CardActions, CardContent, CardMedia, SxProps, TextField, Theme, Typography
} from '@mui/material';

import DisplayError from '../../ui/DisplayError';

const cardMediaSx: SxProps<Theme> = { maxHeight: "200px" };

export default function GetMaturityTimeCardStep(props: {
  imageUrl?: string;
  tokenId: string;
  onDone: (data: { tokenId: string; maturityTime: Date }) => void;
}) {
  const [form, setForm] = useState({
    maturityTime: moment().add(1, "days").format("YYYY-MM-DDTHH:mm:ss")
  });
  const [state, setState] = useState({
    tokenId: props.tokenId.toString(),
    error: "",
    imageUrl: props.imageUrl,
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.maturityTime) {
      setState({ ...state, error: "Invalid Time" });
      return;
    }

    setState({ ...state, error: "" });
    props.onDone({ tokenId: props.tokenId, maturityTime: new Date(form.maturityTime) });
  }

  return (
    <Card variant="outlined">
      <CardMedia component="img" image={state.imageUrl} alt="NFT" sx={cardMediaSx} />
      <form noValidate autoComplete="off" onSubmit={(e) => submit(e)}>
        <CardContent>
          <Typography gutterBottom component="div">
            Set Maturity Time
          </Typography>
          <TextField
            name="maturityTime"
            id="maturityTime"
            label="Maturity Time"
            variant="outlined"
            size="small"
            fullWidth={true}
            required
            type="datetime-local"
            onChange={(e) => setForm({ ...form, maturityTime: e.target.value })}
            value={form.maturityTime}
          />
          <DisplayError error={state.error} />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" type="submit">
            Set Maturity Time
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
