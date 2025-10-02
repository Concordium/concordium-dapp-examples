/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback } from 'react';
import {
    ConnectorType,
    useWalletConnectorSelector,
    WalletConnection,
    WalletConnectionProps,
} from '@concordium/react-components';

function connectorTypeStyle(baseStyle: object, isSelected: boolean, isConnected: boolean) {
    const style = { ...baseStyle, width: '50%' } as { width: string; border?: string; backgroundColor?: string };
    if (isConnected) {
        style.backgroundColor = '#823030';
        style.border = '1px solid #520C0C';
    } else if (isSelected) {
        style.backgroundColor = '#174039';
        style.border = '1px solid #0c221f';
    }
    return style;
}

interface Props extends WalletConnectionProps {
    buttonStyle: object;
    disabledButtonStyle: object;
    connectorType: ConnectorType;
    connectorName: string;
    setWaitingForUser: (v: boolean) => void;
    connection: WalletConnection | undefined;
}

export function WalletConnectionTypeButton(props: Props) {
    const { buttonStyle, disabledButtonStyle, connectorType, connectorName, setWaitingForUser, connection } = props;
    const { isSelected, isConnected, isDisabled, select } = useWalletConnectorSelector(
        connectorType,
        connection,
        props,
    );
    const onClick = useCallback(() => {
        setWaitingForUser(false);
        select();
    }, [select]);
    return (
        <button
            style={connectorTypeStyle(isDisabled ? disabledButtonStyle : buttonStyle, isSelected, isConnected)}
            disabled={isDisabled}
            type="button"
            onClick={onClick}
        >
            {isConnected ? `Disconnect ${connectorName}` : `Use ${connectorName}`}
        </button>
    );
}
