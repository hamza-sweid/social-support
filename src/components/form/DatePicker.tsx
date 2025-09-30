import { Controller, type FieldValues } from 'react-hook-form';
import { DatePicker as AntDatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import type { DatePickerProps } from '../../types/form';

export const DatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  placeholder,
}: DatePickerProps<T>) => {
  const dateId = `date-${String(name)}`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div style={{ marginBottom: '16px' }}>
          {label && (
            <label
              htmlFor={dateId}
              style={{ display: 'block', marginBottom: '4px' }}
            >
              {label}
            </label>
          )}
          <AntDatePicker
            id={dateId}
            placeholder={placeholder}
            style={{ width: '100%' }}
            value={field.value ? dayjs(field.value) : undefined}
            onChange={(date: Dayjs | null) =>
              field.onChange(date ? date.format('YYYY-MM-DD') : '')
            }
            aria-invalid={fieldState.invalid}
            aria-describedby={fieldState.error ? `${dateId}-error` : undefined}
          />
          {fieldState.error && (
            <p
              id={`${dateId}-error`}
              style={{ color: 'red', fontSize: '12px' }}
              role="alert"
            >
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
