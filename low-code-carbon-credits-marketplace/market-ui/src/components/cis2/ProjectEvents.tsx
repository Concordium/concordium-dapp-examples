import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { ContractAddress } from '@concordium/web-sdk';
import {
    Button, Container, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Pagination,
    Select, Stack, TextField, Typography
} from '@mui/material';

import {
    Cis2BurnEvent, Cis2MintEvent, Cis2TokenMetadataEvent, Cis2TransferEvent, ModuleEvent,
    ProjectNftEvent, ProjectNftMaturityTimeEvent, ProjectNftVerificationEvent,
    ProjectNftVerifierUpdatedEvent
} from '../../models/web/Events';
import { getContractEventsByContractAddress } from '../../models/web/WebClient';
import DisplayError from '../ui/DisplayError';

const eventTypes = [
  "Mint",
  "TokenMetadata",
  "MaturityTime",
  "Transfer",
  "Retire",
  "Retract",
  "Burn",
  "VerifierAdded",
  "VerifierRemoved",
  "Verification",
];

function MintEvent(props: { event: Cis2MintEvent }) {
  const { event } = props;

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary="Mint"
        secondary={
          <>
            <Typography component="div">Token #{event.token_id}</Typography>
            <Typography component="div">By {event.owner.Account?.[0]}</Typography>
          </>
        }
      />
    </ListItem>
  );
}

function TokenMetadataEvent(props: { event: Cis2TokenMetadataEvent }) {
  const { event } = props;

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary="Token Metadata"
        secondary={
          <>
            <Typography component="div">Token {event.token_id}</Typography>
            <Typography component="div">Url {event.metadata_url.url}</Typography>
          </>
        }
      />
    </ListItem>
  );
}

function MaturityTimeEvent(props: { event: ProjectNftMaturityTimeEvent }) {
  const { event } = props;

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary="Maturity Time"
        secondary={
          <>
            <Typography component="div">Token {event.token_id}</Typography>
            <Typography component="div">Time {event.maturity_time}</Typography>
          </>
        }
      />
    </ListItem>
  );
}

function TransferEvent(props: { event: Cis2TransferEvent }) {
  const { event } = props;

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary="Transfer"
        secondary={
          <>
            <Typography component="div">Token {event.token_id}</Typography>
            <Typography component="div">By {event.from.Account?.[0]}</Typography>
            <Typography component="div">To {event.to.Account?.[0]}</Typography>
          </>
        }
      />
    </ListItem>
  );
}

function BurnEvent(props: { event: Cis2BurnEvent; name: string }) {
  const { event, name } = props;

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={name}
        secondary={
          <>
            <Typography component="div">Token {event.token_id}</Typography>
            <Typography component="div">By {event.owner.Account?.[0]}</Typography>
          </>
        }
      />
    </ListItem>
  );
}

function VerifierUpdatedEvent(props: { event: ProjectNftVerifierUpdatedEvent; name: string }) {
  const { event, name } = props;

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={name}
        secondary={
          <>
            <Typography component="div">Verifier {event.verifier.Account?.[0]}</Typography>
          </>
        }
      />
    </ListItem>
  );
}

function VerificationEvent(props: { event: ProjectNftVerificationEvent }) {
  const { event } = props;

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary="Verification"
        secondary={
          <>
            <Typography component="div">Token {event.token_id}</Typography>
            <Typography component="div">Verifier {event.verifier.Account?.[0]}</Typography>
          </>
        }
      />
    </ListItem>
  );
}

function Event(props: { event: ProjectNftEvent }) {
  const { event } = props;
  if (!event) {
    return <></>;
  }

  const eventType = Object.keys(event)[0];

  switch (eventType) {
    case "Mint":
      return <MintEvent event={event[eventType]!} />;
    case "TokenMetadata":
      return <TokenMetadataEvent event={event[eventType]!} />;
    case "MaturityTime":
      return <MaturityTimeEvent event={event[eventType]!} />;
    case "Transfer":
      return <TransferEvent event={event[eventType]!} />;
    case "Retire":
    case "Retract":
    case "Burn":
      return <BurnEvent event={event[eventType]!} name={eventType} />;
    case "VerifierAdded":
      return <VerifierUpdatedEvent event={event[eventType]!} name="Verifier Added" />;
    case "VerifierRemoved":
      return <VerifierUpdatedEvent event={event[eventType]!} name="Verifier Removed" />;
    case "Verification":
      return <VerificationEvent event={event[eventType]!} />;
    default:
      return <div>Unknown event type: {eventType}</div>;
  }
}

export default function ProjectEvents({ defaultContractAddress }: { defaultContractAddress?: ContractAddress }) {
  const [form, setForm] = useState({
    index: defaultContractAddress?.index.toString() || "",
    subindex: defaultContractAddress?.subindex.toString() || "0",
    account: "",
    eventType: "",
  });
  const [state, setState] = useState({
    error: "",
    checking: false,
  });

  const [events, setEvents] = useState<ModuleEvent[]>([]);
  const [pageCount, setPageCount] = useState(0);

  function onFormSubmitted(page = 0): void {
    setState({ ...state, error: "", checking: true });
    getContractEventsByContractAddress(form.index, form.subindex, form.account, form.eventType, page)
      .then((res) => {
        setState({ ...state, checking: false, error: "" });
        setEvents(res.events);
        setPageCount(res.pageCount);
      })
      .catch((e: Error) => {
        setState({ ...state, checking: false, error: e.message });
      });
  }

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction={"row"}>
        <TextField
          id="contract-index"
          name="index"
          label="Contract Index"
          variant="standard"
          type={"number"}
          disabled={state.checking}
          value={form.index}
          fullWidth
          onChange={(e) => setForm({ ...form, index: e.target.value })}
        />
        <TextField
          id="contract-subindex"
          name="subindex"
          label="Contract Sub Index"
          variant="standard"
          type={"number"}
          disabled={state.checking}
          value={form.subindex}
          fullWidth
          onChange={(e) => setForm({ ...form, subindex: e.target.value })}
        />
        <TextField
          id="account"
          name="account"
          label="Account"
          variant="standard"
          type={"string"}
          disabled={state.checking}
          value={form.account}
          onChange={(e) => setForm({ ...form, account: e.target.value })}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="event-type-label" variant="standard">
            Event Type
          </InputLabel>
          <Select
            variant="standard"
            value={form.eventType}
            onChange={(e) => setForm({ ...form, eventType: e.target.value })}
          >
            {eventTypes.map((eventType) => (
              <MenuItem key={eventType} value={eventType}>
                {eventType}
              </MenuItem>
            ))}
            <MenuItem value="">Any</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="button" onClick={() => onFormSubmitted()}>
          Get
        </Button>
      </Stack>
      <DisplayError error={state.error} />
      <Container>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {events.map((contractEvent) => (
            <Event event={contractEvent as ProjectNftEvent} key={uuid()} />
          ))}
        </List>
        {pageCount > 1 && <Pagination count={pageCount} onChange={(_, v) => onFormSubmitted(v - 1)} />}
      </Container>
    </Stack>
  );
}
