import { Button, message, Modal, Row, Spin } from 'antd';
import TextArea from '../form/TextArea';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateText, type ChatGPTResponse } from '../../services/chatgpt';
import MagicToolIcon from '../../assets/magic-tool.svg';

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
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, reset, watch } =
    useForm<SuggestionForm>({
      defaultValues: {
        UserInput: '',
        AISuggestion: '',
      },
    });

  useEffect(() => {
    if (isModalOpen) {
      reset({
        UserInput: field.value || '',
        AISuggestion: '',
      });
      if (field.value) {
        handleChatGPTSuggestionCall({
          UserInput: field.value,
          AISuggestion: '',
        });
      }
    }
  }, [isModalOpen, field.value, reset]);

  const AISuggestionValue = watch('AISuggestion');

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleChatGPTSuggestionCall = async (
    data: SuggestionForm,
    event?: React.BaseSyntheticEvent
  ) => {
    if (event) event.stopPropagation();
    setLoading(true);

    try {
      const response: ChatGPTResponse = await generateText(
        `Provide a concise suggestion based on the following input: ${data.UserInput}`
      );

      if (response.code) {
        if (response.code === 'TIMEOUT')
          message.error(t('applicationForm.messages.requestedTimeOut'));
        else if (response.code === 'NETWORK')
          message.error(t('applicationForm.messages.networkError'));
      }
      setValue('UserInput', '');
      setValue('AISuggestion', response.text, { shouldValidate: true });
    } catch (err) {
      message.error(t('applicationForm.messages.somethingWentWrong'));
    } finally {
      setLoading(false);
    }
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
    >
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          handleSubmit(handleChatGPTSuggestionCall)(e);
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
            color="purple"
            variant="solid"
            loading={loading}
            className="btn-sm btn"
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

        {!loading && AISuggestionValue && (
          <TextArea
            readOnly
            name="AISuggestion"
            control={control}
            placeholder={t('applicationForm.aiSuggestion.placeholder')}
            rows={5}
          />
        )}

        <Row justify="space-between" gutter={[16, 16]} className="mt-5">
          <Button
            onClick={handleClose}
            type="primary"
            className="btn btn-responsive btn-secondary"
          >
            {t('applicationForm.buttons.close')}
          </Button>
          {AISuggestionValue && (
            <Button
              onClick={() => handleFillAISuggestion()}
              type="primary"
              className="btn btn-responsive btn-primary"
              loading={loading}
            >
              {t('applicationForm.buttons.submit')}
            </Button>
          )}
        </Row>
      </form>
    </Modal>
  );
};

export default SuggestionModal;
