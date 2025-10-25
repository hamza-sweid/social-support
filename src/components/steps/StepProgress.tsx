import { Steps } from 'antd';
import styles from './StepProgress.module.scss';
import { useTranslation } from 'react-i18next';
import { FormStepValue } from '../../types/enum';

const steps = [
  { title: FormStepValue.PERSONAL_INFO },
  { title: FormStepValue.FAMILY_INFO },
  { title: FormStepValue.SITUATION_INFO },
];

const StepProgress = ({ currentStep }: { currentStep: number }) => {
  const { t } = useTranslation();

  const items = steps.map((item) => ({
    key: item.title,
    title: t(`applicationForm.steps.${item.title}`),
  }));

  return (
    <div className={styles.stepProgress}>
      <Steps responsive current={currentStep - 1} items={items} />
      <div className={styles.stepContent}></div>
    </div>
  );
};

export default StepProgress;
