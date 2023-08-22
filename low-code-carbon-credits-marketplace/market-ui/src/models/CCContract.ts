import { Buffer } from 'buffer/';

import {
    AccountAddress, CIS0, cis0Supports, CIS2Contract, ConcordiumGRPCClient, ContractAddress,
    deserializeTypeValue, InstanceInfo, serializeTypeValue
} from '@concordium/web-sdk';

export default class CCContract extends CIS2Contract {
  private contractName2: string;
  private nodeClient: ConcordiumGRPCClient;
  private maturityOfParamSchema = "FAABAAAABwAAAHF1ZXJpZXMQAh0A";
  private maturityOfReturnSchema = "EAIN";
  private isVerifiedParamSchema = "FAABAAAABwAAAHF1ZXJpZXMQAh0A";
  private isVerifiedReturnSchema = "EAIB";
  private contractAddress2: ContractAddress;

  constructor(grpcClient: ConcordiumGRPCClient, contractAddress: ContractAddress, contractName: string) {
    super(grpcClient, contractAddress, contractName);
    this.contractName2 = contractName;
    this.contractAddress2 = contractAddress;
    this.nodeClient = grpcClient;
  }

  public static async create(grpcClient: ConcordiumGRPCClient, contractAddress: ContractAddress): Promise<CCContract> {
    const instanceInfo = await grpcClient.getInstanceInfo(contractAddress);
    if (instanceInfo === undefined) {
      throw new Error(`Could not get contract instance info for contract at address ${contractAddress.index.toString}`);
    }

    const result = await cis0Supports(grpcClient, contractAddress, "CIS-2");

    if (result?.type !== CIS0.SupportType.Support) {
      throw new Error(
        `The CIS-2 standard is not supported by the contract at address ${contractAddress.index.toString()}`,
      );
    }

    const contractName = getContractName(instanceInfo);
    const contract = new CCContract(grpcClient, contractAddress, contractName);
    return contract;
  }

  public async maturityOf(tokenId: string, invoker?: ContractAddress | AccountAddress): Promise<Date> {
    const methodName = "maturityOf";
    const parameter = serializeTypeValue({ queries: [tokenId] }, Buffer.from(this.maturityOfParamSchema, "base64"));
    const contract = this.contractAddress2;
    const res = await this.nodeClient.invokeContract({
      parameter,
      contract,
      invoker,
      method: `${this.contractName2}.${methodName}`,
    });

    switch (res.tag) {
      case "success": {
        const retValueDe: string[] = deserializeTypeValue(
          Buffer.from(res.returnValue || "", "hex"),
          Buffer.from(this.maturityOfReturnSchema, "base64"),
        ) as any;
        return new Date(retValueDe[0]);
      }
      case "failure":
        throw new Error(`Failed to invoke contract: ${res.reason}`);
    }
  }

  public async isVerified(tokenId: string, invoker?: ContractAddress | AccountAddress): Promise<boolean> {
    const methodName = "isVerified";
    const parameter = serializeTypeValue({ queries: [tokenId] }, Buffer.from(this.isVerifiedParamSchema, "base64"));
    const contract = this.contractAddress2;
    const res = await this.nodeClient.invokeContract({
      parameter,
      contract,
      invoker,
      method: `${this.contractName2}.${methodName}`,
    });

    switch (res.tag) {
      case "success": {
        const retValueDe: boolean[] = deserializeTypeValue(
          Buffer.from(res.returnValue || "", "hex"),
          Buffer.from(this.isVerifiedReturnSchema, "base64"),
        ) as any;
        return retValueDe[0];
      }
      case "failure":
        throw new Error(`Failed to invoke contract: ${res.reason}`);
    }
  }
}

export const getContractName = ({ name }: InstanceInfo): string => {
  if (!name.startsWith("init_")) {
    throw new Error("Could not get name from contract instance info.");
  }

  return name.substring(5);
};
