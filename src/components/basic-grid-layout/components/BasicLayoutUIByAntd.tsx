import { Button, Space, Card, Checkbox, Input, Col, Row } from 'antd';
import {
    DeleteOutlined,
    PushpinOutlined,
    ToTopOutlined,
} from '@ant-design/icons';

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

function BasicLayoutUIByAntd(props: BasicLayoutUIProps) {
    let title = _.cloneDeep(props.title);

    return (
        <Card className={'basic-layout'}
            title={
                props.hasTitleBar != null && props.hasTitleBar ? (
                    <Row className={'bl-header'}
                        justify={'space-between'}
                    >
                        <Col className={'title-container'}
                            span={16}
                        >
                            {
                                props.hasCheckbox != null && props.hasCheckbox != null ? (
                                    <Space onMouseDown={(e) => e.stopPropagation()}>
                                        <Checkbox className={'checkbox-input'}
                                            checked={props.isSelected}
                                            onChange={props.onChangeCheck}
                                        />
                                    </Space>
                                ) : ('')
                            }
                            <Input className="title-input"
                                value={title != null ? title : ''}
                                onChange={(e) => props.onChangeTitle != null ? props.onChangeTitle(e) : ''}
                                onMouseDown={(e) => e.stopPropagation()}
                                disabled={title == null}
                                placeholder="title"
                            />
                        </Col>

                        <Col className='tool-container'
                            span={6}
                        >
                            {
                                props.hasDeleteBtn != null && props.hasDeleteBtn != null ? (
                                    <Button className={`tool-btn`}
                                        onClick={props.onClickRemoveButton}
                                        onMouseDown={(e) => e.stopPropagation()}>
                                        <DeleteOutlined />
                                    </Button>
                                ) : ('')
                            }
                            {
                                props.hasStaticBtn != null ? (
                                    <Button className={`tool-btn`}
                                        onClick={props.onClickStaticButton}
                                        onMouseDown={(e) => e.stopPropagation()}>
                                        {
                                            props.isStatic != null && props.isStatic
                                                ? (<ToTopOutlined />)
                                                : (<PushpinOutlined />)
                                        }
                                    </Button>
                                ) : ('')
                            }
                        </Col>
                    </Row>
                ) : ('')
            }
            // size={'small'}
            style={{}}
            headStyle={{ width: '100%', minHeight: '45px', backgroundColor: '#eaaf', padding: '6px', margin: '0' }}
            bodyStyle={{ flex: '1', width: '100%', height: 'auto', backgroundColor: '#ffaf', padding: '6px' }}
        >

            <Space className={'bl-body'} onMouseDown={(e) => e.stopPropagation()} style={{ cursor: 'default' }}>
                {props.innerJSX}
            </Space>
            {
                props.hasMouseMoveArea != null && props.hasMouseMoveArea ? (
                    <Space className={'mouse-move-area cursor-move'}>
                        ●
                    </Space>
                ) : ('')
            }
        </Card>
    )
}

export default BasicLayoutUIByAntd;

export type {
    BasicLayoutUIProps,
}