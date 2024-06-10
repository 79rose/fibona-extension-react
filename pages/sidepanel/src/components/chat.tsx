/**
 * @author leewahjoel
 * @description 插件-sidepanel-聊天
 */

import { useState } from 'react';
import Input from './input';
import Message from './message';
export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const addMessage = (type: string, content: string) => {
    setMessages((prev: string[]) => {
      if (type === 'answer' && prev.length > 0 && prev[prev.length - 1].startsWith('🤖')) {
        // 如果最后一条消息是答案，将新的答案添加到最后一条消息
        return [...prev.slice(0, -1), prev[prev.length - 1] + content];
      } else {
        // 否则，创建新的消息
        return [...prev, (type === 'question' ? '👨‍💻' : '🤖') + content];
      }
    });
  };
  return (
    <div className="flex flex-col w-full mt-4 ">
      <div className="flex flex-col gap-2">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <Input
        className="fixed bottom-10  left-[50%] transform -translate-x-1/2 px-2
      "
        addMessage={addMessage}
      />
    </div>
  );
}
