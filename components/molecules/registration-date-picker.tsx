"use client"

import { CalendarIcon } from "lucide-react"
import {
  Button,
  DateRangePicker,
  Dialog,
  Group,
  Label,
  Popover,
} from "react-aria-components"
import { DateValue, CalendarDate } from "@internationalized/date"

import { cn } from "@/lib/utils"
import { RangeCalendar } from "@/components/organisms/calendar-rac"
import { DateInput, dateInputStyle } from "@/components/molecules/datefield-rac"

interface RegistrationDatePickerProps {
  value?: { start: DateValue | null; end: DateValue | null }
  onChange?: (value: { start: DateValue | null; end: DateValue | null }) => void
  className?: string
  error?: string
}

export default function RegistrationDatePicker({ 
  value, 
  onChange, 
  className,
  error 
}: RegistrationDatePickerProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <DateRangePicker 
        value={value}
        onChange={onChange}
        className="w-full"
      >
        <Label className="text-base font-medium text-gray-700">
          Arrival & Departure Dates *
        </Label>
        <div className="flex relative">
          <Group className={cn(
            dateInputStyle, 
            "pe-9 h-14 text-base bg-white/60 border-orange-200 text-gray-800 backdrop-blur-sm cursor-pointer focus-within:ring-2 focus-within:ring-orange-200"
          )}>
            <DateInput slot="start" unstyled className="text-gray-800 placeholder:text-gray-400" />
            <span aria-hidden="true" className="text-gray-600 px-2">
              -
            </span>
            <DateInput slot="end" unstyled className="text-gray-800 placeholder:text-gray-400" />
          </Group>
          <Button className="text-gray-600 hover:text-gray-800 data-focus-visible:border-ring data-focus-visible:ring-ring/50 z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px]">
            <CalendarIcon size={16} />
          </Button>
          <Button className="absolute inset-0 opacity-0 cursor-pointer" aria-label="Open calendar">
            <span className="sr-only">Open calendar</span>
          </Button>
        </div>
        <Popover
          className="bg-white/95 border-2 border-orange-200 shadow-xl text-gray-900 data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-xl outline-hidden backdrop-blur-sm"
          offset={4}
        >
          <Dialog className="max-h-[inherit] overflow-auto p-4">
            <RangeCalendar 
              defaultFocusedValue={new CalendarDate(2026, 7, 1)}
              minValue={new CalendarDate(2026, 7, 23)}
              maxValue={new CalendarDate(2026, 8, 8)}
              className="[&_*]:text-black [&_button]:text-black [&_td]:text-black [&_th]:text-black"
            />
          </Dialog>
        </Popover>
      </DateRangePicker>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}