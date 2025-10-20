import { Controller, type FieldValues, type PathValue } from 'react-hook-form';
import { Input as AntInput } from 'antd';
import type { InputProps } from '../../../types/form';
import { useState } from 'react';
import styles from '../form.module.scss';
import { useTranslation } from 'react-i18next';

const Input = <T extends FieldValues>({
  name,
  control,
  label,
  rules: initialRules,
  placeholder,
  dynamicRules,
}: InputProps<T> & {
  dynamicRules?: (value: string) => Partial<InputProps<T>['rules']>;
}) => {
  const inputId = `input-${String(name)}`;
  const [rules, setRules] = useState(initialRules);
  const { t } = useTranslation();

  const handleChange = (
    value: PathValue<T, typeof name>,
    onChange: (value: any) => void
  ) => {
    if (dynamicRules) {
      const newRules = dynamicRules(value);
      setRules(newRules);
    }
    onChange(value);
  };

  return (
    <Controller // bridges uncontrolled components (like Ant Input) with React Hook Form
      name={name}
      control={control}
      rules={{
        validate: (value: string) =>
          value.trim().length > 0 ||
          t('applicationForm.fields.currentFinancialSituation.required'),
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <div className={styles.field}>
          {label && (
            <label className={styles.label} htmlFor={inputId}>
              {label} {rules?.required && <span aria-hidden="true">*</span>}
            </label>
          )}
          <AntInput
            allowClear
            {...field} // spread field props (onChange, onBlur, name, value, ref)
            id={inputId} // ensure id is set for accessibility which links label to input
            className={styles.input}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid} // indicate if the field is invalid for accessibility which means screen readers will announce it
            aria-describedby={fieldState.error ? `${inputId}-error` : undefined}
            onChange={(e: any) => {
              field.onChange(e);
              handleChange(e.target.value, field.onChange);
            }}
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
