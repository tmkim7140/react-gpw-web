import type { LnbProps } from './types';

import { LnbMenuList } from './components/lnb-menu-list';
import { SvcBox } from './components/svc-box';

import {
    FormOutlined,
    SearchOutlined,
    BgColorsOutlined,
    MenuOutlined,
} from '@ant-design/icons';

const lnbMenuRowdatas = [
    { id: '0', nm: '전자우편', link: '#none' },
    { id: '1', nm: '전자결재', link: '#none' },
    { id: '2', nm: '게시판', link: '#none' },
    { id: '3', nm: '조직도', link: '#none' },
    { id: '4', nm: '일정관리', link: '#none' },
    { id: '5', nm: '근태관리', link: '#none' },
    { id: '6', nm: '자원예약', link: '#none' },
    { id: '7', nm: '주소록', link: '#none' },
    { id: '8', nm: '설문조사', link: '#none' },
    { id: '9', nm: '쪽지', link: '#none' },
    { id: '10', nm: '문서관리', link: '#none' },
    { id: '11', nm: '파일함', link: '#none' },
];

const svcBoxPropsData = {
    header: {
        title: '전체 서비스',
    },
    body: {
        sectionList: [
            {
                id: 'svc_box_div_0',
                type: 'list', 
                rowdatas: [
                    {
                        id: 'svc_box_div_0_rowdatas_0',
                        title: '전자우편',
                        link: '#none',
                        childrens: [
                            { id: 'svc_box_div_0_rowdatas_0_0', title: '받은메일', link: '#none', childrens: [], },
                            { id: 'svc_box_div_0_rowdatas_0_1', title: '읽지않은메일', link: '#none', childrens: [], },
                        ],
                    },
                    {
                        id: 'svc_box_div_0_rowdatas_1',
                        title: '일정관리',
                        link: '#none',
                        childrens: [
                            { id: 'svc_box_div_0_rowdatas_1_0', title: '일정', link: '#none', childrens: [], },
                            { id: 'svc_box_div_0_rowdatas_1_1', title: '할일', link: '#none', childrens: [], },
                        ],
                    },
                    {
                        id: 'svc_box_div_0_rowdatas_2',
                        title: '설문조사',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_0_rowdatas_3',
                        title: '스페이스',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_0_rowdatas_4',
                        title: '자금통합',
                        link: '#none',
                        childrens: [],
                    },
                ] 
            },
            {
                id: 'svc_box_div_1',
                type: 'list', 
                rowdatas: [
                    {
                        id: 'svc_box_div_1_rowdatas_0',
                        title: '전자결재',
                        link: '#none',
                        childrens: [
                            { id: 'svc_box_div_1_rowdatas_0_0', title: '결재작성', link: '#none', },
                            { id: 'svc_box_div_1_rowdatas_0_1', title: '결재할 문서', link: '#none', },
                        ],
                    },
                    {
                        id: 'svc_box_div_1_rowdatas_1',
                        title: '근태관리',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_1_rowdatas_2',
                        title: '쪽지',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_1_rowdatas_3',
                        title: '메모',
                        link: '#none',
                        childrens: [],
                    },
                ]
            },
            {
                id: 'svc_box_div_2',
                type: 'list', 
                rowdatas: [
                    {
                        id: 'svc_box_div_2_rowdatas_0',
                        title: '게시판',
                        link: '#none',
                        childrens: [
                            { id: 'svc_box_div_2_rowdatas_0_0', title: '모든게시함', link: '#none', },
                            { id: 'svc_box_div_2_rowdatas_0_1', title: '공지사항', link: '#none', },
                        ],
                    },
                    {
                        id: 'svc_box_div_2_rowdatas_1',
                        title: '자원예약',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_2_rowdatas_2',
                        title: '문서관리',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_2_rowdatas_3',
                        title: '동호회',
                        link: '#none',
                        childrens: [],
                    },
                ]
            },
            {
                id: 'svc_box_div_3',
                type: 'list', 
                rowdatas: [
                    {
                        id: 'svc_box_div_3_rowdatas_0',
                        title: '조직도',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_3_rowdatas_1',
                        title: '주소록',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_3_rowdatas_2',
                        title: '파일함',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_3_rowdatas_3',
                        title: '업무지원',
                        link: '#none',
                        childrens: [],
                    },
                ]
            },
            {
                id: 'svc_box_div_4',
                type: 'link', 
                rowdatas: [
                    {
                        id: 'svc_box_div_4_rowdatas_0',
                        title: '나눔고딕 폰트',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_4_rowdatas_1',
                        title: '메신저 다운로드',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_4_rowdatas_2',
                        title: '파일함 탐색기 32bit',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_4_rowdatas_3',
                        title: '파일함 탐색기 64bit',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_4_rowdatas_4',
                        title: 'EDMS 탐색기 32bit',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_4_rowdatas_5',
                        title: 'EDMS 탐색기 64bit',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_4_rowdatas_6',
                        title: '아웃룩 싱크 32bit',
                        link: '#none',
                        childrens: [],
                    },
                    {
                        id: 'svc_box_div_4_rowdatas_7',
                        title: '아웃룩 싱크 64bit',
                        link: '#none',
                        childrens: [],
                    },
                ]
            }
        ]
    }
};


const Lnb = ( props: LnbProps ) => {

    const openSvcBoxModal = () => {
        let svcBoxEle = document.getElementById('svc_box');
        let headerLayoutEle = document.getElementById('layout_header');

        if( svcBoxEle!.classList.contains('open') ) {
            svcBoxEle!.classList.remove('open');
            headerLayoutEle!.classList.remove('svc-box-open');
        }
        else {
            svcBoxEle!.classList.add('open');
            headerLayoutEle!.classList.add('svc-box-open');
        }
    }

    const handleMenuClick = ( e: any ) => {
        openSvcBoxModal();
    }

    return (
        <div className='lnb'>
            <div className='nav'>
                <div className='logo'>
                    <a href='#none'>
                        <img src={ require('../../assets/images/logo.png') } alt=''></img>
                    </a>
                </div>
                <div className='lnb-menu'>
                    <LnbMenuList rowdatas={ lnbMenuRowdatas } />
                    <div className='optn-btns'>
                        <MenuOutlined style={{ width: '34px', height: '34px' }} onClick={ handleMenuClick }/>
                    </div>
                </div>
                <div className='quick-menu'>
                    <ul id='quick-menu-list' className='quick-menu-list'>
                        <li> <FormOutlined/> </li>
                        <li> <SearchOutlined/> </li>
                        <li> <BgColorsOutlined/> </li>
                    </ul>
                </div>
            </div>

            <SvcBox { ...svcBoxPropsData } />
        </div>
    );
}

export default Lnb;