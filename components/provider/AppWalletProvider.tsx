"use client";
 
import React, { useMemo, useState, useEffect } from "react";
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger';
import type { Adapter, WalletError } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletDisconnectedError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
import toast from "react-hot-toast";


export default function AppWalletProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {

    function onError(e: WalletError) {
      if (e instanceof WalletNotFoundError) {
          toast.error(e.message);
      } else if (e instanceof WalletDisconnectedError) {
          toast.error(e.message);
      } else toast.error(e.message);

    }
    const [adapters, setAdapters] = useState<Adapter[]>([]);
    useEffect(() => {
        import('@tronweb3/tronwallet-adapters').then((res) => {
            const {
                BitKeepAdapter,
                OkxWalletAdapter,
                TokenPocketAdapter,
                TronLinkAdapter,
                WalletConnectAdapter
            } = res;
                const tronLinkAdapter = new TronLinkAdapter();
            const ledger = new LedgerAdapter({
                accountNumber: 2,
            });
            const walletConnectAdapter = new WalletConnectAdapter({
                network: 'Nile',
                options: {
                    relayUrl: 'wss://relay.walletconnect.com',
                    // example WC app project ID
                    projectId: 'cea33aaa4be55d92e6c9f3752d377bd6',
                    metadata: {
                        name: 'TouchSwap',
                        description: 'Touch Swap Auth',
                        url: 'https://web3modal.com', // origin must match your domain & subdomain
                        icons: ['https://avatars.githubusercontent.com/u/37784886']
                    },
                },
                web3ModalConfig: {
                    themeMode: 'dark',
                    themeVariables: {
                        '--w3m-z-index': '1000',
                    },
                },
            });
            const bitKeepAdapter = new BitKeepAdapter();
            const tokenPocketAdapter = new TokenPocketAdapter();
            const okxwalletAdapter = new OkxWalletAdapter();
            setAdapters([tronLinkAdapter, bitKeepAdapter, tokenPocketAdapter, okxwalletAdapter, walletConnectAdapter, ledger])
        });
    }, [setAdapters])
   
    return (
      <WalletProvider onError={onError} adapters={adapters} disableAutoConnectOnLoad={true}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
     </WalletProvider>
    );
  }