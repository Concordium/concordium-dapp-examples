import { useParams } from 'react-router';

import { ContractAddress } from '@concordium/web-sdk';

export function useParamsContractAddress(): ContractAddress | undefined {
  const { index, subindex } = useParams();
  if (!index || !subindex) {
    return undefined;
  }

  return {
    index: BigInt(index),
    subindex: BigInt(subindex),
  };
}
