import {
  type Control,
  type FieldValues,
  type Path,
  type UseFormGetValues,
  type UseFormSetValue,
} from 'react-hook-form';

// Generic Input Props
export type InputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string | React.ReactNode;
  rules?: any;
  placeholder?: string;
  rows?: number;
};

export type InputNumberProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  getValues?: UseFormGetValues<T>;
  setValue?: UseFormSetValue<T>;
  addonOptions?: string[];
  label?: string;
  placeholder?: string;
  rules?: any;
  min?: number;
  max?: number;
  step?: number;
  formatter?: (value: number | string | undefined) => string;
};

// Option type for Select
export type OptionType = {
  label: string;
  value: string | number;
};

// Generic Select Props
export type SelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: any;
  options: OptionType[];
  placeholder?: string;
  disabled?: boolean;
};

// Generic DatePicker Props
export type DatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: any;
  placeholder?: string;
};
