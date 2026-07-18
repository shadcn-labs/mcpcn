"use client";

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Globe,
  Search,
} from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/** Timezone configuration using IANA timezone identifiers for correct DST handling */
const timezones = [
  {
    iana: "America/Los_Angeles",
    id: "pacific",
    name: "Pacific Time - US & Canada",
  },
  {
    iana: "America/Denver",
    id: "mountain",
    name: "Mountain Time - US & Canada",
  },
  {
    iana: "America/Chicago",
    id: "central",
    name: "Central Time - US & Canada",
  },
  {
    iana: "America/New_York",
    id: "eastern",
    name: "Eastern Time - US & Canada",
  },
  { iana: "America/Anchorage", id: "alaska", name: "Alaska Time" },
  { iana: "America/Phoenix", id: "arizona", name: "Arizona, Yukon Time" },
  { iana: "America/St_Johns", id: "newfoundland", name: "Newfoundland Time" },
  { iana: "America/Halifax", id: "atlantic", name: "Atlantic Time - Canada" },
  { iana: "Europe/London", id: "london", name: "London, Dublin, Edinburgh" },
  { iana: "Europe/Paris", id: "paris", name: "Paris, Berlin, Amsterdam" },
  { iana: "Europe/Athens", id: "athens", name: "Athens, Helsinki, Istanbul" },
  { iana: "Europe/Moscow", id: "moscow", name: "Moscow, St. Petersburg" },
  { iana: "Asia/Dubai", id: "dubai", name: "Dubai, Abu Dhabi" },
  { iana: "Asia/Karachi", id: "karachi", name: "Karachi, Islamabad" },
  { iana: "Asia/Dhaka", id: "dhaka", name: "Dhaka, Almaty" },
  { iana: "Asia/Bangkok", id: "bangkok", name: "Bangkok, Hanoi, Jakarta" },
  {
    iana: "Asia/Singapore",
    id: "singapore",
    name: "Singapore, Hong Kong, Perth",
  },
  { iana: "Asia/Tokyo", id: "tokyo", name: "Tokyo, Seoul, Osaka" },
  {
    iana: "Australia/Sydney",
    id: "sydney",
    name: "Sydney, Melbourne, Brisbane",
  },
  { iana: "Pacific/Auckland", id: "auckland", name: "Auckland, Wellington" },
];

const getTimeForTimezone = (iana: string) => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "2-digit",
      timeZone: iana,
    })
      .format(new Date())
      .toLowerCase();
  } catch {
    return "";
  }
};

export interface DateTimePickerProps {
  children?: ReactNode;
  data?: {
    /** Title displayed at the top of the picker. */
    title?: string;
    /** Array of dates that can be selected. */
    availableDates?: Date[];
    /** Array of time slot strings (e.g., '11:30am'). */
    availableTimeSlots?: string[];
    /** Default timezone name to display. */
    timezone?: string;
  };
  actions?: {
    /** Called when the user clicks the Next button. */
    onNext?: (date: Date, time: string) => void;
  };
  appearance?: {
    /**
     * Whether to display the title.
     * @default true
     */
    showTitle?: boolean;
    /**
     * Whether to show timezone selector.
     * @default true
     */
    showTimezone?: boolean;
    /**
     * First day of the week.
     * - `'sunday'` — US, Canada, Japan (default)
     * - `'monday'` — ISO 8601, Europe, most of the world
     * - `'saturday'` — Middle East
     * @default 'sunday'
     */
    weekStartsOn?: "sunday" | "monday" | "saturday";
  };
  control?: {
    /** Controlled selected date value. */
    selectedDate?: Date | null;
    /** Controlled selected time value. */
    selectedTime?: string | null;
  };
}

const getDefaultDates = () => {
  const dates: Date[] = [];
  const now = new Date();
  for (let month = 0; month <= 1; month += 1) {
    for (let day = 1; day <= 28; day += 2) {
      const date = new Date(now.getFullYear(), now.getMonth() + month, day);
      if (![0, 6].includes(date.getDay())) {
        dates.push(date);
      }
    }
  }
  return dates;
};

const DEFAULT_PICKER = {
  availableDates: getDefaultDates(),
  availableTimeSlots: [
    "9:00am",
    "10:00am",
    "11:30am",
    "1:00pm",
    "2:30pm",
    "4:00pm",
  ],
  timezone: "Eastern Time - US & Canada",
  title: "Select a Date & Time",
} satisfies NonNullable<DateTimePickerProps["data"]>;

const DateTimePickerContext = createContext<DateTimePickerProps | null>(null);

export const useDateTimePicker = () => {
  const context = useContext(DateTimePickerContext);
  if (!context) {
    throw new Error(
      "DateTimePicker components must be used within DateTimePicker"
    );
  }
  return context;
};

const ALL_DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const WEEK_START_OFFSETS: Record<"sunday" | "monday" | "saturday", number> = {
  monday: 1,
  saturday: 6,
  sunday: 0,
};

const getOrderedDays = (weekStartsOn: "sunday" | "monday" | "saturday") => {
  const offset = WEEK_START_OFFSETS[weekStartsOn];
  return [...ALL_DAYS.slice(offset), ...ALL_DAYS.slice(0, offset)];
};
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDateHeader = (date: Date) => {
  const dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];
  const monthName = MONTHS[date.getMonth()];
  return `${dayName}, ${monthName} ${date.getDate()}`;
};

const isSameDay = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

const resolveDateTimePicker = ({
  actions,
  appearance,
  control,
  data,
}: DateTimePickerProps) => {
  const resolved = data ?? DEFAULT_PICKER;
  return {
    availableDates: resolved.availableDates ?? [],
    availableTimeSlots: resolved.availableTimeSlots ?? [],
    controlledDate: control?.selectedDate,
    controlledTime: control?.selectedTime,
    onNext: actions?.onNext,
    showTimezone: appearance?.showTimezone ?? true,
    showTitle: appearance?.showTitle ?? true,
    timezone: resolved.timezone,
    title: resolved.title,
    weekStartsOn: appearance?.weekStartsOn ?? "sunday",
  };
};

const DateTimePickerView = (props: DateTimePickerProps) => {
  const {
    availableDates,
    availableTimeSlots,
    controlledDate,
    controlledTime,
    onNext,
    showTimezone,
    showTitle,
    timezone,
    title,
    weekStartsOn,
  } = resolveDateTimePicker(props);
  const orderedDays = getOrderedDays(weekStartsOn);
  const weekStartOffset = WEEK_START_OFFSETS[weekStartsOn];

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    controlledDate ?? null
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    controlledTime ?? null
  );
  const [selectedTimezone, setSelectedTimezone] = useState(
    timezones.find((tz) => tz.name === timezone) || timezones[3]
  );
  const [timezoneSearch, setTimezoneSearch] = useState("");
  const [timezoneDropdownOpen, setTimezoneDropdownOpen] = useState(false);
  const timezoneSearchRef = useRef<HTMLInputElement>(null);
  const [mobileView, setMobileView] = useState<"calendar" | "time">("calendar");

  const filteredTimezones = timezones.filter((tz) =>
    tz.name.toLowerCase().includes(timezoneSearch.toLowerCase())
  );

  useEffect(() => {
    if (timezoneDropdownOpen && timezoneSearchRef.current) {
      timezoneSearchRef.current.focus();
    }
  }, [timezoneDropdownOpen]);

  const handleTimezoneSelect = (tz: (typeof timezones)[0]) => {
    setSelectedTimezone(tz);
    setTimezoneDropdownOpen(false);
    setTimezoneSearch("");
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: { day: number; isCurrentMonth: boolean; date: Date }[] =
    [];
  const leadingDays = (firstDayOfMonth - weekStartOffset + 7) % 7;
  for (let i = leadingDays - 1; i >= 0; i -= 1) {
    const day = daysInPrevMonth - i;
    calendarDays.push({
      date: new Date(year, month - 1, day),
      day,
      isCurrentMonth: false,
    });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    calendarDays.push({
      date: new Date(year, month, day),
      day,
      isCurrentMonth: true,
    });
  }
  const totalCells = Math.ceil(calendarDays.length / 7) * 7;
  const remainingDays = totalCells - calendarDays.length;
  for (let day = 1; day <= remainingDays; day += 1) {
    calendarDays.push({
      date: new Date(year, month + 1, day),
      day,
      isCurrentMonth: false,
    });
  }

  const isDateAvailable = (date: Date) =>
    availableDates.some((d) => isSameDay(d, date));

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (date: Date) => {
    if (!isDateAvailable(date)) {
      return;
    }
    setSelectedDate(date);
    setSelectedTime(null);
    setMobileView("time");
  };

  const handleBackToCalendar = () => {
    setMobileView("calendar");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      onNext?.(selectedDate, selectedTime);
    }
  };

  const now = new Date();

  return (
    <div className="w-full bg-card rounded-xl p-6">
      {showTitle && title && (
        <h2 className="text-xl font-semibold text-foreground mb-6">{title}</h2>
      )}

      <div className="flex justify-center">
        {/* Calendar Section - Hidden on mobile when viewing time slots */}
        <div
          className={cn(
            "w-[304px] flex-shrink-0",
            mobileView === "time" ? "hidden md:block" : "block"
          )}
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <ChevronLeft className="size-5 text-muted-foreground" />
            </button>
            <span className="text-base font-medium text-foreground min-w-[140px] text-center">
              {MONTHS[month]} {year}
            </span>
            <button
              onClick={handleNextMonth}
              aria-label="Next month"
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <ChevronRight className="size-5 text-muted-foreground" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {orderedDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {calendarDays.map((item, index) => {
              const isAvailable =
                item.isCurrentMonth && isDateAvailable(item.date);
              const isSelected =
                selectedDate && isSameDay(item.date, selectedDate);
              const isToday = isSameDay(item.date, now);

              return (
                <button
                  key={index}
                  onClick={() =>
                    item.isCurrentMonth && handleDateSelect(item.date)
                  }
                  disabled={!item.isCurrentMonth || !isAvailable}
                  className={cn(
                    "relative size-10 rounded-full text-sm transition-all duration-200 flex items-center justify-center mx-auto",
                    !item.isCurrentMonth && "text-muted-foreground/30",
                    item.isCurrentMonth &&
                      !isAvailable &&
                      "text-muted-foreground cursor-default",
                    item.isCurrentMonth &&
                      isAvailable &&
                      !isSelected &&
                      "text-primary font-medium hover:bg-primary/10 cursor-pointer",
                    isSelected &&
                      "bg-primary text-primary-foreground font-medium",
                    isAvailable && !isSelected && "bg-primary/10"
                  )}
                >
                  {item.day}
                  {isToday && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-foreground" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Timezone */}
          {showTimezone && (
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground mb-2">
                Time zone
              </p>
              <Popover
                open={timezoneDropdownOpen}
                onOpenChange={setTimezoneDropdownOpen}
              >
                <PopoverTrigger
                  render={
                    <button
                      aria-label="Select timezone"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    />
                  }
                >
                  <Globe className="size-4" />
                  <span>
                    {selectedTimezone.name} (
                    {getTimeForTimezone(selectedTimezone.iana)})
                  </span>
                  <ChevronRight
                    className={cn(
                      "size-3 transition-transform",
                      timezoneDropdownOpen ? "rotate-90" : "rotate-0"
                    )}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0" align="start">
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        ref={timezoneSearchRef}
                        type="text"
                        placeholder="Search timezone..."
                        value={timezoneSearch}
                        onChange={(e) => setTimezoneSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:border-primary bg-background"
                      />
                    </div>
                  </div>
                  <div className="max-h-[280px] overflow-y-auto">
                    {filteredTimezones.map((tz) => (
                      <button
                        key={tz.id}
                        onClick={() => handleTimezoneSelect(tz)}
                        className={cn(
                          "w-full px-3 py-2.5 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between",
                          selectedTimezone.id === tz.id && "bg-muted"
                        )}
                      >
                        <span className="text-foreground">{tz.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {getTimeForTimezone(tz.iana)}
                        </span>
                      </button>
                    ))}
                    {filteredTimezones.length === 0 && (
                      <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                        No timezone found
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Time Slots Section - Visible on mobile when viewing times, animated on desktop */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            mobileView === "time"
              ? "block w-full md:w-[200px]"
              : "hidden md:block",
            selectedDate
              ? "md:w-[200px] md:opacity-100 md:ml-8"
              : "md:w-0 md:opacity-0 md:ml-0"
          )}
        >
          <div className="w-full md:w-[200px]">
            {/* Back button - Mobile only */}
            <button
              onClick={handleBackToCalendar}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 md:hidden"
            >
              <ArrowLeft className="size-4" />
              <span>Back to calendar</span>
            </button>

            <p className="text-base font-medium text-foreground mb-4 whitespace-nowrap">
              {selectedDate ? formatDateHeader(selectedDate) : ""}
            </p>

            <div className="space-y-2 max-h-[320px] overflow-y-auto">
              {availableTimeSlots.map((time) => {
                const isTimeSelected = selectedTime === time;

                return (
                  <div key={time} className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleTimeSelect(time)}
                      className={cn(
                        "h-[52px] rounded-lg border text-sm font-semibold transition-all duration-200",
                        isTimeSelected
                          ? "bg-muted-foreground text-background border-muted-foreground"
                          : "col-span-2 border-primary text-primary hover:bg-primary/5"
                      )}
                    >
                      {time}
                    </button>
                    {isTimeSelected && (
                      <Button
                        onClick={handleNext}
                        className="h-[52px] animate-in fade-in slide-in-from-left-2 duration-200"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DateTimePickerContent = (props: DateTimePickerProps) => {
  const context = useDateTimePicker();
  return <DateTimePickerView {...context} {...props} />;
};

const DateTimePickerRoot = ({ children, ...props }: DateTimePickerProps) => (
  <DateTimePickerContext.Provider value={props}>
    {children ?? <DateTimePickerContent />}
  </DateTimePickerContext.Provider>
);

export const DateTimePicker = DateTimePickerRoot;
