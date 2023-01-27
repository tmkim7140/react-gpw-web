import userApis from '@apis/user';

import Gnb from '@components/gnb/Gnb';
import Lnb from '@components/lnb/Lnb';

import { Layout } from 'antd';

import TestTestPage from '@pages/test/Test';

const sessionUser = userApis.getSessionUser();

const { Header, Content, Footer, Sider } = Layout;

function PortalLayout () {
    return (
        <Layout className='wrap'>
            <Header id='layout_header' className='header'>
                {/* <Gnb user={ sessionUser.user }/> */}
                {/* <Gnb user={ sessionUser.user } styles={ ( document.body.scrollTop > 20  || document.documentElement.scrollTop > 20 ) ? { top: "0" } : { top: "28px" } } /> */}
                <Gnb user={ sessionUser.user } />
                <Lnb />
            </Header>
            <Content className='main'>
                <div className='main-wrap'>
                    <TestTestPage/>
                </div>
            </Content>
            <Footer className='footer'>

            </Footer>
        </Layout>
    );
}

export default PortalLayout;