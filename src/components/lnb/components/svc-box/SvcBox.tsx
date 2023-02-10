import type { SvcBoxProps, SvcBoxHeaderProps, SvcBoxBodyProps, SvcBoxBodySectionProps, SvcBoxBodySectionItemProps } from './types';

const SvcBox = ( props: SvcBoxProps ) => {

    const Header = ( props: SvcBoxHeaderProps ) => <div className='svc-box-header'> <h2> { props.title } </h2> </div>;
    
    const renderBodySection = ( props: SvcBoxBodySectionProps ) => {

        let BodySectionItem;

        if( props.type === 'list' ) {
            BodySectionItem = props.rowdatas.map( item => 
                <div className='svc-list'> 
                    <div className='svc-list-title'> <a href={ item.link }> { item.title } </a> </div>
                    <div className='svc-list-content'>
                        <ul>
                            { ( item.childrens == null || item.childrens.length === 0 ) ? '' : item.childrens.map( item => <li> <a href={ item.link }> { item.title } </a> </li>) }
                        </ul>
                    </div>
                </div> 
            )
        }
        else if( props.type === 'link' ) BodySectionItem =  <div className='svc-link'> <ul> { props.rowdatas.map( item => <li> <a href={ item.link }> { item.title } </a> </li> ) } </ul> </div>;

        return <div className='svc-box-div'> { BodySectionItem } </div>;
    };

    const Body = ( props: SvcBoxBodyProps ) => <div className='svc-box-body'> { props.sectionList.map( selection => renderBodySection( selection ) ) } </div>;
    
    return (
        <div id='svc_box' className='svc-box'>
            <div className='svc-box-wrap'>
                <Header {... props.header} />
                <Body {... props.body } />
            </div>
        </div>
    );
}

export default SvcBox;