// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { Typography } from '@mui/material';

function DisplayError(props: { error?: string }) {
    const { error } = props;

    return error ? <Typography fontSize={10}>{error}</Typography> : <></>;
}

export default DisplayError;
