import { Buffer } from 'buffer/';
import { v4 as uuidv4 } from 'uuid';

import { ContractAddress, serializeUpdateContractParameters } from '@concordium/web-sdk';
import WertWidget from '@wert-io/widget-initializer';
import { signSmartContractData } from '@wert-io/widget-sc-signer';

import {
    MARKETPLACE_CONTRACT_INFO, WERT_NETWORK, WERT_ORIGIN, WERT_PARTNER_ID, WERT_PRIVATE_KEY
} from '../Constants';
import { MethodNames, TransferParams } from './CarbonCreditMarketClient';
import { toParamContractAddress } from './ConcordiumContractClient';

//@ts-ignore
window.Buffer = Buffer;

export interface WertOptions {
  width: number;
  height: number;
  containerId: string;
}

const toHex = (obj: Record<string, unknown>) => {
  return Buffer.from(JSON.stringify(obj)).toString("hex");
};

export const transfer = async (
  account: string,
  marketContractAddress: ContractAddress,
  nftContractAddress: ContractAddress,
  tokenId: string,
  owner: string,
  quantity: bigint,
  totalPaymentCcd: bigint,
  containerId = "widget",
  width = 400,
  height = 600,
) => {
  return new Promise((res, rej) => {
    if (!validWertConfig()) {
      rej(new Error("Wert config is not valid"));
      return;
    }

    const paramJson: TransferParams = {
      cis_contract_address: toParamContractAddress(nftContractAddress),
      token_id: tokenId,
      to: account,
      owner: owner,
      quantity: quantity.toString(),
    };
    const parameter = serializeUpdateContractParameters(
      MARKETPLACE_CONTRACT_INFO.contractName,
      MethodNames.transfer,
      paramJson,
      MARKETPLACE_CONTRACT_INFO.schemaBuffer,
    );
    const signedData = signSmartContractData(
      {
        address: account,
        commodity: "CCD",
        commodity_amount: parseInt(totalPaymentCcd.toString()), // typescript does accept this as a string
        sc_address: toHex({
          index: parseInt(marketContractAddress.index.toString()),
          subindex: parseInt(marketContractAddress.subindex.toString()),
        }),
        sc_input_data: toHex({
          entrypoint: `${MARKETPLACE_CONTRACT_INFO.contractName}.${MethodNames.transfer}`,
          params: parameter.toString("hex"),
        }),
        network: WERT_NETWORK!,
      },
      WERT_PRIVATE_KEY!,
    );
    const otherWidgetOptions = {
      pk_id: "key1",
      sc_id: uuidv4(), //this is the request id. Needs to be diff for every request. just keeping click_id doesnt work.
      partner_id: WERT_PARTNER_ID,
      container_id: containerId,
      click_id: uuidv4(), // unique id of purchase in your system. really?
      origin: WERT_ORIGIN,
      width,
      height,
      listeners: {
        close: () => {
          console.log("close");
          res(true);
        },
        error: (err: { name: string; message: string }) => {
          console.error("error", err);
          rej(err);
        },
        loaded: () => {
          console.log("loaded");
        },
        "payment-status": (status: { status: string; payment_id: string; order_id: string; tx_id: string }) => {
          console.log("payment-status", status);
        },
        position: (pos: { step: string }) => {
          console.log("position", pos);
        },
      },
    };

    const wertWidget = new WertWidget({
      ...signedData,
      ...otherWidgetOptions,
    });
    wertWidget.mount();
  });
};

function validWertConfig() {
  return WERT_PARTNER_ID && WERT_PRIVATE_KEY && WERT_NETWORK && WERT_ORIGIN;
}