import { Controller, type FieldValues } from 'react-hook-form';
import { Select as AntSelect } from 'antd';
import type { SelectProps } from '../../types/form';
import styles from './form.module.scss';

const { Option } = AntSelect;

const Select = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  options,
  placeholder,
  disabled,
}: SelectProps<T>) => {
  const selectId = `select-${String(name)}`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={styles.field}>
          {label && (
            <label htmlFor={selectId} className={styles.label}>
              {label}
            </label>
          )}
          <AntSelect
            allowClear
            className={styles.input}
            disabled={disabled}
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
            {/* <Option value="" disabled hidden>
              {placeholder}
            </Option> */}
            {options.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </AntSelect>
          {fieldState.error && (
            <p id={`${selectId}-error`} className={styles.error} role="alert">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
export default Select;
