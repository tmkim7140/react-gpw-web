import userApis from '@apis/user';

import Gnb from '@components/gnb/Gnb';
import Lnb from '@components/lnb/Lnb';

import { Layout } from 'antd';

const sessionUser = userApis.getSessionUser();

const { Header, Content, Footer, Sider } = Layout;

function PortalLayout () {
    return (
        <Layout className='wrap'>
            <Header className='header'>
                <Gnb user={ sessionUser.user }/>
                <Lnb />
            </Header>
            <Content className='main'>
                <div className='main-wrap'>
                    <div id='main-tab' className='main-tab'>

                    </div>
                    <div id='main-screen' className='main-screen'>

                    </div>
                </div>
            </Content>
            <Footer className='footer'>

            </Footer>
        </Layout>
    );
}

export default PortalLayout;