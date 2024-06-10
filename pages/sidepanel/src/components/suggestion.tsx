import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import { Avatar, Card } from 'antd';
import { SiInfluxdb } from 'react-icons/si';
interface SuggestionProps {
  type: 'conclusion' | 'chat';
  icon?: React.ReactNode;
}
export default function Suggestion(props: SuggestionProps) {
  const themeMap = {
    light: 'bg-gray-100 hover:bg-gray-50 text-gray-800',
    dark: 'bg-gray-800 hover:bg-gray-900 text-gray-100',
  };
  const theme = exampleThemeStorage.getSnapshot() as 'light' | 'dark';
  return (
    <Card hoverable={true} bordered={true} className={themeMap[theme]} size="small">
      <div className="flex flex-row gap-4 justify-center items-center text-[18px]">
        <Avatar icon={props.icon ? props.icon : <SiInfluxdb size={24} />} style={{ backgroundColor: '#87d068' }} />
        <span className="font-[1000] w-24 text-left">{props.type === 'conclusion' ? '总结页面' : 'ai聊天'}</span>
      </div>
    </Card>
  );
}
