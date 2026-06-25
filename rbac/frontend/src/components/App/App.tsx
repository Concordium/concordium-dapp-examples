import { useEffect, useState } from 'react';
import { detectConcordiumProvider, WalletApi } from '@concordium/browser-wallet-api-helpers';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import {
    AccountAddress,
    AccountTransactionType,
    Cbor,
    CborAccountAddress,
    ConcordiumGRPCClient,
    TokenAdminRole,
    TokenAuthorizationsDetails,
    TokenId,
    TokenOperationType,
} from '@concordium/web-sdk';
import { useForm, useWatch } from 'react-hook-form';
import { BLOCK_LIST } from '../../constants/block-list.ts';

const camelCaseToCapitalizeWords = (word: string) =>
    word
        .split(/(?=[A-Z])/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

function TokenAuthorizationsForm({ getTokenInfo }: { getTokenInfo: (tokenId?: string) => void }) {
    interface FormType {
        tokenId?: string;
    }
    const { control, register, handleSubmit, setValue } = useForm<FormType>({ mode: 'all' });

    const [tokenId] = useWatch({
        control: control,
        name: ['tokenId'],
    });

    return (
        <Form className="d-flex me-xl-auto" onSubmit={handleSubmit(() => getTokenInfo(tokenId))}>
            <Button variant="primary" type="submit" disabled={!tokenId}>
                Get token Authorizations
            </Button>
            <Form.Group className="ps-lg-2" controlId="formTokenId">
                <Form.Control
                    {...register('tokenId')}
                    type="text"
                    placeholder="Token Id"
                    onChange={(e) => {
                        setValue('tokenId', e.target.value);
                    }}
                />
            </Form.Group>
        </Form>
    );
}

const setInArr = (value: string, arr: string[]) => [...arr, value];
const removeFromArr = (value: string, arr: string[]) => arr.filter((item) => item !== value);

function ManageAdminRolesForm({
    updateAccountRoles,
}: {
    updateAccountRoles: (tokenId: string, account: string, assignRoles: string[], revokeRoles: string[]) => void;
}) {
    const [assignRoles, setAssignRoles] = useState<string[]>([]);
    const [revokeRoles, setRevokeRoles] = useState<string[]>([]);

    interface FormType {
        tokenId: string;
        account: string;
    }
    const { control, register, handleSubmit, setValue } = useForm<FormType>({ mode: 'all' });

    const [tokenId, account] = useWatch({
        control: control,
        name: ['tokenId', 'account'],
    });

    return (
        <Form
            className="card-img-top"
            onSubmit={handleSubmit(() => updateAccountRoles(tokenId, account, assignRoles, revokeRoles))}
        >
            <Form.Control
                {...register('tokenId')}
                id="tokenId"
                type="text"
                className="mb-2 w-50"
                placeholder="Token Id"
                onChange={(e) => {
                    setValue('tokenId', e.target.value);
                }}
            />
            <Form.Control
                {...register('account')}
                id="account"
                type="text"
                className="mb-2"
                placeholder="Account"
                onChange={(e) => {
                    setValue('account', e.target.value);
                }}
            />
            <div className="d-flex gap-3">
                <div key={`inline-checkbox-1`} className="mb-3">
                    <span className="text-primary mb-0">Assign Roles</span>
                    {Object.entries(TokenAdminRole).map(([key, value]) => (
                        <Form.Check
                            key={key}
                            label={key}
                            name="group1"
                            type="checkbox"
                            id={`inline-checkbox-${key}`}
                            value={value}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setAssignRoles(setInArr(e.target.value, assignRoles));
                                } else {
                                    setAssignRoles(removeFromArr(e.target.value, assignRoles));
                                }
                            }}
                        />
                    ))}
                </div>
                <div key={`inline-checkbox-2`} className="mb-3">
                    <span className="text-primary mb-0">Revoke Roles</span>
                    {Object.entries(TokenAdminRole).map(([key, value]) => (
                        <Form.Check
                            key={key + '2'}
                            label={key}
                            name="group1"
                            type="checkbox"
                            id={`inline-checkbox-${key}`}
                            value={value}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setRevokeRoles(setInArr(e.target.value, revokeRoles));
                                } else {
                                    setRevokeRoles(removeFromArr(e.target.value, revokeRoles));
                                }
                            }}
                        />
                    ))}
                </div>
            </div>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

function Loader() {
    return (
        <Container className="py-5">
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <p className="text-secondary small mb-0">Loading Wallet provider...</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

function BlockListedMessage({ name }: { name: string }) {
    return (
        <Container className="py-5">
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="flex-column">
                            <p className="text-secondary small mb-0">
                                You connected to <b>{name}</b>
                            </p>
                            <p className="text-secondary small mb-0">This network is currently not allowed</p>
                            <p className="text-secondary small mb-0">
                                Please change network in Wallet settings and refresh page
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

function App() {
    const [provider, setProvider] = useState<WalletApi>();
    const [blockListedChain, setBlockListedChain] = useState<{ genesisHash: string; name: string } | undefined>();
    const [connectedAccount, setConnectedAccount] = useState<string | null | undefined>(null);
    const [status, setStatus] = useState({ type: 'idle', message: '' });
    const [tokenAuthorizationsDetails, setTokenAuthorizationsDetails] = useState<TokenAuthorizationsDetails>({});

    useEffect(() => {
        detectConcordiumProvider(5000)
            .then(setProvider)
            .catch(() => setStatus({ type: 'error', message: 'Concordium Wallet not found' }));
    }, []);

    useEffect(() => {
        if (!provider) return;
        const detectChain = async () => {
            const chain = await provider.getSelectedChain();
            setBlockListedChain(BLOCK_LIST.find(({ genesisHash }) => genesisHash === chain));
        };
        void detectChain();
    }, [provider]);

    const connect = async () => {
        try {
            setStatus({ type: 'loading', message: 'Connecting wallet...' });
            const acc = await provider?.connect();
            setConnectedAccount(acc);
            setStatus({ type: 'idle', message: '' });
        } catch {
            setStatus({ type: 'error', message: 'Connection rejected' });
        }
    };

    const getTokenInfo = (tokenId?: string) => {
        if (tokenId && provider) {
            const grpcClient = new ConcordiumGRPCClient(provider.grpcTransport);
            grpcClient
                .getTokenAuthorizations(TokenId.fromString(tokenId))
                .then((authorizations) => {
                    setTokenAuthorizationsDetails(Cbor.decode(authorizations.details) as TokenAuthorizationsDetails);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const updateAccountRoles = (tokenId: string, account: string, assignRoles: string[], revokeRoles: string[]) => {
        if (provider && connectedAccount) {
            const ops = [
                assignRoles.length && {
                    [TokenOperationType.AssignAdminRoles]: {
                        roles: assignRoles,
                        account: CborAccountAddress.fromAccountAddress(AccountAddress.fromBase58(account)),
                    },
                },
                revokeRoles.length && {
                    [TokenOperationType.RevokeAdminRoles]: {
                        roles: revokeRoles,
                        account: CborAccountAddress.fromAccountAddress(AccountAddress.fromBase58(account)),
                    },
                },
            ].filter(Boolean);

            const payload = {
                tokenId: TokenId.fromString(tokenId),
                operations: Cbor.encode(ops),
            };

            return provider
                .sendTransaction(connectedAccount, AccountTransactionType.TokenUpdate, payload)
                .then((sig) => alert(JSON.stringify(sig)))
                .catch(alert);
        }
    };

    if (!provider) {
        return <Loader />;
    }

    if (blockListedChain) {
        return <BlockListedMessage name={blockListedChain.name} />;
    }

    return (
        <Container className="py-5">
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Button variant="primary" onClick={connect} disabled={status.type === 'loading'}>
                                {status.type === 'loading' ? 'Connecting...' : 'Connect Wallet'}
                            </Button>
                            <p className="text-secondary small mb-0">Connected account:</p>
                            <code className="d-block text-break mb-0">{connectedAccount ?? ' - '}</code>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="flex-column align-items-start">
                            <ManageAdminRolesForm updateAccountRoles={updateAccountRoles} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body className="flex-column">
                            <TokenAuthorizationsForm getTokenInfo={getTokenInfo} />
                            <div>
                                {Object.entries(tokenAuthorizationsDetails).map(([key, value]) => (
                                    <div key={key}>
                                        <p className="text-secondary small mb-0">
                                            {camelCaseToCapitalizeWords(key.toString())}
                                        </p>
                                        {value.accounts.map((acc) => (
                                            <code
                                                key={key.toString() + acc.toString()}
                                                className="d-block text-break mb-0 ps-lg-2"
                                            >
                                                {acc.toString()}
                                            </code>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
