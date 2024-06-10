/**
 * @author leewahjoel
 * @description 插件-sidepanel-头部
 */

import React from 'react';
import { Card } from 'antd';
import Suggestion from './Suggestion';
import { SiGooglechat } from 'react-icons/si';
import useFeedBackModal from '@src/hooks/useFeedBackMadal';
const title = (
  <div className="font-[1000] text-[18px]">
    <span className="text-[#1890ff]">🚀欢迎使用Fibona AI助手</span>
  </div>
);

const App: React.FC = () => {
  const { onOpen } = useFeedBackModal();
  return (
    <Card
      title={title}
      extra={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" onClick={onOpen}>
          反馈
        </a>
      }
      hoverable={true}
      bordered={false}>
      <div className="flex flex-wrap gap-2 flex-row">
        <Suggestion type="conclusion" />
        <Suggestion type="chat" icon={<SiGooglechat />} />
      </div>
    </Card>
  );
};
export default App;
