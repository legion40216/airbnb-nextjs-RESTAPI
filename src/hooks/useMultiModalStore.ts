// stores/useMultiModalStore.ts
import { create } from 'zustand';
interface BaseModalStore<T> {
  isOpen: boolean;
  type: T | null;
  openModal: (type: T) => void;
  closeModal: () => void;
}

type ModalType = 'rent' | 'search'; // Add other modal types as needed

export const useMultiModalStore = create<BaseModalStore<ModalType>>((set) => ({
  isOpen: false,
  type: null,
  openModal: (type) => set({ isOpen: true, type }),
  closeModal: () => set({ isOpen: false, type: null }),
}));