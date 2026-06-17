import { Router } from './providers/router/ui/router.tsx';
import { AirdropHeader } from 'widgets/header';

function App() {
	return (
		<div className='app'>
			<AirdropHeader />
			<Router />
		</div>
	);
}

export default App;
