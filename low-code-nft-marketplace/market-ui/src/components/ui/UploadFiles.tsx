import React, { useState } from "react";
import FileUpload from "react-material-file-upload";

import { AlertColor, Button, ButtonGroup } from "@mui/material";
import { Stack } from "@mui/system";

import Alert from "./Alert";

function UploadFiles(props: { files: File[]; onDone: (files: File[]) => void }) {
  const [alertState, setAlertState] = useState<{
    open: boolean;
    message: string;
    severity?: AlertColor;
  }>({
    open: false,
    message: "",
  });
  const [files, setFiles] = React.useState<File[]>(props.files);

  function onFilesChanged(addedFiles: File[]): void {
    setFiles(addedFiles);
    setAlertState({
      open: true,
      message: `${addedFiles.length} File(s) are loaded to cache memory`,
      severity: "success",
    });
  }
  return (
    <Stack spacing={2}>
      <FileUpload value={files} onChange={onFilesChanged} multiple={true} title={""} accept={[".jpg"]} />
      <Alert
        open={alertState.open}
        message={alertState.message}
        onClose={() => setAlertState({ open: false, message: "" })}
        severity={alertState.severity}
      />
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={() => props.onDone(files)}>
          Done
        </Button>
      </ButtonGroup>
    </Stack>
  );
}

export default UploadFiles;
