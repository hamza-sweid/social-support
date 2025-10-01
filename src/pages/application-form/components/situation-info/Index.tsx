import { useForm } from 'react-hook-form';
import TextArea from '../../../../components/form/TextArea';
import styles from './Index.module.scss';
import { Button, Col, Row } from 'antd';
import SuggestionModal from '../../../../components/modal/SuggestionModal';
import { useEffect, useState } from 'react';
import { useFormContext } from '../../../../context/formContext/useFormContext';
import { useTranslation } from 'react-i18next';
// import { generateText } from '../../../../service/chatgpt';

const stepName = 'situationInfo';
interface SituationDescriptionForm {
  currentFinancialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

export const SituationDescription = ({
  onPrevious,
}: {
  onPrevious: () => void;
}) => {
  const { t } = useTranslation();
  const { getStepValues, setStepValues } = useFormContext();
  const defaultValues = getStepValues(stepName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [field, setField] = useState({ name: '', label: '' });
  const { control, handleSubmit, getValues, reset, setValue } =
    useForm<SituationDescriptionForm>({
      defaultValues,
    });

  useEffect(() => {
    const saved = getStepValues(stepName);
    reset(saved);
  }, [getStepValues, reset, stepName]);

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

  const handlePrevious = () => {
    const currentValues = getValues();
    setStepValues(stepName, currentValues);
    onPrevious();
  };

  const onSubmit = (data: SituationDescriptionForm) => {
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
                label={t(
                  'applicationForm.fields.currentFinancialSituation.label'
                )}
                placeholder={t(
                  'applicationForm.fields.currentFinancialSituation.placeholder'
                )}
                rules={{
                  required: t(
                    'applicationForm.fields.currentFinancialSituation.required'
                  ),
                }}
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
                {t('applicationForm.buttons.helpMeWrite')}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row align={'middle'} gutter={16}>
            <Col span={18}>
              <TextArea
                name="employmentCircumstances"
                control={control}
                label={t(
                  'applicationForm.fields.employmentCircumstances.label'
                )}
                placeholder={t(
                  'applicationForm.fields.employmentCircumstances.placeholder'
                )}
                rules={{
                  required: t(
                    'applicationForm.fields.employmentCircumstances.required'
                  ),
                }}
              />
            </Col>
            <Col span={6}>
              <Button
                onClick={() =>
                  handleOpenSuggestionModal(
                    'employmentCircumstances',
                    'Employment Circumstances'
                  )
                }
              >
                {t('applicationForm.buttons.helpMeWrite')}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row align={'middle'} gutter={16}>
            <Col span={18}>
              <TextArea
                name="reasonForApplying"
                control={control}
                label={t('applicationForm.fields.reasonForApplying.label')}
                placeholder={t(
                  'applicationForm.fields.reasonForApplying.placeholder'
                )}
                rules={{
                  required: t(
                    'applicationForm.fields.reasonForApplying.required'
                  ),
                }}
              />
            </Col>
            <Col span={6}>
              <Button
                onClick={() =>
                  handleOpenSuggestionModal(
                    'reasonForApplying',
                    'Reason for Applying'
                  )
                }
              >
                {t('applicationForm.buttons.helpMeWrite')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className={styles.actions}>
        <Button
          onClick={() => handlePrevious()}
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
        fieldLabel={t(`applicationForm.fields.${field.name}.label`)}
        onFillAISuggestion={handleFillAISuggestion}
      />
    </form>
  );
};
