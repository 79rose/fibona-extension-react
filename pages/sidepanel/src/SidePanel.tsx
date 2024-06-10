/* eslint-disable @typescript-eslint/no-explicit-any */
import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import Loading from './loading';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import SiderHeader from './components/header';
import SiderFooter from './components/footer';
import Chat from './components/chat';
const SidePanel = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        <SiderHeader />
        <Chat />
      </Content>
      <Footer>
        <SiderFooter />
      </Footer>
    </Layout>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <Loading />), <div> Error Occur </div>);
