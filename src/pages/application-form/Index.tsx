// ApplicationForm.tsx
import { useState, useEffect } from 'react';
import PersonalInfo from './components/personal-info/PersonalInfo';
import { FamilyInfo } from './components/family-info/FamilyInfo';
import { SituationDescription } from './components/situation-info/SituationInfo';
import { useTranslation } from 'react-i18next';
import StepProgress from '../../components/steps/StepProgress';
import { useFormContext } from '../../context/form-context/useFormContext';
import { submitUserApplicationSupport } from '../../services/chatgpt';
import ApplicationLoader from '../../components/application-spinner/Index';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const ApplicationForm = () => {
  const { t } = useTranslation();
  const { formData } = useFormContext();
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const stepParam = searchParams.get('step');
  const currentStep = stepParam ? parseInt(stepParam, 10) : 1;

  useEffect(() => {
    const isDataSubmitted = localStorage.getItem('isDataSubmitted');
    if (isDataSubmitted) {
      navigate('/application-form?step=1', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (!stepParam || isNaN(Number(stepParam)) || Number(stepParam) < 1) {
      setSearchParams({ step: '1' });
    }
  }, [stepParam, setSearchParams]);

  const handleNext = () => {
    setSearchParams({ step: String(currentStep + 1) });
  };

  const handlePrevious = () => {
    setSearchParams({ step: String(currentStep - 1) });
  };

  const handleFinishForm = async () => {
    try {
      setLoading(true);
      const response = await submitUserApplicationSupport(formData);
      if (response.success) {
        message.success(t('applicationForm.messages.submitSuccess'));
        navigate('/user-data', { replace: true });
      }
    } catch (error) {
      message.error(t('applicationForm.messages.submitError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <ApplicationLoader loading={loading} />
      <h1>{t('applicationForm.title')}</h1>
      <StepProgress currentStep={currentStep} />
      <div className="mt-5">
        {currentStep === 1 && <PersonalInfo onNext={handleNext} />}
        {currentStep === 2 && (
          <FamilyInfo onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 3 && (
          <SituationDescription
            onPrevious={handlePrevious}
            finishForm={handleFinishForm}
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
