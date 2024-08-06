import { useEffect, useRef, useState } from 'react';

import { AccountAddress } from '@concordium/web-sdk';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { IBM_Plex_Mono } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';

import { ErrorAlert } from '@/components/ErrorAlert';
import { SingleInputForm } from '@/components/SingleInpuForm';
import { Step } from '@/components/Step';
import { FAQ, TWEET_TEMPLATE } from '@/constants';
import getLatestTransactions from '@/lib/getLatestTransactions';
import { extractITweetdFromUrl, formatTimestamp, formatTxHash } from '@/lib/utils';

import concordiumLogo from '../../public/concordium-logo-back.svg';
import poweredByConcordium from '../../public/powered_by_concordium_light.png';

const IBMPlexMono = IBM_Plex_Mono({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-ibm-plex-mono',
});

const validateAndClaim = async (XPostId: string | undefined, receiver: string) => {
    try {
        const response = await fetch('/api/validateAndClaim', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                XPostId,
                receiver,
                sender: process.env.NEXT_PUBLIC_SENDER_ADDRESS,
            }),
        });

        const data = await response.json();

        return { ok: response.ok, data };
    } catch (error) {
        throw new Error('Network error. Please check your connection.');
    }
};

const checkUsageLimit = async (receiver: string) => {
    try {
        const response = await fetch('/api/checkUsageLimit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ receiver }),
        });

        const data = await response.json();

        return { ok: response.ok, data };
    } catch (error) {
        throw new Error('Network error. Please check your connection.');
    }
};

export default function Home() {
    const [latestTransactions, setLatestTransactions] = useState<PartialTransaction[]>([]);
    const [address, setAddress] = useState<string>('');
    const [addressValidationError, setAddressValidationError] = useState<string | undefined>();

    const [tweetPostedUrl, setTweetPostedUrl] = useState('');
    const [XPostId, SetXPostId] = useState<string | undefined>();

    const [isAddressValid, setIsAddressValid] = useState<boolean>(false);
    const [isValidTweetUrl, setIsValidTweetUrl] = useState<boolean | undefined>();
    const [isValidVerification, setIsValidVerification] = useState<boolean | undefined>();
    const [isVerifyLoading, setIsVerifyLoading] = useState<boolean>(false);

    const [transactionHash, setTransactionHash] = useState<string | undefined>();

    const [error, setError] = useState<string | undefined>();
    const [turnstileIsOpen, setTurnstileOpen] = useState(false);
    const turnstileRef = useRef<TurnstileInstance>(null);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);

    const handleTweetUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsValidTweetUrl(undefined);
        setIsValidVerification(undefined);

        setTweetPostedUrl(e.target.value);
        const tweetId = extractITweetdFromUrl(e.target.value);
        if (!tweetId) {
            setIsValidTweetUrl(false);
        } else {
            setIsValidTweetUrl(true);
            SetXPostId(tweetId);
        }
    };

    const handlePostTweet = () =>
        window.open(
            `https://x.com/intent/tweet?text=${encodeURIComponent(TWEET_TEMPLATE + ' ' + address)}`,
            '_blank',
            'width=500,height=500',
        );

    const handleVerifyTweetAndSendTokens = async () => {
        setTurnstileOpen(false);
        setIsVerifyLoading(true);
        try {
            const response = await validateAndClaim(XPostId, address);

            if (response.ok) {
                setIsValidVerification(true);
                await new Promise((resolve) => setTimeout(resolve, 15000));
                setTransactionHash(response.data.transactionHash);
            } else {
                setIsValidVerification(false);
                setIsVerifyLoading(false);
                setError(response.data.error);
            }
        } catch (error: any) {
            setIsVerifyLoading(false);
            setError(error.message);
        }
    };

    useEffect(() => {
        setAddressValidationError(undefined);
        setIsAddressValid(false);
        if (!address) {
            return;
        }
        const isWithinUsageLimit = async () => {
            try {
                const { ok, data } = await checkUsageLimit(address);
                const usageLimit = process.env.NEXT_PUBLIC_USAGE_LIMIT_IN_HOURS!;
                if (ok && !data.isAllowed) {
                    setAddressValidationError(
                        `You already get tokens in the last ${usageLimit} ${Number(usageLimit) > 1 ? 'hours' : ' hour'}. Please try again later.`,
                    );
                    return;
                }
                setIsAddressValid(true);
            } catch (error) {
                console.log('Error on checkUsageLimit:', error);
            }
        };
        try {
            AccountAddress.fromBase58(address);
            isWithinUsageLimit();
        } catch (error) {
            setAddressValidationError('Invalid address. Please insert a valid one.');
        }
    }, [address]);

    useEffect(() => {
        if (!error) {
            return;
        }
        setTimeout(() => {
            setError(undefined);
        }, 10000);
    }, [error]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const transactions = await getLatestTransactions();
                setLatestTransactions(transactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
        const intervalId = setInterval(fetchTransactions, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={`min-h-screen ${IBMPlexMono.className}`}>
            <Head>
                <title>Concordium Testnet Faucet</title>
            </Head>
            <div className="h-24 w-full bg-[--teal] flex items-center justify-center sm:px-10">
                <p className="text-xl md:text-2xl text-center font-semibold text-white">Concordium Testnet Faucet</p>
            </div>
            <main className="flex flex-col items-center justify-between py-8 md:pt-12 md:pb-28 w-full">
                {isAddressValid ? 'address valid' : 'not valid address'}
                <p className="text-center text-sm md:text-base mb-4 md:mb-8 px-10">
                    {`Get Testnet CDDs every ${Number(process.env.NEXT_PUBLIC_USAGE_LIMIT_IN_HOURS) * 24} hours for testing your dApps!`}
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center md:items-start w-full text-sm md:text-base px-4 gap-6 lg:gap-12">
                    <div
                        id="phases"
                        className="h-fit flex flex-col items-center md:w-[45%] max-w-lg md:max-w-xl w-full"
                    >
                        <Step step={1} />
                        <SingleInputForm
                            inputValue={address}
                            handleInputValue={handleAddressChange}
                            handleSubmitButton={handlePostTweet}
                            inputPlaceHolder="Enter your testnet CCD address"
                            submitButtonText="Share on X"
                            inputDisabled={Boolean(tweetPostedUrl)}
                            submitButtonDisabled={
                                !address ||
                                (address && Boolean(addressValidationError)) ||
                                Boolean(tweetPostedUrl) ||
                                !isAddressValid
                            }
                        >
                            {addressValidationError && (
                                <p className="text-xs text-red-700 h-fit -mt-2 px-2">{addressValidationError}</p>
                            )}
                        </SingleInputForm>
                        <Step step={2} />
                        <SingleInputForm
                            inputValue={tweetPostedUrl}
                            handleInputValue={handleTweetUrlChange}
                            handleSubmitButton={() => {
                                setTurnstileOpen(true);
                                turnstileRef.current?.render();
                            }}
                            inputPlaceHolder="Enter your X Post link"
                            submitButtonText="Verify"
                            inputDisabled={!address || Boolean(addressValidationError) || isValidVerification}
                            submitButtonDisabled={!isValidTweetUrl || isValidVerification || isVerifyLoading}
                        />
                        <Step step={3} />
                        <div className="w-full flex flex-col border border-[--dark-blue] rounded-md max-w-xl p-2 items-center justify-center min-h-[160px] text-xs md:text-sm text-center font-semibold">
                            {isValidVerification ? (
                                <>
                                    <p className="mb-1">X Post Verified Succesfully ✅</p>
                                    {!transactionHash ? (
                                        <p>Sending tokens to your address ⏳</p>
                                    ) : (
                                        <>
                                            <p className="mb-1">Tokens Sent ✅</p>
                                            <p className="">
                                                Transaction Hash:{' '}
                                                <a
                                                    className="hover:cursor-pointer text-blue-500 font-normal"
                                                    href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/transaction/${transactionHash}`}
                                                    target="_blank"
                                                >
                                                    {formatTxHash(transactionHash)}
                                                </a>
                                            </p>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p className="font-normal text-gray-400">Verification of X Post is needed.</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div
                        id="latest-txs-and-faq"
                        className="flex flex-col items-center gap-4 md:w-[45%] max-w-lg md:max-w-xl w-full"
                    >
                        <p className="my-1.5">Latest transactions:</p>
                        <div className="relative border border-[--dark-blue] rounded-md overflow-auto w-full flex flex-col max-w-xl min-h-[256px] max-h-[256px] justify-evenly gap-1 py-1 text-xs md:text-sm">
                            {latestTransactions.length > 0 ? (
                                latestTransactions.map((tx) => (
                                    <div
                                        key={tx.transactionHash}
                                        className="bg-white p-1 mx-1 flex rounded-md h-20 md:h-24"
                                    >
                                        <Image
                                            src={concordiumLogo}
                                            alt="concordium-logo"
                                            className="bg-[--teal] p-2 rounded-md"
                                        />
                                        <div className="p-2 font-semibold">
                                            <p>
                                                Date:{' '}
                                                <span className="font-normal">{formatTimestamp(tx.blockTime)}</span>
                                            </p>
                                            <p>
                                                Transaction Hash:{' '}
                                                <a
                                                    className="hover:cursor-pointer text-blue-500 font-normal"
                                                    href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/transaction/${tx.transactionHash}`}
                                                    target="_blank"
                                                >
                                                    {formatTxHash(tx.transactionHash)}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="absolute inset-0 text-gray-400 text-center place-content-center">
                                    No transactions found.
                                </p>
                            )}
                        </div>
                        <p className="mt-4 md:mt-8">Frequently Asked Questions</p>
                        <div className="max-w-xl w-full text-xs md:text-sm shrink-0">
                            <div className="mx-auto w-full divide-y divide-black/5 border border-[--dark-blue] rounded-md">
                                {FAQ.map((item, questionIndex) => (
                                    <Disclosure
                                        key={questionIndex}
                                        as="div"
                                        className="px-6 py-4 shrink-0 w-full"
                                        defaultOpen={false}
                                    >
                                        <DisclosureButton className="group flex w-full items-center justify-between">
                                            <span className="text-black group-data-[hover]:text-black/80">
                                                {item.question}
                                            </span>
                                            <p className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180">
                                                ^
                                            </p>
                                        </DisclosureButton>
                                        <DisclosurePanel className="mt-2 space-y-2 text-black/60">
                                            {item.response.split('\n').map((responseText, reponseLineIndex) => (
                                                <p key={`${questionIndex}-${reponseLineIndex}`}>{responseText}</p>
                                            ))}
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="h-32 w-full bg-[--teal] flex items-center justify-center sm:px-10">
                <Image src={poweredByConcordium} alt="powered by" className="w-64 sm:w-72" />
            </div>
            <Dialog open={turnstileIsOpen} onClose={() => {}} className="relative z-20">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 bg-white p-8 rounded-md">
                        <DialogTitle className="font-semibold">Human Verification</DialogTitle>
                        <Turnstile
                            ref={turnstileRef}
                            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY as string}
                            options={{ theme: 'light', size: 'normal' }}
                            onSuccess={() => setTimeout(handleVerifyTweetAndSendTokens, 1500)}
                        />
                    </DialogPanel>
                </div>
            </Dialog>
            {error && <ErrorAlert errorText={error} onClose={() => setError(undefined)} />}
        </div>
    );
}
