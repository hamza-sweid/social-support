// src/pages/application-form/Index.tsx
import { useState } from 'react';
import PersonalInfo from './components/personal-info/Index';
import styles from './Index.module.scss';

const ApplicationForm = () => {
  const [step, setStep] = useState(1);
  // const nextStep = () => setStep((prev) => prev + 1);
  // const prevStep = () => setStep((prev) => prev - 1);

  const handleNext = () => {
    console.log('Next step');
    // save to localstorage using context
    // set new current step
  };

  return (
    <div className={styles.container}>
      <h1>Social Support Application</h1>
      <div className={styles.stepWrapper}>
        {step === 1 && <PersonalInfo onNext={handleNext} />}
        {/* Later we will add Step2, Step3 here */}
      </div>
      {/* <div className={styles.actions}>
        {step > 1 && <button onClick={prevStep}>Previous</button>}
        {step < 3 && <button onClick={nextStep}>Next</button>}
      </div> */}
    </div>
  );
};

export default ApplicationForm;
