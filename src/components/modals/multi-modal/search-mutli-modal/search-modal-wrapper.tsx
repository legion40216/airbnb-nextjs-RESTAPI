"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchFormValues, searchSchema } from '@/schemas';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMultiModalStore } from '@/hooks/useMultiModalStore';

import { Form } from "@/components/ui/form";

import LocationInput from './search-modal/location-input';
import CounterInput from './search-modal/counter-input';
import CalendarInput from './search-modal/calender-input';
import SearchMultiModal from './search-multi-modal';

// Define step flow for the search process
const STEP_FLOW = [
  "locationValue",
  "dates",
  "guests"
] as const;

type Step = typeof STEP_FLOW[number];

// Map each step to the corresponding field(s) to validate
const stepFieldMap: Record<Step, keyof SearchFormValues | (keyof SearchFormValues)[]> = {
  locationValue: "locationValue",
  dates:    ["startDate", "endDate"],
  guests:   ["guestCount", "roomCount", "bathroomCount"],
};

type SearchModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export default function SearchModalWrapper({
  title,
  description,
  isOpen,
  setOpen,
}: SearchModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { closeModal } = useMultiModalStore();

  // Function to get default values from query params
  const getDefaultValuesFromQuery = () => {
    const locationValue = searchParams.get('locationValue') || '';
    const startDate = searchParams.get('startDate') 
      ? new Date(searchParams.get('startDate')!) 
      : undefined;
    const endDate = searchParams.get('endDate') 
      ? new Date(searchParams.get('endDate')!) 
      : undefined;
    const guestCount = searchParams.get('guestCount') 
      ? parseInt(searchParams.get('guestCount')!) 
      : 1;
    const roomCount = searchParams.get('roomCount') 
      ? parseInt(searchParams.get('roomCount')!) 
      : 1;
    const bathroomCount = searchParams.get('bathroomCount') 
      ? parseInt(searchParams.get('bathroomCount')!) 
      : 1;

    return {
      locationValue,
      startDate,
      endDate,
      guestCount,
      roomCount,
      bathroomCount,
    };
  };

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: getDefaultValuesFromQuery(),
  });

  const { isSubmitting } = form.formState;
  const { handleSubmit, reset } = form;
  
  // Reset form with query values when modal opens
  useEffect(() => {
    if (isOpen) {
      const queryDefaults = getDefaultValuesFromQuery();
      reset(queryDefaults);
    }
  }, [isOpen, reset, searchParams]);
  
  // Setup step navigation
  const [step, setStep] = useState<Step>(STEP_FLOW[0]);
  const currentIndex = useMemo(() => STEP_FLOW.indexOf(step), [step]);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === STEP_FLOW.length - 1;
  
  // Reset step to first when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(STEP_FLOW[0]);
    }
  }, [isOpen]);
  
  // Navigation functions
  const goBack = () => {
    if (!isFirst) {
      setStep(STEP_FLOW[currentIndex - 1]);
    }
  };
  
  const handleNextOrSubmit = async () => {
    // Validate the current step
    const currentField = stepFieldMap[step];
    let isValid = true;
    
    // Trigger validation for the current field(s)
    if (currentField) {
      if (Array.isArray(currentField)) {
        // If we have multiple fields to validate, validate them one by one
        for (const field of currentField) {
          const fieldValid = await form.trigger(field as any);
          isValid = isValid && fieldValid;
        }
      } else {
        isValid = await form.trigger(currentField as any);
      }
    }

    if (isValid) {
      if (!isLast) {
        setStep(STEP_FLOW[currentIndex + 1]);
      } else {
        // Handle final submission
        handleSubmit(onSubmit)();
      }
    }
  };
  
  const onSubmit = (data: SearchFormValues) => {
    // Create URL search params
    const query: Record<string, string> = {};
    
    if (data.locationValue) query.locationValue = data.locationValue;
    if (data.startDate) query.startDate = data.startDate.toISOString();
    if (data.endDate) query.endDate = data.endDate.toISOString();
    if (data.guestCount) query.guestCount = data.guestCount.toString();
    if (data.roomCount) query.roomCount = data.roomCount.toString();
    if (data.bathroomCount) query.bathroomCount = data.bathroomCount.toString();

   // Build the query string
    const queryString = new URLSearchParams(query).toString();
    
    // Navigate to the search page with the query parameters
    router.push(`/?${queryString.toString()}`);
    
    // Close the modal
    closeModal();
  };
  
  // Render appropriate step content based on current step
  let currentStepBody: React.ReactNode;
  switch (step) {
    case "locationValue":
      currentStepBody = <LocationInput form={form} />;
      break;
    case "dates":
      currentStepBody = <CalendarInput form={form} />;
      break;
    case "guests":
      currentStepBody = <CounterInput form={form} />;
      break;
    default:
      currentStepBody = <div>Unknown step content</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <SearchMultiModal
          body={currentStepBody}
          description={description}
          title={title}
          isOpen={isOpen}
          setOpen={setOpen}
          onBack={goBack}
          onNext={handleNextOrSubmit}
          isFirstStep={isFirst}
          isLastStep={isLast}
          isSubmitting={isSubmitting}
          nextButtonText={isLast ? "Search" : "Next"}
          submitButtonText="Search"
        />
      </form>
    </Form>
  );
}