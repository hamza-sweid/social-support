import { Controller, type FieldValues, type Path } from 'react-hook-form';
import { Select as AntSelect } from 'antd';
import type { SelectProps } from '../../../types/form';
import { useEffect, useState } from 'react';
import styles from '../form.module.scss';

const { Option } = AntSelect;

type DynamicRulesFn<T extends FieldValues> = (
  value: any,
  dependencyValue: unknown
) => Partial<SelectProps<T>['rules']>;

type ExtendedSelectProps<T extends FieldValues> = SelectProps<T> & {
  dynamicRules?: DynamicRulesFn<T>;
  dependencyName?: Path<T>;
  getValues?: () => T;
  trigger?: (name?: string | string[]) => Promise<boolean>;
  watch?: (name: Path<T>) => any;
};

const Select = <T extends FieldValues>({
  name,
  control,
  label,
  rules: initialRules,
  options,
  placeholder,
  disabled,
  dynamicRules,
  dependencyName,
  getValues,
  trigger,
  watch,
}: ExtendedSelectProps<T>) => {
  const selectId = `select-${String(name)}`;
  const [rules, setRules] = useState(initialRules);

  const dependencyValue =
    dependencyName && watch ? watch(dependencyName) : undefined;

  const getCurrentValue = () => {
    if (!getValues) return undefined;
    try {
      const allValues = getValues();
      return allValues[name as string];
    } catch {
      return undefined;
    }
  };

  useEffect(() => {
    if (dynamicRules && getValues) {
      const currentVal = getCurrentValue();
      const newRules = dynamicRules(currentVal, dependencyValue);
      setRules(newRules);

      if (trigger) {
        trigger(name as string);
      }
    } else {
      setRules(initialRules);
      if (trigger) {
        trigger(name as string);
      }
    }
  }, [dependencyValue, dynamicRules, getValues, trigger, name, initialRules]);

  const handleChange = (value: any, onChange: (value: any) => void) => {
    if (dynamicRules && getValues) {
      const newRules = dynamicRules(value, dependencyValue);
      setRules(newRules);

      onChange(value);

      if (trigger) {
        setTimeout(() => trigger(name as string), 0);
      }
    } else {
      onChange(value);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={styles.field}>
          {label && (
            <label htmlFor={selectId} className={styles.label}>
              {label} {rules?.required && <span aria-hidden="true">*</span>}
            </label>
          )}
          <AntSelect
            className={styles.input}
            disabled={disabled}
            {...field}
            id={selectId}
            placeholder={placeholder}
            onChange={(value) => {
              field.onChange(value);
              handleChange(value, field.onChange);
            }}
            value={field.value}
            aria-invalid={fieldState.invalid}
            aria-describedby={
              fieldState.error ? `${selectId}-error` : undefined
            }
          >
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
