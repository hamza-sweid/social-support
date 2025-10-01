import { useForm } from 'react-hook-form';
import { Button, Row, Col } from 'antd';
import Input from '../../../../components/form/Input';
import Select from '../../../../components/form/Select';
import { DatePicker } from '../../../../components/form/DatePicker';
import styles from './Index.module.scss';
import { useFormContext } from '../../../../context/formContext/useFormContext';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
            label={t('applicationForm.fields.name.label')}
            placeholder={t('applicationForm.fields.name.placeholder')}
            rules={{ required: t('applicationForm.fields.name.required') }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Input
            name="nationalId"
            control={control}
            label={t('applicationForm.fields.nationalId.label')}
            placeholder={t('applicationForm.fields.nationalId.placeholder')}
            rules={{
              required: t('applicationForm.fields.nationalId.required'),
            }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <DatePicker
            name="dateOfBirth"
            control={control}
            label={t('applicationForm.fields.dob.label')}
            placeholder={t('applicationForm.fields.dob.placeholder')}
            rules={{ required: t('applicationForm.fields.dob.required') }}
            disabledDate={(current) => {
              return current > new Date();
            }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Select
            name="gender"
            control={control}
            label={t('applicationForm.fields.gender.label')}
            placeholder={t('applicationForm.fields.gender.placeholder')}
            options={[
              {
                label: t('applicationForm.fields.gender.options.male'),
                value: 'Male',
              },
              {
                label: t('applicationForm.fields.gender.options.female'),
                value: 'Female',
              },
              {
                label: t('applicationForm.fields.gender.options.preferNot'),
                value: 'Prefer not to say',
              },
            ]}
            rules={{ required: t('applicationForm.fields.gender.required') }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Input
            name="address"
            control={control}
            label={t('applicationForm.fields.address.label')}
            placeholder={t('applicationForm.fields.address.placeholder')}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Select
            name="country"
            control={control}
            label={t('applicationForm.fields.country.label')}
            placeholder={t('applicationForm.fields.country.placeholder')}
            options={[
              {
                label: t('applicationForm.fields.country.options.uae'),
                value: 'UAE',
              },
              {
                label: t('applicationForm.fields.country.options.uk'),
                value: 'UK',
              },
              {
                label: t('applicationForm.fields.country.options.sa'),
                value: 'SA',
              },
            ]}
            rules={{ required: t('applicationForm.fields.country.required') }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Select
            name="city"
            control={control}
            label={t('applicationForm.fields.city.label')}
            placeholder={t('applicationForm.fields.city.placeholder')}
            disabled={!selectedCountry}
            options={
              selectedCountry === 'UAE'
                ? [
                    {
                      label: t('applicationForm.fields.city.options.uae.dubai'),
                      value: 'Dubai',
                    },
                    {
                      label: t(
                        'applicationForm.fields.city.options.uae.abuDhabi'
                      ),
                      value: 'Abu Dhabi',
                    },
                  ]
                : selectedCountry === 'UK'
                ? [
                    {
                      label: t('applicationForm.fields.city.options.uk.london'),
                      value: 'London',
                    },
                    {
                      label: t(
                        'applicationForm.fields.city.options.uk.liverpool'
                      ),
                      value: 'Liverpool',
                    },
                    {
                      label: t(
                        'applicationForm.fields.city.options.uk.manchester'
                      ),
                      value: 'Manchester',
                    },
                  ]
                : selectedCountry === 'SA'
                ? [
                    {
                      label: t('applicationForm.fields.city.options.sa.riyadh'),
                      value: 'Riyadh',
                    },
                    {
                      label: t('applicationForm.fields.city.options.sa.jeddah'),
                      value: 'Jeddah',
                    },
                    {
                      label: t(
                        'applicationForm.fields.city.options.sa.madinah'
                      ),
                      value: 'Madinah',
                    },
                  ]
                : []
            }
            rules={{ required: t('applicationForm.fields.city.required') }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Input
            name="state"
            control={control}
            label={t('applicationForm.fields.state.label')}
            placeholder={t('applicationForm.fields.state.placeholder')}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Input
            name="phoneNumber"
            control={control}
            label={t('applicationForm.fields.phone.label')}
            placeholder={t('applicationForm.fields.phone.placeholder')}
            rules={{
              required: t('applicationForm.fields.phone.required'),
              pattern: {
                value: /^[0-9]{7,15}$/,
                message: t('applicationForm.fields.phone.invalid'),
              },
            }}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Input
            name="email"
            control={control}
            label={t('applicationForm.fields.email.label')}
            placeholder={t('applicationForm.fields.email.placeholder')}
            rules={{
              required: t('applicationForm.fields.email.required'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('applicationForm.fields.email.invalid'),
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
          {t('applicationForm.buttons.next')}
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfo;
