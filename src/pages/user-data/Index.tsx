import { Button, Col, Row, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { fieldTranslationKeys } from './constants';
import styles from './UserData.module.scss';
import { useNavigate } from 'react-router';
import { EditOutlined } from '@ant-design/icons';
import {
  useApplicationForm,
  resetSubmission,
} from '../../features/user-application';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';

const { Panel } = Collapse;
const stepOrder = ['personalInfo', 'familyInfo', 'situationInfo'];

const SummaryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { formData } = useApplicationForm();
  const savedData = formData;

  const handleUserDataUpdate = () => {
    // Reset localStorage flag to allow editing
    localStorage.removeItem('isDataSubmitted');

    // Reset only the submission state, keep the form data intact
    dispatch(resetSubmission());

    // Navigate to step 1 with data pre-filled
    navigate('/application-form?step=1', { replace: true });
  };

  return (
    <div className="container">
      <Row justify="space-between" align="middle" className="mb-4">
        <h1>{t('userData.title')}</h1>
        <Button
          className="btn btn-primary"
          onClick={() => handleUserDataUpdate()}
          icon={<EditOutlined />}
        >
          {t('applicationForm.buttons.update')}
        </Button>
      </Row>

      <Collapse className={styles.collapse} defaultActiveKey={[stepOrder[0]]}>
        {stepOrder.map((stepName) => {
          const stepData = (savedData as any)[stepName];
          if (!stepData) return null;

          return (
            <Panel
              key={stepName}
              header={t(`applicationForm.steps.${stepName}`)}
            >
              <Row gutter={[16, 16]}>
                {Object.entries(stepData).map(([fieldName, value]) => {
                  let displayValue: React.ReactNode;

                  if (
                    value &&
                    typeof value === 'object' &&
                    'amount' in (value as any) &&
                    'currency' in (value as any)
                  ) {
                    const val = value as {
                      amount: number | string;
                      currency: string;
                    };
                    displayValue = `${val.amount} ${val.currency}`;
                  } else {
                    displayValue = value as React.ReactNode;
                  }

                  return (
                    <Col xs={24} md={12} key={fieldName}>
                      <strong>
                        {t(fieldTranslationKeys[fieldName] || fieldName)}:
                      </strong>{' '}
                      {displayValue}
                    </Col>
                  );
                })}
              </Row>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default SummaryPage;
