import { Button, Col, Modal, Row, Spin } from 'antd';
import TextArea from '../form/TextArea';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface SuggestionForm {
  UserInput: string;
  AISuggestion: string;
}

const SuggestionModal = ({
  title = 'Get AI Suggestion',
  fieldLabel,
  isModalOpen,
  onClose,
  onFillAISuggestion = () => {},
}: {
  title?: string;
  fieldLabel: string;
  isModalOpen: boolean;
  onClose: () => void;
  onFillAISuggestion?: (data: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, reset, watch } =
    useForm<SuggestionForm>({
      defaultValues: {
        UserInput: '',
        AISuggestion: '',
      },
    });

  const AISuggestionValue = watch('AISuggestion');

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSuggestion = (
    data: SuggestionForm,
    event?: React.BaseSyntheticEvent
  ) => {
    if (event) event.stopPropagation();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setValue(
        'AISuggestion',
        '✅ This is a simulated AI-generated suggestion based on your input.',
        { shouldValidate: true }
      );
    }, 2000);
  };

  const handleFillAISuggestion = () => {
    onFillAISuggestion(AISuggestionValue);
    handleClose();
  };

  return (
    <Modal
      title={title}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onCancel={handleClose}
      footer={null}
    >
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          handleSubmit(handleSuggestion)(e);
        }}
      >
        <TextArea
          name="UserInput"
          control={control}
          rules={{ required: 'This field is required' }}
          label={
            <Row justify={'space-between'}>
              <Col>{fieldLabel}</Col>
            </Row>
          }
          placeholder="Inter your prompt here..."
          rows={2}
        />
        <Row justify="end" className="mb-5">
          <Button
            htmlType="submit"
            size="small"
            color="purple"
            variant="solid"
            loading={loading}
          >
            AI Suggestion
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
            placeholder="AI will suggest here..."
            rows={5}
          />
        )}

        <Row justify="space-between" gutter={16}>
          <Button
            onClick={handleClose}
            type="primary"
            className="btn-responsive btn-secondary"
          >
            Discard
          </Button>
          {AISuggestionValue && (
            <Button
              onClick={() => handleFillAISuggestion()}
              type="primary"
              className="btn-responsive btn-primary"
              loading={loading}
            >
              Submit
            </Button>
          )}
        </Row>
      </form>
    </Modal>
  );
};

export default SuggestionModal;
