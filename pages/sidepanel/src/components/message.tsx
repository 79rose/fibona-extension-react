import { Card } from 'antd';

export default function Message({ message }: { message: string }) {
  return (
    <Card bordered={true} size="small">
      <p className="text-[#333] text-[14px]">{message}</p>
    </Card>
  );
}
