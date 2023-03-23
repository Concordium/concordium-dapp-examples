import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const AlertInternal = React.forwardRef<HTMLDivElement, AlertProps>(
	function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	}
);

export default function Alert(
	props: SnackbarProps & AlertProps & { message: string }
) {
	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar autoHideDuration={5000} {...props}>
				<AlertInternal sx={{ width: "100%" }} {...props}>
					{props.message}
				</AlertInternal>
			</Snackbar>
		</Stack>
	);
}