import { Button, Col, Modal, Row, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MagicToolIcon from '../../assets/magic-tool.svg';
import TextArea from '../form/text-area/TextArea';
import { useAiSuggestions } from '../../features/user-application';

interface SuggestionForm {
  UserInput: string;
  AISuggestion: string;
}

const SuggestionModal = ({
  field,
  isModalOpen,
  onClose,
  onFillAISuggestion = () => {},
}: {
  field: { name: string; value: string };
  isModalOpen: boolean;
  onClose: () => void;
  onFillAISuggestion?: (data: string) => void;
}) => {
  const { t } = useTranslation();

  // Use Redux for AI suggestions instead of local state
  const { loading, generateSuggestion, getSuggestion } = useAiSuggestions();

  const { control, handleSubmit, setValue, reset, watch } =
    useForm<SuggestionForm>({
      defaultValues: {
        UserInput: '',
        AISuggestion: '',
      },
    });

  useEffect(() => {
    if (isModalOpen) {
      // Reset form with current field value
      reset({
        UserInput: field.value || '',
        AISuggestion: '',
      });

      if (field.value && field.value !== getSuggestion(field.name)) {
        generateSuggestion(field.name, field.value);
      }
    }
  }, [isModalOpen]);

  // Watch for new suggestions from Redux and update form
  useEffect(() => {
    if (isModalOpen) {
      const currentSuggestion = getSuggestion(field.name);
      if (currentSuggestion && !loading) {
        setValue('AISuggestion', currentSuggestion, { shouldValidate: true });
      }
    }
  }, [isModalOpen, field.name, loading, getSuggestion, setValue]);

  const AISuggestionValue = watch('AISuggestion');

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleGenerateAiSuggestion = (
    data: SuggestionForm,
    event?: React.BaseSyntheticEvent
  ) => {
    if (event) event.stopPropagation();

    // Use Redux action to generate AI suggestion
    generateSuggestion(field.name, data.UserInput);
  };

  const handleFillAISuggestion = () => {
    onFillAISuggestion(AISuggestionValue);
    handleClose();
  };

  return (
    <Modal
      title={t('applicationForm.buttons.getAISuggestion')}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onCancel={handleClose}
      footer={null}
      style={{ paddingInline: 10 }}
    >
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          handleSubmit(handleGenerateAiSuggestion)(e);
        }}
      >
        <TextArea
          name="UserInput"
          control={control}
          rules={{
            required: t(
              'applicationForm.fields.currentFinancialSituation.required'
            ),
          }}
          label={t(`applicationForm.fields.${field.name}.label`)}
          placeholder={t('applicationForm.fields.default.placeHolder')}
          rows={2}
        />
        <Row justify="end" className="mb-5">
          <Button
            htmlType="submit"
            loading={loading}
            className="btn-sm btn-secondary"
            icon={<img className="pt-1" src={MagicToolIcon} alt="magic tool" />}
          >
            {t('applicationForm.buttons.getAISuggestion')}
          </Button>
        </Row>

        {loading && (
          <Row justify="center" className="mb-5">
            <Spin />
          </Row>
        )}

        {!loading && AISuggestionValue && field.value !== AISuggestionValue && (
          <TextArea
            readOnly
            name="AISuggestion"
            control={control}
            placeholder={t('applicationForm.aiSuggestion.placeholder')}
            rows={5}
          />
        )}

        <Row gutter={[16, 16]} className="mt-5">
          <Col span={24} order={2} md={{ span: 12, order: 1 }}>
            <Button
              onClick={handleClose}
              type="primary"
              className="btn btn-responsive btn-secondary"
            >
              {t('applicationForm.buttons.close')}
            </Button>
          </Col>
          {AISuggestionValue && field.value !== AISuggestionValue && (
            <Col
              span={24}
              order={1}
              md={{ span: 12, order: 2 }}
              className="text-right"
            >
              <Button
                onClick={() => handleFillAISuggestion()}
                type="primary"
                className="btn btn-responsive btn-primary"
                loading={loading}
              >
                {t('applicationForm.buttons.submit')}
              </Button>
            </Col>
          )}
        </Row>
      </form>
    </Modal>
  );
};

export default SuggestionModal;
