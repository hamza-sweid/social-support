import { useState, useEffect } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { InputNumber, Select } from 'antd';
import styles from '../form.module.scss';
import type { InputNumberProps } from '../../../types/form';

const { Option } = Select;

const formatter: InputNumberProps<any>['formatter'] = (value) => {
  if (value === undefined || value === null) return '';
  const [start, end] = `${value}`.split('.') || [];
  const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${end ? `${v}.${end}` : v}`;
};

const currencyMap: Record<string, string> = {
  UAE: 'AED',
  UK: 'GBP',
  SA: 'SAR',
};

const NumberInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
  min,
  max,
  step = 1,
  addonOptions,
  getValues,
  setValue,
}: InputNumberProps<T>) => {
  const [currency, setCurrency] = useState<string>('');

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem('formData') || '{}');
    const country = savedData?.personalInfo?.country;
    const isCurrencyUpdated = savedData?.familyInfo?.monthlyIncome?.isUpdated;
    if (country && currencyMap[country]) {
      if (isCurrencyUpdated) {
        setCurrency(savedData?.familyInfo?.monthlyIncome?.currency || '');
      } else setCurrency(currencyMap[country]);
    } else setCurrency(addonOptions?.[0] || '');
  }, [addonOptions]);

  const selectAfter = (
    <Select
      value={currency}
      onChange={(val) => {
        setCurrency(val);
        const currentAmount =
          (getValues && getValues(name as any)?.amount) || 0;
        setValue &&
          setValue(
            name as any,
            { amount: currentAmount, currency: val, isUpdated: true } as any,
            { shouldValidate: true }
          );
      }}
    >
      {addonOptions?.map((option: string) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label} {rules?.required && <span aria-hidden="true">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const valueObj =
            typeof field.value === 'object'
              ? field.value
              : { amount: field.value || 0, currency };
          return (
            <>
              <InputNumber
                value={valueObj.amount}
                onChange={(val) => field.onChange({ amount: val, currency })}
                id={name}
                min={min}
                max={max}
                step={step}
                className={styles.input}
                placeholder={placeholder}
                formatter={formatter}
                addonAfter={selectAfter}
              />
              {fieldState.error && (
                <p id={`${name}-error`} className={styles.error} role="alert">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default NumberInput;
