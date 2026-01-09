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

export const BACKEND_URL ='http://localhost:3002'
export const TOKEN_ID = 'EURtest'
export const TOKEN_DECIMALS = parseInt('6')
export const CCDSCAN_URL = 'https://devnet-p10-1.ccdscan.io/'
