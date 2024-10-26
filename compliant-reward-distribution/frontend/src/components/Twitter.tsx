'use client';
import { useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "./BackButton";

import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import { WalletProvider } from '@/utils/wallet-connection';
import { SCHEMA_TWEET_MESSAGE } from '@/utils/constants';
import { getRecentBlock, requestSignature, validateTweetUrl } from '@/utils/utils';
import { submitTweet } from '@/utils/apiReqeuests';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { useWallet } from '@/context/WalletContext';
import { useRouter } from "next/navigation";

const DEFAULT_NETWORK = 'testnet';
const DEFAULT_NODE = 'https://grpc.testnet.concordium.com:20000';

export default function SubmitXPost() {
  const { provider, connectedAccount, setProvider, setConnectedAccount } = useWallet();
  const router = useRouter()

  const grpcClient = useRef(new ConcordiumGRPCClient(new GrpcWebFetchTransport({ baseUrl: DEFAULT_NODE }))).current;
  const capitalizedNetwork = DEFAULT_NETWORK[0].toUpperCase() + DEFAULT_NETWORK.substring(1);


  const [error, setError] = useState<string | undefined>(undefined);
  const [successfulSubmission, setSuccessfulSubmission] = useState<boolean | undefined>(undefined);

  // React Hook Form setup for tweet input and validation
  interface FormType {
    tweet: string;
  }
  const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });
  const [tweet] = useWatch({ control, name: ['tweet'] });

  async function onSubmit() {
    setError(undefined);
    setSuccessfulSubmission(undefined);

    try {
      if (!connectedAccount) {
        throw new Error(`'connectedAccount' is undefined. Connect your wallet and ensure you have an account.`);
      }

      const { blockHash: recentBlockHash, blockHeight: recentBlockHeight } = await getRecentBlock(grpcClient);

      const signature = await requestSignature(recentBlockHash, SCHEMA_TWEET_MESSAGE, tweet, connectedAccount, provider);

      await submitTweet(connectedAccount, signature, recentBlockHeight, tweet);
      setSuccessfulSubmission(true);
    } catch (error) {
      setError((error as Error).message);
    }
    router.push('/proof')
  }

  const ProgressStep = ({ number, active }: { number: number; active: boolean; }) => (
    <div className="flex items-center">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${active ? number === 2 ? "bg-[#ece2cd] text-black" : number === 3 ? "bg-[#b6ade6] text-black" : "bg-[#a7f2ec] text-black" : "bg-[#7a7a7a] text-black"}`}>
        {number}
      </div>
      {number < 3 && (
        <div className={`h-[2px] w-12 sm:w-24 md:w-32 ${active ? number === 2 ? "bg-[#ece2cd]" : number === 3 ? "bg-[#a7f2ec]" : "bg-[#a7f2ec]" : "bg-[#7a7a7a]"}`}></div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#14181D] text-gray-100 pt-[64px] flex flex-col pb-2">
      <BackButton />
      <main className="flex-grow flex flex-col items-center max-w-2xl mx-auto w-full">
        <div className="flex justify-center">
          <ProgressStep number={1} active={true} />
          <ProgressStep number={2} active={true} />
          <ProgressStep number={3} active={false} />
        </div>

        <h1 className="text-[24px] opacity-[100%] mt-[32px] mb-[24px] font-[450] text-[#FFFFFF] text-center font-[family-name:var(--font-satoshi-sans)]">
          Submit X Post Link
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[339px] space-y-4">
          <div className="bg-transparent px-[14px] pb-[12px] pt-[8px] border-[#71797E] border rounded-[12px]">
            <label htmlFor="post-link" className="block text-[12px] font-normal text-gray-400">
              Paste link here
            </label>
            <input
              {...register('tweet', { required: true, validate: validateTweetUrl })}
              type="text"
              id="post-link"
              className="w-full bg-transparent text-white outline-none text-[14px] font-medium font-[family-name:var(--font-satoshi-sans)] rounded-md placeholder:text-[#ffff]"
              placeholder="https://x.com/coingecko/status/181499..."
            />
            {formState.errors.tweet && (
              <p className="text-red-500 text-sm">{formState.errors.tweet.message}</p>
            )}
          </div>

          <div className="bg-transparent w-[339px] border border-[#71797E] py-[12px] px-[12px] rounded-[14px]">
            <h2 className="text-[16px] font-medium font-[family-name:var(--font-satoshi-sans)]">
              Details
            </h2>
            <ul className="list-disc list-inside space-y-[3px] text-gray-300 text-[14px] font-[family-name:var(--font-satoshi-sans)]">
              <li className="text-[#BFBFBF]">
                Your post should contain the{" "}
                <span className="text-blue-500">#ConcordiumNet</span>{" "}
                <span className="ml-5">hashtag and mention</span>{" "}
                <span className="text-blue-500">@ConcordiumNet</span>
              </li>
              <li>The text can be anything you want</li>
              <li>Use the template below or write your own</li>
            </ul>

            <div className="p-[16px] bg-[#1A1F21] mt-[12px] rounded-lg relative">
              <button className="flex justify-center items-center gap-1 absolute top-2 right-2 bg-[#383E40] p-2 text-[12px] font-medium rounded-md hover:bg-gray-500 transition-colors">
                <Copy size={16} />
                <div>Copy</div>
              </button>
              <div className="flex items-center mb-2">
                <Image
                  src="/Images/Ellipse 1.svg"
                  width={40}
                  height={40}
                  alt="Profile picture"
                  className="rounded-full mr-2"
                />
                <div>
                  <p className="font-bold font-[family-name:var(--font-satoshi-sans)] text-[11px]">
                    Yourname
                    <Image
                      src="/Images/Verified.svg"
                      width={11}
                      height={11}
                      alt="Verified"
                      className="rounded-full ml-2 inline"
                    />
                  </p>
                  <p className="text-gray-400 text-[11px] font-[family-name:var(--font-satoshi-sans)]">
                    @yournickname
                  </p>
                </div>
              </div>
              <p className="text-[12px] font-normal font-[family-name:var(--font-satoshi-sans)]">
                Just created my{" "}
                <span className="text-[#1DA3F2]">
                  <a href="https://www.concordium.com/">@ConcordiumNet</a>
                </span>{" "}
                account and received 1000 $CCD reward! Go to concordium.com/wallet to get yours!
              </p>
              <p className="text-[#1DA3F2] text-[12px]">
                <a href="https://www.concordium.com/">#Concordium</a>
              </p>
              <p className="text-[#8E8E8E] text-xs sm:text-sm">XX:XX PM · Aug XX, 2024</p>
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {successfulSubmission && <p className="text-green-500 text-center">Submission Successful!</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white w-[240px] mt-5 text-gray-900 font-semibold py-2 sm:py-3 px-6 rounded-full hover:bg-gray-200 transition-colors max-w-xs"
            >
              Continue
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}
