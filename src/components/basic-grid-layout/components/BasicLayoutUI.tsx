interface BasicLayoutUIProps {
    innerJSX: JSX.Element;
    title?: string;
    layoutName: string;
    hasTitleBar?: boolean;
    hasCheckbox?: boolean;
    hasDeleteBtn?: boolean;
    hasStaticBtn?: boolean;
    handleChangeCheck?: (e: any) => void;
    handleClickRemoveButton?: (e: any) => void;
    handleClickStaticButton?: (e: any) => void;
}

function BasicLayoutUI(props: BasicLayoutUIProps) {
    return (
        <div style={{ width: '100%', height: '100%' }}>

            {
                props.hasTitleBar ? (
                    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '20px', backgroundColor: '#ffffffff' }}>
                        <div className='title-area'>
                            {
                                props.hasCheckbox != null ? (<input type={'checkbox'} onChange={props.handleChangeCheck}></input>) : ('')
                            }
                            {
                                props.title != null ? props.title : props.layoutName
                            }
                        </div>
                        <div className='function-area'>
                            {
                                props.hasDeleteBtn != null ? (
                                    <button id='removeBtn'
                                        style={{ height: '20px', backgroundColor: '#f0f0f0ff', margin: '2px', border: '1px solid' }}
                                        onClick={props.handleClickRemoveButton}>d</button>
                                ) : ('')
                            }
                            {
                                props.hasStaticBtn != null ? (
                                    <button id='staticBtn'
                                        style={{ height: '20px', backgroundColor: '#f0f0f0ff', margin: '0px', border: '1px solid' }}
                                        onClick={props.handleClickStaticButton}>p</button>
                                ) : ('')
                            }
                        </div>
                    </div>
                ) : ('')
            }

            <div style={{ width: '100%', height: props.hasTitleBar ? 'calc(100% - 20px)' : '100%' }}>
                {props.innerJSX}
            </div>
        </div>
    )
}

export default BasicLayoutUI;

export type {
    BasicLayoutUIProps,
}