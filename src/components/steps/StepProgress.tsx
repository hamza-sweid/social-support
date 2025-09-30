import { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import './StepProgress.module.scss';

const steps = [
  { title: 'First', content: 'First-content' },
  { title: 'Second', content: 'Second-content' },
  { title: 'Last', content: 'Last-content' },
];

const StepProgress = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps current={current} items={items} />
      <div
        className="step-content"
        style={{
          backgroundColor: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          border: `1px dashed ${token.colorBorder}`,
          color: token.colorTextTertiary,
        }}
      >
        {steps[current].content}
      </div>

      <div className="step-buttons">
        {current > 0 && (
          <Button className="prev-btn" onClick={prev}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default StepProgress;
