import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../../../components/form/input/Input';
import Select from '../../../../components/form/select/Select';
import styles from './FamilyInfo.module.scss';
import { Button, Col, Row } from 'antd';
import { useFormContext } from '../../../../context/form-context/useFormContext';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretRightOutlined } from '@ant-design/icons';
import NumberInput from '../../../../components/form/input-number/InputNumber';

const stepName = 'familyInfo';

interface FamilyInfoForm {
  dependents: number;
  monthlyIncome: {
    amount: number | null;
    currency: string;
    isUpdated: boolean;
  };
  maritalStatus: string;
  employmentStatus: string;
  housingStatus: string;
}

export const FamilyInfo = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const methods = useForm();
  const { t } = useTranslation();
  const { getStepValues, setStepValues } = useFormContext();
  const defaultValues = getStepValues(stepName);

  const { control, handleSubmit, getValues, reset, setValue } =
    useForm<FamilyInfoForm>({
      defaultValues: {
        ...defaultValues,
        monthlyIncome: defaultValues.monthlyIncome || {
          amount: null,
          currency: 'AED',
          isUpdated: false,
        },
      },
    });

  useEffect(() => {
    const saved = getStepValues(stepName);
    reset(saved);
  }, [getStepValues, reset, stepName]);

  const handlePrevious = () => {
    const currentValues = getValues();
    setStepValues(stepName, currentValues);
    onPrevious();
  };

  const onSubmit = (data: FamilyInfoForm) => {
    setStepValues(stepName, data);
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
        <Row gutter={[32, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Input
              name="dependents"
              control={control}
              label={t('applicationForm.fields.dependents.label')}
              placeholder={t('applicationForm.fields.dependents.placeholder')}
              rules={{
                required: t('applicationForm.fields.dependents.required'),
              }}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <NumberInput
              name="monthlyIncome"
              control={control}
              getValues={getValues}
              setValue={setValue}
              label={t('applicationForm.fields.monthlyIncome.label')}
              placeholder={t(
                'applicationForm.fields.monthlyIncome.placeholder'
              )}
              rules={{
                required: t('applicationForm.fields.monthlyIncome.required'),
                validate: (value: {
                  amount: number | null;
                  currency: string;
                }) => {
                  if (!value?.amount)
                    return t('applicationForm.fields.monthlyIncome.required');
                  if (value.amount < 1)
                    return t('applicationForm.fields.monthlyIncome.min');
                  if (value.amount > 999999999)
                    return t('applicationForm.fields.monthlyIncome.max');
                  return true;
                },
              }}
              addonOptions={['AED', 'GBP', 'SAR']}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Select
              name="maritalStatus"
              control={control}
              label={t('applicationForm.fields.martialStatus.label')}
              placeholder={t(
                'applicationForm.fields.martialStatus.placeholder'
              )}
              rules={{
                required: t('applicationForm.fields.martialStatus.required'),
              }}
              options={[
                {
                  label: t(
                    'applicationForm.fields.martialStatus.options.single'
                  ),
                  value: 'single',
                },
                {
                  label: t(
                    'applicationForm.fields.martialStatus.options.married'
                  ),
                  value: 'married',
                },
                {
                  label: t(
                    'applicationForm.fields.martialStatus.options.divorced'
                  ),
                  value: 'divorced',
                },
                {
                  label: t(
                    'applicationForm.fields.martialStatus.options.widowed'
                  ),
                  value: 'widowed',
                },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Select
              name="employmentStatus"
              control={control}
              label={t('applicationForm.fields.employmentStatus.label')}
              placeholder={t(
                'applicationForm.fields.employmentStatus.placeholder'
              )}
              rules={{
                required: t('applicationForm.fields.employmentStatus.required'),
              }}
              options={[
                {
                  label: t(
                    'applicationForm.fields.employmentStatus.options.employed'
                  ),
                  value: 'employed',
                },
                {
                  label: t(
                    'applicationForm.fields.employmentStatus.options.unemployed'
                  ),
                  value: 'unemployed',
                },
                {
                  label: t(
                    'applicationForm.fields.employmentStatus.options.student'
                  ),
                  value: 'student',
                },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Select
              name="housingStatus"
              control={control}
              label={t('applicationForm.fields.housingStatus.label')}
              placeholder={t(
                'applicationForm.fields.housingStatus.placeholder'
              )}
              rules={{
                required: t('applicationForm.fields.housingStatus.required'),
              }}
              options={[
                {
                  label: t(
                    'applicationForm.fields.housingStatus.options.owned'
                  ),
                  value: 'owned',
                },
                {
                  label: t(
                    'applicationForm.fields.housingStatus.options.rented'
                  ),
                  value: 'rented',
                },
                {
                  label: t(
                    'applicationForm.fields.housingStatus.options.livingWithFamily'
                  ),
                  value: 'family',
                },
              ]}
            />
          </Col>
        </Row>

        <div className={styles.actions}>
          <Button
            onClick={handlePrevious}
            type="primary"
            className="btn btn-responsive btn-secondary"
            icon={<CaretRightOutlined rotate={180} />}
          >
            {t('applicationForm.buttons.previous')}
          </Button>
          <Button
            htmlType="submit"
            icon={<CaretRightOutlined />}
            iconPosition="end"
            className="btn btn-responsive btn-primary"
          >
            {t('applicationForm.buttons.next')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FamilyInfo;
