import { Typography } from 'antd';

export type TextErrorProps = {
  message?: string;
};
export default function TextError({ message }: TextErrorProps) {
  const { Text } = Typography;
  return (
    <Text type="danger" style={{ fontSize: '10px', marginTop: '24px' }}>
      {message}
    </Text>
  );
}
