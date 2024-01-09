import { INDEXER_API_URL } from '../../Constants';
import { ModuleEvent } from './Events';

export const getContractEventsByTransactionHash = async (txnHash: string): Promise<ModuleEvent[]> => {
  const res = await fetchRetry(`${INDEXER_API_URL}/project-nft/contract-events/${txnHash}`, {
    method: "GET",
  });

  if (res.status === 404) {
    throw new Error(`NOT FOUND`);
  }

  if (res.status !== 200) {
    throw new Error(`Failed to get contract events for transaction ${txnHash}`);
  }

  const json = await res.json();
  return json as ModuleEvent[];
};

export const getContractEventsByContractAddress = async (
  index: string,
  subindex: string,
  account?: string,
  eventType?: string,
  page?: number,
): Promise<{pageCount: number, events: ModuleEvent[]}> => {
  const res = await fetch(`${INDEXER_API_URL}/contract-events`, {
    method: "POST",
    body: JSON.stringify({ index, subindex, account, eventType, page }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) {
    throw new Error(`Failed to get contract events for index ${index} subindex ${subindex}`);
  }

  const json = await res.json();
  return json as {pageCount: number, events: ModuleEvent[]};
};

export const getAccount = async (credential: string) => {
  const res = await fetch(`${INDEXER_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ credential }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user = await res.json();
  return user as { account: string; email: string };
};

const MAX_NB_RETRY = 50;
const RETRY_DELAY_MS = 1000;

async function fetchRetry(input: RequestInfo | URL, init?: RequestInit | undefined) {
  let retryLeft = MAX_NB_RETRY;

  while (retryLeft-- > 0) {
    const res = await fetch(input, init);
    if (res.status === 404) {
      await sleep(RETRY_DELAY_MS);
      continue;
    }

    return res;
  }

  throw new Error(`Too many retries`);
}

function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
