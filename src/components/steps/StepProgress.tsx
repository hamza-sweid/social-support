import { Steps } from 'antd';
import './StepProgress.module.scss';
import { useTranslation } from 'react-i18next';

const steps = [
  { title: 'personalInfo', content: 'First-content' },
  { title: 'familyInfo', content: 'Second-content' },
  { title: 'situationDescription', content: 'Last-content' },
];

const StepProgress = ({ currentStep }: { currentStep: number }) => {
  const { t } = useTranslation();

  const items = steps.map((item) => ({
    key: item.title,
    title: t(`applicationForm.steps.${item.title}`),
  }));

  return (
    <>
      <Steps responsive current={currentStep - 1} items={items} />
      <div className="step-content"></div>
    </>
  );
};

export default StepProgress;
