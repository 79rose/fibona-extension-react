import React from 'react';
import { Button, Input } from 'antd';

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log(e);
};

const App: React.FC = () => (
  <>
    <div className="flex items-center justify-center w-full h-full flex-col gap-1">
      <div className="text-[14px] text-[#666] text-center flex flex-col ">
        <span className="text-[#1890ff] text-[18px] font-[1000] ">请向我们反馈您的问题或建议</span>
        <div>
          <span>欢迎加入</span>
          <span className="text-[#1890ff] cursor-pointer hover:underline">Fibona</span>
          <span>社区，一起讨论AI技术，共同进步！</span>
        </div>
      </div>
      <TextArea placeholder="点击输入" allowClear onChange={onChange} autoSize={{ minRows: 5, maxRows: 8 }} />
      <Button type="primary" className="mt-2 w-full" size="large">
        提交
      </Button>
    </div>
  </>
);

export default App;
