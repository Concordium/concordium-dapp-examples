import {
    detectConcordiumProvider,
    WalletApi,
} from "@concordium/browser-wallet-api-helpers";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useState } from "react";

export default function Connect(props: {
    onConnected: (provider: WalletApi, account: string) => void;
    onDisconnected: () => void;
}) {
    const [isConnected, setConnected] = useState(false);

    const [address, setAccount] = useState("Account");
    function connect() {
        detectConcordiumProvider()
            .then((provider) => {
                provider
                    .connect()
                    .then((account) => {
                        setConnected(true);
                        props.onConnected(provider, account!);
                        setAccount(account as string)
                    })
                    .catch((_) => {
                        alert("Please allow wallet connection");
                        setConnected(false);
                    });
                provider.removeAllListeners();
                provider.on("accountDisconnected", () => {
                    setConnected(false);
                    props.onDisconnected();
                });
                provider.on("accountChanged", (account) => {
                    props.onDisconnected();
                    props.onConnected(provider, account);
                    setConnected(true);
                });
                provider.on("chainChanged", () => {
                    props.onDisconnected();
                    setConnected(false);
                });
                return provider
            })
            .catch((_) => {
                console.error(`could not find provider`);
                alert("Please download Concordium Wallet");
            });

    }

    return (
        <AppBar style={{ background: '#00321E' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 'auto' }}>
                    Beer Store!
                </Typography>
                <Button color="inherit" onClick={connect}>
                    {isConnected ? "Wallet Address: " + address.substring(0, 10) + "..." : "Connect"}
                </Button>
            </Toolbar>
        </AppBar >
    );
}