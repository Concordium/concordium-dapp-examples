import { SettingsTransactions } from 'widgets/settings-transactions';
// import { SettingsContract } from 'widgets/settings-contract';

export default function Settings() {
	return (
		<main className='flex min-h-max w-screen flex-col items-center justify-between p-24'>
			<SettingsTransactions />
			{/*<SettingsContract />*/}
		</main>
	);
}
