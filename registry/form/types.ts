export interface AddressValue {
  city?: string;
  country?: string;
  state?: string;
  street?: string;
  zip?: string;
}

export interface CountryOption {
  callingCode?: string;
  code: string;
  label: string;
}

export type FieldValidator<T> = (value: T) => boolean;
