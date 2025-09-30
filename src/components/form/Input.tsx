import { Controller, type FieldValues } from 'react-hook-form';
import { Input as AntInput } from 'antd';
import type { InputProps } from '../../types/Form';

export const Input = <T extends FieldValues>({
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
        <div style={{ marginBottom: '16px' }}>
          {label && <label htmlFor={inputId}>{label}</label>}
          <AntInput
            {...field}
            id={inputId}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            aria-describedby={fieldState.error ? `${inputId}-error` : undefined}
          />
          {fieldState.error && (
            <p
              id={`${inputId}-error`}
              role="alert"
              style={{ color: 'red', fontSize: '12px' }}
            >
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
