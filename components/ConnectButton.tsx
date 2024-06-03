import { ComponentProps, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import {useGuardedCallback} from '@/utils';


export default function ConnectButton() {
    const { connect, connected, wallet } = useWallet();
    const { setVisible: showWalletSelectionModal } = useWalletModal();
    const handleConnectClick = useGuardedCallback(connect, [connect]);
    if (wallet != null) {
        return <button disabled={connected} onClick={handleConnectClick} />;
    } else {
        return (
            <button  onClick={() => showWalletSelectionModal(true)}>
                Select Wallet
            </button>
        );
    }
}