// lib/store/authModalStore.ts
import { create } from 'zustand';
type FormType = 'login' | 'register';

type AuthModalState = {
  isOpen: boolean;
  formType: FormType;
  openModal: (formType?: FormType) => void; // Make it optional
  closeModal: () => void;
  setFormType: (formType: FormType) => void;
};

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  formType: 'login', // default state
  openModal: (formType = 'login') => set({ isOpen: true, formType }), // default to 'login' if not provided
  closeModal: () => set({ isOpen: false }),
  setFormType: (formType) => set({ formType }),
}));
