import { Readability } from '@mozilla/readability';
import nlp from 'compromise';
import { contentStorage } from '@chrome-extension-boilerplate/storage';
console.log('content script loaded');

const processContent = () => {
  const newDoc = document.implementation.createDocument('', '', null);
  const clone = document.documentElement.cloneNode(true);
  newDoc.appendChild(clone);
  const article = new Readability(newDoc).parse();

  if (article) {
    const doc = nlp(article.textContent);
    // 获取关键词
    const keyTermsStr = doc.terms().out('array').join(' ');
    // console.log(keyTermsStr);
    // 获取句子
    // const sentences = doc.sentences().out('array');
    // console.log(sentences);
    // 保存关键词
    contentStorage.updateDocument(keyTermsStr);
  } else {
    console.log('No content extracted');
  }
};

function throttleProcessContentWithStrategy() {
  let time = new Date().getTime();
  let lastContentLength = document.body.innerText.length;
  return () => {
    const now = new Date().getTime();
    // 1.距离上次处理时间超过 5s 并且页面内容变化字数超过 100
    // 2.页面内容变化字数超过 300

    if (
      (now - time > 5000 && document.body.innerText.length - lastContentLength > 100) ||
      document.body.innerText.length - lastContentLength > 300
    ) {
      processContent();
      time = now;
      lastContentLength = document.body.innerText.length;
    }
  };
}
const handleThrottleProcessContentWithStrategy = throttleProcessContentWithStrategy();
// 使用 MutationObserver 监视 DOM 变化
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const observer = new MutationObserver((mutationsList, _observer) => {
  mutationsList.forEach(mutation => {
    if (mutation.type === 'childList') {
      handleThrottleProcessContentWithStrategy();
    }
  });
});

const config = { childList: true, subtree: true };
// 开始观察文档根节点
observer.observe(document, config);

// 初始处理内容
window.onload = () => {
  processContent();
};
