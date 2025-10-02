import { Controller, type FieldValues } from 'react-hook-form';
import { Input as AntInput } from 'antd';
import type { InputProps } from '../../types/form';
import styles from './form.module.scss';

const Input = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  placeholder,
}: InputProps<T>) => {
  const inputId = `input-${String(name)}`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={styles.field}>
          {label && (
            <label className={styles.label} htmlFor={inputId}>
              {label}
            </label>
          )}
          <AntInput
            allowClear
            {...field}
            id={inputId}
            className={styles.input}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            aria-describedby={fieldState.error ? `${inputId}-error` : undefined}
          />
          {fieldState.error && (
            <p id={`${inputId}-error`} role="alert" className={styles.error}>
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default Input;
