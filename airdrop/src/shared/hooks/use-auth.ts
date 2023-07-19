import { useConcordiumApi } from 'shared/hooks/use-concordium-api.ts';

export function useAuth() {
	const { account } = useConcordiumApi();

	return {
		isAuth: !!account,
	};
}
