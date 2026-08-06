import { FC, useEffect } from 'react';
import { BROWSER_WALLET } from 'shared/config';
import { useConcordiumApi } from 'shared/hooks/use-concordium-api.ts';
import { StyledLink } from 'shared/components/styled-link';
import { ConnectButton } from 'features/connect-button';
import { RoutePath } from 'shared/config/route.ts';

export const AirdropHeader: FC = () => {
	const { setActiveConnectorType } = useConcordiumApi();

	useEffect(() => setActiveConnectorType(BROWSER_WALLET), []);
	return (
		<header className='flex gap-4 items-start justify-between px-24 py-12 flex-col lg:flex-row'>
			<div className='flex gap-4 items-start flex-col lg:flex-row'>
				<StyledLink
					to={RoutePath.create}
					description='create new your own airdrop'
				>
					Create
				</StyledLink>

				<StyledLink
					to={RoutePath.find}
					description='find airdrops'
				>
					Find
				</StyledLink>

				<StyledLink
					to={RoutePath.transactions}
					description='view your transactions'
				>
					Transactions
				</StyledLink>

				<StyledLink
					to={RoutePath.settings}
					description='configuration'
				>
					Settings
				</StyledLink>
			</div>

			<ConnectButton />
		</header>
	);
};
