import React, { createContext, useEffect, useState } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { darkTheme } from '../../theme/DarkTheme';
import { lightTheme } from '../../theme/LightTheme';

const ThemeContext = createContext({
  mode: 'light' as 'light' | 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  const toggleTheme = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      mode === 'dark' ? 'dark' : 'light'
    );
    localStorage.setItem('theme', mode === 'dark' ? 'dark' : 'light');
  }, [mode]);

  const currentTheme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm:
            mode === 'dark'
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
          token: currentTheme.token,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
