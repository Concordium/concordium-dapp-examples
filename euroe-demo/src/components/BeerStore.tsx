import { WalletApi, detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  Alert,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Container,
  CssBaseline,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Fab,
  Snackbar,
  CardActions,
} from '@mui/material';
import { useEffect, useState } from 'react';
import beers from '../../image/beers.jpg';
import {
  AccountAddress,
  AccountTransactionType,
  CIS2,
  CIS2Contract,
  ConcordiumGRPCClient,
  ContractAddress,
  CredentialRegistrationId,
  Energy,
  getPastDate,
  isUpdateContractSummary,
  MIN_DATE,
  TransactionHash,
  Web3StatementBuilder,
} from '@concordium/web-sdk';
import React from 'react';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import SportsBarOutlinedIcon from '@mui/icons-material/SportsBarOutlined';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';

const CONTRACT_ADDRESS = ContractAddress.create(2059);
const RECEIVER_ADDRESS = AccountAddress.fromBase58('4DnXB9GTJ178e3YWHpCZQxwY5kVN9CJvQeBNbGczjnT8A7Wfcx');

async function submitTransaction(items: bigint, account: AccountAddress.Type, wallet: WalletApi, client: CIS2Contract) {
  const transfer: CIS2.Transfer = {
    tokenId: '',
    tokenAmount: items * 1000n,
    from: account,
    to: RECEIVER_ADDRESS,
  };

  const dryRun = await client.dryRun.transfer(account, transfer);

  if (dryRun.tag === 'failure') {
    throw new Error('Failed to dry run transfer.');
  }

  const transferMetadata: CIS2.CreateTransactionMetadata = {
    energy: Energy.create(dryRun.usedEnergy.value + 100n),
  };
  const transferTx = await client.createTransfer(transferMetadata, transfer);

  const transaction = await wallet
    .sendTransaction(
      AccountAddress.toBase58(account),
      AccountTransactionType.Update,
      transferTx.payload,
      transferTx.parameter.json,
      transferTx.schema,
    )
    .then(TransactionHash.fromHexString);
  return transaction;
}

type SubmitButtonsProps = {
  client: ConcordiumGRPCClient;
  contractClient: CIS2Contract;
  wallet: WalletApi;
  account: AccountAddress.Type;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedItems: any[];
  setUpdateBalance: (updated: boolean) => void;
};

function CircularIntegration({
  client,
  wallet,
  account,
  contractClient,
  open,
  setOpen,
  selectedItems,
  setUpdateBalance,
}: SubmitButtonsProps) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showFailure, setShowFailure] = React.useState(false);

  const handleButtonClick = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      try {
        const hash = await submitTransaction(BigInt(selectedItems.length), account, wallet, contractClient);
        const result = await client.waitForTransactionFinalization(hash);
        const summary = result.summary;
        if (isUpdateContractSummary(summary)) {
          setShowSuccess(true);
          setUpdateBalance(true);
        } else {
          setShowFailure(true);
        }
      } catch (e) {
        console.error(e);
        setShowFailure(true);
      }
      setLoading(false);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={showFailure} onClose={() => setShowFailure(false)}>
        <Alert severity="error">Transaction cancelled.</Alert>
      </Dialog>
      {
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showSuccess}
          autoHideDuration={5000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Payment successful.
          </Alert>
        </Snackbar>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Buy</DialogTitle>
        <List>
          <ListItem>
            <ListItemIcon>
              <SportsBarOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Buy ${selectedItems.length} ${selectedItems.length === 1 ? 'beer' : 'beers'} for ${
                selectedItems.length
              } EUROe`}
            />
          </ListItem>
        </List>
        <DialogActions>
          <Box
            sx={{
              justifyContent: 'center',
              minWidth: '300px',
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {!loading && (
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button onClick={handleClose}>Back to selection</Button>
                <Button variant="contained" sx={buttonSx} disabled={loading} onClick={handleButtonClick}>
                  Pay
                </Button>
              </Box>
            )}
            {loading && (
              <Box sx={{ m: 3, position: 'relative' }}>
                <Fab aria-label="save" color="primary" sx={buttonSx} onClick={handleButtonClick}>
                  {success ? <CheckIcon /> : <PublishRoundedIcon />}
                </Fab>
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

type CheckboxesGroupProps = {
  account: AccountAddress.Type;
  contractClient: CIS2Contract;
  client: ConcordiumGRPCClient;
  wallet: WalletApi;
  setUpdateBalance: (updated: boolean) => void;
};

function CheckboxesGroup({ account, contractClient, client, wallet, setUpdateBalance }: CheckboxesGroupProps) {
  const [state, setState] = React.useState([
    {
      name: 'Alderaanian Ale',
      selected: false,
    },
    {
      name: 'Black Frost Beer',
      selected: false,
    },
    {
      name: 'Butterbeer',
      selected: false,
    },
    {
      name: 'Churchill’s',
      selected: false,
    },
    {
      name: 'Girlie Girl Beer',
      selected: false,
    },
    {
      name: 'MAC 50',
      selected: false,
    },
  ]);

  const handleChange = (index: number) => (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setState((oldState) => {
      const newArray = [...oldState];
      newArray[index].selected = checked;
      return newArray;
    });
  };

  const [open, setOpen] = useState(false);

  const handleBuy = () => {
    setOpen(true);
  };

  return (
    <Box>
      <CircularIntegration
        client={client}
        contractClient={contractClient}
        wallet={wallet}
        account={account}
        open={open}
        setOpen={setOpen}
        selectedItems={state.filter((v) => v.selected)}
        setUpdateBalance={setUpdateBalance}
      ></CircularIntegration>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" style={{ textAlign: 'center' }}>
        <FormLabel component="legend">Select which beers to buy. You must select at least one to proceed.</FormLabel>
        <FormGroup aria-label="position" row>
          {' '}
          {state.map((item, index) => (
            <FormControlLabel
              control={<Checkbox checked={item.selected} onChange={handleChange(index)} name={item.name} />}
              label={item.name}
              labelPlacement="bottom"
              value={item.name}
              key={item.name}
            />
          ))}
        </FormGroup>

        <Button
          disabled={state.filter((v) => v.selected).length === 0}
          variant="contained"
          color="primary"
          onClick={handleBuy}
        >
          Buy
        </Button>
      </FormControl>
    </Box>
  );
}

function removeTrailingZeros(s: string): string {
  let end = s.length;
  while (end > 0) {
    if (s[end - 1] === '0') {
      end -= 1;
    } else {
      break;
    }
  }
  return s.substring(0, end);
}

function renderBalance(balance: bigint): string {
  if (balance === 0n) {
    return '0.0';
  }
  const after = balance % 1000000n;
  const before = balance / 1000000n;
  if (after === 0n) {
    return before.toString() + '.0';
  }
  return before.toString() + '.' + removeTrailingZeros(after.toString().padStart(6, '0'));
}

export default function BeerStore() {
  const [isVerified, setVerified] = useState<
    [AccountAddress.Type, CIS2Contract, WalletApi, ConcordiumGRPCClient] | undefined
  >(undefined);
  const [euroeBalance, seteuroeBalance] = useState<string | undefined>(undefined);
  const [isFailed, setFailed] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography textAlign="center" variant="h2" color="blue" gutterBottom>
          The beer shop
        </Typography>
        <Typography variant="h5" component="div">
          This is an age-restricted shop. Verify your age using the Concordium wallet to access it.
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth={true} variant="contained" size="large" onClick={ageCheck}>
          Verify age
        </Button>
      </CardActions>
    </React.Fragment>
  );

  async function ageCheck() {
    const provider = await detectConcordiumProvider();
    try {
      const accounts = await provider.requestAccounts();

      // TODO Replace add range with addMinimumAge(18) when SDK is fixed.
      const statementBuilder = new Web3StatementBuilder().addForIdentityCredentials([0, 1, 2, 3, 4, 5], (b) =>
        b.addRange('dob', MIN_DATE, getPastDate(18, 1)),
      );
      const statement = statementBuilder.getStatements();
      // In a production scenario the challenge should not be hardcoded, in order to avoid accepting proofs created for other contexts.
      const challenge = 'beefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef';

      // Requesting ID proof to check if user is 18 years old
      try {
        const presentation = await provider.requestVerifiablePresentation(challenge, statement);
        const did = presentation.verifiableCredential[0].credentialSubject.id;
        const credId = did.substring('did:ccd:testnet:cred:'.length);
        const client = new ConcordiumGRPCClient(provider.grpcTransport);
        const account = await client.getAccountInfo(CredentialRegistrationId.fromHexString(credId));
        if (!accounts.includes(AccountAddress.toBase58(account.accountAddress))) {
          throw new Error(
            `The account that was used to verify ${AccountAddress.toBase58(
              account.accountAddress,
            )} is not whitelisted.`,
          );
        }
        const contractClient = await CIS2Contract.create(client, CONTRACT_ADDRESS);
        const query: CIS2.BalanceOfQuery = {
          tokenId: '',
          address: account.accountAddress,
        };
        const balance = await contractClient.balanceOf(query);
        seteuroeBalance(renderBalance(balance));
        // TODO: Verify the proof
        // User is 18 year old, show something
        setVerified([account.accountAddress, contractClient, provider, client]);
        setFailed(false);
      } catch (e) {
        console.error(`Failed to get proof: ${e}.`);
        setFailed(true);
        setOpen(true);
        return;
      }
    } catch (error) {
      console.error(error); // from creation or business logic
      alert('Please connect');
    }
  }

  const [isUpdatedBalance, setUpdatedBalance] = useState(false);

  useEffect(() => {
    if (isUpdatedBalance && isVerified) {
      setUpdatedBalance(false);
      const query: CIS2.BalanceOfQuery = {
        tokenId: '',
        address: isVerified[0],
      };
      isVerified[1]
        .balanceOf(query)
        .then((balance) => seteuroeBalance(renderBalance(balance)))
        .catch((e) => console.error(e));
    }
  }, [isVerified, isUpdatedBalance]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '80vh' }}>
          {!isVerified && (
            <Box sx={{ minWidth: 275, maxWidth: 600 }}>
              <Card variant="outlined">{card}</Card>
            </Box>
          )}
          {isVerified && (
            <>
              <img style={{ borderRadius: 30 }} width={'800px'} src={beers} alt="beers" />
              <CheckboxesGroup
                account={isVerified[0]}
                wallet={isVerified[2]}
                contractClient={isVerified[1]}
                client={isVerified[3]}
                setUpdateBalance={setUpdatedBalance}
              ></CheckboxesGroup>
              <List>
                <ListItem>
                  <ListItemIcon>
                    {' '}
                    <ContactsRoundedIcon />{' '}
                  </ListItemIcon>
                  <ListItemText primary={AccountAddress.toBase58(isVerified[0])}></ListItemText>
                </ListItem>
                {euroeBalance !== undefined && (
                  <ListItem>
                    <ListItemIcon>
                      {' '}
                      <AccountBalanceRoundedIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary={`${euroeBalance} EUROe on account`}></ListItemText>
                  </ListItem>
                )}
              </List>
            </>
          )}
          {
            <Dialog open={isFailed && open} onClose={handleClose}>
              <DialogTitle>Age Verification Failed</DialogTitle>
              <Alert severity="warning" sx={{ ml: '50' }}>
                Age verification is not complete. You are not allowed to access the store!
              </Alert>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          }
        </Grid>
      </Container>
    </React.Fragment>
  );
}
