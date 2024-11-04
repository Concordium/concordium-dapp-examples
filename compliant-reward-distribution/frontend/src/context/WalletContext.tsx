// src/context/WalletContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { WalletProvider } from '../wallet-connection';

interface WalletContextType {
    provider: WalletProvider | null; // Use the WalletProvider type here instead of any
    connectedAccount: string | null;
    setProvider: (provider: WalletProvider) => void;
    setConnectedAccount: (account: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProviderWrapper = ({ children }: { children: ReactNode }) => {
    const [provider, setProvider] = useState<WalletProvider | null>(null);
    const [connectedAccount, setConnectedAccount] = useState<string | null>(null);

    return (
        <WalletContext.Provider value={{ provider, connectedAccount, setProvider, setConnectedAccount }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProviderWrapper');
    }
    return context;
};
