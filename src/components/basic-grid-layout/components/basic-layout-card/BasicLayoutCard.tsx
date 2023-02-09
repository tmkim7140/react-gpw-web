import { Button, Space, Card, Checkbox, Input, Col, Row } from 'antd';
import {
    DeleteOutlined,
    PushpinOutlined,
    ToTopOutlined,
} from '@ant-design/icons';
import { IBasicLayoutCardEvent, IBasicLayoutCardTitleBarProps } from '../../hooks/useBasicLayoutCard';

let _ = require('lodash');

interface IBasicLayoutCardUIProps {
    id: string;
    title: string;
    geometry: { [P: string]: { x: number, y: number, w: number, h: number, moved?: boolean, static?: boolean } };
    innerJSX: JSX.Element;
    isTemporary?: boolean; // 저장되지 않은 상태 : true
    isSelected?: boolean; // default : false
    isStatic?: boolean; // 고정 
    titleBar?: IBasicLayoutCardTitleBarProps;
    hasMouseMoveArea?: boolean;
    onChangeTitle?(e: any): void;
    onChangeCheck?(e: any): void;
    onClickRemoveBtn?(e: any): void;
    onClickStaticBtn?(e: any): void;
}

function BasicLayoutCard(props: IBasicLayoutCardUIProps) {
    return (
        <Card className={`basic-layout ${(props.isStatic == null || !props.isStatic) ? 'cursor-move' : ''}`}
            title={
                props.titleBar != null ? (
                    <Row className={'bl-header'}
                        justify={'space-between'}
                    >
                        <Col className={'title-container'}
                            span={16}
                        >
                            {
                                props.titleBar != null && props.titleBar.hasCheckbox ? (
                                    <Space onMouseDown={(e) => e.stopPropagation()}>
                                        <Checkbox className={'checkbox-input'}
                                            checked={props.isSelected}
                                            onChange={props.onChangeCheck}
                                        />
                                    </Space>
                                ) : ('')
                            }
                            <Input className="title-input"
                                // value={props.title != null ? props.title : ''}
                                value={props.title != null ? props.title : ''}
                                onChange={(e) => props.onChangeTitle != null ? props.onChangeTitle(e) : ''}
                                onMouseDown={(e) => e.stopPropagation()}
                                disabled={props.title == null}
                                placeholder="title"
                            />
                        </Col>

                        <Col className='tool-container'
                            span={6}
                        >
                            {
                                props.titleBar != null && props.titleBar.hasDeleteBtn != null ? (
                                    <Button className={`tool-btn`}
                                        onClick={props.onClickRemoveBtn}
                                        onMouseDown={(e) => e.stopPropagation()}>
                                        <DeleteOutlined />
                                    </Button>
                                ) : ('')
                            }
                            {
                                props.titleBar != null && props.titleBar.hasStaticBtn != null ? (
                                    <Button className={`tool-btn`}
                                        onClick={props.onClickStaticBtn}
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
            style={{ width: '100%', height: '100%' }}
            headStyle={{ width: '100%', minHeight: '45px', backgroundColor: '#eaaf', padding: '6px', margin: '0' }}
            bodyStyle={{ flex: '1', width: '100%', height: 'auto', backgroundColor: '#ffaf', padding: '6px' }}
        >
            <div className={'bl-body'} onMouseDown={(e) => e.stopPropagation()} style={{ cursor: 'default', width: '100%', height: '100%' }}>
                {props.innerJSX}
            </div>
            {
                (props.hasMouseMoveArea != null && !props.hasMouseMoveArea) || (props.isStatic != null && props.isStatic)
                    ? ('')
                    : (
                        <Space className={'mouse-move-area cursor-move'}>
                            ●
                        </Space>
                    )
            }
        </Card>
    )
}

export default BasicLayoutCard;

export type {
    IBasicLayoutCardUIProps,
}