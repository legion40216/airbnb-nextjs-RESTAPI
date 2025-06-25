"use client";
import React from 'react'
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { formatter } from '@/utils/formatters';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReservationFormValues, reservationSchema, reservationServerSchema, ReservationServerValues } from "@/schemas";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

import { Form } from "@/components/ui/form";
import { ActionBtn } from "@/components/global-ui/airbnb-buttons/action-btn";
import { Separator } from '@/components/ui/separator';
import ListingCalendar from './listing-reservation/listing-calander';

interface ListingReservationProps {
  listingId: string;
  price: number;
  reservations?: { startDate: Date; endDate: Date }[];
}

export default function ListingReservation({
    listingId,
    price,
    reservations = [],
}: ListingReservationProps) {

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      totalPrice: 0,
      listingId,
    },
  });

  const { watch, setValue, formState, handleSubmit } = form;
  const { isSubmitting } = formState;
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const router = useRouter();

  // Memoizing disabled dates to avoid unnecessary recalculations
  const disabledDates = useMemo(() => {
    if (reservations.length === 0) {
      return [];
    }

    let dates: Date[] = [];
    reservations.forEach((res) => {
      const range = eachDayOfInterval({
        start: res.startDate,
        end: res.endDate,
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  // Effect to update total price when startDate, endDate, or price changes
  useEffect(() => {
    if (startDate && endDate) {
      const dayCount = differenceInDays(endDate, startDate);
      setValue("totalPrice", dayCount > 0 ? dayCount * price : price);
    } else {
      setValue("totalPrice", 0);
    }
  }, [startDate, endDate, price, setValue]);

  // Form submit logic
  const toastLoading = "Creating your reservation... Please wait.";
  const toastMessage = "Your reservation has been created successfully!";

  // Utility to transform form data into server data
  const safelyToServerReservationData = (
    formData: ReservationFormValues
  ): z.SafeParseReturnType<ReservationFormValues, ReservationServerValues> => {
    return reservationServerSchema.safeParse(formData);
  };
  const onSubmit = async (values: ReservationFormValues) => {    
    const toastId = toast.loading(toastLoading);

    //parses values to reservationservervalues 
    const result = safelyToServerReservationData(values);
    if (!result.success) {
      toast.error(result.error.errors[0]?.message || "Validation failed");
      toast.dismiss(toastId);
      return;
    }

    try {
      await axios.post(`/api/reservations`, values);
      toast.success(toastMessage);
      router.refresh();
    } catch (error) {
      console.log(error)
      toast.error((error as any).response?.data?.error || "Something went wrong!");
    }  finally {
      toast.dismiss(toastId);
    }
  };

  // Check if reservation can be made
  const canReserve = startDate && endDate && !isSubmitting;

  return (
    <Card className='gap-0 space-y-4'>
      <CardHeader className="space-y-1">
        <CardTitle>
          <p className="flex items-center gap-1">
            <span className="text-2xl font-semibold">
              {formatter.format(price)}
            </span>
            <span className="text-muted-foreground font-light">night</span>
          </p>
        </CardTitle>
        <CardDescription>
          Select your dates to see the total price
        </CardDescription>
      </CardHeader>

      <Separator/>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <ListingCalendar form={form} disabledDates={disabledDates} />
          </form>
        </Form>
      </CardContent>

      <Separator/>
     
      {/* Reserve button - Submit button */}
      <div className='px-4'>
        <ActionBtn 
          onClick={handleSubmit(onSubmit)} 
          disabled={!canReserve}
          type="button"
        >
          {!startDate || !endDate ? 'Select dates' : 'Reserve'}
        </ActionBtn>
      </div>

      <Separator/>

      <CardFooter className="grid gap-4">
        <div className="flex justify-between items-center gap-2 font-semibold text-lg">
          <span>Total</span>
          <span>{formatter.format(watch("totalPrice") || 0)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}