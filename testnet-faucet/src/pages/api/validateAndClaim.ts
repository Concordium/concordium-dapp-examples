import { AccountTransactionSignature, signTransaction } from "@concordium/web-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { Rettiwt } from 'rettiwt-api';

import { extraKeywordToVerify } from "@/constants";
import createAccountTransaction from "@/lib/createAccountTrasantion";
import createGRPCNodeClient from "@/lib/createGPRCClient";
import { getSenderAccountSigner } from "@/lib/getSenderAccountSigner";


interface IBody {
  XPostId: string
  receiver: string
  sender: string
}

type Data = {
  transactionHash?: string
  error?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Please use POST.' });
  }
  
  const { XPostId, receiver, sender } = req.body as IBody;

  if (!XPostId || !receiver || !sender) {
    return res.status(400).json({ error: 'Missing parameters. Please provide XPostId, receiver and sender.' });
  }

  try {
    const rettiwt = new Rettiwt();
    const response = await rettiwt.tweet.details(XPostId);

    if (!response) {
      return res.status(500).json({ error: 'Unable to retrieve tweet details. The X Post ID might be invalid.' });
    }
    
    const tweetText = response.fullText;
    const isValid = tweetText.includes(receiver) && tweetText.includes(extraKeywordToVerify);

    if (!isValid) {
      return res.status(400).json({ error: 'X Post verification failed. Please make sure you do not modify the template text and that your address is present.' });
    }

    const client = createGRPCNodeClient()
    const signer = getSenderAccountSigner()
    
    const accountTransaction = await createAccountTransaction(client, sender, receiver)
    const signature: AccountTransactionSignature = await signTransaction(accountTransaction, signer);

    const transactionHash = await client.sendAccountTransaction(accountTransaction, signature)
    return res.status(200).json({ transactionHash: transactionHash.toString() });

  } catch (e) {
    return res.status(500).json({ error: `An unexpected error has occurred: ${e}`});
  }
}
