"use client";

import { ChevronDown, Paperclip, Search, Send, X } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { ChangeEvent, ComponentProps, FormEvent, RefObject } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const COUNTRIES_URL =
  "https://countries.dev/countries?fields=name,alpha2Code,flag,callingCodes&sort=name";

interface Country {
  code: string;
  flag: string;
  id: string;
  name: string;
}

interface CountriesDevCountry {
  alpha2Code: string;
  callingCodes: string[];
  flag: string;
  name: string;
}

type CountryStatus = "error" | "loading" | "ready";

const COUNTRY_STATUS_MESSAGE: Record<CountryStatus, string> = {
  error: "Countries unavailable",
  loading: "Loading countries...",
  ready: "No country found",
};

const DEFAULT_COUNTRY: Country = {
  code: "+1",
  flag: "🇺🇸",
  id: "us",
  name: "United States of America",
};

const toCountry = (country: CountriesDevCountry): Country[] => {
  const [callingCode] = country.callingCodes;

  if (!callingCode) {
    return [];
  }

  return [
    {
      code: callingCode.startsWith("+") ? callingCode : `+${callingCode}`,
      flag: country.flag,
      id: country.alpha2Code.toLowerCase(),
      name: country.name,
    },
  ];
};

export interface ContactFormData {
  attachment: File | null;
  countryCode: string;
  countryId: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  phoneNumber: string;
}

interface ContactFormContextValue {
  countryDropdownOpen: boolean;
  countrySearch: string;
  countryStatus: CountryStatus;
  fileInputRef: RefObject<HTMLInputElement | null>;
  filteredCountries: Country[];
  ids: {
    email: string;
    firstName: string;
    lastName: string;
    message: string;
    phone: string;
  };
  isLoading: boolean;
  searchInputRef: RefObject<HTMLInputElement | null>;
  selectedCountry: Country;
  setCountryDropdownOpen: (open: boolean) => void;
  setCountrySearch: (search: string) => void;
  setField: <Key extends keyof ContactFormData>(
    field: Key,
    value: ContactFormData[Key]
  ) => void;
  submitLabel: string;
  values: ContactFormData;
}

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

export const useContactForm = () => {
  const context = useContext(ContactFormContext);

  if (!context) {
    throw new Error("ContactForm components must be used within ContactForm");
  }

  return context;
};

export interface ContactFormProps extends Omit<
  ComponentProps<"form">,
  "onSubmit"
> {
  defaultValues?: Partial<ContactFormData>;
  isLoading?: boolean;
  onSubmit?: (values: ContactFormData) => void;
  submitLabel?: string;
}

interface ContactFormHeaderProps extends ComponentProps<"div"> {
  description?: string;
  title?: string;
}

export const ContactFormHeader = ({
  children,
  className,
  description = "We'd love to hear from you. Fill out the form below.",
  title = "Get in Touch",
  ...props
}: ContactFormHeaderProps) => {
  useContactForm();

  return (
    <div className={className} {...props}>
      {children ?? (
        <>
          <h2 className="font-semibold text-foreground text-xl">{title}</h2>
          <p className="mt-1 text-muted-foreground text-sm">{description}</p>
        </>
      )}
    </div>
  );
};

export const ContactFormNameFields = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { ids, setField, values } = useContactForm();

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)} {...props}>
      {children ?? (
        <>
          <div className="space-y-2">
            <Label htmlFor={ids.firstName}>First Name</Label>
            <Input
              id={ids.firstName}
              name="firstName"
              onChange={(event) => setField("firstName", event.target.value)}
              placeholder="John"
              required
              value={values.firstName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={ids.lastName}>Last Name</Label>
            <Input
              id={ids.lastName}
              name="lastName"
              onChange={(event) => setField("lastName", event.target.value)}
              placeholder="Doe"
              required
              value={values.lastName}
            />
          </div>
        </>
      )}
    </div>
  );
};

export const ContactFormCountrySelect = ({
  className,
  ...props
}: ComponentProps<"button">) => {
  const {
    countryDropdownOpen,
    countrySearch,
    countryStatus,
    filteredCountries,
    searchInputRef,
    selectedCountry,
    setCountryDropdownOpen,
    setCountrySearch,
    setField,
    values,
  } = useContactForm();

  const selectCountry = (country: Country) => {
    setField("countryCode", country.code);
    setField("countryId", country.id);
    setCountryDropdownOpen(false);
    setCountrySearch("");
  };

  return (
    <Popover onOpenChange={setCountryDropdownOpen} open={countryDropdownOpen}>
      <PopoverTrigger
        render={
          <button
            className={cn(
              "flex h-9 items-center gap-1.5 rounded-lg border border-input bg-transparent px-3 text-sm transition-colors",
              "hover:bg-muted focus-visible:border-foreground focus-visible:outline-none",
              className
            )}
            type="button"
            {...props}
          />
        }
      >
        <span>{selectedCountry.flag}</span>
        <span>{selectedCountry.code}</span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[280px] p-0">
        <div className="border-border border-b p-2">
          <div className="relative">
            <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchInputRef}
              className="h-9 w-full rounded-md border border-input bg-transparent pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-foreground"
              onChange={(event) => setCountrySearch(event.target.value)}
              placeholder="Search country..."
              type="text"
              value={countrySearch}
            />
          </div>
        </div>
        <div className="max-h-[240px] overflow-y-auto p-1">
          {filteredCountries.length === 0 ? (
            <p className="py-4 text-center text-muted-foreground text-sm">
              {COUNTRY_STATUS_MESSAGE[countryStatus]}
            </p>
          ) : (
            filteredCountries.map((country) => (
              <button
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                  "hover:bg-muted",
                  values.countryId === country.id && "bg-muted"
                )}
                key={country.id}
                onClick={() => selectCountry(country)}
                type="button"
              >
                <span>{country.flag}</span>
                <span className="flex-1">{country.name}</span>
                <span className="text-muted-foreground">{country.code}</span>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const ContactFormContactFields = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { ids, setField, values } = useContactForm();

  return (
    <div
      className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", className)}
      {...props}
    >
      {children ?? (
        <>
          <div className="space-y-2">
            <Label htmlFor={ids.phone}>Phone Number</Label>
            <div className="flex gap-2">
              <ContactFormCountrySelect />
              <Input
                className="flex-1"
                id={ids.phone}
                name="phoneNumber"
                onChange={(event) =>
                  setField("phoneNumber", event.target.value)
                }
                placeholder="(555) 123-4567"
                type="tel"
                value={values.phoneNumber}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={ids.email}>Email</Label>
            <Input
              id={ids.email}
              name="email"
              onChange={(event) => setField("email", event.target.value)}
              placeholder="john@example.com"
              required
              type="email"
              value={values.email}
            />
          </div>
        </>
      )}
    </div>
  );
};

export const ContactFormMessageField = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { ids, setField, values } = useContactForm();

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children ?? (
        <>
          <Label htmlFor={ids.message}>Tell us about your project</Label>
          <textarea
            className={cn(
              "flex w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground md:text-sm",
              "focus-visible:border-foreground"
            )}
            id={ids.message}
            name="message"
            onChange={(event) => setField("message", event.target.value)}
            placeholder="Describe your project, goals, and timeline..."
            required
            rows={4}
            value={values.message}
          />
        </>
      )}
    </div>
  );
};

export const ContactFormActions = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { fileInputRef, isLoading, setField, submitLabel, values } =
    useContactForm();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setField("attachment", event.target.files?.[0] ?? null);
  };

  const removeFile = () => {
    setField("attachment", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <input
            ref={fileInputRef}
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFileChange}
            type="file"
          />
          {values.attachment ? (
            <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-muted px-3 py-2 sm:w-auto">
              <Paperclip className="size-4 shrink-0 text-muted-foreground" />
              <span className="max-w-[150px] truncate text-foreground text-sm">
                {values.attachment.name}
              </span>
              <button
                aria-label="Remove attachment"
                className="rounded p-1 transition-colors hover:bg-background"
                onClick={removeFile}
                type="button"
              >
                <X className="size-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <Button
              className="w-full sm:w-auto"
              onClick={() => fileInputRef.current?.click()}
              size="sm"
              type="button"
              variant="outline"
            >
              <Paperclip className="mr-2 size-4" />
              Attach a file
            </Button>
          )}
          <Button
            className="w-full sm:w-auto"
            disabled={isLoading}
            size="sm"
            type="submit"
          >
            {isLoading ? (
              "Sending..."
            ) : (
              <>
                <Send className="mr-2 size-4" />
                {submitLabel}
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export const ContactFormContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div"> & { children: React.ReactNode }) => {
  useContactForm();

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
};

const ContactFormRoot = ({
  children,
  className,
  defaultValues,
  isLoading = false,
  onSubmit,
  submitLabel = "Send Message",
  ...props
}: ContactFormProps & { children: React.ReactNode }) => {
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryStatus, setCountryStatus] = useState<CountryStatus>("loading");
  const [values, setValues] = useState<ContactFormData>({
    attachment: null,
    countryCode: "+1",
    countryId: "us",
    email: "",
    firstName: "",
    lastName: "",
    message: "",
    phoneNumber: "",
    ...defaultValues,
  });

  const selectedCountry =
    countries.find((country) => country.id === values.countryId) ??
    DEFAULT_COUNTRY;
  const normalizedSearch = countrySearch.trim().toLowerCase();
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(normalizedSearch) ||
      country.code.includes(normalizedSearch)
  );

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetch(COUNTRIES_URL);
        const data: CountriesDevCountry[] = await response.json();
        setCountries(data.flatMap(toCountry));
        setCountryStatus("ready");
      } catch {
        setCountryStatus("error");
      }
    };

    void loadCountries();
  }, []);

  useEffect(() => {
    if (countryDropdownOpen) {
      searchInputRef.current?.focus();
    }
  }, [countryDropdownOpen]);

  const setField = <Key extends keyof ContactFormData>(
    field: Key,
    value: ContactFormData[Key]
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(values);
  };

  const context: ContactFormContextValue = {
    countryDropdownOpen,
    countrySearch,
    countryStatus,
    fileInputRef,
    filteredCountries,
    ids: {
      email: `${id}-email`,
      firstName: `${id}-first-name`,
      lastName: `${id}-last-name`,
      message: `${id}-message`,
      phone: `${id}-phone`,
    },
    isLoading,
    searchInputRef,
    selectedCountry,
    setCountryDropdownOpen,
    setCountrySearch,
    setField,
    submitLabel,
    values,
  };

  return (
    <ContactFormContext.Provider value={context}>
      <form
        className={cn("w-full rounded-xl bg-card p-6", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    </ContactFormContext.Provider>
  );
};

export const ContactForm = ContactFormRoot;
