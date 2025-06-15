"use client"
import React, { useState, useMemo} from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMultiModalStore } from '@/hooks/useMultiModalStore';
import axios from "axios";

import {
  Form,
} from "@/components/ui/form";

import CategoryInput from './rent-modal/category-input';
import LocationInput from './rent-modal/location-input';
import CounterInput from './rent-modal/counter-input';
import ImagesInput from './rent-modal/images-input';
import DescriptionInput from './rent-modal/description-input';
import PriceInput from './rent-modal/price-input';
import ImageInput from './rent-modal/image-input';
import { ListingFormValues, ListingSchema } from '@/schemas';
import MultiModal from '../multi-modal';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const STEP_FLOW = [
  "category",
  "location",
  "info",
  "image",
  "images",
  "description",
  "price",
] as const;
type Step = typeof STEP_FLOW[number];

// Map each step to the corresponding field(s) to validate
const stepFieldMap: Record<Step, keyof ListingFormValues | (keyof ListingFormValues)[]> = {
  category: "category",
  location: "locationValue",
  info: ["guestCount", "roomCount", "bathroomCount"],
  image: "imgSrc",
  images: "images", 
  description: ["title", "description"],
  price: "price",
};

type RentProps = {
  title: string;
  description: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export default function RentModalWrapper(
  {
    description,
    title,
    isOpen,
    setOpen,
  }: RentProps
) {

const form = useForm<ListingFormValues>({
  resolver: zodResolver(ListingSchema),
  defaultValues: {
    category: 'Beach',
    locationValue: '',
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
    imgSrc: '',
    images: [], 
    price: 100,
    title: '',
    description: '',
  },
});

  const { isSubmitting } = form.formState;
  const { handleSubmit } = form;
  const { closeModal } = useMultiModalStore();
  const router = useRouter();

  const [step, setStep] = useState<Step>(STEP_FLOW[0]);
  const currentIndex = useMemo(() => STEP_FLOW.indexOf(step), [step]);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === STEP_FLOW.length - 1;

  const goBack = () => {
    if (!isFirst) {
      setStep(STEP_FLOW[currentIndex - 1]);
    }
  };

  const handleNextOrSubmit = async () => {
    // Validate the current step
    const currentField = stepFieldMap[step];
    const isValid = await form.trigger(currentField);

    if (isValid) {
      if (!isLast) {
        setStep(STEP_FLOW[currentIndex + 1]);
      } else {
        // Handle final submission
        handleSubmit(onSubmit)()
      }
    }
  };

  const toastLoading = "Creating your listing... Please wait.";
  const toastMessage = "Your listing has been created successfully!";

  const onSubmit = async (values: ListingFormValues) => {
      const toastId = toast.loading(toastLoading);
      try {
        await axios.post(`/api/listings`, values);
        toast.success(toastMessage);
        router.refresh();
        closeModal();
      } catch (error) {
        console.log(error)
        toast.error((error as any).response?.data?.error || "Something went wrong!");
      }  finally {
        toast.dismiss(toastId);

      }
  };

  // Render the appropriate step content based on current step
  let currentStepBody: React.ReactNode;
  switch (step) {
    case "category":
      currentStepBody =  <CategoryInput form={form}/>;
      break;
    case "location":
      currentStepBody = <LocationInput form={form} />;
      break;
    case "info":
      currentStepBody = <CounterInput form={form} />;
      break;
    case "image":
      currentStepBody = <ImageInput form={form} />;
    break;
    case "images":
      currentStepBody = <ImagesInput form={form} />;
      break;
    case "description":
      currentStepBody = <DescriptionInput form={form} />;
      break;
    case "price":
      currentStepBody = <PriceInput form={form} />;
      break;
    default:
      currentStepBody = <div>Unknown step content</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MultiModal
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
          nextButtonText={isLast ? "Create Listing" : "Next"}
          submitButtonText="Create Listing"
        />
      </form>
    </Form>
  );
}