export async function fetchJson<T>(metadataUrl: string): Promise<T> {
  const jsonStr = await fetchJsonString(metadataUrl);
  return JSON.parse(jsonStr);
}

export async function fetchJsonString(metadataUrl: string): Promise<string> {
  try { 
    const res = await fetch(metadataUrl);
    if (!res.ok) {
      return Promise.reject(new Error("Could not load Metadata"));
    }
    return res.text();
  } catch (err) {
    return Promise.reject(new Error("Could not load Metadata"));
  }
}

export const tokenIdToNftImageFileName = (originalFileName: string, tokenId: string) => {
  const ext = originalFileName.substring(originalFileName.lastIndexOf("."));

  return `nft_${tokenId}.${ext}`;
};

export const tokenIdToNftMetadataFileName = (tokenId: string) => {
  return `nft_${tokenId}_metadata.json`;
};
