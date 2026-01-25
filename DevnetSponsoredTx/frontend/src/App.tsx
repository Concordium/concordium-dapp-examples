import { WithWalletConnector, TESTNET } from '@concordium/react-components'
import SponsoredTransferDemo from './components/SponsoredTransferDemo'

export default function App() {
  return (
    <WithWalletConnector network={TESTNET}>
      {(props) => <SponsoredTransferDemo {...props} />}
    </WithWalletConnector>
  )
}
