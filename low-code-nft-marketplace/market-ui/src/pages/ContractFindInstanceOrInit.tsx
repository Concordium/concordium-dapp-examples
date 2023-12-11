import { ContractInfo } from "common-ui";
import React from "react";

import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ConcordiumGRPCClient, ContractAddress } from "@concordium/web-sdk";
import { Container, Paper, Stack, Typography } from "@mui/material";

import ContractFindInstance from "../components/ContractFindInstance";
import MarketplaceContractInit from "../components/MarketplaceContractInit";

function ContractFindInstanceOrInit(props: {
  grpcClient: ConcordiumGRPCClient;
  provider: WalletApi;
  account: string;
  contractInfo: ContractInfo;
  onDone: (address: ContractAddress) => void;
}) {
  return (
    <Container sx={{ maxWidth: "xl", pt: "10px" }}>
      <Paper sx={{ padding: "20px" }} variant="outlined">
        <Stack spacing={2}>
          <ContractFindInstance grpcClient={props.grpcClient} onDone={props.onDone} />
          <Typography variant="overline">Or</Typography>
          <MarketplaceContractInit {...props} />
        </Stack>
      </Paper>
    </Container>
  );
}

export default ContractFindInstanceOrInit;
