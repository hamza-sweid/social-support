import { Controller, type FieldValues } from 'react-hook-form';
import { Select as AntSelect } from 'antd';
import type { SelectProps } from '../../types/Form';

const { Option } = AntSelect;

export const Select = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  options,
  placeholder,
}: SelectProps<T>) => {
  const selectId = `select-${String(name)}`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div style={{ marginBottom: '16px' }}>
          {label && (
            <label
              htmlFor={selectId}
              style={{ display: 'block', marginBottom: '4px' }}
            >
              {label}
            </label>
          )}
          <AntSelect
            {...field}
            id={selectId}
            placeholder={placeholder}
            onChange={(value) => field.onChange(value)}
            value={field.value}
            aria-invalid={fieldState.invalid}
            aria-describedby={
              fieldState.error ? `${selectId}-error` : undefined
            }
            style={{ width: '100%' }}
          >
            {options.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </AntSelect>
          {fieldState.error && (
            <p
              id={`${selectId}-error`}
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
