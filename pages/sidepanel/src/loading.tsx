import React from 'react';
import { Spin } from 'antd';

const App: React.FC = () => {
  return (
    <>
      <Spin spinning={true} fullscreen />
    </>
  );
};

export default App;
