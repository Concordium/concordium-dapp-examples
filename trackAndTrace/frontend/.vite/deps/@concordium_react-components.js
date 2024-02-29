import {
    BrowserWalletConnector,
    CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
    MAINNET,
    TESTNET,
    WalletConnectConnection,
    WalletConnectConnector,
    binaryMessageFromHex,
    moduleSchema,
    moduleSchemaFromBase64,
    stringMessage,
    typeSchema,
    typeSchemaFromBase64,
} from './chunk-7F5NCG6F.js';
import { require_react } from './chunk-JZSXOKIY.js';
import {
    ConcordiumGRPCClient,
    ContractAddress_exports,
    ContractName_exports,
    GrpcWebFetchTransport,
    ReceiveName_exports,
} from './chunk-UJRN4I3W.js';
import './chunk-C3Y62267.js';
import './chunk-GNSLCM6O.js';
import { __toESM } from './chunk-ANIWD3T6.js';

// node_modules/@concordium/react-components/dist/useConnect.js
var import_react = __toESM(require_react());

// node_modules/@concordium/react-components/dist/error.js
function errorString(err) {
    return err.message || err;
}

// node_modules/@concordium/react-components/dist/useConnect.js
function useConnect(connector, setConnection) {
    const [isConnecting, setIsConnecting] = (0, import_react.useState)(false);
    const [connectError, setConnectError] = (0, import_react.useState)('');
    const connect = (0, import_react.useCallback)(() => {
        if (!connector) {
            throw new Error('no connector to connect from');
        }
        setIsConnecting(true);
        connector
            .connect()
            .then((c) => {
                if (c) {
                    setConnection(c);
                    setConnectError('');
                }
            })
            .catch((e) => setConnectError(errorString(e)))
            .finally(() => setIsConnecting(false));
    }, [connector, setConnection]);
    return { connect, isConnecting, connectError };
}

// node_modules/@concordium/react-components/dist/useConnection.js
var import_react2 = __toESM(require_react());
function useConnection(connectedAccounts, genesisHashes) {
    const [connection, setConnection] = (0, import_react2.useState)();
    (0, import_react2.useEffect)(() => {
        if (connection && !connectedAccounts.has(connection)) {
            setConnection(void 0);
        }
    }, [connectedAccounts]);
    return {
        connection,
        setConnection,
        genesisHash: connection && genesisHashes.get(connection),
        account: connection && connectedAccounts.get(connection),
    };
}

// node_modules/@concordium/react-components/dist/useContractSelector.js
var import_react3 = __toESM(require_react());
var __awaiter = function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P
            ? value
            : new P(function (resolve) {
                  resolve(value);
              });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator['throw'](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function refresh(rpc, index) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield rpc.getInstanceInfo(ContractAddress_exports.create(index, BigInt(0)));
        if (!info) {
            throw new Error(`contract ${index} not found`);
        }
        const { version, name, owner, amount, methods, sourceModule } = info;
        return {
            version,
            index,
            name: ContractName_exports.fromInitName(name).value,
            amount,
            owner,
            methods: methods.map(ReceiveName_exports.toString),
            moduleRef: sourceModule.moduleRef,
        };
    });
}
function parseContractIndex(input) {
    try {
        return BigInt(input);
    } catch (e) {
        throw new Error(`invalid contract index '${input}'`);
    }
}
function loadContract(rpc, input) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = parseContractIndex(input);
        return refresh(rpc, index);
    });
}
function useContractSelector(rpc, input) {
    const [selected, setSelected] = (0, import_react3.useState)();
    const [isLoading, setIsLoading] = (0, import_react3.useState)(false);
    const [error, setError] = (0, import_react3.useState)('');
    (0, import_react3.useEffect)(() => {
        setSelected(void 0);
        setError('');
        if (rpc && input) {
            setIsLoading(true);
            loadContract(rpc, input)
                .then(setSelected)
                .catch((err) => {
                    setError(errorString(err));
                    setSelected(void 0);
                })
                .finally(() => setIsLoading(false));
        }
    }, [rpc, input]);
    return { selected, isLoading, error };
}

// node_modules/@concordium/react-components/dist/useGrpcClient.js
var import_react4 = __toESM(require_react());
function useGrpcClient({ grpcOpts }) {
    const [client, setClient] = (0, import_react4.useState)();
    (0, import_react4.useEffect)(() => {
        if (!grpcOpts) {
            return setClient(void 0);
        }
        setClient(new ConcordiumGRPCClient(new GrpcWebFetchTransport(grpcOpts)));
    }, [grpcOpts]);
    return client;
}

// node_modules/@concordium/react-components/dist/useWalletConnectorSelector.js
var import_react5 = __toESM(require_react());
function useWalletConnectorSelector(connectorType, connection, props) {
    const { activeConnectorType, activeConnector, setActiveConnectorType } = props;
    const isSelected = activeConnectorType === connectorType;
    const select = (0, import_react5.useCallback)(
        () => setActiveConnectorType(isSelected ? void 0 : connectorType),
        [isSelected, connectorType]
    );
    const isConnected = Boolean(isSelected && connection && connection.getConnector() === activeConnector);
    const isDisabled = Boolean(!isSelected && activeConnectorType && connection);
    return { isSelected, isConnected, isDisabled, select };
}

// node_modules/@concordium/react-components/dist/WithWalletConnector.js
var import_react6 = __toESM(require_react());
var __awaiter2 = function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P
            ? value
            : new P(function (resolve) {
                  resolve(value);
              });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator['throw'](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function ephemeralConnectorType(create) {
    return {
        activate: create,
        deactivate: (w, c) => c.disconnect(),
    };
}
function persistentConnectorType(create) {
    const connectorPromises = /* @__PURE__ */ new Map();
    return {
        activate: (component, network) => {
            const delegateConnectorPromises = connectorPromises.get(component) || /* @__PURE__ */ new Map();
            connectorPromises.set(component, delegateConnectorPromises);
            const connectorPromise = delegateConnectorPromises.get(network) || create(component, network);
            delegateConnectorPromises.set(network, connectorPromise);
            return connectorPromise;
        },
        deactivate: () =>
            __awaiter2(this, void 0, void 0, function* () {
                return void 0;
            }),
    };
}
function updateMapEntry(map, key, value) {
    const res = new Map(map);
    if (key !== void 0) {
        if (value !== void 0) {
            res.set(key, value);
        } else {
            res.delete(key);
        }
    }
    return res;
}
var WithWalletConnector = class extends import_react6.Component {
    constructor(props) {
        super(props);
        this.setActiveConnectorType = (type) => {
            console.debug("WithWalletConnector: calling 'setActiveConnectorType'", { type, state: this.state });
            const { network } = this.props;
            const { activeConnectorType, activeConnector } = this.state;
            this.setState({
                activeConnectorType: type,
                activeConnector: void 0,
                activeConnectorError: '',
            });
            if (activeConnectorType && activeConnector) {
                activeConnectorType.deactivate(this, activeConnector).catch((err) =>
                    this.setState((state) => {
                        if (state.activeConnectorType !== type) {
                            return state;
                        }
                        return Object.assign(Object.assign({}, state), { activeConnectorError: errorString(err) });
                    })
                );
            }
            if (type) {
                type.activate(this, network)
                    .then((connector) => {
                        console.log('WithWalletConnector: setting active connector', { connector });
                        this.setState({
                            activeConnectorType: type,
                            activeConnector: connector,
                            activeConnectorError: '',
                        });
                    })
                    .catch((err) =>
                        this.setState((state) => {
                            if (state.activeConnectorType !== type) {
                                return state;
                            }
                            return Object.assign(Object.assign({}, state), { activeConnectorError: errorString(err) });
                        })
                    );
            }
        };
        this.onAccountChanged = (connection, address) => {
            console.debug("WithWalletConnector: calling 'onAccountChanged'", {
                connection,
                address,
                state: this.state,
            });
            this.setState((state) =>
                Object.assign(Object.assign({}, state), {
                    connectedAccounts: updateMapEntry(state.connectedAccounts, connection, address || ''),
                })
            );
        };
        this.onChainChanged = (connection, genesisHash) => {
            console.debug("WithWalletConnector: calling 'onChainChanged'", {
                connection,
                genesisHash,
                state: this.state,
            });
            this.setState((state) =>
                Object.assign(Object.assign({}, state), {
                    genesisHashes: updateMapEntry(state.genesisHashes, connection, genesisHash),
                })
            );
        };
        this.onConnected = (connection, address) => {
            console.debug("WithWalletConnector: calling 'onConnected'", { connection, state: this.state });
            this.onAccountChanged(connection, address);
        };
        this.onDisconnected = (connection) => {
            console.debug("WithWalletConnector: calling 'onDisconnected'", { connection, state: this.state });
            this.setState((state) =>
                Object.assign(Object.assign({}, state), {
                    connectedAccounts: updateMapEntry(state.connectedAccounts, connection, void 0),
                })
            );
        };
        this.state = {
            activeConnectorType: void 0,
            activeConnector: void 0,
            activeConnectorError: '',
            genesisHashes: /* @__PURE__ */ new Map(),
            connectedAccounts: /* @__PURE__ */ new Map(),
        };
    }
    render() {
        const { children, network } = this.props;
        return children(
            Object.assign(Object.assign({}, this.state), {
                network,
                setActiveConnectorType: this.setActiveConnectorType,
            })
        );
    }
    componentDidUpdate(prevProps) {
        if (prevProps.network !== this.props.network) {
            this.setActiveConnectorType(void 0);
        }
    }
    componentWillUnmount() {}
};
export {
    BrowserWalletConnector,
    CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
    MAINNET,
    TESTNET,
    WalletConnectConnection,
    WalletConnectConnector,
    WithWalletConnector,
    binaryMessageFromHex,
    ephemeralConnectorType,
    moduleSchema,
    moduleSchemaFromBase64,
    persistentConnectorType,
    stringMessage,
    typeSchema,
    typeSchemaFromBase64,
    useConnect,
    useConnection,
    useContractSelector,
    useGrpcClient,
    useWalletConnectorSelector,
};
//# sourceMappingURL=@concordium_react-components.js.map
