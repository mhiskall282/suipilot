import { create } from 'zustand';
import { Intent, Quote, ExecutionReceipt, Trade } from '../types';

interface AppState {
  // Wallet
  walletConnected: boolean;
  walletAddress: string | null;
  setWallet: (address: string | null) => void;
  
  // Privacy
  privacyMode: boolean;
  togglePrivacyMode: () => void;
  
  // Current intent flow
  currentIntent: Intent | null;
  currentQuote: Quote | null;
  currentReceipt: ExecutionReceipt | null;
  
  setIntent: (intent: Intent) => void;
  setQuote: (quote: Quote) => void;
  setReceipt: (receipt: ExecutionReceipt) => void;
  clearFlow: () => void;
  
  // Trading history
  trades: Trade[];
  addTrade: (trade: Trade) => void;
  
  // UI state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  walletConnected: false,
  walletAddress: null,
  setWallet: (address) => set({ 
    walletConnected: !!address, 
    walletAddress: address 
  }),
  
  privacyMode: true,
  togglePrivacyMode: () => set((state) => ({ 
    privacyMode: !state.privacyMode 
  })),
  
  currentIntent: null,
  currentQuote: null,
  currentReceipt: null,
  
  setIntent: (intent) => set({ currentIntent: intent }),
  setQuote: (quote) => set({ currentQuote: quote }),
  setReceipt: (receipt) => set({ currentReceipt: receipt }),
  clearFlow: () => set({ 
    currentIntent: null, 
    currentQuote: null, 
    currentReceipt: null 
  }),
  
  trades: [],
  addTrade: (trade) => set((state) => ({ 
    trades: [trade, ...state.trades] 
  })),
  
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));