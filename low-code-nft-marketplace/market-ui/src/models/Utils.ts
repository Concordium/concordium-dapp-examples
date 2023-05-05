export async function fetchJson<T>(metadataUrl: string): Promise<T> {
	const jsonStr = await fetchJsonString(metadataUrl);
	return JSON.parse(jsonStr);
}

export async function fetchJsonString(metadataUrl: string): Promise<string> {
	let res = await fetch(metadataUrl);

	if (!res.ok) {
		return Promise.reject(new Error("Could not load Metadata"));
	}

	return res.text();
}
