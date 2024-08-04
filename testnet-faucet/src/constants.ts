export const TWEET_TEMPLATE =
  "Excited to use the testnet faucet! 🚀 Requesting CCD tokens to power my blockchain experiments. Check it out! #Concordium #Blockchain #Testnet";

export const FAQ = [
  {
    question: "What do I need to use the faucet?",
    response: "You need a CDD testnet wallet address and an X account.",
  },
  {
    question: "How does it work?",
    response:
      "Step 1. Paste your wallet address and press the Share on X button.\n Step 2. Copy the link from your X post and paste it into input, then press the Verify button.\n Step 3. A dialog will open to verify that you are human, if requested, mark the checkbox.\n After verifying that you are human, your X Post will be verified and if it is successful, the tokens will be transferred to your wallet",
  },
  {
    question: "Is there any usage limit?",
    response: `Yes, currently you can use the faucet once every ${Number(process.env.NEXT_PUBLIC_USAGE_LIMIT_IN_DAYS) * 24} hours`,
  },
];

export const extraKeywordToVerify = "Concordium";
