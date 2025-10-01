import { useForm } from 'react-hook-form';
import Input from '../../../../components/form/Input';
import Select from '../../../../components/form/Select';
import styles from './Index.module.scss';
import { Button, Col, Row } from 'antd';
import { useFormContext } from '../../../../context/formContext/useFormContext';
import { useEffect } from 'react';

const stepName = 'familyInfo';
interface FamilyInfoForm {
  dependents: number;
  monthlyIncome: number;
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
  const { getStepValues, setStepValues } = useFormContext();
  const defaultValues = getStepValues(stepName);
  const { control, handleSubmit, getValues, reset } = useForm<FamilyInfoForm>({
    defaultValues,
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
      <Row gutter={[32, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Input
            name="dependents"
            control={control}
            label="Dependents"
            placeholder="Enter number of dependents"
            rules={{ required: 'Dependents are required' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Input
            name="monthlyIncome"
            control={control}
            label="Monthly Income"
            placeholder="Enter your monthly income"
            rules={{ required: 'Monthly income is required' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Select
            name="maritalStatus"
            control={control}
            label="Marital Status"
            placeholder="Select marital status"
            rules={{ required: 'Marital status is required' }}
            options={[
              { label: 'Single', value: 'single' },
              { label: 'Married', value: 'married' },
              { label: 'Divorced', value: 'divorced' },
              { label: 'Widowed', value: 'widowed' },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Select
            name="employmentStatus"
            control={control}
            label="Employment Status"
            placeholder="Select employment status"
            rules={{ required: 'Employment status is required' }}
            options={[
              { label: 'Employed', value: 'employed' },
              { label: 'Unemployed', value: 'unemployed' },
              { label: 'Self-Employed', value: 'selfEmployed' },
              { label: 'Student', value: 'student' },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Select
            name="housingStatus"
            control={control}
            label="Housing Status"
            placeholder="Select housing status"
            rules={{ required: 'Housing status is required' }}
            options={[
              { label: 'Owned', value: 'owned' },
              { label: 'Rented', value: 'rented' },
              { label: 'Living with family', value: 'family' },
              { label: 'Other', value: 'other' },
            ]}
          />
        </Col>
      </Row>

      <div className={styles.actions}>
        <Button
          onClick={() => handlePrevious()}
          type="primary"
          className="btn-responsive btn-secondary"
        >
          Previous
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          className="btn-responsive btn-primary"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default FamilyInfo;
