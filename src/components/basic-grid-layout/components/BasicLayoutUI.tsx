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
    isStatic?: boolean;
    onChangeTitle?: (e: any) => void
    onChangeCheck?: (e: any) => void;
    onClickRemoveButton?: (e: any) => void;
    onClickStaticButton?: (e: any) => void;
}

function BasicLayoutUI(props: BasicLayoutUIProps) {
    let title = _.cloneDeep(props.title);

    return (
        <div className={'basic-layout'}>
            {
                props.hasTitleBar != null && props.hasTitleBar ? (
                    <div className={'bl-header cursor-move'}>
                        <div className={'title-container'}>
                            {
                                props.hasCheckbox != null && props.hasCheckbox != null ? (
                                    <input className={'checkbox-input'}
                                        type={'checkbox'}
                                        checked={props.isSelected}
                                        onChange={props.onChangeCheck}
                                        onMouseDown={(e) => e.stopPropagation()} />
                                ) : ('')
                            }
                            <input className="title-input"
                                value={title != null ? title : ''}
                                onChange={(e) => props.onChangeTitle != null ? props.onChangeTitle(e) : ''}
                                onMouseDown={(e) => e.stopPropagation()}
                                disabled={title == null}></input>
                        </div>

                        <div className='tool-container'>
                            {
                                props.hasDeleteBtn != null && props.hasDeleteBtn != null ? (
                                    <button className="tool-btn trash-icon"
                                        id='removeBtn'
                                        onClick={props.onClickRemoveButton} onMouseDown={(e) => e.stopPropagation()}>
                                    </button>
                                ) : ('')
                            }
                            {
                                props.hasStaticBtn != null ? (
                                    <button className={`tool-btn pin-btn ${props.isStatic != null && props.isStatic ? 'pin-on-icon' : 'pin-off-icon'}`}
                                        id='staticBtn'
                                        onClick={props.onClickStaticButton} onMouseDown={(e) => e.stopPropagation()}>
                                    </button>
                                ) : ('')
                            }
                        </div>
                    </div>
                ) : ('')
            }

            <div className={'bl-body'}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {props.innerJSX}
            </div>
            {
                props.hasMouseMoveArea != null && props.hasMouseMoveArea ? (
                    <div className={'mouse-move-area cursor-move'}>
                        ●
                    </div>
                ) : ('')
            }
        </div>
    )
}

export default BasicLayoutUI;

export type {
    BasicLayoutUIProps,
}