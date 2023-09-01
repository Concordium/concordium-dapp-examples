import {
    detectConcordiumProvider,
    WalletApi,
} from "@concordium/browser-wallet-api-helpers";
import { Toolbar, Grid, Dialog, DialogTitle, DialogActions, Typography, Link, Stack, Alert, Button, Card } from "@mui/material";
import { useState } from "react";
import Connect from "./Connect";
import beers from './../image/beers.png';

import {
    AccountAddress,
    IdStatementBuilder
} from '@concordium/web-sdk';

export default function BeerStore() {

    const [isVerified, setVerified] = useState(false);
    const [isFailed, setFailed] = useState(false);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const [isConnected, setConnected] = useState(false);

    async function age_check() {
        {
            < Connect
                onConnected={() => setConnected(true)
                }
                onDisconnected={() => setConnected(false)}
            />
        }

        const provider = await detectConcordiumProvider();
        try {
            const account = await provider.connect() as string;

            // console.log(createdUser)
            // business logic goes here


            const statementBuilder = new IdStatementBuilder().addMinimumAge(18);
            const statement = statementBuilder.getStatement();
            const challenge = "BBBBBBBB"

            // Requesting ID proof to check if user is 18 years old
            provider.requestIdProof(account, statement, challenge)
                .then((proof) => {
                    // User is 18 year old, show something
                    setVerified(true)
                    setFailed(false)
                })
                .catch(() => {
                    setFailed(true)
                    setOpen(true)
                    // User is not 18 years old
                    // alert("Age verification was not completed. Please complete the verification")
                })
        } catch (error) {
            console.error(error) // from creation or business logic
            alert("Please connect");
        }
    }
    return (
        <Toolbar>
            <Stack >
                <Grid sx={{ flexGrow: 1, mt: 0, color: 'white', ml: 45 }}>
                    <Grid sx={{ mt: 0, color: 'white', ml: 'auto' }}>
                        {
                            !isVerified ?
                                <Typography variant="h4" component="div" sx={{ flexGrow: 1, mt: 1, ml: 'auto' }}>
                                    Click to verify your age!
                                </Typography>
                                :
                                ""
                        }
                    </Grid>
                    <Grid sx={{ flexGrow: 1, ml: 'auto', mt: 5 }}>
                        <Button fullWidth color="inherit" onClick={age_check} disabled={isVerified} size="large" style={{ color: 'white', border: '2px solid', alignSelf: 'auto', display: isVerified ? "none" : "block" }}>
                            VERIFY
                        </Button>
                        <Grid sx={{ mt: 4 }}>
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1, mt: 1, ml: 'auto' }}>
                                <Link
                                    sx={{ color: "white" }}
                                    href="https://www.concordium.com"
                                    target={"_blank"}
                                    rel="noreferer">
                                    Read more!
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid >
                </Grid>
                <Grid>
                    {
                        isVerified ?
                            <Grid>
                                <Grid sx={{ mt: -30, ml: 'auto' }}>
                                    <Grid>
                                        <img src={beers}></img>
                                        <script>
                                            {
                                                document.body.style.backgroundColor = "white"
                                            }
                                        </script>

                                    </Grid>
                                    <Grid sx={{ mt: 4 }}>
                                        <Typography variant="h5" component="div" sx={{ flexGrow: 1, mt: 1, ml: 'auto' }}>
                                            <Link
                                                sx={{ color: "black" }}
                                                href="https://www.concordium.com"
                                                target={"_blank"}
                                                rel="noreferer">
                                                Read more!
                                            </Link>
                                        </Typography>

                                    </Grid>

                                </Grid>
                            </Grid>
                            : ""
                    }
                    {
                        isFailed ?
                            <Dialog open={open}
                                onClose={handleClose}>
                                <DialogTitle>Age Verification Failed</DialogTitle>
                                <Alert severity="warning" sx={{ ml: "50" }}>
                                    Age verification is not complete. You are not allowed to access beer store!
                                </Alert>
                                <DialogActions>
                                    <Button onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            : ""
                    }

                </Grid>
            </Stack>
        </Toolbar >
    );

}