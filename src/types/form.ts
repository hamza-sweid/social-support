import { type Control, type FieldValues, type Path } from 'react-hook-form';

// Generic Input Props
export type InputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: object;
  placeholder?: string;
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
  rules?: object;
  options: OptionType[];
  placeholder?: string;
};

// Generic DatePicker Props
export type DatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: object;
  placeholder?: string;
};
