import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';
import './app/styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { WalletConnectorWrapper } from 'app/providers/concordium-provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<WalletConnectorWrapper>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</WalletConnectorWrapper>,
);
