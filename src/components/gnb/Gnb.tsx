import type { GnbProps } from './types';
import { Select } from 'antd';

const Gnb = ( props: GnbProps ) => {
    
    const renderSelectOptions = () => {
        const options = props.user.orgList.map( org => { 
            return { value: org.id, label: `${ org.department } ${ org.team }팀 ${ org.company }사` } 
        })

        return options;
    }

    return (
        <div className='gnb'>
            <div className='gnb-menu'>
                <ul className='gnb-menu-list'>
                    <li> 
                        <Select
                            defaultValue= '0'
                            size='small'
                            bordered={ false }
                            options={ renderSelectOptions() }
                            onChange={() => {}}
                        />
                    </li>
                    <li> { props.user.name } 님 </li>
                    <li> <a href='#none'> 홈 </a> </li>
                    <li> <a href='#none'> 마이페이지 </a> </li>
                    <li> <a href='#none'> 즐겨찾기 </a> </li>
                    <li> <a href='#none'> 로그아웃 </a> </li>
                </ul>
            </div>
        </div>
    );
}

export default Gnb;