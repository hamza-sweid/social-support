import { useForm } from 'react-hook-form';
import TextArea from '../../../../components/form/TextArea';
import styles from './Index.module.scss';
import { Button, Col, Row } from 'antd';
import SuggestionModal from '../../../../components/modal/SuggestionModal';
import { useState } from 'react';
// import { generateText } from '../../../../service/chatgpt';

interface SituationDescriptionForm {
  currentFinancialSituation: string;
  EmploymentCircumstances: string;
  ReasonForApplying: string;
}

export const SituationDescription = ({
  onPrevious,
}: {
  onPrevious: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [field, setField] = useState({ name: '', label: '' });
  const { control, handleSubmit, setValue } = useForm<SituationDescriptionForm>(
    {
      defaultValues: {
        currentFinancialSituation: '',
        EmploymentCircumstances: '',
        ReasonForApplying: '',
      },
    }
  );

  const handleOpenSuggestionModal = (name: string, label: string) => {
    setField({ name, label });
    setIsModalOpen(true);
  };

  const handleCloseSuggestionModal = () => {
    setIsModalOpen(false);
    setField({ name: '', label: '' });
  };

  const handleFillAISuggestion = (data: string) => {
    setIsModalOpen(false);
    setValue(field.name as keyof SituationDescriptionForm, data, {
      shouldValidate: true,
    });
  };

  const onSubmit = (data: SituationDescriptionForm) => {
    console.log('Situation Description Submitted:', data);
    // Later: Save to context + localStorage
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
      <Row gutter={[32, 16]}>
        <Col span={24}>
          <Row align={'middle'} gutter={16}>
            <Col span={18}>
              <TextArea
                name="currentFinancialSituation"
                control={control}
                label="Current Financial Situation"
                placeholder="Describe your current financial situation"
                rules={{ required: 'This field is required' }}
              />
            </Col>
            <Col span={6}>
              <Button
                onClick={() =>
                  handleOpenSuggestionModal(
                    'currentFinancialSituation',
                    'Current Financial Situation'
                  )
                }
              >
                Help Me Write
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row align={'middle'} gutter={16}>
            <Col span={18}>
              <TextArea
                name="EmploymentCircumstances"
                control={control}
                label="Employment Circumstances"
                placeholder="Describe your current employment circumstances"
                rules={{ required: 'This field is required' }}
              />
            </Col>
            <Col span={6}>
              <Button
                onClick={() =>
                  handleOpenSuggestionModal(
                    'EmploymentCircumstances',
                    'Employment Circumstances'
                  )
                }
              >
                Help Me Write
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row align={'middle'} gutter={16}>
            <Col span={18}>
              <TextArea
                name="ReasonForApplying"
                control={control}
                label="Current Reason for Applying"
                placeholder="Describe your current Reason for Applying"
                rules={{ required: 'This field is required' }}
              />
            </Col>
            <Col span={6}>
              <Button
                onClick={() =>
                  handleOpenSuggestionModal(
                    'ReasonForApplying',
                    'Reason for Applying'
                  )
                }
              >
                Help Me Write
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className={styles.actions}>
        <Button
          onClick={onPrevious}
          type="primary"
          className="btn-responsive btn-secondary"
        >
          Previous
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          className="btn-responsive btn-primary"
        >
          Submit
        </Button>
      </div>

      <SuggestionModal
        isModalOpen={isModalOpen}
        onClose={() => handleCloseSuggestionModal()}
        fieldLabel={field.label}
        onFillAISuggestion={handleFillAISuggestion}
      />
    </form>
  );
};
