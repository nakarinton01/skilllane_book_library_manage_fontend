import type { PropsWithChildren } from 'react';
import { Layout as AntLayout } from 'antd';

import './Layout.scss';

export default function Layout({ children }: PropsWithChildren) {
  const { Content } = AntLayout;
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <AntLayout style={{ marginLeft: '230px' }}>
        <Content style={{ padding: 24, paddingTop: 100 }}>{children}</Content>
      </AntLayout>
    </AntLayout>
  );
}
