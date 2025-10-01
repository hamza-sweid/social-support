import { useForm } from 'react-hook-form';
import { Button, Row, Col } from 'antd';
import Input from '../../../../components/form/Input';
import Select from '../../../../components/form/Select';
import { DatePicker } from '../../../../components/form/DatePicker';
import styles from './Index.module.scss';
import { useFormContext } from '../../../../context/formContext/useFormContext';

const stepName = 'personalInfo';
interface PersonalInfoValues {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  address?: string;
  country: string;
  city: string;
  state?: string;
  phoneNumber: string;
  email: string;
}

const PersonalInfo = ({ onNext }: { onNext: () => void }) => {
  const { getStepValues, setStepValues } = useFormContext();
  const defaultValues = getStepValues(stepName);
  const { handleSubmit, control, watch } = useForm<PersonalInfoValues>({
    defaultValues,
  });

  const selectedCountry = watch('country');

  const onSubmit = (data: PersonalInfoValues) => {
    setStepValues(stepName, data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.personalInfo}>
      <Row gutter={[32, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Input
            name="name"
            control={control}
            label="Name"
            placeholder="Enter your name"
            rules={{ required: 'Name is required' }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Input
            name="nationalId"
            control={control}
            label="National ID"
            placeholder="Enter your national ID"
            rules={{ required: 'National ID is required' }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <DatePicker
            name="dateOfBirth"
            control={control}
            label="Date of Birth"
            placeholder="Select your date of birth"
            rules={{ required: 'Date of Birth is required' }}
            disabledDate={(current) => {
              return current > new Date();
            }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Select
            name="gender"
            control={control}
            label="Gender"
            placeholder="Select gender"
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
              { label: 'Prefer not to say', value: 'Prefer not to say' },
            ]}
            rules={{ required: 'Gender is required' }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Input
            name="address"
            control={control}
            label="Address"
            placeholder="Enter your address"
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Select
            name="country"
            control={control}
            label="Country"
            placeholder="Select country"
            options={[
              { label: 'United Arab Emirates', value: 'UAE' },
              { label: 'United Kingdom', value: 'UK' },
              { label: 'Saudi Arabia', value: 'SA' },
            ]}
            rules={{ required: 'Country is required' }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Select
            name="city"
            control={control}
            label="City"
            placeholder="Select city"
            disabled={!selectedCountry}
            options={
              selectedCountry === 'UAE'
                ? [
                    { label: 'Dubai', value: 'Dubai' },
                    { label: 'Abu Dhabi', value: 'Abu Dhabi' },
                  ]
                : selectedCountry === 'UK'
                ? [
                    { label: 'London', value: 'London' },
                    { label: 'Liverpool', value: 'Liverpool' },
                    { label: 'Manchester', value: 'Manchester' },
                  ]
                : selectedCountry === 'SA'
                ? [
                    { label: 'Riyadh', value: 'Riyadh' },
                    { label: 'Jeddah', value: 'Jeddah' },
                    { label: 'Madinah', value: 'Madinah' },
                  ]
                : []
            }
            rules={{ required: 'City is required' }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Input
            name="state"
            control={control}
            label="State"
            placeholder="Enter your state"
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Input
            name="phoneNumber"
            control={control}
            label="Phone Number"
            placeholder="Enter your phone number"
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{7,15}$/,
                message: 'Invalid phone number',
              },
            }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Input
            name="email"
            control={control}
            label="Email"
            placeholder="Enter your email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            }}
          />
        </Col>
      </Row>

      <div className={styles.actions}>
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

export default PersonalInfo;
