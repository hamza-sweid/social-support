import { FormProvider, useForm } from 'react-hook-form';
import styles from './SituationInfo.module.scss';
import { Button, Col, Row } from 'antd';
import SuggestionModal from '../../../../components/modal/SuggestionModal';
import { useEffect, useState } from 'react';
import { useApplicationForm } from '../../../../features/user-application';
import { useTranslation } from 'react-i18next';
import { CaretRightOutlined } from '@ant-design/icons';
import TextArea from '../../../../components/form/text-area/TextArea';

const stepName = 'situationInfo';
interface SituationDescriptionForm {
  currentFinancialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

export const SituationDescription = ({
  onPrevious,
  finishForm,
}: {
  onPrevious: () => void;
  finishForm: () => void;
}) => {
  const methods = useForm();
  const { t } = useTranslation();
  const { getStepData, saveStepData } = useApplicationForm();
  const defaultValues = getStepData(stepName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [field, setField] = useState({ name: '', label: '', value: '' });
  const { control, handleSubmit, getValues, reset, setValue } =
    useForm<SituationDescriptionForm>({
      defaultValues: (defaultValues as any) || {},
    });

  useEffect(() => {
    const saved = getStepData(stepName);
    if (saved) {
      reset(saved as any);
    }
  }, [getStepData, reset, stepName]);

  const handleOpenSuggestionModal = (name: string, label: string) => {
    const currentValue = getValues(name as keyof SituationDescriptionForm);
    setField({ name, label, value: currentValue || '' });
    setIsModalOpen(true);
  };

  const handleCloseSuggestionModal = () => {
    setIsModalOpen(false);
    setField({ name: '', label: '', value: '' });
  };

  const handleFillAISuggestion = (data: string) => {
    setIsModalOpen(false);
    setValue(field.name as keyof SituationDescriptionForm, data, {
      shouldValidate: true,
    });
  };

  const handlePrevious = () => {
    const currentValues = getValues();
    saveStepData({ step: stepName, data: currentValues });
    onPrevious();
  };

  const onSubmit = (data: SituationDescriptionForm) => {
    saveStepData({ step: stepName, data });
    finishForm();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
        <Row gutter={[32, 50]}>
          <Col span={24}>
            <Row align={'middle'} gutter={32}>
              <Col flex={'auto'} xs={24} lg={18}>
                <TextArea
                  count={{
                    show: true,
                    max: 2000,
                  }}
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
                    minLength: {
                      value: 20,
                      message: t(
                        'applicationForm.fields.currentFinancialSituation.minLength'
                      ),
                    },
                    maxLength: {
                      value: 2000,
                      message: t(
                        'applicationForm.fields.currentFinancialSituation.maxLength'
                      ),
                    },
                  }}
                />
              </Col>
              <Col xs={24} lg={6}>
                <Button
                  className="btn"
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
            <Row align={'middle'} gutter={32}>
              <Col xs={24} lg={18}>
                <TextArea
                  count={{
                    show: true,
                    max: 2000,
                  }}
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
                    minLength: {
                      value: 20,
                      message: t(
                        'applicationForm.fields.currentFinancialSituation.minLength'
                      ),
                    },
                    maxLength: {
                      value: 2000,
                      message: t(
                        'applicationForm.fields.currentFinancialSituation.maxLength'
                      ),
                    },
                  }}
                />
              </Col>
              <Col xs={24} lg={6}>
                <Button
                  className="btn"
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
            <Row align={'middle'} gutter={32}>
              <Col xs={24} lg={18}>
                <TextArea
                  count={{
                    show: true,
                    max: 2000,
                  }}
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
                    minLength: {
                      value: 20,
                      message: t(
                        'applicationForm.fields.currentFinancialSituation.minLength'
                      ),
                    },
                    maxLength: {
                      value: 2000,
                      message: t(
                        'applicationForm.fields.currentFinancialSituation.maxLength'
                      ),
                    },
                  }}
                />
              </Col>
              <Col xs={24} lg={6}>
                <Button
                  className="btn"
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
            className="btn btn-responsive btn-secondary"
            icon={<CaretRightOutlined rotate={180} />}
          >
            {t('applicationForm.buttons.previous')}
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            className="btn btn-responsive btn-primary"
          >
            {t('applicationForm.buttons.submit')}
          </Button>
        </div>

        {isModalOpen && (
          <SuggestionModal
            isModalOpen={isModalOpen}
            onClose={() => handleCloseSuggestionModal()}
            field={{ name: field.name, value: field.value }}
            onFillAISuggestion={handleFillAISuggestion}
          />
        )}
      </form>
    </FormProvider>
  );
};
