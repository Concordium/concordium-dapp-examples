import { SignClientTypes } from '@walletconnect/types'
import { BrowserWalletConnector, WalletConnectConnector } from '@concordium/wallet-connectors'
import { ephemeralConnectorType, CONCORDIUM_WALLET_CONNECT_PROJECT_ID } from '@concordium/react-components'

const WALLET_CONNECT_OPTS: SignClientTypes.Options = {
  projectId: CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
  metadata: {
    name: 'Sponsored Transactions Demo',
    description: 'Concordium sponsored transactions demo dApp',
    url: '#',
    icons: [],
  },
}

declare global {
  interface Window {
    runtimeConfig?: {
      BACKEND_URL?: string
      TOKEN_ID?: string
      TOKEN_DECIMALS?: string
      CCDSCAN_URL?: string
    }
  }
}

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create)

export const WALLET_CONNECT = ephemeralConnectorType(
  WalletConnectConnector.create.bind(undefined, WALLET_CONNECT_OPTS)
)

export const BACKEND_URL = window.runtimeConfig?.BACKEND_URL || 'http://localhost:3002'
export const TOKEN_ID = window.runtimeConfig?.TOKEN_ID || 'EURtest'
export const TOKEN_DECIMALS = parseInt(window.runtimeConfig?.TOKEN_DECIMALS || '6')
export const CCDSCAN_URL = window.runtimeConfig?.CCDSCAN_URL || ''