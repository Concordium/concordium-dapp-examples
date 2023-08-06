import { SettingsTransactions } from 'widgets/settings-transactions';
import { AppVersion } from 'shared/components/app-version/ui/app-version';

export default function Settings() {
	return (
		<main className='flex min-h-max w-screen flex-col items-center justify-between p-24'>
			<AppVersion />
			<SettingsTransactions />
		</main>
	);
}
