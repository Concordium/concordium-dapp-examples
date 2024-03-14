import {
    ConnectorType,
    WalletConnection,
    WalletConnectionProps,
    useWalletConnectorSelector,
} from '@concordium/react-components';
import { Button } from '@mui/material';

interface Props extends WalletConnectionProps {
    connection: WalletConnection | undefined;
    connectorType: ConnectorType;
    connectorName: string;
}

export function WalletConnectorButton(props: Props) {
    const { connection, connectorType, connectorName } = props;
    const { isSelected, isConnected, isDisabled, select } = useWalletConnectorSelector(
        connectorType,
        connection,
        props
    );

    const verb = isConnected ? 'Disconnect' : isSelected ? 'Using' : 'Use';
    return (
        <Button
            disabled={isDisabled}
            onClick={select}
            fullWidth={true}
            variant='contained'
        >
            {`${verb} ${connectorName}`}
        </Button>
    );
}
