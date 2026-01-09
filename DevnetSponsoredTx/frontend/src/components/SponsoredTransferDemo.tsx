import { useEffect, useState } from 'react'
import { useConnection, useConnect, WalletConnectionProps } from '@concordium/react-components'
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers'
import { BROWSER_WALLET, BACKEND_URL, TOKEN_ID, TOKEN_DECIMALS, CCDSCAN_URL } from '../constants'
import { Transaction } from '@concordium/web-sdk'

export default function SponsoredTransferDemo(props: WalletConnectionProps) {
  const { connection, setConnection, account } = useConnection(props.connectedAccounts, props.genesisHashes)
  const { connect, isConnecting } = useConnect(props.activeConnector, setConnection)

  const [recipientAddress, setRecipientAddress] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [isTransferring, setIsTransferring] = useState(false)
  const [message, setMessage] = useState('')
  const [transactionHash, setTransactionHash] = useState('')
  const [intentedConnectorType, setIntentedConnectorType] = useState<typeof BROWSER_WALLET | null>(null)

  useEffect(() => {
    if (
      props.activeConnector &&
      !connection &&
      !isConnecting &&
      connect &&
      intentedConnectorType &&
      props.activeConnectorType === intentedConnectorType
    ) {
      connect()
      setIntentedConnectorType(null)
    }
  }, [props.activeConnector, props.activeConnectorType, connection, isConnecting, connect, intentedConnectorType])

  const handleConnect = () => {
    setIntentedConnectorType(BROWSER_WALLET)
    props.setActiveConnectorType(BROWSER_WALLET)
  }

  const handleDisconnect = async () => {
    if (connection) {
      await connection.disconnect()
      setConnection(undefined)
      setIntentedConnectorType(null)
      setMessage('')
      setTransactionHash('')
    }
  }

  const handleSponsoredTransfer = async () => {
    if (!connection || !account) {
      setMessage('Please connect wallet first')
      return
    }

    if (!recipientAddress || !transferAmount) {
      setMessage('Please enter recipient address and amount')
      return
    }

    setIsTransferring(true)
    setMessage('Creating sponsored transaction...')
    setTransactionHash('')

    try {
      const response = await fetch(`${BACKEND_URL}/sponsor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: account,
          recipient: recipientAddress,
          amount: transferAmount,
          tokenId: TOKEN_ID,
          decimals: TOKEN_DECIMALS,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create sponsored transaction')
      }

      const { sponsoredTransaction } = await response.json()

      setMessage('Waiting for your signature...')

      const provider = await detectConcordiumProvider() as any
      const parsedTransaction = Transaction.signableFromJSON(sponsoredTransaction)
      const txHash = await provider.sendSponsoredTransaction(account, parsedTransaction)

      setTransactionHash(txHash)
      setMessage('Transaction sent! The sponsor paid the gas fee.')
      setRecipientAddress('')
      setTransferAmount('')
    } catch (error: any) {
      console.error('Transfer error:', error)
      setMessage(`Transfer failed: ${error.message || 'Unknown error'}`)
    } finally {
      setIsTransferring(false)
    }
  }

  return (
    <main className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark shadow-sm mb-5">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="/concordium_favicon.svg" alt="Concordium" height="30" className="me-3" />
            <span className="fw-light">Sponsored Transactions Demo</span>
          </a>
        </div>
      </nav>

      <div className="container py-4">
        <div className="row g-4">
          {/* Wallet Connection */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h5 className="card-title fw-light mb-4">
                  <i className="bi bi-wallet2 me-2"></i>Wallet Connection
                </h5>
                <p className="text-muted small mb-4">Connect your Concordium wallet to get started</p>

                {!account ? (
                  <div className="d-grid">
                    <button
                      className="btn btn-outline-dark py-3"
                      onClick={handleConnect}
                      disabled={isConnecting}
                    >
                      {isConnecting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Connecting...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-laptop me-2"></i>Browser Wallet
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="alert alert-success border-0">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        <div>
                          <strong>Connected</strong>
                          <div className="mt-1">
                            <code className="text-success" style={{ fontSize: '0.85rem' }}>{account}</code>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-outline-danger btn-sm" onClick={handleDisconnect}>
                        <i className="bi bi-power me-2"></i>Disconnect Wallet
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transfer Form */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h5 className="card-title fw-light mb-4">
                  <i className="bi bi-send me-2"></i>Sponsored Token Transfer
                </h5>

                <div className="alert alert-info border-0 mb-4">
                  <div className="small">
                    <strong>How it works:</strong>
                    <ol className="mb-0 mt-2 ps-3">
                      <li>Connect your Browser Wallet</li>
                      <li>Enter recipient address and amount</li>
                      <li>Click "Send Sponsored Transfer"</li>
                      <li>Sign the transaction (you don't pay gas!)</li>
                      <li>Sponsor wallet pays the fees</li>
                    </ol>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Recipient Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Concordium address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    disabled={isTransferring || !account}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter amount"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    disabled={isTransferring || !account}
                    step="0.000001"
                    min="0"
                  />
                  <div className="form-text">Token: {TOKEN_ID}</div>
                </div>

                <div className="d-grid">
                  <button
                    className={`btn py-3 ${!account ? 'btn-secondary' : 'btn-dark'}`}
                    onClick={handleSponsoredTransfer}
                    disabled={isTransferring || !recipientAddress || !transferAmount || !account}
                  >
                    {isTransferring ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      'Send Sponsored Transfer'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {(message || transactionHash) && (
          <div className="row mt-4">
            <div className="col-12">
              {message && (
                <div className={`alert border-0 shadow-sm ${
                  message.includes('failed') || message.includes('Failed') ? 'alert-danger' : 'alert-info'
                }`}>
                  <i className={`bi me-2 ${
                    message.includes('failed') || message.includes('Failed') ? 'bi-exclamation-triangle' : 'bi-info-circle'
                  }`}></i>
                  {message}
                </div>
              )}

              {transactionHash && (
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title fw-light mb-3">
                      <i className="bi bi-receipt me-2"></i>Transaction Details
                    </h6>
                    <p className="small text-muted mb-1">Transaction Hash:</p>
                    <p className="font-monospace small text-break">{transactionHash}</p>
                    <a
                      href={`${CCDSCAN_URL}/?dcount=1&dentity=transaction&dhash=${transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View on CCDScan
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
