import { useState } from 'react';
import PersonalInfo from './components/personal-info/Index';
import styles from './Index.module.scss';
import { FamilyInfo } from './components/family-info/Index';
import { SituationDescription } from './components/situation-info/Index';
import { useTranslation } from 'react-i18next';
import StepProgress from '../../components/steps/StepProgress';
import { Button, Modal } from 'antd';
import { useFormContext } from '../../context/formContext/useFormContext';

const ApplicationForm = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isFormDataModalOpen, setIsFormDataModalOpen] = useState(false);
  const { formData } = useFormContext();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinishForm = () => {
    setIsFormDataModalOpen(true);
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
        {step === 3 && (
          <SituationDescription
            onPrevious={() => setStep(2)}
            finishForm={() => handleFinishForm()}
          />
        )}
      </div>

      {isFormDataModalOpen && (
        <Modal
          title={t('applicationForm.submittedData')}
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isFormDataModalOpen}
          footer={null}
        >
          {JSON.stringify(formData, null, 2)}

          <Button
            onClick={() => {
              setIsFormDataModalOpen(false);
              localStorage.removeItem('formData');
              window.location.reload();
            }}
            type="primary"
            className="btn-responsive btn-secondary"
          >
            {t('applicationForm.buttons.close')}
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default ApplicationForm;
