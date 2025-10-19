// ApplicationForm.tsx
import { useEffect } from 'react';
import PersonalInfo from './components/personal-info/PersonalInfo';
import { FamilyInfo } from './components/family-info/FamilyInfo';
import { SituationDescription } from './components/situation-info/SituationInfo';
import { useTranslation } from 'react-i18next';
import StepProgress from '../../components/steps/StepProgress';
import ApplicationLoader from '../../components/application-spinner/ApplicationSpinner';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  useApplicationForm,
  useFormSubmission,
  selectIsSubmitted,
} from '../../features/user-application';
import { useSelector } from 'react-redux';

const ApplicationForm = () => {
  const { t } = useTranslation();

  // 🔄 REPLACE: FormContext with Redux hooks
  const { currentStep, goToStep } = useApplicationForm();
  const { submitForm, isSubmitting } = useFormSubmission();
  const isSubmitted = useSelector(selectIsSubmitted);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const stepParam = searchParams.get('step');
  const urlStep = stepParam ? parseInt(stepParam, 10) : 1;

  // Sync URL with Redux state
  useEffect(() => {
    if (urlStep !== currentStep) {
      goToStep(urlStep);
    }
  }, [urlStep, currentStep, goToStep]);

  useEffect(() => {
    const isDataSubmitted = localStorage.getItem('isDataSubmitted');
    if (isDataSubmitted) {
      navigate('/user-data', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!stepParam || isNaN(Number(stepParam)) || Number(stepParam) < 1) {
      setSearchParams({ step: '1' });
    }
  }, [stepParam, setSearchParams]);

  // Navigate to user-data page after successful submission
  useEffect(() => {
    if (isSubmitted) {
      navigate('/user-data', { replace: true });
    }
  }, [isSubmitted, navigate]);

  const handleNext = () => {
    const nextStep = currentStep + 1;
    setSearchParams({ step: String(nextStep) });
    goToStep(nextStep);
  };

  const handlePrevious = () => {
    const prevStep = currentStep - 1;
    setSearchParams({ step: String(prevStep) });
    goToStep(prevStep);
  };

  // 🔄 REPLACE: Manual form submission with Redux
  const handleFinishForm = () => {
    submitForm(); // Redux saga handles everything automatically
  };

  return (
    <div className="container">
      <ApplicationLoader loading={isSubmitting} />
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
