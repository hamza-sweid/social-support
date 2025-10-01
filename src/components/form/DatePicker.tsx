import { Controller, type FieldValues } from 'react-hook-form';
import { DatePicker as AntDatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import type { DatePickerProps } from '../../types/form';
import styles from '../../styles/form.module.scss';

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
        <div className={styles.field}>
          {label && (
            <label htmlFor={dateId} className={styles.label}>
              {label}
            </label>
          )}
          <AntDatePicker
            allowClear
            id={dateId}
            placeholder={placeholder}
            className={styles.input}
            value={field.value ? dayjs(field.value) : undefined}
            onChange={(date: Dayjs | null) =>
              field.onChange(date ? date.format('YYYY-MM-DD') : '')
            }
            aria-invalid={fieldState.invalid}
            aria-describedby={fieldState.error ? `${dateId}-error` : undefined}
          />
          {fieldState.error && (
            <p id={`${dateId}-error`} className={styles.error} role="alert">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
