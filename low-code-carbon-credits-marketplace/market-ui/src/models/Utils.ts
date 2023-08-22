export async function fetchJson<T>(metadataUrl: string): Promise<T> {
  const jsonStr = await fetchJsonString(metadataUrl);

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    return Promise.reject(new Error("Could not parse Metadata"));
  }
}

export async function fetchJsonString(metadataUrl: string): Promise<string> {
  const res = await fetch(metadataUrl);

  if (!res.ok) {
    return Promise.reject(new Error("Could not load Metadata"));
  }

  return res.text();
}

export const tokenIdToTokenImageFileName = (originalFileName: string, tokenId: string) => {
  const ext = originalFileName.substring(originalFileName.lastIndexOf("."));

  return `token_${tokenId}.${ext}`;
};

export const tokenIdToArtifactFileName = (originalFileName: string, tokenId: string) => {
  const ext = originalFileName.substring(originalFileName.lastIndexOf("."));

  return `token_artifact_${tokenId}.${ext}`;
};

export const tokenIdToTokenMetadataFileName = (tokenId: string) => {
  return `token_${tokenId}_metadata.json`;
};
