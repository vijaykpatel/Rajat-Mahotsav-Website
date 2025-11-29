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
import { DateValue, CalendarDate, parseDate } from "@internationalized/date"

import { cn } from "@/lib/utils"
import { RangeCalendar } from "@/components/organisms/calendar-rac"
import { DateInput, dateInputStyle } from "@/components/molecules/datefield-rac"

interface EventsDatePickerProps {
  value: { start: Date | null; end: Date | null }
  onChange: (value: { start: Date | null; end: Date | null }) => void
  className?: string
}

export function EventsDatePicker({
  value,
  onChange,
  className
}: EventsDatePickerProps) {
  // Convert Date to DateValue
  const convertToDateValue = (date: Date | null): DateValue | null => {
    if (!date) return null
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return new CalendarDate(year, month, day)
  }

  // Convert DateValue to Date
  const convertToDate = (dateValue: DateValue | null): Date | null => {
    if (!dateValue) return null
    return new Date(dateValue.year, dateValue.month - 1, dateValue.day)
  }

  const dateRangeValue = {
    start: convertToDateValue(value.start),
    end: convertToDateValue(value.end)
  }

  const handleChange = (newValue: { start: DateValue | null; end: DateValue | null } | null) => {
    if (!newValue) {
      onChange({ start: null, end: null })
      return
    }
    onChange({
      start: convertToDate(newValue.start),
      end: convertToDate(newValue.end)
    })
  }

  return (
    <div className={cn("space-y-2", className)}>
      <DateRangePicker
        value={dateRangeValue}
        onChange={handleChange}
        className="w-full"
      >
        <Label className="text-sm font-semibold text-gray-700">
          Filter by Date Range
        </Label>
        <div className="flex relative">
          <Group className={cn(
            dateInputStyle,
            "pe-9 h-12 text-base bg-white border-gray-300 text-gray-800 cursor-pointer focus-within:ring-2 focus-within:ring-orange-200 focus-within:border-orange-500"
          )}>
            <DateInput slot="start" unstyled className="text-gray-800 placeholder:text-gray-400" />
            <span aria-hidden="true" className="text-gray-600 px-2">
              to
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
          className="bg-white border-2 border-orange-200 shadow-xl text-gray-900 data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-xl outline-hidden"
          offset={4}
        >
          <Dialog className="max-h-[inherit] overflow-auto p-4">
            <RangeCalendar
              className="[&_*]:text-black [&_button]:text-black [&_td]:text-black [&_th]:text-black"
            />
          </Dialog>
        </Popover>
      </DateRangePicker>
    </div>
  )
}
