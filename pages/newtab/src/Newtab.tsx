import '@src/Newtab.css';
import '@src/Newtab.scss';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import { ComponentPropsWithoutRef } from 'react';

const Newtab = () => {
  const theme = useStorageSuspense(exampleThemeStorage);

  return (
    <div className="App" style={{ backgroundColor: theme === 'light' ? '#eee' : '#222' }}>
      <header className="App-header" style={{ color: theme === 'light' ? '#222' : '#eee' }}>
        <p className="text-[18px]">
          Fibona AI助手
          <span role="img" aria-label="rocket">
            🚀
          </span>
          <p>这是一款AI助手，当您在浏览网页时，可以自动化构建您的知识图谱，帮助您更好的学习和工作。</p>
        </p>
        <ToggleButton>切换主题</ToggleButton>
      </header>
    </div>
  );
};

const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
  const theme = useStorageSuspense(exampleThemeStorage);
  return (
    <button
      className={
        props.className +
        ' ' +
        'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
        (theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')
      }
      onClick={exampleThemeStorage.toggle}>
      {props.children}
    </button>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
