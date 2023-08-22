export type Option<T> =
  | {
      Some: [T];
    }
  | { None: [] };
export type Address = {
  Account?: [string];
  Contract?: [{ index: number; subindex: number }];
};

export type Cis2MintEvent = {
  owner: Address;
  token_id: string;
  amount: string;
};

export type Cis2TokenMetadataEvent = {
  token_id: string;
  metadata_url: {
    url: string;
    hash: Option<number[]>;
  };
};

export type ProjectNftMaturityTimeEvent = {
  token_id: string;
  maturity_time: string;
};

export type Cis2BurnEvent = {
  owner: Address;
  token_id: string;
  amount: string;
};

export type Cis2TransferEvent = {
  token_id: string;
  amount: string;
  from: Address;
  to: Address;
};

export type ProjectNftVerifierUpdatedEvent = {
  verifier: Address;
};

export type ProjectNftVerificationEvent = {
  token_id: string;
  verifier: Address;
};

export type ProjectNftEvent = {
  Mint?: Cis2MintEvent;
  Transfer?: Cis2TransferEvent;
  TokenMetadata?: Cis2TokenMetadataEvent;
  Retire?: Cis2BurnEvent;
  Retract?: Cis2BurnEvent;
  Burn?: Cis2BurnEvent;
  MaturityTime?: ProjectNftMaturityTimeEvent;
  VerifierAdded?: ProjectNftVerifierUpdatedEvent;
  VerifierRemoved?: ProjectNftVerifierUpdatedEvent;
  Verification?: ProjectNftVerificationEvent;
};

export type FractionalizerMintEvent = Cis2MintEvent;
export type FractionalizerTokenMetadataEvent = Cis2TokenMetadataEvent;
export type FractionalizerTransferEvent = Cis2TransferEvent;
export type FractionalizerCollateralUpdatedEvent = {
  owner: Address;
  token_id: string;
  amount: string;
  contract: {
    index: number;
    subindex: number;
  };
};

export type FractionalizerEvent = {
  Mint?: FractionalizerMintEvent;
  TokenMetadata?: FractionalizerTokenMetadataEvent;
  Retire?: Cis2BurnEvent;
  Retract?: Cis2BurnEvent;
  Burn?: Cis2BurnEvent;
  Transfer?: FractionalizerTransferEvent;
  CollateralAdded?: FractionalizerCollateralUpdatedEvent;
  CollateralRemoved?: FractionalizerCollateralUpdatedEvent;
  CollateralUsed?: FractionalizerCollateralUpdatedEvent;
};

export type MarketTokenListedEvent = {
  token_id: string;
  token_contract: {
    index: number;
    subindex: number;
  };
  price: string;
  amount: string;
};

export type MarketTokenReceivedEvent = {
  token_id: string;
  token_contract: {
    index: number;
    subindex: number;
  };
  amount: string;
  owner: Address;
};
export type MarketTokenTransferredEvent = {
  token_id: string;
  token_contract: {
    index: number;
    subindex: number;
  };
  amount: string;
  from: Address;
  to: Address;
};
export type MarketEvent = {
  TokenListed?: [MarketTokenListedEvent];
  TokenReceived?: [MarketTokenReceivedEvent];
  TokenTransferred?: [MarketTokenTransferredEvent];
};
export type ModuleEvent = ProjectNftEvent | FractionalizerEvent | MarketEvent;
