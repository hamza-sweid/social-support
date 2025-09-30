import React from 'react';
import { Row, Col, Input, DatePicker, Select, Form, Button } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styles from './Index.module.scss';

type PersonalInfoValues = {
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
};

interface Props {
  onNext?: () => void;
}

const { Option } = Select;

const PersonalInfo: React.FC<Props> = ({ onNext }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalInfoValues>({
    defaultValues: {
      name: '',
      nationalId: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      country: '',
      city: '',
      state: '',
      phoneNumber: '',
      email: '',
    },
  });

  const selectedCountry = watch('country');

  const submitHandler = (data: PersonalInfoValues) => {
    console.log('Step 1 values:', data);
    if (onNext) onNext();
  };

  return (
    <Form
      layout="vertical"
      className={styles.personalInfo}
      onFinish={handleSubmit(submitHandler)}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label="Name"
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter your full name" />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label="National ID"
            validateStatus={errors.nationalId ? 'error' : ''}
            help={errors.nationalId?.message}
          >
            <Controller
              name="nationalId"
              control={control}
              rules={{ required: 'National ID is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter National ID" />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label="Date of Birth"
            validateStatus={errors.dateOfBirth ? 'error' : ''}
            help={errors.dateOfBirth?.message}
          >
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: 'Date of Birth is required' }}
              render={({ field }) => (
                <DatePicker
                  onChange={(date, dateString) => field.onChange(dateString)}
                  placeholder="Select Date of Birth"
                  style={{ width: '100%' }}
                />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label="Gender"
            validateStatus={errors.gender ? 'error' : ''}
            help={errors.gender?.message}
          >
            <Controller
              name="gender"
              control={control}
              rules={{ required: 'Gender is required' }}
              render={({ field }) => (
                <Select {...field} placeholder="Select gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Prefer not to say">Prefer not to say</Option>
                </Select>
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Form.Item label="Address">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter your address" />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label="Country"
            validateStatus={errors.country ? 'error' : ''}
            help={errors.country?.message}
          >
            <Controller
              name="country"
              control={control}
              rules={{ required: 'Country is required' }}
              render={({ field }) => (
                <Select {...field} placeholder="Select country">
                  <Option value="United Arab Emirates">
                    United Arab Emirates
                  </Option>
                  <Option value="United Kingdom">United Kingdom</Option>
                  <Option value="Saudi Arabia">Saudi Arabia</Option>
                </Select>
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label="City"
            validateStatus={errors.city ? 'error' : ''}
            help={errors.city?.message}
          >
            <Controller
              name="city"
              control={control}
              rules={{ required: 'City is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select city"
                  disabled={!selectedCountry}
                >
                  {selectedCountry === 'United Arab Emirates' && (
                    <>
                      <Option value="Dubai">Dubai</Option>
                      <Option value="Abu Dhabi">Abu Dhabi</Option>
                    </>
                  )}
                  {selectedCountry === 'United Kingdom' && (
                    <>
                      <Option value="London">London</Option>
                      <Option value="Liverpool">Liverpool</Option>
                      <Option value="Manchester">Manchester</Option>
                    </>
                  )}
                  {selectedCountry === 'Saudi Arabia' && (
                    <>
                      <Option value="Riyadh">Riyadh</Option>
                      <Option value="Jeddah">Jeddah</Option>
                      <Option value="Madinah">Madinah</Option>
                    </>
                  )}
                </Select>
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Form.Item label="State">
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter your state" />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label="Phone Number"
            validateStatus={errors.phoneNumber ? 'error' : ''}
            help={errors.phoneNumber?.message}
          >
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{7,15}$/,
                  message: 'Invalid phone number',
                },
              }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter phone number" />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter email address" />
              )}
            />
          </Form.Item>
        </Col>
      </Row>
      <div className={styles.actions}>
        <Button
          className="btn-responsive btn-primary secondary"
          type="default"
          htmlType="submit"
        >
          Next
        </Button>
      </div>
    </Form>
  );
};

export default PersonalInfo;
