import { ephemeralConnectorType, BrowserWalletConnector } from '@concordium/react-components'

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

export const BACKEND_URL = window.runtimeConfig?.BACKEND_URL || 'http://localhost:3002'
export const TOKEN_ID = window.runtimeConfig?.TOKEN_ID || 'EURtest'
export const TOKEN_DECIMALS = parseInt(window.runtimeConfig?.TOKEN_DECIMALS || '6')
export const CCDSCAN_URL = window.runtimeConfig?.CCDSCAN_URL || ''