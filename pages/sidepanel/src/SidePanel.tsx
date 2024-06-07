/* eslint-disable @typescript-eslint/no-explicit-any */
import '@src/SidePanel.css';
import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { useState } from 'react';

const SidePanel = () => {
  const [answer, setAnswer] = useState<string>('');
  return (
    <div className="App">
      <Input setAnswer={setAnswer} />
      <div>
        {/* 生成的回答 */}
        <div
          className={`bg-white mt-2 p-2 rounded-lg w-[content] shadow-md text-sm inline-flex ${
            answer ? 'block' : 'hidden'
          }`}>
          <div
            className="
            text-gray-700
          ">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ setAnswer }: { setAnswer: (answer: string) => void }) => {
  // 请求当前标签页的分析结果
  const [question, setQuestion] = useState<string>('');
  const toSearch = () => {
    // 创建连接
    const port = chrome.runtime.connect({ name: 'QA' });

    // 发送消息
    port.postMessage({ type: 'ANSER_REQ', question });

    // 监听消息
    port.onMessage.addListener(response => {
      if (response && response.status === 'success') {
        setAnswer((prev: any) => prev + response.answer);
      }
    });
  };
  return (
    <div
      className="
     flex items-center justify-center
    ">
      <input
        className="
        border border-gray-400
        bg-white h-10 px-2  rounded-lg text-sm focus:outline-none
      "
        type="text"
        placeholder="Search"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />

      <button
        className="
        bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-4 rounded
        "
        onClick={toSearch}>
        点击生成
      </button>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
