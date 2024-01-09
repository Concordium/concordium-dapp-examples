import { TransactionStatusEnum } from '@concordium/web-sdk';
import { CheckCircleOutline, OpenInBrowser } from '@mui/icons-material';
import { CircularProgress, Container, Link, Stack, Tooltip, Typography } from '@mui/material';

import { EXPLORER_URL_TXN_HASH } from '../../Constants';

function TransactionInProgress(props: { hash: string; status: TransactionStatusEnum }) {
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Tooltip title={props.hash} sx={{ flexDirection: "column" }}>
        <Typography alignItems="center" display="flex">
          <Link display="flex">
            <Stack direction="row" spacing={1}>
              <CircularProgress sx={{ width: "1.2em !important", height: "1.2em !important", mr: "2px" }} />
              {props.status === TransactionStatusEnum.Received ? "Transaction Recieved" : ""}
              {props.status === TransactionStatusEnum.Committed ? "Transaction committed" : ""}
            </Stack>
          </Link>
        </Typography>
      </Tooltip>
    </Container>
  );
}

function TransactionCompleted(props: { hash: string }) {
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Tooltip title={props.hash} sx={{ flexDirection: "column" }}>
        <Typography alignItems="center" display="flex">
          <Link href={`${EXPLORER_URL_TXN_HASH}${props.hash}`} target="_blank" display="flex">
            <Stack direction="row" spacing={1}>
              <CheckCircleOutline color="success" />
              Transaction Finalized
              <OpenInBrowser />
            </Stack>
          </Link>
        </Typography>
      </Tooltip>
    </Container>
  );
}

export default function TransactionProgress(props: { hash: string; status: TransactionStatusEnum }) {
  switch (props.status) {
    case TransactionStatusEnum.Received:
    case TransactionStatusEnum.Committed:
      return <TransactionInProgress hash={props.hash} status={props.status} />;
    case TransactionStatusEnum.Finalized:
      return <TransactionCompleted hash={props.hash} />;
    default:
      return <div>Unknown Transaction Status</div>;
  }
}
