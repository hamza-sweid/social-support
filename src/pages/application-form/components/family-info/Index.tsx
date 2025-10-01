import { useForm } from 'react-hook-form';
import { Input } from '../../../../components/form/Input';
import { Select } from '../../../../components/form/Select';
import styles from './Index.module.scss';
import { Button, Col, Row } from 'antd';

interface FamilyInfoForm {
  dependents: number;
  monthlyIncome: number;
  maritalStatus: string;
  employmentStatus: string;
  housingStatus: string;
}

export const FamilyInfo = ({ onPrevious }: { onPrevious: () => void }) => {
  const { control, handleSubmit } = useForm<FamilyInfoForm>({
    defaultValues: {
      dependents: undefined,
      monthlyIncome: undefined,
      maritalStatus: '',
      employmentStatus: '',
      housingStatus: '',
    },
  });

  const onSubmit = (data: FamilyInfoForm) => {
    console.log('Family Info Submitted:', data);
    // Later: Save to context + localStorage
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
        <Button onClick={onPrevious} type="primary" className="btn-secondary">
          Previous
        </Button>
        <Button htmlType="submit" type="primary" className="btn-primary">
          Next
        </Button>
      </div>
    </form>
  );
};

export default FamilyInfo;
