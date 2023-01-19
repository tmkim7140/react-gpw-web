import { LnbProps } from './types';

import {
    FormOutlined,
    SearchOutlined,
    BgColorsOutlined,
} from '@ant-design/icons';

const Lnb = ( props: LnbProps ) => {
    return (
        <div className='lnb'>
            <div className='logo'>
                LOGO
            </div>
            <div className='lnb-menu'>
                <ul id='lnb-menu-list' className='lnb-menu-list'>
                    <li><a href='#none'> 전자우편 </a></li>
                    <li><a href='#none'> 전자결재 </a></li>
                    <li><a href='#none'> 게시판 </a></li>
                    <li><a href='#none'> 조직도 </a></li>
                    <li><a href='#none'> 일정관리 </a></li>
                    <li><a href='#none'> 근태관리 </a></li>
                    <li><a href='#none'> 자원예약 </a></li>
                    <li><a href='#none'> 주소록 </a></li>
                    <li><a href='#none'> 설문조사 </a></li>
                    <li><a href='#none'> 쪽지 </a></li>
                    <li><a href='#none'> 문서관리 </a></li>
                    <li><a href='#none'> 파일함 </a></li>
                </ul>
            </div>
            <div className='quick-menu'>
                <ul id='quick-menu-list' className='quick-menu-list'>
                    <li> <FormOutlined/> </li>
                    <li> <SearchOutlined/> </li>
                    <li> <BgColorsOutlined/> </li>
                </ul>
            </div>
        </div>
    );
}

export default Lnb;