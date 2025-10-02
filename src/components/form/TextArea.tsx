import { Controller, type FieldValues } from 'react-hook-form';
import { Input as AntInput, Button, Space } from 'antd';
import styles from './form.module.scss';
import type { InputProps } from '../../types/form';

interface ExtraProps<T extends FieldValues> extends InputProps<T> {
  actionLabel?: string;
  onActionClick?: () => void;
  actionLoading?: boolean;
  readOnly?: boolean;
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
}: ExtraProps<T>) => {
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

          <Space.Compact
            style={{ width: '100%' }}
            className={styles.compactWrapper}
          >
            <AntInput.TextArea
              readOnly={readOnly}
              {...field}
              id={inputId}
              placeholder={placeholder}
              rows={rows}
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.error ? `${inputId}-error` : undefined
              }
            />
            {actionLabel && (
              <Button
                type="primary"
                loading={actionLoading}
                onClick={onActionClick}
              >
                {actionLabel}
              </Button>
            )}
          </Space.Compact>

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
