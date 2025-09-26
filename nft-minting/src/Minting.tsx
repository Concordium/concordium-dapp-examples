/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

type NFTPRops = {
    index: bigint;
    id: string;
};

export const getTokenUrl = async (id: string, index: bigint, subindex = 0n): Promise<string | undefined> => {
    const param = serializeUpdateContractParameters(
        ContractName.fromString('CIS2-NFT'),
        EntrypointName.fromString('tokenMetadata'),
        [id],
        toBuffer(RAW_SCHEMA, 'base64')
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

function NFT({ index, id }: NFTPRops) {
    const [metadata, setMetadata] = useState<any>();

    useEffect(() => {
        getTokenUrl(id, index).then((tokenUrl) => {
            if (tokenUrl !== undefined) {
                fetch(tokenUrl, { headers: new Headers({ 'Access-Control-Allow-Origin': '*' }), mode: 'cors' }).then(
                    (resp) => {
                        if (resp.ok) {
                            resp.json().then(setMetadata);
                        }
                    }
                );
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

type CollectionProps = {
    index: bigint;
    account: string;
    nfts: string[] | undefined;
    addNft: (nft: string) => void;
};

function Collection({ index, account, nfts, addNft }: CollectionProps) {
    const [owning, setOwning] = useState(false);

    useEffect(() => {
        isOwner(account, index).then((r) => setOwning(r));
    }, [account, index]);

    return (
        <div className="collection">
            <h3>{index.toString()}</h3>
            {owning ? (
                <form
                    className="form"
                    onSubmit={async (event: any) => {
                        event.preventDefault();
                        const id = Math.round(Math.random() * 100000)
                            .toString()
                            .padEnd(8, '0');
                        const response = await fetch(`${MINT_HOST}/metadata/${id}`, {
                            method: 'POST',
                            body: new FormData(event.target),
                            headers: new Headers({ 'Access-Control-Allow-Origin': '*' }),
                            mode: 'cors',
                        });
                        console.log(response);
                        const { url } = await response.json();
                        // Get values from form + send to backend.
                        if (url) {
                            mint(account, id, url, index).then(() => {
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
            ) : null}{' '}
            <div className="collection-nfts">
                {(nfts || []).map((nft) => (
                    <NFT id={nft} index={index} />
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
    return response.json();
}

export default function Minting() {
    const { account, isConnected } = useContext(state);
    const [collections, setCollections] = useState<bigint[]>([]);
    const [nfts, setNFTS] = useState<Record<string, string[]>>({});

    useEffect(() => {
        fetchCollections().then((r) => {
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
