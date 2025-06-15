// useMultiModalStore.ts
import { create } from 'zustand';

// Zustand store for managing multiple modals in a React application
type ModalType = 'rent' | 'search' | null; // Add other modal types as needed

interface MultiModalStore {
  isOpen: boolean;
  type: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useMultiModalStore = create<MultiModalStore>((set) => ({
  isOpen: false,
  type: null,
  openModal: (type) => set({ isOpen: true, type }),
  closeModal: () => set({ isOpen: false, type: null }),
}));