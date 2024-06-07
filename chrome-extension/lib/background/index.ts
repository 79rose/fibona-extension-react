import 'webextension-polyfill';
import { contentStorage } from '@chrome-extension-boilerplate/storage';

console.log('background loaded');
console.log("Edit 'apps/chrome-extension/lib/background/index.ts' and save to reload.");

// 监听连接请求
chrome.runtime.onConnect.addListener(port => {
  console.assert(port.name == 'QA');
  if (port.name !== 'QA') return;
  // 监听消息
  port.onMessage.addListener(async msg => {
    if (msg.type === 'ANSER_REQ') {
      let keyTermsStr = contentStorage.getSnapshot()!.keyTermsStr; //只取 中间100个字符
      if (keyTermsStr.length > 100) {
        keyTermsStr = keyTermsStr.slice(0, 100);
      }
      const question = msg.question;
      // prompt
      const propmt =
        '你是一个知识库助手，请你根据以下关键词，提取问题的关键，然后通过你的知识库回答问题：' +
        keyTermsStr +
        '现在请回答问题：' +
        question;
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propmt }),
      });
      // sse推送
      if (!response.body) return;
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      // eslint-disable-next-line no-constant-condition
      while (true) {
        let { value, done } = await reader.read();
        value = value?.replace('data', '');
        if (done) break;
        port.postMessage({ status: 'success', answer: value });
      }
    }
  });
});
