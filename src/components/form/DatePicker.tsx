import { Controller, type FieldValues } from 'react-hook-form';
import { DatePicker as AntDatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerProps } from '../../types/form';
import styles from './form.module.scss';

interface ExtendedDatePickerProps<T extends FieldValues>
  extends DatePickerProps<T> {
  disabledDate?: (current: Date) => boolean;
}

export const DatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  placeholder,
  disabledDate,
}: ExtendedDatePickerProps<T>) => {
  const dateId = `date-${String(name)}`;

  const transformDisabledDate = (currentDayjs: dayjs.Dayjs) => {
    if (!disabledDate) return false;
    const jsDate = currentDayjs.toDate();
    return disabledDate(jsDate);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const valueAsDayjs = field.value ? dayjs(field.value) : undefined;

        return (
          <div className={styles.field}>
            {label && (
              <label htmlFor={dateId} className={styles.label}>
                {label} {rules?.required && <span aria-hidden="true">*</span>}
              </label>
            )}
            <AntDatePicker
              allowClear
              id={dateId}
              placeholder={placeholder}
              className={styles.input}
              value={valueAsDayjs}
              onChange={(date) =>
                field.onChange(date ? date.toISOString() : '')
              }
              disabledDate={transformDisabledDate}
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.error ? `${dateId}-error` : undefined
              }
            />
            {fieldState.error && (
              <p id={`${dateId}-error`} className={styles.error} role="alert">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};
