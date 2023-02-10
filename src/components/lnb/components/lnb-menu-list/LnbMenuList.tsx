import type { LnbMenuListProps } from './types';  

const LnbMenuList = ( props: LnbMenuListProps ) => { 

    const renderItems = props.rowdatas.map( ( rowdata, idx ) => 
        <li key={ rowdata.id } className={ 'nt nt-' + ( idx + 1 ) }>
            <a href={ rowdata.link }> { rowdata.nm } </a>
        </li>
    );

    return (
        <ul id='lnb-menu-list' className='lnb-menu-list'>
            { renderItems }
        </ul>
    );
}

export default LnbMenuList;