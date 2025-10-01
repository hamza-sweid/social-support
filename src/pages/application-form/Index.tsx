import { useState } from 'react';
import PersonalInfo from './components/personal-info/Index';
import styles from './Index.module.scss';
import { FamilyInfo } from './components/family-info/Index';
import { SituationDescription } from './components/situation-info/Index';
import { useTranslation } from 'react-i18next';
import StepProgress from '../../components/steps/StepProgress';

const ApplicationForm = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <h1>{t('applicationForm.title')}</h1>
      <StepProgress currentStep={step} />
      <div className={styles.stepWrapper}>
        {step === 1 && <PersonalInfo onNext={handleNext} />}
        {step === 2 && (
          <FamilyInfo onNext={handleNext} onPrevious={() => setStep(1)} />
        )}
        {step === 3 && <SituationDescription onPrevious={() => setStep(2)} />}
      </div>
    </div>
  );
};

export default ApplicationForm;
