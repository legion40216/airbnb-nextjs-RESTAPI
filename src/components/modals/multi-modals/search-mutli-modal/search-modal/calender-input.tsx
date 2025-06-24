"use client";
import { UseFormReturn } from "react-hook-form";
import { SearchFormValues } from "@/schemas";
import { DateRange } from "react-day-picker";

import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";

type ListingCalendarProps = {
  form: UseFormReturn<SearchFormValues>;
};

export default function ListingCalendar({ form }: ListingCalendarProps) {
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  const dateRange: DateRange = {
    from: startDate || undefined,
    to: endDate || undefined,
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (!range) {
      // Clear selection
      form.setValue("startDate", undefined as any);
      form.setValue("endDate", undefined as any);
      return;
    }

    const { from, to } = range;

    // If only 'from' is selected (single date click)
    if (from && !to) {
      form.setValue("startDate", from);
      form.setValue("endDate", undefined as any);
      return;
    }

    // If both dates are selected
    if (from && to) {
      // Check if the user clicked on an already selected date to "undo"
      if (startDate && endDate) {
        const fromTime = from.getTime();
        const toTime = to.getTime();
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();

        // If user clicked the same range again, clear the end date
        if (fromTime === startTime && toTime === endTime) {
          form.setValue("startDate", from);
          form.setValue("endDate", undefined as any);
          return;
        }
      }

      // Normal case: set the range
      form.setValue("startDate", from);
      form.setValue("endDate", to);
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <FormField
      control={form.control}
      name="startDate"
      render={() => (
        <FormItem className="w-full">
          <FormControl>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={1}
              disabled={isDateDisabled}
              autoFocus
              className="w-full p-0"
              
              classNames={{
                day: "flex-1",
                day_button: "h-9",
                selected: "bg-primary",
                today: "bg-accent",
                range_middle: "!bg-primary"
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
