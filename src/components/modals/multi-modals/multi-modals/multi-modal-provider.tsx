// modal-provider.tsx
"use client"
import React from 'react';
import { useMultiModalStore } from '@/hooks/useMultiModalStore';

import RentModalWrapper from './rent-multi-modal/rent-modal-wrapper';
import SearchModalWrapper from '../search-mutli-modal/search-modal-wrapper';

export default function MultiModalProvider() {
  const { isOpen, type, closeModal } = useMultiModalStore()

  let title = '';
  let description = '';
  
  switch (type) {
    case 'rent':
      title = 'Airbnb your home';
      description = 'Follow the steps to list your property';
      break;
    case 'search':
      title = 'Search properties';
      description = 'Find your perfect place to stay';
    break;
    default:
      if (!isOpen) return null;
      // Handle unknown types or simply return null
      return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {type === "rent" && 
      <RentModalWrapper
      title={title}
      description={description}
      isOpen={isOpen}
      setOpen={closeModal}
      />
      }
      {type === "search" && 
      <SearchModalWrapper
      title={title}
      description={description}
      isOpen={isOpen}
      setOpen={closeModal}
      />
      }
    </>
  );
}