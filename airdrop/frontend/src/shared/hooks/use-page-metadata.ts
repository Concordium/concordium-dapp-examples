import { useConcordiumApi } from 'shared/hooks/use-concordium-api.ts';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Metadata } from 'widgets/form-init/model/metadata.ts';
import { contractView } from 'shared/lib/contract-view.ts';
import axios from 'axios';

export function usePageMetadata() {
	const { connection } = useConcordiumApi();
	const { index } = useParams();
	const [metadata, setMetadata] = useState<Metadata>();

	useEffect(() => {
		(async () => {
			if (connection && index) {
				const state = await contractView(connection, +index);
				const metadata = (await axios.get(state.metadataUrl)).data;
				setMetadata(metadata);
			}
		})();
	}, [connection]);

	return metadata;
}
