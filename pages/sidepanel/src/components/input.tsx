import { useState } from 'react';
import { ArrowUpOutlined, AudioOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
const Input = ({ className, addMessage }: { className: string; addMessage: (type: string, val: string) => void }) => {
  // 请求当前标签页的分析结果
  const [question, setQuestion] = useState<string>('');
  const toSearch = async function () {
    // 创建连接
    const port = chrome.runtime.connect({ name: 'QA' });

    // 发送消息
    port.postMessage({ type: 'ANSER_REQ', question });
    setQuestion('');
    await addMessage('question', question);
    // 监听消息
    port.onMessage.addListener(async response => {
      if (response) {
        addMessage('answer', response.answer);
      }
    });
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };
  const onPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(e);
    toSearch();
  };
  return (
    <div className={className}>
      <div
        className="flex w-[100vw] max-w-[800px] items-center justify-between gap-2 rounded-2xl 
    bg-white/80 p-2
    backdrop-blur-lg backdrop-filter">
        <div
          className="
             flex  
             h-9 w-9 cursor-pointer items-center justify-center self-end justify-self-end rounded-full
             bg-white/80 p-2 shadow-sm  hover:bg-white/10 hover:shadow-md 
              ">
          <AudioOutlined
            style={{
              fontSize: '20px',
              color: 'purple',
            }}
            className="transition-transform duration-200 ease-in-out hover:scale-[1.3]"
          />
        </div>
        <TextArea
          value={question}
          onChange={onChange}
          placeholder="请输入问题"
          autoSize={{ minRows: 1, maxRows: 5 }}
          onPressEnter={() => {
            console.log(question);
          }}
          prefix="fakdk"
        />
        <div
          className={`             
        flex h-9 w-9 cursor-pointer items-center justify-center self-end justify-self-end rounded-full
             bg-[#3333]  p-2 shadow-sm ${question ? 'bg-[white]/80 hover:shadow-md' : 'bg-[#3333]'} `}
          onClick={toSearch}
          onPressEnter={onPressEnter}>
          <ArrowUpOutlined
            style={{
              fontSize: '20px',
              color: question ? 'purple' : 'white',
            }}
            className={`transition-transform duration-200 ease-in-out hover:scale-[1.3]`}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
