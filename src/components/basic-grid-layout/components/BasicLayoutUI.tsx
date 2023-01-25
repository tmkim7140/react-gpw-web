let _ = require('lodash');

interface BasicLayoutUIProps {
    title: string;
    innerJSX: JSX.Element;
    hasTitleBar?: boolean;
    hasCheckbox?: boolean;
    hasDeleteBtn?: boolean;
    hasStaticBtn?: boolean;
    hasMouseMoveArea?: boolean;
    isSelected?: boolean;
    onChangeTitle?: (e: any) => void
    onChangeCheck?: (e: any) => void;
    onClickRemoveButton?: (e: any) => void;
    onClickStaticButton?: (e: any) => void;
}

function BasicLayoutUI(props: BasicLayoutUIProps) {
    let title = _.cloneDeep(props.title);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {
                props.hasTitleBar != null && props.hasTitleBar ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '20px', backgroundColor: '#ffffffff', cursor: 'move' }}>
                        <div className='title-area' style={{ display: 'flex', width: '70%' }}>
                            {
                                props.hasCheckbox != null && props.hasCheckbox != null ? (
                                    <input type={'checkbox'}
                                        checked={props.isSelected}
                                        onChange={props.onChangeCheck}
                                        onMouseDown={(e) => e.stopPropagation()} />
                                ) : ('')
                            }
                            <input style={{ width: '100%' }} value={title != null ? title : ''}
                                onChange={(e) => props.onChangeTitle != null ? props.onChangeTitle(e) : ''}
                                onMouseDown={(e) => e.stopPropagation()}
                                disabled={title == null}></input>
                        </div>
                        <div className='function-area' style={{ display: 'flex', justifyContent: 'flex-end', width: '30%' }}>
                            {
                                props.hasDeleteBtn != null && props.hasDeleteBtn != null ? (
                                    <button id='removeBtn'
                                        style={{ height: '20px', backgroundColor: '#f0f0f0ff', border: '1px solid' }}
                                        onClick={props.onClickRemoveButton} onMouseDown={(e) => e.stopPropagation()}>
                                        d
                                    </button>
                                ) : ('')
                            }
                            {
                                props.hasStaticBtn != null ? (
                                    <button id='staticBtn'
                                        style={{ height: '20px', backgroundColor: '#f0f0f0ff', border: '1px solid' }}
                                        onClick={props.onClickStaticButton} onMouseDown={(e) => e.stopPropagation()}>
                                        p
                                    </button>
                                ) : ('')
                            }
                        </div>
                    </div>
                ) : ('')
            }
            <div style={{ width: '100%', height: props.hasTitleBar != null && props.hasTitleBar ? 'calc(100% - 20px)' : '100%' }}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {props.innerJSX}
            </div>
            {
                props.hasMouseMoveArea != null && props.hasMouseMoveArea ? (
                    <div style={{ position: 'absolute', right: '-9px', bottom: '-2px', cursor: 'move', color: '#00000088' }}>●</div>
                ) : ('')
            }
        </div >
    )
}

export default BasicLayoutUI;

export type {
    BasicLayoutUIProps,
}