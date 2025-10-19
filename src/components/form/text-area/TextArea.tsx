import { Controller, type FieldValues } from 'react-hook-form';
import { Input as AntInput, Button } from 'antd';
import styles from '../form.module.scss';
import type { InputProps } from '../../../types/form';
import { useTranslation } from 'react-i18next';

interface ExtraProps<T extends FieldValues> extends InputProps<T> {
  actionLabel?: string;
  onActionClick?: () => void;
  actionLoading?: boolean;
  readOnly?: boolean;
  count?: { show: boolean; max: number };
}

const TextArea = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  placeholder,
  rows = 4,
  actionLabel,
  onActionClick,
  actionLoading = false,
  readOnly,
  count,
}: ExtraProps<T>) => {
  const inputId = `textarea-${String(name)}`;
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      // rules={rules}
      rules={{
        validate: (value: string) =>
          value.trim().length > 0 ||
          t('applicationForm.fields.currentFinancialSituation.required'),
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <div className={styles.field}>
          {label && (
            <label htmlFor={inputId} className={styles.label}>
              <span>
                {label} {rules?.required ? '*' : ''}
              </span>
            </label>
          )}

          <AntInput.TextArea
            count={count}
            readOnly={readOnly}
            {...field}
            id={inputId}
            placeholder={placeholder}
            rows={rows}
            aria-invalid={fieldState.invalid}
            aria-describedby={fieldState.error ? `${inputId}-error` : undefined}
          />
          {actionLabel && (
            <Button
              className="btn"
              type="primary"
              loading={actionLoading}
              onClick={onActionClick}
            >
              {actionLabel}
            </Button>
          )}

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

export default TextArea;
