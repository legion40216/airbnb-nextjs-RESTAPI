"use client";
import { UseFormReturn } from "react-hook-form";
import { SearchFormValues } from "@/schemas";
import { DateRange } from "react-day-picker";

import {
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";

type CalendarInputProps = {
  form: UseFormReturn<SearchFormValues>;
};

export default function CalendarInput({ form }: CalendarInputProps) {
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  const dateRange: DateRange = {
    from: startDate,
    to: endDate,
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range) {
      form.setValue("startDate", range.from);
      form.setValue("endDate", range.to);
    }
  };

  return (
    <div className="grid grid-rows-[min-content_1fr] h-full space-y-4">
      <div>
        <h2 className="text-xl font-semibold ">When do you plan to go?</h2>
        <p className="text-muted-foreground">Make sure everyone is free!</p>
      </div>

      <FormField
        control={form.control}
        name="startDate"
        render={() => (
          <FormItem className="w-full">
            <FormControl>
              <div className="w-full ">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateRangeChange}
                  numberOfMonths={1}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="w-full rounded-md border shadow p-4 block"
                  classNames={{
                    months: "w-full block",
                    table: "w-full border-collapse",
                    head_row: "w-full flex justify-around",
                    row: "w-full flex mt-2",
                    cell: "flex-1 text-center",
                    day: "w-full h-9 rounded-md ",
                    day_selected: "bg-primary text-white hover:bg-primary",
                    day_range_start: "bg-primary text-white rounded-l-full",
                    day_range_end: "bg-primary text-white rounded-r-full",
                    day_range_middle: "bg-primary/10 text-primary",
                    caption_label: "font-medium text-base",
                    nav_button: "text-muted-foreground hover:text-black",
                  }}
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}