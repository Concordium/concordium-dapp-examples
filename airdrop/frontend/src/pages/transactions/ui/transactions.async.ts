import { lazy } from 'react';

export const TransactionsAsync = lazy(async () => import('./transactions'));
