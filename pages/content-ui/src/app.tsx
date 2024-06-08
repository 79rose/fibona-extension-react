import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import Levitate from './components/levitate';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
export default function MyApp() {
  //
  const [primary, setPrimary] = useState('#172448');
  const [primaryBg, setPrimaryBg] = useState('#f0f5ff');
  const themeVal = exampleThemeStorage.getSnapshot() as 'light' | 'dark';
  // 监听主题变化
  exampleThemeStorage.subscribe(() => {
    const value = exampleThemeStorage.getSnapshot();
    if (value === 'light') {
      setPrimary('#172448');
      setPrimaryBg('#f0f5ff');
    } else {
      setPrimary('#D5E2FF');
      setPrimaryBg('#1890ff');
    }
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primary,
          colorPrimaryBg: primaryBg,
        },
        algorithm: [themeVal === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm],
      }}>
      <Theme appearance="dark">
        <Levitate />
      </Theme>
    </ConfigProvider>
  );
}
