import { PinataClient } from 'common-ui';
import { useState } from 'react';

import { Button, ButtonGroup, Stack, TextField, Typography } from '@mui/material';

function ConnectPinata(props: {
	jwt: string;
	onDone: (jwt: string) => void;
	onSkip: () => void;
}) {
	const [state, setState] = useState({
		error: "",
		processing: false,
		pinataJwt: props.jwt,
	});

	function onOkClicked() {
		var pinata = new PinataClient(state.pinataJwt);
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
			/>
			{state.error && <Typography component="div">{state.error}</Typography>}
			{state.processing && (
				<Typography component="div">Connecting..</Typography>
			)}
			<ButtonGroup fullWidth disabled={state.processing}>
				<Button variant="contained" onClick={() => onOkClicked()}>
					Connect
				</Button>
				<Button variant="outlined" onClick={() => props.onSkip()}>
					Skip
				</Button>
			</ButtonGroup>
		</Stack>
	);
}

export default ConnectPinata;
