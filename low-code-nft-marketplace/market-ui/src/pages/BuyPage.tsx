import React from "react";

import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ConcordiumGRPCClient, ContractAddress } from "@concordium/web-sdk";
import { Paper } from "@mui/material";

import MarketplaceTokensList from "../components/MarketplaceTokensList";

function BuyPage(props: {
  grpcClient: ConcordiumGRPCClient;
  provider: WalletApi;
  marketContractAddress: ContractAddress;
  account: string;
}) {
  return (
    <Paper variant="outlined">
      <MarketplaceTokensList
        provider={props.provider}
        marketContractAddress={props.marketContractAddress}
        account={props.account}
        grpcClient={props.grpcClient}
      />
    </Paper>
  );
}

export default BuyPage;
