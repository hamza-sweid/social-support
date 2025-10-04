import { Button, message, Space } from 'antd';
import React from 'react';
import i18next from 'i18next';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };
  private hasShownMessage = false;

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (!this.hasShownMessage) {
      message.error(i18next.t('errorBoundary.SomethingWentWrong'));
      this.hasShownMessage = true;
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
    this.hasShownMessage = false;
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-5">
          <h1>{i18next.t('errorBoundary.SomethingWentWrong')}</h1>
          <p>{i18next.t('errorBoundary.refreshThePage')}</p>
          <Space size="middle">
            <Button onClick={this.resetError} className="btn btn-secondary">
              {i18next.t('errorBoundary.backHome')}
            </Button>
            <Button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              {i18next.t('errorBoundary.refresh')}
            </Button>
          </Space>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
