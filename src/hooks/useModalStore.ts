// useModalStore.ts
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  type: 'rent' | 'search' | null;
  data?: any;
}

interface ModalActions {
  openModal: (type: ModalState['type'], data?: any) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState & ModalActions>((set) => ({
  isOpen: false,
  type: null,
  data: null,
  openModal: (type, data = null) => {
    set({ isOpen: true, type, data });
  },
  closeModal: () => {
    set({ isOpen: false, type: null, data: null });
  },
}));

export default useModalStore;

