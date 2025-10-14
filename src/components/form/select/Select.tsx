import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from 'react-hook-form';
import { Select as AntSelect } from 'antd';
import type { SelectProps } from '../../../types/form';
import { useEffect, useState } from 'react';
import styles from '../form.module.scss';

const { Option } = AntSelect;

type DynamicRulesFn<T extends FieldValues> = (
  value: any,
  dependencyValue: unknown
) => Partial<SelectProps<T>['rules']>;

const Select = <T extends FieldValues>({
  name,
  control,
  label,
  rules: initialRules,
  options,
  placeholder,
  disabled,
  dynamicRules,
  dependencyName, // optional name of a field this select depends on (e.g. "country")
}: SelectProps<T> & {
  dynamicRules?: DynamicRulesFn<T>;
  dependencyName?: Path<T>;
}) => {
  const selectId = `select-${String(name)}`;
  const { setValue, trigger, watch } = useFormContext<T>();
  const [rules, setRules] = useState(initialRules);

  // watch dependency (if provided). watch returns undefined if dependencyName is undefined.
  const dependencyValue = dependencyName
    ? watch(dependencyName as any)
    : undefined;

  // recompute rules when dependency changes
  useEffect(() => {
    if (dynamicRules) {
      // current value of this field (from form state)
      const currentVal = watch(name as any);
      const newRules = dynamicRules(currentVal, dependencyValue);
      setRules(newRules);
      // revalidate when dependency changes
      trigger(name as any);
    } else {
      // if no dynamicRules, keep initialRules but still re-trigger validation
      setRules(initialRules);
      trigger(name as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencyValue]); // run when dependency changes

  const handleChange = (value: any) => {
    if (dynamicRules) {
      const newRules = dynamicRules(value, dependencyValue);
      setRules(newRules);
      setValue(name as any, value, { shouldValidate: true });
      trigger(name as any);
    } else {
      setValue(name as any, value);
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
            allowClear
            className={styles.input}
            disabled={disabled}
            {...field}
            id={selectId}
            placeholder={placeholder}
            onChange={(value) => {
              field.onChange(value);
              handleChange(value);
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
