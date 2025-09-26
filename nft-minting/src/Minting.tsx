// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import {
    ConcordiumGRPCClient,
    ContractAddress,
    ContractName,
    EntrypointName,
    ReceiveName,
    ReturnValue,
    serializeUpdateContractParameters,
    toBuffer,
} from '@concordium/web-sdk';
import { createCollection, state, mint, isOwner } from './utils';
import { RAW_SCHEMA } from './constant';

const MINT_HOST = 'http://localhost:8899';

interface NFTPRops {
    index: bigint;
    id: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const getTokenUrl = async (id: string, index: bigint, subindex = 0n): Promise<string | undefined> => {
    const param = serializeUpdateContractParameters(
        ContractName.fromString('CIS2-NFT'),
        EntrypointName.fromString('tokenMetadata'),
        [id],
        toBuffer(RAW_SCHEMA, 'base64'),
    );
    const provider = await detectConcordiumProvider();
    const grpc = new ConcordiumGRPCClient(provider.grpcTransport);
    const returnValue = await grpc.invokeContract({
        contract: ContractAddress.create(index, subindex),
        method: ReceiveName.fromString('CIS2-NFT.tokenMetadata'),
        parameter: param,
    });

    if (returnValue && returnValue.tag === 'success' && returnValue.returnValue) {
        const bufferStream = toBuffer(ReturnValue.toHexString(returnValue.returnValue), 'hex');
        const length = bufferStream.readUInt16LE(2);
        const url = bufferStream.slice(4, 4 + length).toString('utf8');
        return url;
    }

    console.log(id);
    return undefined;
};

interface Metadata {
    description: string;
    name: string;
    display: {
        url: string;
    };
}

function NFT({ index, id }: NFTPRops) {
    const [metadata, setMetadata] = useState<Metadata>();

    useEffect(() => {
        void getTokenUrl(id, index).then((tokenUrl) => {
            if (tokenUrl !== undefined) {
                void fetch(tokenUrl, {
                    headers: new Headers({ 'Access-Control-Allow-Origin': '*' }),
                    mode: 'cors',
                }).then((resp) => {
                    if (resp.ok) {
                        void resp.json().then(setMetadata);
                    }
                });
            }
        });
    }, [index, id]);

    if (!metadata) {
        return null;
    }

    return (
        <div className="nft" title={metadata.description}>
            <p>{metadata.name}</p>
            <img alt="" src={metadata.display.url} />
        </div>
    );
}

interface CollectionProps {
    index: bigint;
    account: string;
    nfts: string[] | undefined;
    addNft: (nft: string) => void;
}

function Collection({ index, account, nfts, addNft }: CollectionProps) {
    const [owning, setOwning] = useState(false);

    useEffect(() => {
        void isOwner(account, index).then((r) => setOwning(r));
    }, [account, index]);

    return (
        <div className="collection">
            <h3>{index.toString()}</h3>
            {owning ? (
                <form
                    className="form"
                    onSubmit={async (event) => {
                        event.preventDefault();
                        const id = Math.round(Math.random() * 100000)
                            .toString()
                            .padEnd(8, '0');
                        const response = await fetch(`${MINT_HOST}/metadata/${id}`, {
                            method: 'POST',
                            body: new FormData(event.target as HTMLFormElement),
                            headers: new Headers({ 'Access-Control-Allow-Origin': '*' }),
                            mode: 'cors',
                        });
                        console.log(response);
                        const { url } = (await response.json()) as { url: string };
                        // Get values from form + send to backend.
                        if (url) {
                            void mint(account, id, url, index).then(() => {
                                console.log(id);
                                addNft(id);
                            });
                        }
                    }}
                >
                    <input name="address" type="string" value={index.toString()} className="hidden" />
                    <input name="display" type="file" />
                    <label htmlFor="name">Name</label>
                    <input name="name" type="string" />
                    <label htmlFor="description">Description</label>
                    <input name="description" type="string" />
                    <button type="submit">mint</button>
                </form>
            ) : null}
            <div className="collection-nfts">
                {(nfts ?? []).map((nft, idx) => (
                    <NFT id={nft} index={index} key={idx} />
                ))}
            </div>
        </div>
    );
}

async function fetchCollections() {
    const response = await fetch(`${MINT_HOST}/collections`, {
        headers: new Headers({ 'Access-Control-Allow-Origin': '*' }),
        mode: 'cors',
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.json();
}

export default function Minting() {
    const { account, isConnected } = useContext(state);
    const [collections, setCollections] = useState<bigint[]>([]);
    const [nfts, setNFTS] = useState<Record<string, string[]>>({});

    useEffect(() => {
        void fetchCollections().then((r: Record<string, string[]>) => {
            setNFTS(r);
            setCollections(Object.keys(r).map((x) => BigInt(x)));
        });
    }, []);

    if (!account) {
        return null;
    }

    return (
        <>
            <button
                className="init-collection"
                type="button"
                disabled={!isConnected}
                onClick={() =>
                    createCollection(account).then((newIndex) => setCollections((colls) => [...colls, newIndex]))
                }
            >
                Init Collection
            </button>
            {collections.map((index) => (
                <Collection
                    key={index.toString()}
                    index={index}
                    account={account}
                    nfts={nfts[index.toString()]}
                    addNft={(nft) => {
                        const nftsCollection = { ...nfts };
                        const myNFTS = nfts[index.toString()] || [];
                        nftsCollection[index.toString()] = [...myNFTS, nft];
                        setNFTS(nftsCollection);
                    }}
                />
            ))}
        </>
    );
}
