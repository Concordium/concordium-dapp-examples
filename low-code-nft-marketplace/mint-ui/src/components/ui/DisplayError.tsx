import { Typography } from "@mui/material";
import React from "react";

function DisplayError(props: { error?: string }) {
  const { error } = props;

  return error ? <Typography fontSize={10}>{error}</Typography> : <></>;
}

export default DisplayError;
