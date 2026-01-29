import { WithWalletConnector, STAGENET } from '@concordium/react-components'
import SponsoredTransferDemo from './components/SponsoredTransferDemo'

export default function App() {
  return (
    <WithWalletConnector network={STAGENET}>
      {(props) => <SponsoredTransferDemo {...props} />}
    </WithWalletConnector>
  )
}
