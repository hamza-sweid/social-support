import { Controller, type FieldValues } from 'react-hook-form';
import { Input as AntInput } from 'antd';
import styles from '../../styles/form.module.scss';
import type { InputProps } from '../../types/form';

export const TextArea = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  placeholder,
}: InputProps<T>) => {
  const inputId = `textarea-${String(name)}`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={styles.field}>
          {label && (
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
          )}
          <AntInput.TextArea
            {...field}
            id={inputId}
            placeholder={placeholder}
            rows={4}
            aria-invalid={fieldState.invalid}
            aria-describedby={fieldState.error ? `${inputId}-error` : undefined}
          />
          {fieldState.error && (
            <p id={`${inputId}-error`} className={styles.error} role="alert">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
