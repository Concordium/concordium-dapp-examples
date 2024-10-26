"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import QRCode from "qrcode";

import icon from "../../public/Images/Frame 41371.svg";
import icon2 from "../../public/Images/Frame 1958.svg";
import Link from "next/link";
import BackButton from "../components/BackButton";
import {
  detectConcordiumProvider,
} from '@concordium/browser-wallet-api-helpers';
import { BrowserWalletProvider, WalletConnectProvider, WalletProvider } from "@/utils/wallet-connection";
import { ConcordiumGRPCClient } from "@concordium/web-sdk";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { useWallet } from "@/context/WalletContext";
import { useRouter } from "next/navigation";


const ProgressStep = ({
  number,
  active,
}: {
  number: number;
  active: boolean;
}) => (
  <div className="flex items-center">
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${active ? "bg-[#a7f2ec] text-black" : "bg-[#7a7a7a] text-black "
        }`}
    >
      {number}
    </div>
    {number < 3 && (
      <div
        className={`h-[2px] w-12 sm:w-24 md:w-32 ${active ? "bg-[#a7f2ec]" : "bg-[#7a7a7a]"
          }`}
      ></div>
    )}
  </div>
);
const DEFAULT_NETWORK = 'testnet';
const DEFAULT_NODE = 'https://grpc.testnet.concordium.com:20000';
export default function ConnectWallet() {
  const router = useRouter()
  const { provider, connectedAccount, setProvider, setConnectedAccount } = useWallet();

  // const [provider, setProvider] = useState<WalletProvider>();
  // const [connectedAccount, setConnectedAccount] = useState<string>();
  const grpcClient = useRef(new ConcordiumGRPCClient(new GrpcWebFetchTransport({ baseUrl: DEFAULT_NODE }))).current;
  const capitalizedNetwork = DEFAULT_NETWORK[0].toUpperCase() + DEFAULT_NETWORK.substring(1);

  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [selectedWalletOption, setSelectedWalletOption] = useState<
    string | null
  >(null);

  const connectProvider = async (provider: WalletProvider) => {
    const account = await provider.connect();
    console.log("account", account)
    if (account) {
      setConnectedAccount(account);
    }
    setProvider(provider);
    router.push('/twitter-post')
  };
  useEffect(() => {
    try {
      if (provider) {
        return () => {
          provider?.disconnect?.().then(() => provider.removeAllListeners());
        };
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [provider]);

  useEffect(() => {
    try {
      const handleAccountChange = (newAccount: any) => {
        setConnectedAccount(newAccount);
      };

      provider?.on('accountChanged', handleAccountChange);

      return () => {
        provider?.off('accountChanged', handleAccountChange);
      };
    } catch (error) {
      console.error('Error:', error);
    }
  }, [provider]);


  const generateQRCode = async (walletUrl: string) => {
    try {
      const url = await QRCode.toDataURL(walletUrl);
      setQrCodeUrl(url);
    } catch (error) {
      console.error("Failed to generate QR code", error);
    }
  };
  const connectConcordiumWallet = async () => {
    connectProvider(await BrowserWalletProvider.getInstance())
    return;
    try {
      console.log("Connecting to wallet...");

      const provider = await detectConcordiumProvider();

      // Request account from the provider
      let accounts: any = [];
      let accountAddress = ""; // Assume the first account
      while (accounts.length < 1) {
        console.log("Loop")
        accounts = await provider.connect();
        console.log("accounts", accounts)
      }
      accountAddress = accounts

      console.log("Connected account:", accountAddress);

      const url = 'http://localhost:8080/v0/verify'; // Adjust the port if necessary

      // Verifiable presentation payload (replace with actual presentation)
      const verifiablePresentation = {
        type: 'VerifiablePresentation',
        context: ['https://www.w3.org/2018/credentials/v1'],
        verifiableCredential: [
          {
            id: 'http://example.edu/credentials/3732',
            type: ['VerifiableCredential'],
            issuer: 'https://example.edu/issuers/14',
            issuanceDate: '2020-03-10T04:24:12.164Z',
            credentialSubject: {
              id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
              degree: {
                type: 'BachelorDegree',
                name: 'Bachelor of Science in Computer Science',
              },
            },
          },
        ],
        proof: {
          type: 'Ed25519Signature2018',
          created: '2020-04-22T10:37:22Z',
          verificationMethod: 'https://example.edu/issuers/keys/1',
          proofPurpose: 'assertionMethod',
          jws: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...',
        },
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(verifiablePresentation),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Verification response:', data);
      } catch (error) {
        console.error('Error verifying presentation:', error);
      }


    } catch (error) {
      console.error("Failed to connect to Concordium wallet or retrieve identity attributes", error);
    }
  };
  const handleWalletClick = (walletName: string, walletUrl: string) => {
    if (selectedWalletOption === walletName) {
      setSelectedWalletOption(null);
      setQrCodeUrl(null);
    } else {
      setSelectedWalletOption(walletName);
      if (walletUrl) {
        generateQRCode(walletUrl);
      } else {
        setQrCodeUrl(null);
      }
    }
    if (walletName === "Browser Wallet") {
      connectConcordiumWallet()
    }
  };

  return (
    <div className="min-h-screen bg-[#14181D] text-white pt-[64px] pb-2">
      <BackButton />
      <div className="flex justify-center mb-8">
        <ProgressStep number={1} active={true} />
        <ProgressStep number={2} active={false} />
        <ProgressStep number={3} active={false} />
      </div>
      <div className="max-w-[339px] mx-auto">
        <h1 className="text-2xl font-medium mb-8 text-center">
          Connect your wallet
        </h1>
        <div className="max-w-[339px]">
          <div
            className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-[#1B2323]"
            onClick={async() => {
              connectProvider(await BrowserWalletProvider.getInstance())
              // handleWalletClick("Browser Wallet", "")
            }}
          >
            <div className="flex items-center space-x-3">
              <Image
                src={icon}
                alt="Browser Wallet"
                className="w-[28px] h-[28px]"
              />
              <span className="text-[16px] font-medium font-[family-name:var(--font-satoshi-sans)] text-white">
                Browser Wallet
              </span>
            </div>
            <div
              className={`border rounded-full ${selectedWalletOption === "Browser Wallet" ? "border-white" : ""
                }`}
            >
              <h1
                className={`w-[14px] h-[14px] m-[2px] rounded-full ${selectedWalletOption === "Browser Wallet" ? "bg-white" : ""
                  }`}
              ></h1>
            </div>
          </div>

          {/* {selectedWalletOption === "Browser Wallet" && (
            <div className="bg-[#1B2323] flex flex-col mb-[4px] p-2 items-center rounded-b-lg">
              <p className="mb-4 text-center flex flex-row text-[14px] items-center font-[family-name:var(--font-satoshi-sans)]  font-normal">
                {" "}
                <Link href={"/twitter-post"}>
                  <button className="flex bg-[#383E40] justify-center items-center text-[14px] font-[family-name:var(--font-satoshi-sans)]  font-normal p-2 rounded-md ml-2">
                    Next{" "}
                    <ArrowLeft
                      size={14}
                      className="-rotate-180 ml-2 text-[14px]"
                    />
                  </button>
                </Link>
              </p>
            </div>
          )} */}

          <div
            onClick={async () => {
              console.log("Mobile")
              connectProvider(await WalletConnectProvider.getInstance())
              // handleWalletClick(
              //   "Android CryptoX Wallet",
              //   "https://play.google.com/store/apps/details?id=com.pioneeringtechventures.wallet&hl=en"
              // )
            }}
            className={`flex items-center justify-between p-4 mt-[4px] 
              ${selectedWalletOption === "Android CryptoX Wallet"
                ? "rounded-t-lg "
                : "rounded-lg"
              }
               cursor-pointer bg-[#1B2323]`}
          >
            <div className="flex items-center space-x-3">
              <Image
                src={icon2}
                alt="Android CryptoX Wallet"
                className="w-[28px] h-[28px]"
              />
              <span className="text-[16px] font-medium font-[family-name:var(--font-satoshi-sans)] text-white">
                Android CryptoX Wallet
              </span>
            </div>
            <div
              className={`border rounded-full ${selectedWalletOption === "Android CryptoX Wallet"
                ? "border-white"
                : ""
                }`}
            >
              <h1
                className={`w-[14px] h-[14px] m-[2px] rounded-full ${selectedWalletOption === "Android CryptoX Wallet"
                  ? "bg-white"
                  : ""
                  }`}
              ></h1>
            </div>
          </div>

          {qrCodeUrl && selectedWalletOption === "Android CryptoX Wallet" && (
            <div className="bg-[#1B2323] flex flex-col mb-[4px] p-2 items-center rounded-b-lg">
              <p className="mb-4 text-center flex flex-row text-[14px] items-center font-[family-name:var(--font-satoshi-sans)]  font-normal">
                Scan the QR code Or{" "}
                <Link href={"/twitter-post"}>
                  <button className="flex bg-[#383E40] justify-center items-center text-[14px] font-[family-name:var(--font-satoshi-sans)]  font-normal p-2 rounded-md ml-2">
                    Tap here{" "}
                    <ArrowLeft
                      size={14}
                      className="-rotate-180 ml-2 text-[14px]"
                    />
                  </button>
                </Link>
              </p>
              <Image
                src={qrCodeUrl}
                alt="QR Code"
                className="rounded-lg mb-2"
                width={200}
                height={200}
              />
            </div>
          )}

          <div
            onClick={() => handleWalletClick("iOS CryptoX Wallet", "https://apps.apple.com/lv/app/cryptox-concordium-wallet/id1593386457")}
            className={`flex items-center justify-between rounded-lg p-4 mt-[4px] 
               cursor-pointer bg-[#1B2323]`}
          >
            <div className="flex items-center space-x-3">
              <Image
                src={icon2}
                alt="iOS CryptoX Wallet"
                className="w-[28px] h-[28px]"
              />
              <span className="text-[16px] font-medium font-[family-name:var(--font-satoshi-sans)] text-white">
                iOS CryptoX Wallet
              </span>
            </div>
            <div
              className={`border rounded-full ${selectedWalletOption === "iOS CryptoX Wallet"
                ? "border-white"
                : ""
                }`}
            >
              <h1
                className={`w-[14px] h-[14px] m-[2px] rounded-full ${selectedWalletOption === "iOS CryptoX Wallet"
                  ? "bg-white"
                  : ""
                  }`}
              ></h1>
            </div>
          </div>
          {qrCodeUrl && selectedWalletOption === "iOS CryptoX Wallet" && (
            <div className="bg-[#1B2323] flex flex-col mb-[4px] p-2 items-center rounded-b-lg">
              <p className="mb-4 text-center flex flex-row text-[14px] items-center font-[family-name:var(--font-satoshi-sans)]  font-normal">
                Scan the QR code Or{" "}
                <Link href={"/twitter-post"}>
                  <button className="flex bg-[#383E40] justify-center items-center text-[14px] font-[family-name:var(--font-satoshi-sans)]  font-normal p-2 rounded-md ml-2">
                    Tap here{" "}
                    <ArrowLeft
                      size={14}
                      className="-rotate-180 ml-2 text-[14px]"
                    />
                  </button>
                </Link>
              </p>
              <Image
                src={qrCodeUrl}
                alt="QR Code"
                className="rounded-lg mb-2"
                width={200}
                height={200}
              />
            </div>
          )}
          {/* {selectedWalletOption === "Browser Wallet" && (
            <div className="flex justify-center items-center w-full">
              <button onClick={(e) => {
                connectConcordiumWallet()
              }} className="bg-white w-[240px] mt-4 text-gray-900 font-semibold py-2 sm:py-3 px-6 rounded-full hover:bg-gray-200 transition-colors max-w-xs">
                Connect Wallet
              </button>
            </div>
          )} */}
          {qrCodeUrl && selectedWalletOption === "Android CryptoX Wallet" && (
            <p className="mt-[44px] text-[#CCD5D5] text-[12px]">
              By connecting a wallet, you agree to{" "}
              <u>
                <a href="https://www.concordium.com/">Concordium Terms of Service</a>
              </u>{" "}
              and acknowledge that you have read and understand the
              <u>
                {" "}
                <a href="https://www.concordium.com/"> Concordium Privacy Policy</a>
              </u>
              .
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
