import { Grid,Button, ButtonGroup, AlertColor } from "@mui/material";
import { Stack } from "@mui/system";
import FileUpload from "react-material-file-upload";
import React from "react";
import { useState } from "react";
import Alert from "./Alert";
function UploadFiles(props: {
	files: File[];
	onDone: (files: File[]) => void;
}) {
	const [alertState, setAlertState] = useState<{
		open: boolean;
		message: string;
		severity?: AlertColor;
	}>({
		open: false,
		message: "",
	});
	var [files, setFiles] = React.useState<File[]>(props.files);

	function onFilesChanged(files: File[]): void {
		setFiles(files);
		setAlertState({
			open: true,
			message: "Files are loaded to cache memory",
			severity: "success"
		});
	}
	return (
		<Stack spacing={2}>
			<FileUpload
				value={props.files}
				onChange={onFilesChanged}
				multiple={true}
				title={""}
				accept={[".jpg"]}
			/>
			<Grid>
				<Alert
			   open={alertState.open}
		 		message={alertState.message}
				onClose={() => setAlertState({ open: false, message: "" })}
		 		severity={alertState.severity}
		 		// anchorOrigin={{ vertical: "top", horizontal: "center" }}
		 	/>
				</Grid>
			<ButtonGroup fullWidth>
				<Button variant="contained" onClick={() => props.onDone(files)}>
					Done
				</Button>
			</ButtonGroup>
		</Stack>
	);
}

export default UploadFiles;
