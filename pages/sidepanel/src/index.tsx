import { createRoot } from 'react-dom/client';
import '@src/index.css';
import SidePanel from '@src/SidePanel';
import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import ModalProvider from '@src/provider/ModalProvider';
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
      <ModalProvider />
      <SidePanel />
    </ConfigProvider>
  );
}

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<MyApp />);
}

init();
