import { Steps } from 'antd';
import styles from './StepProgress.module.scss';
import { useTranslation } from 'react-i18next';

const steps = [
  { title: 'personalInfo', content: 'First-content' },
  { title: 'familyInfo', content: 'Second-content' },
  { title: 'situationInfo', content: 'Last-content' },
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
