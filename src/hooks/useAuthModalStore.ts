import { create } from 'zustand';
interface BaseModalStore<T> {
  isOpen: boolean;
  type: T | null;
  openModal: (type: T) => void;
  closeModal: () => void;
  setType: (type: T) => void; // Optional for stores that need type switching
}

type AuthModalType = 'login' | 'register';

export const useAuthModalStore = create<BaseModalStore<AuthModalType>>((set) => ({
  isOpen: false,
  type: 'login', // Default type
  openModal: (type = 'login') => set({ isOpen: true, type }), // Optional type with default
  closeModal: () => set({ isOpen: false }),
  setType: (type) => set({ type }), // Additional method for auth-specific needs
}));